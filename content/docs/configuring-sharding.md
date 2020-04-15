---
title: 'Configure sharding scheme'
category: 'setting-up-your-planetscale-cndb'
---

# Configure sharding scheme

This document describes how to configure your database to use multiple shards.

For more information on how sharding works and how to structure your sharding scheme, see [Sharding schemes](sharding-schemes).

## Overview

The PlanetScaleDB allows you to scale your database by spreading the tables over multiple MySQL instances, or **shards**. The database continues to behave like a single MySQL database instance: sharding does not require a change to your application. Scaling the database further by increasing the number of shards requires a single configuration change.

To configure your database to use multiple shards, follow these steps:

1. Open your cluster overview.
1. Open your database overview. <!-- ? -->
1. Under **Sharding Scheme**, click **Edit**.
1. Enter a valid sharding scheme.
1. Click **Apply Sharding Scheme**.

## Resharding

If you want to update your sharding scheme after importing data, contact PlanetScale at <support@planetscale.com>.
