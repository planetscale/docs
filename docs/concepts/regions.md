---
title: 'Regions'
subtitle: 'Selecting a region during database and branch creation.'
date: '2023-05-26'
---

## Overview

PlanetScale currently offers database deployment in multiple regions. Select the region closest to your application servers to reduce latency between your database and application. Deploy development branches in the region closest to your own location to reduce latency when working with the branch.

You may also add read-only regions to your production database. See our [Read-only regions documentation](/docs/concepts/read-only-regions) for more information.

A number of resources exist to help find which region has the lowest latency from your location – such as [CloudPing](https://www.cloudping.co/grid#).

## Available regions

{% callout %}
If you don't see your preferred region(s) in the following list, [get in touch](/contact) to let us know what region(s) you would like to see added. Also, Managed Cloud plans can be deployed in any region(s) with three availability zones. See the [Deployment options documentation](/docs/concepts/deployment-options#managed-cloud) for more information.
{% /callout %}

Currently, the following regions are supported, with their respective PlanetScale slugs:

### AWS regions

- AWS ap-northeast-1 (Tokyo) &mdash; `ap-northeast`
- AWS ap-south-1 (Mumbai) &mdash; `ap-south`
- AWS ap-southeast-1 (Singapore) &mdash; `ap-southeast`
- AWS ap-southeast-2 (Sydney) &mdash; `aws-ap-southeast-2`
- AWS eu-central-1 (Frankfurt) &mdash; `eu-central`
- AWS eu-west-1 (Dublin) &mdash; `eu-west`
- AWS eu-west-2 (London) &mdash; `aws-eu-west-2`
- AWS sa-east-1 (Sao Paulo) &mdash; `aws-sa-east-1`
- AWS us-east-1 (Northern Virginia) &mdash; `us-east`
- AWS us-east-2 (Ohio) &mdash; `aws-us-east-2`
- AWS us-west-2 (Oregon) &mdash; `us-west`

### GCP regions

- GCP us-central1 (Council Bluffs, Iowa) &mdash; `gcp-us-central1`
- GCP us-east4 (Ashburn, Virginia) &mdash; `gcp-us-east4`
- GCP northamerica-northeast1 (Montréal, Québec, Canada) &mdash; `gcp-northamerica-northeast1`
- GCP asia-northeast3 (Seoul, South Korea) &mdash; `gcp-asia-northeast3`

## Selecting the database region

PlanetScale allows you to select the region for the [`main` branch](/docs/concepts/branching) of your database during database creation. By default, all database branches created within this database will also be created in this region. Once you select a region for your `main` branch, it cannot be changed.

You can also select the region while creating a database via the CLI by using
the `--region` flag with the region's slug.

{% callout %}
If you do not select a region during database creation using the CLI, it will be set to AWS `us-east-1`.
{% /callout %}

Here's an example command for creating a database with a different region:

```shell
pscale database create <DATABASE_NAME> --region us-west
```

## Selecting the branch region

PlanetScale allows you to select a region for development branches during
creation as well. By default, it is set to the same region as its database.

![Select your branch region.](/assets/docs/concepts/regions/branch.png)

{% callout %}
Once you select a branch region, it cannot be changed.
{% /callout %}

You can also select the region while creating a branch via the CLI by using the
`--region` flag with the region's slug.

Here's an example command for creating a branch with a different region:

```shell
pscale branch create my-production-database add-tables --region eu-west
```

## Restricting the branch regions

[Organization Administrators](/docs/concepts/access-control#organization-administrator) can restrict branches to only being created in the same region as the one selected during database creation. To enable this setting, check the _Restrict region_ setting in the settings page for the database: `app.planetscale.com/<org>/<database>/settings`.

![Restrict your branches to one region.](/assets/docs/concepts/regions/restrict-2.png)

## Changing branch and database regions

Once you select a region for a production or development branch, it cannot be changed.

If you do need to move to a different region, we recommend taking the following steps:

1. Create a new branch in the new region.
2. [Backup and dump](/docs/reference/database) the original branch with:

   ```bash
   pscale database dump <DATABASE_NAME> <BRANCH_NAME>
   ```

3. Restore the dump to the new branch with:

   ```bash
   pscale database restore-dump <DATABASE_NAME> <BRANCH_NAME>
   ```

4. If this is for a production branch, [promote the new branch](/docs/reference/branch) to production:

   ```bash
   pscale branch promote <DATABASE_NAME> <BRANCH_NAME>
   ```

5. Swap out the credentials in your app with the new branch.

   It's important to note that this will require downtime if done on a production branch, as the dump and restore process will take time to complete. To avoid data loss, you can temporarily block writes in your application before doing the dump, and re-enable them after the final credential swap.
