---
title: 'The Build phase of the DevOps cycle'
subtitle: 'Where artifacts are generated based on the new code.'
date: '2023-03-13'
---

Now that the code is written and tested locally, it's time to build it for a production-like environment. Generally, this is an automated process that is triggered by the source control management software used throughout the DevOps pipeline.

When a build is triggered, a subprocess is kicked off based on that event to use a dedicated build server or containers to ensure that the code compiles. The result of the build phase is the artifacts or compiled/transpile versions of the code. These artifacts should be the same files that are used throughout the remainder of the process, including the testing process and deployment to production.

There are three ways that the build process is typically triggered:

- Manually
- When commits are pushed
- When pull requests are approved and closed

## How PlanetScale helps

PlanetScale offers tooling and features to support many phases of the DevOps lifecycle, however since the Build phase is primarily focused on code compilation and generating artifacts for testing and deployment, there are no practical ways that our system can directly help during this process.

{% callout title="Next steps" %}
In this guide, we discussed the Build phase and how deploy requests can be used to merge changes to the test branch ahead of the Test phase, where the artifacts generated from this phase are run through a series of tests to ensure they are ready for production.

- [The Test phase](/docs/devops/the-test-phase-of-devops)

{% /callout %}
