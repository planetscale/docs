---
title: 'Non-blocking schema changes'
subtitle: 'Non-blocking schema changes in PlanetScale provide a schema change workflow that allows users to update database tables without locking or causing downtime for production databases.'
date: '2023-12-05'
---

## Overview

{% callout type="tip" %}
To make non-blocking schema changes in PlanetScale, you'll first need a basic understanding of
[branching](/docs/concepts/branching), the core PlanetScale feature that provide schema changes. Our
branching concepts page is a great place to start.
{% /callout %}

**Non-blocking schema changes** in PlanetScale provide a schema change workflow that allows users to update database tables without locking or causing downtime for production databases.

PlanetScale makes it safe to deploy schema changes to production databases via _development_ and _production branches with [safe migrations](/docs/concepts/safe-migrations) enabled_. Production branches with safe migrations enabled cannot be deleted and can only be updated using deploy requests. Development branches are a separate database with a copy of the source branch's schema. Developers can make schema changes in development branches, test locally, and open a deploy request for deploying their changes to the production database.

Developers can also comment on deploy requests and request reviewers to approve a deploy request before its schema changes can deploy into the `main` database branch. Currently, requiring approval is a per-database setting is turned off by default. With the setting turned off, developers do not need approval to merge a deploy request.

## Adding columns to large tables with PlanetScale is safe!

_Create_, _drop_, and _alter_ statements, also known as Data Definition Language (DDL), are used for making schema changes in a database table.

PlanetScale enables developers to make schema changes without the fear of dropping columns, locking tables, causing downtime in their app, etc. PlanetScale also prevents schema changes with conflicts from being migrated and handles schema changes from multiple teammates. A user doesn't have to wait to find out if their changes will be rejected, they learn as they add the change to the queue.

## How do I make non-blocking schema changes with PlanetScale?

In order to make non-blocking schema changes, you **must** turn enable [safe migrations](/docs/concepts/safe-migrations) on your production branch. Without safe migrations enabled, your schema changes will run directly on your production branch, which can lead to table locking. When safe migrations is enabled on a branch, all schema changes must occur on a database branch. _(A database branch is a separate database with a copy of the production branch's schema.)_

At a high level, this is what happens during the _non-blocking schema change_ process in PlanetScale:

1. You create a development branch.
2. You test your changes on this branch before attempting to apply the changes to the production branch. _(i.e., You made some changes to the database you wish to deploy to the production database.)_
3. You open a request to deploy your changes to the target branch.
4. PlanetScale verifies that your schema changes are safe to be deployed to production. If there are any issues or schema conflicts, you'll be shown the errors.
5. You click `Deploy changes`. Your deploy is added to a queue and run immediately or when existing deploys are complete.
6. Your deployment makes it to the production branch, and you can now see your schema changes in the production branch.

{% callout %}
PlanetScale makes sure not to exhaust your resources; the deployment may be throttled to avoid any impact on
production queries.
{% /callout %}

![PlanetScale non-blocking schema changes diagram](/assets/docs/concepts/nonblocking-schema-changes/diagram.png)

## PlanetScale workflow

The PlanetScale command-line tool (CLI) runs an interactive shell equipped with many commands designed to make the database management workflow easier for developers.

A basic non-blocking schema change workflow in PlanetScale might look like this:

1. Create a database:

   ```bash
   pscale database create <database>
   ```

2. Create a development branch:

   ```bash
   pscale branch create <database> <branch>
   ```

3. Make a schema change on this branch:

   ```bash
   pscale shell <database> <branch>
   ```

   {% callout type="tip" %}
   A schema change is any change you make to the tables in your database environment created within the PlanetScale branch. (i.e., create, drop, and alter statements)
   {% /callout %}

   {% callout type="warning" %}
   You can only apply direct schema changes to branches without safe migrations enabled.
   {% /callout %}

   Here is a sample CREATE table schema change you could try using:

   ```sql
   CREATE TABLE `reminders` (
     `id` bigint NOT NULL AUTO_INCREMENT,
     `body` varchar(1024) NOT NULL,
     `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
     `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
     `is_done` tinyint(1) NOT NULL DEFAULT '0',
     PRIMARY KEY (`id`)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
   ```

4. Test changes on branch locally.

5. Create a deployment request by running:

   ```bash
   pscale deploy-request create <database> <branch>
   ```

6. Fix any schema conflicts.

   PlanetScale displays the difference between what is currently in the production branch and your development branch. Go back to _Step 3_ of the workflow and test out new schema changes to fix the schema conflict. If you did not encounter any schema conflicts, you're ready for _Step 7_.

7. Deploy the deploy request.

   - To _deploy_ the **deploy request** created in _Step 5_, run the following command:

     ```bash
     pscale deploy-request deploy <database> <deploy-request-number>
     ```

   - To find your `deploy-request-number`, simply run:

     ```bash
     pscale deploy-request list <database>
     ```

   Copy the value from `NUMBER` and use that digit as your `deploy-request-number`.

## Limitations

If you want to make schema changes containing foreign key constraints, opt-in to the [foreign key constraints](/docs/concepts/foreign-key-constraints) beta.

PlanetScale doesn't support direct `RENAME` for columns and tables. Learn why and how to rename tables or columns in [this tutorial](/docs/learn/handling-table-and-column-renames).

{% callout title="Next steps" %}

- [Branching](/docs/concepts/branching)

{% /callout %}
