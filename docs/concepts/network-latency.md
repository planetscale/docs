---
title: 'Network latency'
subtitle: 'Learn how network latency can impact query speed.'
date: '2023-12-07'
---

## Overview

When connecting to PlanetScale, it's important to understand how network latency can impact query speed.

## What is network latency, and why is it important?

Network latency is the time it takes for data to travel across a network between your application and your database. Minimizing network latency for databases is critical because it adds additional time to your application's queries.

One of the primary causes of network latency is the distance between two endpoints. For example, if an application is hosted in Virginia and is communicating to a database in Paris, each query will spend around 80ms traveling between the two servers. For an application that does many queries, this network time adds up quickly and can greatly impact the application's performance.

### Choosing a region for your database

The most optimal location for your database is in the same region and cloud provider as your application. PlanetScale has [regions available in both AWS and GCP](/docs/concepts/regions). If your application is hosted outside of AWS or GCP, then we recommend
choosing the PlanetScale region that is geographically closest to your application servers.

#### Using `pscale ping`

You can use the [`pscale ping`](/docs/reference/ping) command to determine the best PlanetScale region for your application. It will measure the latency to each PlanetScale region
and display the results in an ordered list from fastest to slowest.

It's best to run this command directly from your application's server to get a realistic measure.

```shell
  NAME                          LATENCY   ENDPOINT                                         TYPE
 ----------------------------- --------- ------------------------------------------------ -----------
  AWS us-west-2                 34.6ms    aws.connect.psdb.cloud                           optimized
  AWS us-west-2                 34.8ms    us-west.connect.psdb.cloud                       direct
  GCP us-central1               57.5ms    gcp.connect.psdb.cloud                           optimized
  GCP us-central1               57.9ms    gcp-us-central1.connect.psdb.cloud               direct
  AWS us-east-2                 60.5ms    aws-us-east-2.connect.psdb.cloud                 direct
  GCP us-east4                  69.2ms    gcp-us-east4.connect.psdb.cloud                  direct
  AWS us-east-1                 70.2ms    us-east.connect.psdb.cloud                       direct
  GCP northamerica-northeast1   80.9ms    gcp-northamerica-northeast1.connect.psdb.cloud   direct
```

### Network latency and serverless applications

In traditional applications, a single region hosts both the application and database. With these both collocated in the same region, network latency is minimized. For serverless or "edge" deployment models, this can become more complex. In these scenarios, the application is often deployed to several different regions while the primary database remains in a single region. This can result in high network latency between the application and database.

When looking at network latency, there are two important dimensions to consider. First, the **distance between the application and PlanetScale's edge network**. And second, the **distance between the edge and the database**.

While there is no solution to completely eliminating latency, the path the connection takes over the internet can be optimized for these serverless applications. PlanetScale does this by connecting to the nearest edge location and having the traffic backhauled via PlanetScale's network rather than traversing the public internet.

For example, consider an application running in `us-east` that is connecting to a database in `eu-west`. This example is not optimized, and traffic is directed over public internet until it connects to PlanetScale's edge in `eu-west` before being directed to the database.

```
<client (us-east)> <-------> <edge (eu-west)> <-> <database (eu-west)>
```

The following example shows a more optimal traffic path. The application connects to PlanetScale's edge, and then the traffic is sent over PlanetScale's network to the database. This minimizes the time spent traversing the public internet.

```
<client (us-east)> <-> <edge (us-east)> <------> <database (eu-west)>
```

## How to tell if network latency is impacting my application

When experiencing slow query times, it's important to rule out any potential networking issues. First, you need to be able to measure the time your application is spending waiting on the query. The best sources of this data are application performance monitoring (APM) services or query-level logging from your application. Since applications can be complex and many different factors can influence a performance problem, it's important to isolate and measure only the time spent on the query from the application's perspective.

Once you have a measurement of the query in your application, you can then compare the query to the data in [Query Insights](/docs/concepts/query-insights). The difference between the numbers can give you an idea of how much time was spent transferring the data across the network. If you see a large difference, it is likely due to network latency between the application and database.

If you can access your application's host machine, you can also use `netcat` to understand the latency between the host and PlanetScale.

```shell
time nc -z aws.connect.psdb.cloud 3306

Connection to aws.connect.psdb.cloud port 3306 [tcp/mysql] succeeded!
nc -z aws.connect.psdb.cloud 3306  0.01s user 0.00s system 24% cpu 0.044 total
```

In this example, you can see establishing a connection took 44ms.

## PlanetScale hostnames

When connecting to PlanetScale, you have the option of two different hostnames: optimized or direct. For almost every case, we recommend using the optimized hostname. But there are some circumstances where using the direct hostname may work better for your application.

{% callout type="note" %}
This does not apply to [PlanetScale Managed](/docs/enterprise/managed/overview) and single-tenant customers who have a single hostname for their account.
{% /callout %}

## Optimized hostname

PlanetScale's optimized hostname uses Route 53's [latency-based](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html) routing to connect to the closest edge in PlanetScale's network. Using this hostname optimizes latency and improves reliability as it can route around regional network outages.

Examples of optimized hostnames:

- `aws.connect.psdb.cloud`
- `gcp.connect.psdb.cloud`

We recommend everyone use this hostname by default as it provides the best connection in most cases.

## Direct hostname

In some rare cases, we have found that PlanetScale's optimized hostname may not direct traffic along the most optimal path. If you are experiencing this, one solution is using
the direct hostname. We only recommend using this if your application and database are in the same region and you have confirmed the optimized hostname is directing traffic incorrectly.

To test if the direct hostname is better for your application, you can compare it to the optimized hostname by running `netcat` from your application's host machine.

```shell
time nc -z us-east.connect.psdb.cloud 3306

Connection to us-east.connect.psdb.cloud port 3306 [tcp/mysql] succeeded!
nc -z us-east.connect.psdb.cloud 3306  0.01s user 0.00s system 26% cpu 0.037 total
```

{% callout type="note" %}
If you have latency issues with the optimized hostname, we'd appreciate [hearing about your experience](https://support.planetscale.com/hc/en-us/requests/new) so that we can improve.
{% /callout %}
