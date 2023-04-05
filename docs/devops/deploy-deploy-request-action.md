---
title: 'Deploy Deploy Request Action'
subtitle: 'A GitHub Action to deploy a deploy request.'
date: '2023-03-31'
---

This GitHub Action can be used within your workflows to deploy an open deploy request for your PlanetScale database.

{% callout %}
The source code for this action is available [on GitHub](https://github.com/planetscale/deploy-deploy-request-action).
{% /callout %}

## Prerequisites

Before you can use this Action, you'll need to configure a service token that has permission to create branches on your database. Refer to our docs for more details on [how to create a service token](https://planetscale.com/docs/concepts/service-tokens). Once the service token has been created, the following repository secrets must be set:

- `PLANETSCALE_SERVICE_TOKEN_ID`
- `PLANETSCALE_SERVICE_TOKEN`

These values will be used to authenticate to the PlanetScale service.

## Example

The following example will create a deploy request for the `recipes_db` database when a pull request is closed.

```yml
name: Deploy a deploy request
on:
  pull_request:
    types: [closed]

jobs:
  deploy_deploy_request:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v3
      - name: Deploy a deploy request
        uses: planetscale/deploy-deploy-request-action@v1
        with:
          org_name: bmorrison-ps
          database_name: recipes_db
          branch_name: dev
        env:
          PLANETSCALE_SERVICE_TOKEN_ID: ${{ secrets.PLANETSCALE_SERVICE_TOKEN_ID }}
          PLANETSCALE_SERVICE_TOKEN: ${{ secrets.PLANETSCALE_SERVICE_TOKEN }}
```

## Input variables

**Required**

- `org_name` - The name of the PlanetScale organization.
- `database_name` - The name of the database to create the branch on.
- `number` - The number of the deploy request.

**Optional**

- `wait` - If set to `true`, this action will wait for the deploy request to merge before exiting.
