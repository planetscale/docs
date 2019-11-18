---
title: 'Announcing the Launch of PlanetScale CNDb'
date: '2019-11-18T11:00:00.000Z'
description: PlanetScale is excited to announce the general availability of our database-as-a-service, PlanetScale CNDb
author: Jiten Vaidya
comments: true
share: true
---

PlanetScale is excited to announce the general availability of our database-as-a-service based on Vitess - PlanetScale CNDb. I will start out by telling you a little bit about the history of Vitess.

## History of Vitess

The year was 2010 and YouTube had initially solved scaling by sharding in application logic. However, this added complexity to the application, and every new feature needed to be aware that it was talking to a sharded database, impacting the velocity of feature development. Also, given the rate at which YouTube was growing, we knew that we would need to reshard soon, a daunting operational challenge.

Sugu Sougoumarane (my co-Founder) and Mike Solomon (a dear friend) began developing Vitess as an open source project in 2010 to solve these scaling challenges. We decided to open source Vitess from day one because we knew that the challenges we were solving were not specific to YouTube, but to web-scale companies everywhere.

By 2015 the biggest keyspace at YouTube had 256 shards with between 80-120 replicas per shard distributed across 20 datacenters all around the world and the application could pretend that it was talking to a single monolithic database. Although Youtube is in the process of migrating out of Vitess to Spanner (Google decided to standardize on Spanner), Vitess today serves more traffic outside Youtube than it ever did inside.

## Stateful workloads with Vitess in Kubernetes - the birth of Cloud Native Database

Vitess is best known for its ability to support this humongous scale and that is the primary reason companies such as Slack, SquareCash App, Pinterest, GitHub and Hubspot are using Vitess. But Vitess also allowed us to migrate YouTube’s MySQL databases from YouTube’s own data centers to Borg, the blueprint for Kubernetes that manages orchestration for Google data centers.

The challenging part about running a stateful service such as a database in a container within an orchestration framework such as Kubernetes is that you cannot take the longevity of the pod in which your master databases are running for granted. To account for this, you need to solve fast reparents to replica and transparent service discovery. You also need to build excellent observability into your system, so that you can keep track of the current state which by definition experiences more flux. All these features were built into Vitess and we successfully ran YouTube databases in Borg.

Companies such as Hubspot today run hundreds of clusters, most of which are single sharded on Vitess in Kubernetes. They use Vitess not for horizontal scaling, but for its ability to run MySQL databases in Kubernetes.

With Vitess, “query of death” is a thing of the past

Every time there was a database related outage at YouTube, we built features in Vitess to protect the underlying MySQL database - features such as connection pooling, limits on the number of rows returned, query and transaction timeouts, hot-row protection for both reads and writes. It is virtually impossible to write a “query of death” that will take your database down or reduce it’s availability under Vitess. Because of this, we feel that even single shard MySQL clusters run better under Vitess.

With all this functionality comes operational overhead. Vitess is a complex distributed system that requires a fair amount of expertise to deploy, monitor and manage. We decided to build a database-as-a-service on top of Vitess to provide all of the benefits of Vitess without the operational headaches.

## Today’s Announcement - PlanetScale CNDb

Today, you can create an account at console.planetscale.com for your company, create clusters such as dev, staging, and production and create single or multi sharded databases within each cluster. As of the writing of this blog post we support the us-central region in GCP and us-east and us-west regions in AWS. Monitoring using Prometheus, and graphs using grafana, are available out of the box. Role based access control is on the roadmap. You can connect to these clusters using any client applications that you would use for connecting to a MySQL database. One caveat: some queries may not work out of the box, but we are on standby to help you through them.

## What’s Next?

Very soon you will also be able to create clusters in Azure. And, there are two other exciting features coming soon: the ability to create clusters that span regions and even cloud providers (Masters in GCP with Replicas in AWS or vice versa) and BYOK (bring your own Kubernetes.) These features will allow you to define, deploy and monitor the clusters using our control plane while the actual databases and Vitess components will be spun up in your Kubernetes Clusters. Thus, your data will never leave your network perimeter. The telemetry will be exported to Planetscale through a “management port” which will allow us to create alerts and carry pagers for your service. Stay tuned for dates for these features.

We believe that infrastructure deployments of the future will be multi-cloud by default and will have built in support for disaster recovery and data locality. Our database-as-a-service enables this multi-vendor, Kubernetes powered future in the cloud. Welcome!

![The PlanetScale Team](/img/planetscale_team.jpeg)
