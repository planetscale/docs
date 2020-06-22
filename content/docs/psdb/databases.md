---
title: 'Databases'
---

# Databases

This document explains the basic ideas behind databases in the PlanetScaleDB context.

## What is a PlanetScaleDB database?

A PlanetScaleDB database is like a MySQL database that can scale horizontally using [sharding](sharding-schemes). Each database runs on a [cluster](clusters). A database deploys to one or more of the cloud providers and regions which that cluster supports.

You can assign resources to each database at the time of [database creation](creating-database). You can also choose to create multiple instances of particular databases to improve availability and serve more read traffic.

## What's next

- [Create a database](creating-database)
- [Connect to a database](connecting-to-db)
