---
title: 'Branching'
subtitle: 'Create a development or staging environment for your database through branches.'
date: '2024-02-15'
---

## Overview

PlanetScale allows you to branch database schemas the same way you branch your code.

## What are branches on PlanetScale

Database branches on PlanetScale are isolated database instances that give you flexibility when developing your application. When your database is first initialized, a single production branch is created called `main` and acts as the default branch. When you create additional branches, the schema of the source branch is copied to the new branch, giving you an isolated MySQL instance to develop with. Changes made in one branch, whether to the schema or the data, do not affect any other branches for a given database.

## Development and production branches

PlanetScale provides two types of database branches:

- **Development branches** — Development branches provide isolated copies of your production database schema where you can make changes, experiment, or run CI. Please note that only the schema is copied. A new development branch will not have any data stored in it unless you [restore from a backup](/docs/concepts/back-up-and-restore#restore-from-a-backup). To automatically create a development branch with data from another branch, see the [Data Branching® feature](/docs/concepts/data-branching).

- **Production branches** — Production branches are highly available databases intended for production traffic. They are automatically provided with an additional [replica](/docs/concepts/replicas) to resist outages, enabling zero-downtime failovers. Scaler Pro plans include two additional replicas, and Enterprise plans are customizable.

Both types of branches also offer [safe migrations](#safe-migrations) as an optional feature, which helps protect the branch from accidental schema changes and enables non-blocking schema migrations. We highly recommend that all production database branches have the safe migrations setting turned on.

If you want to set up a workflow with a ”staging” branch, see more the [staging branch documentation](#staging-branch) below.

## Promote a branch to production

PlanetScale provides the ability to **promote any development branch with a valid schema to production**. Promoting a branch to production will automatically set up the database replica(s) to make your database highly available. Note: Only one production branch is included in Scaler Pro plans, but you can add more production branches for an additional fee.

### Promote a development branch to production

Every new PlanetScale database is created with a production branch named `main`. This branch is intended as the starting point for building your database on PlanetScale and has increased performance and resilience by default when compared to development branches.

That said, you don't have to use the default `main` branch as your production branch. **Any development branch can be promoted to production**.

Once you are satisfied with the changes you've made to a given development branch, you can promote it to production. Going forward, you can continue to make new development branches off of this production branch to experiment with changes as needed.

A branch can be promoted from the branch overview page in the PlanetScale app or by using the [PlanetScale CLI](/docs/reference/branch), as shown below:

```bash
pscale branch promote <DATABASE_NAME> <BRANCH_NAME>
```

It's possible to run multiple production branches simultaneously, within [your plan's limits](/docs/concepts/billing#planetscale-plans). Keep in mind, PlanetScale does not provide data syncing between production branches.

### Demote a production branch to development

Sometimes, you might need to demote a production branch to a development branch. This can be done from the production branch's overview page in the PlanetScale app (located in the right column of the page).

Be aware when demoting a production branch to a development branch:

- Development branches are not meant to be used with production workloads
- The branch will no longer have high-availability features
- Existing scheduled production branch backup policies will no longer run
- Any read-only regions will need to be removed

If you are on an Enterprise plan, only an administrator for your organization can request to demote a branch, and the demotion request will need to be approved by another administrator. Once the first administrator requests to demote a production branch, the second administrator can approve the demotion on the production branch's overview page. You will see the request from the first administrator and a **Demote to development branch** button to complete the demotion.

## Create a development branch

If you need to experiment with schema changes, you can create a new development branch. This will copy the schema from the base branch into a new branch where you can create and test your changes.

Development branches **will not** copy over data, just the schema. To create a development branch with data from another branch, see the [Data Branching® feature](/docs/concepts/data-branching) section.

**How to create a development branch**:

1. On the database dashboard page, click the "**New branch**" button.
2. Give your development branch a name and select the region closest to your or your application.
3. Select the base branch you want to branch off of.
4. Click "**Create branch**".
5. (_Optional_) You can also create a new branch from the [PlanetScale CLI](/docs/reference/branch) with:

```bash
pscale branch create <DATABASE_NAME> <BRANCH_NAME>
```

## Safe migrations

[Safe migrations](/docs/concepts/safe-migrations) is an optional, but recommended, feature that can be enabled on branches. Branches with safe migrations enabled are restricted from accepting DDL directly. This prevents accidental changes to the database schema, and also enables non-blocking schema migrations. To make changes to branches with safe migrations enabled, you must create a new branch, then merge changes using a [deploy request](/docs/concepts/deploy-requests). Using this method, you get to see a schema diff before merging changes, have the option to have your team review changes, and receive [additional checks and warnings](/blog/deploy-requests-now-alert-on-potential-unwanted-changes) prior to making a production schema change.

To enable safe migrations on a branch, select the branch you want to modify from the branch dropdown and click the **”cog”** in the upper right of the infrastructure card on the ”**Dashboard**” tab of the database. In the modal, toggle the option labeled **”Enable safe migrations”**, then click the **”Enable safe migrations”** button to save and close the modal.

### Staging branches

You can use a development branch with safe migrations enabled to set up a workflow with a “staging” branch. First, make sure you have safe migration enabled for your main production branch. Then, create a “staging” branch with your main production branch as the base and turn on safe migrations. All new branches created for development can use this “staging” branch as the base branch.

You can then open a deploy request against either the main production or “staging” branch. Once it is deployed to “staging,” you can open a deploy request against the main production branch. The main production branch must be set as the [default branch](/docs/concepts/branching#default-branches) to open a deploy request against it.

{% callout type="note" %}In this setup, the “staging” branch is still a development branch. Compared to your main production branch (additional production branches are an additional cost), it will have reduced resources, similar to other development branches.{% /callout %}

![View of the Branches tab with main <- staging <- dev branches](/assets/docs/concepts/branching/branches-with-staging-branch.jpg)

## How to make schema changes on a branch with safe migrations enabled

Since DDL is restricted on branches with safe migrations enabled to prevent accidental changes and enable zero-downtime migrations, you'll need to perform the following steps in order to make changes to a safe migrations enabled branch:

![PlanetScale Branching Flow Diagram](/assets/docs/concepts/branching/diagram.png)

{% callout type="tip" %} You'll see a `ERROR 1105 (HY000): direct DDL is disabled` message if you attempt to make schema changes in a branch with safe migrations enabled. Instead, create a development branch, and make your changes there. {% /callout %}

### 1. Create a development branch

The first step is to create a new development branch off of the branch you want to make changes to. This will make a copy of the source branches schema into the newly created development branch where you can perform the necessary changes to the schema.

### 2. Create a deploy request

If you are working in a team, the [deploy request](/docs/concepts/deploy-requests) creates an opportunity for your teammates to review the changes you have made before they are deployed to production.

1. To create the deploy request, go to the branch overview page for the branch you want to deploy.
2. Select the base branch you want to deploy to from the "**Deploy to**" dropdown.
3. (_Optional_) Add a comment describing your deploy request. . Click "**Create deploy request**".

![PlanetScale deploy request example](/assets/docs/concepts/branching/deploy-request-page.png)

6. (_Optional_) You can also create a deploy request from the [PlanetScale CLI](/docs/reference/deploy-request) with the following command:

```bash
pscale deploy-request create <DATABASE_NAME> <BRANCH_NAME>
```

### 3. Review the deploy request

The deploy request includes a schema diff so that you can review the schema changes introduced by the deploy request against the base branch.

1. On the deploy request page, click the "**Schema changes**" tab.
2. Schema additions are highlighted in green, and deletions are highlighted in red.
3. (_Optional_) You can also run the command below to see the [schema diff in the PlanetScale CLI](/docs/reference/deploy-request):

```bash
pscale deploy-request diff <DATABASE> <DEPLOY_REQUEST_NUMBER>
```

Another benefit of the deploy request review process is that **PlanetScale will determine if certain requests aren't deployable**. For example, if you try to deploy a branch with no unique key, PlanetScale will block the deployment, as the unique key is required.

### 4. Add changes to the deploy queue

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

The `main` branch is automatically set as the default branch when the database is initialized. However, you can change the default branch if needed.

**How to change the default branch**:

1. Go to your database dashboard page and click the "**Settings**" tab.
2. Under "**General**" in the sidebar, you'll find the "**Default branch**" dropdown.
3. Select the branch you want to be the default branch. It does not have to be a production branch.
4. Scroll down and click "**Save database settings**".

## Delete a branch

You can delete a branch from the Branches overview page or by running the following command in the [PlanetScale CLI](/docs/reference/branch):

```bash
pscale branch delete <DATABASE_NAME> <BRANCH_NAME>
```

We recommend deleting branches after a deploy request is complete or if you are no longer using the branch for testing. Scaler Pro development branches are billed only for the time that they are used to the nearest second, so it beneficial to delete them when they are no longer in use. See the [billing documentation](/docs/concepts/planetscale-plans#development-branches) for more info.

{% callout %}
Only [Organization Administrators](/docs/concepts/access-control#organization-administrator) have permission to delete production branches.
{% /callout %}

You cannot delete a branch that's [set as default](#default-branches). To delete, it set another branch as the default first.

## Resolve a schema conflict

Schema conflicts occur when your branch has conflicting changes with the base branch.

To resolve a schema conflict, create a new branch from the base branch, which will have the most up-to-date schema, and apply the necessary schema changes to the new branch before repeating the deploy process.

## Automatically copy migration data

Many frameworks and migration tools keep track of data schema changes in a migration table. When turned on, PlanetScale will automatically copy migration table metadata from your development branches to the production branch as part of our deployment process.

**Turn on automatic copying of migration data**:

1. On your database dashboard page, click the "**Settings**" tab.
2. Check the "**Automatically copy migration data**" box.
3. Select one of the listed frameworks: Rails, Phoenix, Laravel, Django, .NET, Sequelize, or Other, which allows you to specify a custom table name.

You can see how this works in this [Rails migration tutorial](/docs/tutorials/automatic-rails-migrations).

{% callout title="Next steps" %}

- [Non-blocking schema changes](/docs/concepts/nonblocking-schema-changes)
- [Regions](/docs/concepts/regions)

{% /callout %}
