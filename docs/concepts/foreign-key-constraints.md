---
title: 'Foreign key constraints'
subtitle: 'Learn more about using foreign key constraints in PlanetScale.'
date: '2023-12-05'
---

## What is a foreign key constraint?

A **foreign key** is a logical association of rows between two tables in a parent-child relationship. A row in a “parent” table may be referenced by one or more rows in a “child” table. A foreign key typically suggests how you should `JOIN` tables in most queries.

A **`FOREIGN KEY` _constraint_** is a database construct, an implementation that _forces_ the foreign key relationship's integrity (referential integrity). Namely, it ensures that a child table can only reference a parent table when the appropriate row _exists_ in the parent table. A constraint also prevents the existence of “orphaned rows” in different methods.

{% callout type="note" %}
Foreign key constraints are currently supported by PlanetScale in beta.
{% /callout %}

### Advantages and disadvantages of foreign key constraints

Foreign key constraints have advantages and disadvantages. While foreign key constraints can help ensure referential integrity, they will cause degraded performance in high concurrency workloads and introduce more complexity in the database. Often, foreign key constraints become problematic when operating on a large scale. You can read more [why we do not recommend foreign key constraints](/docs/learn/operating-without-foreign-key-constraints#why-does-planetscale-not-recommend-constraints-) for some applications.

We recommend weighing the advantages and disadvantages for your specific application when using foreign key constraints. If you decide to enforce referential integrity at the application level instead of at the database level, see our documentation on [how to design systems that maintain referential integrity without foreign key constraints](/docs/learn/strategies-for-maintaining-referential-integrity).

## Foreign key constraints beta

### Prerequisites

{% callout type="note" %}
You must be an organization administrator to enroll into beta features.
{% /callout %}

Before you opt-in to the foreign key constraints beta, there are a few important things to know:

- **No open deploy requests:** You cannot have any open deploy requests before opting into the beta.
- **Possible orphaned rows on reverts:** Some deploy requests may result in orphaned rows if you revert them. You will be warned before you deploy changes.
- **Database upgrades:** When you opt-in to the beta, we upgrade your Vitess cluster, and in some cases, we upgrade the MySQL version too. You should experience no downtime during this upgrade, but it can take a few minutes to complete. Older databases may take longer.

### How to opt-in

The beta is opt-in on a **per database** level. You cannot opt-in the whole organization to foreign key constraints.

1. Navigate to the database you want to opt-in to the foreign key constraints beta and select the **“Settings”** tab.
2. In the **“Beta features”** page, select the **“Enroll”** button for foreign key constraints.
3. After you accept and enroll in the beta, PlanetScale will upgrade your database in the background. This will take a few minutes. On the database's **“Overview”** page, you will see a loading spinner that says it is “Enabling foreign key constraints.” Once it no longer shows, you can use foreign key constraints in your PlanetScale database!

![Showing the spinner on the database overview page](/assets/docs/concepts/foreign-key-constraints/enabling-foreign-key-constraints-docs.jpg)

{% callout type="warning" %}
If you want to unenroll your database from the beta, make sure to first drop your foreign key constraints. We do not downgrade your database at this time.
{% /callout %}

## Database imports with foreign key constraints

You can import a database with foreign key constraints to PlanetScale. We will automatically detect them after successfully connecting to your external database. If we find any foreign key constraints, we will ask you to accept the Terms of Service for the beta feature to continue the import process.

We recommend using a replica as your source when doing database imports with foreign key constraints. Read more in the [database import documentation](/docs/imports/database-imports#foreign-key-constraints).

## Limitations

For most cases, foreign key constraints should work as expected in PlanetScale. There are a few cases to be aware of as they are currently unsupported or result in less ideal behavior.

### Sharded versus unsharded environments

Currently, the foreign key constraints beta only supports unsharded environments. If you use PlanetScale in a sharded environment, contact your PlanetScale account manager for more information. Support for sharded environments will come in 2024.

### Revert limitations

In some cases, a revert of a deploy request can result in orphaned rows. When you revert:

- Dropping a foreign key constraint: Once a foreign key constraint is dropped, new data written to the table is less constrained. Reverting this change may result in data that is inconsistent with the dropped foreign key constraint.
- Dropping a table with foreign key constraints: When a table with foreign key constraints is dropped, the parent table(s) will continue to be written to. If this change is reverted, data in the table that was dropped may no longer be consistent with its foreign key constraints.

### Unsupported queries

The following queries are currently unsupported when the query leads to `child` table `CASCADE` or `SET NULL`:

#### `INSERT... ON DUPLICATE KEY UPDATE` statement

For example:

```
INSERT INTO tbl (id, col) values (1, 2) ON DUPLICATE KEY UPDATE SET col = 3;
```

#### `REPLACE INTO... SELECT...` statement

For example:

```
REPLACE INTO tbl SELECT * FROM tbl2;
```

#### `UPDATE` or `DELETE` with a `LIMIT` statement

For example:

```
UPDATE tbl SET col = 3 LIMIT 1;
```

#### `UPDATE` or `DELETE` with multiple tables statement

For example:

```
DELETE t1, t2 FROM t1 INNER JOIN t2 INNER JOIN t3 WHERE t1.id=t2.id AND t2.id=t3.id;
```

#### `UPDATE` for a foreign key column statement and referencing the column being updated in the same `UPDATE` statement

For example:

```
UPDATE tbl SET col = 5, fk_col = col + 1;
```

The workaround is to separate the updates for conflicting columns into separate schema changes.

#### Cyclic foreign keys are not allowed

While self-referencing tables are supported, cyclic foreign key references between different tables are not allowed. An example of this would be:

```
set foreign_key_checks=0;
create table t1 (id int primary key, t2id int, foreign key (t2id) references t2 (id));
create table t2 (id int primary key, t1id int, foreign key (t1id) references t1 (id));
```

#### Foreign key constraint names change on every deployment

This is mainly due to the MySQL limitation (compatible with ANSI SQL specification), where constraint names must be unique to the schema.

For example, in your database branch, you may run the following:

```
create table parent (id int primary key);
create table child (id int primary key, pid int, constraint pchild_fk foreign key (pid) references parent (id));
```

But after you deploy your schema changes:

```
show create table child \G
CREATE TABLE `child` (
  `id` int NOT NULL,
  `pid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pchild_fk_5vtaqz7kepok6wa91vryrkrje` (`pid`),
  CONSTRAINT `pchild_fk_5vtaqz7kepok6wa91vryrkrje` FOREIGN KEY (`pid`) REFERENCES `parent` (`id`)
)
```
