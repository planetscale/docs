---
title: Azure Database for MySQL migration guide
subtitle: Learn how to import your database from Azure Database for MySQL into PlanetScale.
date: '2022-08-01'
---

## Overview

This document will demonstrate how to migrate a database from Azure Database for MySQL to PlanetScale.

## Prerequisites

Before you can perform the migration, you’ll need to gather the following information from you MySQL instance in Azure:

- Server name

- Server admin login name

- Server admin password

- Database name

The server name and admin login name can be located on the **Overview** tab of the MySQL instance in Azure.

![The server name and server admin login name located in the Azure dashboard. {priority}](/assets/docs/imports/azure-database-for-mysql-migration-guide/the-server-name-and-server-admin-login-name-located-in-the-azure-dashboard.png)

The server admin password is the same password you set when initially creating the database instance.

To view your available databases, select the **Databases** tab from the sidebar.

![The databases tab of the Azure dashboard. {priority}](/assets/docs/imports/azure-database-for-mysql-migration-guide/the-databases-tab-of-the-azure-dashboard.png)

## Configure firewall rules

In order for PlanetScale to connect to your Azure database, you must allow traffic into the database through the associated security group. The specific IP addresses you will need to allow depend on the region you plan to host your PlanetScale database. Check the [Import tool public IP addresses page](/docs/imports/import-tool-migration-addresses) to determine the IP addresses to allow before continuing. This guide will use the **AWS us-east-1 (North Virginia)** region so we’ll allow the following addresses:

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

To allow traffic into your Azure database, navigate to the “**Networking**” section from the sidebar and locate the **Firewall rules** section. There are already a series of inputs allowing you to add entries into the Firewall rules, each of which will permit network traffic from that IP address. Add a new entry for each address required, then click “Save” from the toolbar.

![The networking tab of the Azure dashboard.](/assets/docs/imports/azure-database-for-mysql-migration-guide/the-networking-tab-of-the-azure-dashboard.png)

## Configure MySQL server settings

There are two settings that need to be configured before you can import your database:

- gtid_mode

- enforce_gtid_consistency

To access these settings in Azure, select “**Server parameters**” from the sidebar and enter “**gtid**” in the search bar. Set both “**enforce_gtid_consistency**” and “**gtid_mode**” to “**ON**”. Click “Save”

{% callout %}
For “**gtid_mode**”, you’ll need to update the value in sequence displayed in the dropdown until it is set to “**ON**”. For example, if the current setting is “**OFF_PERMISSIVE**”, you’ll need to first change it to “**ON_PERMISSIVE**”, save the changes, then set it to “**ON**” in that order.
{% /callout %}

![How to access gtid settings in the Azure dashboard.](/assets/docs/imports/azure-database-for-mysql-migration-guide/how-to-access-gtid-settings-in-the-azure-dashboard.png)

## Import your database

In the PlanetScale dashboard, click “**New database”**, then “**Import database”**.

![The default view of all databases in the PlanetScale organization.](/assets/docs/imports/azure-database-for-mysql-migration-guide/the-default-view-of-all-databases-in-the-planetscale-organization.png)

At the time of writing this, the Import database feature is in beta. If this is your first time accessing this feature, you will be prompted to opt into using the feature. Click “**Join beta”** to proceed.

![The Join beta view.](/assets/docs/imports/azure-database-for-mysql-migration-guide/the-join-beta-view.png)

Complete the form using the information gathered in the previous section. Also make sure the “**SSL Verification”** field is set to “**Verify certificate and hostname**”. Click “**Connect to database”** and the import tool will attempt to connect to your Azure MySQL instance.

![The Import external database form.](/assets/docs/imports/azure-database-for-mysql-migration-guide/the-import-external-database-form.png)

If the connection was successful, you’ll see the following message. Click “**Begin database import”** to start importing data.

![The message that shows at the bottom of the form indicating that the connection was successful.](/assets/docs/imports/azure-database-for-mysql-migration-guide/the-message-that-shows-at-the-bottom-of-the-form-indicating-that-the-connection-was-successful.png)

The following view will show you the progress of your data being imported.

![The Database import view during the initial import process.](/assets/docs/imports/azure-database-for-mysql-migration-guide/the-database-import-view-during-the-initial-import-process.png)

Once your database has finished importing, the view will update to show the database that was created in PlanetScale, as well as the option to enable primary mode. This button will make the PlanetScale version of the database the primary replica. Clicking “**Enable primary mode”** will display a modal where you can confirm that you want to make this change.

![The Database import view once the initial import has been completed.](/assets/docs/imports/azure-database-for-mysql-migration-guide/the-database-import-view-once-the-initial-import-has-been-completed.png)

After primary mode is enabled, the third card in the flow will update to give you two options:

- **Enable replica mode** &mdash; Reverts the change performed in the previous step, making Azure your primary once again.
- **Finish import** &mdash; Detaches the databases from replication. Future changes to either the PlanetScale database or the Azure database will not be replicated to each other.

Click “**Finish import”** to complete the import process. Confirm in the modal that will be displayed.

![The Database import view after the PlanetScale database has been flagged as the primary database.](/assets/docs/imports/azure-database-for-mysql-migration-guide/the-database-import-view-after-the-planetscale-database-has-been-flagged-as-the-primary-database.png)

This concludes the process used to import a database into PlanetScale from Azure Database for MySQL.
