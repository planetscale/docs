---
title: 'VSchema'
subtitle: 'Learn how to view and modify the VSchema of your keyspaces using the PlanetScale app.'
label: 'Enterprise'
date: '2024-08-29'
---

{% callout %}
This feature is only available on our [Enterprise plan](/docs/concepts/planetscale-plans#planetscale-enterprise-plan). If you'd like more information about how we can help you shard your MySQL database, [get in touch](/contact).
{% /callout %}

## VSchema overview

PlanetScale databases are powered by Vitess.
Each Vitess cluster can have one or more [keyspaces](https://vitess.io/docs/concepts/keyspace/).
For unsharded databases, there is a 1:1 relationship between a keyspace and a database within MySQL.
For sharded databases, a single keyspace can map to multiple MySQL databases under the hood.

Each keyspace in your PlanetScale database has an associated [VSchema](https://vitess.io/docs/reference/features/vschema/).
The VSchema contains information about how the keyspace is sharded, sequence tables, and other Vitess schema information.

## Viewing VSChema

In order to view your VSchema, first go to the "Branches" tab in the PlanetScale app.

![PlanetScale app tab bar](/assets/docs/enterprise/tabs.png)

Click on the branch you would like to view the VSchema for.
Then, select the keyspace and expand out the "Configuration Files" drop-down.

![PlanetScale keyspace selection and configuration files drop down](/assets/docs/enterprise/keyspace.png)

From here, you can inspect your VSchema configuration JSON file.

![VSchema JSON view](/assets/docs/enterprise/vschema.png)

## Modifying VSchema

You must have a sharded keyspace in order to make VSchema changes.
At this time, sharded keyspaces can only be set up by reaching out to PlanetScale support.

If you have a database with at least one sharded keyspace, you can modify its VSchema using `ALTER VSCHEMA ...` commands.
PlanetScale recommends making all such modifications in a development branch.
When ready, you can make a deploy request to get the changes into production.
Consider the following database with two keyspaces.

![Sharded keyspace](/assets/docs/enterprise/sharded-keyspace.png)

`sharded` is a sharded keyspace with two shards and `tweeter` is unsharded.
Also note that safe migrations are enabled.
In order to make a VSchema change for the production branch in this configuration, we first must create a new branch.
We'll call it `add-tweets`

![New branch](/assets/docs/enterprise/new-branch.png)

On this branch you can make your VSchema and schema changes.
In this case, we'll create a new table called `tweets` in the sharded keyspace and also update the VSchema.

![Create the tweets table](/assets/docs/enterprise/tweets-table.png)

We will also create a sequence table in the unsharded keyspace, and update the VSchema accordingly:

![Create the sequence table](/assets/docs/enterprise/sequence-table.png)

We have now made updates both to our Vitess VSchema and MySQL schema.
To get these changes into production, navigate to the "Branches" page and select the `add-tweets` branch.
Here, you will be presented with a diff of both the VSchema and schema changes:

![Schema diff](/assets/docs/enterprise/schema-diff.png)

Click "Create deploy request."
The deploy request should indicate that it is going to apply both VSchema and Schema changes:

![Deploy request](/assets/docs/enterprise/deploy-request.png)

Click "Deploy changes."
Once complete, the Vschema and schema changes will be applied to your production branch.

{% callout type="warning" %}
You can only use `ALTER VSCHEMA ...` commands in branches that have at least one sharded keyspace.
If you do not, you will get an error message when attempting to execute `ALTER VSCHEMA ...`.
{% /callout %}
