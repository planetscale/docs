---
title: 'What are workflows?'
subtitle: 'Learn how to use PlanetScale workflows to run different sequences to move data between keyspaces.'
label: 'Beta feature'
date: '2024-11-07'
---

PlanetScale workflows (currently in beta) provide pre-defined recipes that make it simple to run operations on your databases. There is currently only one workflow available &mdash; [moving tables from an unsharded to a sharded keyspace](/docs/sharding/sharding-quickstart), but we will continue to add more workflow options in the near future.

If you are familiar with [Vitess Workflows](https://vitess.io/docsreference/vreplication/workflow/), you will see some similarities. For example, the PlanetScale workflow that allows you to move tables from an unsharded to a sharded keyspace is similar to the [Vitess `MoveTables` workflow](https://vitess.io/docs/user-guides/migration/move-tables/).

## Create a workflow

To create a new workflow, select your database, and click "Workflows" in the left nav. Next, click "New workflow". Because we currently only have one available workflow, this will drop you straight into the page to create a new workflow to move tables from an unsharded to sharded keyspace. In the future, you will have the option to choose other workflows.

## View workflow history

To view the history of all completed or pending workflows, click on "Workflows" in the left nav. From here, you can see all previous workflows along with information such as status, duration, and the time it took to complete.
