---
title: 'Create database password'
subtitle: 'A GitHub Actions workflow to create a new branch password.'
date: '2023-03-31'
---

This GitHub Action can be used within your workflows to create new passwords for your PlanetScale database.

{% callout %}
The source code for this action is available [on GitHub](https://github.com/planetscale/create-branch-password-action).
{% /callout %}

## Prerequisites

Before you can use this Action, you'll need to configure a service token that has permission to create branches on your database. Refer to our docs on [how to create a service token](https://planetscale.com/docs/concepts/service-tokens) for more details. Once the service token has been created, the following repository secrets must also be set:

- `PLANETSCALE_SERVICE_TOKEN_ID`
- `PLANETSCALE_SERVICE_TOKEN`

These values will be used to authenticate to the PlanetScale service.

## Example

The following example will create a new password for the `recipes_db` database when a pull request is opened. It will also print the credentials that were created during the process.

```yml
name: Create a branch
on:
  pull_request:
    types: [opened]

jobs:
  create_a_branch:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v3
      - name: Create a password
        uses: planetscale/create-branch-password-action@v1
        id: create_password
        with:
          org_name: bmorrison-ps
          database_name: recipes_db
          branch_name: main
          name: mynewpassword
        env:
          PLANETSCALE_SERVICE_TOKEN_ID: ${{ secrets.PLANETSCALE_SERVICE_TOKEN_ID }}
          PLANETSCALE_SERVICE_TOKEN: ${{ secrets.PLANETSCALE_SERVICE_TOKEN }}
      - name: Get the new credentials
        run: |
          echo "Hostname: ${{ steps.create_password.outputs.hostname }}" \
          echo "Username: ${{ steps.create_password.outputs.username }}" \
          echo "Password: ${{ steps.create_password.outputs.password }}"
```

## Input variables

**Required**

- `org_name` - The name of the PlanetScale organization.
- `database_name` - The name of the database to create the branch on.
- `branch_name` - The name of the new branch.
- `name` - The name of the password.

**Optional**

- `role` - The role of the password. Allowed values are `reader`, `writer`, `readerwriter`, or `admin`. Defaults to `admin`.

## Outputs

- `username` - The username to use for connecting to the branch.
- `password` - The password to use for connecting to the branch.
- `hostname` - The hostname for the branch.
