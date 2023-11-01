---
title: 'Using the PlanetScale serverless driver with Prisma'
subtitle: 'How to use the PlanetScale serverless driver with Prisma.'
date: '2023-11-01'
---

## Overview

This document outlines how you can use the [PlanetScale serverless driver](/docs/tutorials/planetscale-serverless-driver) along with Prisma in your application.

## Set up

To get started:

1. Install the Prisma driver adapter for PlanetScale (`@prisma/adapter-planetscale`), PlanetScale serverless driver (`@planetscale/database`), and `undici` packages:

```shell
npm install @prisma/adapter-planetscale @planetscale/database undici
```

{% callout %}

When using an older version of Node.js, you can provide a custom fetch function implementation. We recommend the `undici` package on which Node's built-in fetch is based. Node.js version 18 includes a built-in global `fetch` function.

{% /callout %}

2. Enable the `driverAdapters` Preview feature flag:

```javascript
// schema.prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"
}
```

{% callout %}

Ensure you update the host value in your connection string to `aws.connect.psdb.cloud`. You can learn more about this [here](/docs/tutorials/planetscale-serverless-driver#add-and-use-the-planetscale-serverless-driver-for-javascript-to-your-project).

{% /callout %}

3. Generate Prisma Client:

```shell
npx prisma generate
```

4. Update your Prisma Client instance to use the PlanetScale serverless driver:

```javascript
import { connect } from '@planetscale/database'
import { PrismaPlanetScale } from '@prisma/adapter-planetscale'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import { fetch as undiciFetch } from 'undici'

dotenv.config()
const connectionString = `${process.env.DATABASE_URL}`

const connection = connect({ url: connectionString, fetch: undiciFetch })
const adapter = new PrismaPlanetScale(connection)
const prisma = new PrismaClient({ adapter })

async function main() {
  const posts = await prisma.post.findMany()
  console.log(posts)
}
```

You can then use Prisma Client as you usually would with auto-completion and full type-safety.

{% callout title="Next steps" %}

- [Prisma quickstart](/docs/prisma/prisma-quickstart)
- [Prisma best practices](/docs/prisma/prisma-best-practices)

{% /callout %}
