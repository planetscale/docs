---
title: 'Highlights from KubeCon Europe 2019'
date: '2019-05-29'
description: 'The Planetscale team was in Barcelona in May for Kubecon+CloudNativeCon Europe'
comments: true
share: true
author: 'Adrianna Tan'
---

Most of the PlanetScale team spent an energizing week in the lovely city of Barcelona, Spain, last week. Not only were we one of the sponsors, we also co-hosted a scavenger hunt through the Gothic Quarter with Red Hat, Turbonomic, and other companies, followed by a networking reception focused on operators.

At the conference itself, we had the opportunity to share some demos and insights across two sessions.

### Intro to Vitess

Vitess co-creator and PlanetScale CTO Sugu Sougoumarane, along with engineer Deepthi Sigireddi, introduced the audience to Vitess: how it came about, what it is, who needs it, why use it.

Deepthi discussed Vitess's highly available nature, sharing that several companies were known to be using Vitess to run deployments up to [five nines](https://www.techopedia.com/definition/14235/five-nines). She showcased Vitess's list of adopters, from Slack, JD.com, Pinterest and many other companies, demonstrating the battle-tested nature of Vitess.

More importantly, Deepthi discussed how Vitess was cloud native even before Kubernetes 1.0: Vitess was created at YouTube, ran in Google's Borg. **Vitess makes stateful workloads for MySQL possible in Kubernetes because there is a clear separation between the app layer and the database, and also because the stateless Vitess component `vtgate` can help with discovery.** In the event of a master failover, Vitess can automatically promote a replica and help Kubernetes discover it as a new master. 

Sugu then gave a demo of VReplication, an upcoming major feature in Vitess.

With VReplication, you can materialize anything, anywhere, anyway, from any source keyspace into any target keyspace. With VReplication, any Vitess user can do sums and counts, and Vitess will materialize your tables for many analytics workloads, for example.

Watch a video of Sugu and Deepthi's intro to Vitess [here](https://www.youtube.com/watch?v=H4B5zLBfGN8). For additional information on VReplication, have a look at this [talk](https://www.infoq.com/presentations/vitess?utm_source=presentations_about_qcon-sanfrancisco-2018&utm_medium=link&utm_campaign=qcon-sanfrancisco-2018).

### Deep Dive: Vitess

Our CEO, Jiten Vaidya, and our Minister of Engineering Dan Kozlowski took the audience through a deep dive into Vitess. 

When running distributed systems, failures are bound to happen. Vitess helps you take away some of the pain from it.

Jiten gave a walkthrough of Vitess's architecture, concepts and described how it worked. In the Vitess world, a cell is any failure domain: if you run Vitess onprem, a cell can be a rack; if you run Vitess in the cloud, a cell can be a region or availability zone.

One of the coolest things about Vitess lies in how masters and replicas can be distributed across many cells, even within a single shard. Since Vitess is cloud native, having run in Borg and then early Kubernetes after it, Vitess supports three topology services--etcd, Zookeeper and Consul--and is able to continue serving the query path even if a topology server were to go down.

Many companies can benefit from using Vitess even if they did not need to shard at the moment. Vitess's hot row protection, connection pooling and other features brings benefits to standard MySQL by preventing inexperienced developers from writing 'queries of death' that can take down the database: Vitess rewrites queries to make them more efficient. With native backups and restore, Vitess also makes database administration easier, with or without a DBA's help. It can even bring up new tablets for you to start serving data automtaically.

Vitess also makes it easy to scale writes and geo-locate data, so you can serve users in one region from the replica closest to them.

To demonstrate all this, Dan showed a live demo he calls 'Goodest Doggos', a dog rating web app. In this instance, he brought up a cluster set up on Google Cloud Platform in three regions: two in the EU, and one in the US, each running a set of app servers and Vitess shards, fronted by load balancers, with the master in eu-west-4 and replicas in the others.

The audience was then asked to give all the dogs a rating out of 10. Dan was able to show that Vitess works well with Orchestrator, which takes care of failovers and recovery among others, as well as with Prometheus, which provides good visibility into the queries being written.

He then demonstrated three scenarios:

* What happens when there is planned maintenance
* When happens when a master goes down, unscheduled
* What happens when failure is catastrophic

When Vitess users plan maintenance, they are able to continue serving traffic with no interruption because of a Vitess feature known as PlannedReparent. When a PlannedReparent happens, you can take down a master and choose another master, even between regions. 

When a master goes down without notice, Vitess, with Orchestrator's help, is able to promote the best replica to master and reroute traffic seamlessly without human intervention.

When failure is catastrophic, for example there has been a failure at the data center, or an entire database has been deleted, Orchestrator can also help start the recovery and Vitess can begin reparenting and restoring from backups, catching up with replication. 

It is testament to the robustness of Vitess in production traffic that we are aware of some Vitess users who have lost many nodes and masters and, without human intervention, have had their database restored with Vitess's help.

Watch Jiten and Dan's demo [here](https://www.youtube.com/watch?v=OZl4HrB9p-8).

To find out more about how PlanetScale can help you confidently run Vitess in production, [talk to us](../../contact). 
