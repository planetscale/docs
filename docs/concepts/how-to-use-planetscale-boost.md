---
title: 'How to use PlanetScale Boost'
subtitle: 'Learn how to enable a cache and use PlanetScale boost in your application.'
date: '2023-07-24'
---

PlanetScale Boost (beta) works by selecting an available cache size, then selecting from a list of slow queries that have been processed by your database.

{% callout %}
PlanetScale Boost is available on databases with a paid plan that have a production branch with [safe migrations](/docs/concepts/safe-migrations) enabled.
{% /callout %}

## Select a cache size

Before you can use PlanetScale Boost, you must select a cache size. Cache sizes are available in 1 GB, 2 GB, 4 GB, and 8 GB sizes. Each cached query allocates a minimum of 256MB of space within the cache but can consume more if needed. This means that, at most, each cache can store 4× of the size of the caches in GB:

| Cache size | Max cached queries |
| ---------- | ------------------ |
| 1 GB       | 4 queries          |
| 2 GB       | 8 queries          |
| 4 GB       | 16 queries         |
| 8 GB       | 32 queries         |

{% callout %}
If you need a cache size greater than 8 GB, please [contact our support team](https://support.planetscale.com/hc/en-us).
{% /callout %}

To select a cache size, navigate to the "**Boost**" tab in the PlanetScale console and click "**Add a query cache**". A modal will appear asking you to select your desired cache size. Once you've selected the cache size needed for your application, click "**Add cache size**" to enable it.

## Add a query to your cache

1. Once your cache is set up, click the "**Add query**" button.
2. This takes you to a list of slow queries run in the past 24 hours. Generally, you want to choose queries that have a higher time per query and/or total time. Just be aware that [not all queries are good candidates for PlanetScale Boost](/docs/concepts/when-to-use-planetscale-boost).
3. Click on the query you want to add.
4. You have the option to fill in the placeholders with specific values. The cache can either match the entire query pattern or the specific values you provide.
5. Give the query a name to allow it to be easily identified later on.
6. Choose the cache size.
7. Click **"Add to cache"**.

You also have the option to [add queries directly from the Insights page](/docs/concepts/query-insights) in the dashboard. Click on an individual query in Insights, and you'll see a **"Cache query"** button on that page.

## Using cached queries in your application

Now that you've added queries to your cache, you can start using them in your application. This is done by setting a session variable on your database connection:

```sql
SET @@boost_cached_queries = true;
```

Once that is set, the cache will serve any matching query patterns on that same connection. Non-matching queries will work as usual.

The inverse of that variable can be set to disable the cache:

```sql
SET @@boost_cached_queries = false;
```

You have the option to run **all** queries through a connection with caching enabled. Queries that do not match a cached query pattern will run as normal. While supported, we recommend using separate connections for your cached and un-cached queries. This makes it easy to read your code to understand when a query is potentially using the cache and could be impacted by a potentially out-of-date cache. We expand on this in the following section.

### Option 1: Separate connection for cached queries (recommended)

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

### Option 2: Single connection for all queries

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

## Guides by language/framework

You can check out our PlanetScale Boost framework guides for further instructions:

- [Using PlanetScale Boost with Rails](/docs/tutorials/rails-boost-guide)
- [Using PlanetScale Boost with Laravel](/docs/tutorials/laravel-boost-guide)
- [Using PlanetScale Boost with Go](/docs/tutorials/go-boost-guide)
- [Using PlanetScale Boost with Prisma](/docs/tutorials/prisma-boost-guide)
