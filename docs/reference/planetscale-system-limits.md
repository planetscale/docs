---
title: 'PlanetScale system limits'
subtitle: 'Learn about system limits that PlanetScale puts in place to protect your database.'
date: '2024-08-28'
---

## Table limits

Database schemas are limited to a total of `2048` tables, including views.

Individual tables are limited to a maximum of `1017` columns each.

## Connection lifetime limits

Database client connections that are held open longer than `24 hours` may be terminated unexpectedly. We recommend that long running database connections are closed and reconnected at least once per day.

## Simultaneous transaction limits

Each database has a limit on the number of simultaneous _transactions_ it can process, also known as the _transaction pool_.
If you exceed the _transaction pool_ setting for your database, you may encounter this error:

```
vttablet: rpc error: code = ResourceExhausted desc = transaction pool connection limit exceeded
```

This often can be mitigated by trying the one of the following solutions:

A) Reduce the amount of parallelism in the requests being sent to the database.
B) Shorten lengthy transactions by reducing batch sizes or making some other application-level adjustment.

If you cannot make such changes to your application, consider choosing a larger instance type with a larger transaction pool.
The exact limit varies depending on the instance type of your database.
For details, see the [plans page](/docs/concepts/planetscale-plans).

## Query limits

PlanetScale has enforced some system limits to prevent long-running queries or transactions from:

- Piling up and consuming all available resources.
- Blocking other important, short-lived queries and transactions from completing.
- Overloading the database to the point where it is not recoverable without a restart.
- Blocking planned failovers and critical upgrades.

The following table details these limits:

| Type                                         | Limit  |
| -------------------------------------------- | ------ |
| Per-query rows returned, updated, or deleted | 100k   |
| Per-query result set total size              | 64 MiB |
| Per-query DML timeout                        | 30s    |
| Per-query `SELECT` timeout                   | 900s   |
| Per-transaction timeout                      | 20s    |

### Recommendations for handling query limits

These limits are enforced for the safety of your database. However, we do understand you may run into a situation where the limits are a blocker. Here are some best practices for solving common issues presented by the limits:

**What should I do if I have a query that returns more than 100,000 records?**

We recommend trying to break up large queries, e.g. through pagination.

**What should I do if I have a query that returns more than 64 MiB of data?**

If your schema currently relies on storing large amounts of variable length data within `JSON`, `BLOB`, or `TEXT` type columns that is regularly over a few MiB in size you will want to strongly consider storing that variable length data outside of your database, such as within an object storage solution, instead.

If large values are stored within variable length data columns it can limit the number of rows you can return.

For example, above we described a 100K limit for result sets, but if your result set's size exceeds the 64 MiB limit then you may receive an error message like the following: `resource_exhausted: grpc: received message larger than max (<RESULT_SET_SIZE_IN_BYTES> vs. 67108864)` when retrieving much less than 100K rows.

Similarly, when generating a large `INSERT` or `UPDATE` query for these types of columns you may run into the `grpc: trying to send message larger than max (<QUERY_SIZE_IN_BYTES> vs. 67108864)` error message which would require you to reduce the query's size.

**What should I do if I have a query that runs longer than 30 seconds?**

For queries that are running for longer than 30 seconds, we recommend breaking these up into multiple shorter queries. For analytics queries that are not possible to break up, see "How should I handle analytical queries?" below.

Keep your transactions small and short-lived. For transactional workloads that are inherently long-lived, consider replacing or complementing MySQL transactions with other techniques:

- For simple workloads (e.g. a `SELECT`, followed by an HTTP request, followed by an `UPDATE`), consider using optimistic locking instead of transactions.
- For complex workloads, consider using sagas to coordinate a series of small, short-lived transactions that possibly span multiple microservices.

**How should I handle analytical queries?**

We recommend using [PlanetScale Connect](/blog/extract-load-and-transform-your-data-with-planetscale-connect) (via [Airbyte](/docs/integrations/airbyte) or [Stitch](/docs/integrations/stitch)) to extract your data to any compatible destination (e.g. BigQuery, Redshift, etc.). The analytics queries should then be performed at those destinations.

### OLAP mode

While it is possible to bypass these safety limits using `OLAP` mode (`SET workload = OLAP`), we do not recommend this for the reasons listed at the beginning of this doc. In OLAP mode, you may return more than 100k rows from a single query, but the 100k row limit will still apply to updates and deletes.

When the use of OLAP queries is strictly unavoidable, we recommend:

- Where possible, sending those queries to a replica. Every PlanetScale database comes with at least two replicas. Learn how to send queries to replicas using [global replica credentials](/docs/concepts/replicas#how-to-query-replicas).
- Carefully and regularly reviewing the performance of those queries with [PlanetScale Insights](/docs/concepts/query-insights).

{% callout %}
Please note that if you choose to use OLAP mode, you need to be prepared to handle errors if the connection to PlanetScale gets interrupted for any reason.
{% /callout %}

## Reducing table size without `OPTIMIZE TABLE`

If you delete several rows in a table, you may wish to reclaim that storage space. The MySQL [`OPTIMIZE TABLE` statement](https://dev.mysql.com/doc/refman/en/optimize-table.html) allows you to reorganize the physical storage of table data to reduce its storage requirements.

However, `OPTIMIZE TABLE` is a locking operation, so you cannot use it unless you disable [safe migrations](/docs/concepts/safe-migrations) in PlanetScale, which is not recommended.

Any time you create and deploy a deploy request with safe migrations on, our schema change process uses [online DDL](/docs/learn/how-online-schema-change-tools-work), and in doing so, recreates the table that you are modifying &mdash; thus reclaiming the storage space.

But there are often cases where you do not need to make a schema change for a while, but you'd like to free up the space. In those cases, we suggest you do the following:

1. Create a new branch.
2. Run the following command:

```sql
ALTER TABLE <TABLE_NAME> COMMENT 'Optimize table size via DR - <YYYY-MM-DD>';
```

Where `<TABLE_NAME>` is the name of your table and `<YYYY-MM-DD>` is the current date.

3. Create a deploy request, and merge it into production.
