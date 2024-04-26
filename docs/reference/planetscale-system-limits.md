---
title: 'PlanetScale system limits'
subtitle: 'Learn about system limits that PlanetScale puts in place to protect your database.'
date: '2024-04-26'
---

## Table limits

Database schemas are limited to a total of `2048` tables, including views.

Individual tables are limited to a maximum of `1017` columns each.

## Connection lifetime limits

Database client connections that are held open longer than `24 hours` may be terminated unexpectedly. We recommend that long running database connections are closed and reconnected at least once per day.

## Query limits

PlanetScale has enforced some system limits to prevent long-running queries or transactions from:

- Piling up and consuming all available resources.
- Blocking other important, short-lived queries and transactions from completing.
- Overloading the database to the point where it is not recoverable without a restart.
- Blocking planned failovers and critical upgrades.

The following table details these limits:

| Type                                         | Limit |
| -------------------------------------------- | ----- |
| Per-query rows returned, updated, or deleted | 100k  |
| Per-query DML timeout                        | 30s   |
| Per-query `SELECT` timeout                   | 900s  |
| Per-transaction timeout                      | 20s   |

### Recommendations for handling query limits

These limits are enforced for the safety of your database. However, we do understand you may run into a situation where the limits are a blocker. Here are some best practices for solving common issues presented by the limits:

**What should I do if I have a query that returns more than 100,000 records?**

We recommend trying to break up large queries, e.g. through pagination.

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
