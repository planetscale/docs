---
title: 'The Operate phase of the DevOps cycle'
subtitle: 'Where the operations team performs tasks to keep the application online.'
date: '2023-03-13'
---

Now that everything is deployed into production and confirmed working, the operations team's main focus is keeping everything online. Ideally, this is done with a system that will monitor application load to detect spikes in usage and automatically scale resources up to keep up with the traffic. This can be accomplished with platforms like EC2 in AWS, but also on-premise with Kubernetes.

## How PlanetScale helps

All PlanetScale tiers eliminate the need to maintain your MySQL infrastructure by allowing us to do it for you. Additionally, any production branches automatically have failover replicas so even if something fails with one instance internally, a backup is always available to take over while any necessary maintenance is performed by our teams.

![Infrastructure UI card](/assets/docs/devops/the-operate-phase-of-devops/infra.png?v2)

On top of reducing the necessity of maintaining a MySQL environment, PlanetScale offers additional features that can simplify the jobs of the operations teams.

### Backup and restore

Any well-run operations teams know that [backing up and restoring](/docs/concepts/back-up-and-restore) data is a critical task that must be taken seriously. A time will inevitably come when data is lost whether that is due to bad code or mistakes during the deployment process. Having a way to retain snapshots of your data at specific points in time for recovery is critical, and this functionality is built into PlanetScale databases. All databases on our platform have a daily backup configured automatically, regardless of which tier you are on. Additional backups and retention periods can also be configured, with the only additional cost being the storage used by the backups.

One thing that can be overlooked is the fact that backups are pointless if the data within them doesn't restore properly. Since we support the concept of database branches, and those branches are isolated instances of MySQL, restoring a backup will create a dedicated branch for the data to reside. This can vastly simplify the process of performing test restores. If you can quickly configure new environments using Infrastructure as Code tools, you can easily spin up entire production-like environments to fully test your application, which can dramatically improve the confidence of the operations team.

### Horizontal scaling

PlanetScale is built in [Vitess](https://vitess.io), which is an open-source project that enables horizontal scaling for MySQL databases. If you are in the Enterprise tier, you have additional configuration options available to horizontally scale your database, further reducing the load on individual nodes as well as increasing performance and resiliency.

### Query data caching

As this phase is predominantly about infrastructure and making sure the application stays healthy, its worth mentioning [PlanetScale Boost](/docs/concepts/query-caching-with-planetscale-boost), a fully integrated database query cacheing service that can be added to any database in PlanetScale to optimize the performance of queries that are executed frequently. When PlanetScale Boost is enabled for an organization, an additional server is added internally that provides an in-memory data structure where the results of common queries can be returned much quicker than if they were being read by the MySQL database engine. This can significantly reduce the complexity of managing similar infrastructure components by operations teams.

### Read-only regions

When creating databases or branches, you'll be presented with the option to select which [region](/docs/concepts/regions) you'd like your database created in. After creation, you'll also have the option to create [read-only regions](/docs/concepts/read-only-regions) using the Portals feature. This adds a replica of your database in a specific geographical location to more quickly serve queries by users in that area. Traditionally this would require operations teams to set up additional data centers linked by VPN tunnels or private ISP networks to securely synchronize data, but this is all handled by PlanetScale without such complexity.

{% callout title="Next steps" %}
In this guide, we discussed the Operate phase and discussed features that PlanetScale offers to make the lives of Ops members easier. The last step in the DevOps cycle is the Monitor phase, where feedback and metrics are gathered for decision-making before the next iteration.

- [The Monitor phase](/docs/devops/the-monitor-phase-of-devops)

{% /callout %}
