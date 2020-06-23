---
title: 'Custom region requirements'
---

# Custom region requirements

This document contains information about the requirements for a Kubernetes cluster to deploy a Custom Region, and the changes that PlanetScale makes to your Kubernetes cluster to prepare for PlanetScaleDB deployment.

## Kubernetes cluster requirements

To support a PlanetScale custom region, your Kubernetes cluster must meet the following minimum requirements:

- Kubernetes version 1.15 or higher
- Dynamic volume provisioning
- 8 CPUs total
- 4 CPUs per node
- 30GB RAM

## Changes to your Kubernetes cluster

Before you [create a custom region](creating-custom-region), you must run the `kubernetes-prepare.sh` script. This script makes the following changes to your Kubernetes cluster:

- Create CRDs for PlanetScaleDB components
- Create less-privileged RBAC resources for PlanetScaleDB components

The script also collects necessary information about your cluster.

## Kubernetes prepare script syntax

The `kubernetes-prepare.sh` script takes the following options:

+ `--dry-run`: Review the changes that the script would make to your Kubernetes cluster without making the changes.
+ `--namespace`: Run the script against a specific namespace. The default namespace is the namespace of your current context.
+ `--delete`: Remove objects that the script creates in your Kubernetes cluster, including CRDs, service accounts, RBAC and secrets." This option will disable your custom region and any clusters in it. Some changes to your cluster may remain, including the Kubernetes deployment, services, and secret.

## See also

- [Creating a custom region](creating-custom-region)
