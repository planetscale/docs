---
title: 'When to use PlanetScale Boost'
subtitle: 'Understand what scenarios work best with PlanetScale Boost.'
date: '2023-07-24'
---

In this document, we'll explore the best queries in which PlanetScale Boost can improve the performance of your application. We'll also cover certain scenarios where it may not be the best fit and some known limitations of the system.

## Five guidelines to get started

While a broad range of typical application queries can be accelerated, not all queries and use cases are good candidates for PlanetScale Boost. While ultimately, the best way to understand what works for your application is to perform testing, here are five guidelines to get you started:

1. Like all caches, it is best when most of the queries at a certain point in time are focused on a subset of the overall data set. The 80/20 rule applies well here, i.e., 80% of the queries read 20% of the data.

2. The more expensive the query is to run on the underlying database, the better the performance gain will be using PlanetScale Boost. Aggregates like `COUNT` and `SUM` are great candidates.

3. Queries keyed via a range operation like less-than, greater-than, or `BETWEEN` operators don't currently work well and should be avoided. This is actively being improved.

4. "Non-deterministic" functions like `NOW()` or `RAND()` will often result in a 100% cache miss rate as these are moving targets.

5. Queries that typically return a large result set, like thousands or tens of thousands of rows, are generally not great candidates.

## It's a cache

To get the most out of PlanetScale Boost, you'll want to use it with queries that can best use its advanced caching architecture. To do that, it helps to understand a little bit about what's going on inside the machine.

PlanetScale Boost stores data in a purpose-built in-memory cache. It follows that many best practices for caching also apply. The cache should be used when strong consistency is not critical, for data that is much more frequently read than written, and where a small amount of data represents the lion's share of reads.

## Keying the cache

Each row in the cache has a corresponding key generated when the row is stored in the cache. This key is used to look up data in the cache when a database client issues a query. The key is built dynamically based on the parameters of the query and the data in the row. When a query is added to the cache, the query analyzer examines the structure of the query and its parameters to determine which data will be used to derive the key.

Let's look at a simple example of a fictitious social video application:

```sql
select count(*) from likes where video_id = ? and deleted_at is null
```

In this case, the number of non-deleted likes for a video is counted for display to users. This is a classic expensive query that scales poorly as the number of likes on a video increases. However, once boosted, if the data is present in the cache, it will respond nearly instantly. The key used for this is the query's placeholder for `video_id`. If the data is present in the cache, or if the query results in a _cache hit_, only a single in-memory hash table lookup is required to respond to this query.

The query analyzer also generates a mapping of the query to the database's schema. The mapping is used when checking the database's real-time change stream for any events which would impact the cache. In the case above, any updates to the "likes" table will result in an update to the cache keyed on the `video_id` placeholder. This mapping also allows for disqualifying a row for the cache, such as if the `deleted_at` column were to be set to a non-null value. In the example above, it will cause the cached count to be reduced by one.

## Composite cache keys

But what if more than one parameter is involved? In this next example, our social video app needs to display the number of likes between two users.

```sql
select count(*)
	from likes, videos
	where videos.id = likes.video_id
	  and videos.user_id = :user_id1
	  and likes.user_id = :user_id2
	  and videos.deleted_at is null
	  and likes.deleted_at is null;
```

This query returns the number of times user A liked user B's videos. In this case, the query analyzer builds a cache key out of both parameters: `user_id1` and `user_id2`. It builds a mapping that will capture updated rows in the "likes" table and the "videos" table. This mapping is more complex because of the inner join between these two tables. When a "likes" row is changed, the row doesn't contain all of the data required to derive the cache key. It only has one fragment to match on, the `user_id` column corresponding to the `user_id2` parameter.

This complex mapping instructs the cache to maintain links between the data cached for the `likes` table and the data cached for the `videos` table. This linkage allows quickly jumping from a single value for `user_id2` to all of the related cached rows and synchronizing them without additional database load.

## Complex queries with simple keys

To go even further, let's look at another high-traffic query for our social video app. Whenever a user's profile is viewed in the app, the following query is used to fetch the data necessary to render the first page of videos. A thumbnail is shown for each video, along with a like count. Performing this query is very expensive on popular profiles, resulting in millions of rows scanned.

```sql
select
    videos.id,
    videos.thumbnail_obj,
    video_likes.like_count
  from
    videos,
    (select video_id, count(*) as like_count
       from likes where deleted_at is null
       group by video_id) as video_likes
  where
    videos.id = video_likes.video_id and
    videos.user_id = ? and
    videos.deleted_at is null
  order by videos.created_at desc
  limit 25
```

Despite the complexity of this query, PlanetScale Boost generates a simple key for this, just to match the `user_id` column on the `videos` table. It stores all of the resulting rows under a single cache key. This illustrates an important point: minimizing the number of parameters in your cached query will make it more likely to work well with the cache.

## Queries that do not work

So far we've covered queries that work well with PlanetScale Boost, but some queries don't. Often it is because the software is still evolving and improving over time, but there are also cases where a cache can't really be fundamentally faster than the underlying database.

```sql
select count(*) from likes where created_at > ?
```

This query will return the number of likes created after the specified point in time. Using a cache for this query is not fundamentally more efficient than running the same query against MySQL. There is no way to store the count itself as an individual discrete value by key. The cache would need to store each row individually and then scan and tabulate them on-demand, which is the same thing MySQL is doing!

There is hope, however. This use case actually only needs counts per hour, per day, and per month. We can use a form of _dimensionality reduction_ on `created_at` to cache the aggregate in a more granular form.

```sql
select count(*) from likes
	where date_format(created_at, '%Y%m%d%H') = ?
```

In this case, the `date_format` function converts `created_at` into a string with a discrete value per hour instead of a regular datetime, which has a discrete value per microsecond! The cache will roll this up into a single key per hour, which is very efficient. If day or month granularity is also important, separate queries can be used for those granularities as well.

## Overly negative query

Another common kind of query that isn't supported is using a query parameter with a negative match, like `!=` or `NOT IN`.

```sql
select count(*) from videos
	where user_id = :user_id
	  and deleted_at is null
	  and face_filter_used != :face_filter

```

This query counts the videos made by a specific user which do _not_ use a specific face filter. The extra `!` is unassuming at first glance, but there is a problem in the potential cardinality of the `:face_filter` parameter when combined with a negative criteria. You may have come across a similar problem with negative values in database indexes.

There isn't a practical, performant way to derive a cache key for this query. If the `:user_id` and `:face_filter` parameters were used to construct a cache key, it massively increases the complexity of handling data changes. In that case, when a row is added to the videos table, the cache would need to scan all of the data in the cache under the `user_id` and update every cached count _besides_ the one matching the `face_filter_used` column.

In theory, the underlying cache key could be the same as using the equality (`=`) operator, a composite key of the `:user_id` and `:face_filter`. This would at least fix the performance issue when handling changes to the database but only ends up moving the complexity to the query side. Querying the data would require scanning every value in the cache by `user_id` and then excluding those which match the `:face_filter` parameter.

## Filling the cache

When a query can't find data in the cache for a given cache key, this is called a cache miss. When a cache miss occurs, a query is automatically issued to the MySQL database, and the results are populated in the cache. This operation is called a cache fill. Once the missing data is filled, the database's change stream is monitored in real-time to keep any cached data synchronized.

That means PlanetScale Boost needs to perform queries on the underlying database if the data hasn't been cached. A cache miss will take the same amount of time as issuing the query to the underlying MySQL database. If existing queries take a long time, like tens of seconds or more, or are being terminated, PlanetScale Boost won't help. It also means you will need to make sure there are adequate indexes to perform the cache fill queries.

These constraints are similar to what's required for a typical "bolt-on" application tier cache. Fortunately, in addition to how much development time is saved, when it comes to cache fills, PlanetScale Boost brings with it three other major improvements compared to a typical application tier cache to keep in mind:

First, it prevents thundering herds from overloading the database. A thundering herd occurs when a large number of clients observe a cache miss and try to fill the cache by querying the database at the same time. PlanetScale Boost only executes cache fills for a given key one at a time. Concurrent requests all wait for the same fill operation to complete. This is a very common problem with database caching, which is tedious and error-prone to deal with correctly in application logic.

Second, data changes that impact the cache typically don't require querying the database to update the cache. The best practice in application caching code is to delete the corresponding cache key upon changes, allowing the cache to be filled on-demand by reading clients. If the cached data involves many entities, these _invalidations_ are often overly aggressive to avoid cache inconsistencies. Instead, PlanetScale Boost monitors the database's real-time change and accurately and precisely synchronizes the cache with the database.

Finally, PlanetScale Boost provides ordered consistency with cached data. Without complex version accounting logic, which is quite rare in practice, an application-level cache can't guarantee that the data in the cache is consistent with the database. Concurrent fill and invalidation operations will race, resulting in an undefined state. Typically TTLs are used to bound this impact, but higher TTLs trade better performance for worse consistency. PlanetScale Boost manages all this for you and ensures your cache has the latest data, just like MySQL replication.

## Replication lag and read-your-writes

The PlanetScale Boost cache is automatically kept up-to-date as rows are inserted, updated, and deleted. There is a small delay between when these changes are committed to the database and when the cache has been updated. This delay is typically measured in tens of milliseconds. Those of you familiar with MySQL replication can think of it as similar to reading from a replica.

This means that code that alters data in the database and then immediately queries those same rows using the cache may observe query results that do not include the prior changes. It takes a very small amount of time for changes to propagate from the database itself to the cache service. Even a tiny delay in this propagation may create user experience issues for some code paths.

An example of this behavior is a case where the application creates a new object and then immediately shows that same object's data by reading it from the database. If this operation queries using the cache and the cache hasn't yet received the data for that new object, the application may inadvertently return empty results or an error. For such cases where the application might break by querying even slightly out-of-date results, it's best to query data from a connection without caching enabled.

## PlanetScale Boost pro tips

### Change your query patterns to improve "boostability"

While we've put ample engineering work in to make PlanetScale Boost useful without query changes, in many cases, application queries will need to be adjusted to take full advantage of its capabilities. It's still far less time-consuming than implementing your own caching!

### Use Constants Where Possible

Constants can be specified for query criteria instead of query parameters when adding a query to the cache. While this is often used to workaround the theoretical constraints of caching and the practical limits of the query engine, it also can be used to make the cache more space efficient. A simple example is only including non-deleted rows in the cache by specifying a null `deleted_at` value.

### Granularity reduction

Expressions can be used to group data together under the same cache entry. Typically this involves deriving a grouping key by truncating a row's data to be more coarse grained. For example, rounding a datetime value to the hour or rounding the value of a sale to the nearest order of magnitude to populate a summary view.

```sql
select count(*) from likes
	where date_format(created_at, '%Y%m%d%H') = ?
```

This example from the section above returns like counts with hourly granularity.

## Known constraints and limitations

PlanetScale Boost does not support all valid SQL queries. While SQL support is quite broad, in many cases, the practical limitations are around which portions of a query can be passed as a dynamic parameter at execution time.

- Query parameters are only supported within the context of `WHERE` statements and should be used with either `=` or `IN` equality. In some cases, range operations such as `<` or `>` and variations can be used with parameters, but there are currently caveats that limit this to a small number of real-world use cases.
- While multiple query parameters are supported, they must be combined with an `AND`. `OR` can't be used with query parameters. In some of these cases, `IN` can be used as a substitute.
- Queries with an `ORDER BY` clause must have a constant `LIMIT` specified.
- Offsets are not supported.
- Only one parameterized `IN` operator is supported in the `WHERE` clause in your query. If there are multiple `IN` operators, the others will need to be matched against constant values.
- Queries using negative criteria like `!=` or `NOT IN` to match against query parameters are not supported. These can be used with constant values, however.
- Expressions need to return consistent results. This means that using `NOW()` or `RAND()` in results is not supported.
- Expressions used in queries need to be supported by the Vitess evaluation engine. For instance, some functions aren't currently supported, which are listed in [this Vitess issue](https://github.com/vitessio/vitess/issues/9647).
- Caches with no queries configured are subject to garbage collection after 7 days. If your cache has been garbage collected, you can recreate it within a few minutes.

## Known issues during beta

This is a list of known issues important to PlanetScale Boost users during the beta period that are in the process of being fixed. We'll keep this list up to date as issues are discovered and fixed.

- Some queries which use ENUM, DATE, DATETIME, and/or TIMESTAMP column types cause the cache service to fail.

If you experience issues once your cache is deployed which are not covered here, please feel free to reach out to the [PlanetScale customer support team](https://support.planetscale.com/hc/en-us/requests/new).
