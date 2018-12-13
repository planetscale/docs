---
question: How does PlanetScale survive failures?
order: 11
---

We configure MySQL to use semi-sync replication. We use anti-affinity to schedule replicas in multiple availability zones. Slack has been running their Vitess cluster in this configuration and is happy with the results.
