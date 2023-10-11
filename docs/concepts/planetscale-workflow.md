---
title: 'The PlanetScale workflow'
subtitle: 'Use the PlanetScale workflow for branching databases, non-blocking schema changes and more.'
date: '2023-04-05'
---

![Diagram showing PlanetScale workflow {priority}](/assets/docs/planetscale-workflow.png)

## Serverless databases

PlanetScale databases are designed for developers and developer workflows. Deploy a fully managed database with the reliability of MySQL (our databases run on MySQL 8.0) and the scale of open source Vitess in just ten seconds.

Deploy, branch, and query your database directly from the UI, or download our [CLI](https://github.com/planetscale/cli#installation) and run commands there.

Built-in connection pooling means you’ll never run into connection limits for your database.

## PlanetScale branching

The PlanetScale branching feature allows you to treat your databases like code by creating a branch of your production database schema to serve as an isolated development environment.

PlanetScale provides two types of database branches: **development** and **production**.

Development branches provide isolated copies of your database schema where you can make changes, experiment, or run CI against. Instantly branch your production database to create a staging environment for testing out your schema changes.

Production branches are highly available databases intended for production traffic. They include an additional replica for high availability and are automatically backed up daily.

Production branches can also have [safe migrations](/docs/concepts/safe-migrations) turned on which enables zero-downtime schema migrations, protects against accidental schema changes, and enables better team collaboration through [deploy requests](/docs/concepts/deploy-requests).

We also offer a [Data Branching®](/docs/concepts/data-branching) feature, which allows you to create an isolated replica of your database for development that includes both the schema **and** data.

Learn more about [database branching](/docs/concepts/branching).

## Non-blocking schema changes

PlanetScale makes it safe to deploy schema changes to production and easy to automate schema management as a part of your CI/CD process. Schema changes to production branches with safe migrations enabled are applied online and protect against changes that block databases, lock individual tables, or slow down production during the migration.

Use a development branch to apply schema changes and view the schema diff in the UI or the CLI. Once you’re satisfied with your schema changes, you can open a deploy request.

Learn more about [non-blocking schema changes](/docs/concepts/nonblocking-schema-changes).

## Deploy requests

{% callout %}
Your database must have a production branch with [safe migrations](/docs/concepts/safe-migrations) enabled before you can create a deploy request.
{% /callout %}

[Deploy requests](/docs/concepts/deploy-requests) allow you to propose schema changes and get feedback from your team. The deploy requests display DDL statements (`CREATE`, `ALTER`, and `DROP`) for each table changed, with a line-by-line schema diff, making it easy to review the changes.

For example, you can pair deploy requests with GitHub pull requests so that your teammates can review the code and the schema changes in parallel.

PlanetScale also analyzes your schema changes for conflicts when you open a deploy request. It checks against the production schema at the time the branch was created and against the current production schema which may have changed in the interim. This ensures your changes can be deployed safely without impacting production.

## Deploy a schema change

Once a deploy request has been approved, it gets added to the deploy queue. Schema changes are applied to your production database branch in the order in which they are added to the deploy queue.

As a part of the process of adding the schema changes to the deploy queue, PlanetScale analyzes the schema changes in the deploy requests ahead of your deploy request for any potential conflicts. If a conflict exists, your deploy request is rejected from the queue, and you are immediately notified of the conflict. This means you’ll never wait for your schema change to deploy only to learn that there’s an unanticipated conflict. This is especially useful if long running schema changes are being applied.

## Revert a schema change

If you ever deploy a schema change, only to realize you need to undo it, PlanetScale can handle that. With our [schema revert feature](/docs/concepts/deploy-requests#revert-a-schema-change), you have 30 minutes to "undo" a schema change deployment. Simply click the "Revert changes" button on the affected deploy request page and your production database will instantly revert back to the previous schema. Additionally, any data that was added to your production database in the time between deployment and reverting will be retained. Learn more about this process in our [Revert a schema change section](/docs/concepts/deploy-requests#revert-a-schema-change) of our deploy requests documentation.
