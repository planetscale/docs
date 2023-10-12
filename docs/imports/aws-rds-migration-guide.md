---
title: AWS RDS migration guide
subtitle: Learn how to import your database from AWS RDS into PlanetScale.
date: '2022-08-01'
---

## Overview

This document will demonstrate how to migrate a database from AWS Relational Database Services (RDS) to PlanetScale. We’ll also address some common issues associated with migrating from RDS and how to resolve them.

{% callout %}
This guide assumes you are using MySQL on RDS. Other database systems available through RDS will not work with the
PlanetScale import tool.
{% /callout %}

## Prerequisites

Before you can perform a migration, you’ll need to make sure the following is configured:

- [Your database’s GTID and binlog_format settings are properly configured.](#configure-gtid-and-binlog-settings)
- [Your database’s binlog retention settings are properly configured.](#configure-binlog-retention-hours)

You’ll also need to gather the following pieces of information from the AWS Console:

- Endpoint address

- Port number

- Master username & password

The endpoint address and port number are located in the database view under “**Connectivity & security”**.

![The Connectivity & security tab of the database in RDS. {priority}](/assets/docs/imports/aws-rds-migration-guide/the-connectivity-and-security-tab-of-the-database-in-rds.png)

The master username can be located under the “**Configuration”** tab. The master password will be the password used when the database was first created.

![The Configuration tab of the database in RDS.](/assets/docs/imports/aws-rds-migration-guide/the-configuration-tab-of-the-database-in-rds.png)

{% callout %}
If you don’t know the admin password, you can create a new set of credentials using the information on the [Import
tool user permissions page](/docs/imports/import-tool-user-requirements) to create an account that can be used to
import your database.
{% /callout %}

## Configuring the RDS security group

In order for PlanetScale to connect to your RDS database, you must allow traffic into the database through the associated security group. The specific IP addresses you will need to allow depend on the region you plan to host your PlanetScale database. Check the [Import tool public IP addresses page](/docs/imports/import-tool-migration-addresses) to determine the IP addresses to allow before continuing. This guide will use the **AWS us-east-1 (North Virginia)** region so we’ll allow the following addresses:

```
3.209.149.66
3.215.97.46
34.193.111.15
23.23.187.137
52.6.141.108
52.70.2.89
50.17.188.76
52.2.251.189
52.72.234.74
35.174.68.24
52.5.253.172
54.156.81.4
34.200.24.255
35.174.79.154
44.199.177.24
```

To allow traffic to your database in AWS, navigate to the “**Connectivity & security**" tab of the database, and click the link under **VPC security groups**.

![The Connectivity & security tab of the database view in RDS.](/assets/docs/imports/aws-rds-migration-guide/the-connectivity-and-security-tab-of-the-database-view-in-rds.png)

In the lower pane of the next page, select the “**Inbound rules”** tab, then “**Edit inbound rules”**.

![The view of security groups associated with the RDS instance.](/assets/docs/imports/aws-rds-migration-guide/the-view-of-security-groups-associated-with-the-rds-instance.png)

Click the “**Add rule”** button, and a new line will be added to the list of rules. Select **“MYSQL/Aurora”** as the **Type** and enter the first IP address from the list for your region. AWS will automatically reformat it to `x.x.x.x/32`, so you can select that when it appears. You’ll need to repeat this for every IP address you need to allow.

![The Edit inbound rules view where source traffic can be allowed.](/assets/docs/imports/aws-rds-migration-guide/the-edit-inbound-rules-view-where-source-traffic-can-be-allowed.png)

Once you are finished adding all of the necessary IP addresses for the selected region, click “**Save rules**” to apply the changes.

## Importing your database

In the PlanetScale dashboard, click “**New database”**, then “**Import database”**.

![The default view of all databases in the PlanetScale organization.](/assets/docs/imports/aws-rds-migration-guide/the-default-view-of-all-databases-in-the-planetscale-organization.png)

At the time of this writing, the Import database feature is in beta. If this is your first time accessing this feature, you will be prompted to opt into using the feature. Click “**Join beta”** to proceed.

![The Join beta view.](/assets/docs/imports/aws-rds-migration-guide/the-join-beta-view.png)

Complete the form using the information gathered in the previous section. Click “**Connect to database”** and the import tool will attempt to connect to your RDS instance.

![The Import external database form.](/assets/docs/imports/aws-rds-migration-guide/the-import-external-database-form.png)

If the connection was successful, you’ll see the following message. Click “**Begin database import”** to start importing data.

![The message that shows at the bottom of the form indicating that the connection was successful.](/assets/docs/imports/aws-rds-migration-guide/the-message-that-shows-at-the-bottom-of-the-form-indicating-that-the-connection-was-successful.png)

{% callout type="warning" %}
If you receive an error, check the [Troubleshooting](#troubleshooting) section for information on correcting common configuration issues.
{% /callout %}

The following view will show you the progress of your data being imported.

![The Database import view during the initial import process.](/assets/docs/imports/aws-rds-migration-guide/the-database-import-view-during-the-initial-import-process.png)

Once your database has finished importing, the view will update to show the database that was created in PlanetScale, as well as the option to enable primary mode. This button will make the PlanetScale version of the database the primary replica. Clicking “**Enable primary mode”** will display a modal where you can confirm that you want to make this change.

![The Database import view once the initial import has been completed.](/assets/docs/imports/aws-rds-migration-guide/the-database-import-view-once-the-initial-import-has-been-completed.png)

After primary mode is enabled, the third card in the flow will update to give you two options:

- **Enable replica mode** &mdash; Reverts the change performed in the previous step, making RDS your primary once again.
- **Finish import** &mdash; Detaches the databases from replication. Future changes to either the PlanetScale database or the RDS database will not be replicated to each other.

Click “**Finish import”** to complete the import process. Confirm in the modal that will be displayed.

![The Database import view after the PlanetScale database has been flagged as the primary database.](/assets/docs/imports/aws-rds-migration-guide/the-database-import-view-after-the-planetscale-database-has-been-flagged-as-the-primary-database.png)

This concludes the process used to import a database into PlanetScale from AWS RDS.

## Troubleshooting

### Enable binary logging

If binary logging is disabled on your RDS server, you'll receive an error like this from the importer: "External database settings are not compatible with PlanetScale: log_bin must be ON, but found: OFF".

On RDS MySQL servers, binary logging can't be directly enabled by changing a parameter. Instead, to set `log_bin` to on, [enable automated backups](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html#USER_WorkingWithAutomatedBackups.Enabling) by setting their retention period to any value greater than zero days.

Once that change has been applied, you can verify that `log_bin` is `on` in a MySQL session:

```
mysql> show variables like 'log_bin';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| log_bin       | ON    |
+---------------+-------+
```

### Configure GTID and binlog settings

![One of the GTID errors that display in the PlanetScale Import database form when the connection is not successful.](/assets/docs/imports/aws-rds-migration-guide/one-of-the-gtid-errors-that-display-in-the-planetscale-import-database-form-when-the-connection-is-not-successful.png)

Navigate to your RDS instance and check the parameter group in the “**Configuration”** tab. If you are using the default, you’ll need to create a new parameter group to reconfigure the GTID settings.

![The Configuration tab of the database view in RDS.](/assets/docs/imports/aws-rds-migration-guide/the-configuration-tab-of-the-database-view-in-rds.png)

To create a parameter group, select “**Parameter groups”** from the left nav and then “**Create parameter group”**.

![The Parameter groups view in RDS.](/assets/docs/imports/aws-rds-migration-guide/the-parameter-groups-view-in-rds.png)

Specify the **Parameter group family**, **Type**, **Group name**, and **Description**. All fields are required.

![The form used to create a parameter group.](/assets/docs/imports/aws-rds-migration-guide/the-form-used-to-create-a-parameter-group.png)

When you save, you’ll be brought back to the list of available parameter groups. Select your new parameter group from the list to modify the settings.

![The list of parameter groups in RDS.](/assets/docs/imports/aws-rds-migration-guide/the-list-of-parameter-groups-in-rds.png)

Click “**Edit parameters”** to unlock editing.

![The header of the view when editing a parameter group.](/assets/docs/imports/aws-rds-migration-guide/the-header-of-the-view-when-editing-a-parameter-group.png)

Search for **“binlog_format”** in the search box. Update that setting to match:

- binlog_format: ROW

![The binlog_format configuration required.](/assets/docs/imports/aws-rds-migration-guide/the-binlog_format-configuration-required.png)

Search for “**gtid”** in the search box, and update the following settings to match:

- gtid-mode: ON

- enforce_gtid_consistency: ON

Click “**Save changes”** once you are done.

![The GTID configurations that are required.](/assets/docs/imports/aws-rds-migration-guide/the-gtid-configurations-that-are-required.png)

Now you need to associate the parameter group to the database. Select “**Databases”** from the left nav, check the **select box** next to your database, and click “**Modify”** from the toolbar.

![The list of databases in RDS.](/assets/docs/imports/aws-rds-migration-guide/the-list-of-databases-in-rds.png)

Scroll about halfway down the page and find the section titled **Additional configuration**. Update the **DB parameter group** to match the new group created earlier in this section. Scroll to the bottom and click “**Continue**”.

![The Additional configuration section of the database configuration view.](/assets/docs/imports/aws-rds-migration-guide/the-additional-configuration-section-of-the-database-configuration-view.png)

You’ll be presented with options to apply the changes at the next maintenance window or immediately.

- If you select **Apply during the next scheduled maintenance window**, the updated configuration group will be applied during that window.

- If you select **Apply immediately**, the group will be applied immediately but you must manually reboot the database for the changes to take effect.

Once you’ve selected your desired option, click “**Modify DB instance”** to apply the changes.

![The confirmation view that is displayed when modifying RDS database settings.](/assets/docs/imports/aws-rds-migration-guide/the-confirmation-view-that-is-displayed-when-modifying-rds-database-settings.png)

If you opted to apply the changes immediately, you can monitor the status on the “**Configuration”** tab of the database view. The page does not automatically update, so you’ll need to refresh the page to check the status when it updates.

![The configuration tab with the new parameter group applying.](/assets/docs/imports/aws-rds-migration-guide/the-configuration-tab-with-the-new-parameter-group-applying.png)

![The configuration tab with the Pending reboot status.](/assets/docs/imports/aws-rds-migration-guide/the-configuration-tab-with-the-pending-reboot-status.png)

To reboot the database, click the “**Modify”** button near the top of the screen, then “**Reboot”**.

{% callout type="warning" %}
This will disconnect any users who are actively using the database! Proceed with caution.
{% /callout %}

![The database view & where the option to reboot the database is located.](/assets/docs/imports/aws-rds-migration-guide/the-database-view-and-where-the-option-to-reboot-the-database-is-located.png)

You’ll be presented with a page to confirm the database you want to reboot. Click "**Confirm”** and the database will begin rebooting.

![The confirmation dialog to reboot the database.](/assets/docs/imports/aws-rds-migration-guide/the-confirmation-dialog-to-reboot-the-database.png)

You can view the status of the database in the primary list of databases for this account/region. This view does not refresh automatically, click the “**Refresh”** button to update the view.

![A view of the databases in RDS with status & the refresh button highlighted.](/assets/docs/imports/aws-rds-migration-guide/a-view-of-the-databases-in-rds-with-status-and-the-refresh-button-highlighted.png)

### Configure binlog retention hours

You may need to specify the number of hours to retain binary logs in your AWS RDS database.

By default, this value is `NULL`, which means that binary logs are purged immediately.

You need to specify a period with enough time for replication to occur. For most cases, 48 hours should be sufficient, but you may need to set it higher for large imports.

{% callout type="warning" %}
Keep in mind, you can go to longer binlog retention periods at the cost of extra disk space on your source database. You should evaluate how large your binlogs are for daily use to determine if you would like to increase the value beyond 48 hours, as there's a chance you may run out of disk space, depending on your configuration. If you need assistance, please reach out to the [PlanetScale Support team](https://support.planetscale.com/hc/en-us).
{% /callout %}

To specify the number of hours for Amazon RDS to retain binary logs on a DB instance, use the `mysql.rds_set_configuration()` stored procedure as shown in the following example:

```bash
call mysql.rds_set_configuration('binlog retention hours', 48);
```

Once you call this function, confirm that the value is set correctly by calling this function:

```bash
CALL mysql.rds_show_configuration;

+------------------------+-------+-----------------------------------------------------------------------------------------------------------+
| name                   | value | description                                                                                               |
+------------------------+-------+-----------------------------------------------------------------------------------------------------------+
| binlog retention hours | 48    | binlog retention hours specifies the duration in hours before binary logs are automatically deleted.      |
+------------------------+-------+-----------------------------------------------------------------------------------------------------------+
```
