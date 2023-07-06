---
title: 'Billing'
subtitle: 'PlanetScale pricing was designed for transparency and scalability.'
date: '2023-03-28'
---

## Overview

PlanetScale offers three different plan types:

- [Usage-based](#usage-based-plans) &mdash; based on the rows read and written by the database.
- [Resource-based](#resource-based-plans) &mdash; billed at a fixed rate depending on your cluster size.
- [Enterprise](#enterprise-plan) &mdash; custom built solutions based on the needs of your business.

PlanetScale applies billing plans at the **database level**. You can create several databases under one Organization. The usage charges will be scoped to each database, which you can find all together in the [billing section of your Organization](/docs/concepts/billing#organization-usage-and-billing-page). Each plan is further broken down in the following sections.

{% callout %}
We used **[gibibytes, otherwise known as binary gigabytes](https://simple.wikipedia.org/wiki/Gibibyte)**, to calculate storage and usage limits. For reference, 1 binary gigabyte is equivalent to 2^30 bytes.
{% /callout %}

## Usage-based plans

PlanetScale provides two usage-based plans: `Hobby` and `Scaler`. These plans are charged on three factors:

- **Reads**: Retrieving or inspecting rows during a query or mutation of any kind to your PlanetScale databases.
- **Writes**: Adding new information or changing existing information in your PlanetScale databases.
- **Storage**: Data saved in the form of tables, columns, rows, and their corresponding relationships.

See the ["Understanding rows read" section](#understanding-rows-read) for a more in-depth look at the rows read calculation.

Some limitations apply to the free tier. See below for more information.

The usage-based plans are summarized below:

|                                                             | **Hobby**      | **Scaler**             |
| ----------------------------------------------------------- | -------------- | ---------------------- |
| **Storage/month**                                           | 5 GB           | 10 GB\*                |
| **Row reads/month**                                         | 1 billion      | 100 billion\*          |
| **Row writes/month**                                        | 10 million     | 50 million\*           |
| **Available cluster sizes**                                 | 1              | 1                      |
| **Availability zones**                                      | 1              | 1                      |
| **Production branches**                                     | 1 per database | 2 per database         |
| **Development branches**                                    | 1 per database | 5 per database         |
| **Concurrent connections**                                  | 1,000          | 10,000                 |
| **Query Insights retention**                                | 24 hours       | 7 days                 |
| **Horizontal sharding**                                     | Not included   | Not included           |
| [**Deployment options**](/docs/concepts/deployment-options) | Multi-tenant   | Multi-tenant           |
| **Read only regions**                                       | Not included   | Included               |
| **Web console**                                             | Included       | Included               |
| **PlanetScale CLI**                                         | Included       | Included               |
| **SSO**                                                     | Not included   | Available as an add-on |
| **Audit log retention**                                     | 5 days         | 15 days                |
| **Automatic backups**                                       | Daily          | Every 12 hours         |
| **Support**                                                 | Community      | Standard               |
| [**Data Branching®**](/docs/concepts/data-branching)        | Not included   | Not included           |
| **Monthly cost**                                            | $0             | $29 per database       |

\* For the Scaler plan:

- Extra storage over the included amount is billed at $2.50 per additional 1 GB
- Extra rows read over the included amount are billed at $1 per additional 1 billion
- Extra rows written over the included amount are billed at $1.50 per additional 1 million.

{% callout %}
You are limited to **one free database per organization**. Free databases may be
[slept](/docs/concepts/database-sleeping) after a 7-day period of inactivity.
{% /callout %}

The Scaler plan is billed on a **monthly basis**.

### Plan add-ons

#### Development branch packs

You can add additional development branches to Scaler plans in **packs of 5** for an extra $25/mo per pack.

**To add a branch pack to a database:**

1. Select the database you want to add branches to
2. Click on the "**Settings**" tab in the top nav
3. Click "Add-ons" from the side nav
4. Select the number of branch packs you'd like to add
5. Click "Save".

### Single Sign-on (SSO)

You can add SSO for your organization under the Scaler plan for an additional fee. Please [contact us](/contact) to enable SSO.

[On our pricing page](/pricing), you can find additional information about each plan's offerings, as well as a calculator to help you decide what plan is right for you.

### Understanding rows read

It can be difficult to decipher what counts as a row read. Nobody wants to run a seemingly simple query only to be hit with an unexpected bill. This section will attempt to break down what goes into the rows read calculation and how you can test your queries to _estimate_ the potential rows read before running them.

Rows read is a **measure of the work that the database engine does**, not a measure of the number of rows returned. Every row read from a table during execution adds to the rows read count, regardless of how many rows are returned. For this reason, it's important to optimize and index your queries.

#### Caveats

While, in most cases, the work done is a direct reflection of the number of rows read, there are some caveats.

The `SELECT count(*)` query is a special case. The database engine optimizes this query and doesn't read row data itself to return a count, so this doesn't actually increment rows read. In other words, if you run the query `SELECT count(*)` on a table with 10m rows, your rows read will be 0.

#### Testing queries for rows read

With our in-dashboard [Insights tool](/docs/concepts/query-insights), you can explore active queries running against your database. The "**Queries during the last 24 hours**" list has a column that shows the total rows read for that particular query. The "rows read" surfaced here is the same number we use to calculate your total rows read for your billing calculation. In addition, you can click on a particular query to see more information about its performance.

![PlanetScale Insights recent queries list](/assets/docs/concepts/query-insights/queries-2.png?v2)

If you'd prefer to test a query on your own, you can calculate the **approximate** rows read using the `EXPLAIN` statement. Running `EXPLAIN` with your query will return information about the query execution plan.

For example, if you want to estimate how many rows will be read from a `SELECT`, you could run:

```sql
EXPLAIN SELECT * from posts;
```

This table has 15 rows. All of them are read, which is reflected in the `rows` output returned:

```
+----+-------------+---------+------------+------+---------------+------+---------+------+------+----------+-------+
| id | select_type | table   | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra |
+----+-------------+---------+------------+------+---------------+------+---------+------+------+----------+-------+
|  1 | SIMPLE      | posts   | NULL       | ALL  | NULL          | NULL | NULL    | NULL |   15 |   100.00 | NULL  |
+----+-------------+---------+------------+------+---------------+------+---------+------+------+----------+-------+
```

It's important to remember the rows read returned with `EXPLAIN` will not always be the exact number of actual rows read, as it is **just an estimation**. You should not rely on this as an accurate way to determine billing ahead of time but rather as a starting point to see the potential impact of queries. It can be a great starting point for optimization.

To see the exact rows read, you will need to run the query. You can use the `EXPLAIN ANALYZE` statement to do this. It will return the estimated information about how it will run the query, run the query, and then return the actual impact of running the query.

```sql
EXPLAIN ANALYZE select * from posts
```

In this case, the estimated count shown in the first set of parentheses does match the actual count. But again, this will not always be the case.

```
+-------------------------------------------------------------------------------------------+
| EXPLAIN                                                                                   |
+-------------------------------------------------------------------------------------------+
| -> Table scan on posts  (cost=1.75 rows=15) (actual time=0.024..0.038 rows=15 loops=1)    |
|                                                                                           |
+-------------------------------------------------------------------------------------------+
```

#### Checking rows read

Another useful way to check rows read is using `innodb_rows_read`. This server status variable will show you the number of rows read across all tables. You can run it before and after queries to calculate how many rows were read. Keep in mind, if you have an active running database, this number may not be an accurate reflection of single query impact, as you may have other queries running in the background that affect the rows read.

```sql
SHOW GLOBAL STATUS LIKE 'Innodb_rows_read';
```

This returned output indicates that 4586 total rows have been read.

```
+------------------+-------+
| Variable_name    | Value |
+------------------+-------+
| Innodb_rows_read | 4586  |
+------------------+-------+
```

## Resource-based plans

The `Scaler Pro` plan is charged based on the selected cluster size, plus the cost of storage. There are currently 7 different cluster sizes available. The cost for these varies by the [database's selected region](/docs/concepts/regions).

|            | **Processor** | **Memory** |
| ---------- | ------------- | ---------- |
| **PS-10**  | 1/8 vCPU      | 1 GB RAM   |
| **PS-20**  | 1/4 vCPU      | 2 GB RAM   |
| **PS-40**  | 1/2 vCPU      | 4 GB RAM   |
| **PS-80**  | 1 vCPU        | 8 GB RAM   |
| **PS-160** | 2 vCPU        | 16 GB RAM  |
| **PS-320** | 4 vCPU        | 32 GB RAM  |
| **PS-400** | 8 vCPU        | 32 GB RAM  |

All Scaler Pro plans, regardless of cluster size, share the following features:

|                                                             | **Scaler Pro**                    |
| ----------------------------------------------------------- | --------------------------------- |
| **Storage/month**                                           | 10 GB\*                           |
| **Row reads/month**                                         | _Unlimited_                       |
| **Row writes/month**                                        | _Unlimited_                       |
| **Available cluster sizes**                                 | 7                                 |
| **Availability zones**                                      | 3                                 |
| **Production branches**                                     | 1 included\*\*                    |
| **Development branches**                                    | 2 included\*\*                    |
| **Concurrent Connections**                                  | 10,000                            |
| **Query Insights retention**                                | 7 days                            |
| **Horizontal sharding**                                     | Not included                      |
| [**Deployment options**](/docs/concepts/deployment-options) | Multi-tenant                      |
| **Read only regions**                                       | Included                          |
| **Web console**                                             | Included                          |
| **PlanetScale CLI**                                         | Included                          |
| **SSO**                                                     | Available as an add-on\*\*\*      |
| **Audit log retention**                                     | 15 days                           |
| **Automatic backups**                                       | Every 12 hours                    |
| **Support**                                                 | Standard, upgrade available\*\*\* |
| [**Data Branching®**](/docs/concepts/data-branching)        | Included                          |

\* For the Scaler Pro plan, any storage over the included amount is billed at $1.50 per additional 1 GB.
\*\* Additional production branches are billed at the cost of your selected cluster size per month, additional development branches are billed at $10.00 per branch per month.
\*\*\* SSO and [Business support](/docs/support/support-overview#business) options are available on the Scaler Pro plan for an additional fee.

### Single Sign-on (SSO)

You can add SSO for your organization under the Scaler Pro plan for an additional fee. Please [contact us](/contact) to enable SSO.

[On our pricing page](/pricing), you can find additional information about each plan's offerings, as well as a calculator to help you decide what plan is right for you.

## Enterprise plan

The Enterprise plan is fully customizable to suit your businesses needs. For more information about [our `Enterprise` plan](/enterprise), please [reach out to us](/contact).

|                                                             | **Enterprise**                           |
| ----------------------------------------------------------- | ---------------------------------------- |
| **Storage/month**                                           | Configurable                             |
| **Row reads/month**                                         | Configurable                             |
| **Row writes/month**                                        | Configurable                             |
| **Available cluster sizes**                                 | 42069                                    |
| **Availability zones**                                      | 3+                                       |
| **Production branches**                                     | Configurable                             |
| **Development branches**                                    | Configurable                             |
| **Concurrent Connections**                                  | _Unlimited_                              |
| **Query Insights retention**                                | Configurable                             |
| **Horizontal sharding**                                     | Configurable                             |
| [**Deployment options**](/docs/concepts/deployment-options) | Multi-tenant, Single-tenant, and Managed |
| **Read only regions**                                       | Included                                 |
| **Web console**                                             | Included                                 |
| **PlanetScale CLI**                                         | Included                                 |
| **SSO**                                                     | Included                                 |
| **Audit log retention**                                     | Configurable                             |
| **Automated Backups**                                       | Configurable                             |
| **Support**                                                 | Business, upgrade available\*            |
| [**Data Branching®**](/docs/concepts/data-branching)        | Included                                 |
| **Monthly cost**                                            | Custom                                   |

\* Enterprise support is available on the Enterprise plan for an additional fee.

## User scheduled backups

We run automatic daily backups for every branch for free. On the Scaler and Scaler Pro plans, we run automated backups every 12 hours. Disk space for default backups is not counted against your plan's storage limit.

You can also [schedule additional backups yourself](/docs/concepts/back-up-and-restore#create-manual-backups) as needed. For these additional user-scheduled backups, storage is billed at **$0.023 per GB** per month. Backups include system tables as well as your data and start at around 140MB.

## Organization usage and billing page

Each organization has its own billing page, from which you can:

- View your current and previous usage per database
- Upgrade a free database to the Scaler or Hobby plan
- Upgrade a Scaler database to the Scaler Pro plan
- Enter/update your credit card information
- Download current and previous invoices

**To find your billing page:**

1. Go to your [PlanetScale dashboard](https://app.planetscale.com)
2. Select the organization whose billing page you want to view
3. Click on "Settings" in the top nav
4. Click on "Usage and billing" in the side nav
5. Click on the "Billing" tab in the top nav

### PlanetScale invoice details

Invoices provide line items for both usage and discounts received. Each line item shows both **metric and database branch level** granularity.

For example, you may have the following line items:

- Rows _read_ for `main` branch
- Rows _read_ for `your-test-branch`
- Rows _read_ for `main` branch read-only region

In addition, storage per branch may have the following line items:

- Storage usage per GB
- Prorated discounts, if the branch existed for a smaller time period than the billing period
- Storage totals for each read-only region

Storage is prorated by a percentage equal to the existence of a branch's hours/billing period in hours.

### Download an invoice

To download an invoice, go to [your billing page](#find-your-database-billing-page) (`Organization > Settings > Usage and billing > Billing`).

You'll see a table of current and previous monthly invoices. You can download an invoice by month by clicking the "**Download**" button. This will send you to a Stripe invoice page, where you'll have the option to download the complete invoice in PDF format, see invoice details, or download your receipt.

To see more details about your billing from the PlanetScale dashboard, click the "**View details**" button on the Billing page next to the month you want to view. This will show you an overview of the charges for all of the databases in your organization.

{% callout %}
PlanetScale generates both current and past invoices. Even for the **free** plan! You can see the cost had you not
been on the Hobby plan.
{% /callout %}

## Using coupons

You can redeem a coupon in the PlanetScale dashboard. To redeem a coupon, you must first enter your credit card information. Once you have a credit card on file, go to your Organization Settings page, click "Usage and billing", click "Redeem a coupon" on the right, enter your coupon, and click "Redeem coupon".

{% callout %} You may incur additional costs if your usage continues beyond the period, dollar amount, or any other metrics specified in the coupon terms. Additional costs will be charged to your card on file. If you have any questions about the terms of the coupon, please reach out to [our Support team](#need-help). {% /callout %}

### How do coupons affect invoices

You will see your coupon reflected in your monthly invoice. Go to "Settings" > "Usage and billing" > "Billing" > and select the invoice for the month(s) where your coupon was active. You will see a note at the top of the invoice similar to this:

`Amount reflects your $xx.xx discount with code YOURCOUPONCODE`

![PlanetScale dashboard - Example coupon factored into invoice](/assets/docs/concepts/billing/coupons-in-invoices.png)
