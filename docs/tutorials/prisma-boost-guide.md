---
title: 'Prisma query caching with PlanetScale Boost'
subtitle: 'Learn how to use PlanetScale Boost in a JavaScript application using Prisma.'
date: '2022-11-15'
---

{% callout %}
PlanetScale Boost is in limited beta. [Reserve your spot on the waitlist](https://planetscale.com/features/boost) today.
{% /callout %}

This guide will walk you through two methods to connect to your database using the [PlanetScale Boost query caching feature](/docs/concepts/query-caching-with-planetscale-boost) using the Prisma ORM for JavaScript. It will follow along with the [Prisma quickstart guide](https://planetscale.com/docs/tutorials/prisma-quickstart), with a modified `PrismaClient` that sets the proper session variables to enable PlanetScale Boost.

## Enable PlanetScale Boost on a PrismaClient

Below is the file defined in the Prisma quickstart guide that creates and exports an instance of `PrismaClient`.

```js
import { PrismaClient } from '@prisma/client'

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma
```

In order to instruct the `PrismaClient` to use PlanetScale Boost, the `@@boost_cached_queries` session variable needs to be set using the `$queryRaw` function:

```js
prisma.$queryRaw`SET @@boost_cached_queries = true`
```

Here is an example of performing this operation on the `PrismaClient` once its initialized:

```js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
prisma.$queryRaw`SET @@boost_cached_queries = true`

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma
```

With this configuration, all queries will be run through the boosted connection, regardless of if they're actually using PlanetScale Boost. This may make it difficult to tell which queries are really being boosted. For this reason, we recommend using two separate connections: one for regular queries and one for boosted queries.

## Create a separate connection

Our recommended strategy for working with PlanetScale Boost is to use two separate connections so you can be explicit when executing your queries. Below is an updated version of the snippet provided by the PlanetScale dashboard with an additional function that enables query caching on a database connection:

```js
import { PrismaClient } from '@prisma/client'

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma

const boostedPrisma = new PrismaClient()
boostedPrisma.$queryRaw`SET @@boost_cached_queries = true`

export { prisma, boostedPrisma }
```

Then when importing an instance of both `PrismaClient`s, you may use the following import statement:

```js
import { prisma, boostedPrisma } from '../path/to/prisma.js'
```
