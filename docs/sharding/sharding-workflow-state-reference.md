---
title: 'Sharding workflow state reference'
subtitle: 'Learn about the different stages you enter during the unsharded to sharded keyspace workflow.'
date: '2024-11-07'
---

This document can be used as reference when going through the [Sharding quickstart](/docs/sharding/sharding-quickstart). It covers the various states you may enter during the workflow.

## `copying`

During this state, Vitess is copying rows from your source keyspace to your target keyspace using a combination of `SELECT * FROM table` and binlog-based replication.

## `running`

Once copying is complete, we switch to `running` state. Replication lag must be low enough for VReplication to advance into the `running` state. During this state, we are running pure binlog-based replication.

At this point, your original source keyspace tables are serving all primary and replica traffic. VReplication is replicating all writes to the tables in the target keyspace. [Routing rules](/docs/sharding/routing-rules) are routing all queries/writes from the target keyspace to the source keyspace.

There are some additional substates you may enter during the `running` state:

- `running` with not `verified data`: You can verify replicated data is accurate before switching any traffic
- `running` with `verified data`: You have run the verification process in the last 24 hours
- `running` with `verification stale`: You have run the verification process over 24 hours ago

## `switched_replicas`

The `switched_replicas` state is an optional intermediate step between `running` and `switched_primaries`. During the `switched_replicas` state, the new target keyspace is serving replica traffic, and the source keyspace continues serving all primary traffic.

Because writes are still doing to the source keyspace, data is still being replicated to the target keyspace.

## `switched_primaries`

During the `switched_primaries` state, the target keyspace is serving replica _and_ primary traffic.

Vitess has now created a _reverse_ workflow that replicates from the target keyspace back to the source keyspace.

At this point:

- The original, "forward" workflow is paused (stopped)
- Vitess has initialized the sequence tables
- The routing rules are in place, as they will be critical for `reversed_cutover` state.

If you click "reverse traffic", here's what happens:

- The workflow goes back to a `running` state
- Depending on which way you're reversing, "forward" workflow is started again or the "reverse" workflow is stopped

## `cutover`

- This is tantamount to `MoveTables Complete --keep-data=false --keep-routing-rules=false`
  - User **cannot** cancel the workflow at this point. This is because the underlying workflow is actually complete, and the source tables have been deleted
- The underlying Vitess workflow is finished.
- We reset the routing rules to what they were before the workflow started
- User **must have** updated their application code to no longer target a keyspace in order for their app to still work at this step.
  - This is because the routing rules have been cleaned up, and can no longer route queries from `source_keyspace.table` to `target_keyspace.table` and we must rely on Vitess global routing.
- If the user's app is failing at this point, have no fear! There is a `reverse cutover` button

`reversed_cutover`

- User has pressed "reverse cutover"
- We put back the routing rules we saved during `switched_primaries`
  - These rules route queries to the source keyspace table, to the target keyspace table so that queries work again
- User now has more time to update/fix their client application code

`complete`

- Does nothing except say, "I'm all done and I don't need to reverse cutover anymore".
- Allows you to do another workflow. since we limit to 1 active workflow per branch at a time

`cancelled`

- User clicked "cancel"
- We issued a `MoveTables Cancel --keep-data=false --keep-routing-rules=false`
  - target tables will be deleted
  - routing rules will be removed
- Vitess workflow deleted

`error`

- Some sort of error happened. User can click "retry" to try again.
