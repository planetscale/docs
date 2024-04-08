---
title: 'Database Sleeping'
subtitle: 'Learn when database sleeping takes effect and how to wake up a sleeping database.'
date: '2023-04-08'
---

## Overview

{% callout %}
The Hobby plan was deprecated on April 8th, 2024. Any Hobby databases that have not been migrated by April 8th, 2024 have been slept. Read the [Hobby plan deprecation FAQ documentation](/docs/concepts/hobby-plan-deprecation-faq) more information about next steps.

If you were previously on the Hobby plan and you need to migrate your data, but your database has been slept, you can wake your database one time to export your data. Follow the instructions in the [Hobby plan deprecation FAQ](/docs/concepts/hobby-plan-deprecation-faq) to dump your data.
{% /callout %}

## What is database sleeping

When a database is sleeping, all data is backed up, but you **will not be able to connect to any branches on the database** until it has been woken up.

### What happens to my data?

Right before a database enters sleep mode, we make a backup of all data, even if it's outside of the [included backup schedule](/docs/concepts/back-up-and-restore). We will continue to store all data while the database is sleeping. Once you wake the database, all data will be restored.

## When do we sleep databases

If you meet any of the following criteria, your database is eligible to sleep:

- The database was on the deprecated [Hobby plan](/docs/concepts/hobby-plan-deprecation-faq)
- The database has an unpaid invoice that is overdue by two weeks or more

### Unpaid invoice(s)

We also reserve the right to put your database in sleep mode if you have failed to pay on time. Before taking any action, we will send several email reminders for the outstanding invoices. Once all invoices have been paid in full, we will awaken your database.

## How to wake a sleeping database

Once your database is sleeping, you can wake it in your PlanetScale dashboard. For databases previously on the Hobby plan, you can wake your database one time for a 24 hour period to export your data. After that, you must reach out to [Support](/contact). If your database is sleeping due to unpaid invoices, you can update your card on file. Once your card has been successfully charged, we will wake your database.

1. Go to your [PlanetScale dashboard](https://app.planetscale.com)
2. Click on the sleeping database on the overview page
3. Click the "**Wake database**" button
4. Your database will wake up in the same state it was prior to sleeping and will be available to connect to shortly.
