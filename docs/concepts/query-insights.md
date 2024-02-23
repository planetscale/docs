---
title: 'Query Insights'
subtitle: 'Find and optimize long-running queries in your application, anomalies in your database, and more.'
date: '2022-11-28'
---

PlanetScale Insights gives you a detailed look into **all active queries** running against your database. This in-dashboard tool allows you to identify queries that are running too often, too long, returning too much data, producing errors, and more. You can scroll through the performance graph to detect the time that a query was impacted and, if applicable, the [Deploy Request](/docs/concepts/deploy-requests) that affected it.

You can also see a [list of all queries](#queries-overview) performed on your database in the last 24 hours. For further analysis, you can sort these by metrics like amount of rows read, time per query, and more.

With this built-in tool, you can easily diagnose issues with your queries, allowing you to optimize individual queries without much digging. We will also alert you of any active issues your database may be having in the [Anomalies](#anomalies) tab. This feature flags queries that are running significantly slower than expected.

## Insights page overview

To view Insights for your database, head to the [PlanetScale dashboard](https://app.planetscale.com), select your database, and click the "**Insights**" tab.

{% callout %}
If you are a single-tenant or PlanetScale Managed customer, you will need to request access to Insights through your PlanetScale account manager.
{% /callout %}

The dropdown on the top right lets you select which branch you want to analyze. You can also choose which servers you want to view insights for: primary or replicas.

![PlanetScale Insights overview page](/assets/docs/concepts/query-insights/query-insights-overview.png)

You can click the dates listed above the graph to scroll through the past seven days. To further narrow down query analysis, you can select a time range by clicking on the graph and dragging the cursor across. This will zoom in on the selected timeframe.

{% callout %}
On the free Hobby plan, query insights are limited to the previous 24 hours. To unlock the full seven days of
analytics, [upgrade to a paid plan](/docs/concepts/billing).
{% /callout %}

You also have the option to save a screenshot of the graph by clicking "Save".

If any deploy requests were deployed during the selected period, you will also see an overlay with a link to the deploy request. This can help you quickly assess any impact a deploy request had on your database.

### Queries overview table

The table underneath the graph shows all queries performed on your database in the selected timeframe (last 24 hours by default).

For more information about how to read and interpret this data, see the [Queries overview](#queries-overview) section.

### Insights graph tabs

Once you have selected the branch and server you want to analyze, you can begin exploring the insights for them in the following tabs:

- [Query latency](#query-latency)
- [Anomalies](#anomalies)
- [Queries](#queries)
- [Rows read](#rows-read)
- [Rows written](#rows-written)
- [Errors](#errors)

The remaining sections of this doc walk through how to interpret and act on the data in each tab. If you'd like to see a practical example of how to use Insights to debug a performance issue, check out our [Announcing Insights blog post](/blog/introducing-planetscale-insights-advanced-query-monitoring) or [this YouTube video](https://www.youtube.com/watch?v=kkjAxSViOAA) walking you through an example.

## Query latency

The default tab depicts your database's query latency in milliseconds over the last 24 hours.

By default, the graph contains two line charts showing `p50` and `p95` latency. This means 50% and 95% of requests, respectively, completed faster than the time listed. You can also click on the `p99` and `p99.9` pills to toggle those on, or click `p50` or `p95` to toggle those off.

## Anomalies

The Anomalies tab surfaces periods where your database performance was slower than expected.

Anomalies are defined as periods with a substantially elevated percentage of slow-running queries. PlanetScale Insights continuously analyzes your query performance to establish a baseline for expected performance. When a high enough percentage of queries are running more slowly than the baseline expecation, we call this an anomaly.

### Using the Anomalies graph

The graph shown under the Anomalies tab shows the percentage of queries executing slower than the 97.7th (2-sigma) percentile baseline on the y-axis and the period of time on the x-axis. The "expected" line shows the percent of queries that are statistically expected in a database with uniform query performance over time. Slight deviations from the expected value are normal. Only subtantial and sustained deviations from the expected value are considered an anomaly.

Each anomaly on the graph is clickable. Clicking on it will pull up more details about it in the table below the graph, such as: duration, percentage of increase, and when the anomaly occured. We also overlay any deploy requests that happened during that period over the anomaly graph.

On top of this, we also surface any impact to the following:

- The query that triggered the anomaly
- CPU utilization
- Memory
- IOPS
- Queries per second
- Rows written per second
- Rows read per second
- Errors per second

### Anomalies vs query latency

You may notice a correlation between some areas in the query latency graph and the anomalies graph. Conversely, in some cases, you may see a spike in query latency, but no corresponding anomaly.

Increased query latency _can_ be indicative of an anomaly, but not always. Query latency may increase and decrease in ways that don't always indicate an actual problem with your database.

For example, you may run a weekly report that consists of a few slow-running queries. These queries are always slow. Every week, you'll see a spike on your query latency graph during the time that your weekly report is generated, but not on your anomaly violations graph. The queries are running at their _expected_ latency, so this is not considered an anomaly.

### What should I do if my database has an anomaly?

The purpose of the Anomalies tab is to show you relevant information so you can determine what caused an anomaly and correct the issue.

Let's look at an example scenario. You deploy a feature in your application that contains a new query. This query is slow, running frequently, and is hogging database resources. This new slow query is running so often that it's slowing down the rest of your database. Because your other queries are now running slower than expected, an anomaly is triggered.

In this case, we will surface the new slow-running query so that you can find ways to optimize it to free up some of the resources it's using. Adding an index often solves the problem. You can test this by adding the index, creating a deploy request, and deploying it. If it's successful, you'll quickly see the anomaly end.

On the other hand, an anomaly does not necessarily mean you need to take any action. One common example where you may see an anomaly is in the case of large active-running backups. In this case, we will tell you that a backup was running during the time of the anomaly.

{% callout type="note" %}
Even if it causes an anomaly, we do not recommend you turn off backups to prevent possible data loss.
{% /callout %}

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

The table underneath the graph shows all queries performed on your database in the selected timeframe (last 24 hours by default).

You may see some placeholder values in the queries, such as `:v1`. This is because we consider the actual data private and normalize it away.

{% callout %}
You have the option to [opt in to complete query collection](#complete-query-collection) to see the full SQL statements.
{% /callout %}

You may also see a red shards icon next to some queries. This signifies that the query requires execution across multiple shards.

This query overviews table shows the same data for all graph tabs except for [Anomalies](#anomalies) and [Errors](#errors). For more information about the content for each of those, refer to each Anomalies and Errors sections above.

### Available query statistics

You can customize the metrics that show up on the Queries list by clicking the "Columns" dropdown.

- **Keyspace** &mdash; The keyspace(s) being queried or modified.
- **Table** &mdash; The table(s) being queried or modified.
- **Count** &mdash; The number of times this query has run.
- **Total time (ms)** &mdash; The total time the query has run in milliseconds.
- **`p50` latency** &mdash; The `p50` latency for the query in milliseconds. This means that 50% of requests completed faster than the time listed.
- **`p99` latency** &mdash; The `p99` latency for the query in milliseconds. This means that 99% of requests completed faster than the time listed.
- **Rows returned** &mdash; The total number of rows fetched by a `SELECT` statement. This includes all times the query has run in the displayed time frame.
- **Rows read** &mdash; The total number of rows read. This includes all times the query has run in the displayed time frame. This is the number that directly affects your [rows read billing calculation](/docs/concepts/hobby-plan#understanding-rows-read).
- **Rows read/rows returned** &mdash; The result of dividing total rows read by rows returned in a query. A high number can indicate that your database is reading unnecessary rows, and they query may be improved by adding an index.
- **Rows affected** &mdash; The total number of rows modified by an `INSERT`, `UPDATE`, or `DELETE` statement. This includes all times the query has run in the displayed time frame.
- **Last run** &mdash; The last time a query was run.

You can also sort the columns for quick analysis by clicking on the title at the top of each column.

### Query filtering

The search bar above the table allows you to filter queries as needed. You can filter for table name, tag name, tag value, user name, exact string match, query count, multisharded queries, and [Boosted](/docs/concepts/query-caching-with-planetscale-boost) queries. Click on the `?` next to the search bar for the full list of search syntax.

### Query deep dive

Clicking on a query in the Queries list will open a new page with more information about that query.

You'll first see the full query pattern, which displays the query with data normalized away. This query may run several times with different values, which Insights combines into a single query pattern.

You can also toggle on the [query `EXPLAIN` plan](/blog/how-read-mysql-explains) by clicking "Show explain plan", which generates the [execution plan](https://dev.mysql.com/blog-archive/mysql-explain-analyze/) for the selected query. You may have to fill in some sample values designated with placeholders like `:v1`. We use placeholders in the patterns both so you can look at whole patterns at once and so the literal values remain private.

Note, if you're viewing the `EXPLAIN` plan on a production branch, this button will be disabled unless you enable production web console access in your database Settings page.

If you'd like to further interact with the query, click "Open query in web console", and you'll be taken to your in-dashboard web console, where you can run the `EXPLAIN` plan.

#### Additional query information

Beneath the query pattern is a graph with more information about the query. The set of available metrics/tabs is the same as the main database-level metrics graphs: Query latency, Queries, Rows read, Rows written, and Errors.

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
