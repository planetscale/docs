---
title: 'Custom Kubernetes Regions'
---

# Custom Kubernetes Regions

This document explains the basic ideas behind Custom Kubernetes Regions in the PlanetScaleDB context.

## What is a Custom Region?

In the context of PlanetScaleDB, a **Custom Kubernetes Region** is a Kubernetes cluster under your control where PlanetScaleDB can deploy a [cluster](clusters). Any databases you create in your Custom Region deploy inside your Kubernetes region, but PlanetScaleDB administers them. Your application connects to the Vitess deployment inside your Kubernetes cluster to access databases in the Custom Region. Your Kubernetes cluster may reside on a cloud provider or it may be on-premises. 

## Why should I use a Custom Kubernetes Region?

PlanetScale clusters correspond to [Kubernetes clusters](https://kubernetes.io/docs/concepts), which PlanetScale uses to run fully-managed [databases](databases). However, some customers prefer to manage their own Kubernetes clusters. By creating a Custom Kubernetes Region, you can gain the benefits of having PlanetScaleDB manage your database while maintaining control over the administration of your Kubernetes cluster.

## How do Custom Kubernetes Regions work?

When you [create a Custom Kubernetes Region](creating-custom-region), you run a script that deploys the [PlanetScaleDB operator](../psdb-operator/overview) to your Kubernetes cluster and provides PlanetScaleDB with the details of your cluster. When you deploy a database to your Custom Kubernetes Region, PlanetScaleDB connects to the operator in your cluster and uses it to deploy the Vitess components and MySQL database instances that make up your PlanetScaleDB database. When you [connect an application to your database](connect-to-db), the application is connecting to the Vitess components inside of your Kubernetes cluster.

## What's next

- Learn how to [create a Custom Kubernetes Region](creating-custom-region).
- Learn how to [connect to a Custom Kubernetes Region](connecting-to-custom-region).
