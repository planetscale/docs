---
title: 'Advanced cluster configuration'
---

# Advanced cluster configuration

This document contains information about the advanced configuration options for a Kubernetes cluster. These options are a subset of the Vitess [vtctl command](https://vitess.io/docs/reference/programs/vtctl/).

To update these options, see [Configuring your cluster](configuring-cluster).

## Advanced cluster configuration options

The following advanced configuration options are available for a cluster:

| Option                    | Description                                         | Default |
|---------------------------|-----------------------------------------------------|---------|
| Enable hot row protection | Queue incoming transactions for the same row range. | On      |
| Sharding scheme DDL       | Allows users to update the sharding scheme.         | admin   |
| Default pool size         | Query server read pool size for regular queries     | 20      |
| Streaming pool size       | Query server read pool size for streaming queries   | 20      |
| Transaction pool size     | Query server read pool size for transaction queries | 20      |

## See also

+ [Configuring a cluster](configuring-cluster)
+ [Creating a cluster](creating-cluster)
