---
title: 'PlanetScale API and OAuth applications'
subtitle: 'Manage your PlanetScale databases programmatically.'
date: '2023-02-06'
---

## PlanetScale API overview

The PlanetScale API allows you to manage your PlanetScale databases programmatically. The API is currently in **beta**. The API supports many actions you can take in the PlanetScale web app or CLI and can be used to integrate PlanetScale into your existing workflows and tools.

The PlanetScale API does **not** include direct access to the data in the database. Some endpoints will consist of database schema information or connection information. You will still need to use a [client library, object–relational mapping tool (ORM)](/docs/tutorials/connect-any-application), or the [PlanetScale serverless driver](/docs/tutorials/planetscale-serverless-driver) to read from and write data to your PlanetScale database.

Learn more about the API and how to use it in the [PlanetScale API documentation](https://api-docs.planetscale.com/).

## Use cases

Some examples of what you can do with the PlanetScale API:

- Automatically [create and delete database branches](https://api-docs.planetscale.com/reference/create-a-branch) from CI/CD pipelines or data migration tooling
- Programmatically build out new environments that connect to PlanetScale database branches for testing
- Get information about a PlanetScale user, database, branch, organization, and deploy request
- [Check the status of deploy requests](https://api-docs.planetscale.com/reference/get-a-deploy-request) in the deploy queue
- Automate [creating and deleting database connection strings](https://api-docs.planetscale.com/reference/create-a-password) for internal users or tools
- [Create, update, approve, deploy, and delete deploy requests](https://api-docs.planetscale.com/reference/create-a-deploy-request) programmatically from tooling outside of PlanetScale

Anywhere that can programmatically use an HTTP API can be integrated with PlanetScale. This includes CLI tools, build scripts, desktop applications, and more.

## OAuth applications

The PlanetScale platform also allows you to create OAuth applications. Creating an OAuth application within PlanetScale allows your application to access your users’ PlanetScale accounts.

With PlanetScale OAuth applications, you can choose what access your application needs, and a user will allow (or deny) your application those accesses on their PlanetScale account. The organization that you create the OAuth application in is the "owner" of the application.

By using PlanetScale OAuth as a PlanetScale partner or developer, your organization is agreeing to prominently display a privacy policy and obtain consent to your terms of use from all users of your products and services.

{% callout %}
PlanetScale OAuth applications are in beta. Opt-in to the beta's terms of service when creating an OAuth application in your PlanetScale organization's [**Settings > OAuth applications**](https://app.planetscale.com/~/settings/oauth-applications) page.
{% /callout %}

You can read more about creating an OAuth application in PlanetScale in the [PlanetScale OAuth documentation](https://api-docs.planetscale.com/reference/oauth).

If you build something you would like to share with us, please email us at `education (at) planetscale.com`. We would love to hear about your experience building the application, and we may even feature your application in future blog posts, videos, or social media.
