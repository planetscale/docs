---
title: 'Cluster configuration'
subtitle: 'Create and manage sharded and unsharded keyspaces for your database.'
date: '2024-09-20'
---

{% callout type="warning" %}
Misconfiguration can cause availability issues. We recommend thoroughly reading through the documentation in the [Sharding section](/docs/sharding/overview) of the docs prior to making any changes. If you have any questions, please [reach out to our support team](https://support.planetscale.com).
{% /callout %}

## Overview

The **Cluster configuration** tab in your PlanetScale dashboard allows you to create and manage sharded and unsharded keyspaces.

From here, you can:

- Create a sharded or unsharded keyspace
- Adjust the instance sizes for keyspaces
- Adjust the number of replicas for keyspaces
- Adjust the VSchema

These are advanced configuration settings that expose some of the underlying Vitess configuration of your cluster.

This documentation will cover how to use everything in this cluster configuration page. For a full walkthrough with an example of setting up a sharded keyspace, refer to the [Sharding quickstart](/docs/sharding/sharding-quickstart).

## Limitations

Before you adjust any cluster configuration settings, it is important that you read through the following limitations:

- This feature can currently only be used to shard **new** tables.
- If you are an existing PlanetScale customer with already sharded tables, you can use the Cluster configuration settings to adjust the instance size, number of replicas, and VSchema for **already sharded tables**.
- Sharded keyspaces are not currently supported on databases that have foreign key constraints enabled.

If you have existing tables that need sharding, or if you would like additional support from our expert team, our [Enterprise plan](/docs/concepts/planetscale-plans#planetscale-enterprise-plan) may be a good fit. [Get in touch](/contact) for a quick assessment.

## Create a keyspace

To create a new [keyspace](/docs/sharding/keyspaces):

1. Select the database you want to configure.
2. Click "Cluster configuration" in the left nav.
3. You should see the existing unsharded keyspace for your database here.
4. Click "New keyspace".
5. Enter the keyspace name. For example, if your existing unsharded keyspace is named `books`, you may create a sharded keyspace named `books-sharded`.
6. Select whether you want to keep it unsharded, or, if not, select the number of shards you to exist in this keyspace. In most cases, you will be adding a new sharded keyspace. Adding a new unsharded keyspace is not a common use case.

**Note**: The cost of adding this additional keyspace largely depends on the number of shards you choose, the cluster size, and if you'd like to add additional replicas.

7. Choose the cluster sizes you would like to use for this keyspace. Keep in mind, if you are creating a sharded keyspace, this will spin up multiple clusters of the selected size. For example, if you are creating 4 shards and choose the `PS-80` cluster size, we will create 4 `PS-80`s, each with 1 primary and 2 replicas.
8. Select the number of _additional_ replicas, if any, that you'd like to add to each cluster. Each cluster comes with 2 replicas by default, so any number you choose will be in addition to those 2.
9. Review the new monthly cost for this keyspace below. This is in addition to your existing unsharded keyspace, as well as any other keyspaces you add.
10. Once satisfied, click "Create keyspace".

## Modify the VSchema of a keyspace via cluster configuration tab

**Note**: You can modify the VSchema on your development branch either in the cluster configuration tab, using the [`ALTER VSCHEMA` command](/docs/sharding/vschema#modifying-vschema), or with the pscale CLI using [`pscale keyspace vschema update`](/docs/reference/keyspace).

Once you have created your keyspace, you will see a new tab: **VSchema**. The VSchema contains information about how the keyspace is sharded, sequence tables, and other Vitess schema information. The VSchema tab allows you to configure the Vschema for your new keyspace or modify it for existing keyspaces.

We do not recommend modifying the VSchema directly on your production branch. In fact, it is not possible to do if you have [safe migrations](/docs/concepts/safe-migrations) enabled (as recommended). Instead, to modify the VSchema, you should first [create a new development branch](/docs/concepts/branching). Once you have your branch ready, follow these steps:

1. To update the VSchema in the cluster configuration panel, select your new development branch from the dropdown at the top, and then select the keyspace below that has the VSchema you'd like to modify.
2. Next, click the tab labeled "VSchema".
3. Modify the VSchema configuration JSON file as needed. Refer to the [VSchema documentation](/docs/sharding/vschema) for more information about the available options.
4. When finished, click "Save changes". We will validate your VSchema, and if it is valid, the changes will be saved. If there are errors, we will warn you here to change them before saving.
5. Go back to your "Branches" tab and click on the development branch that you modified. You should see a note on the right that says "Updated VSchema configuration" which lets you know the VSchema(s) for this branch has been modified.
6. From here, go through the normal [deploy request process](/docs/concepts/deploy-requests) to deploy this change to production.

Once your change is deployed to production, you can come back to the cluster configuration page, switch to your production branch, and view the updates to your VSchema. You can also click the "Changes" tab to see information, such as the resize event, status, and start/end time for any previous changes to the VSchema.

## Modify routing rules

This configuration setting is currently only available for some Enterprise customers. To modify your routing rules, click "Manage routing rules" on the bottom left of the keyspace configuration panel.

Again, you will need to create a new branch to modify routing rules, as described in the "Modify the VSchema of a keyspace" section above.
