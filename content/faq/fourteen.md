---
question: How does PlanetScale CNDb compare to MySQL or PostgreSQL?
order: 14
---

MySQL and PostgreSQL do not scale beyond a single node. PlanetScale CNDb, however, can scale indefinitely using horizontal sharding. The platform is built on top of Vitess.io, which is a sharding middleware layer that sits on top of MySQL.

We do not support Postgres protocol or the Postgres database as the underlying storage at the moment, but it is on the medium-term roadmap.
