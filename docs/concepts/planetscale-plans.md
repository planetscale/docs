---
title: 'PlanetScale plans'
subtitle: 'Learn about the different products and plans we offer: Hobby, Scaler, Team, and Enterprise'
date: '2023-06-01'
---

## Overview

PlanetScale is built to accomodate all companies at all stages. Whether you need a hassle-free managed database for your side project or you’re running millions of queries per second at the scale of YouTube, we have a solution for you.

Our plans are split into two general offerings: [Self-serve](#self-serve-plans) and [Enterprise](#planetscale-enterprise-plan).

## Self-serve plans

Self-serve is comprised of our three plans that you can sign up and pay for straight from the PlanetScale dashboard: **Hobby**, **Scaler**, and **Team**. These plans are all usage-based and include different limits, as outlined in the table below.

|                              | **Hobby**                                     | **Scaler**                                          | **Team**                                                                 |
| ---------------------------- | --------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------ |
| **Storage/month**            | 5 GB                                          | 10 GB included + $2.50 per additional 1 GB          | 100 GB included + $2.50 per additional 1 GB                              |
| **Row reads/month**          | 1 billion                                     | 100 billion included + $1 per additional billion    | 500 billion included + $1 per additional billion                         |
| **Row writes/month**         | 10 million                                    | 50 million included + $1.50 per additional million  | 100 million included + $1.50 per additional million                      |
| **Production branches**      | 1 per database                                | 2 per database                                      | 3 per database                                                           |
| **Development branches**     | 1 per database                                | 5 per database                                      | 10 per database                                                          |
| **Audit log retention**      | 5 days                                        | 15 days                                             | 60 days                                                                  |
| **Concurrent connections**   | 1,000                                         | 10,000                                              | 10,000                                                                   |
| **Automated backups**        | Once daily                                    | Every 12 hours                                      | Every 12 hours                                                           |
| **Query Insights retention** | 24 hours                                      | 7 days                                              | 7 days                                                                   |
| **SSO**                      | Not included                                  | Available as an add-on                              | Included                                                                 |
| **Support**                  | [Hobby](/docs/support/support-overview#hobby) | [Standard](/docs/support/support-overview#standard) | [Standard](/docs/support/support-overview#standard), upgrade available\* |
| **Deployment options**       | Multi-tenant                                  | Multi-tenant                                        | Multi-tenant                                                             |
| **Monthly fee**              | $0                                            | $29 per database                                    | $599 per database                                                        |

\* [Business support](/docs/support/support-overview#business) is available on the Team plan for an additional fee.

Our self-serve plans are flexible enough to handle the majority of customers. However, there are several use cases where you may need a more custom plan. This is where our Enterprise offerings shine.

## PlanetScale Enterprise plan

PlanetScale's Enterprise Plan is great for users that want to scale farther, shard horizontally, and run PlanetScale in a dedicated AWS/GCP account. We offer many different deployment options, all of which come with the same set of standard features. The table below covers those shared features, as well as the different options that vary depending on your chosen deployment.

|                             | **Shared Tenancy** | **Single-Tenant** | **Managed** |
| --------------------------- | ------------------ | ----------------- | ----------- |
| Resource-based pricing      | ✔                  | ✔                 | ✔           |
| Horizontal sharding         | ✔                  | ✔                 | ✔           |
| Unlimited connections       | ✔                  | ✔                 | ✔           |
| Customizable feature limits | ✔                  | ✔                 | ✔           |
| BAAs available              | ❌                 | ✔                 | ✔           |
| Dedicated AWS/GCP account   | ❌                 | ✔                 | ✔           |
| Your own AWS/GCP account    | ❌                 | ❌                | ✔           |

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
- Any other customizations &mdash; Our Enterprise plans offer a lot of flexibility, so if you have a requirement that’s not listed here, it’s best to [reach out](/contact) and we can see how we can help
