---
title: 'Configure IP address based access'
category: 'setting-up-your-planetscale-database'
---

# Configure IP address based access

This document describes how to allow specific IP addresses to connect to your PlanetScaleDB cluster.

## Overview

PlanetScaleDB handles connection security at the [cluster](clusters) level. By default, your PlanetScaleDB cluster only accepts connections from your IP address. To specify additional IP addresses that can connect to your cluster, you can update the **IP Access List**. To do so, follow these steps:

1. Go to your [PlanetScale console](https://console.planetscale.com).
1. Click on your cluster.
1. Click **Connection Security**.
1. In the **IP Access List** panel, click **Edit**.
1. Enter the address you wish to allow.
1. Click **Save changes.**

## Step 1. Go to the [PlanetScale console](https://console.planetscale.com).

This opens the **Clusters Overview**.

## Step 2. Click on your cluster name.

This opens the **Overview** for your cluster.

## Step 3. Click the **Connection Security** tab.

![Connection Security tab](/img/docs/connection-security-tab.png)

This displays the **Certificate Authority** and **IP Access List** panels. The **IP Access List** panel displays all addresses that can currently access your cluster, in CIDR Block format. When you first create a cluster, this list should only contain your IP address.

## Step 4. In the **IP Access List** panel, click **Edit**.

## Step 5. Enter the address you wish to allow.

All addresses must be in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation). You can use CIDR notation to specify a range of addresses to approve.

Press `Enter` to add the CIDR block to the table below.

After you input a valid CIDR block, the canonical version of that block will appear below the input box. This canonical version will appear on your IP Access List.

Repeat this step for any additional addresses you wish to allow.

## Step 6. Click **Save changes.**

The new IP addresses can now connect to your PlanetScaleDB.

## See also

- [Connecting to your database](connecting-to-db)
- [Securing the connection to your database](secure-connection)
- [Using Encrypted Connections](https://dev.mysql.com/doc/refman/5.7/en/encrypted-connections.html) on [mysql.com](https://dev.mysql.com).
