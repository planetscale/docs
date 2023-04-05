---
title: 'Web console'
subtitle: 'Query your database directly from the PlanetScale dashboard'
date: '2023-04-05'
---

## Overview

The PlanetScale web console is an interactive interface for running MySQL queries and DDL (Create, Alter, and Delete) against your PlanetScale database branches.

## Get started

The PlanetScale web console can be used to query to any database branch; however, it is [disabled for production branches](/docs/concepts/web-console#enable-for-production-branches) by default to prevent accidental data loss.

To access the web console, navigate to a database, and click on the "Console" tab in the page navigation. From here, you can select which branch you'd like to connect to by selecting it in the dropdown and clicking "Connect".

![Web console branch selection](/assets/docs/concepts/web-console/web-console-branch-selection.png)

You can also access the web console directly by adding `/console` to the URL from any database branch page,
`app.planetscale.com/<org>/<database>/<branch>/console`.

Once you have accessed the web console, you can run queries against your database branch, or apply DDL to branches without [safe migrations](/docs/concepts/safe-migrations) enabled.

The following are examples of MySQL statements you may find useful within the web console:

Use `SHOW TABLES;` to see a list of the tables in your database branch.

![SHOW TABLES; in the console](/assets/docs/concepts/web-console/web-console-show-tables.png)

Use `DESCRIBE table_name;` to obtain information about a given table's structure.

![DESCRIBE table_name; in the console](/assets/docs/concepts/web-console/web-console-describe-products.png)

Use `EXPLAIN` in front of `SELECT`, `DELETE`, `INSERT`, `REPLACE` and `UPDATES` statements to learn how the database is executing a query. This can be useful for optimizing slow queries.

## Supported console commands

| Command   | Description                       |
| --------- | --------------------------------- |
| ?, \\?    | Synonym for `help`                |
| clear, \c | Clear the current input statement |
| help, \h  | Display list of commands          |
| ego, \G   | Send command to server            |
| go, \g    | Send command to server            |

## Enable for production branches

By default, the web console is disabled for production branches to prevent accidental data loss.

You can enable the web console for production branches on the "Settings" page for the given database,
`app.planetscale.com/<org>/<database>/settings`.

Select the checkbox for "Allow web console access to production branches", then scroll down and click the "Save database settings" button to save your changes.

![Enable product branch web console access](/assets/docs/concepts/web-console/web-console-enable-prod-branches.png)

This will enable the ability to use the web console to run queries against production branches for the given database.
