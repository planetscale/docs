---
title: 'What is a keyspace'
subtitle: 'Learn about what a keyspace is and how to modify them on your PlanetScale database.'
date: '2024-09-20'
---

A keyspace is a logical database that maps directly to your database in PlanetScale. Once you begin sharding, you will create a new keyspace, or keyspaces, where your shards will exist. These sharded keyspaces map to new logical databases in your PlanetScale database.

The following diagram depicts a PlanetScale database with 2 keyspaces: one unsharded and one sharded. The unsharded keyspace has the default 1 primary and 2 replicas. The sharded keyspace contains two shards, each with 1 primary and 2 replicas.

When a new request comes in, they first go through our global edge gateway layer, and then hit the VTGates, which will forward the incoming query to the correct keyspace / shard.

![Keyspace diagram](/assets/docs/sharding/keyspace-diagram.png)

Having 1 unsharded keyspace and 1 sharded is a typical setup for a database that needs sharding. With our [Cluster configuration panel](/docs/concepts/cluster-configuration), you are able to customize the number of shards in the sharded keyspace. You can also adjust the instance size for each primary and replica, and you can add additional replicas beyond the default of two if needed.

To get a better sense of this, click on your [Cluster configuration](/docs/concepts/cluster-configuration) tab in your dashboard. If you have an existing unsharded database, you'll see that database listed there as an unsharded keyspace. If you click "New keyspace", you're able to configure a brand new keyspace here.

The most common use case for creating a new keyspace is to shard one or multiple tables.

All of your keyspaces are separate databases. And, again, sharded keyspaces hold multiple databases. However, with the power of Vitess, your application views these all as a single database. It uses the VTGate load balancer to route queries to the correct keyspace, and then the correct shard, and finally the correct primary or replica, as configured.

For more information about modifying a keyspace, please see the [Cluster configuration documentation](/docs/concepts/cluster-configuration).
