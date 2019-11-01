---
title: 'Understanding PlanetScale Database Deployment'
category: 'concepts'
---

# Understanding PlanetScale Database Deployment

This document explains how PlanetScale deploys your database.

<!-- This is probably a good place for a diagram showing the relationship between the PlanetScale management plane, the operator, and the Vitess deployment. -->

## How does PlanetScale Database deploy my database?

<!-- There are some terms here that we may need to update and clarify. -->

Because PlanetScale Database is fully managed, PlanetScale deploys your entire database on our own private cloud. This includes all of the components of a Vitess installation, such as MySQL database instances, Vitess tablets, and datastores like etcd, along with proprietary PlanetScale components. Once deployed, you interact with your database using the PlanetScale Console. Your application connects to the PlanetScale database using a standard MySQL connection string.

<!-- Include link to doc on connecting to PlanetScale DB using connection string. -->

<!-- Are there other topics that need to be addressed here? -->

## What's next

+ Learn more about [PlanetScale Database security](security-features)
