---
title: 'PlanetScale Hobby plan'
subtitle: 'Learn about the free usage-based Hobby plan'
date: '2024-03-06'
---

## Overview

{% callout %}
The Hobby plan will be deprecated on April 8th, 2024, and you are no longer able to create new Hobby databases as of March 6th, 2024.

Any Hobby databases that have not been migrated by April 8th, 2024 will be slept. Data will not be deleted, but a paid plan will be required to access data after April 8th. Read the [Hobby plan deprecation FAQ documentation](/docs/concepts/hobby-plan-deprecation-faq) more information about next steps.
{% /callout %}

Although the Hobby plan has now been deprecated, this documentation will remain live as reference for existing Hobby databases until the final sunset date &mdash; April 8th, 2024.

The Hobby plan was our free tier database that could be used to test PlanetScale. It came with 5GB of storage and includes 1 billion row reads/mo, 10 million row writes/mo, one production branch, and one development branch.

Hobby database clusters live in 1 availability zone, and production branches include one primary and one replica by default.

Some important limitations of the Hobby plan to be aware of:

- In order to prevent fraud, PlanetScale requires a [valid payment method](/docs/billing/payment-method) to create databases on the Hobby tier. You will not be billed unless you create a Scaler Pro database, but you may see a [**temporary** $1 authorization charge](https://support.stripe.com/questions/unexpected-1-charge-on-customers-bank-statement) on your card for verification.
- If you do not add a valid payment method to existing organizations with a Hobby database, your database may be [slept](/docs/concepts/database-sleeping) at any time.
- You are limited to **one free database per organization**.
- Free databases may be [slept](/docs/concepts/database-sleeping) after a 7-day period of inactivity.

{% callout %}
If you have a Hobby database that has been slept and cannot be woken up due to not having a valid payment method, please [reach out to our Support team](https://support.planetscale.com/). They will wake your database for a short period of time so you can dump your data, if needed.
{% /callout %}

The following table shows everything that is included on the Hobby plan:

|                                                                              | **Hobby**                |
| ---------------------------------------------------------------------------- | ------------------------ |
| **Storage/month**                                                            | 5 GB                     |
| **Row reads/month**                                                          | 1 billion                |
| **Row writes/month**                                                         | 10 million               |
| **Available cluster sizes**                                                  | 1                        |
| **Availability zones**                                                       | 1                        |
| **Production branches**                                                      | 1 per database           |
| **Development branches**                                                     | 1 per database           |
| **Concurrent connections**                                                   | 1,000                    |
| **Query Insights retention**                                                 | 24 hours                 |
| **Horizontal sharding**                                                      | Not included             |
| [**Deployment options**](/docs/concepts/deployment-options)                  | Multi-tenant             |
| **Read only regions**                                                        | Not included             |
| **Web console**                                                              | Included                 |
| **PlanetScale CLI**                                                          | Included                 |
| **SSO**                                                                      | Not included             |
| **Audit log retention**                                                      | 5 days                   |
| **Automatic backups**                                                        | Daily                    |
| **Support**                                                                  | Community                |
| [**Data Branching®**](/docs/concepts/data-branching)                        | Not included             |
| **Monthly cost**                                                             | $0 (limit of 1 database) |
| [**PlanetScale Boost**](/docs/concepts/query-caching-with-planetscale-boost) | Not included             |

## Understanding rows read

The Hobby plan is usage-based, meaning we look at your rows read and rows written every month to determine overages.

This section will attempt to break down what goes into the rows read calculation and how you can test your queries to _estimate_ the potential rows read before running them.

Rows read is a **measure of the work that the database engine does**, not a measure of the number of rows returned. Every row read from a table during execution adds to the rows read count, regardless of how many rows are returned. For this reason, it's important to optimize and index your queries.

#### Caveats

While, in most cases, the work done is a direct reflection of the number of rows read, there are some caveats.

The `SELECT count(*)` query is a special case. The database engine optimizes this query and doesn't read row data itself to return a count, so this doesn't actually increment rows read. In other words, if you run the query `SELECT count(*)` on a table with 10m rows, your rows read will be 0.

#### Testing queries for rows read

With our in-dashboard [Insights tool](/docs/concepts/query-insights), you can explore active queries running against your database. The "**Queries during the last 24 hours**" list has a column that shows the total rows read for that particular query. The "rows read" surfaced here is the same number we use to calculate your total rows read for your billing calculation. In addition, you can click on a particular query to see more information about its performance.

![PlanetScale Insights recent queries list](/assets/docs/concepts/query-insights/queries-2.jpg)

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
