---
title: 'Scaler Pro cluster pricing'
subtitle: 'Learn about how we price Scaler Pro production branches and read-only regions.'
date: '2024-03-27'
---

The following prices include the equivalent of three databases when compared with other providers: one production branch and 1440 hours of [development branch](/docs/concepts/planetscale-plans#development-branches) time per month. The development branch time works out to two "always on" development branches, though we do recommend spinning them up and down quickly and as needed. Each branch includes:

- **Production branch** &mdash; One primary and two replicas across two availability zones
- **Development branches** &mdash; One primary

The additional development branches can replace your existing development or staging environment on other providers. Instead of purchasing 2-3 databases on PlanetScale to recreate your environment, you can just purchase one database cluster and use [branching](/docs/concepts/branching) for development.

You can upsize and downsize your cluster at any time. Pricing is pro-rated to the millisecond, so if you temporarily upsize, you will only be charged for the larger cluster size for the time that it was running.

The read-only region prices below are an additional cost if you choose to utilize [read replicas](/docs/concepts/read-only-regions) across multiple regions.

For production branches, the pricing below includes 10 GB of storage, and is billed at $1.50 per additional 1 GB thereafter.

{% callout type="note" %}
Cluster size options are capped at `PS-400` until you have a successfully paid $100 invoice. If you need larger sizes immediately, please [contact us](/contact) to unlock all sizes. You can find the full list of cluster sizes in our [Plans documentation](/docs/concepts/planetscale-plans#scaler-pro).
{% /callout %}

{% clusterRatesTable / %}
