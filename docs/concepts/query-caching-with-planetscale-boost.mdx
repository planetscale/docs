---
title: 'Query caching with PlanetScale Boost'
subtitle: 'Improve query performance with PlanetScale Boost query caching.'
date: '2022-11-15'
---

{% callout %}
PlanetScale Boost is in limited beta. [Reserve your spot on the waitlist](https://planetscale.com/features/boost) today.
{% /callout %}

## Overview

PlanetScale Boost (limited beta) significantly improves the performance of queries that you choose to accelerate. Once deployed, queries that repeatedly request the same results will fetch them from a very fast memory-backed cache instead of MySQL. Even more importantly, when relevant data changes in the database, the cache is kept up-to-date automatically. It is useful for many of the same use cases as an application cache backed by Redis or memcached, but there is no need to build tedious cache invalidation logic or maintain caching infrastructure.

While PlanetScale Boost is in beta, we don’t recommend using it in your critical path. During the limited beta period, we will be optimizing for making changes and iterating quickly, and this may break implicit assumptions. We will go through every effort to notify users when large changes are made, but we don’t want you to get into a situation where we break something you rely on.

## How to use PlanetScale Boost

PlanetScale Boost is in limited beta. [Reserve your spot on the waitlist](https://planetscale.com/features/boost) to get access for your organization. If your organization is accepted into the beta, you will receive an email with further instructions on how to get started. Please share any feedback or questions you have by posting on the GitHub discussion board, which is included in your welcome email.

### Add a query to your cache

Navigate to the "Boost" tab in the PlanetScale console, which will appear once you are accepted into the limited beta.

1. Once your cache is set up, click the "**Add query**" button.
2. This takes you to a list of slow queries run in the past 24 hours. Generally, you want to choose queries that have a higher time per query and/or total time. Just be aware that [not all queries are good candidates for PlanetScale Boost](#when-to-use-planetscale-boost).
3. Click on the query you want to add.
4. You have the option to fill in the placeholders with specific values. The cache can either match the entire query pattern or the specific values you provide.
5. Give the query a name to allow it to be easily identified later on.
6. Choose the cache size.
7. Click **"Add to cache"**.

You also have the option to [add queries directly from the Insights page](https://planetscale.com/docs/concepts/query-insights) in the dashboard. Click on an individual query in Insights, and you'll see a **"Cache query"** button on that page.

### Using cached queries in your application

Now that you've added queries to your cache, you can start using them in your application. This is done by setting a session variable on your database connection:

```sql
SET @@boost_cached_queries = true;
```

Once that is set, any matching query patterns on that same connection will be served by the cache. Non-matching queries will work as usual.

The inverse of that variable can be set to disable the cache:

```sql
SET @@boost_cached_queries = false;
```

You have the option to run **all** queries through a connection with caching enabled. Queries that do not match a cached query pattern will run as normal. While supported, we recommend using separate connections for your cached and un-cached queries. This makes it easy to read your code to understand when a query is potentially using the cache and could be impacted by a potentially out-of-date cache. We expand on this in the following section.

#### Option 1: Separate connection for cached queries (recommended)

We recommend setting up a separate connection for your cached queries.

In this example, our application has two connections. One with caching enabled and another without:

```js
const boostedConn = mysql.createConnection(config)
boostedConn.query('SET @@boost_cached_queries = true;')

const conn = mysql.createConnection(config)
```

Having these separate connections makes it simple and explicit in your code which queries may return cached results and those that will not.

```js
// query run through connection with caching enabled
const boostedQuery = boostedConn.query("SELECT COUNT(id) FROM big_table WHERE season = 'fall';")

// regular connection
const user = conn.query("SELECT id, username, email FROM users WHERE id = 1006”)
```

{% callout type="warning" %}
Make sure that all queries you want to accelerate using PlanetScale Boost are using a cache-enabled connection in your
application.
{% /callout %}

#### Option 2: Single connection for all queries

If you wish to run all queries through a cache-enabled connection, your configuration may look something like this:

```js
const boostedConn = mysql.createConnection(config)

// Once boost_cached_queries is set for a connection, all subsequent queries can use PlanetScale Boost.
boostedConn.query('SET @@boost_cached_queries = true;')

// boosted query
const boostedResults = boostedConn.query("SELECT COUNT(id) FROM big_table WHERE season = 'fall'")

// non-boosted query
const nonBoostedResults = boostedConn.query('SELECT id, username, email FROM users WHERE id = 1006')
```

As you can likely tell, with this method, there is no way to discern which queries use the cache without looking at the PlanetScale dashboard.

**You can check out our PlanetScale Boost framework guides for further instructions:**

- [Using PlanetScale Boost with Rails](/docs/tutorials/rails-boost-guide)
- [Using PlanetScale Boost with Laravel](/docs/tutorials/laravel-boost-guide)
- [Using PlanetScale Boost with Go](/docs/tutorials/go-boost-guide)
- [Using PlanetScale Boost with Prisma](/docs/tutorials/prisma-boost-guide)

## Replication lag and read-your-writes

The PlanetScale Boost cache is automatically kept up-to-date as rows are inserted, updated, and deleted. There is a small delay between when these changes are committed to the database and when the cache has been updated. This delay is typically measured in hundreds of milliseconds. Those of you familiar with MySQL replication can think of it as reading from a replica. Typically we've found that most use cases work perfectly fine, even when returning results that may be slightly out-of-date.

This means that a code path that changes data in the database and then immediately queries the same data using the cache may observe query results that do not include those prior changes. It takes a small amount of time for changes to propagate from the database itself to the cache service. For some code paths, even a tiny delay in this propagation may create user experience issues.

An example of this behavior is a case where the application creates a new object and then immediately shows that same object's data by reading it from the database. If this operation queries using the cache and the cache hasn't yet received the data for that new object, the application may inadvertently return empty results or an error. For such cases where the application might break by querying even slightly out-of-date results, it's best to query data from a connection without caching enabled.

## Schema changes with cached queries

While a query is cached, any columns used by the query cannot be changed in a deploy request. The cached query must be removed and then re-added after the deploy request has completed.

### SELECT \* queries

When adding queries to PlanetScale Boost, we recommend selecting specific columns rather than using `select *`. When using `select *` you will not be able to make any changes to the table
used in a deploy request while the cached query is active.

## When to use PlanetScale Boost

While a broad range of typical application queries can be accelerated, not all queries and use cases are good candidates for PlanetScale Boost. While ultimately, the best way to understand what works for your application is to perform testing, here are five guidelines to get you started:

1. Like all caches, it is best when most of the queries at a certain point in time are focused on a subset of the overall data set. The 80/20 rule applies well here, i.e., 80% of the queries read 20% of the data.

2. The more expensive the query is to run on the underlying database, the better the performance gain will be using PlanetScale Boost.

3. Queries that filter most of their data (i.e., are most selective) via a range operation like less-than, greater-than, or `BETWEEN` operators don't currently work well and should be avoided. This will be improved in a future release.

4. "Non-deterministic" functions like `NOW()` or `RAND()` will often result in a 100% cache miss rate as these are moving targets.

5. Queries that typically return a moderately large result set, like thousands or tens of thousands of rows, are generally not great candidates.

## Known limitations

PlanetScale Boost does not support all valid SQL queries.

- Query parameters are only supported within the context of `WHERE` statements and need to be used with either `=` or `IN` equality.
- Only one `IN` operator is supported per `WHERE` clause in your query.
- Expressions need to return consistent results. This means that using `NOW()` or `RAND()` in results is not supported.
- Expressions used in queries need to be supported by the Vitess evaluation engine. For instance, some functions aren't currently supported, which are listed in [this Vitess issue](https://github.com/vitessio/vitess/issues/9647).

The PlanetScale Boost engine is under active development and improving rapidly during the limited beta period. Aspects such as expression support in Vitess will continue to evolve.

## PlanetScale Boost pricing

During the limited beta period, PlanetScale Boost is free. We appreciate all your feedback and questions. Once the limited beta has ended, all users will need to opt-in to using the paid version. We will not automatically transition you to the paid version.
We will notify all beta users via email before the end of the beta.
