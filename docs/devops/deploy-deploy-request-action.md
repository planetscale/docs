---
title: 'Deploy deploy request'
subtitle: 'A GitHub Actions workflow to deploy a deploy request.'
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
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v4
      - name: Deploy a deploy request
        uses: planetscale/deploy-deploy-request-action@v4
        with:
          org_name: bmorrison-ps
          database_name: recipes_db
        env:
          PLANETSCALE_SERVICE_TOKEN_ID: ${{ secrets.PLANETSCALE_SERVICE_TOKEN_ID }}
          PLANETSCALE_SERVICE_TOKEN: ${{ secrets.PLANETSCALE_SERVICE_TOKEN }}
```

## Input variables

**Required**

- `org_name` - The name of the PlanetScale organization.
- `database_name` - The name of the database to create the branch on.

**Optional**

- `number` - The number of the deploy request to deploy. Defaults to the latest deploy request.
- `wait` - If set to `true`, this action will wait for the deploy request to merge before exiting.
