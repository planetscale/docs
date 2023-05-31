---
title: Create a database
subtitle: Learn the basics of the PlanetScale dashboard by creating your first database.
date: '2022-09-13'
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

If you’ve come here directly from creating your account, you should be at one of the following two screens.

The first one is presented right after you verify your email address. Click **"create"** if you are here.

![The first screen you’ll see after signing up for PlanetScale.](/assets/docs/onboarding/create-a-database/the-first-screen-youll-see-after-signing-up-for-planetscale.png)

The second possible screen will be shown if you’ve stepped through the in-app guide. Click **"Create your first database"** if you are here.

![The screen you’ll see after stepping through the wizard after creating an account.](/assets/docs/onboarding/create-a-database/the-screen-youll-see-after-stepping-through-the-wizard-after-creating-an-account.png)

A modal should appear asking you to name the database and select the region. There are several geographical regions you can host your database. You will want to select the region closest to your application servers connecting to the database. For this example, leave the region set to "AWS us-east-1" and name the database `beam-demo`. Click **"Create database"**.

![The New database modal.](/assets/docs/onboarding/create-a-database/the-new-database-modal.png)

Next, you’ll be dropped into the dashboard for that specific database. Let's take a look at the layout and what each element does before moving on.

1. **Overview** &mdash; The current tab showing an overview of your database.
2. **Deploy requests** &mdash; How you apply changes to your database schema. More on that in the next article.
3. **Branches** &mdash; View the different branches of your database. Again, more on that in the next article.
4. **Insights** &mdash; Provides statistics on database operations that may be affecting performance.
5. **Console** &mdash; Lets you run MySQL commands against branches.
6. **Backups** &mdash; Shows you backup schedule and all backups for this database across production and development branches.
7. **Settings** &mdash; Lets you tweak various aspects of your database like who has access to it, beta feature opt-ins, and plan management.
8. **New branch** &mdash; Allows you to create a new branch of your schema.
9. **Get connection strings** &mdash; Provides connection details that applications can use to connect to your database.

![The dashboard of a database on PlanetScale.](/assets/docs/onboarding/create-a-database/the-dashboard-of-a-database-on-planetscale-2.png?v2)

Now let’s add a table and some columns to the database. PlanetScale databases leverage branches to let you create copies of your database so you can safely experiment with the schema without affecting your main production database. Branches will be covered more in detail in the next article, but since they are an integral part of the system, you’ll always be working within a database branch. The default branch created for all databases is `main`. Click on **"Console"** to get access to an in-browser MySQL shell.

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
