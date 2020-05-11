---
title: 'Create a cluster'
category: 'setting-up-your-planetscaledb'
---

# Create a cluster

Before you can create a database, you must first create a cluster.
This document explains how to create a cluster using the PlanetScale console.

## Overview

To create a cluster, complete the following steps:

1. Create a Cluster.
1. Click **Create Cluster**.
1. Name your cluster.
1. Choose **Single region** or **multi-region and multi-cloud**.
1. Choose cloud providers and regions.
1. Click **Create Cluster**.

## Step 1: Open the clusters view.

When you create a PlanetScale.com account, you are prompted to create a cluster. You can also access this view by going to [console.planetscale.com/clusters](https://console.planetscale.com/clusters).

![Create your first cluster screen](/img/docs/create-your-first-cluster.png)

## Step 2: Click **Create Cluster**.

## Step 3: Name your cluster.

After clicking **Create Cluster**, you are prompted to name your cluster.

![Create new cluster screen](/img/docs/create-new-cluster.png)

The name of your cluster is prepended with your account name, and must be unique.

## Step 4: Select **Single Region** or **Multi-region and Multi-cloud**

If you want to deploy your database to more than one cloud provider or region, choose **Multi-region and Multi-cloud**.

## Step 5: Select cloud providers and regions.

If you are creating a **Single Region** cluster, select the cloud provider and region for your cluster.

If you are creating a **Multi-Region and Multi-Cloud** cluster, select each region where you wish to deploy your database. Once you deploy your cluster, you can only deploy databases to the regions you select for that cluster.

In order to use more than one region, you must select at least three total regions. You may select multiple regions in a single cloud provider.

## Step 6: Click **Create Cluster**.

When you have selected a name and region for your cluster, click **Create Cluster**.

## What's next

Now that you have a cluster, you can [create a database](creating-database).
