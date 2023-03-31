---
title: 'Change single unique key'
subtitle: "Three step process for changing a table's single unique or primary key"
date: '2022-08-01'
---

## Overview

To migrate data safely and [without downtime](/docs/concepts/nonblocking-schema-changes), PlanetScale requires that all tables have a unique, not-null key that remains unchanged during the migration. This requirement can cause difficulty if, for example, you attempt to ALTER the primary key of a table with no other unique keys.

If you attempt to deploy such a schema change, the deploy request will fail with the error `All tables must have at least one unique, not-null key that remains unchanged during the migration`.

{% callout %} This example adds a temporary unique key but you could also use a unique index or create the temporary key by adding a unique constraint. {% /callout %}

## How to change a table's single unique key

Altering a single unique key can be accomplished in 3 steps. Each step is a [separate deploy request](/docs/concepts/branching#how-to-deploy-a-branch).

1. Add a temporary unique key. To change a lone unique key you will first need to add another unique key that PlanetScale can use during the migration. In a new branch, add a new key on a unique column or combination of columns. The target columns should not contain null values.

   ```sql
   ALTER TABLE table_name ADD UNIQUE KEY temp_unique_key (`column`,`column2`);
   ```

   Deploy this change via a deploy request.

2. Alter the original key. Now that you have a second unique key, you can alter the original key. In a new branch, apply your intended schema change.

   Our example drops the existing primary key and replaces it with a compound primary key.

   ```sql
   ALTER TABLE table_name DROP PRIMARY KEY, ADD PRIMARY KEY(`column`,`column2`);
   ```

   Deploy this change via a deploy request.

3. Drop the temporary unique key. After the primary key has been updated, you can remove the temporary unique key that you added in Step 1.

   In a new branch, drop the temporary key.

   ```sql
   ALTER TABLE table_name DROP KEY temp_unique_key;
   ```

   Once this deploy request has been deployed, you will have changed your table's unique primary key and removed the temporary unique key created in step 1.

## Why?

PlanetScale non-blocking schema changes works by first creating a ghost table, in the likeness of your original table. The ghost table is then altered to match your changed schema. We copy over the data from the original table, as well as stream any changes as they happen to the ghost table. Once this ghost table is in sync with the original, we swap the tables in place. This safely completes the migration.

To do this, we need to have a consistent primary or unique key across both of the tables to reliably replicate the data over. This is why we require a consistent key when migrating your data.

## Summary

This tutorial provides a three step process for updating a table's single unique key and can be repeated as often as needed.
