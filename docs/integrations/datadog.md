---
title: 'Datadog integration'
subtitle: 'Push usage and performance metrics about your PlanetScale databases to Datadog.'
date: '2024-08-28'
meta:
  title: 'Monitor with Datadog'
  description: 'Push metrics to Datadog to better understand your database usage and performance'
---

PlanetScale can push metrics to Datadog to assist your team with understanding your database usage and performance.

## Prerequisites

- A [Datadog](https://www.datadoghq.com/) account

## Configuring the Datadog integration

1. In Datadog, install the [PlanetScale integration](https://app.datadoghq.com/account/settings#integrations/planetscale).
2. Create a Datadog API key in your [Datadog Organization Settings](https://app.datadoghq.com/organization-settings/api-keys) and copy the key.
3. In PlanetScale, go to your organization's [Integrations settings](https://app.planetscale.com/settings/integrations), and select **Configure** for the Datadog integration. Paste your Datadog API key into the field.

Once complete, a "PlanetScale" dashboard will be available with incoming metrics from PlanetScale.

![Image of the PlanetScale Default Dashboard in Datadog showing overview metrics, table and row breakdowns, info about connections, and query rates {priority}](/assets/docs/integrations/datadog/dashboard.png)

## Metrics We Collect

Once configured, PlanetScale collects the following metrics from every branch in your organization.

| **Metric name**                          | **Metric type** | **Description**                                                                                     |
| ---------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------- |
| planetscale.connections                  | gauge           | Number of active connections to a database branch. _Shown as connection._                           |
| planetscale.primary.cpu_usage            | gauge           | Percentage of CPU utilized on a database branch's primary. _Shown as percent._                      |
| planetscale.primary.memory_usage         | gauge           | Percentage of memory utilized on a database branch's primary. _Shown as percent._                   |
| planetscale.replication_lag              | gauge           | Replication lag in seconds between a database branch's primary and each replica. _Shown as second._ |
| planetscale.rows_read                    | count           | Number of rows read from a database branch. _Shown as row._                                         |
| planetscale.rows_written                 | count           | Number of rows written to a database branch. _Shown as row._                                        |
| planetscale.tables.cumulative_query_time | count           | Cumulative active query time in a database branch, by table and statement. _Shown as nanosecond._   |
| planetscale.tables.queries               | count           | Number of queries issued to a database branch, by table and statement. _Shown as query._            |
| planetscale.tables.rows_deleted          | count           | Number of rows deleted from a database branch, by table. _Shown as row._                            |
| planetscale.tables.rows_inserted         | count           | Number of rows inserted into a database branch, by table. _Shown as row._                           |
| planetscale.tables.rows_selected         | count           | Number of rows selected in a database branch, by table. _Shown as row._                             |
| planetscale.tables.rows_updated          | count           | Number of rows updated in a database branch, by table. _Shown as row._                              |
| planetscale.tables.storage               | gauge           | Total bytes stored in a database branch, by table. _Shown as byte._                                 |
| planetscale.vtgate.errors                | count           | Number of errors encountered by a database branch's vtgate. _Shown as error._                       |

## Billing

The Datadog integration is available on all of our [paid plans](/pricing).

## Frequently asked questions

### How do I track replication lag in Datadog?

You can use the following formula to set alerts for replication lag:

```
(max:planetscale.replication_lag{ps_database:<DATABASE_NAME> ps_tablet_type:replica, ps_branch:<MAIN>})
```

Make sure you replace `<DATABASE_NAME>` with your PlanetScale database name and `<MAIN>` with the name of the branch for which you'd like to track replication lag.
