---
title: 'Prisma best practices'
subtitle: 'Best practices for referential integrity, indexes, migrations, and common errors when using Prisma with PlanetScale'
date: '2023-04-17'
---

## Overview

This document provides various best practices for getting the most out of Prisma, a next-generation ORM for Node.js and TypeScript, and PlanetScale. It also includes relevant links to Prisma's documentation.

## Referential actions and integrity with Prisma and PlanetScale

When using Prisma with PlanetScale, you need to make sure to set `relationMode` to `prisma` in your Prisma schema:

```js
datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"
}
```

{% callout %}
In Prisma `4.5.0`, `referentialIntegrity` changed to `relationMode` and generally became available in `4.7.0`.
{% /callout %}

The `prisma` relation mode emulates some foreign key constraints and referential actions for each Prisma Client query to maintain referential integrity, using some additional database queries and logic.

Read more about [Relation mode in Prisma's documentation](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/relation-mode).

### Creating an index for relation scalar fields

When a Prisma client uses the `foreignKeys` relation mode, which does not work with PlanetScale, the database implicitly creates an index for the foreign key columns. Therefore, it is recommended that you create an index for your relation scalar fields with the `@@index` attribute (or the `@unique`, `@@unique` or `@@id` attributes, if applicable) when using `prisma` relation mode with PlanetScale.

```js
model Post {
  id     Int  @id
  userId Int
  user   User @relation(fields: [userId], references: [id])

  @@index([userId])
}
```

If you do not add the index, you might notice that some of your queries are slow or are performing full table scans and reading a lot of data. When you run `prisma format` or `prisma validate`, it will warn you about a missing index where you are using foreign key constraints.

If you want to learn more about MySQL indexes, check out the [MySQL for Developers course section on indexes](https://planetscale.com/learn/courses/mysql-for-developers/indexes/introduction-to-indexes).

## Migration workflows using `prisma db push`

With Prisma, there are two ways to apply schema changes to your database: `prisma migrate` and `prisma db push`. We recommend `prisma db push` over `prisma migrate dev` for the following reasons:

PlanetScale automatically provides built-in [Online Schema Change tools](/docs/learn/how-online-schema-change-tools-work) when you merge a deploy request and prevents [blocking schema changes](/docs/concepts/nonblocking-schema-changes) that can lead to downtime. This differs from the typical Prisma workflow, which uses `prisma migrate` to generate SQL migrations for you based on changes in your Prisma schema. When using PlanetScale with Prisma, the responsibility of applying the changes is on the PlanetScale side. Therefore, there is little value to using `prisma migrate` with PlanetScale.

Also, the migrations table created when `prisma migrate` runs can be misleading since PlanetScale does the actual migration when the deploy request is merged, not when `prisma migrate` is run, which only updates the schema in the development database branch. You can still see the history of your schema changes in PlanetScale.

If you want to read more about `prisma db push`, see the [Prisma documentation on making schema changes with `prisma db push`](https://www.prisma.io/docs/guides/database/planetscale#how-to-make-schema-changes-with-db-push).

## Connection management

When using Prisma with PlanetScale, you might encounter some specific error messages. It might seem like your PlanetScale database is down, but there are other reasons why it might appear this way.

For both errors, if your serverless function or application servers and database are not in the same region, this can contribute to latency problems. If possible, try to move them closer together to decrease physical latency.

Here are some of the common error messages with their possible causes and solutions:

### Prisma error P1001

```bash
"Can't reach database server at {database_host}:{database_port} Please make sure your database server is running at {database_host}:{database_port}."
```

**Possible cause:**

- The Prisma Client did not establish the connection within the `connect_timeout`. There are many possible reasons for this to occur, two of the common examples we see are DNS resolution issues and network latency.

**Possible solutions:**

- Increase the `connect_timeout` in your `DATABASE_URL`.

Example `DATABASE_URL`: `mysql://USER:PASSWORD@HOST:PORT/DATABASE?connect_timeout=30`

The default is `5`. The `connect_timeout` is the maximum number of seconds to wait for a new connection to be opened, `0` means no timeout. We suggest trying a higher number around `30` seconds if you have this issue. See the [Prisma connection URL argument documentation](https://www.prisma.io/docs/concepts/database-connectors/mysql#arguments) for more information.

### Prisma error P2024

```
"Timed out fetching a new connection from the connection pool. (More info: http://pris.ly/d/connection-pool (Current connection pool timeout: {timeout}, connection limit: {connection_limit})"
```

**Possible cause:**

- The connection is established, but the Prisma query engine is not able to process a query in the queue before the time limit.

**Possible solutions:**

- Increase the pool size by increasing the `connection_limit`.

Example `DATABASE_URL`: `mysql://USER:PASSWORD@HOST:PORT/DATABASE?connection_limit=10`

The default is `num_cpus * 2 + 1`. The `connection_limit` is the maximum size of the connection pool for each instance of the Prisma Client. `connection_limit` is not the total for all of your application servers or serverless functions. While PlanetScale can handle hundreds of thousands of connections at a time, we recommend incrementally increasing this number to tune your Prisma Client. See the [Prisma documentation on optimizing the connection pool size](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#optimizing-the-connection-pool) for more info.

- Increase the `pool_timeout`.

Example `DATABASE_URL`: `mysql://USER:PASSWORD@HOST:PORT/DATABASE?pool_timeout=30`

The default is `10`. The `pool_timeout` is the maximum number of seconds to wait for a new connection from the pool, `0` means no timeout. We recommend increasing this only after you've tuned the `connection_limit`. See the [Prisma documentation on optimizing the connection pool timeout](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#optimizing-the-connection-pool) for more info.

- Decrease query duration, which might include asking for less data in the query or improving performance with an index or other methods. Start by looking at your [Insights](/docs/concepts/query-insights) page within your PlanetScale database to see which queries might be performing poorly.

Lastly, this [discussion topic response on Prisma connection pooling](https://github.com/planetscale/discussion/discussions/188#discussioncomment-3808093) can be helpful if you are experiencing these errors.

## Other resources:

- [PlanetScale quickstart](/docs/prisma/prisma-quickstart)
- [Prisma quickstart for adding Prisma to an existing project](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-planetscale)
- [Prisma document on connection management](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
- [Prisma document on how the connection pool works in Prisma](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-pool#how-the-connection-pool-works)
- [Video: Prisma & PlanetScale Best Practices](https://youtu.be/iaHt5_hg44c)
