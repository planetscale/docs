---
title: 'PlanetScale plans'
subtitle: 'Learn about the different products and plans we offer: Hobby, Scaler, Scaler Pro, and Enterprise'
date: '2023-06-01'
---

## Overview

PlanetScale is built to accomodate all companies at all stages. Whether you need a hassle-free managed database for your side project or you’re running millions of queries per second at the scale of YouTube, we have a solution for you.

Our plans are split into two general offerings: [Self-serve](#self-serve-plans) and [Enterprise](#planetscale-enterprise-plan).

## Self-serve plans

Self-serve is comprised of three plans that you can sign up for from the PlanetScale dashboard. The **Hobby** and **Scaler** are usage-based plans and are billed based on rows read/written to your database. **Scaler Pro** is resource-based and priced on the infrastructure provisioned to support your specific workload.

{% callout %}
Our Hobby plan is not available for users in all locations.
{% /callout %}

### Usage-based plans

|                                                                              | **Hobby**                | **Scaler**             |
| ---------------------------------------------------------------------------- | ------------------------ | ---------------------- |
| **Storage/month**                                                            | 5 GB                     | 10 GB\*                |
| **Row reads/month**                                                          | 1 billion                | 100 billion\*          |
| **Row writes/month**                                                         | 10 million               | 50 million\*           |
| **Available cluster sizes**                                                  | 1                        | 1                      |
| **Availability zones**                                                       | 1                        | 2                      |
| **Production branches**                                                      | 1 per database           | 2 per database         |
| **Development branches**                                                     | 1 per database           | 5 per database         |
| **Concurrent connections**                                                   | 1,000                    | 10,000                 |
| **Query Insights retention**                                                 | 24 hours                 | 7 days                 |
| **Horizontal sharding**                                                      | Not included             | Not included           |
| [**Deployment options**](/docs/concepts/deployment-options)                  | Multi-tenant             | Multi-tenant           |
| **Read only regions**                                                        | Not included             | Available as an add-on |
| **Web console**                                                              | Included                 | Included               |
| **PlanetScale CLI**                                                          | Included                 | Included               |
| **SSO**                                                                      | Not included             | Available as an add-on |
| **Audit log retention**                                                      | 5 days                   | 15 days                |
| **Automatic backups**                                                        | Daily                    | Every 12 hours         |
| **Support**                                                                  | Community                | Standard               |
| [**Data Branching®**](/docs/concepts/data-branching)                        | Not included             | Not included           |
| **Monthly cost**                                                             | $0 (limit of 1 database) | $29 per database       |
| [**PlanetScale Boost**](/docs/concepts/query-caching-with-planetscale-boost) | Not included             | Available as an add-on |

{% callout %}
We are [deprecating the Scaler plan](/blog/deprecating-the-scaler-plan). Starting February 12th, you will no longer be able to create new Scaler database clusters. We recommend starting on Scaler Pro for paid plans. Please see our [Scaler Pro upgrade documentation](/docs/concepts/scaler-pro-upgrade-faq) for more information.
{% /callout %}

### Resource-based plan

The **Scaler Pro** plan is broken down by cluster size, which have varying levels of compute power depending on the needs of your database.

|            | **Processor** | **Memory** |
| ---------- | ------------- | ---------- |
| **PS-10**  | 1/8 vCPU      | 1 GB RAM   |
| **PS-20**  | 1/4 vCPU      | 2 GB RAM   |
| **PS-40**  | 1/2 vCPU      | 4 GB RAM   |
| **PS-80**  | 1 vCPU        | 8 GB RAM   |
| **PS-160** | 2 vCPU        | 16 GB RAM  |
| **PS-320** | 4 vCPU        | 32 GB RAM  |
| **PS-400** | 8 vCPU        | 32 GB RAM  |

On top of processing and memory, all **Scaler Pro** cluster sizes share the following capacities.

|                                                                              | **Scaler Pro**                    |
| ---------------------------------------------------------------------------- | --------------------------------- |
| **Storage/month**                                                            | 10 GB\*                           |
| **Row reads/month**                                                          | _Unmetered_                       |
| **Row writes/month**                                                         | _Unmetered_                       |
| **Available cluster sizes**                                                  | 7                                 |
| **Availability zones**                                                       | 3                                 |
| **Production branches**                                                      | 1 included\*\*                    |
| **Development branches**                                                     | 2 included\*\*                    |
| **Concurrent Connections**                                                   | 10,000                            |
| **Query Insights retention**                                                 | 7 days                            |
| **Horizontal sharding**                                                      | Not included                      |
| [**Deployment options**](/docs/concepts/deployment-options)                  | Multi-tenant                      |
| **Read only regions**                                                        | Available as an add-on            |
| **Web console**                                                              | Included                          |
| **PlanetScale CLI**                                                          | Included                          |
| **SSO**                                                                      | Available as an add-on\*\*\*      |
| **Audit log retention**                                                      | 15 days                           |
| **Automatic backups**                                                        | Every 12 hours                    |
| **Support**                                                                  | Standard, upgrade available\*\*\* |
| [**Data Branching®**](/docs/concepts/data-branching)                        | Included                          |
| [**PlanetScale Boost**](/docs/concepts/query-caching-with-planetscale-boost) | Available as an add-on            |

\* For the Scaler Pro plan, any storage over the included amount is billed at $1.50 per additional 1 GB.
\*\* Additional production branches are billed at the cost of your selected cluster size per month, additional development branches are billed at $10.00 per branch per month.
\*\*\* SSO and [Business support](/docs/support/support-overview#business) options are available on the Scaler Pro plan for an additional fee.

#### Additional production branches

Each production branch in the Scaler Pro plan provisions a separate, production database cluster in our infrastructure. Upon adding an additional production branch, you will be prompted to select the cluster size for the new branch. As an example, the following table lists the cost of each available cluster in the AWS us-east-1 region at the time of this writing:

| **Cluster size** | **Cost** |
| ---------------- | -------- |
| PS-10            | $39.00   |
| PS-20            | $59.00   |
| PS-40            | $99.00   |
| PS-80            | $179.00  |
| PS-160           | $349.00  |
| PS-320           | $699.00  |
| PS-400           | $999.00  |

If you had a `main` production branch using the **PS-40** cluster size and two addition production branches using the **PS-20** cluster size, the total cost for the database would be **$217.00** per month.

| **Production branch cluster** | **Cost per unit** | **Quantity** | **Total per month** |
| ----------------------------- | ----------------- | ------------ | ------------------- |
| PS-40                         | $99.00            | 1            | $99.00              |
| PS-20                         | $59.00            | 2            | $118.00             |
| **Grand total**               |                   |              | **$217.00**         |

#### Fractional vCPU allocation

Some tiers of the Scaler Pro plan indicate a fractional vCPU allocation. These branches run on our multi-tenant platform and this indicates the minimum number of cycles dedicated to your workload. The vast majority of the time, there are spare compute cycles available on the underlying machine instances hosting your branch, and those are available to be used by your workload as needed for no additional charge.

If you find the performance of a given query to be substantially inconsistent over the course of a given day, you may want to upgrade to a higher tier for more consistent performance.

### Selecting a self-serve plan

Selecting the correct plan for your database can have a dramatic impact on how it performs, and how much it costs. The plans are designed to grow with you. For example:

- If you are starting a new project or simply experimenting with PlanetScale, the free **Hobby** plan is perfectly suited for you.
- If you are launching an application, upgrading to the **Scaler** plan is a cost effective way to add features and functionality that will help you scale and iterate on your application.
- Once your application's usage starts to grow, migrating to **Scaler Pro** will provide consistent performance and pricing.
- As your application scales, upgrading your **Scaler Pro** cluster to boost the performance of your database is as seamless operation.

If you are migrating from an existing cloud provider with resource-based pricing, be sure to compare your currently selected instance with our available **Scaler Pro** cluster sizes. Databases in PlanetScale often come with additional beneficial infrastructure that is not easily configured or available in other hosted database solutions. For more information on what is provisioned with each database, read our [Architecture](/docs/concepts/architecture) doc.

If you are unsure as to which plan or cluster size is right for your application, [contact us](/contact) to get further assistance.

Our self-serve plans are flexible enough to handle the majority of customers. However, there are several use cases where you may need a more custom plan. This is where our Enterprise offerings shine.

{% callout %}
In order to prevent fraud, PlanetScale requires a valid payment method to create databases on the Hobby (free) tier.
You will not be charged unless you create a Scaler or Scaler Pro database.
{% /callout %}

## PlanetScale Enterprise plan

PlanetScale's Enterprise Plan is great for users that want to scale farther, shard horizontally, and run PlanetScale in a dedicated AWS/GCP account. We offer many different deployment options, all of which come with the same set of standard features. The table below covers those shared features, as well as the different options that vary depending on your chosen deployment.

|                             | **Multi-Tenant** | **Single-Tenant** | **[Managed](/docs/enterprise/managed/overview)** |
| --------------------------- | ---------------- | ----------------- | ------------------------------------------------ |
| Resource-based pricing      | ✔               | ✔                | ✔                                               |
| Horizontal sharding         | ✔               | ✔                | ✔                                               |
| Unlimited connections       | ✔               | ✔                | ✔                                               |
| Customizable feature limits | ✔               | ✔                | ✔                                               |
| BAAs available              | ✔               | ✔                | ✔                                               |
| PCI compliant               | ❌               | ❌                | ✔ (on AWS)                                      |
| Dedicated AWS/GCP account   | ❌               | ✔                | ✔                                               |
| Your own AWS/GCP account    | ❌               | ❌                | ✔                                               |

## How do I know if I need an Enterprise plan?

If you’re not sure whether your use case requires an Enterprise plan, we’re more than happy to chat with you to figure it out together. You can [fill out this form](/contact), and we’ll be in touch.

In general, if you need any of the following, Enterprise may be the best solution for you:

- Resource-based pricing
- Unlimited connections
- Elegant sharding solution
- Enhanced support &mdash; our expert team becomes an extension of your own
- You need your database deployed in a single-tenant environment
- You need to keep your data in **your own** AWS or GCP account
- You need a signed BAA for HIPAA
- You need a PCI DSS certified service provider
- Any other customizations &mdash; Our Enterprise plans offer a lot of flexibility, so if you have a requirement that’s not listed here, it’s best to [reach out](/contact) and we can see how we can help
