---
title: 'Understanding clusters'
category: 'concepts'
---

# Understanding clusters

This document explains the basic ideas behind clusters in the PlanetScale CNDb context.

## What is a cluster?

In the context of your PlanetScale CNDB, a **cluster** is a set of resources that run one or more [databases](understanding-databases). Your application connects to a particular cluster, which provides access to all of the databases it contains.

![Diagram of a large cylinder representing a cluster and containing multiple smaller cylinders representing databases](/img/docs/cluster-diagram.png)

Each cluster runs on a particular cloud provider and region.  Databases on the same cluster are collocated. With multiple clusters, you can assign your databases to the correct region and allocate the appropriate resources to each database in the cluster.

PlanetScale clusters correspond to [Kubernetes clusters](https://kubernetes.io/docs/concepts), which PlanetScale uses to run your databases.

## Cluster resources

## What's next

+ Learn how to [create a cluster](creating-cluster).
+ Learn how to [connect to a cluster](connecting-to-db).
