---
title: 'Safe migrations'
subtitle: 'Add schema protection and zero-downtime migrations to your production branches.'
date: '2023-04-05'
---

Safe migrations is an optional but highly recommended feature for production branches in PlanetScale. With safe migrations enabled on a branch, you’ll gain a number of additional protections on a branch to enable.

## Zero-downtime schema migrations

Safe migrations enables the [PlanetScale workflow](/docs/concepts/planetscale-workflow) on a given production branch and provides your team the ability to create deploy requests to merge schema changes into that branch. When changes are merged using deploy requests, a ghost table will be created with the desired schema changes. Your data will be continuously synchronized with that table until you decide to promote it to production.

## Schema revert

Safe migrations and deploy requests provide the option to quickly [revert schema changes](/docs/concepts/deploy-requests#revert-a-schema-change) if you discover that they are not compatible with your application. With schema revert enabled for a database, the old production table is retained. You’re provided a 30-minute window where data will still be synchronized as writes occur on the new production table. If you decide to revert your changes, the status of the two tables is flipped, bringing the former production table back into production.

## Protection against accidental schema changes

To prevent accidental changes to the database schema which may cause downtime, safe migrations enforces the use of [branching](/docs/concepts/branching) and [deploy requests](/docs/concepts/deploy-requests). This requires that changes be made safely and allows all team members to check and comment on schema changes before they are applied.

With safe migrations enabled, Data Definition Language (DDL) statements issued to production branches with safe migrations enabled will automatically be rejected by PlanetScale. Any `CREATE`, `ALTER`, or `DELETE` commands, whether sent using the PlanetScale built-in console, terminal, or MySQL GUI, will fail when we receive it.

## How to enable safe migrations

Safe migrations can be enabled using the PlanetScale dashboard or the pscale CLI. Before you can enable safe migrations, make sure your branch has been promoted to a production branch.

### Using the PlanetScale dashboard

To enable safe migrations on a production branch using the PlanetScale dashboard, click the **”cog”** in the upper right of the infrastructure card on the Overview tab of the database.

![The production branch UI card.](/assets/docs/concepts/safe-migrations/production-branch-card-with-sm-disabled.png?v2)

In the modal, toggle the option labeled **”Enable safe migrations”**, then click the **”Enable safe migrations"** button to save and close the modal.

![Enable safe migrations.](/assets/docs/concepts/safe-migrations/prod-branch-options-modal.png)

The UI card will reflect the status of the safe migrations for that branch.

![Branch UI card with safe migrations enabled.](/assets/docs/concepts/safe-migrations/production-branch-card-with-sm-enabled.png?v2)

### Using the pscale CLI

To enable safe migrations on a production branch using the pscale CLI, use the following command in your terminal:

```bash
pscale branch safe-migrations enable <DATABASE_NAME> <BRANCH_NAME>
```

## How to disable safe migrations

There are two ways to disable safe migrations: in the PlanetScale dashboard and using the CLI.

### Using the PlanetScale dashboard

To disable safe migrations using the PlanetScale dashboard, click the **”cog”** in the upper right of the infrastructure card on the Overview tab of the database.

![Branch UI with enabled with cog highlighted.](/assets/docs/concepts/safe-migrations/prod-card-cog.png?v2)

In the modal, toggle the option labeled **”Enable safe migrations”,** then click the **”Disable safe migrations"** button to save and close the modal. It’s also worth noting that toggling the **”Production branch”** option and saving will also disable safe migrations, as the feature is only permitted on production branches.

![Modal with Disable safe migrations.](/assets/docs/concepts/safe-migrations/disable-sm.png)

The UI card will reflect the status of the safe migrations for that branch.

### Using the pscale CLI

To disable safe migrations on a production branch using the pscale CLI, use the following command in your terminal:

```bash
pscale branch safe-migrations disable <DATABASE_NAME> <BRANCH_NAME>
```
