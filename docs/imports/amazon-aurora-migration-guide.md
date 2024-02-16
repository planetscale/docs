---
title: Amazon Aurora migration guide
subtitle: Learn how to import your Amazon Aurora database into PlanetScale.
date: '2024-02-16'
---

## Overview

This document will demonstrate how to migrate a database from Amazon Aurora (MySQL compatible) to PlanetScale. We’ll also address some common issues associated with migrating from Amazon Aurora and how to resolve them.

{% callout %}
This guide assumes you are using Amazon Aurora (MySQL compatible) on RDS. If you are using MySQL on Amazon RDS, follow the [Amazon RDS for MySQL migration guide](/docs/imports/aws-rds-migration-guide). Other database systems (non-MySQL or MariaDB databases) available through RDS will not work with the PlanetScale import tool.
{% /callout %}

We recommend reading through the [Database import documentation](/docs/imports/database-imports) to learn how our import tool works before proceeding.

## Prerequisites

Before you can perform a migration, you’ll need to make sure the following is configured:

- [Your database’s GTID, sql_mode, and binlog_format settings are properly configured.](#configure-gtid-sql_mode-and-binlog-settings)
- [Your database’s binlog retention settings are properly configured.](#configure-binlog-retention-hours)
- The ability to create a new user in the database.
- [Your database is publicly accessible](#database-publicly-accessible).

You’ll also need to gather the following pieces of information from the AWS Console:

- Database cluster endpoint address (Note: Not the reader or writer instances)
- Port number (E.g., 3306)

The endpoint address and port number are located in the database view under “**Connectivity & security**” in your regional database cluster (not reader or writer instances).

![The Connectivity & security tab of the database in RDS.](/assets/docs/imports/amazon-aurora-migration-guide/the-connectivity-and-security-tab-of-the-database-in-aurora.jpg)

## Importing your database

### Step 1: Create a migration user

You will need to create a new set of credentials inside of your database for the migration tool to have the correct permissions. This MySQL script can be used to create a user with the necessary permissions inside of your database. You will need appropriate database permissions to run the script. The username will be `migration_user`. Make sure to update the following variables:

- `<SUPER_STRONG_PASSWORD>` &mdash; The password for the `migration_user` account.
- `<DATABASE_NAME>` &mdash; The name of the database you will import into PlanetScale.

```sql
CREATE USER 'migration_user'@'%' IDENTIFIED BY '<SUPER_STRONG_PASSWORD>';
GRANT PROCESS, REPLICATION SLAVE, REPLICATION CLIENT, RELOAD ON *.* TO 'migration_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE, SHOW VIEW, LOCK TABLES ON `<DATABASE_NAME>`.* TO 'migration_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER ON `ps\_import\_%`.* TO 'migration_user'@'%';
GRANT EXECUTE ON PROCEDURE mysql.rds_show_configuration TO 'migration_user'@'%';
```

Make sure to save the username and password in a safe location. You will need it when importing the database.

### Step 2: Configuring the RDS security group

In order for PlanetScale to connect to your RDS database, you must allow traffic into the database through the associated security group.

The specific IP addresses you will need to allow depend on the region where you plan to host your PlanetScale database. Check the right side of the Import tool form, which changes based on the region you select, or see the [Import tool public IP addresses docs](/docs/imports/import-tool-migration-addresses) to determine the IP addresses to allow before continuing. This guide will use the **AWS us-east-2 (Ohio)** region, so we’ll allow the following addresses:

```
3.209.149.66
3.215.97.46
34.193.111.15
18.117.23.127
3.131.243.164
3.132.168.252
3.131.252.213
3.132.182.173
3.15.49.114
```

To allow traffic to your database in AWS, navigate to the “**Connectivity & security**" tab of your writer instance (not the regional cluster) and click the link under **VPC security groups**.

![The Connectivity & security tab of the database view in RDS.](/assets/docs/imports/amazon-aurora-migration-guide/the-connectivity-and-security-tab-of-the-database-view-in-aurora.jpg)

In the lower pane of the next page, select the “**Inbound rules”** tab, then “**Edit inbound rules”**.

![The view of security groups associated with the RDS instance.](/assets/docs/imports/aws-rds-migration-guide/the-view-of-security-groups-associated-with-the-rds-instance.png)

Click the “**Add rule”** button and a new line will be added to the list of rules. Select **“MYSQL/Aurora”** as the **Type** and enter the first IP address from the list for your region. AWS will automatically reformat it to `x.x.x.x/32`, so you can select that when it appears. You’ll need to repeat this for every IP address you need to allow.

![The Edit inbound rules view where source traffic can be allowed.](/assets/docs/imports/aws-rds-migration-guide/the-edit-inbound-rules-view-where-source-traffic-can-be-allowed.png)

Once you have added all the necessary IP addresses for the selected region, click “**Save rules**” to apply the changes.

### Step 3: Using the PlanetScale import tool

In the PlanetScale dashboard, click “**New database”**, then “**Import database”**.

The Import database tool is currently in beta. If this is your first time accessing this feature, you will be prompted to opt into using the feature. Click “**Join beta”** to proceed.

Complete the form using the information gathered in the previous section. Click “**Connect to database”**, and the import tool will attempt to connect to your RDS instance.

![The Import external database form.](/assets/docs/imports/amazon-aurora-migration-guide/the-import-external-database-form.jpg)

The “**Connect to database**” button will update with the connection status.

{% callout %}
If your database uses foreign key constraints, we will detect them after successfully connecting to your external database and automatically enable foreign key constraint support for your database.
{% /callout %}

![The box showing you are successfully connected, ready to import rows, and have foreign key constraints](/assets/docs/imports/amazon-aurora-migration-guide/successfully-connected-box.jpg)

If the connection is successful and plan upgrades are complete (if the database is over 5 GB), click “**Continue import**” to migrate your data to PlanetScale.

{% callout type="warning" %}
If you receive an error, check the [Troubleshooting](#troubleshooting) section for information on correcting common configuration issues.
{% /callout %}

The following view will show you the progress of your data being imported:

![The Database import view during the initial import process.](/assets/docs/imports/amazon-aurora-migration-guide/the-database-import-view-during-the-initial-import-process.jpg)

You can learn more about each step of the database import process in the [database import documentation](/docs/imports/database-imports#import-process).

Once your database has finished importing, the view will update to show the database that was created in PlanetScale, as well as the option to enable primary mode. This button will make the PlanetScale version of the database the primary replica.

In step two, clicking “**Enable primary mode”** will display a modal where you can confirm that you want to make this change.

After primary mode is enabled, the last step in the flow will update to give you two options:

- **Enable replica mode** &mdash; Reverts the change performed in the previous step, making Aurora your primary once again.
- **Finish import** &mdash; Detaches the databases from replication. Future changes to either the PlanetScale database or the Aurora database will not be replicated to each other.

Click “**Finish import”** to complete the import process.

This concludes the process used to import a database into PlanetScale from Amazon Aurora.

## Troubleshooting

### Configure GTID, sql_mode, and binlog settings

If you see any errors below or want to make sure your Amazon Aurora database settings are correctly set, follow the following steps:

- `external database settings are not compatible with PlanetScale: "gtid_mode" must be "ON", but found: "OFF_PERMISSIVE"` (similar error for `enforce_gtid_consistency`)
- `external database settings are not compatible with PlanetScale: "log_bin" must be "ON", but found: "OFF"`
- `external database settings are not compatible with PlanetScale: PlanetScale requires "sql_mode" to have the following options set: "NO_ZERO_IN_DATE, NO_ZERO_DATE, ONLY_FULL_GROUP_BY"`

Your Amazon Aurora database is either using the default DB cluster parameter group (E.g., default.aurora-mysql8.0) or you are using a custom one. You can view it in the “**Configuration”** tab of your regional database cluster (not reader or writer instances).

![The Configuration tab of the database view in RDS.](/assets/docs/imports/amazon-aurora-migration-guide/the-configuration-tab-of-the-database-view-in-aurora.jpg)

1. If you are using the default DB cluster parameter group, you’ll need to create a new parameter group to reconfigure a few settings.

   To create a parameter group, select “**Parameter groups”** from the left nav and then “**Create parameter group”**.

   ![The Parameter groups view in RDS.](/assets/docs/imports/aws-rds-migration-guide/the-parameter-groups-view-in-rds.png)

   Specify the **Parameter group family**, **Type**, **Group name**, and **Description**. All fields are required.

   - Parameter group family: aurora-mysql8.0
   - Type: DB Cluster Parameter Group (Note: It is not DB Parameter Group type, which will not have all the same settings available.)
   - Group name: psmigrationgroup (or whatever you choose)
   - Description: Give it a descriptive name for your notes

   You’ll be brought back to the list of available parameter groups when you save.

2. Next, you need to edit the settings in your custom DB cluster parameter group. Select your new parameter group from the list to modify the settings.

   Click “**Edit parameters”** to unlock editing.

   ![The header of the view when editing a parameter group.](/assets/docs/imports/aws-rds-migration-guide/the-header-of-the-view-when-editing-a-parameter-group.png)

   Search for “**gtid”** in the search box, and update the following settings to match:

   - gtid-mode: ON
   - enforce_gtid_consistency: ON

   Search for “**sql_mode”** in the search box, and update the following settings to match:

   - sql_mode: NO_ZERO_IN_DATE,NO_ZERO_DATE,ONLY_FULL_GROUP_BY

   Search for **“binlog_format”** in the search box. Update that setting to match:

   - binlog_format: ROW

   Click “**Save changes”** once you are done.

3. Next, you must associate the DB cluster parameter group to the database. Select “**Databases”** from the left nav, select your database regional cluster (not the writer or reader instance), and click “**Modify”** from the toolbar.

   Scroll halfway down the page and find the section titled **Additional configuration**. Update the **DB cluster parameter group** to match the new group created earlier in this section. Scroll to the bottom and click “**Continue**”.

   ![The Additional configuration section of the database configuration view.](/assets/docs/imports/amazon-aurora-migration-guide/the-additional-configuration-section-of-the-database-configuration-view.jpg)

   You’ll be presented with options to apply the changes at the next maintenance window or immediately.

   - If you select **Apply during the next scheduled maintenance window**, the updated configuration group will be applied during that window.
   - If you select **Apply immediately**, the group will be applied immediately, but you must manually reboot the database for the changes to take effect.

   Once you’ve selected your desired option, click “**Modify DB instance”** to apply the changes.

4. You will need to reboot your database's writer instance to apply these specific settings. To reboot the writer instance, click the “**Actions”** button near the top of the screen, then “**Reboot”**. If you do not see a reboot option, ensure you are not selecting your database's regional cluster.

   {% callout type="warning" %}
   This will briefly disconnect any users who are actively using the database! Proceed with caution. The DB cluster parameter group will not apply without a reboot.
   {% /callout %}

   You’ll be presented with a page to confirm the database you want to reboot. Click "**Confirm”**, and the database will begin rebooting.

   You can view the status of the database in the primary list of databases for this account/region. This view does not refresh automatically, click the refresh icon to update the view.

If the settings are successfully applied, you should be able to complete the import process in the documentation above.

### Configure binlog retention hours

You may need to specify the number of hours to retain binary logs in your Amazon Aurora database.

By default, this value is `NULL`, which means that binary logs are purged immediately.

You need to specify a period with enough time for replication to occur. For most cases, 48 hours should be sufficient, but you may need to set it higher for large imports.

{% callout type="warning" %}
Keep in mind that you can go to longer binlog retention periods at the cost of extra disk space on your source database. You should evaluate how large your binlogs are for daily use to determine if you would like to increase the value beyond 48 hours, as there's a chance you may run out of disk space, depending on your configuration. If you need assistance, please contact the [PlanetScale Support team](https://support.planetscale.com/hc/en-us).
{% /callout %}

To specify the number of hours for Amazon RDS to retain binary logs on a DB instance, use the `mysql.rds_set_configuration()` stored procedure as shown in the following example:

```bash
call mysql.rds_set_configuration('binlog retention hours', 48);
```

Once you call this function, confirm that the value is set correctly by calling this function:

```bash
CALL mysql.rds_show_configuration;
```

```
+------------------------+-------+-----------------------------------------------------------------------------------------------------------+
| name                   | value | description                                                                                               |
+------------------------+-------+-----------------------------------------------------------------------------------------------------------+
| binlog retention hours | 48    | binlog retention hours specifies the duration in hours before binary logs are automatically deleted.      |
+------------------------+-------+-----------------------------------------------------------------------------------------------------------+
```

### Enable binary logging

If binary logging is disabled on your database cluster, you'll receive an error like this from the import tool:

```
"External database settings are not compatible with PlanetScale: log_bin must be ON, but found: OFF"
```

On RDS, binary logging can't be directly enabled by changing a parameter. Instead, to set `log_bin` to on, [enable automated backups](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html#USER_WorkingWithAutomatedBackups.Enabling) by setting their retention period to any value greater than zero days.

Once that change has been applied, you can verify that `log_bin` is `on` in a MySQL session:

```shell
mysql> show variables like 'log_bin';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| log_bin       | ON    |
+---------------+-------+
```

### Database publicly accessible

For PlanetScale to import your database, it needs to be publicly accessible. You can check in your AWS dashboard.

In the writer instance of your database cluster, go to the “**Connectivity & security**” tab, and under the “**Security**” you will see if your database is **publicly accessible**. If it says “No,” you will need to change it to be publicly accessible through the “**Modify**” button. If this is an issue, you cannot do this, or you have questions, please [contact us](/contact) to understand more about the import process or explore your options for importing your database.
