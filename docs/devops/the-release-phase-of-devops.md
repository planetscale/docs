---
title: 'The Release phase of the DevOps cycle'
subtitle: 'Where the operations teams will set up the environment for a successful launch.'
date: '2023-03-13'
---

The Release phase is where the 'Ops' part of DevOps starts. In the release phase, the primary goal is to ensure that the infrastructure and environment are set up for a successful launch of the updated software. This can include spinning up or down servers, updating operating system configurations, or setting up any other necessary infrastructure to support the application. At this point, the updated code should have been thoroughly tested and confirmed to be working to the best of the team's ability.

## How PlanetScale helps

Deploy requests in PlanetScale allow you to safely merge schema changes from a development branch into a production branch allowing for zero-downtime deployments of a new version of the database's schema. This is the phase where deploy requests will be utilized to prepare for a successful deployment.

### Deploy requests

[Deploy requests](/docs/concepts/deploy-requests) are used to merge schema changes from one branch to another, similar to how pull requests merge git branches. Deploy requests work by creating shadow tables that store the new version of the schema for that specific table and replicating data from the old version to the new one. This includes any writes that may occur during the process. When the data in both tables are synced up, you are presented with the option to cut over to the new version of the table, provided the `auto-apply` option wasn't enabled.

During this phase, a deploy request should be opened from the `dev` branch into the `production` branch of your database but not applied until the [Deploy phase](/docs/devops/the-deploy-phase-of-devops) coming up next. This will allow PlanetScale to stage the changes that need to be applied to your production database branch without affecting the current production version of your application.

This means that as long as the deploy request is not "applied" to the target branch, PlanetScale will continuously keep the live table (old schema) and shadow table (new schema) in sync until your team is ready to deploy the new artifacts into production.

### A note on blue/green deployments

If you are at the Scalar tier and above, PlanetScale databases support multiple production branches. Production branches automatically have an additional failover instance of your database ready behind the scenes to improve redundancy. While there are no tools directly within PlanetScale to assist with blue/green deployments for your database, multiple production branches can significantly reduce the administrative overhead of managing multiple MySQL environments.

{% callout title="Next steps" %} In this guide, we discussed the Release phase and how your production database can be set up for a live cutover using deploy requests. Next up is the Deploy phase, where all of the work is deployed to your production environment.

- [The Deploy phase](/docs/devops/the-deploy-phase-of-devops)

{% /callout %}
