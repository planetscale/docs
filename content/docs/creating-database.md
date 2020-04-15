---
title: 'Create a database'
category: 'setting-up-your-planetscale-cndb'
---

# Create a database

This document explains how to create a database using the PlanetScale console.

## Prerequisites

Before you can create a database, you must first [create a cluster](creating-cluster).

## Overview

To create a database, complete the following steps:

## Step 1: Open the Overview page for a cluster.

When you create a new cluster, this page opens automatically. Otherwise, log in to the [PlanetScale console](https://console.planetscale.com/).

![Clusters view](/img/docs/clusters-view.png)

## Step 2: Select a cluster.

Click on the name of the cluster where your database will run. This will open the overview for the cluster.

## Step 3: Click **Create Database**.

In the cluster overview, click the **Create Database** button.

![Create your first Database](/img/docs/create-database.png)

This opens the **Create New Database** pane.

## Step 4: Name your database.

In the **Create New Database** pane, enter the name of your new database.

![Create New Database pane](/img/docs/create-new-database.png)

Database names can only contain lowercase alphanumeric characters.

By default, PlanetScale deploys your database immediately on creation. If you deselect this option, you have the option to deploy the database from the database **Overview** later.

## Step 5: Select regions.

In the **Create New Database** pane, select a region from the **Region Deployment** card. You can choose from the regions and cloud providers that this cluster supports.

## Step 6: Assign resources to your instance.

Under **Instance Configuration**, select the amount of CPU, RAM, and storage for each instance.

![Instance Configuration section](/img/docs/instance-configuration.png)

The **Cost per instance** calculator below shows the hourly cost for the current instance configuration.

## Step 7: Choose the number of instances

Under **Number of instances**, choose the number of [database instances](database instances) and [analytics instances](analytics-instances) per [shard](sharding-schemes).

![Number of instances section](/img/docs/number-of-instances.png)

The **Cost per shard** calculator below shows the hourly cost for the current number of instances per shard.

Note: PlanetScale does not recommend databases with fewer than three database instances per shard for production environments, because they may not survive a partial region outage and are subject to downtimes of up to 30 seconds during scheduled maintenance procedures.

## Step 8: Choose the number of shards

Under **Sharding**, choose **Unsharded** or **Sharded**. For a sharded database, select the number of shards.

![Sharding section](/img/docs/sharding-section.png)

The **Total cost** calculator below shows the overall hourly cost of your database. Because each shard contains the selected number of instances, the total cost of the database is the number of shards multiplied times the number of instances.

## Step 9: Click **Create Database**.

By default, your database deploys immediately. This process can take up to several minutes.

Once your database is ready, the **Cluster Overview** displays its status as **Deployed**.

## Step 10 (Optional): Click your database name.

This opens the **Database Overview** for your new database.

## Step 11 (Optional): Click **Deploy**.

If you deselected **Deploy on creation** in **Step 4** above, you can deploy it at any time from the **Database Overview**.

## See also

- Learn more about [sharding](sharding-schemes).
- Read about our [pricing model](pricing).
