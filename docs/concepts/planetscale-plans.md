---
title: 'PlanetScale plans'
subtitle: 'Learn about the different products and plans we offer: Scaler Pro and Enterprise'
date: '2024-10-07'
---

## Overview

PlanetScale is built to accomodate all companies at all stages. Whether you need a hassle-free managed database for your side project or you’re running millions of queries per second at the scale of YouTube, we have a solution for you.

Our plans are split into two general offerings: [Scaler Pro (self-serve)](#scaler-pro) and [Enterprise](#planetscale-enterprise-plan).

## Scaler Pro

The **Scaler Pro** plan is broken down by cluster size, which have varying levels of compute power.

|             | **Processor** | **Memory** | **Transactions\*** |
| ----------- | ------------- | ---------- | ------------------ |
| **PS-10**   | 1/8 vCPU      | 1 GB RAM   | 70                 |
| **PS-20**   | 1/4 vCPU      | 2 GB RAM   | 75                 |
| **PS-40**   | 1/2 vCPU      | 4 GB RAM   | 75                 |
| **PS-80**   | 1 vCPU        | 8 GB RAM   | 110                |
| **PS-160**  | 2 vCPU        | 16 GB RAM  | 158                |
| **PS-320**  | 4 vCPU        | 32 GB RAM  | 211                |
| **PS-400**  | 8 vCPU        | 32 GB RAM  | 211                |
| **PS-640**  | 8 vCPU        | 64 GB RAM  | 281                |
| **PS-700**  | 16 vCPU       | 32 GB RAM  | 211                |
| **PS-900**  | 16 vCPU       | 64 GB RAM  | 281                |
| **PS-1280** | 16 vCPU       | 128 GB RAM | 375                |
| **PS-1400** | 32 vCPU       | 64 GB RAM  | 281                |
| **PS-1800** | 32 vCPU       | 128 GB RAM | 375                |
| **PS-2100** | 48 vCPU       | 96 GB RAM  | 328                |
| **PS-2560** | 32 vCPU       | 256 GB RAM | 500                |
| **PS-2700** | 48 vCPU       | 128 GB RAM | 438                |
| **PS-2800** | 64 vCPU       | 128 GB RAM | 375                |

\* **Transactions** refers to the number of simultaneous _transactions_ your database can process, which is different than simultaneous _connections_.
This is also known as the _transaction pool_.

{% callout %}
Cluster size options are capped at `PS-400` until you have a successfully paid $100 invoice. If you need larger sizes immediately, please [contact us](/contact) to unlock all sizes.
{% /callout %}

On top of processing and memory, all **Scaler Pro** cluster sizes share the following:

|                                                             | **Scaler Pro**                                           |
| ----------------------------------------------------------- | -------------------------------------------------------- |
| **Storage/month**                                           | 10 GB included; $0.50 per instance per additional 1 GB\* |
| **Row reads/month**                                         | _Unmetered_                                              |
| **Row writes/month**                                        | _Unmetered_                                              |
| **Available cluster sizes**                                 | 17                                                       |
| **Availability zones**                                      | 3                                                        |
| **Production branches**                                     | 1 included\*\*                                           |
| **Development branches**                                    | ~1,440 hours included (2× hours of current month)        |
| **Concurrent Connections**                                  | _Unmetered_                                              |
| **Query Insights retention**                                | 7 days                                                   |
| **Horizontal sharding**                                     | Included                                                 |
| [**Deployment options**](/docs/concepts/deployment-options) | Multi-tenant                                             |
| **Read-only regions**                                       | Available as an add-on                                   |
| **Web console**                                             | Included                                                 |
| **PlanetScale CLI**                                         | Included                                                 |
| **SSO**                                                     | Available as an add-on\*\*\*                             |
| **Audit log retention**                                     | 6 months                                                 |
| **Private connections**                                     | [Configurable](/docs/concepts/private-connections)       |
| **BAAs**                                                    | Available for an additional fee                          |
| **Automatic backups**                                       | Every 12 hours                                           |
| **Support**                                                 | Standard, upgrade available\*\*\*                        |
| [**Data Branching®**](/docs/concepts/data-branching)       | Included                                                 |

\* Production branch storage is billed at $1.50 (1 primary + 2 replicas) and development branch storage is billed at $0.50 (1 primary).

\*\* Additional production branches are billed at the cost of your selected cluster size per month.

\*\*\* [SSO](/docs/concepts/sso) and [Business support](/docs/support/support-overview#business) options are available on the Scaler Pro plan for an additional fee.

### Additional production branches

Each production branch in the Scaler Pro plan provisions a separate, production database cluster in our infrastructure. Upon adding an additional production branch, you will be prompted to select the cluster size for the new branch.

Each cluster size is priced based on the selected region. You can find the full list of pricing in our [Cluster pricing documentation](/docs/concepts/scaler-pro-cluster-pricing). As an example, the following table lists the cost of each available cluster in the AWS us-east-1 region (at the time of writing):

| **Cluster size** | **Cost** |
| ---------------- | -------- |
| PS-10            | $39.00   |
| PS-20            | $59.00   |
| PS-40            | $99.00   |
| PS-80            | $179.00  |
| PS-160           | $349.00  |
| PS-320           | $699.00  |
| PS-400           | $999.00  |

If you have a `main` production branch using the **PS-40** cluster size and two additional production branches using the **PS-20** cluster size, the total cost for the database would be **$217.00** per month.

| **Production branch cluster** | **Cost per unit** | **Quantity** | **Total per month** |
| ----------------------------- | ----------------- | ------------ | ------------------- |
| PS-40                         | $99.00            | 1            | $99.00              |
| PS-20                         | $59.00            | 2            | $118.00             |
| **Grand total**               |                   |              | **$217.00**         |

Also note that Scaler Pro pricing is prorated.
If you create a new database in the middle of a billing cycle, you will only be charged for the appropriate fraction of the month.
This also applies to changes to an existing database, such as upsizing.
For example, if you have a database that started the month as a `PS-10` and at the halfway point in the month you upgrade to a `PS-20`, you would be charged $39/2 + $59/2 = $49 (assuming no additional other charges for storage, etc).

### Development branches

Scaler Pro development branches are billed for the time that they are running, prorated to the nearest second. Scaler Pro databases include `hours_in_current_month * 2` of development branch time per month (1,440 hours for a 30 day month) at no additional cost. Any time used over the included is billed at a rate of ~$0.014 per hour (`$10 / hours_in_current_month`).

{% callout %}
You can set spend email alerts from your billing page. See the [Spend management documentation](/docs/concepts/billing#spend-management) for more information.
{% /callout %}

If a Scaler Pro database is created in the middle of a billing cycle, the included development branch hours are prorated. For example, if you create your database with 15 days remaining in the current month, the database will have `15 days * 2` (720 hours) included for that billing period.

You may see how many development branch hours have been used at any time by visiting your [organization billing page](https://app.planetscale.com/~/settings/billing/). Data is updated hourly.

### Fractional vCPU allocation

Some tiers of the Scaler Pro plan indicate a fractional vCPU allocation. These branches run on our multi-tenant platform and this indicates the minimum number of cycles dedicated to your workload. The vast majority of the time, there are spare compute cycles available on the underlying machine instances hosting your branch, and those are available to be used by your workload as needed for no additional charge.

If you find the performance of a given query to be substantially inconsistent over the course of a given day, you may want to upgrade to a higher tier for more consistent performance.

### Selecting a cluster size

Selecting the correct cluster size for your database can have a dramatic impact on how it performs and how much it costs.

A good rule of thumb is when you notice CPU usage is consistently at or close to 100% for an extended period of time, you may benefit from [upsizing your cluster](#upsizing-and-downsizing-scaler-pro-clusters). Conversely, if your CPU usage is consistently below 50%, you may be able to downsize. You can monitor your CPU usage by clicking on your database, clicking "Primary" in your architecture diagram, and referencing the chart under "Metrics and performance".

There are also special cases where you may want to temporarily upsize out of caution if you're anticipating a large spike in traffic, such as during a launch or event. In these cases, you can easily [upsize](#upsizing-and-downsizing-scaler-pro-clusters) ahead of your event, and then downsize after. Changing cluster sizes is a seamless operation that requires no downtime.

If you are migrating from an existing cloud provider with resource-based pricing, be sure to compare your currently selected instance with our available **Scaler Pro** cluster sizes.

Keep in mind, each database comes with a production branch with two replicas, as well as 1,440 hours worth of development branches. The development branches essentially equate to two extra "always on" databases. In many cases, you can deprecate your dev/staging databases that you pay extra for with other providers in favor of the development branches. In the end, this usually results in significant cost savings.

Databases in PlanetScale also come with additional beneficial infrastructure that is not easily configured or available in other hosted database solutions. For more information on what is provisioned with each database, read our [Architecture](/docs/concepts/architecture) doc.

If you are unsure which plan or cluster size is right for your application, [contact us](/contact) to get further assistance.

Our self-serve plans are flexible enough to handle the majority of customers. However, there are several use cases where you may need a more custom plan. This is where our Enterprise offerings shine.

### Upsizing and downsizing Scaler Pro clusters

As your application scales, upgrading or downgrading your **Scaler Pro** cluster is a seamless operation that does not involve any downtime.

To change cluster sizes, go to your PlanetScale dashboard, click on your database, click the gear icon that specifies your current cluster size, select the new cluster size, and click "Update".

The time it takes to change sizes depends on the size and region of your database. Larger databases may take 20 minutes to upsize/downsize. However, this is all done online, so you will not experience any downtime. Keep in mind, once you update your cluster size, you cannot change sizes again until the first size change completes.

When you choose to change cluster size, we upgrade each of your replicas one by one: delete the tablet container, create a new tablet container of the new size, attach the persistent volume, start it up, and connect it to the primary. Once that's complete, we fail the primary over to one of those new replicas, and do the same thing to the old primary.

## PlanetScale Enterprise plan

PlanetScale's Enterprise Plan is great for large-scale businesses who require the enterprise-level SLAs, want expert assistance through enterprise support, and would prefer to run in your own AWS or GCP account.

We offer many different deployment options, all of which come with the same set of standard features. The table below covers those shared features, as well as the different options that vary depending on your chosen deployment.

|                                                        | PlanetScale Enterprise                        | **[PlanetScale Managed](/docs/enterprise/managed/overview)**                                                                                                                                                                      |
| ------------------------------------------------------ | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Horizontal sharding                                    | ✔                                            | ✔                                                                                                                                                                                                                                |
| Customizable feature limits                            | ✔                                            | ✔                                                                                                                                                                                                                                |
| [Support](/docs/support/support-overview)              | Business &mdash; Enterprise upgrade available | Enterprise                                                                                                                                                                                                                        |
| PCI compliant                                          | ❌                                            | ✔ (on AWS)                                                                                                                                                                                                                       |
| Dedicated AWS/GCP account                              | Optional                                      | ✔                                                                                                                                                                                                                                |
| Bring your own cloud (an AWS or GCP account _you_ own) | ❌                                            | ✔                                                                                                                                                                                                                                |
| Billing                                                | Directly from PlanetScale                     | Partial payment through PlanetScale and infrastructure costs through AWS/GCP. Take advantage of your own discounts. Optionally, purchase through [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-luy3krhkpjne4). |

## How do I know if I need an Enterprise plan?

If you’re not sure whether your use case requires an Enterprise plan, we’re more than happy to chat with you to figure it out together. You can [fill out this form](/contact), and we’ll be in touch.

In general, if you need any of the following, Enterprise may be the best solution for you:

- Enhanced support &mdash; our expert team becomes an extension of your own. Additional options for technical account management, Slack-based support, and phone escalation.
- You need additional support to horizontally shard and migrate your database(s) to PlanetScale
- You need your database deployed in a single-tenant environment
- You need to keep your data in **your own** AWS or GCP account
- You need a PCI DSS certified service provider
- Mission-critical [response times](/docs/support/support-overview#initial-response-times) including continuous support coverage
- Any other customizations — Our Enterprise plans offer a lot of flexibility, so if you have a requirement that’s not listed here, it’s best to [reach out](/contact) and we can see how we can help

## Plan add-ons

### Single Sign-on (SSO)

You can [add SSO](/docs/concepts/sso) for your organization on the Scaler Pro plan for an additional fee of $199/month.

### User-scheduled backups

On the Scaler Pro plan, we run automated backups every 12 hours. Disk space for default backups is not counted against your plan's storage limit.

You can also [schedule additional backups yourself](/docs/concepts/back-up-and-restore#create-manual-backups) as needed. For these additional user-scheduled backups, storage is billed at **$0.023 per GB** per month. Backups include system tables as well as your data and start at around 140MB.

## Discounts

We offer two types of discounts:

- **Consumption commitment** &mdash; Save 2.5% if you agree to an annual consumption commitment.
- **Upfront payment** &mdash; Save an extra 10% if you pay your annual bill upfront.

You have the option to combine these two discounts for a total of 12.5% off your bill if you commit to an annual consumption commitment dollar amount **and** pay for the year upfront.

{% callout %}
To be eligible for either of these discounts, you must commit to a minimum of $5,000 per year.
{% /callout %}

If you're interested in either of these discounts, please fill out our [contact form](/contact) and let us know which discount you're interested in, along with the following information:

- Annual spend commitment amount (in dollars)
- PlanetScale organization name (if it exists)
- Company name
- Company address
- Business point of contact name, email, phone
- Billing name, phone, email, address
