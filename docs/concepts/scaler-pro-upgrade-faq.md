---
title: 'Upgrading to Scaler Pro - FAQ'
subtitle: 'Frequently asked questions about upgrading to Scaler Pro.'
date: '2024-02-20'
---

## Overview

PlanetScale is deprecating the Scaler plan. [Please read our blog post here to learn more](/blog/deprecating-the-scaler-plan).

All existing Scaler plan customers will need to upgrade their database to Scaler Pro by April 8, 2024. If they are not upgraded by April 8th, we will automatically
migrate any remaining databases to Scaler Pro.

## How do I select a Scaler Pro cluster size?

When upgrading to Scaler Pro, the UI will show a _recommended_ cluster size for your database. This is based on the current resources your database has been using on the Scaler plan.

For most users, this will be a [PS-10 cluster size](/docs/concepts/planetscale-plans#resource-based-plan).

Scaler databases, by default, used a cluster size similar to a PS-10. In rare cases, databases may be on a PS-20 or higher.

Once you select the size and submit the change, the adjustment will be made immediately and without downtime. You will be able to see your databases infrastructure update on the dashboard page.

## How is storage billed for Scaler Pro?

For Scaler, storage was billed at $2.50/GiB. On Scaler Pro, storage is $1.50/GiB.

This rate includes all storage used by replicas in your primary region.

## Is Scaler Pro PS-10 less powerful than Scaler?

No, Scaler Pro is more powerful than Scaler. By default Scaler databases are on a cluster size similar to PS-10.

Scaler production branches have a single replica. Scaler Pro PS-10 has two replicas distributed in different availability zones.

In rare cases, there are Scaler databases using more resources than a PS-10. In those cases you will see when upgrading in that UI that we will recommend a different cluster size for your database. The recommended cluster size will be highlighted in blue and say "recommended".

## What are replicas used for?

All Scaler Pro production branches include [two replicas](/docs/concepts/replicas). These are for improving resiliency and distributing read queries.

Replicas are also used for automatic failovers. In the event there is an issue with the primary in your database, PlanetScale will automatically failover to one of the running replicas.

Each replica is run in a separate availability zone (AZ). Think of each AZ as a separate building within the region. If there is an issue with one (such as power loss), your database will continue to be available.

By default, all read queries are sent to the primary. You [may optionally have them served by your replicas](/docs/concepts/replicas#how-to-query-replicas) to reduce load on the primary.

## What if I used multiple production branches in my Scaler database?

The Scaler plan allowed for two production branches at a time. In Scaler Pro, each production branch is individually billed for the time the branch is running.

If you would like to setup a "staging" or "preview" branch for your database to test schema changes. We recommend [using a development branch and enabling safe migrations](/docs/concepts/safe-migrations#staging-branches).

## What changes with read-only regions?

On the Scaler plan, read-only regions were billed by the rows read plus $2.50/GiB for storage.

For Scaler Pro, each read-only region has a flat rate (40% the cost of the production branch) and storage is $1.50/GiB.

## How do I know when to scale up my cluster size?

If your database is consistently using 70% or higher of the available CPU, we recommend moving up to a larger cluster size.

Cluster size changes happen quickly and without downtime. You will see a status indicator in on the dashboard when an upgrade is occuring.

## How do development branches work on Scaler Pro?

On the Scaler plan, each database had a limit of 5 development branches at a time.

With Scaler Pro, each database has 1,440 hours of development branch time included. Anything over that time is billed at $0.013 per hour. All branches are only billed for the time that they are used, prorated to the second.

[Learn more about development branch billing](/docs/concepts/billing#development-branches).
