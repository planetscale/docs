---
title: 'PlanetScale and Prisma Data Platform integration'
subtitle: 'Use the Prisma Data Platform to auto-generate a project with Prisma and PlanetScale and deploy it to Vercel.'
date: '2023-04-05'
---

## Overview

The following guide will show you how to integrate PlanetScale with a Prisma application using the Prisma Data Platform integration.

## Configure the project

First, navigate to [Prisma Data Platform](https://cloud.prisma.io/projects/) to create your project. Authenticate with your GitHub account and then click on the "**New Project**" button to [start a new project](https://cloud.prisma.io/projects/create).

Give your project a name. You'll have the option to either create a new repository for your project or import an existing Prisma repository. Either way, select the GitHub account that the existing project lives under or where you want it to live.

If you're creating a new one, click "**Create a repository**", type in the repository name, and then click "**Next**"

### Importing an existing Prisma repository

If you're importing, click "**Import a Prisma repository**", and then select the repository and branch from the dropdowns.

Make sure your imported project has a `schema.prisma` file. You can specify the path of the file in the "**Prisma Schema path**" input box. This file must be relative to the repository root.

![Prisma Data Platform project configuration](/assets/docs/tutorials/prisma-data-platform-integration/project.png)

## Select a template

In order for Prisma Data Platform to work seamlessly with PlanetScale, you need to pick the "Empty" template.

{% callout %}
Currently, you cannot use one of the existing templates with PlanetScale. If you do, you will likely see a "foreign key constraints are not allowed error." You will need to edit your Prisma schema file in your GitHub repo and push to the repo and PlanetScale as described below.
{% /callout %}

![Prisma Data Platform project template options](/assets/docs/tutorials/prisma-data-platform-integration/templates.png)

## Configure the environment

Next, you need to connect your Prisma project to your PlanetScale database. Here's what you need to do to create and configure your database:

1. Log in to [https://app.planetscale.com](https://app.planetscale.com) and create a new database or select an existing one.
2. In a non-production branch (or production branch with [safe migrations](/docs/concepts/safe-migrations) disabled), select the "**Get connection strings**" button and select "**Prisma**" in the dropdown.
3. Copy the PlanetScale connection string without the quotes or the variable name. The connection string looks similar to: `mysql://doianhxp9mla:************@wspfgipy7tg7.us-east-2.psdb.cloud/prisma-planetscale?sslaccept=strict`
4. In Prisma, in the "**Connection string**" field, paste the connection string.
5. Under "**Prisma Data Proxy**", select the location closest to you or your application.
6. Once you're ready to proceed, click the green "**Create project**" button at the bottom. You'll see a loading screen for a few seconds while your project is being configured.
7. Once done, you can "**Skip**" the deploy step. There is one last thing you need to do to make your PlanetScale database ready to use with the Prisma Data Platform.
8. Go to your GitHub account and `git clone` the project that Prisma created locally.
9. Navigate to your `prisma/schema.prisma` file and update it so that the `client` and `datasource` look similar to the following schema:

   {% callout %}
   If you are using an existing Prisma project, you can skip updating the schema in steps 9 and 10.
   {% /callout %}

   {% callout %}
   In Prisma `4.5.0`, `referentialIntegrity` changed to `relationMode` and became generally available in `4.7.0`. The following schema reflects this change.

   You can learn more about Prisma's Relation mode in the
   [Prisma docs](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/relation-mode).
   {% /callout %}

   ```js
   generator client {
     provider        = "prisma-client-js" //If you want to use TypeScript, use "prisma-client-ts"
   }

   datasource db {
     provider             = "mysql"
     url                  = env("DATABASE_URL")
     relationMode = "prisma"
   }
   ```

10. You can now add your tables in the `schema.prisma` file following the schema above. You can either create your own tables, or, if you need an example, you can copy the schema we used in [Beam, a sample application](https://github.com/planetscale/beam/blob/main/prisma/schema.prisma). Learn more about data modeling with Prisma in the [Prisma schema documentation](https://www.prisma.io/docs/concepts/components/prisma-schema). Make sure to `git commit` and `git push` this to your repo. Prisma will pick up these changes to your schema.
11. Lastly, you need to push your new schema to PlanetScale. To do this, locally, create a `.env` file to store your `DATABASE_URL` in your project folder.
12. Go back to your working branch of PlanetScale and create a new password using the "**Get connection strings**" button and select "**Prisma**" in the dropdown.
13. Copy the full `DATABASE_URL` variable with the connection string into your `.env` file and save.
14. Locally, run `npx prisma db push`, which will push your database schema to PlanetScale.
15. Your PlanetScale database is now ready! In the Prisma Data Platform, you will now be ready to use the Data Browser, Query Console, Data Proxy, and you are ready to start building!

{% callout %}
When you are ready to deploy your application to production and promote your branch in PlanetScale to production, make sure to change your connection string in the Prisma Data Platform for your new production branch. Remember: You will need to branch without safe migrations enabled to make changes to your Prisma schema. Ideally this would be in a non-production branch.
{% /callout %}

## Exploring PlanetScale

With your PlanetScale database now set up, head to your [PlanetScale dashboard](https://app.planetscale.com) to check it out. You'll see the database you created on your **Overview** page. Click on it and you'll be taken to the **Overview** page for that database.

Here, you'll find [connection strings](/docs/concepts/connection-strings) you can use to connect to your database, the database settings page, and many more features that come with your free PlanetScale database, such as:

- [Branching](/docs/concepts/branching) &mdash; Create branches of your database so that you can develop and test changes in an isolated development environment.
- [Non-blocking schema changes](/docs/concepts/nonblocking-schema-changes) &mdash; Once you're ready to apply your changes from your development branch, you can deploy them to production without blocking or slowing down your production database during deployment.
- [Automatic backups](/docs/concepts/back-up-and-restore) &mdash; On the free plan, your database branches are backed up daily.
- [Query Insights](/docs/concepts/query-insights) &mdash; Insight into the exact active queries running on your databases with helpful statistics such as how many times it's run, time to run, rows affected, rows returned, and time per query.

You can do all of this and more from your [PlanetScale dashboard](https://app.planetscale.com) or the [PlanetScale CLI](/cli).

## Prisma Data Platform

You can explore your application's data back in the [Prisma Data Platform](https://www.prisma.io/dataplatform). This cloud-based environment provides you with the ability to:

- Test out queries for your application on sample data using the **Query Console**.
- Explore your data in the **Data Browser**.
- View your database schema under **Schema**.
- Connect from serverless platforms that don't support database connections via **Prisma Data Proxy**.
- And modify your project settings.
