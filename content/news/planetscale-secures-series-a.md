---
title: PlanetScale secures Series A
date: '2019-05-23T13:05:25+02:00'
description: PlanetScale raises Series A funding from a16z
author: Jiten Vaidya
comments: false
share: false
---
![PlanetScale's Mountain View Team](/img/team_24may2019.jpg)

I have some exciting news to share! PlanetScale has received $22 million in Series A Funding led by Andreessen Horowitz with participation from SignalFire and others.

As a part of this raise, [Peter Levine](https://a16z.com/author/peter-levine/) from a16z will be joining the PlanetScale board. Given that both Sugu and I started out as engineers, we are lucky to have Peter with his wealth of experience around go-to-market strategies on our board. Peter wrote [a great blog](https://a16z.com/2019/05/23/planetscale/) post about why he decided to invest in PlanetScale. I particularly love this quote: “I have been waiting for years for such a reliable and practical solution with the right engineering tradeoffs. PlanetScale is that solution”.

Ilya Kirnos from SignalFire, who will be continuing on our board, also blogged about us. Check it out for the awesome name “[For the Love of Sharding](https://medium.com/signalfire-fund/for-the-love-of-sharding-cb341c764a77)” :), and stay to learn why PlanetScale resonated so strongly with him. He also provides a quick history tour of databases and the development of Vitess that is worth a read. Thank you Ilya (and SignalFire) for continuing to support us.

We are also delighted that the [Cultural Leadership Fund](https://a16z.com/2018/08/22/introducing-the-cultural-leadership-fund/) run by [Chris Lyons](https://a16z.com/author/chris-lyons/) and our friend and the Director of US Digital Service, [Matt Cutts](https://www.linkedin.com/in/mattcutts/), have also invested in us this round. US Digital Service (USDS) is doing phenomenal work helping the Federal Government modernize its IT infrastructure. If you are interested, you can read about my experience during my tour of duty at the USDS [here](https://medium.com/the-u-s-digital-service/usds-alumni-network-jiten-vaidya-7556dd2dfb0).

In December, I wrote a blog, “[Sharding for Everyone](https://planetscale.com/news/sharding-for-everyone/)”, about our seed funding and the history of Vitess. Sugu and I are realizing our dream of building a company that expands on the work we’ve been doing over the last decade; a company building upon the open source project Vitess and helping organizations scale their data across clouds and across continents.

PlanetScale is based on Vitess, the open source project we started to scale Youtube’s backend databases in 2010. Today, Vitess serves billions of queries in production at companies such as Youtube, Slack, Square, Pinterest, Hubspot, GitHub and JD.com. At PlanetScale, our mission is to make it easy for everyone to run Vitess.

We have been busy in the last year. Since our seed funding, we have opened [beta signups](https://planetscale.com/signup/) for the [PlanetScale Cloud Database](https://planetscale.com/products/) with 15 companies testing the product. We expect to GA on multiple cloud providers in the next few weeks. The Cloud Database is a true multi-cloud database as a service that allows enterprises to deploy databases distributed over multiple regions and multiple cloud providers. If you are a startup, you can start small on Cloud Database and not have to worry about scaling your data as you become the next Slack or Square. Migrating into Vitess is easy because it supports the MySQL binary protocol.

As enterprises move to Kubernetes, the last piece of the puzzle is running stateful workloads in Kubernetes. Vitess, which ran in Borg at Google, is at the forefront and major adopters such as Hubspot and JD.com have been running real production workloads in Kubernetes on Vitess. We developed a Kubernetes operator to make it easy to deploy Vitess clusters in PlanetScale Cloud Database. We now license our Control Plane and the operator to enterprises as PlanetScale Enterprise Database.

We have great plans for this funding. We plan to use this funding to build out the go-to-market teams to grow the awareness and use of Vitess and PlanetScale. Additionally, we will continue to grow our product development and engineering teams. We believe that with this spend, we are continuing the health of the open source community and growth and adoption of Vitess and PlanetScale. For our customers, we are making it easy to explore sharding and database clustering technologies as we help them handle the data explosion they are experiencing without vendor lock-in.

We are thankful for all the support from the Cloud Native community, CNCF, our investors, and our users. Ilya (and SignalFire), thank you for your continued support. Thank you to Chris and Matt and welcome to the PlanetScale family. And finally, thank you Peter and a16z for leading this round.

A couple of final notes. We are hiring! If you know someone who lives and breathes QPS, infrastructure, and open source software, [send them our way](https://planetscale.com/careers/)! Need help scaling your databases or running them in Kubernetes - [talk to us](https://planetscale.com/contact/).

You can read more about our raise in this [TechCrunch article](https://techcrunch.com/2019/05/23/planetscale-vitess/) or the full [press release](https://www.webwire.com/ViewPressRel.asp?aId=241257).
