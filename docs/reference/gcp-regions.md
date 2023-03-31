---
title: GCP regions
subtitle: Learn about our available GCP regions (in beta) and some of the limitations that come with using them.
date: '2022-11-16'
---

We currently support some Google Cloud Provider regions for creating databases and branches. GCP support is in beta, so there are some limitations, which will be covered in this document.

## Available GCP regions

{% callout %} We are still adding more GCP regions throughout beta. If you don't see your preferred GCP region(s) in the following list, [get in touch](/contact) to let us know what GCP region(s) you would like to see added. Also, Managed Cloud plans can be deployed in any region(s). See the [Deployment options documentation](/docs/concepts/deployment-options#managed-cloud) for more information. {% /callout %}

- (Beta) GCP us-central1 (Council Bluffs, Iowa) &mdash; `gcp-us-central1`
- (Beta) GCP us-east4 (Ashburn, Virginia) &mdash; `gcp-us-east4`
- (Beta) GCP northamerica-northeast1 (Montréal, Québec, Canada) &mdash; `gcp-northamerica-northeast1`

## GCP beta limitations

As GCP region support is currently in beta, there are some limitations to its use.

### Portals

You currently cannot create [read-only regions](/docs/concepts/read-only-regions) using GCP regions. In addition, if your production database branch is using a GCP region, you cannot spin up a read-only replica using an AWS region.

### Using AWS and GCP regions

If you have a database with branches in both AWS and GCP regions, you cannot restore backups between those AWS and GCP regions using our [backup tool](/docs/concepts/back-up-and-restore). It is, however, possible to manually import a backup using a MySQL dump.
