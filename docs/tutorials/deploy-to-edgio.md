---
title: 'Deploy to Edgio'
subtitle: 'Learn how to connect your PlanetScale database to deploy on Edgio'
date: '2023-01-19'
---

## Introduction

This guide will walk you through setting up and deploying your PlanetScale database on Edgio.

## Prerequisites

- A PlanetScale database &mdash; If you haven't created a database, refer to our [PlanetScale quickstart guide](/docs/tutorials/planetscale-quick-start-guide) to get started
- A [Edgio account](https://app.layer0.co/)
- A project deployed to Edgio &mdash; If you're just poking around and don't already have an application to deploy, you can use our [Next.js + PlanetScale sample](/docs/tutorials/connect-nextjs-app)

## Connecting your PlanetScale database to your Edgio application

### Get your connection string from PlanetScale

1. In your [PlanetScale dashboard](https://app.planetscale.com), click on the database you want to connect to.
2. Click "**Connect**".
3. Select the framework you're using from the "**Connect with**" dropdown. This will give you the exact environment variable names you need for your selected framework. If your framework is not listed, choose "General".

![PlanetScale dashboard connect modal](/docs/tutorials/deploy-to-netlify/prisma.png)

4. If the password is blurred, click "New password" to generate new credentials.
5. Keep this page open, as you'll need to copy these to Edgio momentarily.

### Copy environment variables to Edgio

1. Go to your Edgio dashboard.
2. Click on your Edgio project.
3. Click "**Configuration**".
4. On top of the page, click on **Edit v1**
5. Scroll down to "**Environment Variables**".
6. Click "**Add Variables**".
7. Copy each value from your PlanetScale dashboard into a new environment variable in Edgio. Once you're done with one, click "**Add Variable**" and continue to the next, if applicable.

For example, if you're using Prisma, your connection string will look similar to this:

```bash
DATABASE_URL='mysql://xxxxxxxxx:************@xxxxxxxxxx.us-east-3.psdb.cloud/my-database?sslaccept=strict'
```

{% callout %}
Your environment variable name will be the same in your application's code. We used `DATABASE_URL` as an example, but this can be given a different name.
{% /callout %}

In Edgio, you'll set it as follows:

- **Key** = `DATABASE_URL`
- **Value** = `mysql://xxxxxxxxx:************@xxxxxxxxxx.us-east-3.psdb.cloud/my-database?sslaccept=strict`

_Note: The credentials are blurred for the example, but when you paste them in, use the actual values._

![Edgio Dashboard - Environment variables]([/docs/tutorials/deploy-to-edgio/environment-variables.png](https://user-images.githubusercontent.com/46300090/213299795-5afd9182-a193-4dd8-aa76-d7411fa42376.png))

After you have saved, click activate on the top, and the site will be automatically redeployed.

## What's next?

Learn more about how PlanetScale allows you to make [non-blocking schema changes](/docs/concepts/nonblocking-schema-changes) to your database tables without locking or causing downtime for production databases.

