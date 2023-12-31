---
title: 'Operating without foreign key constraints'
subtitle: 'How to manage your relational data without formal foreign key constraints in your schema.'
date: '2023-12-05'
---

## Overview

A **foreign key** is a logical association of rows between two tables, in a parent-child relationship. A row in a "parent" table may be referenced by one or more rows in a "child" table. A foreign key typically suggests how you should `JOIN` tables in most queries. A table can also refer to itself, as a special case.

A **`FOREIGN KEY` _constraint_ is a database construct**, an implementation that _forces_ the foreign key relationship's integrity (referential integrity). Namely, it ensures that a child table can only reference a parent table when the appropriate row _exists_ in the parent table. A constraint also prevents the existence of "orphaned rows" in different methods, as you'll see described soon.

At PlanetScale, we don't _recommend_ using foreign key constraints. However, if you still want to use them, we currently have [beta support for foreign key constraints](/docs/concepts/foreign-key-constraints) with minor limitations.

We still encourage you to use the relational model and associate tables by "pointing" rows from one table to another with foreign keys, just not with the `CONSTRAINT ... FOREIGN KEY` definition.

We'll soon cover an example of a schema with and without foreign key constraints to clarify this slight difference.

## Why does PlanetScale not recommend constraints?

There are a few significant technical reasons why we do not recommend foreign key constraints for some applications:

- MySQL foreign keys introduce increased locking for data and metadata changes. Expect degraded performance, especially in high concurrency workloads.
- Once two tables engage in a foreign key constraint relationship, it is not possible to change the data types for the columns used by the foreign key. For example, it is impossible to change a column from `INT` to `BIGINT`, neither on a parent nor child table.
- As applications evolve, there is a need for schema refactoring. It is a more complex process involving more steps to refactor a schema containing foreign key constraints.
- `FOREIGN KEY` constraints are difficult to maintain once your data grows and is split over multiple database servers. This typically happens when you introduce functional partitioning/sharding and/or horizontal sharding.

{% callout %}
You can still think in terms of foreign key relationships; of parent tables and child tables; of rows referencing each
other. You can structure your tables in the exact same way without FOREIGN KEY constraints as you would with the
constraints. It's just how these relationships are enforced that changes.
{% /callout %}

To understand how to work without foreign key constraints, we must first understand foreign key functionality.

## Types and behavior of FOREIGN KEY constraints

Consider the following trivial parent-child table relationship:

```sql
CREATE TABLE parent_table (
  id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE child_table (
  id INT NOT NULL,
  parent_id INT,
  PRIMARY KEY (id),
  KEY parent_id_idx (parent_id),
  CONSTRAINT `child_parent_fk` FOREIGN KEY (parent_id) REFERENCES parent_table(id) ON DELETE NO ACTION
);
```

{% callout type="tip" %}
In MySQL, foreign keys are only implemented by the storage engine layer, namely the default and popular InnoDB engine.
A FOREIGN KEY constraint isn't a separate entity. It lives within the child's table space.
{% /callout %}

`FOREIGN KEY` constraints are available for row deletion (`ON DELETE`) and row updates (`ON UPDATE`). In this document, we discuss `ON DELETE` as it is the more impactful of the two. The discussion is relevant to `ON UPDATE` constraints, as well.

Foreign keys further support three types of action (illustrated below for `ON DELETE`):

### `ON DELETE CASCADE`

This is the most greedy, or ambitious action type. If you `DELETE` a row from a parent table, any referencing rows in a child table are subsequently deleted within the same transaction. This operation runs recursively for all of a parent's children, as well as for their children, should they also employ `ON DELETE CASCADE`.

`ON DELETE CASCADE` is a risky and resource-consuming action. You intend to `DELETE` a single row, but end up deleting hundreds, thousands, or more, rows in multiple tables. What seemed like a simple transaction now turns into a massive operation, that involves excessive locking, increased MVCC overhead, impact on replication lag, and more.

But perhaps the greatest danger is the potential unexpected loss of data. Whether an unsuspecting developer simply assumes a `DELETE FROM parent_table WHERE id=3` will at most delete one row, down to surprising behavior such as in `REPLACE INTO` queries, which actually run an implicit `DELETE`, leading to mass destruction of data.

The use of `ON DELETE CASCADE` is controversial. Use it with great care. Consider using `NO ACTION` instead.

### `ON DELETE SET NULL`

With this setup, a `DELETE` on a parent (e.g. `DELETE FROM parent_table WHERE id=3`) will set the referencing column on children (e.g. `parent_id` column in `child_table`) to `NULL` for matching rows. It effectively leads to orphaned rows, not very differently from having no foreign key constraints at all.

One advantage is that it's easy to identify the orphan rows: those, and only those rows, will have `NULL` for parent-referencing columns.

Like `CASCADE`, a single row deletion on the parent may lead to multiple rows updated on child tables. This again may cause large transactions, excessive locking, and replication lag.

### `ON DELETE NO ACTION`

Possibly the single most important feature of foreign keys, a `DELETE` on a parent will fail if child rows exist that reference the parent's row. To `DELETE` a row from a parent, the app/user must first `DELETE` the referencing rows from all children. Recursively, if those are further referenced by other tables, the app/user must first `DELETE` rows from grandchildren, and so forth.

This action (or lack thereof) type forces the app to have stronger ownership of its data. An app written to work with `ON DELETE NO ACTION` will organically evolve _knowing_ which tables reference which other tables, and will have established `DELETE`/`UPDATE` flows that iterate through tables in the correct order to satisfy referential integrity.

## How does your schema look without FOREIGN KEY constraints?

The above schema would look exactly the same, minus the `CONSTRAINT` clause:

```sql
CREATE TABLE parent_table (
  id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE child_table (
  id INT NOT NULL,
  parent_id INT,
  PRIMARY KEY (id),
  KEY parent_id_idx (parent_id)
);
```

{% callout type="tip" %}
Each FOREIGN KEY constraint requires an index covering the referenced column(s) on both sides of the connection. The
index *parent\_id\_idx is required* by the constraint. We can drop that key in our constraint-free table, depending
on the type of queries we might use to retrieve data from the tables.
{% /callout %}

## Developing an app with no FOREIGN KEY constraints

Consider an app's behavior in an `ON DELETE NO ACTION` setup again: the app _knows_ the table's dependencies, handles iteration order for `DELETE`/`UPDATE`. It does everything right.

What happens if we take away the `CONSTRAINT` at this point?

The app remains unchanged. It already runs the proper actions in the proper order. The app operation that ends up running the `DELETE FROM parent_table WHERE id=3` succeeds the app operations that `DELETE` the child table(s). While we lose the database's safety guarantee enforcing this behavior, we are perfectly capable of managing it on our own.

Likewise, an app that grows with a constraint-less schema organically learns to handle `DELETE` and `UPDATE` scenarios. It is in fact given some extra freedom because the _order_ of operations is not enforced. This is an advantage because the app is not forced to `DELETE` thousands of dependent rows for each parent row deletion _at that same transaction_. The app may well postpone deletion as we discuss shortly.

Referential integrity is but one of many logical data integrity constraints. It just happens to be one that databases can enforce. Any sizeable application will maintain the integrity of its data with rules the database is unaware of.

## Cleaning up orphaned rows

Consider an `ON DELETE SET NULL` constraint. What happens to the child rows that were set to `NULL`? Typically, there is little or no damage in keeping them around. A query can, for example, `SELECT` rows `WHERE parent_id IS NOT NULL`. Better yet, child rows are often `JOIN`ed with their respective parent rows. Any query running such a `JOIN` will return empty since the parent row does not exist.

Eventually, those rows will pile up, and you will want to reclaim the space.

Without `FOREIGN KEY` constraints, the situation is very much the same, It is possible to `DELETE` a parent row without deleting its dependent children rows. A child row `JOIN`ed with a respective (deleted) parent row comes out empty. There is no `IS NOT NULL` to help you, but identifying those rows is still trivial. Similarly, there is little or no damage in keeping those rows around for a while.

And similarly, those rows eventually pile up.

A common practice, where appropriate, is to `DELETE` rows on a parent table, or perhaps also on a subset of children, but leave some other tables for offline batch processing.

At some convenient time, such as low traffic hours, the app or some batch job will purge orphaned rows. Consider this simplified query:

```sql
DELETE FROM child_table LEFT JOIN parent_table ON (child_table.parent_id=parent_table.id) WHERE parent_table.id IS NULL
```

A single `DELETE` is likely a massive operation, which is to be avoided. A good practice is to break the statement into multiple small-scope statements, e.g. deleting `100` rows at a time.
