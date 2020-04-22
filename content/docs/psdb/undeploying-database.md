---
title: 'Undeploying a database'
category: 'using-your-planetscaledb'
---

# Undeploying a database

This document describes how to undeploy your database from the PlanetScale console. This will delete the data in the database.

## Prerequisites

This document assumes you have [created a database](psdb/creating-database) and deployed it.

## Overview

To create a database, follow these steps:

1. Go to the [PlanetScale console](https://console.planetscale.com).
1. Click on your cluster.
1. Click on your database.
1. Click the **Undeploy** button.
1. Type the name of the database.
1. Click **Confirm**.

## Step 1. Go to the [PlanetScale console](https://console.planetscale.com).

This opens the **Clusters Overview**.

## Step 2. Click on your cluster name.

This opens the **Overview** for your cluster.

## Step 3. Click on your database name.

This opens the **Overview** for your database.

## Step 4. Click the **Undeploy** button.

![Undeploy button](/img/docs/undeploy.png)

This opens the **Undeploy database?** dialog.

## Step 5. Type your database name in the field.

To confirm that you wish to undeploy your database, type the name of the database in the field.

## Step 6. Click **Confirm**.

**Note:** This deletes the data in your database. However, database backups and configuration persist. You can redeploy at any time. Redeployment restores your database from the latest backup.
