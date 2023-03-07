---
title: 'The Plan phase of DevOps'
subtitle: 'Where all stakeholders plan the next iteration of the cycle.'
date: '2023-03-13'
---

The Plan phase is where the enhancements, changes, bug fixes, or new features are set up for developers to start building out. It is here that project managers and product owners review the feedback gathered from the previous development cycle and use it to determine what backlog items (or items that have yet to make it to the backlog) will provide the most value to end users, be they internal or external. If the team follows an agile development process, it's where sprints are planned and individual issues are assigned to various members of the team.

## How PlanetScale can help

While PlanetScale doesn't have tools to directly assist with the planning process, there is one key way that our platform can be utilized in this phase, and it ultimately depends on the source control strategy used throughout the remainder of the process. As you'll learn throughout this series of guides, having a good method to automate processes utilizing source control as the backbone for the overall process is critical in determining how simple or difficult it will be to use DevOps within your team.

### Database schema branching

If your process dictates that a branch be created for the active iteration before any code is submitted (the focus of the next phase), this is the perfect opportunity to create a new PlanetScale database development branch for the applications you will be working on.

A branch of a PlanetScale database is a completely isolated MySQL instance that has an exact copy of the schema of the upstream database. It allows developers to make changes to the schema of the branch without worrying about affecting the production database. Credentials required to connect to database branches are also unique to each branch. In other words, even branches within the same database environment have unique connection strings. Refer to the [documentation on branching](/docs/concepts/branching) to learn more.

### Data Branching®

PlanetScale also offers [Data Branching®](/docs/concepts/data-branching) in some pricing tiers. With Data Branching®, PlanetScale will automatically restore the latest version of the backup of a production branch into the new branch being created. This can help create a sandboxed environment for developers to work with that exactly mimics your production environment without affecting production data.

### Automate branching via the PlanetScale CLI

If your project management tools allow for automation, you can use either the [PlanetScale CLI](/docs/reference/planetscale-cli) or [our public API](https://api-docs.planetscale.com/reference/getting-started-with-planetscale-api) to automatically create a branch and credential set whenever a sprint or iteration is created. The `pscale` CLI is a cross-platform command line application that can be used to interact with PlanetScale databases, and the API is a set of HTTP endpoints that can be used to automate certain functions of a PlanetScale database. Refer to either the [`pscale` documentation](/docs/concepts/planetscale-environment-setup) to learn more about the CLI, or the [API documentation](https://api-docs.planetscale.com/reference/getting-started-with-planetscale-api) to learn more about how to use the PlanetScale API.

{% callout title="Next steps" %}
In this guide, we touched on the planning process and how project management software can utilize the `pscale` CLI to automatically create branches when a new iteration is kicked off. The next step in the DevOps cycle is the code phase, where developers build the functionality set forth by the planning phase.

- [The Code phase](/docs/devops/the-code-phase-of-devops)

{% /callout %}
