---
title: 'Database Links'
---

# Database Links

This document explains the basic ideas behind Database Links in the PlanetScaleDB context.

## What is a Database Link?

A Database Link allows you to connect to an external database via PlanetScaleDB. You can connect to a Database Link using a [PlanetScaleDB connection string](connecting-to-db) and issue queries to it; PlanetScaleDB will process these queries as if the database were hosted inside PlanetScaleDB, then issue them against your external database and return any results.

## Why link a database?

Linking your database to PlanetScaleDB allows you to test the compatibility of your database and queries with PlanetScaleDB. Because there are some [limitations to PlanetScaleDB compatibility with MySQL](mysql-compatibility), this feature allows you to test how PlanetScaleDB will respond to common queries from your application.

## How do databases links work?

When you [link a database](linking-database), you provide connection details for your external database. PlanetScaleDB uses these connection details to connect to your database, and creates a representation of this database inside your PlanetScaleDB cluster, called a *Database Link*. PlanetScaleDB processes queries to the database link similarly to queries against a fully-hosted [PlanetScaleDB database](databases), and returns similar errors in response to unsupported queries. PlanetScaleDB does not issue any queries or statements to your database beyond those you issue yourself.

The diagram below outlines the fully-hosted PlanetScaleDB architecture:

![Fully-hosted PlanetScaleDB architecture diagram](/img/docs/psdb-fully-hosted-database-architecture-diagram.png)

This second diagram outlines the PlanetScaleDB Database Link architecture:

![PlanetScaleDB Database Link architecture diagram](/img/docs/psdb-database-link-architecture-diagram.png)

## How does sharding work with database links?

After you create a database link, you have the option to apply a [sharding scheme](sharding-schemes) to the database link. PlanetScaleDB does not actually **shard**, or divide up, your external database. Instead, it processes queries against your database link as if it were sharded according to the sharding scheme. However, a single linked database has the performance and availability characteristics of an unsharded database, even if you apply a sharding scheme. This means that you can use linked database to test PlanetScaleDB compatibility, but not performance.


## What's next

- [Link a database](linking-external-database)
- [Connect to a database](connecting-to-db)
- [Learn about sharding schemes](sharding-schemes)
