---
title: 'Sharding quickstart'
subtitle: 'A complete walkthrough for how to create a sharded keyspace and how to set up your Vindexes and VSchema'
date: '2024-09-20'
---

This page provides a detailed walkthrough for how to shard on PlanetScale.
If you follow along, you'll learn how to:

- Create a sharded [keyspace](/docs/sharding/keyspaces) through the PlanetScale app
- Apply a schema to the keyspace
- Set up your primary Vindexes so that Vitess knows how to shard your data
- Set up a sequence table for ID generation
- Set up a lookup Vindex
- Run queries on your sharded database

These are advanced configuration settings that expose some of the underlying Vitess configuration of your cluster.

{% callout type="warning" %}
Misconfiguration can cause availability issues. We recommend thoroughly reading through the documentation in the [Sharding section](/docs/sharding/overview) of the docs prior to making any changes. If you have any questions, please [reach out to our support team](https://support.planetscale.com).
{% /callout %}

## Limitations

Before you start, it is important that you read through the following limitations:

- This feature can currently only be used to shard **new** tables.
- If you are an existing PlanetScale customer with already sharded tables, you can use the Cluster Configuration page to adjust the instance size, number of replicas, and Vschema for **already sharded tables**.
- Sharded keyspaces are not currently supported on databases that have foreign key constraints enabled.

Created sharded keyspaces for **existing tables** is not yet supported. If you have an existing database that you'd like to shard, [get in touch](/contact).

## Creating a sharded keyspace

This walkthrough assumes you have already set up an organization with the database whose keyspace you intend to shard. This guide uses a database named `musclemaker`.
This single database should already have the default unsharded keyspace of the same name.

To add a sharded keyspace, navigate to the [**Cluster configuration** page](/docs/concepts/cluster-configuration).

![Keyspace configuration main page](/assets/docs/sharding/quick-start/keyspace-configuration.png)

First, click **New keyspace**. You should be presented with the following creation menu:

![Create new keyspace](/assets/docs/sharding/quick-start/create-sharded.png)

Name the keyspace `musclemaker-sharded` and select the desired number of shards.
In this example, we'll be using 4.
If desired, you can change the size and number of replicas per-shard.
For this example we'll keep them small.
When ready, click **Create keyspace**.
You will see a message letting you know that the keyspace is initializing. This may take a few minutes.

![Keyspace not ready](/assets/docs/sharding/quick-start/not-ready.png)

After it's created, go back to the dashboard.
You should see two tabs, one for each keyspace.
Click on the sharded keyspace, and you can see that four shards were created.
PlanetScale automatically gave each the correct name with the corresponding keyspace ID ranges that the shards are responsible for.

![The dashboard with two keyspaces](/assets/docs/sharding/quick-start/dashboard.png)

## Creating the schema

Now it is time to create the schema.
We'll use a simplified schema with only two tables: `user` and `exercise_log`.
If we are coming from an unsharded environment, our schema may have looked like this previously:

### user

```sql
CREATE TABLE user(
  user_id BIGINT UNSIGNED AUTO_INCREMENT,
  username VARCHAR(128),
  first_name VARCHAR(128),
  last_name VARCHAR(128),
  email VARCHAR(128),
  pro BOOL,
  active BOOL,
  created_at DATETIME,
  PRIMARY KEY(user_id)
);
```

### exercise_log

```sql
CREATE TABLE exercise_log(
  log_id BIGINT UNSIGNED AUTO_INCREMENT,
  user_id BIGINT,
  reps SMALLINT,
  created_at DATETIME,
  edited_at DATETIME,
  deleted_at DATETIME,
  name VARCHAR(64),
  notes VARCHAR(1024),
  PRIMARY KEY(log_id)
);
```

However, we need to get rid of the `AUTO_INCREMENT`s in favor of [sequence tables](/docs/sharding/sequence-tables) in order to get this horizontally sharded.
To do this, we'll first create the tables in the sharded keyspace with the `AUTO_INCREMENT`s removed.
Connect to your PlanetScale database and run the following:

```sql
USE `musclemaker-sharded`;
CREATE TABLE user(
  user_id BIGINT UNSIGNED,
  username VARCHAR(128),
  first_name VARCHAR(128),
  last_name VARCHAR(128),
  email VARCHAR(128),
  pro BOOL,
  active BOOL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(user_id)
);
CREATE TABLE exercise_log(
  log_id BIGINT UNSIGNED,
  user_id BIGINT UNSIGNED,
  reps SMALLINT,
  name VARCHAR(64),
  notes VARCHAR(1024),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  edited_at DATETIME,
  deleted_at DATETIME,
  PRIMARY KEY(log_id)
);
```

Next, we need to create sequence tables for sequential ID generation.
Switch over to the unsharded keyspace and create the two tables:

```sql
USE `musclemaker`;
CREATE TABLE user_seq (
  id BIGINT NOT NULL,
  next_id BIGINT DEFAULT NULL,
  cache BIGINT DEFAULT NULL,
  PRIMARY KEY (id)
) COMMENT 'vitess_sequence';
CREATE TABLE exercise_log_seq (
  id BIGINT NOT NULL,
  next_id BIGINT DEFAULT NULL,
  cache BIGINT DEFAULT NULL,
  PRIMARY KEY (id)
) COMMENT 'vitess_sequence';
```

We'll go ahead and insert exactly 1 row into each of these tables to tell Vitess how to handle ID generation.
For more information, see the [Vitess Sequences docs](https://vitess.io/docs/user-guides/vschema-guide/sequences/).

```sql
USE `musclemaker`;
INSERT INTO user_seq VALUES (0, 1, 1000);
INSERT INTO exercise_log_seq VALUES (0, 1, 1000);
```

## Creating VSchema

In addition to the MySQL schema, each sharded keyspace should have additional [Vitess-specific schema](https://vitess.io/docs/reference/features/vschema/) (VSchema) that tells Vitess about the sequence tables, how to shard, and other keyspace metadata.
VSchema can be added using either `ALTER VSCHEMA` commands or via the **Cluster configuration** page.
For this walkthrough, we'll use the latter.

Navigate back to the **Cluster configuration** page, select the **musclemaker** keyspace, and then navigate to the **VSchema** tab.

![Change VSchema from the cluster configuration page](/assets/docs/sharding/quick-start/cluster-configuration-vschema.png)

VSchema is provided to Vitess in JSON.
We need to update the VSchema of both our keyspaces in order to:

1. Let Vitess know that it should use the sequence tables for generating incrementing IDs
2. Let Vitess know _how_ incoming rows should be sharded using Vindexes

To let Vitess know about the sequence tables, we first need to update the VSchema of the unsharded `musclemaker` keyspace.
Set the VSchema to the following:

```json
{
  "tables": {
    "user_seq": {
      "type": "sequence"
    },
    "exercise_log_seq": {
      "type": "sequence"
    }
  }
}
```

Click **Save changes**.
This VSchema lets Vitess know that these two tables are to be used for sequence generation.

Next, switch the the VSchema editing view for `musclemaker-sharded`.
We need to let this keyspace know about the sequence tables, and tell them to use the `xxhash` Vindex function.
Set the VSchema to the following:

```json
{
  "sharded": true,
  "vindexes": {
    "xxhash": {
      "type": "xxhash"
    }
  },
  "tables": {
    "user": {
      "column_vindexes": [
        {
          "column": "user_id",
          "name": "xxhash"
        }
      ],
      "auto_increment": {
        "column": "user_id",
        "sequence": "`musclemaker`.user_seq"
      }
    },
    "exercise_log": {
      "column_vindexes": [
        {
          "column": "user_id",
          "name": "xxhash"
        }
      ],
      "auto_increment": {
        "column": "log_id",
        "sequence": "`musclemaker`.exercise_log_seq"
      }
    }
  }
}
```

Notice a few things:

- We've added a `vindex` of type `xxhash`.
  For all tables that use this Vindex, it will take the shard key column, hash it, and use the result as the keyspace ID, which determines which shard to send it to.
- We added the `tables` field with a field for each table.
  - In each, we specified a `column_vindexes` field and configured it to hash on the `user_id` using the `xxhash` Vindex.
  - In each, we also added the `auto_increment` field and told it to use the corresponding sequence tables in `musclemaker` for ID generation.

Hit **Save changes**.

## Inserting data

Next, let's insert some sample data.
Go ahead and execute these queries on the database:

```sql
USE `musclemaker-sharded`;
INSERT INTO user (username, first_name, last_name, email, pro, active) VALUES
  ('jj17', 'John', 'James', 'jj@gmail.com', 0, 0),
  ('cBarkley4', 'Charles', 'Barkley', 'barkley@planetscale.com', 0, 1),
  ('samCool', 'Samantha', 'Cool', 'coolio@yahoo.net', 1, 0),
  ('bb4700.1', 'Brandi', 'Banks', 'bb@proton.com', 1, 1),
  ('anthonyie', 'Anthony', 'Broski', 'abro@gmail.com', 1, 0),
  ('jonez', 'Edwin', 'Jones', 'jonez@planetscale.com', 1, 0),
  ('cramTheGainz', 'Charles', 'Cramer', 'g@yahoo.net', 1, 0),
  ('zeWorkout', 'Zach', 'Williams', 'zw@proton.com', 1, 1),
  ('drake', 'Drake', 'Cam', 'dc@yahoo.net', 0, 0),
  ('carmen', 'Carmen', 'W', 'carmel@proton.com', 0, 0);
INSERT INTO exercise_log(user_id, reps, name) VALUES
  (1, 10, 'pushup'),
  (1, 10, 'situp'),
  (2, 10, 'burpee'),
  (2,  7, 'squat'),
  (3, 10, 'bench'),
  (3, 12, 'curl'),
  (4,  8, 'deadlift'),
  (4, 10, 'pullup'),
  (5,  6, 'bench'),
  (5, 10, 'pushups'),
  (6, 11, 'squat'),
  (6, 15, 'shrug'),
  (7, 10, 'squat'),
  (7,  9, 'deadlift'),
  (8, 10, 'curl'),
  (8, 10, 'row'),
  (9, 10, 'pullup'),
  (9,  9, 'deadlift'),
  (10, 4, 'plank'),
  (10, 10, 'row');
```

You can confirm that the rows were inserted and behave as a single, unified table by running:

```sql
USE `musclemaker-sharded`;
SELECT * FROM user;
SELECT * FROM exercise_log;
```

You can look at which rows ended up on each shard by running:

```sql
USE `musclemaker-sharded/-40`;
SELECT * FROM user;
SELECT * FROM exercise_log;

USE `musclemaker-sharded/40-80`;
SELECT * FROM user;
SELECT * FROM exercise_log;

USE `musclemaker-sharded/80-c0`;
SELECT * FROM user;
SELECT * FROM exercise_log;

USE `musclemaker-sharded/c0-`;
SELECT * FROM user;
SELECT * FROM exercise_log;
```

## Adding a lookup Vindex

What if we want to execute queries that don't use the primary Vindex in the `WHERE` clause?
For example:

```sql
SELECT *
FROM user
  WHERE username = 'cBarkley4';
```

This would be unable to leverage the primary Vindex to narrow down which shards to look at, and therefore would have to scatter the query to all four shards.
Instead we can create a secondary lookup Vindex, which will allow it to send a query like this only to the appropriate shard.
Create the following lookup table:

```sql
USE `musclemaker-sharded`
CREATE TABLE username_lookup(
  username VARCHAR(128) NOT NULL PRIMARY KEY,
  keyspace_id varbinary(64)
);
```

We also need to update the VSchema for the `musclemaker-sharded` to set a Vindex for this lookup table.
Add the following snippet of VSchema to the `tables` section of the `musclemaker-sharded` keyspace:

```json
"username_lookup": {
  "column_vindexes": [
    {
      "column": "username",
      "name": "xxhash"
    }
}
```

We then need to populate it with the correct usernames and keyspace IDs.
We can find the keyspace ID for a `user_id` with `xxhash` by running a query like:

```sql
select keyspace_id from xxhash where id = 1;
```

If we run this for IDs 1-10, we can determine which keyspace IDs to insert.
The insertions into this table should look like this:

```sql
INSERT INTO username_lookup (username, keyspace_id) VALUES
  ('jj17', 0xD46405367612B4B7),
  ('cBarkley4', 0x8B59801662B52160),
  ('samCool', 0xA42C16F52A7C1626),
  ('bb4700.1', 0x896BA42C32143991),
  ('anthonyie', 0xED48B60574B4816A),
  ('jonez', 0xF77C5A6468BD2E12),
  ('cramTheGainz', 0xB77A0DA0B6524A18),
  ('zeWorkout', 0x64C8AA7CBB6246AD),
  ('drake', 0x9A02EE413EED351D),
  ('carmen', 0x177FB0A30E55484B);
```

Run that, then go back to the VSchema editing view for `musclemaker-sharded` and add the following to the `vindexes` section:

```json
"username_to_keyspace_id": {
  "type": "lookup_unique",
  "params": {
    "from": "username",
    "table": "`musclemaker-sharded`.username_lookup",
    "to": "keyspace_id"
  },
  "owner": "user"
},
```

Also add this to the `column_vindexes` for the `user` table:

```json
{
  "column": "username",
  "name": "username_to_keyspace_id"
}
```

Hit **Save changes**.
You can now run queries like:

```sql
SELECT *
FROM user
  WHERE username = 'cBarkley4';
```

A secondary lookup Vindex should help performance of such `SELECT` queries if we had a large data set.

## Final VSchema

For reference, here is the final VSchema for our two keyspaces.

### musclemaker

```json
{
  "tables": {
    "exercise_log_seq": {
      "type": "sequence"
    },
    "user_seq": {
      "type": "sequence"
    }
  }
}
```

### musclemaker-sharded

```json
{
  "sharded": true,
  "vindexes": {
    "username_to_keyspace_id": {
      "type": "lookup_unique",
      "params": {
        "from": "username",
        "table": "`musclemaker-sharded`.username_lookup",
        "to": "keyspace_id"
      },
      "owner": "user"
    },
    "xxhash": {
      "type": "xxhash"
    }
  },
  "tables": {
    "exercise_log": {
      "column_vindexes": [
        {
          "column": "user_id",
          "name": "xxhash"
        }
      ],
      "auto_increment": {
        "column": "log_id",
        "sequence": "`musclemaker`.exercise_log_seq"
      }
    },
    "user": {
      "column_vindexes": [
        {
          "column": "user_id",
          "name": "xxhash"
        },
        {
          "column": "username",
          "name": "username_to_keyspace_id"
        }
      ],
      "auto_increment": {
        "column": "user_id",
        "sequence": "`musclemaker`.user_seq"
      }
    },
    "username_lookup": {
      "column_vindexes": [
        {
          "column": "username",
          "name": "xxhash"
        }
      ]
    }
  }
}
```
