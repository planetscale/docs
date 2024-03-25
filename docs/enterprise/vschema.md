---
title: 'Viewing your VSchema'
subtitle: 'View the VSchema for your keyspaces using the PlanetScale app.'
label: 'VSchema'
date: '2024-03-21'
---

## VSchema overview

PlanetScale databases are powered by Vitess.
Each Vitess cluster can have one or more [keyspaces](https://vitess.io/docs/concepts/keyspace/).
For unsharded databases, there is a 1:1 relationship between a keyspace and a database within MySQL.
For sharded databases, a single keyspace can map to multiple MySQL databases under the hood.

Each keyspace in your PlanetScale database keyspace has configurable [VSchema](https://vitess.io/docs/reference/features/vschema/).
The VSchema configuration file contains information about how a database is sharded, and how each table should be sharded.
This configuration file cannot be modified from the PlanetScale application, but it can be viewed for each branch.

## Viewing the VSChema in the PlanetScale app

In order to view your VSchema, first go to the "Branches" tab in the PlanetScale app.

![PlanetScale app tab bar](/assets/docs/enterprise/tabs.png)

Click on the branch you would like to view the VSchema for.
Then, select the keyspace and expand out the "Configuration Files" drop-down.

![PlanetScale keyspace selection and configuration files drop down](/assets/docs/enterprise/keyspace.png)

From here, you can inspect your VSchema configuration JSON file.

![VSchema JSON view](/assets/docs/enterprise/vschema.png)

Vschema cannot be modified from this menu.
If you need this modified, please reach out to your account manager or [PlanetScale Support](https://planetscale.com/contact).
