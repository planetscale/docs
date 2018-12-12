---
question: What is sharding? Why does it matter? 
order: 8
---

Sharding is a type of database partitioning that separates very large databases into smaller, faster, more manageable parts called data shards.

There are numerous advantages to this approach:

* Since database tables are divided and distributed into multiple servers, index size is smaller, which improves search performance.
* Sharding enables distribution of write load over a large number of machines, greatly improving performance.
* Because the size of each shard is smaller, replication lag reduces and replication across multiple servers is much easier.
* These properties are also useful for worldwide distribution of databases, where communications links between data centers would otherwise create a bottleneck.
