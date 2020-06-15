---
title: 'Custom region requirements'
category: 'reference'
---

# Custom region requirements

This document contains information about the requirements for a Kubernetes cluster to deploy a Custom Region, and the changes that PlanetScale makes to your Kubernetes cluster to prepare for PlanetScaleDB deployment.

## Kubernetes cluster requirements 

To support a PlanetScale custom region, your Kubernetes cluster must meet the following minimum requirements:

+ Kubernetes version 1.15 or higher
+ Dynamic volume provisioning
+ 8 CPUs total
+ 4 CPUs per node
+ 30GB RAM

## Changes to your Kubernetes cluster 

Before you [create a custom region](creating-custom-region), you must run the `kubernetes-prepare.sh` script. This script makes the following changes to your Kubernetes cluster:

+ Create CRDs for PlanetScaleDB components
+ Create less-privileged RBAC resources for PlanetScaleDB components

The script also collects necessary information about your cluster.

## See also

+ [Creating a custom region](creating-custom-region)
