---
title: 'DevOps with PlanetScale'
subtitle: 'Learn how to use PlanetScale within DevOps pipelines.'
date: '2023-03-13'
---

PlanetScale was built with continuous integration and deployment in mind. This section of our documentation contains guides and tooling recommendations to use with PlanetScale to enhance your pipelines for a smoother database experience.

## The eight phases of DevOps

DevOps is typically broken down into eight distinct phases as an operational model. Learn each of the phases of DevOps and how PlanetScale can help.

{% grid columns=3 %}
{% cell href="/docs/devops/intro-to-the-eight-phases-of-devops" title="The eight phases" description="Start here and build a foundation." /%}
{% cell href="/docs/devops/the-plan-phase-of-devops" title="1: Plan" description="Plan the work to be done in the coming iteration." /%}
{% cell href="/docs/devops/the-code-phase-of-devops" title="2: Code" description="Write code and build functionality." /%}
{% cell href="/docs/devops/the-build-phase-of-devops" title="3: Code" description="Compile the code and create build artifacts." /%}
{% cell href="/docs/devops/the-test-phase-of-devops" title="4: Test" description="Test the artifacts to ensure integrity." /%}
{% cell href="/docs/devops/the-release-phase-of-devops" title="5: Release" description="Stage the binaries and prep for release." /%}
{% cell href="/docs/devops/the-deploy-phase-of-devops" title="6: Deploy" description="Deploy the updated application to production." /%}
{% cell href="/docs/devops/the-operate-phase-of-devops" title="7: Operate" description="Ensure that the infrastructure supports the application." /%}
{% cell href="/docs/devops/the-monitor-phase-of-devops" title="8: Monitor" description="Gather feedback and return to planning." /%}
{% /grid %}

## Schema migration and management

This section will cover schema migrations and how they can be used to incrementally update your database's schema and keep it under version control. Throughout the process, we'll explore how the PlanetScale Branching feature can be utilized with these tools to safely make changes to your production database with zero downtime.

Schema migrations are used to upgrade the database schema in a controllable and systematic way. There are two primary methods of performing schema migrations:

{% grid columns=2 %}
{% cell href="/docs/devops/declarative-schema-migrations" title="Declarative migrations" description="Apply updates based on a single state definition." /%}
{% cell href="/docs/devops/versioned-schema-migrations" title="Versioned migrations" description="Iterate on your schema using scripting tools and ORMs." /%}
{% /grid %}

## Real-world scenario

DevOps is very much a "choose your own adventure" set of guidelines and that can make it confusing for teams to properly implement it given the number of choices available from code language, tooling, process, etc. The following article describes a fictitious team as they implement a new feature in their codebase. Throughout the article, we'll call out specific tools that are common in the industry to implement much of the process described in the above sections. As expected, the various features available by PlanetScale will also be described as the story progresses.

{% grid columns=1 %}
{% cell href="/docs/devops/mechanica-logistics-story" title="A story of DevOps and PlanetScale" description="Follow the team at Mechanica Logistics as they use DevOps with PlanetScale to streamline deployments." /%}
{% /grid %}
