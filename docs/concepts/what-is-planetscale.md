---
title: 'What is PlanetScale'
subtitle: 'Learn about what PlanetScale is, how it came to be, and how our unique features can help you scale and improve development speed.'
date: '2023-04-05'
---

## What is PlanetScale

PlanetScale is a MySQL-compatible database that brings you scale, performance, and reliability — without sacrificing developer experience.

With PlanetScale, you get the power of horizontal sharding, non-blocking schema changes, and many more powerful database features without the pain of implementing them.

### A brief history

PlanetScale is powered by [Vitess, the open-source database technology](https://vitess.io/) that was [invented at YouTube in 2010](https://vitess.io/docs/overview/history/#:~:text=Vitess%20was%20created%20in%202010,exceed%20the%20database's%20serving%20capacity.) to solve the scaling issues they faced with their massive MySQL database. Vitess went on to become open source as a [CNCF project](https://www.cncf.io/) and continues to scale massive companies like [Slack](https://slack.engineering/scaling-datastores-at-slack-with-vitess/), [GitHub](https://github.blog/2021-09-27-partitioning-githubs-relational-databases-scale/), and more.

Vitess is an extraordinary piece of technology but can be challenging to implement and maintain without a large team. The [co-creator of Vitess](https://about.sourcegraph.com/podcast/sugu-sougoumarane) wanted to make Vitess accessible to everyone, so he later went on to cofound PlanetScale. With PlanetScale, every database you spin up gets Vitess under the hood.

The team building PlanetScale is made up of passionate industry experts that have spent decades working on databases for some of the web's largest companies. Our team has directly felt the pain of overly-complicated, unintuitive database tools and came to PlanetScale to build the future of databases — the database they wished they had at their previous companies.

Since our GA launch in November 2021, PlanetScale has grown rapidly, both in [features](#planetscale-features) and [customers](/customers).

Ultimately, our goal is to usher in a [new era of databases](/principles). One that brings the database closer to the application instead of treating it like a separate part of the stack that only select people know how to operate. One that makes downtime and data loss a problem of the past. One that scales effortlessly, no matter how large or fast your data grows.

## PlanetScale features

The fastest way to understand how PlanetScale is changing the database landscape is to take a peek inside the product. The following features create a powerful developer experience that enables teams to develop quickly and confidently.

### Non-blocking schema changes

With most businesses now operating online, downtime and maintenance windows are no longer acceptable. Not only does downtime hurt customer experience and trust, but even a small amount of downtime can result in thousands to millions of dollars lost for companies.

Our [non-blocking schema change workflow](/docs/concepts/nonblocking-schema-changes) means that you'll never experience costly table locking or downtime when running schema changes. This is a fundamental piece of PlanetScale and something that we think everyone should have access to, so there's no additional configuration required. Zero downtime schema changes are baked into the product.

### Branching workflow

Our [branching workflow](/docs/concepts/branching) paired with [safe migrations](/docs/concepts/safe-migrations) is what enables non-blocking schema changes on your production database. Instead of applying schema changes directly to your production database, we let you create branches, which are essentially copies of your database. When you create a new branch off of production, you have an isolated copy of your database that you can use for development to make schema changes.

![Branching workflow diagram - Create dev branch off of main, make schema changes, make deploy request, resolve schema conflicts, test, deploy to main](/assets/docs/concepts/what-is-planetscale/branching-diagram.png)

Development branches can serve as your staging environment, so you don't have to worry about spinning up a new testing database and constantly syncing it with production. We handle all of that for you.

Once you're ready to deploy schema changes from your development branch to production, you [open a deploy request](/docs/concepts/deploy-requests). The deploy request allows your team to view a diff of the schema changes being made, comment, and approve before deploying the change to production.

![Example of a deploy request showing comments, approval, and deployment](/assets/docs/concepts/what-is-planetscale/deploy-request.png)

### Revert a schema change

The final piece of the non-blocking schema change workflow is the ability to [revert a recently deployed schema change](/docs/concepts/deploy-requests#revert-a-schema-change) without losing any data that was written since deploying.

{% vimeo aspect="other" src="https://player.vimeo.com/video/830571822" caption="Demonstration of how to revert a schema change" /%}

Despite all the safeguards we put in place, accidents can happen. If someone on your team deploys a schema change, only to realize afterward that it adversely affected the application, you can simply revert it in the PlanetScale dashboard with the click of a button. Perhaps the most impressive part is that when you revert, you won't lose any data that was written to your database during the time the updated schema was live. We keep track of it and apply it back to the original schema once you revert.

No more fumbling around with snapshots or backups and restores. Just revert.

### Scale with sharding + unlimited connections

With Vitess under the hood, we're able to offer horizontal scaling via sharding with minimal application changes.

PlanetScale allows you to break up a monolithic database and partition the data across several databases. This [reduces the load on a single database](/blog/one-million-queries-per-second-with-mysql) by distributing it across several. Sharding can easily become a convoluted and hard-to-manage scenario, but because of our underlying architecture, we're able to keep this sharding logic largely out of the application. So, from the application's perspective, there only exists one database.

Another scenario that companies with massive databases often run into is connection limits due to MySQL. With PlanetScale, we can support [nearly infinite connections](/blog/one-million-connections). Vitess offers built-in [connection pooling](https://vitess.io/docs/reference/features/connection-pools/), and we've built our own [edge infrastructure](/blog/introducing-the-planetscale-serverless-driver-for-javascript) into PlanetScale to ensure connection limits are never an issue.

We generally recommend sharding when your database exceeds 250 GB of data. Sharding is offered on our [enterprise plans](/pricing). [Please reach out](/contact) for more information. If you decide you want to shard your database(s), our solutions team will work with you to come up with a sharding strategy.

### Insights

[PlanetScale Insights](/docs/concepts/query-insights) is our in-dashboard query performance analytics tool. What's unique about Insights is you can track performance down to the individual query level.

{% vimeo aspect="other" src="https://player.vimeo.com/video/830571854" caption="This video shows an example Insights page." /%}

At a glance, the interactive graph shows you query latency, queries per second, rows read, and rows written charted against time. You'll also see any deploy requests on the graph, so you can quickly see the impact of those changes.

If you notice your application is running slower than it should or you want to do a deep dive on your bill, you can come to the Insights dashboard and drill down at the individual query level to see:

- number of times a query has run
- total time the query has run
- time per query
- rows read, affected, and returned

### PlanetScale Boost

[PlanetScale Boost](/docs/concepts/query-caching-with-planetscale-boost) (beta) is our solution to improve the implementation of often cumbersome query caching. With PlanetScale Boost, you can add query caching to your application simply by choosing which queries you want to speed up, allocating a certain amount of storage to them, and clicking a button to implement. All with minimal application changes.

In most caching systems, you would still have to deal with cache invalidation. With PlanetScale Boost, cache invalidation is a thing of the past. We will automatically update the store with any incoming changes to data, so you won't see your cached queries slow down while they repopulate.

### No downtime import tool

We understand changing database providers can be a pain, from dealing with downtime to complicated dumps and restores and endless compatibility issues.

We built a [database import tool](/docs/imports/database-imports) to simplify the process and make it as pain-free as possible.

With our import tool, you can connect your internet-accessible database to PlanetScale, and begin the import process. During the import, your production database remains live, and both your PlanetScale and production databases are continuously synced. This means as new or updated data hits your production database, PlanetScale will pull that in as long as the connection remains open. Once you're ready to do the swap, the cutover happens in an instant. No downtime and no data lost.

![Step 3 of database import - Primary mode](/assets/docs/imports/database-imports/primary.png)

### Connect

A common task companies need to handle is extracting data out of their database for transformation and analysis.

[PlanetScale Connect](/docs/integrations/airbyte) provides you with an easy way to perform ELT. You can connect your PlanetScale database to Airbyte or Stitch, and select the destination from there. Both platforms support several data storage destinations, such as Snowflake, Google Big Query, and more.

### CLI

Nearly every action you can take in the PlanetScale dashboard can also be done with our [`pscale` CLI](/features/cli).

With commands for branching, deploy requests, backups, service tokens, and more, the CLI allows teams to work quickly and efficiently. You can use the CLI to extend PlanetScale into your own devops workflow with [GitHub Actions](/blog/using-the-planetscale-cli-with-github-actions-workflows), [AWS CodeBuild](/blog/build-a-multi-stage-pipeline-with-planetscale-and-aws), and more.

### API

Like the CLI, you can programmatically interact with PlanetScale using our [API](/docs/concepts/planetscale-api-oauth-applications).

The API is useful for building PlanetScale into other developer tooling for faster development workflows. For example, you can programmatically create and delete database branches, open and merge deploy requests, and more.

See the [PlanetScale API reference](https://api-docs.planetscale.com) for more information.

### Replicas

Every production PlanetScale branch comes with two [replicas](/docs/concepts/replicas). Replicas are read-only copies of your database that can be used to offload read traffic from your primary. With global replica credentials, you can have one credential that will automatically route queries to your branch's replicas and read-only regions.

### Read-only regions

Spin up [read-only regions](/docs/concepts/read-only-regions) with the click of a button. For globally distributed applications, read-only regions allow you to place a copy of your data close to your users.

To query your read-only region, create [a replica credential](/docs/concepts/replicas) for your database. Replica queries will be automatically routed to the nearest read-only region or one of the branch's replicas, whichever has the lowest latency available.

## Get in touch

Want to learn more about PlanetScale and how it can help your business prevent downtime and improve development speed?

[Reach out to learn more or schedule a demo](/contact), and we'll be in touch shortly.
