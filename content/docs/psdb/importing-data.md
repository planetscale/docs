---
title: 'Importing data'
category: 'using-your-planetscale-database'
---

# Importing data into your database

This document explains how to import data into your database.

The steps in this document may be too slow for large databases. If you want to import a large database, contact us at <support@planetscale.com>.

## Prerequisites

Before you import data into your database, you must first [create a database](creating-database). If you want your database to use multiple [shards](psdb/understanding-sharding-schemes), apply your sharding scheme before importing data.

## Overview

To import data into your database, complete the following steps:

1. [Export your database to a file](https://dev.mysql.com/doc/refman/8.0/en/mysqldump-sql-format.html).
1. [Connect to your database](connecting-to-db).
1. [Reload the database file from your MySQL client](https://dev.mysql.com/doc/refman/8.0/en/reloading-sql-format-dumps.html).

## Step 1: Export your database to a file

Using your MySQL client, export your source database to a file. For example,
you can use the [`mysqldump`](https://dev.mysql.com/doc/refman/8.0/en/mysqldump-sql-format.html) command to export your database to a file in .sql format:

```
shell> mysqldump --source-database > exported-database.sql
```

## Step 2: [Connect to your database](connecting-to-db).

## Step 3: Reload the database file from your MySQL client.

Using your MySQL client, import your database file. For example, you can use the [`mysql`](https://dev.mysql.com/doc/refman/8.0/en/reloading-sql-format-dumps.html) command with the database file as an input:

```
shell> mysql < exported-database.sql
```
