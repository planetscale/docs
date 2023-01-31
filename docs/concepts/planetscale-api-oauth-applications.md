---
title: 'PlanetScale API and OAuth applications'
subtitle: 'Manage your PlanetScale databases programmatically.'
date: '2023-01-31'
---

# PlanetScale API overview

The PlanetScale API allows you to manage your PlanetScale databases programmatically. The API is currently in **beta**. The API supports many actions you can take in the PlanetScale web app or CLI and can be used to integrate the PlanetScale into your existing workflows and tools via API.

The PlanetScale API does **not** include direct access to the data in the database. Some endpoints will consist of database schema information or connection information. You will still need to use a [client library, object–relational mapping tool (ORM)](/docs/tutorials/connect-any-application), or the [PlanetScale serverless driver](/docs/tutorials/planetscale-serverless-driver) to read from and write data to your PlanetScale database.

Learn more about the API and how to use it in the [PlanetScale API documentation](https://api-docs.planetscale.com/).

## Use cases

Some examples of what you can do with the PlanetScale API:

- Automatically [create and delete database branches](https://api-docs.planetscale.com/reference/create-a-branch) from CI/CD pipelines or data migration tooling
- Programmatically build out new environments that connect to PlanetScale database branches for testing
- Get information about a PlanetScale user, database, branch, organization, and deploy request
- [Check the status of deploy requests](https://api-docs.planetscale.com/reference/get-a-deploy-request) in the deploy queue
- Automate [creating and deleting database connection strings](https://api-docs.planetscale.com/reference/create-a-branch-password) for internal users or tools
- [Create, update, approve, deploy, and delete deploy requests](https://api-docs.planetscale.com/reference/create-a-deploy-request) programmatically from tooling outside of PlanetScale

Anywhere that can programmatically use an HTTP API can be integrated with PlanetScale. This includes CLI tools, build scripts, desktop applications, and more.

## OAuth applications

The PlanetScale platform also allows you to create OAuth applications. Creating an OAuth application within PlanetScale allows your application to access your users’ PlanetScale accounts.

With PlanetScale OAuth applications, you can choose what access your application needs, and a user will allow (or deny) your application those accesses on their PlanetScale account.

{% callout %}
PlanetScale OAuth applications are in limited beta. Sign up for the limited beta in your PlanetScale organization's [**Settings > Beta features**](https://app.planetscale.com/~/settings/beta-features) page. Our team will reach out with more information.
{% /callout %}

You can read more about creating an OAuth application in PlanetScale in the [PlanetScale OAuth documentation](https://api-docs.planetscale.com/reference/oauth).
