---
title: 'DevOps with PlanetScale'
subtitle: 'Learn how to use PlanetScale within DevOps pipelines.'
date: '2023-03-13'
---

PlanetScale was built with continuous integration and deployment in mind. This section of our documentation contains guides and tooling recommendations to use with PlanetScale to enhance your pipelines for a smoother database experience.

## The eight phases of DevOps

DevOps is typically broken down into eight distinct phases as an operational model. Learn each of the phases of DevOps and how PlanetScale can help.

{% eightphases-grid /%}

## Schema migration and management

This section will cover schema migrations and how they can be used to incrementally update your database's schema and keep it under version control. Throughout the process, we'll explore how the PlanetScale Branching feature can be utilized with these tools to safely make changes to your production database with zero downtime.

Schema migrations are used to upgrade the database schema in a controllable and systematic way. There are two primary methods of performing schema migrations:

{% schema-migration-grid /%}

## Real-world scenario

DevOps is very much a "choose your own adventure" set of guidelines and that can make it confusing for teams to properly implement it given the number of choices available from code language, tooling, process, etc. The following article describes a fictitious team as they implement a new feature in their codebase. Throughout the article, we'll call out specific tools that are common in the industry to implement much of the process described in the above sections. As expected, the various features available by PlanetScale will also be described as the story progresses.

{% devops-story-grid /%}
