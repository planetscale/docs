---
title: 'Sharding with PlanetScale'
subtitle: 'Learn how PlanetScale can help you horizontally scale your MySQL database with our sharding solution.'
date: '2023-06-12'
---

With Vitess under the hood, we're able to offer an elegant horizontal scaling solution via sharding — with minimal application changes.

{% callout %}
Sharding is available on our [Enterprise plan](/docs/concepts/planetscale-plans). If you'd like more information about how we can help you shard your MySQL database, [get in touch](/contact).
{% /callout %}

## Sharding with PlanetScale

PlanetScale allows you to break up a monolithic database and partition the data across several databases. This [reduces the load on a single database](/blog/one-million-queries-per-second-with-mysql) by distributing it across several. Sharding can easily become a convoluted and hard-to-manage scenario, but because of our underlying architecture, we're able to keep this sharding logic largely out of the application. So, from the application's perspective, there only exists one database.

### Sharding without application changes

Part of the elegance of our solution lies in the fact that we require minimal application changes to shard your MySQL database. Often, when it comes time to start thinking about sharding your database, we see people decide to start writing the logic directly into their application. This can become problematic as data and traffic patterns change. It leaves you constantly having to modify the logic in your application as new problems arise.

PlanetScale is able to solve this by abstracting this logic from the application layer.

Essentially, when you're at the point where you've maxed out your vertical scaling efforts and you know you need to shard your database, PlanetScale can allow you to do so _without_ the burden of rearchitecting your entire application.

## How does our sharding process work?

When it comes time to shard your database, you'll work closely with our Technical Solutions team to identify the best [sharding scheme](https://vitess.io/docs/reference/features/sharding/#sharding-scheme) for your database.

PlanetScale uses an explicit sharding system, which means we have to tell Vitess which sharding strategy to use for every table. The underlying work involves some conversations to first understand what your application does and the current state of your database. Once we have this complete view of your application, our next objective is to identify a sharding key.

### Choosing a sharding key

The sharding key, or [Primary Vindex](https://vitess.io/docs/reference/features/vindexes), controls how a column value maps to a [keyspace ID](https://vitess.io/docs/concepts/keyspace). Each shard will cover a range of keyspace ID values, so this mapping is used to identify which shard a row is in.

To determine a Primary Vindex, our team will analyze your schema and query patterns. We generally will ask you for the following information:

1. A copy of your schema.
2. Some indication of the size of each table in your database. We can typically gather this information by looking at `AUTO_INCREMENT` values, but may require additional context in some cases.
3. Information about your common query patterns — typically your most frequently used 50-100 queries.

Using this holistic view of your database, we can work to determine a good candidate for the Primary Vindex. During this analysis, we also begin to determine which tables should be sharded, whether you'll require secondary vindexes ([Lookup Vindexes](https://vitess.io/docs/reference/features/vindexes/#functional-and-lookup-vindex)), the strategy for tables that don't contain our chosen Primary Vindex, and more.

While no sharding strategy can ever optimize for _all_ query patterns, this deep analysis makes the strategy as efficient as possible for the majority of queries, especially the most frequently used queries.

And, again, this is all done without requiring you to rearchitect your application.

## When should you consider sharding your database

We generally recommend sharding when you're running into issues with:

- Application performance due to **data size** (this can vary widely, but when your database exceeds 250 GB, sharding may be something to explore)
- Hitting vertical limits with **write throughput**
- Hitting replica limits with **read throughput**

We also often see customers running into other infrastructure challenges before they really see their application performance impacted by large amounts of data. As your data grows, you may find your backups are becoming unreliable and time-consuming. Or you may have no way to test those large backups.

If it feels like some things are starting to break down in your infrastructure, but you aren't sure if sharding is the solution, we can still help you identify if it's the correct strategy for scaling your database.

If you would like to explore whether or not sharding is the right solution for you, [don't hesitate to reach out](/contact), and we'll be in touch.
