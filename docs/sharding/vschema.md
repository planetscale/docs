---
title: 'VSchema'
subtitle: 'Learn how to view and modify the VSchema of your keyspaces using the PlanetScale app.'
date: '2024-09-20'
---

## VSchema overview

PlanetScale databases are powered by Vitess.
Each Vitess cluster can have one or more [keyspaces](https://vitess.io/docs/concepts/keyspace/).
For unsharded databases, there is a 1:1 relationship between a keyspace and a database within MySQL.
For sharded databases, a single keyspace can map to multiple MySQL databases under the hood.

Each keyspace in your PlanetScale database has an associated [VSchema](https://vitess.io/docs/reference/features/vschema/).
The VSchema contains information about how the keyspace is sharded, sequence tables, and other Vitess schema information.

## Viewing VSchema

In order to view your VSchema, first go to the "Branches" tab in the PlanetScale app.

![PlanetScale app tab bar](/assets/docs/enterprise/tabs.png)

Click on the branch you would like to view the VSchema for.
Then, select the keyspace and expand out the "Configuration Files" drop-down.

![PlanetScale keyspace selection and configuration files drop down](/assets/docs/enterprise/keyspace.png)

From here, you can inspect your VSchema configuration JSON file.

![VSchema JSON view](/assets/docs/enterprise/vschema.png)

## Modifying VSchema

You must have a sharded keyspace in order to make VSchema changes.

If you have a database with at least one sharded keyspace, you can modify its VSchema either in the [Cluster configuration](/docs/concepts/cluster-configuration) tab in the dashboard, from the [pscale CLI](/docs/reference/keyspace), or using `ALTER VSCHEMA ...` commands.

### Using the Cluster configuration page

We do not recommend modifying the VSchema directly on your production branch. In fact, it is not possible to do if you have [safe migrations](/docs/concepts/safe-migrations) enabled (as recommended). Instead, to modify the VSchema, you should first [create a new development branch](/docs/concepts/branching). Once you have your branch ready, follow these steps:

1. To update in the cluster configuration panel, select your new development branch from the dropdown at the top, and then select the keyspace below that has the VSchema you'd like to modify.
2. Next, click the tab labeled "VSchema".
3. Modify the VSchema configuration JSON file as needed. Refer to the [VSchema documentation](/docs/sharding/vschema) for more information about the available options.
4. When finished, click "Save changes". We will validate your VSchema, and if it is valid, the changes will be saved. If there are errors, we will warn you here to change them before saving.
5. Go back to your "Branches" tab and click on the development branch that you modified. You should see a note on the right that says "Updated VSchema configuration" which lets you know the VSchema(s) for this branch has been modified.
6. From here, go through the normal [deploy request process](/docs/concepts/deploy-requests) to deploy this change to production.

Once your change is deployed to production, you can come back to the cluster configuration page, switch to your production branch, and view the updates to your VSchema. You can also click the "Changes" tab to see information, such as the resize event, status, and start/end time for any previous changes to the VSchema.

### Using `ALTER VSchema`

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
