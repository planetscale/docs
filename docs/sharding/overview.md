---
title: 'Sharding with PlanetScale'
subtitle: 'Learn how PlanetScale can help you horizontally scale your MySQL database with our sharding solution.'
date: '2024-09-23'
---

{% callout %}
You can create sharded keyspaces on PlanetScale on the Scaler Pro plan via the [cluster configuration page](/docs/concepts/cluster-configuration) in your dashboard, however, you can only currently shard new tables.

If you have existing tables that need sharding, or if you would like additional support from our expert team, our [Enterprise plan](/docs/concepts/planetscale-plans#planetscale-enterprise-plan) may be a good fit. [Get in touch](/contact) for a quick assessment.
{% /callout %}

## Sharding with PlanetScale

PlanetScale allows you to break up a large monolithic database and spread the data out across multiple servers.
This [reduces the load on a single database](/blog/one-million-queries-per-second-with-mysql) by distributing it across many.
PlanetScale achieves this by building our product on top of [Vitess](https://vitess.io/), which provides a transparent [sharding solution](/sharding) for MySQL databases.

### Sharding without application changes

Sharding is a proven database architecture used by many organizations to help them scale up when database demand grows.
When reaching this point, many organizations choose to scale and shard their database manually.
This typically involves adding a bunch of sharding-specific logic to the application layer and/or creating a whole new proxy component to manage the shards.
In addition to this, managing a large fleet of disparate database servers is a significant operational challenge.

When using PlanetScale, customers can keep sharding logic out of their applications and let us take the burden of infrastructure management.
This is because Vitess allows you to create sharded databases and have them appear to the application layer as a single, unified database.
This means simpler application architecture, allowing your developers to worry less about the database and more on their work.

PlanetScale abstracts away all of this complexity using the **VTGate** layer of Vitess.
The VTGates act as the entryway into a Vitess database cluster.
They handle incoming connections and route queries to the appropriate MySQL instances.

When you're at the point where you've maxed out your vertical scaling efforts and you know you need to shard your database, PlanetScale allows you to do so _without_ the burden of rearchitecting your entire application.

## How does our sharding process work?

When it comes time to shard your database, we recommend following our [sharding quickstart](/docs/sharding/sharding-quickstart) guide. If you need assistance identifying the best [sharding scheme](https://vitess.io/docs/reference/features/sharding/#sharding-scheme) for your database, or are interested in expert-level support, our [Enterprise plan](/enterprise) may be a better option for you. [Get in touch](/contact) for more information.

PlanetScale uses an explicit sharding system.
This means that, if you are going to horizontally shard your data, we have to tell Vitess which sharding strategy to use for each sharded table.
This involves some conversations to understand what your application does and the size, schema, and queries of your database.
Once we have this complete view of your application, our next objective is to identify a sharding key.

The sharding key, or [Primary Vindex](https://vitess.io/docs/reference/features/vindexes) is what determines how the rows of your sharded tables will be distributed across servers.
For each table you want to shard, we must choose which column to use for the Vindex, and what [type of vindex](https://vitess.io/docs/reference/features/vindexes/#predefined-vindexes) to use with it.
Each shard will cover a range of keyspace ID values, so this mapping is used to identify which shard a row is in.

To determine a Primary Vindex, our team will analyze your schema and query patterns. We generally will ask you for the following information:

1. A copy of your schema.
2. Some indication of the size of each table in your database. We can typically gather this information by looking at `AUTO_INCREMENT` values, but may require additional context in some cases.
3. Information about your common query patterns — typically your most frequently used 50-100 queries.

Using this holistic view of your database, we can work to determine a good candidate for the Primary Vindex. During this analysis, we also begin to determine which tables should be sharded, whether you'll require secondary Vindexes ([Lookup Vindexes](https://vitess.io/docs/reference/features/vindexes/#functional-and-lookup-vindex)), the strategy for tables that don't contain our chosen Primary Vindex, and more.

While no sharding strategy can ever optimize for _all_ query patterns, this deep analysis makes the strategy as efficient as possible for the majority of queries, especially the most frequently used queries.

And, again, this is all done without requiring you to rearchitect your application.

## When should you consider sharding a table

We generally recommend sharding when you're running into issues with:

- Application performance due to **data size** (this can vary widely, but when your database exceeds 250 GB or a particular table becomes especially large, sharding may be something to explore)
- Hitting vertical limits with **write throughput**
- Hitting replica limits with **read throughput**

We often see customers running into other infrastructure challenges before they really see their application performance impacted by large amounts of data. As your data grows, you may find your backups are becoming unreliable and time-consuming. Or you may have no way to test those large backups.

If it feels like some things are starting to break down in your infrastructure, but you aren't sure if sharding is the solution, we can still help you identify if it's the correct strategy for scaling your database.

If you would like to explore whether or not sharding is the right solution for you, [don't hesitate to reach out](/contact), and we'll be in touch.
