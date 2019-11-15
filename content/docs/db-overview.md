---
title: 'PlanetScale CNDb Overview'
category: 'concepts'
---

# Introducing the PlanetScale Cloud Native Database (CNDb)

This page explains the basic concept of the PlanetScale CNDb.

## What is the PlanetScale CNDb?

The PlanetScale CNDb is a fully managed, easy-to-use implementation of the [Vitess](http://vitess.io) open source MySQL sharding solution.

Vitess manages MySQL replication and sharding, allowing you to grow your database while maintaining high availability and avoiding the pain of manual resharding. It also protects your database from harmful queries. Vitess can also run on Kubernetes, taking advantage of container management and orchestration. However, configuring Vitess to take advantage of these features and managing a Vitess deployment requires some work and expertise.

## Why use PlanetScale?

This is where the PlanetScale CNDb comes in: using the PlanetScale user interface, you can create a MySQL database with Vitess horizontal sharding, replication, and query handling in a few miniutes. PlanetScale manages the database on our own virtual private cloud, and your app connects to it with a connection string, like any MySQL database. You can import data from an existing database to gain the benefits of Vitess, or export data to another platform. You can also customize your database to use specific schemas, sharding configurations, regions or zones, and resources, such as memory and processors, all through the PlanetScale console.

## What's next

[Creating a PlanetScale CNDb](creating-database)


