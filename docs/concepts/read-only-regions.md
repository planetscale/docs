---
title: 'Read-only regions'
subtitle: 'Add additional read-only regions to your production database.'
date: '2023-10-25'
---

## Overview

Replicate your production database across the globe by creating read-only regions in any available [PlanetScale region](/docs/concepts/regions).

This feature supports globally distributed applications by enabling your database to perform low latency reads in the regions closest to your applications and users.

## How to create a read-only region

1. In the [PlanetScale dashboard](https://app.planetscale.com), select the database you want to add a read-only region to.
2. Click on the production branch.
3. Click the "**Add region**" button.
4. Select the desired AWS region from the dropdown of [available regions](/docs/concepts/regions).
5. Click "**Add region**" and wait for your data to finish initially replicating across regions.
6. Optionally, create credentials for your new read-only region by clicking the ellipsis and selecting "**Connect**". The credentials can only be used to connect to this read-only region. Any additional read-only regions will require their own credentials.

## How to remove a read-only region

1. Go to your database's production branch.
2. Click on the "**...**" at the top right of the region that you want to delete.
3. Click "**Delete region**".

Once you delete a region, you will no longer be charged for the storage or row reads associated with that region.

## How to query a read-only region

Connecting to a read-only region requires using a separate connection string from your primary region.

1. Go to your database's production branch.
2. Click on the "**...**" at the top right of the region that you want to connect to.
3. Click "**Connect**".

Alternatively, you can create a connection string by going to your database settings page > "**Passwords**" > "**New password**".

All queries made over this connection will be routed to the read-only region.

## Concepts

### Replication across regions

PlanetScale replicates your data across regions with an asynchronous strategy, first storing your changes in the primary region and then forwarding them to your read-only region(s). The time that it takes those changes to propagate to your read-only region can be defined as "replication lag" and be measured by issuing the following statement to your read-only regions:

```sql
SELECT max_repl_lag();
```

The `max_repl_lag()` function will return an instantaneous measurement of the maximum amount of seconds it has been since your read-only region has stored changes made to your primary region.

### Read-only connections

Connecting to a read-only region will allow you to query your data, but will not allow you to insert, update, or delete it.

## Availability and pricing

Read-only regions are only available on our [paid Scaler, Scaler Pro, and Enterprise plans](/pricing).

### Storage costs

Your storage costs will increase linearly with the amount of read-only regions added. For example, if your production branch is 10GB, each region added will increase your total storage cost by 10GB.

Adding new read-only regions will always be billed as standalone storage and will not count toward your included storage.

As an example, let's say you're on our Scaler plan with 10 GB of included storage and your primary contains 5 GB of data. If you have two read-only regions, each one will be charged at our additional storage rate, for a total of 10 GB.

For more information on storage billing costs, see our [Billing documentation](/docs/concepts/billing#planetscale-plans).

### Rows read

Queries issued to each read-only region will contribute to your total billable row reads per month. Your invoice details will show a new line for rows read from each region.
