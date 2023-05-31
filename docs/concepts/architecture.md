---
title: 'PlanetScale database architecture'
subtitle: 'Learn about the infrastructure behind every single PlanetScale database'
date: '2023-05-31'
---

## Overview

PlanetScale is a database platform designed for serverless workloads, but there is a great deal of infrastructure that enables our databases to be simple, secure, and resilient. In this article, you'll learn about what powers PlanetScale databases.

## The infrastructure diagram

On the dashboard of every PlanetScale database is a diagram outlining the infrastructure that powers that specific branch. Since production branches have increased resiliency, you'll notice that the diagrams for those branches are more complex than development branches.

### Development branches

When a new development branch is created, a single MySQL node is created along with a load balancer that handles connections to that node. This is reflected in the diagram of a development branch.

![Dev branch architecture](/assets/docs/concepts/architecture/dev-infra.png)

### Production branches

Development branches are spec'd to enable the development and testing of new features, they are not designed for production workloads. When you promote a development branch to production status, PlanetScale automatically adds additional replicas and load balancers deployed across multiple availability zones in a given region to handle the traffic that is typical of a production workload.

The infrastructure diagram reflects these changes as they occur within our systems. The following branch is a production branch with safe migrations enabled, which adds two additional MySQL replicas, along with two additional load balancers to manage the traffic to the database. This additional infrastructure is completely transparent to the applications connecting to the database.

![Prod branch architecture](/assets/docs/concepts/architecture/prod-infra.png)

### PlanetScale Portals (read-only regions)

PlanetScale Portals are read-only replicas that are created in different regions to bring your data closer to the users who are accessing it, often resulting in increased application performance. When a read-only region is created for a branch, the infrastructure diagram for that branch is updated to reflect the additional replicas in that respective region and is labeled with "_RO_" to reflect the read-only status.

![Prod branch with Portals architecture](/assets/docs/concepts/architecture/prod-with-portals.png)

## Infrastructure metrics

Each element within the infrastructure diagram for PlanetScale database branches can be selected to display additional metrics related to that element. These metrics are displayed in expandable cards that present themselves when an element is selected.

By default, the cards display metrics from the last 6 hours but can be adjusted if additional data is needed.

### Load balancers

The Load balancers node displays the total number of load balancers that exist for a given branch, as well as the number of availability zones in which they live. Selecting the Load balancers node will show the following metrics:

- Number of connections.
- Latency.
- Queries received.

![Load balancer metrics](/assets/docs/concepts/architecture/load-balancer.png)

### MySQL nodes

Each MySQL node in the diagram will display whether it is the primary node or a replica, along with the region where that node is deployed to. Clicking any of the MySQL nodes will display the following metrics:

- Database reads and writes for that node.
- Queries served.
- IOPS.
- CPU and Memory utilization.

![Primary MySQL node metrics](/assets/docs/concepts/architecture/primary.png)

Selecting a replica will also display the replication lag (or how long it takes for data to be replicated from the Primary node to that replica).

![Replica metrics](/assets/docs/concepts/architecture/replica.png)

Finally, selecting a MySQL node that is part of a read-only region also displays the "Read-only" label in the upper right of the card.

![Read-only replica metrics](/assets/docs/concepts/architecture/read-only-replica.png)

### Replication lag at a glance

Within the infrastructure diagram, you'll also notice that there is a number near the connection points for each replica. These numbers are a way to read the replication lag between the Primary node and that given node at a glance.

![Replication lag](/assets/docs/concepts/architecture/replication-lag-overview.png)

### Database shards

If your database is sharded in PlanetScale, the infrastructure diagram will represent that as a stack of shards. Selecting that from the diagram will open a card displaying all of the shards belonging to that database.

![Stacked shards](/assets/docs/concepts/architecture/shard-stack.png)

Selecting any of the available shards from the list will update the displayed shard in the diagram, as well as allow you to drill into the metrics for each MySQL node within that shard.

![Shard](/assets/docs/concepts/architecture/shard.png)
