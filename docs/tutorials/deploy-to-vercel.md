---
title: 'Deploy to Vercel'
subtitle: 'Learn how to connect your PlanetScale database to deploy on Vercel'
date: '2022-08-01'
---

## Introduction

This guide will walk you through setting up and deploying your PlanetScale database on Vercel.

It will cover two options:

- [Manually adding PlanetScale environment variables to your Vercel project](#manually-connect-to-vercel)
- [Connecting your PlanetScale database to your application using the Vercel integration](#deploy-with-the-planetscale-vercel-integration)

## Prerequisites

- A PlanetScale database &mdash; If you haven't created a database, refer to our [PlanetScale quickstart guide](/docs/tutorials/planetscale-quick-start-guide) to get started
- A [Vercel account](https://vercel.com/)
- A project deployed to Vercel &mdash; If you're just poking around and don't already have an application to deploy, you can use our [Next.js + PlanetScale sample](/docs/tutorials/connect-nextjs-app)

## Manually connect to Vercel

### Get your connection string from PlanetScale

1. In your [PlanetScale dashboard](https://app.planetscale.com), click on the database you want to connect to.
2. Click "**Connect**".
3. Select the framework you're using from the "**Connect with**" dropdown. This will give you the exact environment variable names you need for your selected framework. If your framework is not listed, choose "General".

   ![PlanetScale dashboard connect modal {priority}](/assets/docs/tutorials/deploy-to-vercel/prisma-2.png)

4. If the password is blurred, click "New password" to generate new credentials.
5. Keep this page open, as you'll need to copy these to Vercel momentarily.

### Copy environment variables to Vercel

1. Go to your Vercel dashboard.
2. Click on your Vercel project.
3. Click "**Settings**".
4. Click "**Environment variables**".
5. Copy each value from your PlanetScale dashboard into a new environment variable in Vercel. Once you're done with one, click "**Add**" and continue to the next, if applicable.

For example, if you're using Prisma, your connection string will look similar to this:

```bash
DATABASE_URL='mysql://xxxxxxxxx:************@xxxxxxxxxx.us-east-3.psdb.cloud/my_database?sslaccept=strict'
```

In Vercel, you'll set it as follows:

- **NAME** = `DATABASE_URL`
- **VALUE** = `mysql://xxxxxxxxx:************@xxxxxxxxxx.us-east-3.psdb.cloud/my_database?sslaccept=strict`

{% callout %}
The credentials are blurred for the example, but when you paste them in, use the actual values.
{% /callout %}

![Vercel dashboard - Environment variables](/assets/docs/tutorials/deploy-to-vercel/environment-variables.png)

## Deploy with the PlanetScale Vercel integration

If you don't want to copy and paste the environment variables over to Vercel, you can use the [PlanetScale integration from the Vercel marketplace](https://vercel.com/integrations/planetscale). You can choose which database you want to connect to, and we'll automatically pull the necessary environment variables into your Vercel project.

1. You must have an existing PlanetScale database to use the integration. You can create a database in the [PlanetScale dashboard](https://app.planetscale.com).
2. Click "**Add integration**" on the [Vercel integrations page](https://vercel.com/integrations/planetscale).
3. Select the Vercel account you want to connect with.
4. On the left, you'll see the Vercel options, and on the right, the PlanetScale options.
5. Select the Vercel project you want to connect to, and beneath that, select the framework you're using. If the framework isn't listed, select "**General**". This selection is what determines the names of the environment variables.
6. On the right side, choose the [PlanetScale Organization](/docs/concepts/access-control) that the database is in. The integration will remain tied to this Organization and cannot be changed.
7. Beneath that, select the database you want to connect to.
8. Click "**Connect database**".
9. Back in your Vercel dashboard, confirm the environment variables were added by going to your Vercel project > "**Settings**" > "**Environment variables**"

### Configure your connection

After you set up the initial connection, you also have the option to configure the PlanetScale connection, add more databases to the project, or remove databases from the project.

To access the configuration page:

1. In your Vercel project dashboard, click "**Integrations**".
2. Click the "**PlanetScale**" integration.
3. Click the "**Configure**" button.

{% callout %}
If you're modifying an existing connection on a Vercel project, these environment variable values will be regenerated and overwritten.
{% /callout %}

{% callout title="When removing the Vercel integration" %}

- Environment variables are removed from all projects tied to the integration.
- Your application will no longer be able to connect to your PlanetScale database.

{% /callout %}

## What's next?

Learn more about how PlanetScale allows you to make [non-blocking schema changes](/docs/concepts/nonblocking-schema-changes) to your database tables without locking or causing downtime for production databases.
