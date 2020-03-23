---
title: 'Database instances'
category: 'concepts'
---

# Database instances

This document describes the basic concept of database instances in the PlanetScaleDB context.

## What is a database instance?

A **database instance** is a copy of your database that can serve data in response to queries. PlanetScaleDB promotes one of these instances to master as needed. Your database requires at least one database instance, but additional database instances increase read capacity. Because PlanetScaleDB can promote any database instance to master when necessary, additional database instances also improve availability. Unlike most database replication systems, this promotion occurs automatically.

Database instances are similar to [analytics instances](analytics-instances). However, analytics instances cannot be promoted to master.

## Why have multiple database instances?

Multiple database instances have two main benefits:

+ Database instances let you scale up the maximum rate of read queries for your database for a given number of [shards](sharding-schemes). Using additional database instances results in eventually-consistent reads. 
 
+ Database instances also prevent disruption to writes during planned maintenance. 

## What's next

+ [Create a database](creating-database) with database instances
