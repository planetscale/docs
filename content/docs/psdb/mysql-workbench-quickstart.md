---
title: 'MySQL Workbench Quickstart'
category: 'getting-started'
---

# MySQL Workbench Quickstart

This document shows how to get started using PlanetScaleDB. By the end, you will have a working PlanetScaleDB that you can connect to using MySQL Workbench.

## Prerequisites

Before beginning this tutorial, you must [install MySQL Workbench](https://dev.mysql.com/doc/workbench/en/wb-installing.html).

## Overview

This quickstart includes the following steps:

1. Create a PlanetScale account.
2. Create a cluster.
3. Create a database.
4. Find the MySQL connection string for your database.
5. Connect to your database using MySQL Workbench.
6. Run a query against your database.

## Step 1. Create a PlanetScale account.

If you do not have a PlanetScale account, create one first.

Go to [console.planetscale.com](https://console.planetscale.com) and click _Sign up here._ Provide user account information. Payment information is not necessary for this quickstart.

<!-- Is it true that payment information is not necessary for this quickstart?-->

## Step 2. Create a cluster

After creating an account, the **Clusters** screen appears. Click **Create Cluster.** Each cluster runs one or more databases.

In the **Create New Cluster** pane, specify the name for your cluster and the cloud provider and region where you want the cluster to run.

## Step 3. Create a database

After creating a cluster, the **Overview** for your new cluster appears.

Click **Create Database**. In the **Create New Database** pane, specify the name for your database and the region where you want the database to run.

On the **Configure** screen, click **Create Database.** You do not need to change any of the default configuration options.

## Step 4. Find the MySQL connection string for your database.

After creating a database, the **Overview** for your new database appears. The current deployment status of your database appears in the **Status** pane. Your new database takes several minutes to deploy. When the status is "Deployed," you can connect to your new database.

To find the MySQL connection string for your database, click the **Connect** button in the upper-right of the **Overview** screen.

This displays the MySQL connection string for your database. This string contains the hostname, port number, user name, and password for your database. Click **Copy** to copy this string to your clipboard.

## Step 5. Connect to your database using MySQL Workbench.

Open MySQL Workbench and click **New Connection**. In the "Set up a New Connection" dialog box, enter the connection credentials contained in your connection string.

The connection string is formatted as follows:

```
--host [hostname] --port [port number] --user [username] --password=[password]
```

Click **Okay**. Your database should now appear as a connection in MySQL Workbench, and the SQL Query Tab for your database should open.

## Step 6. Run a query against your database.

In the SQL Query Tab for your database, enter the following query:

```
SHOW DATABASES;
```

This query returns the following output:

![MySQL Workbench Query Tab](/img/docs/mysql-workbench-show-databases-screenshot.png)

<!-- What's next section with links to how-to docs. -->
