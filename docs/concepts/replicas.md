---
title: 'Database replicas'
subtitle: 'Understand how replicas optimize and protect your PlanetScale database.'
date: '2024-04-17'
---

## Overview

A replica is a continuously updated copy of your database. Replicas serve two main purposes:

- They provide an additional source for your data to be queried.
- They increase database availability by enabling fast failovers for maintenance or unexpected failure.

{% callout type="warning" %}
Before utilizing replicas for reducing load on the primary, it's important to understand the trade-offs. For more information, see the [Data consistency and replication lag](#data-consistency-and-replication-lag) section.
{% /callout %}

For information on replicas running in additional regions, see: [Read-only regions](/docs/concepts/read-only-regions).

## How to query replicas

PlanetScale replicas can be used to read data and reduce load on the primary. PlanetScale does not automatically route queries to replicas unless you explicitly use a replica credential or tell your application to do so.

### 1. Create a global replica credential (recommended)

With global replica credentials, you can have one credential that will automatically route queries to your branch's replicas and read-only regions. If you do not have any read-only regions, it will route to the included replicas on [your plan](/docs/concepts/planetscale-plans) (minimum of 2). If you do have any read-only regions, the queries will route to the closest replica out of your read-only region replicas and included failover replicas.

To use this, create a new credential in the PlanetScale dashboard and select "**Replica**" as the connection type. You can then use the new credential's connection string to setup a replica-only database
connection.

If you have `pscale` installed locally, you can create a replica credential with the following command:

```shell
pscale password create <database> <branch> <password_name> --replica
```

All queries made using this credential will be routed to the nearest replica, even as you add and remove read-only regions.

### 2. `USE @replica` (not recommended)

{% callout type="warning" %}
We do not recommend using this method to query replicas. We will soon be deprecating this method, but we will maintain the documentation until a deprecation date has been set. If you are currently using this method, we recommend switching to method 1.
{% /callout %}

If you are not using a global replica credential, then, by default, all queries are served by the primary. However you may route any `SELECT` queries to replicas by issuing the following command on a connection:

```sql
USE @replica
```

Once this command is run, all subsequent `SELECT` queries on that connection will be served by your branch's replicas instead of the primary node in your cluster. Please note that this does not send queries to any read-only regions, if you want to route queries all replicas, including read-only regions, you should use a global replica credential (method 1 above).

{% callout type="tip" %}
For querying replicas in separate regions, see: [Read-only regions](/docs/concepts/read-only-regions).
{% /callout %}

We highly recommend using a global replica credential to ensure that your queries are always routed to the nearest replica.

## High availability

Replicas within PlanetScale are used to enable high availability of your database. This is the primary reason all production branches in PlanetScale are provided at least one replica. In situations where the underlying hardware or service hosting the primary MySQL node fails, our system will automatically elect a new primary node from the available replicas and reroute traffic to that new primary.

## Multiple availability zones

In cloud architecture, regions are further broken down into data centers known as availability zones (or AZs for short). For example, the `us-east-1` region on AWS contains 6 default AZs available to customers starting with `us-east-1a` through `us-east-1f`. The infrastructure for all Scaler Pro and Enterprise PlanetScale databases are distributed across 3 availability zones. In the instance of an AZ failure, your database will auto failover to an available AZ.

## Data consistency and replication lag

Whenever data is updated (`INSERT`, `UPDATE`, `DELETE`) on the primary node, those changes are synchronized to the replicas shortly after. The delay between when a primary is updated and the changes are applied to the replica is known as `replication lag`. Your databases replication lag is viewable on your [database dashboard](/docs/concepts/architecture#replication-lag-at-a-glance).

It is important to be aware of replication lag whenever querying data from your replicas. For example, if you make an update and then immediately try to query for that updated data via a replica, it may not be available yet due to replication lag.

## When should you use replicas in your application?

Replicas are useful for offloading read-heavy workloads from the primary node. By using replicas, you can distribute the read load across multiple nodes, which can help improve the performance of your application. Some examples of where you might want to query a replica are scheduled jobs, analytics jobs, search features, or aggregate queries. Replicas can also be used to provide a read-only view of your data to users or applications that do not need to write data, such as when a user is logged out or writing one-off queries for debugging purposes.

## When are replicas used in PlanetScale?

We use replicas for every production database branch. The number of replicas for a given database depends on the selected plan for that database:

- **Scaler Pro** &mdash; Scaler Pro databases include 2 replicas per production branch distributed across multiple AZs in a given region.
- **Enterprise** &mdash; The Enterprise plan is customizable to fit the needs of your organization, and as such can have as many replicas as needed.

[Read-only regions](/docs/concepts/read-only-regions) use the same replica configuration as their respective database, they are just hosted in a different geographical region. It is important to note that the MySQL nodes in read-only regions are replicas intended only for reading data and are not eligible for failover if the primary node experiences an outage.

{% callout type="warning" %}
Development branches DO NOT have replicas as they are intended for development only and are not designed with the same resiliency as production branches.
{% /callout %}
