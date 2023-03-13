---
title: 'Prisma with PlanetScale quickstart'
subtitle: 'Learn how to integrate Prisma with PlanetScale'
date: '2022-11-29'
---

## Overview

This guide will show you how to:

- Create a database with PlanetScale
- Integrate into a Next.js + Prisma application

### Prerequisites

- A [free PlanetScale account](https://auth.planetscale.com/sign-up)
- [Node.js](https://nodejs.org/en/download/)
- [PlanetScale CLI](https://github.com/planetscale/cli#installation)

## Set up your PlanetScale database

First, [sign up for a free PlanetScale account](https://auth.planetscale.com/sign-up). You can either do this on the PlanetScale website or [using the PlanetScale CLI](/docs/concepts/planetscale-environment-setup).

### Create a PlanetScale database

Once you're signed in, click on the "Create a database" button. Name your database `star-app`, select the region closest to you, and click "Create database".

You can also use the PlanetScale CLI to create a database by running the following command:

```bash
pscale db create star-app --region <REGION>
```

For the `REGION` value, choose the region closest to you or your application's hosting location. You can find our regions and their slugs on the [Regions page](/docs/concepts/regions#available-regions). If you do not specify a region, your database will automatically be deployed to **US East - Northern Virginia**.

Your database will deploy with an initial development branch, `main`.

### Set up branches

Now that you have your PlanetScale database set up, you need to create a development branch to connect to your Prisma application.

Click on your `star-app` database in the dashboard, and then click on the "**Branches**" tab in the top nav.

From here, click the "**New branch**" button. Name the branch `initial-setup`, keep `main` as the base branch, select the region closest to you, and click "Create branch".

Or, to create the `initial-setup` branch in the CLI, run the following command:

```bash
pscale branch create star-app initial-setup
```

The new branch will default to the same region that was selected for `main`.

## Set up Next.js app

Next, you need to set up your Next.js application. If you have an existing app, you can use that. Otherwise, instantiate a new Next app by running the following:

```bash
npx create-next-app@latest --use-npm
```

We are going to use npm in this quickstart, but you can also use yarn if you prefer.

Give your project a name (this tutorial is using `star-app`). This will install the project with the `react`, `react-dom`, and `next` dependencies.

Once it's finished, enter into the project folder:

```bash
cd star-app
```

## Initialize Prisma

Now that you have your Next.js application ready, it's time to integrate Prisma.

First, you'll need to add the Prisma CLI as a development dependency to your project.

```bash
npm install prisma --save-dev
```

Next, you'll need to install the [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client). In your `star-app` directory, run the following command:

```bash
npm install @prisma/client
```

Then you need to set up your Prisma files. You can do this by running:

```bash
npx prisma init
```

This creates the `prisma` directory with a file named `schema.prisma`. This file will hold your [Prisma schema configuration](https://www.prisma.io/docs/concepts/components/prisma-schema), which includes your data sources (PlanetScale), generators ([Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)), and data models.

{% callout %}
In Prisma `4.5.0`, `referentialIntegrity` changed to `relationMode` and became generally available in `4.7.0`. The following schema reflects this change.

You can learn more about Prisma's Relation mode in the
[Prisma docs](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/relation-mode).
{% /callout %}

Open up the `prisma/schema.prisma` file and paste in the following:

```js
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
}

generator client {
  provider = "prisma-client-js"
}

model Star {
  id              Int       @default(autoincrement()) @id
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  name            String    @db.VarChar(255)
  constellation   String    @db.VarChar(255)
}
```

Next, you need to modify your environment variables to set the [Prisma data source](https://www.prisma.io/docs/concepts/components/prisma-schema/data-sources). Open up `.env` at the root of your application and replace its contents with the following:

```bash
DATABASE_URL = 'mysql://root@127.0.0.1:3309/<DATABASE_NAME>'
```

## Connect to PlanetScale

Now you need to locally proxy into your PlanetScale database branches using the PlanetScale CLI. In a separate terminal, run the following commands:

```bash
pscale connect star-app initial-setup --port 3309
```

Keep this connection running. This establishes a secure connection to PlanetScale and listens on the specified local port. In the terminal, you'll see a local address returned. You can use this to connect to a MySQL client if you'd like.

### Push Prisma schema to PlanetScale

Now it's time to push your Prisma schema. In a new terminal tab, run the following command:

```bash
npx prisma db push
```

The recommended workflow with using Prisma alongside PlanetScale is to use `prisma db push` instead of `prisma migrate`. You can read more about [`prisma db push` here](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push).

Once this is successful, your PlanetScale database schema now matches the Prisma schema you configured in `prisma/schema.prisma`.

### View your schema in PlanetScale

You can confirm it worked in your PlanetScale dashboard or with the CLI.

**Dashboard instructions:**

- Select the `star-app` database
- Click on the "**Branches**" tab
- Click `inital-setup`
- Click on "**Schema**"
- Click the "**Refresh Schema**" button

You should see one table: `Star`.

And just like that, you have your development branch with your Prisma schema hosted on PlanetScale.

**CLI instructions:**

To view your database, you can use the PlanetScale CLI to open a MySQL shell where you can view your tables and schema. Run the following command:

```bash
pscale shell star-app initial-setup
```

Once you're in the MySQL shell, run the following:

```sql
SHOW tables;
```

You should see the `Star` table. To view the `Star` schema, run the following:

```sql
DESCRIBE Star;
```

You can exit the shell by running:

```bash
exit
```

## Add data

Next, you need to add some data. You have several different options here. This tutorial will cover adding data using three different methods:

- Console in the PlanetScale dashboard
- PlanetScale CLI
- Prisma Studio

### Option 1: Add data in PlanetScale dashboard console

In your PlanetScale dashboard, click on the `star-app` database, select the `initial-setup` branch, and click on the "**Console**" tab. This will let you run queries on your development database branch.

The `Star` table is currently empty. To add some data, type in the following and press enter:

```sql
INSERT INTO `Star` (id, createdAt, updatedAt, name, constellation)
VALUES  (default, now(), now(), 'Antare', 'Scorpius');
```

To confirm that it was added, run:

```sql
select * from Star;
```

### Option 2: Add data with PlanetScale CLI

To accomplish this same thing in the PlanetScale CLI, run the following in your terminal to enter into the MySQL shell:

```bash
pscale shell star-app initial-setup
```

Next, add a new star to the `Star` table with:

```sql
INSERT INTO `Star` (id, createdAt, updatedAt, name, constellation)
VALUES  (default, now(), now(), 'Graffias', 'Scorpius');
```

To confirm it was added, run:

```sql
select * from Star;
```

You can exit the shell by running:

```bash
exit
```

### Option 3: Add data with Prisma Studio

If you prefer a visual interface, you can also add data using [Prisma Studio](https://www.prisma.io/studio).

In your terminal, run the following to open up Prisma Studio:

```bash
npx prisma studio
```

This will open Prisma Studio locally in your browser. Click on the "**Add record**" button.

You can leave `id`, `createdAt`, and `updatedAt` blank as they will auto-fill with default values. Fill in `name` and `constellation` as follows:

- `name` &mdash; **Sargas**
- `constellation` &mdash; **Scorpius**

To add the record, click the green "**Save 1 change**" button.

![Prisma Studio showing the Star table with one record](/assets/docs/tutorials/prisma-quickstart/studio.png)

## Add an API route

Now that you have some data, you need to add a simple `GET` endpoint in your Next.js app to retrieve it.

Back in your code editor, create a new file at `pages/api/stars.js` and paste in the following:

```js
import prisma from '../../lib/prisma'

export default async function assetHandler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const stars = await prisma.star.findMany()
        res.status(200).json(stars)
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({ error: 'Error fetching posts' })
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
```

Next, you need create a file at `lib/prisma.js`. This will allow you to reuse the Prisma client. Paste in the following code:

```js
import { PrismaClient } from '@prisma/client'

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma
```

Finally, start up your Next application by running the following:

```bash
npm run dev
```

You can now see all your `Star` table data at [`localhost:3000/api/stars`](http://localhost:3000/api/stars).

## Deploy development branch to production

Currently, you're working on the development branch `initial-setup`, which is branched off of the `main` branch. The `initial-setup` development branch is meant for applying schema changes and testing your migrations before you go to production.

Once you're happy with the `initial-setup` branch, you can roll it up to the production branch. To do this, you first need to promote the `main` branch to production. This `main` branch is currently empty, but once it's set as the production branch, you'll be able to roll your changes from `initial-setup` into it.

To promote `main` to production:

- Go back to your `star-app` database in the PlanetScale dashboard
- Click on the `main` branch under "**Branches**"
- Click on the "**Promote branch**" button
- Click "**Promote branch**" to confirm

Your `main` branch is now in production! A production branch protects you from direct schema changes, gives you high availability, and has automatic scheduled backups.

This production branch is currently empty. You can confirm this by going to the `main` branch and clicking on the "**Schema**" tab. Let's fix that.

## Create a deploy request

The final step in this process is to roll out your changes in your `initial-setup` branch to production. To do this, you need to create a deploy request to your `main` production branch.

In the dashboard, select the `initial-setup` branch. On the "**Overview**" tab, you'll see the option to "Create a deploy request". Make sure `main` is selected in the "**Deploy to**" dropdown, type in a comment to go with your deploy request, and click "**Create deploy request**".

PlanetScale will check to make sure there are no conflicts between the two branches. If not, you'll get the message "This deploy request is deployable". You can click on the "**Schema changes**" tab to see a diff of the schema changes to be deployed.

![Example of the Star table schema in a deploy request on PlanetScale](/assets/docs/tutorials/prisma-quickstart/schema.png)

Now, you're ready to deploy the `initial-setup` branch to production! On the "**Summary**" tab of the deploy request, click the button "**Add changes to deploy queue**". The deployment has now been added to the deploy queue.

Once it's done deploying, you'll get a success message, "These changes have been deployed".

To verify that it worked correctly, go back to your `main` branch and click on "**Schema**". You should now see the `Star` table!

## Next steps

Now that you have your Next.js application with a database in production on PlanetScale, you may want to deploy the entire application. You can deploy to Vercel in just a few easy steps by following our [Deploy to Vercel guide](/docs/tutorials/deploy-to-vercel#deploy-to-vercel).
