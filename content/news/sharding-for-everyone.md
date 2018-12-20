---
title: 'Sharding For Everyone'
date: '2018-12-13T00:00:00-08:00'
description: 'Announcing Our New Seed Funding'
comments: true
share: true
author: 'Jiten Vaidya'
---

After spending half our lifetimes working at companies that have changed the way we use the Internet (PayPal, Google, YouTube, and Dropbox), Sugu and I decided it was finally time for us to build a company of our own.

We both felt that the world took a wrong turn when companies started choosing key-value stores over relational databases. The world needed horizontal scaling but the blind insistence by relational community on supporting ACID (Atomicity, Consistency, Isolation and Durability) made it impossible for relational databases to scale horizontally. We wanted the world to understand and benefit from the trade-offs we had made at YouTube - full ACID compliance within a shard but user configurable compliance model across shards - to horizontally scale YouTube’s databases into a cluster that could support all of YouTube’s metadata spread across multiple data centers in all five continents.

This was made possible by [Vitess](https://vitess.io), the the open source database clustering system that we created and implemented at YouTube. By early 2018, Vitess was being used by companies like [Square](https://square.com), [Slack](https://slack.com), [HubSpot](https://hubspot.com) and [JD.com](https://jd.com).

We wanted to build a company that would expand upon the work we had spent the past decade doing: a company that would build upon Vitess and that would help companies scale, scale, and scale their data across clouds and across continents–PlanetScale was born.

We’ve been lucky to be able to bring together a diverse crew of talent and investors to join our team to help us build PlanetScale.

We found a kindred spirit in Ilya Kirnos at SignalFire who had faced and solved relational data scaling problems as an early engineer on Google’s AdWords system. He quickly understood the value of the PlanetScale solution. We raised $3 million from SignalFire and a host of tech luminaries we’ve worked with and learned from in our careers.

We’re thankful to Max Levchin, Steve Chen, Adam D’Angelo, Parisa Tabriz, Ross Mason, Mike Stoppelman, Shishir Mehrotra, Sam Lambert, George Obrien, David Mann, Giancarlo Lionetti, Prasanna Srikhanta, Raymie Stata, and Ellen Salisbury. We’re grateful for the insights we’ve gleaned from Ruchi Sanghvi and Aditya Agarwal, founders of the South Park Commons Fund, from the thoughtful events and sessions they put together there. We’re lucky to have the advice of Chris Aniszczyk, COO of CNCF, where Vitess has its natural home, having been one of the first cloud native open source projects to be used at scale.

With the seed funding, we’re building a multi-cloud database as a service based on Vitess. We also provide Vitess support and professional services for companies migrating to Vitess. As data continues to see explosive growth, companies of all sizes need to explore sharding and database clustering technologies. Our battle-hardened technology grounded in open source takes aim at that market, and we want to help our customers achieve this without vendor lock-in.

We’re also scaling up our team, with the values of diversity, inclusion, and kindness at the forefront. If you know someone who lives and breathes QPS, infrastructure, and open source software, [please send them our way](/careers)!

Lastly, if you have a problem you want to solve with sharding and growing out your database needs, [we’d love to talk to you](/contact).

Fundraising is never a goal in and of itself, rather, it helps fuel our growth into the type of company we want to become. We’d like to simplify sharding and database growth for everyone; we’re thrilled to invite all of you come along for the ride.

Welcome to PlanetScale.

P.S. You can read more about us on [this TechCrunch article](https://techcrunch.com/2018/12/13/planetscale/).
