---
title: 'Pricing'
category: 'resources'
---

# Pricing
 
This document describes the pricing model for the PlanetScale Database.

## Pricing model

PlanetScale charges you based on the resources your your databases consume: each database has a certain number of [instances](replicas), including the master database, replicas, and analytics instances; each of these instances uses a certain amount of computing power, memory, and storage space. You pay an hourly rate for each unit of resources for each instance, multiplied times the number of instances in your database. If your database uses sharding, then this total is multiplied again times the number of shards.

### Example

Your database uses .5 Cores of CPU, 512 MiB of RAM, and 10 GiB of storage, for a total of $0.0302 per hour per instance. For high availability, you decide to use three replicas; three instances at $0.0302 per hour costs $0.0906 per hour. Finally, you decide to scale your database horizontally with two shards; two shards at $0.0906 per hour costs $0.1812 per hour.

## See also

+ Read the [Service Level Agreement](../dbaas/sla) for information on uptime percentage and service credits.
