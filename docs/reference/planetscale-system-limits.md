---
title: 'PlanetScale system limits'
subtitle: 'Learn about system limits that PlanetScale puts in place to protect your database.'
date: '2023-01-30'
---

PlanetScale has enforced some system limits to prevent long-running queries or transactions from:

- Piling up and consuming all available resources.
- Blocking other important, short-lived queries and transactions from completing.
- Overloading the database to the point where it is not recoverable without a restart.
- Blocking planned failovers and critical upgrades.

The following table details these limits:

| Type                       | Limit |
| -------------------------- | ----- |
| Per-query row              | 10k   |
| Per-query DML timeout      | 30s   |
| Per-query `SELECT` timeout | 30s   |
| Per-transaction timeout    | 30s   |

## Recommendations for handling limits

These limits are enforced for the safety of your database. However, we do understand you may run into a situation where the limits are a blocker. Here are some best practices for solving common issues presented by the limits:

**What should I do if I have a query that returns more than 10,000 records?**

We recommend trying to break up large queries, e.g. through pagination.

**What should I do if I have a query that runs longer than 30 seconds?**

For queries that are running for longer than 30 seconds, we recommend breaking these up into multiple shorter queries. For analytics queries that are not possible to break up, see "How should I handle analytical queries?" below.

Keep your transactions small and short-lived. For transactional workloads that are inherently long-lived, consider replacing or complementing MySQL transactions with other techniques:

- For simple workloads (e.g. a `SELECT`, followed by an HTTP request, followed by an `UPDATE`), consider using optimistic locking instead of transactions.
- For complex workloads, consider using sagas to coordinate a series of small, short-lived transactions that possibly span multiple microservices.

**How should I handle analytical queries?**

We recommend using [PlanetScale Connect](/blog/extract-load-and-transform-your-data-with-planetscale-connect) (via [Airbyte](/docs/integrations/airbyte) or [Stitch](/docs/integrations/stitch)) to extract your data to any compatible destination (e.g. BigQuery, Redshift, etc.). The analytics queries should then be performed at those destinations.

## OLAP mode

While it is possible to bypass these safety limits using `OLAP` mode (`SET workload = OLAP`), we do not recommend this for the reasons listed at the beginning of this doc.

When the use of OLAP queries is strictly unavoidable, we recommend:

- Where possible, sending those queries to a replica.
- Carefully and regularly reviewing the performance of those queries with [PlanetScale Insights](/docs/concepts/query-insights).
