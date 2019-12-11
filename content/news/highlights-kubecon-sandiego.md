---
title: 'PlanetScale and Vitess at KubeCon NA 2019 '
date: '2019-12-09T11:00:00.000Z'
description: PlanetScale headed to San Diego for KubeCon + Cloud NativeCon and celebrated the general availability of PlanetScale CNDb, the cloud native database powered by Vitess.
author: Lucy Burns
comments: true
share: true
---

[KubeCon + CloudNativeCon NA 2019](https://events19.linuxfoundation.org/events/kubecon-cloudnativecon-north-america-2019/) last month was the largest KubeCon conference to date with nearly 12,000 attendees from all around the world. The conference size reflected both the maturity level of Kubernetes as well as its burgeoning ecosystem.

PlanetScale celebrated two major achievements at KubeCon: [Vitess's graduation](https://www.cncf.io/announcement/2019/11/05/cloud-native-computing-foundation-announces-vitess-graduation/) from the CNCF incubation program and the general availability of [PlanetScale CNDb](https://planetscale.com/news/announcing-planetscalecndb), our cloud native database-as-a-service powered by Vitess. Be sure to [check it out](console.planetscale.com/signup); it’s a great way to get started with Vitess!

Sugu Sougoumarane, our CTO and Co-Founder, had the opportunity to share the power of Vitess during the Keynote: **“If you are moving to Kubernetes, don’t leave your data behind.”** Watch the full [keynote](https://youtu.be/two3TzF9mVY?t=105) for insights into Vitess’s recent graduation from CNCF, case studies featuring companies large and small including Slack and JD.com, and Sugu's recommendations for how startups can get data management and storage right the first time.

**In addition to Sugu, five other members of the PlanetScale team spoke at KubeCon this year.** Check out their talks exploring the problems facing users of Vitess and its diverse range of applications, from stateless storage to migrating databases to geo-partitioning.
- [Vitess: Stateless Storage in the Cloud](https://www.youtube.com/watch?v=z63dtNj6ctY&t=1s) - Sugu Sougoumarane explains the origins of Vitess during his time at YouTube, as well as how these conditions and ultimately made Vitess naturally suited to run on Kubernetes.
- [How to Migrate a MySQL Database to Vitess](https://www.youtube.com/watch?v=OCS45iy5v1M) - Sugu Sougoumarane & Morgan Tocker give a high-level overview of all the Vitess features, the architecture, and what database workloads are a good fit, before diving into a demo of migrating an existing MySQL installation into Vitess.
- [Building a Database as a Service on Kubernetes](https://www.youtube.com/watch?v=469NOldFOgw) - Abhi Vaidyanatha & Lucy Burns, two of PlanetScale's employees who engineered and managed the project, describe the journey of leveraging open source technologies to build out a database as a service on Kubernetes.
- [Geo-partitioning with Vitess](https://www.youtube.com/watch?v=-Hz6LFJu1cY) - Deepthi Sigireddi & Jitendra Vaidya give an in-depth explanation and a live demonstration of how one of Vitess’s distinguishing features – support for flexible sharding schemes – allows for a custom sharding scheme that respects geo-partitioning requirements and satisfies increasingly strict data storage laws such as GDPR.

We were also excited to see three other talks share Vitess use cases:
- [Scaling Resilient Systems: A Journey into Slack's Database Service](https://youtu.be/aTItjMJE17c) - Rafael Chacon & Guido Iaquinti from Slack share an overview of how Slack designed, built, scaled and then iterated to improve its distributed database service based on top of Vitess, now a CNCF project. The Databases team at Slack scaled a Vitess cluster from 0 to spikes of 2.7 Million queries per second.
- [Gone in 60 Minutes: Migrating 20 TB from AKS to GKE in an Hour with Vitess](https://youtu.be/KpygSD-v_ws) - Derek Perkins, Nozzle. By leveraging out of the box Kubernetes and Vitess features, Derek and his team were able to migrate a high throughput production workload of 20 TB from Azure (AKS) to Google (GKE) in under an hour.
- [Growth and Design Patterns in the Extensions Ecosystem](https://www.youtube.com/watch?v=ph4a9TzK29U) - Eric Tune, Google. Based on experience as a Kubernetes contributor and API reviewer, and from analyzing hundreds of extensions, the speaker has identified recurring Design Patterns, like: Provisioner, Composition, Enforcer, Claim, and Class.

In addition to these talks, we had some fun doing interviews. You can start by listening to Sugu talk all things Vitess on [The Cube](https://twitter.com/theCUBE365/status/1199689938209529857). Afterwards, you can listen to Jiten and Sugu share Vitess’s backstory, explaining why it’s such a good fit for Kubernetes on the [Kubernetes Podcast](https://kubernetespodcast.com/episode/081-vitess/).

When the team wasn’t on stage speaking, we had a great time connecting with conference attendees at our booth. We set up a database coding challenge, participated in a Passport program with [Kasten](https://kasten.io/) and 4 other companies, and shared our Vitess and database knowledge with so many different people. We loved having the opportunity to chat with everyone!

And we couldn’t leave San Diego without doing some exploring. Next time you’re in San Diego recommend checking out [Lucy’s Tacos](https://www.yelp.com/biz/lucys-taco-shop-san-diego) for a quick refueling, [Cafe21](https://www.cafe-21.com/) for a post-conference Bloody Mary or grilled cheese, and be sure to make your way to [The Noble Experiment](https://nobleexperimentsd.com/), San Diego’s best hidden speakeasy!

![KubeCon 2019 Photos](/img/kubecon19na.jpeg)
Photo courtesty of [CNCF](https://www.flickr.com/photos/143247548@N03/).
[License](https://creativecommons.org/licenses/by-nc/2.0/legalcode)

Couldn’t make it to KubeCon in San Diego? Catch us in Europe for FOSDEM in early February and KubeCon EU in late March.
