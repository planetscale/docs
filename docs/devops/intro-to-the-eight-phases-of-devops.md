---
title: 'The eight phases of DevOps'
subtitle: 'A brief introduction to the eight phases of DevOps.'
date: '2023-03-13'
---

DevOps is typically broken down into eight distinguished phases as an operational model. The phases operate in a continuous loop, with each phase providing value to the phase ahead of it as shown in the following diagram in the gray text:

![The eight phases of DevOps {priority}](/assets/docs/devops/intro-to-the-eight-phases-of-devops/devops-cycle.png)

This document will act as a brief introduction to these phases, with a summary of how various PlanetScale features apply to each phase. Links to the relevant PlanetScale feature documentation will be provided, and additional resources such as practical tutorials with specific products and frameworks will be included as they are built.

{% callout type="note" %}

**These articles are to act as guides.**

While DevOps presents the eight phases as an operational model, it's important to understand that these phases are to act as guidelines as opposed to a rigid workflow. As such, building a workflow that fits your business's needs is the important part and your workflow may differ drastically from what others have built.

In each article, you'll find specific recommendations on what features of PlanetScale can be used within that phase, but DevOps is not a "one size fits all" process. You are encouraged to modify the flow and use any features as you see fit, to make the product work for you.

{% /callout %}

## Plan

The Plan phase is where the enhancements, changes, or bug fixes are set up for the remainder of the process. In an agile environment, this is where sprints would be set up and tasks assigned to the developers to work towards releasing a new set of changes to the application.

[The Plan phase](/docs/devops/the-plan-phase-of-devops)

## Code

Once the new set of changes has been agreed upon and the work is assigned, it's time for the developers to start writing their code. As features are completed and set up for testing, cards on the work board slowly move from the To Do state to Done.

[The Code phase](/docs/devops/the-code-phase-of-devops)

## Build

Once the code has been reviewed by the team and approved, the build phase begins by utilizing automation tools to build the release artifacts. Artifacts are an isolated copy of the compiled or otherwise "set up" code that can be deployed to the necessary environments for testing or production. A small subset of fast-running unit tests may be executed here to quickly validate if the build will pass or fail before moving into more rigorous testing.

[The Build phase](/docs/devops/the-build-phase-of-devops)

## Test

The test phase is where the new build is run through a series of tests that will thoroughly check if it is production ready. Some of these tests can be automated such as long-running unit tests, integration tests, and performance tests. QA or user acceptance tests may however require someone to manually click around the application to ensure it does or looks like, it needs to.

Depending on the complexity of your application, Infrastructure as Code (IaC) tools can be used here to automate the process of provisioning entire environments dedicated to testing the application.

[The Test phase](/docs/devops/the-test-phase-of-devops)

## Release

The release stage acts as a milestone in the entire DevOps process and is where the “Ops” part of the process begins. By this point, all of the tests should have passed and the build can confidently be set up for deployment to production systems.

[The Release phase](/docs/devops/the-release-phase-of-devops)

## Deploy

This is the stage where the build artifacts are deployed to production for use by your customers and users. This is also where any infrastructure changes required would take place, whether that be with automation via IaC frameworks, or manually.

[The Deploy phase](/docs/devops/the-deploy-phase-of-devops)

## Operate

The operation phase dictates that the operations team ensure that infrastructure components stay online and grow with demand as needed. This may mean scaling up or down resources as needed. Cloud environments simplify this by providing methods to monitor the load on your system and automatically spinning up new nodes to properly balance the load.

User feedback is also gathered in this phase to be used to drive future development efforts, leading to a better system for the individuals or companies using the product.

[The Operate phase](/docs/devops/the-operate-phase-of-devops)

## Monitor

Monitoring is critical to any system to ensure that things are moving in the right direction. Gathering analytical data can help provide a more holistic picture of what’s needed on top of the feedback provided directly by users, and performing retrospectives on the processes followed by the team as a whole can help simplify procedures going forward, leading to a smoother flow overall.

[The Monitor phase](/docs/devops/the-monitor-phase-of-devops)
