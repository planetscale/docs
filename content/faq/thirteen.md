---
question: How does PlanetScale ensure high availability?
order: 13
---

PlanetScale ensures high availability by quickly promoting a replica to a master, if a master goes down. The replica is guaranteed to have all the data from old master because we run all replicas in the semi-sync mode.
