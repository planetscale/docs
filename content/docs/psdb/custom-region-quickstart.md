---
title: 'Quickstart: Custom Kubernetes Region'
# category: 'getting-started'
---

# Quickstart: Custom Kubernetes Region

This document shows how to get started using PlanetScaleDB as a managed MySQL database in your own Kubernetes cluster. By the end, you will have a working PlanetScaleDB in your own Kubernetes cluster that you can connect to using the MySQL command line tool.

## Prerequisites

Before beginning this quickstart, you must have the following software installed and configured:

+ Full administrator privileges on a Kubernetes region
+ A local installation of the [MySQL command line interface](https://dev.mysql.com/doc/refman/8.0/en/mysql.html)

For a list of required Kubernetes resources you need to be able to create, see [Custom region requirements](custom-region-requirements).

 
## Overview

This quickstart includes the following steps:

1. Create a PlanetScale account.
1. Create a custom region in your Kubernetes cluster.
1. Create a cluster in your custom region.
1. Create a database in your new cluster.
1. Find the MySQL connection string for your database.
1. Connect to your database using the MySQL command line tool.
1. Run a query against your database.

## Step 1. Create a PlanetScale account.

If you do not have a PlanetScale account, create one first.

Go to [console.planetscale.com](https://console.planetscale.com) and click _Sign up here._ Provide user account information. Payment information is not necessary for this quickstart.

## Step 2. Create a custom region in your Kubernetes cluster.

In the left menu of the PlanetScaleDB cluster, click **Custom K8s Regions**. In the pane to the right, click **Add your first custom Kubernetes Region**.

Follow the instructions in the **Configure Custom Region** Pane to prepare your Kubernetes cluster and deploy your custom region. These instructions are also available in the [Configure custom region](configure-custom-region) documentation.

For this quickstart, select **No backups** from the 'Storage Provider' dropdown under **Backup Store**. For production environments, you should select a backup provider and input storage bucket information.


## Step 3. Create a cluster in your custom region.

After creating your custom region, the **Custom Region Overview** screen appears. Click **Create Cluster**. Each cluster runs one or more databases.

In the **Create New Cluster** pane, specify the name for your cluster.

Under **Choose cloud provider and region**, select **Custom Kubernetes Region**. The **Region** dropdown should show the name of your new custom region.

Provide login credentials for the admin user under **Create default admin user**.

When you are done, click **Create Cluster**.

## Step 4. Create a database in your new cluster.

After creating a cluster, the **Overview** for your new cluster appears.

Click **Create Database**. In the **Create New Database** pane, specify the name for your database and the region where you want the database to run.

On the **Configure** screen, click **Create Database.** You do not need to change any of the default configuration options.

## Step 5. Find the MySQL connection string for your database.

After creating a database, the **Overview** for your new database appears. The current deployment status of your database appears in the **Status** pane. Your new database takes several minutes to deploy. When the status is "Deployed," you can connect to your new database.

To find the MySQL connection string for your database, click the **Connect** button in the upper-right of the **Overview** screen.

This displays the MySQL connection string for your database. This string contains the hostname, port number, user name, and password for your database. Click **Copy** to copy this string to your clipboard.

The connection string is formatted as follows:

```console
mysql --host {hostname} --port {port number} -p --user {username}
```

## Step 6. Connect to your database using the MySQL command line tool.

In your console, paste the connection string from your clipboard. Replace `{username}` with your [admin username](creating-database) and press enter. When the `mysql` client prompts you for a password, enter the password for your admin user.

You should see a MySQL shell prompt:

```console
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 83597
Server version: 5.7.9-Vitess

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

## Step 7. Run a query against your database.

Enter the following query against your PlanetScaleDB database:

```sql
mysql> SHOW DATABASES;
```

You should see a list of all of the databases in your [cluster](clusters):

```sql
mysql> SHOW DATABASES;
+-----------+
| Databases |
+-----------+
| test1     |
| test3     |
+-----------+
```

Congratulations! You now have a managed PlanetScaleDB database running on your Kubernetes cluster.

## Next steps

+ Learn how to [import data](importing-data) into PlanetScaleDB
+ Learn how to [create a database](creating-database) in PlanetScaleDB
