---
title: 'Database Sleeping'
subtitle: 'Learn when database sleeping takes effect and how to wake up a sleeping database.'
date: '2023-07-17'
---

## Overview

After a period of inactivity, free databases will enter 'sleep' mode. All data will be backed up and stored, but you will not be able to connect to the database.

## What is database sleeping

When a database on the [free Hobby plan](/docs/concepts/billing#planetscale-plans) is inactive for 7 days, the database will be enter sleep mode. When a database is sleeping, all data is backed up, but you **will not be able to connect to any branches on the database** until it has been woken up.

![PlanetScale dashboard overview page - Sleeping databases](/assets/docs/concepts/database-sleeping/databases.png)

### What happens to my data?

Right before a database enters sleep mode, we make a backup of all data, even if it's outside of the [included backup schedule](/docs/concepts/back-up-and-restore). We will continue to store all data while the database is sleeping. Once you wake the database, all data will be restored.

## What is branch sleeping

Similar to sleeping an entire database, individual development branches in a Hobby or Scaler database enter sleep mode after 7 days of inactivity. These are typically branches that were used to merge schema changes into a production branch. The process is the same as database sleep, with a backup taken before sleeping.

## When do we sleep databases

Here is the criteria we use to determine when a database is eligible to sleep:

- The database is on the [**free** Hobby plan](/docs/concepts/billing#planetscale-plans)
- The database is at least **seven days old**
- There have been **no queries** to any branches of the database in the past **7 days**

If the database meets all of this criteria, it will enter sleep mode.

### Unpaid invoice(s)

We also reserve the right to put your database in sleep mode if you have failed to pay on time. Before taking any action, we will send several email reminders for the outstanding invoices. Once all invoices have been paid in full, we will reawaken your database again.

## How to prevent a database from sleeping

To prevent a database from entering sleep mode, make sure to query any branch of the database at least once every 7 days.

Because database sleeping only applies to databases on the free Hobby plan, another option is to upgrade your database to a [paid Scaler or Scaler Pro plan](/docs/concepts/billing#planetscale-plans), in which case your database will not be slept for any amount of inactivity.

## How to wake a sleeping database

Once your database is sleeping, you can wake it in your PlanetScale dashboard.

![PlanetScale dashboard database page - Sleeping database](/assets/docs/concepts/database-sleeping/database-2.png?v2)

### Steps to wake a sleeping database:

1. Go to your [PlanetScale dashboard](https://app.planetscale.com)
2. Click on the sleeping database on the overview page
3. Click the "**Wake database**" button
4. Your database will wake up in the same state it was prior to sleeping and will be available to connect to shortly.

## Additional assistance

If you need additional assistance or have any questions, contact our [the PlanetScale support team](https://support.planetscale.com), or join our [GitHub Discussion board](https://github.com/planetscale/discussion/discussions).
