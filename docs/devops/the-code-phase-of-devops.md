---
title: 'The Code phase of the DevOps cycle'
subtitle: 'Where developers build the work planned by the previous phase.'
date: '2023-03-13'
---

This is the phase developers are likely most fond of. The next iteration has been planned, tasks assigned, and the code is being written for improvements to come. As code is being written by developers on their workstations, changes will be frequently checked into a dedicated source control system that acts as the single source of truth for the codebase. While several different systems can be used, git is the most popular one. Many tools integrate with git, which will be important as we progress through the DevOps phases to follow.

## How PlanetScale can help

Companies that follow good DevOps practices should have isolated environments outside of production so when new code is being developed, there won't be any impact on the users actively working with the application. This also includes the storage layer of the application, which is where the database lives. There are several ways in which PlanetScale can help developers.

### Database branching

The first way that PlanetScale tooling can help is with the [schema branching](/docs/concepts/branching) flow at the heart of PlanetScale databases. As described in the [Plan phase](/docs/devops/the-plan-phase-of-devops), a branch of a database in PlanetScale is a completely isolated database with a copy of the production branch. Any operations performed on a branch will not affect any other branch of that database.

Since branches are separate from one another, a dedicated database branch should be created for developers to build on that is completely isolated from the production database. This same branch can be used later in the DevOps process to simplify merging changes into the production branch using a feature called [Deploy requests](/docs/concepts/deploy-requests), which will be expanded on in the [Release](/docs/devops/the-release-phase-of-devops) phase. If a branch wasn't created in the previous step, it should be created now before developers start writing code.

### Added security with the `pscale` CLI

Local configurations can be simplified as well by using the [PlanetScale CLI](/docs/concepts/planetscale-environment-setup) to create a tunneled connection to that branch using the [`pscale connect` command](/docs/reference/connect). This could be done in place of sharing connection strings. Account administrators in PlanetScale have [complete control](/docs/concepts/security) over the users who can connect in this manner, reducing the security risk of those connection strings being obtained by a bad actor.

This tunneling process can be run at the same time the local development environment starts by scripting the creation of the tunnel before starting any other dev tools. Since the process uses access-based authentication over connection strings, developers who work at companies where secrets are regularly rotated will not be affected in situations where connection strings for development databases need to be regenerated.

{% callout title="Next steps" %}
In this guide, we discussed the Code phase and how database branching and the PlanetScale CLI can help developers work a bit easier. The next step in the DevOps cycle is the build phase, where the new code built in this phase is compiled or otherwise set up.

- [The Build phase](/docs/devops/the-build-phase-of-devops)

{% /callout %}
