---
title: 'Use the serverless driver for Javascript with PlanetScale Boost'
subtitle: 'Learn how to use PlanetScale Boost in an application built using the Serverless Driver for Javascript.'
date: '2022-11-15'
---

{% callout %} PlanetScale Boost is in limited beta. [Reserve your spot on the waitlist](/features/boost) today. {% /callout %}

This guide will walk you through two methods to connect to your database using the [PlanetScale Boost query caching feature](/docs/concepts/query-caching-with-planetscale-boost) when building an application with the PlanetScale serverless driver for Javascript. It will start with a simple code snippet that will be used to always execute a query through the cache server, then expand into using separate connections for boosted queries.

## Enable PlanetScale Boost on a single connection

Below is sample code that will establish a connection to a PlanetScale database and perform a query.

```js
import { connect } from '@planetscale/database'
import dotenv from 'dotenv'

dotenv.config()

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}

;(async () => {
  const conn = await connect(config)
  const results = await conn.execute('SELECT * FROM users')
})()
```

In order to enable a connection to use PlanetScale Boost, the `@@boost_cached_queries` session variable needs to be set with the following code:

```js
await conn.execute('SET @@boost_cached_queries = true')
```

Any query written after that session variable has been set will proxy requests through the Boost server. A fully updated code snippet would look like this:

```js
import { connect } from '@planetscale/database'
import dotenv from 'dotenv'

dotenv.config()

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}

;(async () => {
  const conn = await connect(config)
  await conn.execute('SET @@boost_cached_queries = true')
  const results = await conn.execute('SELECT * FROM users')
})()
```

With this configuration, all queries will be run through the boosted connection, regardless of if they're actually using PlanetScale Boost. This may make it difficult to tell which queries are really being boosted. For this reason, we recommend using two separate connections: one for regular queries and one for boosted queries.

## Create a separate connection

Our recommended strategy for working with PlanetScale Boost is to use two separate connections so you can be explicit when executing your queries. To do this, you'll need two separate `connection` objects using the `@planetscale/database` package and set the session variable on only one of them:

```js
import { connect } from '@planetscale/database'
import dotenv from 'dotenv'

dotenv.config()

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}

;(async () => {
  const conn = await connect(config)
  const results = await conn.execute('SELECT * FROM users')

  const boostedConnection = await connect(config)
  await boostedConnection.execute('SET @@boost_cached_queries = true')
  const boostedResults = await boostedConnection.execute('SELECT * FROM users')
})()
```
