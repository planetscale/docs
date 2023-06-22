---
title: 'Automatic Prisma migrations'
subtitle: 'How to make changes to your PlanetScale database schema while using Prisma, a next-generation Node.js and TypeScript ORM'
date: '2023-06-21'
---

{% callout %}
This document has been updated to include the recommended Prisma and PlanetScale workflow, specifically the
recommendation to use `prisma db push` instead of `prisma migrate dev` with shadow branches. Also, you previously
needed to turn on the ability to automatically copy the Prisma migration metadata. You no longer need to do this. Read
more below.
{% /callout %}

## Introduction

In this tutorial, we're going to learn how to do Prisma migrations in PlanetScale as part of your deployment process using `prisma db push`.

### Quick introduction to Prisma's db push

From a high level, [Prisma's `db push`](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push) introspects your PlanetScale database to infer and execute the changes required to make your database schema reflect the state of your Prisma schema. When `prisma db push` is run, it will ensure the schema in the PlanetScale branch you are currently connected to matches your current Prisma schema.

We recommend `prisma db push` over `prisma migrate dev` for the following reasons:

PlanetScale provides [Online Schema Changes](/docs/learn/how-online-schema-change-tools-work) that are deployed automatically when you merge a deploy request and prevents [blocking schema changes](/docs/concepts/nonblocking-schema-changes) that can lead to downtime. This is different from the typical Prisma workflow which uses `prisma migrate` in order to generate SQL migrations for you based on changes in your Prisma schema. When using PlanetScale with Prisma, the responsibility of applying the changes is on the PlanetScale side. Therefore, there is little value to using `prisma migrate` with PlanetScale.

Also, the migrations table created when `prisma migrate` runs can also be misleading since PlanetScale does the actual migration when the deploy request is merged, not when `prisma migrate` is run which only updates the schema in the development database branch. You can still see the history of your schema changes in PlanetScale.

## Prerequisites

- Add Prisma to your project using `npm install prisma --save-dev` or `yarn add prisma --dev` (depending on what package manager you prefer).
- Run `npx prisma init` inside of your project to create the initial files needed for Prisma.
- Install the [PlanetScale CLI](https://github.com/planetscale/cli).
- Authenticate the CLI with the following command:

```bash
pscale auth login
```

## Execute your first Prisma db push

Prisma migrations follow the PlanetScale [non-blocking schema change](/docs/concepts/nonblocking-schema-changes) workflow. First, the schema is applied to a _development_ branch and then the development branch is merged into the `main` production database.

Let's begin with an example flow for running Prisma migrations in PlanetScale:

1. Create a new _prisma-playground_ database:

   ```bash
   pscale db create prisma-playground
   ```

2. Connect to the database branch:

   ```bash
   pscale connect prisma-playground main --port 3309
   ```

   {% callout %}
   This step assumes you created a new PlanetScale database and have not yet enabled [Safe Migrations](/docs/concepts/safe-migrations) on the `main` branch. You will need to create a new development branch otherwise.
   {% /callout %}

3. Update your `prisma/schema.prisma` file with the following schema:

   {% callout %}
   In Prisma `4.5.0`, `referentialIntegrity` changed to `relationMode` and became generally available in `4.7.0`. The following schema reflects this change.

   You can learn more about Prisma's Relation mode in the
   [Prisma docs](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/relation-mode).
   {% /callout %}

   ```js
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
     relationMode = "prisma"
   }

   generator client {
     provider = "prisma-client-js"
   }

   model Post {
     id        Int      @default(autoincrement()) @id
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
     title     String   @db.VarChar(255)
     content   String?
     published Boolean  @default(false)
     author    User     @relation(fields: [authorId], references: [id])
     authorId  Int
   }

   model Profile {
     id     Int     @default(autoincrement()) @id
     bio    String?
     user   User    @relation(fields: [userId], references: [id])
     userId Int     @unique
   }

   model User {
     id      Int      @default(autoincrement()) @id
     email   String   @unique
     name    String?
     posts   Post[]
     profile Profile?
   }
   ```

4. Update your `.env` file:

   ```shell
   DATABASE_URL="mysql://root@127.0.0.1:3309/prisma-playground"
   ```

5. In another terminal, use the `db push` command to push the schema defined in `prisma/schema.prisma`:

   ```bash
   npx prisma db push
   ```

   Unlike the `prisma migrate dev` command, it will not create a migrations folder containing a SQL file with the SQL used to update the schema in your PlanetScale database. PlanetScale will be tracking your migrations in this workflow.

   {% callout type="tip" %}
   You can learn more about the `prisma db push` command in the
   [Prisma docs](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push).
   {% /callout %}

   After `db push` is successful, you can see the table created in your terminal. For example, to see the `Post` table:

   ```bash
   pscale shell prisma-playground main
   ```

   ```sql
   describe Post;
   ```

   {% callout type="tip" %}
   Use the `exit` command to exit the MySQL shell.
   {% /callout %}

   Or you can see it in the PlanetScale UI under the Schema tab in your `main` branch.

6. Finally, turn on safe migrations on the `main` branch to enable non-blocking schema changes:

   ```bash
   pscale branch safe-migrations enable prisma-playground main
   ```

## Execute succeeding Prisma migrations in PlanetScale

Our first example migration flow went well, but what happens when you need to run further changes to your schema?

Let's take a look:

1. Create a new _development_ branch from `main` called `add-subtitle-to-posts`:

   ```bash
   pscale branch create prisma-playground add-subtitle-to-posts
   ```

2. Close the proxy connection to your `main` branch (if still open) and connect to the new `add-subtitle-to-posts` development branch:

   ```bash
   pscale connect prisma-playground add-subtitle-to-posts --port 3309
   ```

3. In the `prisma/schema.prisma` file, update the `Post` model:

   Add a new `subtitle` field to `Post`:

   ```
   subtitle  String   @db.VarChar(255)
   ```

4. Run `db push` again to update the schema in PlanetScale:

   ```bash
   npx prisma db push
   ```

5. Open a deploy request for your `add-subtitle-to-posts` branch, so that you can deploy these changes to `main`.

   You can complete the deploy request either in the web app or with the `pscale deploy-request` command.

   ```bash
   pscale deploy-request create prisma-playground add-subtitle-to-posts
   ```

   ```bash
   pscale deploy-request deploy prisma-playground 1
   ```

6. Once the deploy request is merged, you can see the results in your main branch's `Post` table:

   ```bash
   pscale shell prisma-playground main
   ```

   ```sql
   describe Post;
   ```

## What's next?

Now that you've successfully conducted your first automatic Prisma migration in PlanetScale and know how to handle future migrations, it's time to deploy your application with a PlanetScale database! Let's learn how to [deploy an application with a PlanetScale database to Vercel](/docs/tutorials/deploy-to-vercel).
