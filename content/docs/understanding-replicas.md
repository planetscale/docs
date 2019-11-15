---
title: 'Understanding replicas'
category: 'concepts'
---

# Understanding replicas

This document describes the basic concept of replicas in the PlanetScale CNDb context.

## What is a replica?

A **replica** is a copy of your database that can serve data in response to queries and which can be promoted to master when necessary.

Replicas are distinct from [read-only instances](understanding-read-only-instances), which are like replicas, but which cannot be promoted to master.

## Why have replicas?

Replicas have two main benefits:

+ Replicas let you scale up the rate of read queries your database can handle for a given number of [shards](understanding-sharding-schemes). Using a replica results in eventually-consistent reads. 
 
+ Replicas also prevent disruption to writes during planned maintenance.

## What's next

+ [Create a database](creating-database) with replicas
