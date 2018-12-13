---
question: Does PlanetScale support ACID transactions?
order: 12
---

PlanetScale supports full ACID within a shard. Across shards we support Atomicity and Durability. For cross-shard transactions we allow users to choose between two consistency models: best effort and 2PC. We do not support cross-shard Isolation. Most of our customers, including those in financial industries, find these tradeoffs acceptable.
