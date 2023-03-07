---
title: 'Branching'
subtitle: 'Create a development or staging environment for your database through branches'
date: '2023-03-01'
---

## Overview

PlanetScale allows you to branch database schemas the same way you branch your code.

### If you need to make a schema change to your production database, here's how you do it with PlanetScale:

1. Create a new **development branch** off of your production branch. This is an isolated copy of your production schema that you're free to play around with.
2. **Make schema changes** to this copy of your database (drop a column, add a table, etc.).
3. **Test them out in your development environment** to make sure everything works correctly.
4. Once you're satisfied with the changes, **create a deploy request**.
5. PlanetScale will create a **schema diff** comparing your production schema to your development schema that you're requesting to deploy so that you know exactly what changes will be made. We'll also let you know if the deploy request is **able to be deployed**. This means catching issues with your schema, such as missing unique keys, etc.
6. You can have your team **review your deploy request** and, optionally, **approve** it for deployment.
7. You then add it to the **deploy queue**, and PlanetScale will begin the deployment.
8. The schema changes are deployed in a way that causes **ZERO downtime**. No individual tables get locked, and production is not slowed down during the migration. This is what we call **non-blocking schema changes**. You can learn more about this process in our [Non-blocking schema changes documentation](/docs/concepts/nonblocking-schema-changes).

![PlanetScale Branching Flow Diagram](/docs/concepts/branching/diagram.png)

## Development and production branches

PlanetScale provides two types of database branches:

- **Development branches** &mdash; Development branches provide isolated copies of your production database schema where you can make changes, experiment, or run CI. Note, only the schema is copied, not the data. To create a development branch with data from another branch, see the [Data Branching® feature](/docs/concepts/data-branching) section.

- **Production branches** &mdash; Production branches are highly available databases intended for production traffic. They are protected from direct schema changes by default and include automated daily backups. To make a change to a production branch, you must [create a deploy request](#how-to-deploy-a-branch).

{% callout type="tip" %}
You'll see a `ERROR 1105 (HY000): direct DDL is disabled` message if you attempt to make schema changes in a
production branch. Instead, create a development branch, and make your changes there.
{% /callout %}

## Promote a branch to production

{% vimeo src="https://player.vimeo.com/video/763913898" caption="Demonstration of how to promote a branch to production" /%}

PlanetScale provides the ability to **promote any development branch with a valid schema to production**. Promoting a branch to production will require future schema changes to be made via a deploy request and will engage any custom backup schedules you have configured for production branches in addition to the automatic daily backups.

### Promote a development branch to production

Every new PlanetScale database is created with a development branch named `main`.

This development branch is intended for you to directly apply a schema (without creating a deploy request like you would for a production branch), import data, and experiment with your database before promoting the branch to production.

That said, you don't have to use the default `main` branch as your production branch. **Any development branch can be promoted to production**.

Once you are satisfied with the changes you've made to your development branch, you can promote it to production. Going forward, you can continue to make new development branches off of this production branch whenever you need to make a schema change.

A branch can be promoted from the branch overview page in the PlanetScale app or by using the [PlanetScale CLI](/docs/reference/branch), as shown below:

```bash
pscale branch promote <DATABASE_NAME> <BRANCH_NAME>
```

It's possible to run multiple production branches simultaneously, within [your plan's limits](/docs/concepts/billing#planetscale-plans). Keep in mind, PlanetScale does not provide data syncing between production branches.

## Create a development branch

{% vimeo src="https://player.vimeo.com/video/763914056" caption="Demonstration of how to create a PlanetScale branch" /%}

If you need to make schema changes to your production application, you can create a new development branch off of the production branch. This will copy the production schema into a new branch where you can create and test your changes.

Development branches **will not** copy over production data, just the schema. To create a development branch with data from another branch, see the [Data Branching feature](/docs/concepts/data-branching) section.

**How to create a development branch**:

1. On the database overview page in your PlanetScale dashboard, click the "**New branch**" button.
2. Give your development branch a name and select the region closest to your or your application.
3. Select the production branch you want to branch off of. You can also select another development branch.
4. Click "**Create branch**".
5. (_Optional_) You can also create a new branch from the [PlanetScale CLI](/docs/reference/branch) with:

```bash
pscale branch create <DATABASE_NAME> <BRANCH_NAME>
```

## How to deploy a branch

Once you're satisfied with the schema changes you have made on a branch, you can deploy your changes to production.

### 1. Create a deploy request

{% vimeo src="https://player.vimeo.com/video/763914026" caption="Demonstration of how to create a deploy request" /%}

If you are working in a team, the [deploy request](/docs/concepts/deploy-requests) creates an opportunity for your teammates to review the changes you have made before they are deployed to production.

1. Make sure your database has a **production branch**. You cannot create a deploy request without a production branch to deploy to.
2. To create the deploy request, go to the branch overview page for the branch you want to deploy.
3. Select the production branch you want to deploy to from the "**Deploy to**" dropdown.
4. (_Optional_) Add a comment describing your deploy request.
5. Click "**Create deploy request**".

![PlanetScale deploy request example](/docs/concepts/branching/deploy-request-page.png)

6. (_Optional_) You can also create a deploy request from the [PlanetScale CLI](/docs/reference/deploy-request) with the following command:

```bash
pscale deploy-request create <DATABASE_NAME> <BRANCH_NAME>
```

### 2. Review the deploy request

{% vimeo src="https://player.vimeo.com/video/763913969" caption="Demonstration of how to add a deploy request to the deploy queue" /%}

The deploy request includes a schema diff so that you can review the schema changes introduced by the deploy request against the production branch.

1. On the deploy request page, click the "**Schema changes**" tab.
2. Schema additions are highlighted in green, and deletions are highlighted in red.
3. (_Optional_) You can also run the command below to see the [schema diff in the PlanetScale CLI](/docs/reference/deploy-request):

```bash
pscale deploy-request diff <DATABASE> <DEPLOY_REQUEST_NUMBER>
```

Another benefit of the deploy request review process is that **PlanetScale will determine if certain requests aren't deployable**. For example, if you try to deploy a branch with no unique key, PlanetScale will block the deployment, as the unique key is required.

### 3. Add changes to the deploy queue

Once a deploy request has been created and, optionally, approved, you need to add the changes to the deploy queue.

Schema changes are deployed to a database in the order in which they are received. PlanetScale analyzes the schema changes in a deploy request when they are added to the deploy queue to ensure that the changes do not conflict with any of the queued schema changes.

PlanetScale also provides insight on the deploy queue, listing all of the schema changes in the queue with their completion status.

1. Organizations have the option to require approval before a deploy request can be added to the queue. If this is enabled, first make sure the request is approved. You can control this option in the database's "**Settings**" tab.
2. To add a deploy request to the deploy queue, click “**Add changes to the deploy queue**” on the deploy request page.
3. (_Optional_) You can also run the following command with the [PlanetScale CLI](/docs/reference/deploy-request):

```bash
pscale deploy-request deploy <DATABASE_NAME> <DEPLOY_REQUEST_NUMBER>
```

4. If successful, you'll get the message "These changes have been deployed".
5. Your deploy request has now been merged into production. You can click on the "Deploy requests" tab of the database to see the list of previous deploys.

## Default branches

The first database branch that gets promoted to production is automatically set as the default branch for your database. Once you have a production branch, you must always have a default branch.

**How to change the default branch**:

1. Go to your database overview page and click the "**Settings**" tab.
2. Under "**General**" in the sidebar, you'll find the "**Default branch**" dropdown.
3. Select the branch you want to be the default branch. It does not have to be a production branch.
4. Scroll down and click "**Save database settings**".

## Delete a branch

You can delete a branch from the Branches overview page or by running the following command in the [PlanetScale CLI](/docs/reference/branch):

```bash
pscale branch delete <DATABASE_NAME> <BRANCH_NAME>
```

We recommend deleting branches after a deploy request is complete or if you are no longer using the branch for testing.

{% callout %}
Only [Organization Administrators](/docs/concepts/access-control#organization-administrator) have permission to delete
production branches.
{% /callout %}

You cannot delete a branch that's [set as default](#default-branches). To delete, it set another branch as the default first.

## Resolve a schema conflict

Schema conflicts occur when your development branch has conflicting changes with the production branch.

To resolve a schema conflict, create a new branch from production, which will have the most up-to-date schema, and apply the necessary schema changes to the new branch before repeating the deploy process.

## Automatically copy migration data

Many frameworks and migration tools keep track of data schema changes in a migration table. When turned on, PlanetScale will automatically copy migration table metadata from your development branches to the production branch as part of our deployment process.

**Turn on automatic copying of migration data**:

1. On your database overview page, click the "**Settings**" tab.
2. Check the "**Automatically copy migration data**" box.
3. Select one of the listed frameworks: Rails, Phoenix, Laravel, Django, .NET, Sequelize, or Other, which allows you to specify a custom table name.

You can see how this works in this [Rails migration tutorial](/docs/tutorials/automatic-rails-migrations).

{% callout title="Next steps" %}

- [Non-blocking schema changes](/docs/concepts/nonblocking-schema-changes)
- [Regions](/docs/concepts/regions)

{% /callout %}
