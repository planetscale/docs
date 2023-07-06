---
title: 'Database replicas'
subtitle: 'Understand how replicas optimize and protect your PlanetScale database.'
date: '2023-07-06'
---

## Overview

A replica is a continuously updated copy of your database. Replicas serve two main purposes:

- They provide an additional source for your data to be queried.
- They increase database availability by enabling fast failovers for maintenance or unexpected failure.

## High availability

Replicas within PlanetScale are used to enable high availability of your database. This is the primary reasons all production branches in PlanetScale are provided at least one replica. In situations where the underlying hardware or service hosting the primary MySQL node fails, our system will automatically elect a new primary node from the available replicas and reroute traffic to that new primary.

## Multiple availability zones

In cloud architecture, regions are further broken down into data centers known as availability zones (or AZs for short). For example, the `us-east-1` region on AWS contains 6 default AZs available to customers starting with `us-east-1a` through `us-east-1f`. The infrastructure for all Scaler Pro and Enterprise PlanetScale databases are distributed across 3 availability zones. In the instance of an AZ failure, your database will auto failover to an available AZ.

## Data consistency and replication lag

Whenever data is updated (`INSERT`, `UPDATE`, `DELETE`) on the primary node, those changes are synchronized to the replicas shortly after. The delay between when a primary is updated and the changes are applied to the replica is known as `replication lag`. Your databases replication lag is viewable on your [database dashboard](/docs/concepts/architecture#replication-lag-at-a-glance).

It is important to be aware of replication lag whenever querying data from your replicas. For example, if you make an update and then immediately try to query for that updated data via a replica, it may not be available yet due to replication lag.

## When are replicas used in PlanetScale?

We use replicas for every production database branch. The number of replicas for a given database depends on the selected plan for that database:

- **Scaler/Hobby** &mdash; Production branches of Scaler and Hobby databases have one additional replicas in a separate AZ from the primary MySQL node.
- **Scaler Pro** &mdash; Scaler Pro databases include 2 replicas per production branch distributed across multiple AZs in a given region.
- **Enterprise** &mdash; The Enterprise plan is customizable to fit the needs of your organization, and as such can have as many replicas as needed.

[Read only regions](/docs/concepts/read-only-regions) use the same replica configuration as their respective database, they are just hosted in a different geographical region. It is important to note that the MySQL nodes in read only regions are replicas intedned only for reading data and are not eligible for failover if the primary node experiences an outage.

{% callout type="warning" %}
⚠️ Development branches DO NOT use replicas as they are intended for building new features or experimenting with development and are not designed with the same resiliency as production branches.
{% /callout %}

## How to use replicas in your PlanetScale database

In PlanetScale, each database has one read-write node that acts as the primary MySQL instance for a given database cluster. When you perform mutations in your database, these are served by the primary node. All other replicas in a database cluster are read-only and can only serve queries that do not mutate data.

By default, all queries are served by the primary, however you may route any `SELECT` queries to replicas by issuing the following command on a connection:

```sql
USE @replica
```

Once this command is issued, all subsequent `SELECT` queries on that connection will be served by your read-only replicas instead of the primary node in your cluster. This can be an effective method of reducing load on your primary.
