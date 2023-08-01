---
title: 'Query caching with PlanetScale Boost'
subtitle: 'Improve query performance with PlanetScale Boost query caching.'
date: '2023-07-24'
---

## Overview

PlanetScale Boost (beta) significantly improves the performance of queries that you choose to accelerate. Once deployed, queries that repeatedly request the same results will fetch them from a very fast memory-backed cache instead of MySQL. Even more importantly, when relevant data changes in the database, the cache is kept up-to-date automatically. It is useful for many of the same use cases as an application cache backed by Redis or memcached, but there is no need to build tedious cache invalidation logic or maintain caching infrastructure.

## Like a cache, but better

PlanetScale Boost is _similar_ to a traditional cache but with many improvements:

- Automatically handles cache invalidation
- Requires minimal changes to your application code (No fallback logic, TTLs, etc.)
- No configuring/maintaining/hosting cache servers
- No dealing with cache inconsistency after job failures
- Scale cache size up or down with the click of a button
- Automatically handles cache stampedes/dogpiling

Let's dig into some of these to illustrate better what PlanetScale Boost is and how it works.

## PlanetScale Boost automatically handles cache invalidation

With PlanetScale Boost, you don't have to worry about cache invalidation &mdash; we do it for you. The in-memory server holds the results of the executed query. Queries in the cache maintain an open stream where they are constantly and automatically updated.

One important thing to note is that while you don't have to worry about invalidating the cache on your own when results become stale, there may be a small (\<2 seconds) delay before the new results populate. This is a small tradeoff that you make to get the performance increases that come with PlanetScale Boost. In a traditional caching system, you would experience a much larger delay in getting the new data results, as the query would have to run fresh again after being invalidated.

If you write data and immediately need to read those updated results, we don't recommend using PlanetScale Boost in that scenario. You can still use PlanetScale Boost on that query if it's used elsewhere without immediately reading after an update, but in your application code, you should read the data with the regular unboosted connection where applicable. You can think of the delay as similar to that of a read-only replica.

## Minimal configuration and application code changes

Another huge benefit of PlanetScale Boost is the ease of implementation. If you were to configure caching on your own, it would generally require a lot of application-level changes, such as setting cache keys, handling invalidation, etc. In addition, you'd have to configure and maintain your cache servers, which adds a new level of complexity.

With PlanetScale Boost, you keep application-level changes to a minimum and don't have to worry about server configuration at all. You can use [PlanetScale Insights](/docs/concepts/query-insights) to discover slow queries that would be good candidates to boost straight from the PlanetScale dashboard. From there, the last step is to set a session variable in your application and apply it to your boosted connection. Any query that you want to boost goes through the connection, and everything else is automatically handled for you.

## How it works

When PlanetScale Boost is enabled for a database, a dedicated server is created and configured for the Vitess cluster running that database. This server hosts an in-memory data cache that stores partially materialized views of queries that are "boosted." When a boosted query is received by the [Vitess VTGate](https://vitess.io/docs/17.0/concepts/vtgate) (the lightweight proxy responsible for routing queries within a Vitess cluster) and routed to the PlanetScale Boost server, the query is rewritten from its current form into a single in-memory lookup, which in turn simulates the performance of a lookup within systems like `memcached` as opposed to querying a relational database.

PlanetScale Boost uses [Vitess VStream](https://vitess.io/docs/17.0/concepts/vstream/) under the hood to enable the constant streaming of query results to the cache. What about this instead? Because the result of the original query is already cached; we do not have to re-run the entire query when a change comes in, we just watch the change stream. As a result, we only have to recompute the small amount of data that changes.

## PlanetScale Boost pricing

PlanetScale Boost is billed at a fixed rate per month, however the price of a specific cache size depends on the cloud provider and region where your database is hosted. For the most accurate pricing, navigate to the "**Boost**" tab of your database and click the "**Add a query cache**" button to display a model with specific pricing on the caches available for your database.

As an example, the following table lists the cost of each available query cache size in the AWS `us-east-1` region at the time of this writing:

| **Query cache size** | **Cost per month** |
| -------------------- | ------------------ |
| 1 GB cache           | $99                |
| 2 GB cache           | $299               |
| 4 GB cache           | $599               |
| 8 GB cache           | $899               |

{% callout %}
**Whats next?**

To learn more about PlanetScale Boost, check out the following pages:

- [How to use PlanetScale Boost](/docs/concepts/how-to-use-planetscale-boost)
- [When to use PlanetScale Boost](/docs/concepts/when-to-use-planetscale-boost)

{% /callout %}
