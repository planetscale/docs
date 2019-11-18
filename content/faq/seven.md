---
question: How does PlanetScale CNDb scale, if it uses a relational database?
order: 7
---

PlanetScale CNDb uses horizontal sharding for scaling MySQL databases. Applications connect to the Vitess databases using a stateless proxy that supports MySQL binary protocol and a full SQL parser (vtgate), which allows the application to perceive the horizontally sharded database cluster as if it were a single monolithic database. So while your application continues to run as if you were using just one database, the data can be spread across numerous database clusters (also called shards).
