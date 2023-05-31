---
title: 'Query Insights'
subtitle: 'Find and optimize long-running queries in your application.'
date: '2022-12-01'
---

PlanetScale Insights gives you a detailed look into the active queries running against your database. This in-dashboard tool allows you to identify queries that are running too often, too long, returning too much data, producing errors, and more. You can scroll through the performance graph to detect the time that a query was impacted and, if applicable, the [Deploy Request](/docs/concepts/deploy-requests) that affected it.

You can also see a [list of all queries](#queries-list) performed on your database in the last 24 hours. For further analysis, you can sort these by metrics like amount of rows read, time per query, and more.

## Insights page overview

To view Insights for your database, head to the [PlanetScale dashboard](https://app.planetscale.com), select your database, and click the "**Insights**" tab.

Below is an overview of what you'll find on this page. If you'd like to see a practical example of how to use Insights to debug a performance issue, check out our [Announcing Insights blog post](/blog/introducing-planetscale-insights-advanced-query-monitoring).

{% vimeo src="https://player.vimeo.com/video/830571854" caption="This video shows an example Insights page. All explanations are covered in this doc." /%}

{% callout %}
On the free Hobby plan, query insights are limited to the previous 24 hours. To unlock the full seven days of
analytics, [upgrade to a paid plan](/docs/concepts/billing).
{% /callout %}

## Branch selection

![PlanetScale Insights branch selection](/assets/docs/concepts/query-insights/branches.png)

The dropdown on the top right lets you select which branch you want to analyze. The selection applies to the entire Insights page.

## Insights graph

![PlanetScale Insights graph](/assets/docs/concepts/query-insights/graph.png)

This graph depicts your database activity over a 24-hour period. You'll also see links to any deploy requests at the time that you deployed them.

You can click the dates listed above the graph to scroll through the past seven days. If you're on our free Hobby plan, activity is limited to the previous 24 hours.

## Graph metrics selection

![PlanetScale Insights graph metrics selection - rows written](/assets/docs/concepts/query-insights/metrics.png)

The dropdown on the top left lets you select what metric you want to see on the graph. You can hover over a specific time on the graph to see the metric(s) for that time period.

The available options are:

- **Rows read per second** &mdash; Total count followed by rows read per second.
- **Rows written per second** &mdash; Total count followed by rows written per second.
- **Query latency (ms)** &mdash; Two line charts showing p50 and p90 latency. This means 50% and 90% of requests, respectively, completed faster than the time listed.
- **Queries per second** &mdash; Total queries per second.
- **Query errors** &mdash; Any errors that have been captured on your database. See the **Errors** tab on the table below for a deep dive.

## Queries list

![PlanetScale Insights recent queries list](/assets/docs/concepts/query-insights/queries.png)

The table underneath the graph shows all queries performed on your database in the past 24 hours. To further narrow down query analysis, you can select a time range from the above graph to restrict the table to queries that happened in that time frame.

You can also sort the columns for quick analysis.

![Insights queries selected time range](/assets/docs/concepts/query-insights/timeframe.png)

You may see some placeholder values in the queries, such as `:v1`. This is because we consider the actual data private and normalize it away.

{% callout %}
You have the option to [opt in to complete query collection](#complete-query-collection) to see the full SQL statements.
{% /callout %}

**Available query statistics**:

- **Count** &mdash; The number of times this query has run.
- **Total time (ms)** &mdash; The total time the query has run in milliseconds.
- **Time per query (ms)** &mdash; The number of milliseconds each individual query takes to run. This is calculated from total time divided by count.
- **Table** &mdash; The table(s) being queried or modified.
- **Rows returned** &mdash; The total number of rows fetched by a `SELECT` statement. This includes all times the query has run in the displayed time frame.
- **Rows read** &mdash; The total number of rows read. This includes all times the query has run in the displayed time frame. This is the number that directly affects your [rows read billing calculation](/docs/concepts/billing#understanding-rows-read).
- **Rows affected** &mdash; The total number of rows modified by an `INSERT`, `UPDATE`, or `DELETE` statement. This includes all times the query has run in the displayed time frame.

You can customize the metrics that show up on the Queries list by clicking the "Columns" dropdown.

## Query deep dive

Clicking on a query in the Queries list will open a new page with more information about that query, such as:

- **The query pattern** &mdash; The query with data normalized away. This query may run several times with different values, which Insights combines into a single query pattern.
- **Selected instances of the query** &mdash; Below the query pattern, we surface any instances of the query that took longer than one second, read more than 10,000 rows, or produced an error.
- **Error messages** &mdash; If any exist.
- **Query tags** &mdash; If any of the selected queries have [SQL comment](https://google.github.io/sqlcommenter/) tags attached, you'll see the key-value pairs in the table. Note, if you're sending queries with comments using the MySQL shell, make sure you have [enabled comments with the `-c` flag](https://dev.mysql.com/doc/refman/8.0/en/mysql-command-options.html#option_mysql_comments).
- **Query `EXPLAIN` plan** &mdash; If you toggle "Show explain plan", you can generate the [execution plan](https://dev.mysql.com/blog-archive/mysql-explain-analyze/) for the selected query. You may have to fill in some sample values designated with placeholders like `:v1`. We use placeholders in the patterns both so you can look at whole patterns at once and so the literal values remain private.
- **Query metrics** &mdash; A graph of the metrics associated with this query. The set of available metrics is the same as the database level metrics graphs.

If you'd like to further interact with the query, click "Open query in web console", and you'll be taken to your in-dashboard web console, where you can run the `EXPLAIN` plan.

Note, if you're viewing the `EXPLAIN` plan on a production branch, this button will be disabled unless you enable production web console access in your database Settings page.

![PlanetScale Insights query pattern w/ explain plan](/assets/docs/concepts/query-insights/query.png)
![PlanetScale Insights explain plan](/assets/docs/concepts/query-insights/explain.png)

## Database errors

The table underneath the top graph also contains an **Errors** tab, which shows you a list of database error messages that have been captured over the last 24 hours. You can click the dates listed above the graph to scroll through the past seven days. If you're on our free Hobby plan, activity is limited to the previous 24 hours.

![PlanetScale Insights errors tab](/assets/docs/concepts/query-insights/errors.png)

You can click on any of the error messages on the Errors tab to open a more detailed view. This view shows you the individual queries that produced the error, when they ran, how long they ran, and any query tags attached to them.

![PlanetScale Insights errors tab deep dive showing queries](/assets/docs/concepts/query-insights/errors-detailed-view.png)

## Complete query collection

If you would prefer to view the raw query data using Insights, you can enable this option in your database settings page. In the dashboard, select your database, click "**Settings**", scroll down until you see "**Complete query collection**", and click "**Enable**" to opt in.

![PlanetScale Insights complete query collection opt in](/assets/docs/concepts/query-insights/opt-in.png)

With this enabled, Insights will gather the complete raw SQL statements and display them when a query deep dive is selected and in the `EXPLAIN` plan. For example, if you select a query from the table on the Insights page, the query pattern and the selected queries below it will display the full query.

![PlanetScale Insights unnormalized data in query deep dive](/assets/docs/concepts/query-insights/unnormalized-data.png)

Enabling complete query collection is beneficial when performance varies significantly within the same query pattern, and you need to see the full SQL statement, without placeholders, to identify the correct source of the performance issue.

However, full queries may contain personally identifiable information, so it's important to consider this before opting in to the feature. Because of this, only [Organization Administrators](/docs/concepts/access-control#organization-administrator) can choose to opt a database into complete query collection. Please read our [Privacy Policy](/legal/privacy) for more information on how we collect, process, and disclose your personally identifiable information.
