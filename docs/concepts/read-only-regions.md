---
title: 'Read-only regions'
subtitle: 'Add additional read-only regions to your production database.'
date: '2024-09-09'
---

## Overview

Replicate your production database across the globe by creating read-only regions in any available [PlanetScale region](/docs/concepts/regions).

This feature supports globally distributed applications by enabling your database to perform low latency reads in the regions closest to your applications and users.

## How to create a read-only region

1. In the [PlanetScale dashboard](https://app.planetscale.com), select the database you want to add a read-only region to.
2. Navigate to the "**Branches**" page.
   ![landing-to-branches](/assets/docs/concepts/read-only-regions/landing-to-branches.png)
3. Select the current production branch.
   ![branches-to-production](/assets/docs/concepts/read-only-regions/branches-to-production.png)
4. On the right-side menu, click the "**Add region**" button.
   ![add-region](/assets/docs/concepts/read-only-regions/add-region.png)
5. Select the desired AWS region from the dropdown of [available regions](/docs/concepts/regions) in the modal.
   ![modal](/assets/docs/concepts/read-only-regions/modal.png)
6. Click "**Add region**" and wait for your data to finish initially replicating across regions.

## How to remove a read-only region

1. Go to your database's production branch.
2. Click on the "**...**" at the top right of the region that you want to delete.
3. Click "**Delete region**".

Once you delete a region, you will no longer be charged for the storage or row reads associated with that region. If you were using global replica credentials, you do not need to take any additional action. Read queries will still be sent to the closest replica for any queries that are using global replica credentials.

## How to query a read-only region

Connecting to a read-only region requires using a [replica credential](/docs/concepts/replicas). You can create a global replica credential by following these steps:

1. Go to your database's production branch.
2. Click on the "Connect" button in the top right
3. On the "Connect" page, select "Replica" as the connection type.
4. Click "Create password" to generate a new username and password pair.

Alternatively, you can create a connection string by going to your database settings page > "**Passwords**" > "**New password**".

All queries made using this password will be routed to your branch's replicas or the nearest read-only region. If you want to route queries to a specific read-only region, you can go to the "**Passwords**" page within your database's settings page and select the created password. Under "**Database endpoint**", you can then select "**Direct**" and choose your desired host from the "**Host**" dropdown.

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

Read-only regions are available on [Scaler Pro and multi-tenant Enterprise plans](/docs/concepts/planetscale-plans). Read-only regions are priced differently depending on the selected region. You can find a full list of pricing in the [Scaler Pro cluster pricing documentation](/docs/concepts/scaler-pro-cluster-pricing).

### Storage costs

Your storage costs will increase linearly with the amount of read-only regions added.
Adding new read-only regions will always be billed as standalone storage and will not count toward your included storage.

As an example, let's say you're on our Scaler Pro plan with 10 GB of included storage and your primary contains 7 GB of data.
If you have two read-only regions, each one will be charged at our additional storage rate, for a total of 14 GB.
The read-only region storage rate is $0.75 per GB, and in this case would lead to an additional storage charge of $10.50.

For more information on storage billing costs, see our [Billing documentation](/docs/concepts/billing#planetscale-plans).
