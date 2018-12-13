---
question: What are the advantages of a relational database and a key-value database? How does PlanetScale Database-as-a-Service compare?
order: 6
---

Traditionally, key-value databases are heralded for having greater scalability than relational databases. In services and applications where data explodes exponentially with popularity (i.e. Facebook, LinkedIn), this scalability is essential.

However, what key-value stores have in scalability they lack in a number of other important features, including SQL protocol compatibility, secondary indexes, joins, and transactions.

PlanetScale’s novel offering, built on Vitess, uses a relational database and offers even greater scalability than key-value stores. At the same time, because of its relational backbone, PlanetScale does not sacrifice the key features that would normally be lost when working with a key-value store.

Essentially, PlanetScale allows you to scale your relational data like a NoSQL database. PlanetScale is a functional superset of a key-value store and also scales horizontally like a key-value store. The PlanetScale solution supports out-of-the-box globally scalable, multi-datacenter deployments.
