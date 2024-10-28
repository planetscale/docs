---
title: 'Database Imports'
subtitle: 'Import your data from an external MySQL database into your PlanetScale database.'
date: '2024-02-16'
---

## Overview

PlanetScale provides an import tool in the dashboard that allows you to painlessly import an **existing internet-accessible MySQL or MariaDB database** into a PlanetScale database with _no downtime_.

**This feature is currently in Beta.**

{% callout %}
You must be an [Organization Administrator](/docs/concepts/access-control#organization-administrator) to use this feature.
{% /callout %}

Before you begin, it may be helpful to check out our [general MySQL compatibility guide](/docs/reference/mysql-compatibility).

## Connect to your external database

To import an existing database into PlanetScale:

1. Head to your PlanetScale dashboard and click on "**New database**" > "**Import database**," which will bring you to the **Import Setup page**.
2. Give your imported database a name and [select a region](/docs/concepts/regions) from the dropdown.
3. We recommend using the same name as the database you're importing from to avoid updating any database name references throughout your application code. If you'd prefer to use a different database name, make sure to update your app where applicable once you fully switch over to PlanetScale.
4. Fill in the following connection values with information from your existing hosted database:

   - **Host name** — The address where the database is hosted.
   - **Port** — The port where your database is hosted. The default MySQL port is `3306`.
   - **Database name** — The exact database name you want to import.
   - **SSL verification mode** — If your database server provides a valid SSL certificate, please set this to `Required,` otherwise select `Disabled`.
   - **Username** — The user's username used to connect to the database. This user **must** have `read` and `write` access.

   {% callout %}
   You must have [binary logs](https://dev.mysql.com/doc/refman/8.0/en/binary-log.html) enabled on the
   database you're importing.
   {% /callout %}

5. You'll have the option to **Authenticate with password** or **Authenticate with mTLS**. To authenticate with a password, type in the password for the username you entered. Make sure the user has `read` and `write` access to this database.

   For the "Authenticate with mTLS option," you'll need to provide the following:

   - **SSL client certificate** — Certificate to authenticate PlanetScale with your database server.
   - **SSL client key** — This is the private key for the client certificate

6. From here, you can proceed to [testing the connection](#test-the-connection) or click "**Show advanced settings**" for more options.

7. (Optional) Under Advanced settings, you have the option to enter the following:

   - **SSL server name override**
   - **SSL CA certificate chain** — If your database server provides a certificate with a non-trusted root CA, please provide the full CA certificate chain here.

   For more information about certificates from a Certificate Authority, check out our [Secure connections documentation](/docs/concepts/secure-connections#certificate-authorities).

### Test the connection

1. Once your connection information is plugged in, click the "**Connect to database**" button. PlanetScale will attempt to connect to your database. If successful, you'll see a green checkmark with a success message.

{% callout %}
If your database uses foreign key constraints, we will detect them after successfully connecting to your external database and automatically enable foreign key constraint support for your database.
{% /callout %}

2. If the connection is successful, click “**Begin database import**” to start migrating your data to PlanetScale.

Or, if the connection fails, you'll get an error message in the dashboard. Double-check your connection information or see our [Troubleshooting section](#troubleshooting-connectivity-issues) for more information.

## Foreign key constraints

If your database uses foreign key constraints, we will detect them after successfully connecting to your external database and automatically enable foreign key constraint support.

There are a couple of important things to know about doing database imports with foreign key constraints:

- **We recommend importing using a replica:** The foreign key constraint-specific import process holds a long-run transaction on the source database. This might cause an increased load on the source database. As a result, we recommend that users connect to a replica when importing their database.
- **Import retries:** If your import fails, the import must start from the beginning again. This is unlike other imports, where we retry from where we left off.

For most cases, foreign key constraints should work as expected in PlanetScale. There are a few cases to be aware of as they are currently unsupported or result in less ideal behavior. See the [foreign key constraints limitation documentation](/docs/concepts/foreign-key-constraints#limitations) for more info.

## Import process

There are three simple steps to the database import process. You can cancel the import anytime by clicking "Cancel import" in the top right corner. If you cancel, we'll delete all connection information.

{% callout %}
Do not execute DDL (Data Definition Language) statements, `CREATE`, `DROP`, `ALTER`, `TRUNCATE`, etc., on either database during the import process. Schema changes are not replicated between databases in either direction.
{% /callout %}

### Step 1: Copying schema and data

![Step 1 of database import - Initial import](/assets/docs/imports/database-imports/initial.png)

During this phase, the data and schema from your external database are imported into your PlanetScale database. The PlanetScale database is in `read-only` mode.

While in `read-only` mode, you're already able to take advantage of PlanetScale features such as:

1. You can generate a password to [connect to your new database](/docs/concepts/secure-connections) in a MySQL client or [in your application locally](/docs/tutorials/connect-any-application) by clicking the "**Connect**" dropdown underneath the import flow.
2. You can also view [Query Insights](/docs/concepts/query-insights), branches, and database settings by clicking around in the top nav.

Once the initial import has finished, your PlanetScale database will be in **Replica** mode.

### Step 2: Replica mode

![Step 2 of database import - Replica mode](/assets/docs/imports/database-imports/replica.png)

In this mode, your external database is the primary, but PlanetScale will directly read and write to the appropriate database. [Connect your live application](/docs/tutorials/connect-any-application) to the PlanetScale database and ensure it is fully compatible with your app.

{% callout %}
If you gave your PlanetScale database a different name than the one you're importing from, ensure your application references the correct name.
{% /callout %}

Queries sent to PlanetScale will be served directly from the PlanetScale database. However, writes will be routed **back to your external database**, and their results will be replicated back to PlanetScale to keep both databases in sync. Behind the scenes, we're using [Vitess's powerful Schema Routing rules](https://vitess.io/docs/reference/features/schema-routing-rules/) to allow your PlanetScale database to act as a "data router."

We'll **continue watching your external database and automatically update your PlanetScale database** with any changes using [Binary Log File Replication](https://dev.mysql.com/doc/refman/8.0/en/binlog-replication-configuration-overview.html). In other words, any writes made directly to your external database will also appear in your PlanetScale database. This ensures you **won't experience any data loss** while updating your application's connection string to point at PlanetScale. For example, if a user makes a new comment on your blog application during this stage of the import, the comment will be written to both databases, no matter which database the application was pointed to. This ensures you **won't experience any data loss** while going through the import process or if you decide to cancel the import into PlanetScale.

Once you're ready for PlanetScale to become your _primary_ database, click "Enable primary mode" to move to the next stage.

### Step 3: Primary mode

![Step 3 of database import - Primary mode](/assets/docs/imports/database-imports/primary.png)

During this stage, PlanetScale replaces your external database as the primary database. It will serve both reads and writes. Behind the scenes, we essentially reverse the direction of the routing in the previous step. All reads and writes will go straight to the PlanetScale database. Updates will be replicated back to your external database.

In the blog application example context, if a user makes a new comment, the comment will be written to the PlanetScale database first and then copied back to your external database.
Why copy it back? If you decide to cancel the import and switch back to your external database, you can be confident that you didn't lose any new or changed data while going through the import process.

{% callout %}
In Primary mode, any writes made directly to the external database will not be replicated to the PlanetScale database. Your application should be connected directly to the PlanetScale database.
{% /callout %}

If you're happy with everything and ready to fully switch over, click the "**Finish import**" button to finalize the import.

When you finalize the import, we will detach your external database. The connection to that database will be closed, and all connection information will be deleted from PlanetScale. This will also cut off replication, so your PlanetScale database will no longer update your external database.

### Import complete

Your database has been fully imported into PlanetScale and is ready to use!

Next, you'll be taken to your database dashboard page. If you click on "Branches," you'll see that you now have one [production branch](/docs/concepts/branching#promote-a-development-branch-to-production), `main`, that contains all of the data from your external database. Production branches are highly available and have optional additional protections, such as [safe migrations](/docs/concepts/safe-migrations), to prevent downtime.

## Next steps

You just fully migrated your database to PlanetScale with no downtime and no fear of data loss. So what's next? Here are some next steps you can take with your database:

- [Connect to your application](/docs/tutorials/connect-any-application) — If you haven't already, you can also connect to your application locally.
- [Enable safe migrations](/docs/concepts/safe-migrations) — To protect your database from accidental schema changes an enable zero-downtime migrations, it is highly recommended to enable safe migrations on your new production branch.
- [Create a development branch](/docs/concepts/branching) — Add PlanetScale to your development workflow with our powerful branching feature. You can branch off of your `main` branch to test schema changes in development and then merge them into production with our [non-blocking schema change workflow](/docs/concepts/nonblocking-schema-changes). Again, no downtime!
- [Create a deploy request](/docs/concepts/branching#1-create-a-deploy-request) — Once your branch is in production, you can safeguard against unwanted or accidental changes by creating a development branch off of your production branch. This is where you can test out schema changes or any modifications you need to make. Once it's ready, you can create a deploy request that your team can review before deploying to production.

## Import limitations

PlanetScale will automatically stop the import process and detach your external database after **7 days** of no activity once the initial import is finished. This will not impact your PlanetScale database created for the import, but it will stop all replication into and out of it.

## Troubleshooting

The following section covers common issues and compatibility limitations you may encounter during the import process. You should also check out our [general MySQL compatibility guide](/docs/reference/mysql-compatibility).

### Connectivity issues

If you're running into issues connecting with a username and password, try to plug that same connection information into the MySQL CLI or a MySQL GUI. Below is the command for the MySQL CLI.

```sql
mysql -u <USERNAME> -p <PASSWORD> -h <HOST> -P <PORT> -D <DATABASE>
```

If the connection works there but not on PlanetScale, please [reach out for additional assistance](#additional-assistance).

#### Host can't target a PlanetScale database

The importer can not be used to duplicate a database already hosted on PlanetScale. If you need to copy or move a database between PlanetScale organizations, we recommend dumping the origin database and restoring that dump to a new database with the same name in the new organization. You can use the `pscale database dump` and `restore-dump` commands of our [CLI application pscale](https://github.com/planetscale/cli) to create and restore those dumps.

### Compatibility issues

PlanetScale is built on [Vitess](https://vitess.io/), which gives us the power to perform data migrations at scale. This does, however, come with some trade-offs that could cause you to run into errors while importing an existing database. We believe these small trade-offs are worth the massive benefits, such as unlimited scaling through horizontal sharding, non-blocking schema changes, branching, and more. So, if you encounter compatibility issues while importing your external database to PlanetScale, we'd like to help you troubleshoot.

Below are a few common errors you may encounter while importing or connecting to an external database. If you're still having trouble importing, please feel free to [reach out to support for additional assistance](#additional-assistance).

#### No unique key

PlanetScale requires that all tables have a unique, not-null key. When you modify a table, both the old and the new schema must have a unique key as described, and the columns covered by those keys must exist in both the old and the new schema. If you run into this error, read through our [Changing unique keys documentation](/docs/learn/onlineddl-change-unique-keys) for more information.

It may also help to check out the official [MySQL documentation about Primary Keys](https://dev.mysql.com/doc/refman/8.0/en/partitioning-limitations-partitioning-keys-unique-keys.html).

#### Invalid charset

PlanetScale supports the following charsets: `utf8`, `utf8mb4`, `utf8mb3`, `latin1`, and `ascii`.
If your table uses any other charset, please consult the official [MySQL documentation about charsets](https://dev.mysql.com/doc/refman/8.0/en/charset.html).

#### Table names with special characters

Tables named with characters outside of the standard ASCII set are not supported. These tables may cause the import process to fail during the "Copying schema and data" phase of the import, resulting in a generic message stating that something went wrong.

If any of your table names include special characters, they must be renamed before the import succeeds.

#### Unsupported feature

You might see this error if your table requires a storage engine other than [`InnoDB`](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html).
Please consult the official [MySQL documentation about alternative storage engines](https://dev.mysql.com/doc/refman/8.0/en/storage-engines.html) for more information.

### Server configuration issues

To ensure that we can migrate your data to PlanetScale with zero downtime, we check your database for some required configuration values, as described below:

| Variable                       | Required Value | Documentation                                                                                                                  |
| :----------------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `gtid_mode`                    | `ON`           | [Documentation](https://dev.mysql.com/doc/refman/5.7/en/replication-options-gtids.html#sysvar_gtid_mode)                       |
| `binlog_format`                | `ROW`          | [Documentation](https://dev.mysql.com/doc/refman/5.7/en/replication-options-binary-log.html#sysvar_binlog_format)              |
| `binlog_row_image`             | `FULL`         | [Documentation](https://dev.mysql.com/doc/refman/8.0/en/replication-options-binary-log.html#sysvar_binlog_row_image)           |
| `expire_logs_days`\*           | `> 2`          | [Documentation](https://dev.mysql.com/doc/refman/8.0/en/replication-options-binary-log.html#sysvar_expire_logs_days)           |
| `binlog_expire_logs_seconds`\* | `> 172800`     | [Documentation](https://dev.mysql.com/doc/refman/8.0/en/replication-options-binary-log.html#sysvar_binlog_expire_logs_seconds) |

**\*** PlanetScale requires that either `expire_logs_days` or `binlog_expire_logs_seconds` is set to a valid value. If both of these values are set, the value of `binlog_expire_logs_seconds` takes precedence over `expire_logs_days`.

### Import user account issues

Please follow [the Import tool user requirements guide](/docs/imports/import-tool-user-requirements#script-to-create-user) to ensure that the database user performing the import has the correct set of grants and permissions on the external database.

#### MySQL error number 1045: Access denied

If you get MySQL error number 1045; Symbol: ER_ACCESS_DENIED_ERROR; SQLSTATE: 28000. For example, with a message like: `Message: Access denied for user '%s'@'%s' (using password: %s)`. You should check your MySQL grants and permissions.

When importing a database with foreign key constraints, we try with `FLUSH TABLES WITH READ LOCK`. If we get a permission error, we resort to an explicit `LOCK TABLES ...` statement. You will get the above error if both permissions are unavailable.

Ideally, the username will have `FLUSH_TABLES` or `RELOAD` privileges, but if not possible, then `LOCK TABLES` at minimum.

#### Check these values for your database server

To check what your database server currently has these values set to, run the following query in a MySQL console connected to your database server:

```sql
SHOW VARIABLES
   WHERE Variable_Name LIKE '%gtid_mode'
      OR Variable_Name LIKE '%binlog_format'
      OR Variable_Name LIKE '%binlog_row_image'
      OR Variable_Name LIKE '%expire_logs_days'
      OR Variable_Name LIKE '%binlog_expire_logs_seconds';
```

Cross-check these values with the table above and update if needed.

### Other issues

If you see an error when querying your PlanetScale database after the initial import that looks like this:

```sql
ERROR 1105 (HY000): keyspace importkeyspace fetch error: node doesn't exist: [...]
```

This means the import process is underway, and this error should clear in 10-15 minutes after some additional processing by PlanetScale. If it does not, contact our [PlanetScale support team](https://support.planetscale.com/hc/en-us), and we will help troubleshoot the issue.
