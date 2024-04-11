---
title: 'Deploy to Netlify'
subtitle: 'Learn how to connect your PlanetScale database to deploy on Netlify'
date: '2022-08-01'
---

## Introduction

This guide will walk you through setting up and deploying your PlanetScale database on Netlify.

{% callout %}
This doc is intended for users that are manually storing a connection string in an environment variable in Netlify. If you want to use the Netlify integration, which handles this for you, see the [PlanetScale integration in the Netlify docs](https://docs.netlify.com/integrations/planetscale-integration).
{% /callout %}

## Prerequisites

- A PlanetScale database — If you haven't created a database, refer to our [PlanetScale quickstart guide](/docs/tutorials/planetscale-quick-start-guide) to get started
- A [Netlify account](https://netlify.com/)
- A project deployed to Netlify — If you're just poking around and don't already have an application to deploy, you can use our [Next.js + PlanetScale sample](/docs/tutorials/connect-nextjs-app)

## Connecting your PlanetScale database to your Netlify application

### Get your connection string from PlanetScale

1. In your [PlanetScale dashboard](https://app.planetscale.com), click on the database you want to connect to.
2. Click "**Connect**".
3. Create a new password. Make sure to copy the password, as you'll only be shown it once.
4. Select the framework you're using from the "**Select your language or framework**" section. This will give you the exact environment variable names you need for your selected framework. If your framework is not listed, choose "Other".

   ![PlanetScale dashboard connect modal {priority}](/assets/docs/tutorials/deploy-to-netlify/prisma.png)

5. Keep this page open, as you'll need to copy these to Netlify momentarily.
6. If you navigate away from the page, and can no longer access the password, create a new password by repeating steps 1-5.

### Copy environment variables to Netlify

1. Go to your Netlify dashboard.
2. Click on your Netlify project.
3. Click "**Site settings**".
4. Click "**Build & deploy**," then "**Environment**".
5. Click "**Edit variable**".
6. Click "**New variable**" and copy each value from your PlanetScale dashboard into a new environment variable in Netlify. Once you're done with one, click "**Add**" and continue to the next, if applicable.

For example, if you're using Prisma, your connection string will look similar to this:

```bash
DATABASE_URL='mysql://xxxxxxxxx:************@xxxxxxxxxx.us-east-3.psdb.cloud/my-database?sslaccept=strict'
```

{% callout %}
Your environment variable name will be the same in your application's code. We used `DATABASE_URL` as an example, but this can be given a different name.
{% /callout %}

In Netlify, you'll set it as follows:

- **Key** = `DATABASE_URL`
- **Value** = `mysql://xxxxxxxxx:************@xxxxxxxxxx.us-east-3.psdb.cloud/my-database?sslaccept=strict`

_Note: The credentials are blurred for the example, but when you paste them in, use the actual values._

![Netlify dashboard - Environment variables](/assets/docs/tutorials/deploy-to-netlify/environment-variables.png)

After you have saved, you will need to rebuild the site with the new environment variable.

## What's next?

Learn more about how PlanetScale allows you to make [non-blocking schema changes](/docs/concepts/nonblocking-schema-changes) to your database tables without locking or causing downtime for production databases.
