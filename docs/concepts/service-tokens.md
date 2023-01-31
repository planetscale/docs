---
title: 'Service tokens'
subtitle: 'Learn how to work with service tokens in the PlanetScale CLI and API'
date: '2023-01-31'
---

## Overview

PlanetScale provides the ability to create service tokens for your PlanetScale organization via the CLI or directly in the UI. Service tokens provide an alternate authentication method to be used with the PlanetScale CLI and API. They are typically used in automated scenarios where `pscale auth login` cannot be used. Service tokens are also required for any calls to the API, as well as minting OAuth tokens for API use.

{% callout type="warning" %}
Service tokens are not recommended for connecting to production databases. Instead, connect securely to your database
using PlanetScale [connection strings](/docs/concepts/connection-strings).
{% /callout %}

## Create service tokens using the PlanetScale dashboard

To create a service token using the dashboard, log into your organization and click **"Settings"** > **"Service tokens"** > **"New service token"**.

![Service token settings page](/docs/concepts/service-tokens/service-tokens-settings-page.png?v2)

Give the token a name (this is used for your reference only) and click **"Create service token"**.

![New service token pop-up modal](/docs/concepts/service-tokens/new-service-token-modal.png?v2)

The modal will update, displaying your service token where the Name field was. Copy the ID and token values as you'll need them moving forward. Click **"Edit token permissions"** to proceed.

{% callout type="tip" %}
Be sure to copy the service token after you create it. There's no way to retrieve the token value once you leave this page.
{% /callout %}

![Service token detail page](/docs/concepts/service-tokens/modal-with-service-token.png?v2)

## Assign service token permissions

Service tokens are configured with granular permissions, both for the organization that owns them as well as on a per database level. Before you can use a service token, these permissions must be added.

### Add organization permissions

Organization permissions are required when performing operations that are specific to the organization and not for an individual database. To enable a service token for performing these operations, locate the **Organization access** section and click **"Add organization permissions"**.

![The Organization access section.](/docs/concepts/service-tokens/add-org-perms.png)

In the **Organization access permissions** modal, check the box next to each of the permission scopes that you want to assign to the token. Click **"Save permissions"** once finished.

![The Organization permissions mmodal.](/docs/concepts/service-tokens/org-access-perms.png)

### Add database permissions

In order to perform operations specific to a database, permissions need to be assigned per-database. To do this, locate the section titled **Database access** and click **"Add database access"** to open the **Database access permissions** modal.

![The service token configuration view.](/docs/concepts/service-tokens/add-db-perms.png)

Select the database you want to grant access to and check the box next to each permission option you need to grant. Once you are done, click **"Save permissions"**.

![The Database access permissions modal.](/docs/concepts/service-tokens/db-access-permissions.png?v2)

## Use a service token with the PlanetScale CLI

To use service tokens with the PlanetScale CLI, set the following environment variables in your terminal:

```bash
export PLANETSCALE_SERVICE_TOKEN=<YOUR_SERVICE_TOKEN>
export PLANETSCALE_SERVICE_TOKEN_ID=<YOUR_SERVICE_TOKEN_ID>
```

When you execute commands using the PlanetScale CLI, it will automatically parse those values and use them to access the service. However, you’ll also need to pass in your organization name using the `--org` flag like so:

```bash
pscale branch create <DB_NAME> <BRANCH_NAME> --org <ORG_NAME>
```

If you don’t want to set environment variables, you may also pass in the Service Token and Service Token ID by using the [`--service-token` and `--service-token-id` flags](/docs/reference/service-token) respectively:

```bash
pscale branch create <DB_NAME> <BRANCH_NAME> --org <ORG_NAME> --service-token <SERVICE_TOKEN> --service-token-id <SERVICE_TOKEN_ID>
```

## Use a service token with the PlanetScale API

In order to execute a request to the PlanetScale API, you'll need a service token to execute requests directly or for minting OAuth tokens. Both the ID and token are required in the `Authorization` header without a scheme. Below is an example of how to use a service token to list details about the organizations the token can access:

```bash
curl --request GET \
     --url 'https://api.planetscale.com/v1/organizations' \
     --header 'Authorization: <SERVICE_TOKEN_ID>:<SERVICE_TOKEN>'
```

Refer to the [API docs](https://api-docs.planetscale.com/reference/getting-started-with-planetscale-api) for more details on how to use the API.

## Modify service token permissions

If you want to modify the permissions granted to a service token, starty by opening the service token from the settings pane. To modify organization permissions, select the three dots next to the organization name and click **"Edit permissions"**.

![The location of the Edit permissions option for organization permissions.](/docs/concepts/service-tokens/edit-org-perms.png)

This will open a modal that allows you to modify the permissions the service token has to access that organization.

![The Organization access permissions modal while modifying permissions.](/docs/concepts/service-tokens/edit-org-perms-modal.png)

To modify the permissions granted for a database, locate the database name in the **Database access** section and perform the same steps as above.

![The location of the Edit permissions option for database permissions.](/docs/concepts/service-tokens/edit-db-perms.png)

To remove access to a database entirely, click **"Remove database"** in the dropdown for that database.

![Remove database access for a service token.](/docs/concepts/service-tokens/del-db-perms.png)

## Delete a service token

You can delete a service token at any time from the service token detail page. Simply click the **"Delete service token"** button.

![Delete service token.](/docs/concepts/service-tokens/delete-service-token.png?v2)

Deleting a service token will sever any database connections that use the given service token.

## Manage service tokens using the PlanetScale CLI

Service tokens can also be created and managed directly from the [PlanetScale CLI](/docs/reference/service-token).

### Create a new service token

Use the following command to create a service token:

```bash
pscale service-token create
```

This command will return a service token ID and value for your use.

### Add database access permissions

You can add database access permissions to your service token for each database in your organization.

To add database access permissions, use the command:

```bash
pscale service-token add-access <SERVICE_TOKEN_ID> <ACCESS_PERMISSION> --database <DB_NAME>
```

For example, to give a service token the ability to create, read, and delete branches on a specific database, use the following command:

```bash
pscale service-token add-access <SERVICE_TOKEN_ID> read_branch delete_branch create_branch --database <DB_NAME>
```

A complete list of service token access permissions can be found [here](/docs/reference/planetscale-cli#service-tokens-in-organizations).

### Remove database access permissions

You can also remove database access permissions for a service token.

Use the following command to remove one or more permissions:

```bash
pscale service-token delete-access <SERVICE_TOKEN_ID> <ACCESS_PERMISSION> --database <DB_NAME>
```

### Delete a service token

To delete a service token, run the following command:

```bash
pscale service-token delete <SERVICE_TOKEN_ID>
```

Deleting a service token will sever any database connections that use the given service token.
