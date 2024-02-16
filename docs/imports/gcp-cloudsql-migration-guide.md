---
title: GCP CloudSQL Migration Guide
subtitle: Learn how to migrate your database from Google Cloud Platform (GCP) CloudSQL MySQL Cluster into PlanetScale using our Import tool.
date: '2024-02-16'
---

## Overview

This document will demonstrate how to migrate a database from Google Cloud Platform (GCP) CloudSQL MySQL Cluster to PlanetScale using our [Import tool](/docs/imports/database-imports).

{% callout %}
This guide assumes you are using MySQL on GCP. Other database systems available through GCP will not work with the
PlanetScale import tool.
{% /callout %}

We recommend reading through the [Database import documentation](/docs/imports/database-imports) to learn how our import tool works before proceeding.

## Prerequisites

You’ll also need to gather the following pieces of information from the GCP Console:

- Public IP address
- Database name
- Root username and password

The public IP address can be found in the **Overview tab** of your CloudSQL cluster under the **Connect to this instance** section.

![The GCP CloudSQL console with the IP address highlighted. {priority}](/assets/docs/imports/gcp-cloudsql-migration-guide/the-gcp-cloudsql-console-with-the-ip-address-highlighted.png)

A list of your databases can be found in the **Databases** tab. In this guide, we’ll be using the `tasksdb` database.

![The Databases list in the GCP console.](/assets/docs/imports/gcp-cloudsql-migration-guide/the-databases-list-in-the-gcp-console.png)

The `root` username is the account set up by default for all CloudSQL instances. The password for that account was set during the creation of the instance.

{% callout %}
If you don’t know the admin password, you can create a new set of credentials using the information on the [Import
tool user permissions page](/docs/imports/import-tool-user-requirements) to create an account that can be used to
import your database.
{% /callout %}

## Allow PlanetScale to connect to your CloudSQL instance

For PlanetScale to connect to your database, you’ll need to update the Authorized networks for your cluster. The specific IP addresses to permit depend on the region selected for your new database, which is in the **New database** section of the import tool in the **Region** field.

![The New database section of the Import database tool.](/assets/docs/imports/gcp-cloudsql-migration-guide/the-database-import-tool-region.png)

You will need to allow traffic for each IP address listed under that region on the [Import tool public IP addresses](/docs/imports/import-tool-migration-addresses) page. You can also find these listed in the “**Import external database**” page. To permit traffic from these IP addresses to your database in GCP, select **Connections** from the navigation on the left. Under **Authorized networks**, click “**Add network**”. This will display an inline form for you to add a network. The name of the field is arbitrary, but the **Network** field should contain the IP address that needs access to your database. Click “**Done**” to add the new entry. Perform this step for each IP address for the selected region, then click “**Save**” to apply the settings.

![The form to add a new authorized network in the GCP console.](/assets/docs/imports/gcp-cloudsql-migration-guide/the-form-to-add-a-new-authorized-network-in-the-gcp-console.png)

## Configure MySQL server settings

There is one flag that needs to be configured before you can import your database:

- binlog_expire_logs_seconds

To set a flag in your GCP console, go to your database's “**Overview**” page, select the “**Edit**” button, and then scroll down to the “**Flags**” section.

You want to select the “**binlog_expire_logs_seconds**” flag and set it to `172800` seconds.

Make sure to select the “**Done**” button.

## Importing your database

In the PlanetScale dashboard, click “**New database**”, then “**Import database**”.

![The default view of all databases in the PlanetScale organization.](/assets/docs/imports/gcp-cloudsql-migration-guide/the-default-view-of-all-databases-in-the-planetscale-organization.png)

At the time of this writing, the Import database feature is in beta. If this is your first time accessing this feature, you will be prompted to opt into using the feature. Click “**Join beta”** to proceed.

![The Join beta view.](/assets/docs/imports/gcp-cloudsql-migration-guide/the-join-beta-view.png)

Complete the form using the information gathered in the previous section. Click "**Connect to database”** and the import tool will attempt to connect to your GCP CloudSQL instance.

![The Import database form.](/assets/docs/imports/gcp-cloudsql-migration-guide/the-import-database-form.png)

The “**Connect to database**” button will update with the connection status.

{% callout %}
If your database uses foreign key constraints, we will detect them after successfully connecting to your external database and automatically enable foreign key constraint support for your database.
{% /callout %}

If the connection is successful and plan upgrades are complete (if the database is over 5 GB), click “**Begin database import**” to migrate your data to PlanetScale.

The following view will show you the progress of your data being imported.

![The Database import view during the initial import process.](/assets/docs/imports/gcp-cloudsql-migration-guide/the-database-import-view-during-the-initial-import-process.png)

Once your database has finished importing, the view will update to show the database that was created in PlanetScale, as well as the option to enable primary mode. This button will make the PlanetScale version of the database the primary replica. Clicking “**Enable primary mode”** will display a modal where you can confirm that you want to make this change.

![The Database import view once the initial import has been completed.](/assets/docs/imports/gcp-cloudsql-migration-guide/the-database-import-view-once-the-initial-import-has-been-completed.png)

After primary mode is enabled, the third card in the flow will update to give you two options. **Enable replica mode** will revert the change performed in the previous step, whereas **Finish import** will detach the databases from replication and future changes to either the PlanetScale database or the CloudSQL database will not be replicated to each other. Click “**Finish import”** to complete the import process. Confirm in the modal that will be displayed.

![The Database import view after the PlanetScale database has been flagged as the primary database.](/assets/docs/imports/gcp-cloudsql-migration-guide/the-database-import-view-after-the-planetscale-database-has-been-flagged-as-the-primary-database.png)

This concludes the process used to import a database into PlanetScale from GCP CloudSQL.
