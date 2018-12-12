---
question: How does PlanetScale scale, if it uses a relational database?
order: 7
---

PlanetScale uses horizontal sharding for scaling write operations. A key feature of Vitess is the vtgate proxy, which allows the application to perceive the horizontally sharded database cluster as if it were just one monolithic database. So while your application continues to run as if you were using just one database, the data can be spread across numerous database clusters.
