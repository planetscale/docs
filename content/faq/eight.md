---
question: What is sharding? Why does it matter? 
order: 8
---

Sharding is a type of database partitioning that splits very large databases into smaller, faster, more manageable parts called shards. Vitess gives you an unprecedented level of control over how each table is sharded, thus allowing you to co-locate relevant data in a single shard. Because of this architectural flexibility, in the majority of cases, a query can be served by a single shard allowing you to keep the benefits of an unsharded system while reaping the scaling and performance benefits of a sharded database. 

There are numerous advantages to this approach:

* Sharded tables are smaller, so indexes also remain smaller leading to faster search.
* Your write load is distributed across multiple shards thus increasing your write throughput.
* Because the size of each shard is smaller, replication lag is reduced and replication across multiple servers is much easier.

