---
title: 'Query Insights'
subtitle: 'Find and optimize long-running queries in your application, anomalies in your database, and more.'
date: '2024-08-28'
---

## Overview

PlanetScale Insights gives you a detailed look into **all active queries** running against your database. This in-dashboard tool allows you to identify queries that are running too often, too long, returning too much data, producing errors, and more. You can scroll through the performance graph to detect the time that a query was impacted and, if applicable, the [Deploy Request](/docs/concepts/deploy-requests) that affected it.

You can also see a [list of all queries](#queries-overview) performed on your database in the last 24 hours. For further analysis, you can sort these by metrics like amount of rows read, time per query, and more.

With this built-in tool, you can easily diagnose issues with your queries, allowing you to optimize individual queries without much digging. We will also alert you of any active issues your database may be having in the [Anomalies](/docs/concepts/anomalies) tab. This feature flags queries that are running significantly slower than expected.

Insights will also automatically recommend schema changes to improve database performance, reduce memory and storage, and improve your schema based on production database traffic. Read more about the supported recommendations and how to use them in the [schema recommendations documentation](/docs/concepts/schema-recommendations).

## Insights page overview

To view Insights for your database, head to the [PlanetScale dashboard](https://app.planetscale.com), select your database, and click the "**Insights**" tab.

{% callout %}
If you are a single-tenant or PlanetScale Managed customer, you will need to request access to Insights through your PlanetScale account manager.
{% /callout %}

The dropdown on the top right lets you select which branch you want to analyze. You can also choose which servers you want to view insights for: primary or replicas.

![PlanetScale Insights overview page](/assets/docs/concepts/query-insights/query-insights-overview.png)

You can click the dates listed above the graph to scroll through the past seven days. To further narrow down query analysis, you can select a time range by clicking on the graph and dragging the cursor across. This will zoom in on the selected timeframe.

You also have the option to save a screenshot of the graph by clicking "Save".

If any deploy requests were deployed during the selected period, you will also see an overlay with a link to the deploy request. This can help you quickly assess any impact a deploy request had on your database.

### Queries overview table

The table underneath the graph shows all queries performed on your database in the selected timeframe (last 24 hours by default).

For more information about how to read and interpret this data, see the [Queries overview](#queries-overview) section.

### Insights graph tabs

Once you have selected the branch and server you want to analyze, you can begin exploring the insights for them in the following tabs:

- [Query latency](#query-latency)
- [Anomalies](/docs/concepts/anomalies)
- [Queries](#queries)
- [Rows read](#rows-read)
- [Rows written](#rows-written)
- [Errors](#errors)

The remaining sections of this doc walk through how to interpret and act on the data in each tab. If you'd like to see a practical example of how to use Insights to debug a performance issue, check out our [Announcing Insights blog post](/blog/introducing-planetscale-insights-advanced-query-monitoring) or [this YouTube video](https://www.youtube.com/watch?v=kkjAxSViOAA) walking you through an example.

## Query latency

The default tab depicts your database's query latency in milliseconds over the last 24 hours.

By default, the graph contains two line charts showing `p50` and `p95` latency. This means 50% and 95% of requests, respectively, completed faster than the time listed. You can also click on the `p99` and `p99.9` pills to toggle those on, or click `p50` or `p95` to toggle those off.

## Queries

The Queries tab displays insights about all active running queries in your database. The graph displays total queries per second against the specified time period.

## Rows read

The Rows read tab displays the total number of rows read per second across the selected time period.

## Rows written

The Rows written tab displays the total number of rows written per second across the selected time period.

## Errors

The Errors tab surfaces any errors that have been captured on your database in a 24 hour period.

Underneath the graph, you'll find a list of database error messages that have been captured over the selected period.

You can click on any of the error messages on the Errors tab to open a more detailed view. This view shows you the individual queries that produced the error, when they ran, how long they ran, and any query tags attached to them.

## Queries overview

The table underneath the graph shows queries performed on your database in the selected timeframe (last 24 hours by default).

{% callout %}
The queries table does not show following statements types: `BEGIN`, `COMMIT`, `RELEASE`, `ROLLBACK`, `SAVEPOINT`, `SAVEPOINT_ROLLBACK`, `SET`.
{% /callout %}

You may see some placeholder values in the queries, such as `:v1`. This is because we consider the actual data private and normalize it away.

{% callout %}
You have the option to [opt in to complete query collection](#complete-query-collection) to see the full SQL statements.
{% /callout %}

You may also see one or more orange icons next to some queries.

- A shard icon indicates that the query requires execution across multiple shards.
- An exclamation point icon indicates that the query is not currently using an index and requires a full table scan.

Hovering over the icon will show a tooltip with information about the meaning of the icon.

This query overviews table shows the same data for all graph tabs except for [Anomalies](/docs/concepts/anomalies) and [Errors](#errors). For more information about the content for each of those, refer to each Anomalies and Errors sections above.

### Available query statistics

You can customize the metrics that show up on the Queries list by clicking the "Columns" dropdown.

- **Keyspace** — The keyspace(s) being queried or modified.
- **Table** — The table(s) being queried or modified.
- **Count** — The number of times this query has run.
- **Total time (ms)** — The total time the query has run in milliseconds.
- **`p50` latency** — The `p50` latency for the query in milliseconds. This means that 50% of requests completed faster than the time listed.
- **`p99` latency** — The `p99` latency for the query in milliseconds. This means that 99% of requests completed faster than the time listed.
- **Max latency** — The maximum observed latency for the query in milliseconds.
- **Rows returned** — The total number of rows fetched by a `SELECT` statement. This includes all times the query has run in the displayed time frame.
- **Rows read** — The total number of rows read. This includes all times the query has run in the displayed time frame.
- **Rows read/rows returned** — The result of dividing total rows read by rows returned in a query. A high number can indicate that your database is reading unnecessary rows, and they query may be improved by adding an index.
- **Rows affected** — The total number of rows modified by an `INSERT`, `UPDATE`, or `DELETE` statement. This includes all times the query has run in the displayed time frame.
- **Last run** — The last time a query was run.

You can also sort the columns for quick analysis by clicking on the title at the top of each column.

### Query filtering

The search bar above the table allows you to filter queries as needed. You can filter for query SQL, table name, tag name, tag value, user name, query count, query latency, multisharded queries, index name, and if the query was indexed. Click on the `?` next to the search bar for the full list of search syntax.

### Query deep dive

Clicking on a query in the Queries list will open a new page with more information about that query.

You'll first see the full query pattern, which displays the query with data normalized away. This query may run several times with different values, which Insights combines into a single query pattern.

You can also toggle on the [query `EXPLAIN` plan](/blog/how-read-mysql-explains) by clicking "Show explain plan", which generates the [execution plan](https://dev.mysql.com/blog-archive/mysql-explain-analyze/) for the selected query. You may have to fill in some sample values designated with placeholders like `:v1`. We use placeholders in the patterns both so you can look at whole patterns at once and so the literal values remain private.

Note, if you're viewing the `EXPLAIN` plan on a production branch, this button will be disabled unless you enable production web console access in your database Settings page.

If you'd like to further interact with the query, click "Open query in web console", and you'll be taken to your in-dashboard web console, where you can run the `EXPLAIN` plan.

#### Additional query information

Beneath the query pattern is a graph with more information about the query. The set of available metrics/tabs include: Query latency, Queries, Rows read, Rows written, Errors and Indexes. The Indexes graph (which is not show on the database-level page) shows the percentage of queries that used each of the listed indexes in each time bucket. Currently only `SELECT` queries show index usage information

Beneath the time series graphs you will see summary statistics for the query pattern. These data are scoped to the same time period shown in the main query pattern graphs. The available metrics have the same definitions as the query statistics listed in the main insights tab.

`SELECT` queries include a horizontal bar graph that shows the cumulative usage of each index over the complete time period shown in the main query pattern graphs.

To change the time period reflected in the graphs and summary statistics, click and drag to restrict the time window, or click on one of the day icons above the graph to select a different day.

#### Notable queries

Underneath the graph, you'll see a table with more information about notable instances of the query, which are defined as queries that took longer than 1s, read more than 10,000 rows, or produced an error.

If any of the selected queries have [SQL comment tags](https://google.github.io/sqlcommenter/) attached, you'll see the key-value pairs in the table under `Tags`.

{% callout %}
If you're sending queries with comments using the MySQL shell, make sure you have [enabled comments with the `-c` flag](https://dev.mysql.com/doc/refman/8.0/en/mysql-command-options.html#option_mysql_comments).
{% /callout %}

The table also surfaces when the query started, rows returned, rows read, rows affected, the time it took the query to run (in ms), and the user associated with the query.

### Complete query collection

If you would prefer to view the raw query data using Insights, you can enable this option in your database settings page. In the dashboard, select your database, click "**Settings**", scroll down until you see "**Complete query collection**", and click "**Enable**" to opt in.

With this enabled, Insights will gather the complete raw SQL statements and display them when a query deep dive is selected and in the `EXPLAIN` plan. For example, if you select a query from the table on the Insights page, the query pattern and the selected queries below it will display the full query.

Enabling complete query collection is beneficial when performance varies significantly within the same query pattern, and you need to see the full SQL statement, without placeholders, to identify the correct source of the performance issue.

However, full queries may contain personally identifiable information, so it's important to consider this before opting in to the feature. Because of this, only [Organization Administrators](/docs/concepts/access-control#organization-administrator) can choose to opt a database into complete query collection. Please read our [Privacy Policy](/legal/privacy) for more information on how we collect, process, and disclose your personally identifiable information.

#### Complete query collection and prepared statements

With prepared statements, complete query collection will not display the query values. That is because the MySQL query that is collected is parameterized at the database level, and we cannot extract the bind variables. PlanetScale does not recommend using prepared statements, we recommend disabling them in order to use complete query collection.
