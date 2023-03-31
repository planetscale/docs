---
title: 'The Test phase of the DevOps cycle'
subtitle: 'Where artifacts are run through a series of tests.'
date: '2023-03-13'
---

By this point, new code was written and compiled into artifacts that can be used during deployments, but it was likely only tested on the developers local machines. These development environments are likely not exactly the same as production and, as a result, may not necessarily mean that the same code will work smoothly in production. During the test phase, the artifacts are run through a series of tests, preferably using automation, to ensure the quailty and performance of the code, and to maintain interoperability with any other services or infrastructure as required.

## How PlanetScale helps

There are different types of tests that can be run, but the type that PlanetScale can help with most are integration tests. Integration testing involves testing your software with the different modules or services that also support the application, one of these being the database.

### Use a dedicated test branch of the database

Since database [schema branches](/docs/concepts/branching) in PlanetScale are isolated copies of your database schema, a dedicated branch can be should be created specifically for this phase. Many organizations configure their environments to move linearly (dev → test → production) throughout their pipeline. This is where the PlanetScale flow deviates from convention a bit. Since non-production branches can only be merged with production branches, and the dev branch (which is non-production) contains the version of our schema with the most recent changes, you'll need to create a branch from the `dev` database branch.

### Seed with production data

If your tier includes the Data Branching®, you can spin up yet another production-like environment by utilizing data from the most recent backup of the production branch database. This will ensure that your automated tests (as well as manual QA tests) will similate production as close as possible instead of relying on pre-determined test data. This can provide a greater opportunity for test to break and need revisiting, avoiding potential issues in production.

### Seed data with the PlanetScale CLI

There are times where bringing production data over for testing is not practical. In that situation, you'd may consider seeding the test database branch with the required data, as well as generate the connection strings required by the test environment. Luckily this functionality exists within the [PlanetScale CLI](/docs/concepts/planetscale-environment-setup) and can be automated. The [`pscale branch`](/docs/reference/branch) subcommand would be used to manage branches for a specific database. The [`pscale shell`](/docs/reference/shell) subcommand can actually accept a piped in `.sql` script in exactly the same way you'd use the `mysql` terminal client. And finally the [`pscale password`](/docs/reference/password) subcommand can be used to generate credentials for a given database branch.

### Delete the test branch

Once integration tests have completed successfully and all are passing, it is not likely that your `test` branch needs to remain active. Since the test branch is an isolated MySQL instance, you are safe to drop the branch without retaining any of the data it contains. This can be done manually through the PlanetScale dashboard, or you may use either the PlanetScale CLI or API to automate the process of deleting your test branch.

If you decide to script the CLI in your pipeline, you can use `pscale branch delete <DATABASE_NAME> <BRANCH_NAME>` to discard the branch and the data it holds. The PlanetScale API offers the `/organizations/<ORGANIZATION>/databases/<DATABASE_NAME>/branches/<BRANCH_NAME>` to delete branches if you want to use `curl` or other tools that can send HTTP requests.

{% callout title="Next steps" %} In this guide, we discussed the Test phase and dedicated database branches can be used to assist with integration testing. Next up is the Release phase, where the new software is set up for a successful deployment into production.

- [The Release phase](/docs/devops/the-release-phase-of-devops)

{% /callout %}
