---
title: 'Create deploy request'
subtitle: 'A GitHub Actions workflow to create a deploy request.'
date: '2023-03-31'
---

This GitHub Action can be used within your workflows to create new deploy request for your PlanetScale database.

{% callout %}
The source code for this action is available [on GitHub](https://github.com/planetscale/create-deploy-request-action).
{% /callout %}

## Prerequisites

Before you can use this Action, you'll need to configure a service token that has permission to create branches on your database. Refer to our docs for more details on [how to create a service token](https://planetscale.com/docs/concepts/service-tokens). Once the service token has been created, the following repository secrets must be set:

- `PLANETSCALE_SERVICE_TOKEN_ID`
- `PLANETSCALE_SERVICE_TOKEN`

These values will be used to authenticate to the PlanetScale service.

## Example

The following example will create a deploy request for the `recipes_db` database when a pull request is opened.

```yml
name: Create a branch
on:
  pull_request:
    types: [opened]

jobs:
  create_deploy_request:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v3
      - name: Create a deploy request
        uses: planetscale/create-deploy-request-action@v1
        id: create_deploy_request
        with:
          org_name: bmorrison-ps
          database_name: recipes_db
          branch_name: dev
        env:
          PLANETSCALE_SERVICE_TOKEN_ID: ${{ secrets.PLANETSCALE_SERVICE_TOKEN_ID }}
          PLANETSCALE_SERVICE_TOKEN: ${{ secrets.PLANETSCALE_SERVICE_TOKEN }}
      - name: Get the deploy request number
        run: |
          echo "Deploy request number: ${{ steps.create_deploy_request.outputs.number }}"
```

## Input variables

**Required**

- `org_name` - The name of the PlanetScale organization.
- `database_name` - The name of the database to create the branch on.
- `branch_name` - The name of the new branch.

**Optional**

- `deploy_to` - The name of the target branch where the changes will be merged into. Defaults to `main`.

## Outputs

- `number` - The number of the deploy request that was created.
