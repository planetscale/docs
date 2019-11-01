---
title: 'Configuring a sharding scheme'
category: 'setting-up-your-planetscale-database'
---

# Configuring a sharding scheme

This document describes how to configure your database to use multiple shards.
For more information on how sharding works and how to structure your sharding scheme, see [Understanding sharding schemes](understanding-sharding-schemes).
## Overview

The PlanetScale Database allows you to scale your database by spreading the tables over multiple MySQL instances, or **shards**. The database continues to behave like a single MySQL database instance: sharding does not require a change to your application. Scaling the database further by increasing the number of shards requires a single configuration change.

To configure your database to use multiple shards, follow these steps:

1. Open your cluster overview.
1. Open your database overview. <!-- ? -->
1. Under **Sharding Scheme**, click **Edit**.
1. Enter a valid sharding scheme.
1. Click **Apply Sharding Scheme**.
