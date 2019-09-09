---
title: PlanetScale achieves massive transaction numbers with Amazon Aurora-backed Vitess clusters
date: '2019-09-09T11:00:00-08:00'
description: At over 16 million TPC-C transactions per minute, Amazon Aurora + Vitess demonstrates impressive scalability.
author: Saif Alharthi, Dan Kozlowski
comments: false
share: true
---

Vitess is an [Open Source](https://github.com/vitessio/vitess) database clustering system for horizontal scaling of MySQL backed by the [CNCF](https://www.cncf.io). It has been deployed and trusted in production at companies such as Youtube, Slack, Square, and Pinterest.

At [PlanetScale](https://planetscale.com), we strongly believe in [Vitess](https://vitess.io)'s capabilities as a scalable storage solution. Our business is based on providing support for Open Source Vitess, our multi-cloud database-as-a-service, and the Vitess on Kubernetes software stack that we provide to enterprise customers on a subscription basis.

## Why did we benchmark Vitess on Amazon Aurora?

Vitess presents itself to applications as a MySQL Server, and can use any MySQL compatible database as the backend data store. With [Amazon Aurora](https://aws.amazon.com/rds/aurora/) claiming 5x performance over MySQL (and winning the [SIGMOD 2019 Systems Award](https://sigmod2019.org/awards)), it seemed like a natural fit to benchmark.

We were able to pique the interest of Amazon’s Aurora team, who graciously provided us with credits to explore Vitess’s performance and scalability on top of their instances.

## TPC-C

[TPC-C](http://www.tpc.org/tpcc/) is an industry standard OLTP benchmark that simulates transactions for a general retail company. TPC-C measures the number of orders per minute for the whole system, with the warehouse quantity serving as the scale factor for this benchmark. The number of orders and the subsequent amount of data generated is proportional to the number of warehouses being tested against.

We first ran our tests on the most common numbers: 1000, 10,000, and 50,000 warehouses. We then went a step further and tested our system on 100,000 warehouses which generated a massive amount of data. The following table illustrates the data size generated for each:

| # Warehouses | Data Size |
| ------------ | --------- |
| 1000         | 22.7GB    |
| 10000        | 240GB     |
| 50000        | 5.4TB     |
| 100000       | 10.9TB    |

## Benchmark Settings

<figure>
    <img src="/img/eks-deployment.png" alt="PlanetScale's benchmark deployment architecture diagram"/>
    <figcaption>Figure 1: PlanetScale's benchmark deployment architecture</figcaption>
</figure>

Vitess allows you to shard each table in a keyspace by choosing columns to shard on and a sharding function. We chose **warehouse_id** column as the sharding key wherever it was available. When **warehouse_id** was not present, we instead sharded on the **id** column.

For our benchmarking purposes we used [Sysbench](https://www.percona.com/blog/2018/03/05/tpcc-like-workload-sysbench-1-0/), an open source benchmarking suite that runs TPC-C-like workloads. We modified the syntax of some queries (not the schema, nor what the queries were trying to achieve) in our fork of [Sysbench](https://github.com/planetscale/sysbench-tpcc) so that they could be parsed correctly by Vitess.

As seen in <b>Figure 1</b> we deployed PlanetScale's operator, Vitess, and Sysbench driver inside a **c5n.18xlarge** [EKS](https://aws.amazon.com/eks/) instance. And we used 4, 8, and 16 instances of **r4.8xlarge** and 64 instances of **r4.16xlarge** to test for the largest scale factor (100K warehouses).

We used [Terraform](https://www.terraform.io/) to provision our deployments and it helped make the process of running it much easier.

In the Vitess architecture, the [vtgate](https://vitess.io/docs/overview/architecture/) servers are responsible for routing traffic to the correct Amazon Aurora instance.

## Evaluation

<figure>
    <img src="/img/tpcc_max_bench.png" alt="TPC-C Max Throughput"/>
    <figcaption>Figure 2: TPC-C Max Throughput for each scale factor and number of shards</figcaption>
</figure>

As seen in **Figure 2**, we achieved impressive performance numbers across all scale factors. There's a slight dip in the performance after increasing the scale factor from 50K to 100K in our 16 shards deployment. This shows that Vitess can handle massive scales even with less hardware capacity.

## Conclusion

We demonstrated impressive performance using Amazon Aurora as a backend storage using out of the box Vitess configurations. It's likely that we could've achieved even higher numbers if we tuned our Vitess configurations to better suit Amazon Aurora's MySQL backend, but wanted to prove that Vitess could demonstrate immediate performance improvements with low frictional cost.

We were not surprised at these numbers, as we have seen Vitess perform well under very high load at Youtube and other places. Yekesa Kosuru of State Street Bank [demonstrated](https://www.youtube.com/watch?v=YQWt6wdAZMU) **1.6M QPS** at AWS Re:Invent using Vitess and MySQL + RocksDB last November.

If you are interested in trying to replicate this benchmark, we would be more than happy to provide the Terraform configurations used to provision our deployment.

Also we are [hiring!](https://planetscale.com/careers)
