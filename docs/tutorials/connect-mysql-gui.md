---
title: 'Connect a MySQL GUI to PlanetScale'
subtitle: 'Connect to your PlanetScale database using any MySQL GUI application'
date: '2024-04-11'
---

## Introduction

In this tutorial, you'll learn how to connect to a PlanetScale database using a MySQL GUI. While this tutorial uses Sequel Ace as a demonstration, many applications that connect to MySQL databases will support connecting to and querying a PlanetScale database as long as the applicaton supports connecting over SSL.

## Gather the credentials

To connect to a PlanetScale database, you'll need four pieces of information:

- The database name
- Host name
- Username
- Password

The easiest way to gather this information is by selecting the **Connect** button from the **Dashboard** tab. Then, on the **Connect** page, select the branch that you wish to connect to and click the **Create password** button. Within the **Select a language or framework** section, select "Other" to display the connection details as a list instead of a language or framework-specific connection string.

{% callout %}
As a security best practice, passwords are only displayed when they are created.
{% /callout %}

## Connect to the database

In the application you are using, enter the access information you gathered in the previous step into the appropriate fields. Make sure to check **"Require SSL"** as SSL is required to connect to a PlanetScale database. Click **"Connect"** once you are finished.

![The new connection window in Sequel Ace.](/assets/docs/tutorials/connect-mysql-gui/ace-connect.png)

If the connection is successful, you should be able to query your database and perform other [supported operations](/docs/reference/mysql-compatibility).

![A sample query in Sequel Ace.](/assets/docs/tutorials/connect-mysql-gui/ace-query.png)

## Caveats

While many standard MySQL statements are supported, there are a few caveats worth calling out:

1. Each branch of a PlanetScale database is considered an isolated MySQL database. You'll need separate connection details per branch.
2. Production branches with [safe migrations](/docs/concepts/safe-migrations) enforce the use of [branching](/docs/concepts/branching) and [deploy requests](/docs/concepts/deploy-requests) to safely make schema changes and do not support direct DDL as a result. However, DDL is supported on development branches and production branches without safe migrations enabled (not recommended).
3. Creating new databases is not supported using any GUI tool.

## Tested GUIs

The following MySQL GUI applications have been tested and confirmed to work with PlanetScale databases:

- [Sequel Ace](https://sequel-ace.com/)
- [TablePlus](https://tableplus.com/)
- [MySQL Workbench](https://www.mysql.com/products/workbench/)
- [JetBrains DataGrip](/blog/using-planetscale-with-jetbrains-datagrip-mysql-gui)
