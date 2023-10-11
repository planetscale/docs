---
title: Create a database
subtitle: Learn the basics of the PlanetScale dashboard by creating your first database.
date: '2023-08-05'
---

## Overview

This article is a continuation of the Onboarding series and is the next step after [creating an account in PlanetScale](/docs/onboarding/create-an-account). We’ll cover:

- Creating your first database on PlanetScale.
- Using the Console to create a schema and add some data.

This guide will use the database schema used by [Beam](https://github.com/planetscale/beam), an open-source message board.

{% callout %}
A schema refers to the structure of the database. The most common parts of a schema are tables and the columns those tables contain. We’ll be working with both in this guide.
{% /callout %}

## Create a database

If you’ve come here directly from creating your account, you should on your organization's overview page where you can choose to either: Create a new database or import a database.

Click the button to **"Create a new database"**.

On the next page, you will need to:

- Name the database `beam-demo`.
- Select a region. There are several geographical regions you can host your database in. You will want to select the region closest to your application servers connecting to the database.
- Select the desired [Plan type](/docs/concepts/billing#planetscale-plans) for your database.
- Add a valid credit or debit card to your account. In order to prevent fraud, PlanetScale requires a valid payment method to create databases. You will not be charged unless you create a Scaler or Scaler Pro database.

Then, click **"Create database"**. For the next step to create a table, you can select the option to connect to the database later with "**I’ll do this later**" button.

Next, you’ll be dropped into the dashboard for that specific database. Let's take a look at the layout and what each element does before moving on.

The tabs from left to right are:

- **Overview** &mdash; The current tab showing an overview of your database.
- **Deploy requests** &mdash; How you apply changes to your database schema. More on that in the next article.
- **Branches** &mdash; View the different branches of your database. Again, more on that in the next article.
- **Insights** &mdash; Provides statistics on database operations that may be affecting performance.
- **Boost** &mdash; PlanetScale Boost is a real-time query cache that automatically handles cache invalidation for you with one line of code.
- **Console** &mdash; Lets you run MySQL commands against branches.
- **Backups** &mdash; Shows you backup schedule and all backups for this database across production and development branches.
- **Settings** &mdash; Lets you tweak various aspects of your database like who has access to it, beta feature opt-ins, and plan management.

Two other important buttons are:

- **New branch** &mdash; Allows you to create a new branch of your schema.
- **Connect** &mdash; Provides connection details that applications can use to connect to your database.

## Create a table

Now let’s add a table and some columns to the database. PlanetScale databases leverage branches to let you create copies of your database so you can safely experiment with the schema without affecting your main production database. Branches will be covered more in detail in the next article, but since they are an integral part of the system, you’ll always be working within a database branch. The default branch created for all databases is `main`. Your `main` branch is a production branch, which are highly available database intended for production traffic. Production database branches are automatically provided with an additional replica to resist outages, enabling zero-downtime failovers.

Click on **"Console"** to get access to an in-browser MySQL shell.

Run the following command in that console to create your first table:

```sql
CREATE TABLE Post (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  content text NOT NULL,
  contentHtml text NOT NULL,
  hidden tinyint(1) NOT NULL DEFAULT '0',
  createdAt datetime(3) NOT NULL DEFAULT current_timestamp(3),
  updatedAt datetime(3) NOT NULL,
  authorId varchar(191) NOT NULL
);
```

Now run the following command to see the structure of the table that was just created:

```sql
DESCRIBE Post;
```

![The Console view of a database branch, with the output of the CREATE TABLE statement.](/assets/docs/onboarding/create-a-database/the-console-view-of-a-database-branch-with-the-output-of-the-create-table-statement.png)

{% callout title="Next steps" %}
In this guide, we explored the PlanetScale dashboard, created a database, and created a simple table in that database. Next, we’ll explore the concept of database branching and how it can fit into your development workflow.

- [Branching and Deploy Requests](/docs/onboarding/branching-and-deploy-requests)

{% /callout %}
