---
title: 'Database Imports'
subtitle: 'Import your data from an external MySQL database into your PlanetScale database.'
date: '2023-04-05'
---

## Overview

PlanetScale provides an import tool in the dashboard that allows you to painlessly import an **existing internet-accessible MySQL database** into a PlanetScale database with _no downtime_.

**This feature is currently in Limited Beta.**

Note: You must be an [Organization Administrator](/docs/concepts/access-control#organization-administrator) to use this feature.

Before you begin, it may be helpful to check out our [general MySQL compatibility guide](/docs/reference/mysql-compatibility).

## Connect to your external database

To import an existing database into PlanetScale:

1. Head to your PlanetScale dashboard and click on "**New database**" > "**Import database**", which will bring you to the **Import Setup page**.
2. Give your imported database a name and [select a region](/docs/concepts/regions) from the dropdown.
3. Add a credit card to your organization. You will only be charged if your import requires a Scaler plan and we will ask you to confirm before proceeding.
4. We recommend using the same name as the database you're importing from to avoid having to update any database name references throughout your application code. If you'd prefer to use a different database name, just make sure to update your app where applicable once you fully switch over to PlanetScale.

   {% callout %}
   Importing a database will **not** count towards your `read` or `write` usage.
   {% /callout %}

   ![Select name and region for new database import {priority}](/assets/docs/imports/database-imports/form.png)

5. Fill in the following connection values with information from your existing hosted database:

   - **Host name** &mdash; The address where the database is hosted.
   - **Port** &mdash; The port where your database is hosted. The default MySQL port is `3306`.
   - **SSL verification mode** &mdash; If your database server provides a valid SSL certificate, please set this to `Required`, otherwise select `Disabled`.
   - **Database name** &mdash; The exact name of the database you want to import.
   - **Username** &mdash; The username of the user used to connect to the database. This user **must** have `read` and `write` access.

   {% callout %}
   You must have [binary logs](https://dev.mysql.com/doc/refman/8.0/en/binary-log.html) enabled on the
   database you're importing.
   {% /callout %}

6. You'll have the option to **Authenticate with password** or **Authenticate with mTLS**. To authenticate with password, type in the password for the username you entered. Make sure the user has `read` and `write` access to this database.

   For the "Authenticate with mTLS option", you'll need to provide the following:

   - **SSL client certificate** &mdash; Certificate to authenticate PlanetScale with your database server.
   - **SSL client key** &mdash; This is the private key for the client certificate

7. From here you, can proceed to [testing the connection](#test-the-connection) or click "**Show advanced settings**" for more options.

8. (Optional) Under Advanced settings, you have the option to enter the following:

   - **SSL server name override**
   - **SSL CA certificate chain** &mdash; If your database server provides a certificate with a non-trusted root CA, please provide the full CA certificate chain here.

   For more information about certificates from a Certificate Authority, check out our [Secure connections documentation](/docs/concepts/secure-connections#certificate-authorities).

### Test the connection

1. Once you have all of your connection information plugged in, click the "**Connect to database**" button. PlanetScale will attempt to connect to your database. If successful, you'll see a green checkmark with a success message. From here, you can click the "**Begin database import**" button to import your data.

If the connection fails, you'll get an error message in the dashboard. Double-check your connection information or see our [Troubleshooting section](#troubleshooting-connectivity-issues) for more information.

### Importing large databases

If you're importing a large database (that uses over 5 GB of storage) and are on the [Hobby plan](/pricing), you will receive a prompt as shown below to upgrade your plan:

![Upgrade your hobby plan if importing more than 5 GB](/assets/docs/imports/database-imports/upgrade.png)

You can use the **Add new card** button here to add a credit card and upgrade your account.

Once you've successfully upgraded your plan, you should be able to continue importing your external database into PlanetScale.

![Account upgraded, continue to importing database](/assets/docs/imports/database-imports/upgraded.png)

## Import process

There are three simple steps to the database import process. You can cancel the import at any time by clicking "Cancel import" in the top right corner. If you cancel, we'll delete all connection information.

{% callout %}
Do not execute DDL (Data Definition Language) statements, CREATE, DROP, ALTER, TRUNCATE, etc., on either database during the
import process. Schema changes are not replicated between databases in either direction.
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

In this mode, your external database is the primary but PlanetScale will direct reads and writes to the appropriate database. [Connect your live application](/docs/tutorials/connect-any-application) to the PlanetScale database and ensure that it is fully compatible with your app.

{% callout %}
If you gave your PlanetScale database a different name than the one you're importing from, make sure your application
is referencing the correct database name.
{% /callout %}

Queries sent to PlanetScale will be served directly from the PlanetScale database but writes will be routed **back to your external database** and their results will be replicated back to PlanetScale to keep both databases in sync. Behind the scenes, we're using [Vitess's powerful Schema Routing rules](https://vitess.io/docs/reference/features/schema-routing-rules/) to allow your PlanetScale database act as a "data router".

We'll **continue watching your external database and automatically update your PlanetScale database** with any changes using [Binary Log File Replication](https://dev.mysql.com/doc/refman/8.0/en/binlog-replication-configuration-overview.html). In other words, any writes made directly to your external database will also appear in your PlanetScale database. This ensures you **won't experience any data loss** while updating your application's connection string to point at PlanetScale. For example, if a user makes a new comment on your blog application during this stage of the import, the comment will be written to both databases no matter which database the application was pointed at. This ensures you **won't experience any data loss** while going through the import process, or if you decide to cancel the import into PlanetScale.

Once you're ready for PlanetScale to become your _primary_ database, click "Enable primary mode" to move to the next stage.

### Step 3: Primary mode

![Step 3 of database import - Primary mode](/assets/docs/imports/database-imports/primary.png)

During this stage, PlanetScale replaces your external database as the primary database. It will serve both reads and writes. Behind the scenes, we essentially reverse the direction of the routing in the previous step. This means that all read and writes will go straight to the PlanetScale database and updates will be replicated back to your external database.

In the context of the blog application example, this means that if a user makes a new comment, the comment will be written to the PlanetScale database first and then copied back to your external database.
Why copy it back? If you decide you want to cancel the import and switch back to your external database, you can be confident that you didn't lose any new or changed data while going through the import process.

{% callout %}
In Primary mode, any writes made directly to the external database will not be replicated to the PlanetScale database. Your application should be connected directly to the PlanetScale database.
{% /callout %}

If you're happy with everything and ready to fully switch over, you can click on the "**Finish import**" button to finalize the import.

When you finalize the import, we will detach your external database. The connection to that database will be closed and all connection information will be deleted from PlanetScale. This will also cut off replication, so your PlanetScale database will no longer update your external database.

### Import complete

Your database has been fully imported into PlanetScale and is ready to use!

Next, you'll be taken to your database overview page. If you click on "Branches", you'll see that you now have one [production branch](/docs/concepts/branching#promote-a-development-branch-to-production), `main`, that contains all of the data from your external database. Production branches are highly available and have optional additional protections, such as [safe migrations](/docs/concepts/safe-migrations), to prevent downtime.

## Next steps

You just fully migrated over your database to PlanetScale with no downtime and no fear of data loss. So what's next? Here are some next steps you can take with your database:

- [Connect to your application](/docs/tutorials/connect-any-application) &mdash; If you haven't already, you can also connect to your application locally.
- [Enable safe migrations](/docs/concepts/safe-migrations) &mdash; To protect your database from accidental schema changes an enable zero-downtime migrations, it is highly recommended to enable safe migrations on your new production branch.
- [Create a development branch](/docs/concepts/branching) &mdash; Add PlanetScale to your development workflow with our powerful branching feature. You can branch off of your `main` branch to test schema changes in development, and then merge them into production with our [non-blocking schema change workflow](/docs/concepts/nonblocking-schema-changes). Again, no downtime!
- [Create a deploy request](/docs/concepts/branching#1-create-a-deploy-request) &mdash; Once your branch is in production, you can safeguard against unwanted or accidental changes by creating a development branch off of your production branch. This is where you can test out schema changes or any modifications you need to make. Once it's ready, you can create a deploy request that your team can review before deploying to production.

## Import limitations

PlanetScale will automatically stop the import process and detach your external database after **7 days** of no activity once the initial import is finished. This will not impact your PlanetScale database that was created for the import, but it will stop all replication into and out of it.

## Troubleshooting

The following section covers common issues and compatibility limitations that you may come across during the import process. You should also check out our [general MySQL compatibility guide](/docs/reference/mysql-compatibility).

### Connectivity issues

If you're running into issues connecting with a username and password, try to plug that same connection information into the MySQL CLI or a MySQL GUI. Below is the command for the MySQL CLI.

```sql
mysql -u <USERNAME> -p <PASSWORD> -h <HOST> -P <PORT> -D <DATABASE>
```

If the connection works there, but not on PlanetScale, please [reach out for additional assistance](#additional-assistance).

### Compatibility issues

PlanetScale is built on [Vitess](https://vitess.io/), which gives us the power to perform data migrations at scale. This does, however, come with some trade-offs that could cause you to run into errors while importing an existing database. We believe these small trade-offs are worth the massive benefits, such as unlimited scaling through horizontal sharding, non-blocking schema changes, branching, and more. So if you do run into any compatibility issues while importing your external database to PlanetScale, we'd like to help you troubleshoot.

Below are a few common errors you may run into while importing or connecting to an external database. If you're still having trouble importing, please feel free to [reach out to support for additional assistance](#additional-assistance).

#### Foreign key constraints disallowed

PlanetScale does not support database schemas that have tables with foreign key constraints in them.

Please take a look at our help document on how your application can [operate without foreign key constraints](/docs/learn/operating-without-foreign-key-constraints).

#### No unique key

PlanetScale requires that all tables have a unique, not-null key that remains unchanged during the migration. If you run into this error, you can read through our [Change single unique key documentation](/docs/learn/change-single-unique-key#how-to-change-a-tables-single-unique-key) for more information.

It may also help to check out the official [MySQL documentation about Primary Keys](https://dev.mysql.com/doc/refman/8.0/en/partitioning-limitations-partitioning-keys-unique-keys.html).

#### Invalid charset

PlanetScale supports the following charsets: `utf8`, `utf8mb4`, `utf8mb3`, `latin1`, and `ascii`.
If your table uses any other charset, please consult the official [MySQL documentation about charsets](https://dev.mysql.com/doc/refman/8.0/en/charset.html).

#### Table names with special characters

Tables that are named with characters outside of the standard ASCII set are not supported. These tables may cause the import process to fail during the "Copying schema and data" phase of the import, resulting in a generic message stating that something went wrong.

If any of your table names include special characters, they will need to be renamed before the import will succeed.

#### Unsupported feature

You might see this error if your table requires a storage engine other than [`InnoDB`](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html).
Please consult the official [MySQL documentation about alternative storage engines](https://dev.mysql.com/doc/refman/8.0/en/storage-engines.html) for more information.

### Server configuration issues

To ensure that we can migrate your data to PlanetScale with zero downtime, we check your database for some required configuration values, as described below:

| Variable                       | Required Value | Documentation                                                                                                                  |
| :----------------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `gtid_mode`                    | `ON`           | [Documentation](https://dev.mysql.com/doc/refman/5.7/en/replication-options-gtids.html#sysvar_gtid_mode)                       |
| `binlog_format`                | `ROW`          | [Documentation](https://dev.mysql.com/doc/refman/5.7/en/replication-options-binary-log.html#sysvar_binlog_format)              |
| `expire_logs_days`\*           | `> 2`          | [Documentation](https://dev.mysql.com/doc/refman/8.0/en/replication-options-binary-log.html#sysvar_expire_logs_days)           |
| `binlog_expire_logs_seconds`\* | `> 172800`     | [Documentation](https://dev.mysql.com/doc/refman/8.0/en/replication-options-binary-log.html#sysvar_binlog_expire_logs_seconds) |

**\*** PlanetScale requires that either `expire_logs_days` or `binlog_expire_logs_seconds` is set to a valid value. If both of these values are set, the value of `binlog_expire_logs_seconds` takes precedence over `expire_logs_days`.

### Import user account issues

Please follow [the Import tool user requirements guide](/docs/imports/import-tool-user-requirements#script-to-create-user) to ensure that the database user performing the import has the right set of Grants and permissions on the external database.

#### Check these values for your database server

To check what your database server currently has these values set to, run the following query in a MySQL console connected to your database server:

```sql
SHOW VARIABLES
   WHERE Variable_Name LIKE '%gtid_mode'
      OR Variable_Name LIKE '%binlog_format'
      OR Variable_Name LIKE '%expire_logs_days'
      OR Variable_Name LIKE '%binlog_expire_logs_seconds';
```

Cross-check these values with the table above and update if needed.

### Other issues

If you see an error when querying your PlanetScale database after the initial import that looks like:

```sql
ERROR 1105 (HY000): keyspace importkeyspace fetch error: node doesn't exist: [...]
```

This means the import process is underway, and this error should clear in a matter of 10-15 minutes after some additional processing by PlanetScale. If it does not, contact our [the PlanetScale support team](https://support.planetscale.com) and we will help troubleshoot the issue.

## Additional assistance

If you need additional assistance, contact our [the PlanetScale support team](https://support.planetscale.com), or join our [GitHub Discussion board](https://github.com/planetscale/discussion/discussions).
