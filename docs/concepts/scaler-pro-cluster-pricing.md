---
title: 'Scaler Pro cluster pricing'
subtitle: 'Learn about how we price Scaler Pro production branches and read-only regions.'
date: '2024-03-27'
---

A single Scaler Pro database includes the resources equivalent to 5 always-on instances within the base monthly plan cost.
Each database includes one production branch that provides a primary instance and two replica instances spread across availability zones.
The primary serves all queries by default, but the replicas can be used to serve read traffic, and are also used to maintain high-availability of your cluster.

In addition to the three instances used by your production branch, ~1440 hours of [development branch](/docs/concepts/planetscale-plans#development-branches) time per month is included.
The development branch time works out to two "always on" database instances, though we do recommend spinning them up and down and as needed during your development cycle.
These development branches can replace your existing development or staging environment on other providers.
Instead of purchasing 2-3 databases on PlanetScale to recreate your environment, you can just purchase one database cluster and use [branching](/docs/concepts/branching) for development.

You can upsize and downsize your cluster at any time. Pricing is prorated to the millisecond, so if you temporarily upsize, you will only be charged for the larger cluster size for the time that it was running. You can also spin up additional production branches at any timing for additional cost. The pricing for these is also prorated.

The read-only region prices below are an additional cost if you choose to utilize [read replicas](/docs/concepts/read-only-regions) across multiple regions.

The first 10 GB of storage is included in your plan.
After this, you will be charged $1.50 per additional 1 GB used.
Since this data will also reside on your two replicas, this comes out to $0.50 per gigabyte, per database instance.
Also, the binary log space is not counted against your storage usage calculation.
For example, if you have a `PS-10` storing 20 GB of data for the full month, your bill would be $39 + ($1.50 \* 10) = $54.

{% callout type="note" %}
Cluster size options are capped at `PS-400` until you have a successfully paid $100 invoice. If you need larger sizes immediately, please [contact us](/contact) to unlock all sizes. You can find the full list of cluster sizes in our [Plans documentation](/docs/concepts/planetscale-plans#scaler-pro).
{% /callout %}

{% clusterRatesTable / %}
