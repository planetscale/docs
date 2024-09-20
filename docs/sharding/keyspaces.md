---
title: 'What is a keyspace'
subtitle: 'Learn about what a keyspace is and how to modify them on your PlanetScale database.'
date: '2024-09-20'
---

A keyspace is a logical database that maps directly to your database in PlanetScale. Once you begin sharding, you will create a new keyspace, or keyspaces, where your shards will exist. These sharded keyspaces map to new logical databases in your PlanetScale database.

To get a better sense of this, click on your [Cluster configuration](/docs/concepts/cluster-configuration) tab in your dashboard. If you have an existing unsharded database, you'll see that database listed there as an unsharded keyspace. If you click "New keyspace", you're able to configure a brand new keyspace here.

The most common use case for creating a new keyspace is to shard one or multiple tables.

All of your keyspaces are separate databases. And, again, sharded keyspaces hold multiple databases. However, with the power of Vitess, your application views these all as a single database. It uses the VTGate load balancer to route queries to the correct keyspace, and then the correct shard, and finally the correct primary or replica, as configured.

For more information about modifying a keyspace, please see the [Cluster configuration documentation](/docs/concepts/cluster-configuration).
