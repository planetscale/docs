---
title: 'PlanetScaleDB Overview'
category: 'concepts'
---

# PlanetScaleDB Overview

This documents briefly describes PlanetScaleDB and its usage.

## What is PlanetScaleDB?

PlanetScaleDB is a fully managed, easy-to-use implementation of [Vitess](http://vitess.io), an open source MySQL sharding solution.

Vitess manages MySQL replication and sharding, allowing you to grow your database while maintaining high availability and avoiding the pain of manual resharding. It also protects your database from harmful queries. Vitess can also run on Kubernetes, taking advantage of container management and orchestration. However, configuring Vitess to take advantage of these features and managing a Vitess deployment requires some work and expertise.

## Why use PlanetScaleDB?

PlanetScaleDB's user interface provides a way to create a MySQL database with features like horizontal sharding, replication, and query handling in a few minutes. PlanetScale manages the database inside a virtual private cloud, and your app connects to it with a connection string, like any MySQL database. You can import data from an existing database to gain the benefits of Vitess, or export data to another platform. You can also customize your database to use specific schemas, sharding configurations, regions or zones, and resources, such as memory and processors, all through PlanetScaleDB's console.

## What's next

[Creating a database](creating-database)
