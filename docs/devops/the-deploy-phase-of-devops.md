---
title: 'The Deploy phase of the DevOps cycle'
subtitle: 'Where all new changes are launched into production.'
date: '2023-03-13'
---

Everything in the previous phases has been building to this point. It's where all the hard work gets deployed to production for the world to use. The operations team will coordinate to copy release artifacts that have been built & tested to production servers. If your team follows a blue/green strategy, the load balancers will instead start redirecting traffic to the staging server, and the current production environment takes the responsibility for staging the next cycle of application updates.

## How PlanetScale helps

[Branching](/docs/concepts/branching) and [deploy requests](/docs/concepts/deploy-requests) in PlanetScale are the primary features that enable PlanetScale databases for flexibility in a DevOps environment. During this phase, any open deploy requests should be closed and applied to the production branch. All of the schema changes that were configured during development should now be in production, along with the new code that requires the changes to those tables. If your organization has opted into the [schema revert feature](/docs/concepts/deploy-requests#revert-a-schema-change), this starts the 30-minute window where you have the option to revert the changes in case something goes catastrophically wrong.

### Back out of changes with schema revert

Having a great deployment strategy is key to successfully implementing DevOps, but knowing how to properly back out of changes can be just as important. Many source control management systems can be automatically configured to retain a certain number of previous releases which can be used to roll back application code, but doing so for a database can be difficult without affecting the data it holds.

As stated previously in this series, Deploy request utilizes shadow tables to synchronize data changes between tables with the old version of the schema and tables with the new version of the schema. If schema revert is enabled, we will continue to synchronize changes between the live and shadow tables for a period AFTER the deploy request is closed and changes applied. This enables you to quickly revert the changes made by a deploy request and instantly bring back the old version of your schema. Having this capability can significantly decrease the time to revert changes, as well as reduce the potential for your application to stay in a bad state long term. This alone can increase developer confidence when it comes to applying changes to the database.

{% callout title="Next steps" %} In this guide, we discussed the Deploy phase and how any open deploy requests should be closed at this point, as well as how schema revert can help back out of bad changes quickly. The next step in the DevOps cycle is the Operate phase, where the Operations team maintains the infrastructure that powers the application.

- [The Operate phase](/docs/devops/the-operate-phase-of-devops)

{% /callout %}
