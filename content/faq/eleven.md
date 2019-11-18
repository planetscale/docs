---
question: How does PlanetScale CNDb ensure high availability?
order: 11
---

For eventually-consistent reads, PlanetScale CNDb provides high availability by load-balancing to a pool of replicas.
 
For writes and consistent reads, PlanetScale CNDb send queries to a single master for each shard. For any planned maintenance to the master or its underlying machine, we first perform a planned reparent (graceful failover) to another replica, pausing writes for a few seconds to ensure no committed transactions are lost in the switch-over.
 
The master syncs data to a networked storage device (AWS EBS or GCP Persistent Disk) that is replicated within its Availability Zone. If the machine on which the master runs goes down, we reattach this remote disk to a new machine to bring the master back up. If the master cannot be recovered with this disk, we may initiate a failover to an asynchronous replica at our discretion. If this happens, some committed transactions that occurred on the old master but had not yet been replicated may be lost.

