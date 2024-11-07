---
title: 'Vindexes'
subtitle: 'Vindexes determine how the rows of your database will be horizontally sharded.'
date: '2024-11-07'
---

{% callout %}
You can create sharded keyspaces on any plan by adding a new sharded keyspace using the [cluster configuration page](/docs/concepts/cluster-configuration) and running an [unsharded to sharded workflow](/docs/sharding/sharding-quickstart) in your dashboard.

If you would like additional support from our expert team, our [Enterprise plan](/docs/concepts/planetscale-plans#planetscale-enterprise-plan) may be a good fit. [Get in touch](/contact) for a quick assessment.
{% /callout %}

When configuring a horizontally [sharded](/sharding) keyspace, one of the most important decisions to make is _how_ to distribute the data across shards.
To do this, we must select a **Vindex** (Vitess index) for each table.

A **[Vindex](https://vitess.io/docs/20.0/reference/features/vindexes/)** provides a way to map incoming rows of data to the appropriate shard in your keyspace.
Similar to how every MySQL table must have a primary key, every sharded table must additionally have a **primary Vindex**.
The primary Vindex is the Vindex that determines which shard each row of data will reside on.
Additional **secondary Vindexes** can be created to help speed up queries in a sharded environment.
This is analogous to using a secondary index in MySQL.

## How do Vindexes work?

Vindexes come in two main types: **functional** and **lookup**.

### Functional Vindex

A functional Vindex is a Vindex that takes one or more column value(s) from an incoming row, executes a function, and produces a 64 bit number as output (keyspace ID).
The input column will typically be something like your `user_id` or `tenant_id` column in your sharded table.
Each time a row is inserted into the table, Vitess will extract this column value and run it through the Vindex function.
This could be the identity function (a function that returns its input), but there are also a number of [built-in functions](https://vitess.io/docs/reference/features/vindexes/#predefined-vindexes) to choose from.
`xxhash` is a commonly used one, as it does a good job of keeping data spread out evenly amongst shards.
The function will return a keyspace ID, which tells Vitess which shard the row should be saved to.

### Lookup Vindex

A lookup Vindex is a Vindex that uses a lookup table to store the mapping between the column value and the keyspace ID.
In this setup, you would create a dedicated lookup table with at least two columns: `from` and `to`.
The `from` column should contain the possible column values that we need to map to shards, and the `to` column contains the corresponding `keyspace ID` for that shard.
Each time a new row needs to be inserted, Vitess looks up the mapping in the table and uses the resulting `keyspace ID` to send it to the appropriate shard.
Lookup indexes tend to be slower than functional ones, therefore functional is preferred when possible.

## Keyspace IDs

In Vitess terminology, "keyspace ID" does not mean "The ID of a keyspace."
Rather, it is an identifier used to determine which shard a row should be stored on _within_ a keyspace.

When a single keyspace contains multiple shards (horizontal sharding), each shard must follow the [sharding naming conventions](https://vitess.io/docs/concepts/shard/#shard-naming).
Each will be named according to the range of keyspace IDs it is responsible for, formatted like `BEGIN_ID-END_ID`.
The first shard will have an empty `BEGIN_ID` and the last one an empty `END_ID`.
For example, if we wanted to set up a keyspace with four shards, and each one is responsible for exactly one quarter of the keyspace IDs, we should name them: `-40`, `40-80`, `80-c0`, `c0-`.
You can find more information about shard naming on the [Vitess website](https://vitess.io/docs/concepts/shard/).

## Primary Vindexes

Every horizontally sharded table must have a primary Vindex.
Let's consider the following `exercise_log` table and determine which column we should use for our primary Vindex.

```sql
+-------------+-----------------+------+-----+---------+----------------+
| Field       | Type            | Null | Key | Default | Extra          |
+-------------+-----------------+------+-----+---------+----------------+
| log_id      | bigint unsigned | NO   | PRI | <null>  | auto_increment |
| user_id     | bigint unsigned | NO   |     | <null>  |                |
| exercise_id | bigint unsigned | NO   |     | <null>  |                |
| gym_id      | bigint unsigned | NO   |     | <null>  |                |
| reps        | smallint        | YES  |     | <null>  |                |
| created_at  | datetime        | YES  |     | <null>  |                |
| edited_at   | datetime        | YES  |     | <null>  |                |
| deleted_at  | datetime        | YES  |     | <null>  |                |
| notes       | varchar(1024)   | YES  |     | <null>  |                |
+-------------+-----------------+------+-----+---------+----------------+
```

Each `exercise_log` row has an auto incrementing `log_id`.
Each row will also have other IDs acting as foreign keys to other tables:

{% callout %}
You can't use an `auto_increment` primary key in a sharded keyspace.
Instead you'll need to use a [sequence table](/docs/sharding/sequence-tables).
{% /callout %}

- `user_id` is a foreign key to a `user` table
- `exercise_id` is a foreign key to an `exercise` table
- `gym_id` is a foreign key to a `gym` table

In some cases, using the `primary key` as the primary Vindex can be helpful, so let's start by considering `log_id`.
For each row inserted into this table, we could take the `log_id`, run it through an `xxhash` functional Vindex, and then the result would be used by Vitess to assign the row to a shard.
This would cause all of the rows to get evenly distributed across all shards, which is good for insert performance.

However, when considering what to choose for the primary Vindex, it is important to consider the types of queries your database is expected to fulfill.
We may have queries that need to fetch sequences of logs for a given user.
Something along the lines of:

```sql
SELECT *
FROM exercise_log
  WHERE user_id = $SOME_USER_ID
  AND created_at BETWEEN $START_CREATED_AT AND $END_CREATED_AT;
```

If we use `log_id` as the primary Vindex, the rows will be seemingly "randomly" distributed across shards.
Each one of these queries would have to search all shards for the log messages of a single user.
This would hurt performance severely if this query is executed frequently.

Instead, we could choose `user_id` for our primary Vindex.
A given `user_id` will always produce the same output hash, meaning all of the logs for user X will end up on the same shard.
This means that when a user wants to view their exercise log history, a single shard will be able to fulfill the query, leading to improved performance.

Queries are more performant when performed on a single shard. In other words, cross-shard queries are _less_ performant than single-shard queries.

## Secondary Vindexes

Secondary indexes are optional, but may be created to help speed up lookups for queries in your workload.

Consider the case where we want to look at sequences of the log that happened for all users at a specific gym.
Such a query would look something like this:

```sql
SELECT reps, notes, created_at
FROM exercise_log
  WHERE gym_id = $SOME_GYM_ID
  ORDER BY created_at DESC
  LIMIT 1000;
```

In this case, we are not doing any filtering by the primary Vindex, and instead using `gym_id`.
Without a secondary index, Vitess has no way of knowing which shard(s) to look at to get the rows.
To execute this, it would have to send a query to all shards, aggregate the results, and then return to the client.
We can set up a secondary lookup Vindex to help with this.

To keep the example simple, we will make an over-simplification and assume that each user goes to exactly one gym and never changes gyms.
We will need to create a lookup table in MySQL to store the mapping between gyms and logs.
The table will have two columns, `from` and `to`.

```sql
CREATE TABLE gym_id_exercise_log_lookup_vindex (
  from BIGINT UNSIGNED,
  to BINARY(64),
  primary key(from)
);
```

The `from` column can be populated with the `gym_id`s from the `gym` table, and the `to` colum will store the corresponding keyspace ID.
This could then be used with a Vindex function like `consistent_lookup_unique` to fulfill queries and send requests to the appropriate shards when executing the query.

## Built-in functional Vindexes

Vitess supports a [many predefined functional Vindexes](https://vitess.io/docs/20.0/reference/features/vindexes/#predefined-vindexes).
Here we'll cover a subset, and in what scenarios you might consider using them.

### `hash` and `xxhash`

These are popular choices, particularly for use as a primary Vindex.
They are especially useful when creating a Vindex from an incrementing ID.
This is because a sequence of numbers that are close to each other will be assigned wildy different outputs, spreading them out nicely across shards.
For example, user IDs `1`, `2`, `3`, `4`... might hash to a sequence like `3e8a`, `9b11`, `de1e`, `781b`...

`hash` should generally be avoided in favor of `xxhash`
`hash` uses the DES hashing algorithm whereas `xxhash` uses the xxhash64 algorithm.
DES was designed to be cryptographically secure and xxhash64 is not, leading to xxhash64 having better performance.
If you do not need cryptographic security for your keyspace ID, use `xxhash`.

### `numeric`

This acts as the identify function.
Since keyspace IDs need to be 64 bit numeric values, this only works for a column that are 64 bits or smaller.
A numeric Vindex function has the advantace of being the most performant.

This Vindex can be useful when you already have a good numeric key to hash on inherent in the schema of your database.
This might be a good choice if you have a database with multiple tenants and you want to have one tenant per-shard.
If you already have a `tenant_id`, you can use this value directly as your key to shard on.

### `consistent_lookup` and `consistent_lookup_unique`

These are used for lookup Vindexes, and should be used in favor of the older `lookup` and `lookup_unique` Vindexes.
These provide better performance, as they do not require two-phase commit to look up a value.
If you need to do lookup-table based Vindexing, we recommend one of these two options.

### `numeric_static_map`

This Vindex allows you to specify a static mapping between input column values and keyspace IDs via a JSON file.
This is a good option if you have a small set of mappings that can be easily managed in JSON.
If the set of mappings is large, you can opt for something like `consistent_lookup` instead.

## Next steps

This page mostly focuses on Vindexes conceptually.
If you want to see an example of how to update your Vschema to use a Vindex, check out the [sharding walkthrough](/docs/sharding/quickstart).
