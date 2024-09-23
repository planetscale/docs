---
title: 'Sequence Tables'
subtitle: 'Learn how to create sequence tables on a sharded PlanetScale database.'
label: 'Enterprise'
date: '2024-09-23'
---

In MySQL, it is common to have an integer primary key that uses the `AUTO_INCREMENT` feature for assigning IDs.
However, if you have a horizontally-sharded table, you will not be able to use `AUTO_INCREMENT` for your ID.
In such a setup, the rows of the table are distributed across many instances of MySQL.
The separate instances of MySQL do not have a built-in way to coordinate which IDs are in use and which are not.
Instead, you will need to use a **sequence table**.

A [sequence table](https://vitess.io/docs/reference/features/vitess-sequences) is a special table that contains metadata for managing the incrementing ID values for the column of a horizontally sharded table.
Each time you create a new horizontally sharded table, you should create the corresponding sequence table and update the VSchema.

## Creating a horizontally-sharded table

We recommend keeping [safe migrations](/docs/concepts/safe-migrations) enabled for all production databases.
Thus, the first step to make schema modifications is to create a new [branch](/docs/concepts/branching),
and connect to it via the [command line](/docs/reference/planetscale-cli).

Next, to create a horizontally-sharded table, switch to your desired sharded keyspace.
Create a new table in this keyspace, and do _not_ use `AUTO_INCREMENT` for your ID column.
For example, to create a table in the `test_sharded` keyspace, run:

```sql
USE test_sharded;
CREATE TABLE test(id BIGINT UNSIGNED PRIMARY KEY, data JSON);
```

Next, switch over to the unsharded keyspace that you want to use for sequence tables.
Here, you'll create a sequence table.
It is good practice to use the same name as the sharded table with `_seq` or `_sequence` appended.
Being consistent with this naming will help maintain a clear association between your data tables and sequence tables.

```sql
USE test_unsharded;
CREATE TABLE test_seq(id bigint, next_id bigint, cache bigint, primary key(id)) comment 'vitess_sequence';
```

We also need to update the [VSchema](/docs/sharding/vschema) of our database.
We need to tell Vitess about this new `SEQUENCE`, let it know to use the `id` column as the shard key, and tell it to use the `test_seq` table for fetching auto incrementing IDs.

```sql
ALTER VSCHEMA ADD SEQUENCE `test_unsharded`.`test_seq`;

ALTER VSCHEMA ON `test_sharded`.`test` ADD VINDEX hash(id) USING hash;

ALTER VSCHEMA ON `test_sharded`.`test` ADD auto_increment id USING `test_unsharded`.`test_seq`;
```

When you are comfortable with your schema changes, create a [deploy request](/docs/concepts/deploy-requests) and merge.

## Sequence table values

Unlike vanilla Vitess, PlanetScale will automatically populate the single required row into any sequence table created with the above steps.
After merging your deploy request, you should be able to query the sequence table as follows:

```sql
SELECT * FROM test_unsharded.test_seq;
+----+---------+-------+
| id | next_id | cache |
+----+---------+-------+
|  0 |       1 |  1000 |
+----+---------+-------+
1 row in set (0.04 sec)
```

- `id` Should always be 0.
- `next_id` represents the next ID in the sequence to be fetched. You typically want this to start as 1.
- `cache` represents the number of IDs that can be fetched and cached by a VTTablet. For good performance, this should be set to a large number like 1000 or more.

We can check that the sequence table is working in assigning IDs by inserting a new row and then querying for the row with ID `1`.

```sql
INSERT INTO test (data) VALUES ('{"errors": [{"message": "Error message", "code": 10}]}');
Query OK, 1 row affected (0.06 sec)

SELECT data FROM test WHERE id=1;
+--------------------------------------------------------+
| data                                                   |
+--------------------------------------------------------+
| {"errors": [{"message": "Error message", "code": 10}]} |
+--------------------------------------------------------+
1 row in set (0.05 sec)
```

{% callout %}
Check out the [Vitess documentation on sequences](https://vitess.io/docs/reference/features/vitess-sequences/) for more information.
{% /callout %}
