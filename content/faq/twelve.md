---
question: Does PlanetScale CNDb support ACID transactions?
order: 12
---

PlanetScale CNDb supports full ACID within a shard. Vitess allows you to colocate relevant data in one shard, thus making a majority of queries and transaction to be single shard and fully ACID compliant. Across shards we support Atomicity and Durability. For cross-shard transactions we allow users to choose between two consistency models: best effort and 2PC. We do not support cross-shard Isolation. Most of our customers, including those in financial industries, find these tradeoffs acceptable. 
