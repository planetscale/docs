---
title: 'Workflow: Unsharded to sharded keyspace'
subtitle: 'A complete walkthrough for how to create a sharded keyspace and how to set up your Vindexes and VSchema'
label: 'Beta feature'
date: '2024-11-07'
---

This tutorial covers how to shard **existing tables** in your PlanetScale database. This is done using the unsharded to sharded keyspace [workflow](/docs/concepts/workflows). If you are creating a new table that you want in a sharded keyspace, follow the instructions in the [Sharding new tables doc](/docs/sharding/sharding-new-tables).

Before you begin, we recommend the following reading:

- [Workflows overview](/docs/concepts/workflows)
- [What is a keyspace?](/docs/sharding/overview)
- [Vindexes](/docs/sharding/vindexes)
- [Avoiding cross-shard queries](/docs/sharding/avoiding-cross-shard-queries)

{% callout type="note" %}
Sharded keyspaces are not supported on databases with foreign key constraints enabled.
{% /callout %}

{% callout type="warning" %}
These are advanced configuration settings that expose some of the underlying Vitess configuration of your cluster.
Misconfiguration can cause availability issues. We recommend thoroughly reading through the documentation in the [Sharding section](/docs/sharding/overview) of the docs prior to making any changes. If you have any questions, please [reach out to our support team](https://support.planetscale.com).
{% /callout %}

Throughout this guide, we will refer to the source keyspace and target keyspace, which are defined as follows:

- **Source keyspace** &mdash; The original unsharded keyspace from which you are moving the tables you wish to shard.
- **Target keyspace** &mdash; The new sharded keyspace that you are moving the selected tables to.

If you prefer video content, you can watch the video on sharding tables with PlanetScale here:

{% youtube title="Tutorial: Horizontal sharding with PlanetScale" url="https://www.youtube.com/watch?v=m5eW34nfNtQ" /%}

## Pre-sharding checklist

There is a small amount of upfront work that needs to happen prior to sharding your table(s).
Planetscale handles some of these steps for you automatically.
How many steps get automatically handled depends on the Vitess version that is powering your database.
Which vitess version you are on depends on how long your database has existed and what features you have enabled.
If you're curious, see the
For a full list of steps, see the [pre-sharding checklist](/docs/sharding/pre-sharding-checklist).

The rest of the work that you need to do yourself is documented below.

### 1. Decide which table(s) you want to shard

First and foremost, decide which table(s) you want to shard. Some common signals that a table may benefit from sharding include:

- The table has become very large (>100 GB) and query performance has degraded due to this
- Schema changes to the table take several minutes or hours
- You expect the table to grow quickly and want to shard it before it becomes a problem

### 2. Identify tables you frequently `JOIN`

Once you know the tables that you are going to move to a sharded keyspace, you also need to think about which other tables you frequently join with the tables you are going to shard. We recommend that tables you frequently join together all live in the same keyspace.

As an example, if you have a `exercise_logs` table that has become extremely large and continues to grow, you may decide to move this to a sharded keyspace. Perhaps this table is frequently joined it with the `users` table. In this scenario, we recommend moving both the `exercise_logs` and `users` tables to the new sharded keyspace and sharding both tables.

The goal here is to avoid cross-keyspace or cross-shard queries. For more information about this, see the [Avoiding cross-shard queries](/docs/sharding/avoiding-cross-shard-queries) documentation.

### 3. Create a sharded keyspace

Next, you need to set up the sharded keyspace.

1. Go to the "**Cluster configuration**" tab in the left nav in the PlanetScale dashboard.
2. Click "**New keyspace**".
3. Enter the keyspace name (for example, `metal-sharded`).
4. Select the **shard count** and choose the **cluster size** for this keyspace. Keep in mind, creating a sharded keyspace will use the selected size for _each_ shard. For example, if you are creating 4 shards and choose the `PS-80` cluster size, we will create 4 `PS-80`s, each with 1 primary and 2 replicas.
5. Select the number of _additional_ replicas, if any, that you'd like to add to each cluster. Each cluster comes with 2 replicas by default, so any number you choose will be in addition to those 2.
6. Review the new monthly cost for this keyspace below. This is in addition to your existing unsharded keyspace, as well as any other keyspaces you add.
7. Once satisfied, click "**Create keyspace**".

### 4. Choose your Vindexes

When configuring a sharded keyspace, you must think about _how_ to distribute the data across shards. This is done by selecting a [Vindex](/docs/sharding/vindexes) (Vitess index) for each table.

A Vindex provides a way to map incoming rows of data to the appropriate shard in your keyspace. Similar to how every MySQL table must have a primary key, every sharded table must additionally have a **primary Vindex**.

The primary Vindex is the Vindex that determines which shard each row of data will reside on. For more information about choosing a Vindex, see the [Vindexes documentation](/docs/sharding/vindexes). You can also see an example in the [Avoiding cross-shard queries](/docs/sharding/avoiding-cross-shard-queries) documentation.

To specify the vindex for the tables you want to shard:

1. Create a new branch.
2. Once on your new branch, switch to your sharded keyspace. You can do this in the PlanetScale console if preferred by clicking "Console" in the left nav. Continuing the previous example, we'll switch to the new `metal-sharded` keyspace:

```sql
use `metal-sharded`;
```

3. Alter the VSchema (Vitess schema) of the tables you have chosen to shard to add your chosen Vindex. VSchema is provided to Vitess in JSON. We need to update the VSchema of both our keyspaces in order to:

- Let Vitess know that it should use the sequence tables for generating incrementing IDs
- Let Vitess know how incoming rows should be sharded using Vindexes

For example, let's say we are sharding a table called `exercise_logs`, and we determined `user_id` to be the best option. We are also using the predefined [`hash` Vindex function](https://vitess.io/docs/reference/features/vindexes/#predefined-vindexes), which is a common choice.

```sql
ALTER vschema ON exercise_logs add vindex hash(user_id) using hash;
ALTER vschema ON users add vindex hash(id) using hash;
```

### 5. Deploy the changes to production

Once you're finished with these pre-sharding steps, you can go ahead and deploy the changes to production.

1. Click "Branches".
2. Select the branch that has your keyspace updates.
3. Select the sharded keyspace in the dropdown. You should see a diff that shows edits to your VSchema.
4. Click "Create deploy request".
5. If everything looks good, deploy your changes.

If you go back to your Cluster configuration tab, click your sharded keyspace, and click the VSchema tab, you'll see those changes reflected there.

## Sharding with the unsharded to sharded workflow

Alright, now that the prep work is done, it's time to shard the tables you chose to move to your sharded keyspace.

You must have [Safe Migrations](/docs/concepts/safe-migrations) enabled on your production branch to use Workflows. If it's not enabled, go do that first.

### Step 1 &mdash; Set up the workflow

1. Click "**Workflows**" in the left nav.
2. Click "**New workflow**".
3. Give your workflow a name, such as "Shard users and exercise_log".

We are now going to move the tables, data included, from the original keyspace to the sharded one that you created in the pre-sharding checklist.
Make sure the "**Source keyspace**" dropdown shows your original unsharded keyspace and the "**Destination keyspace**" shows the new sharded keyspace you made.

5. Under Source keyspace, check the tables you want to move to the new keyspace to shard. Remember, these should match the ones you already prepped to move earlier.
6. Once you select the tables that you want to move to the sharded keyspace, you'll see the destination keyspace update to show how the data will be replicated across the number of shards you chose for that keyspace during cluster configuration.
7. Click "**Validate**".
8. You will see a validation checklist that lets you know if all of the work from the pre-sharding checklist has been completed. If something is missing, you will not be able to proceed with the workflow. Please revisit the [pre-sharding checklist](/docs/sharding/pre-sharding-checklist) and fix any issues, and don't hesitate to [reach out to support](https://support.planetscale.com) if you get stuck.
9. Once all validations have passed, click "Create workflow" to start the process of moving the sharded tables to the new keyspace.

### Step 2 - Copying phase

As soon as you click "Create workflow", we begin the copying phase. During this phase, Vitess is copying rows of the table(s) you've selected from your source keyspace to your target keyspace. This uses a combination of `SELECT * FROM TABLE` and binlog-based replication.

There are no active steps for you here besides monitoring the logs at the bottom of the screen in case of errors.

### Step 3 - Verify data consistency

Once the initial data has been copied over, you'll see this message:

> The source keyspace is currently serving all traffic. Before switching traffic, we need to verify data consistency across keyspaces.

Click "Verify data" to verify the consistency of data between the keyspaces. This step may take a few minutes. Once it's complete, you should see "Data verified", meaning you can proceed to the next step.

### Step 4 - Running phase

Assuming there were no errors in the previous stage, you will have automatically entered the running phase &mdash; pure binlog-based replication. This also means replication lag was low enough for VReplication to advance into this phase. You should also see `State Changed: running` in the logs below.

During this phase, the following happens:

- Your source keyspace is still serving all primary and replica traffic for the tables you're moving over.
- All existing data that is going to the target keyspace has been copied over.
- VReplication is also replicating all new incoming writes to the tables in the target keyspace.

Again, you should check the logs below to ensure there are no errors and to better understand the ongoing workflow process. There are no active steps to take during this phase. If the logs do not show any errors, you can proceed to the next step.

### Step 5 - Switch traffic to target keyspace

You are now able to switch the traffic over so that traffic to the sharded tables is served from the target keyspace instead of the source keyspace.

You have two options here:

1. Switch both primary and replica traffic.
2. Switch just replica traffic.

If you want to test the replica traffic only first, you can select "**Switch replica traffic only**" from the dropdown, and then click the button. Otherwise, click "**Switch primary and replica traffic**".

### Step 5 - Check traffic in your application

You should now go check out your production application that uses this database to make sure everything is running as expected.

If you selected to only switch replica traffic in the previous step and data that is being served from replicas in your production application looks good, you can click "**Switch primary traffic**" when you're ready. Again, go to your production application to make sure everything is working as expected.

During this phase, you can also go to your "**Insights**" tab in the dashboard to see markers showing where your workflow started and transitioned into different states. If something looks off where you see a marker, it is worth investigating.

You might notice during this phase that you also have the option to "**Undo traffic switch**". So if you do notice an issue once you switched to serve traffic from the target keyspace, you can click this button to revert back to serving traffic from the source keyspace. Remember, both keyspaces have a copy of the same data for the targeted tables, as described in the Running phase above.

### Step 6 - Update your application code to serve from `@primary`

Once you switched to have traffic serve from your target sharded keyspace in step 4, we applied [schema routing rules](https://vitess.io/docs/reference/features/schema-routing-rules/). Routing rules are responsible for routing traffic to the correct keyspace and/or shard.

The configuration code in your application likely says something like `database_name = your_database_name`, where `your_database_name` is your original unsharded keyspace. This was fine when you only had one keyspace, but now that you have multiple keyspaces, your application won't know that the other ones exist with this current configuration. The automatic routing rules we applied during this workflow appropriately point incoming queries from your unsharded keyspace to the sharded keyspace, where necessary.

However, when you complete the cutover in the next step, **we will remove these routing rules**. That means if your application is still configured to explicitly send traffic to your original unsharded keyspace, `database_name = your_database_name`, we will not know how to correctly route the queries that have been moved to the sharded keyspace.

The fix for this is simple: update your application to route traffic to your primary instance. You can do that by setting database name to `@primary`.

For example, in Rails, it would look like this:

```yml
# database.yml
production:
  <<: *default
  username: <%= Rails.application.credentials.planetscale&.fetch(:username) %>
  password: <%= Rails.application.credentials.planetscale&.fetch(:password) %>
  database: "@primary"
  host: <%= Rails.application.credentials.planetscale&.fetch(:host) %>
  ssl_mode: verify_identity
```

You can safely update and deploy this application code before completing the workflow. When you only have one keyspace, `@primary` will automatically route queries to that keyspace. Likewise, if you have queries that you specifically send to replicas or read-only regions, you can use `@replica` for those to have them automatically routed to the correct keyspace/shard.

For more framework-specific examples, see [Targeting the correct keyspace documentation](/docs/sharding/targeting-correct-keyspace).

Once you deploy this code change, double check that everything in your production application is working correctly.

### Step 7 - Complete the workflow

Again, before you proceed with this step, **it is extremely important that you complete step 6**. This requires changes to your application code.

Please note, up until now, you've had the option to click "Cancel workflow" in the top right corner. Once you click "Complete workflow" in this step, there is no going back. You will have the option to reinstate the routing rules if it appears your queries aren't being routed directly, but you cannot swap the tables back to the source keyspace.

Once you have updated your application to use `@primary` and you are sure you want to proceed with this operation, you can click "**Complete workflow**". You also have the option to Reverse the traffic again here if you need more time to test. This will switch you back to serving from the source keyspace (see step 4).

### Step 8 - Check that your production application is working as expected

Finally, check your production application to make sure everything is working as expected. You can check your [Insights](/docs/concepts/query-insights) tab to see if queries are being properly routed to your new keyspace. Insights will also show you any errors, query performance issues, and more.

If you realize there are issues, such as queries not being correctly served to the new keyspace, you can click "My application has errors", and we will temporarily restore the routing rules. Refer to step 6 to ensure you're correctly targeting `@primary`. Once your application is updated, click "**I have updated my application**".

Once everything looks good, click "**My application is working**", and the workflow will complete.

That's it! The tables you selected at the beginning are now being served by the sharded keyspace.
