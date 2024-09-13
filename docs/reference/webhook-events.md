---
title: 'Webhook events reference'
subtitle: 'Learn about the webhook events and HTTP responses sent by PlanetScale webhooks.'
date: '2024-07-25'
---

## Overview

Webhooks in PlanetScale allow you to trigger an HTTP POST callback to a configured URL when specific events happen within your PlanetScale organization. Webhooks can be used to build integrations, such as notifications, and automate workflows. See the [webhooks documentation](/docs/concepts/webhooks) for more information.

## Webhook headers

All webhooks from PlanetScale will have an `X-PlanetScale-Signature` header. This header is a SHA-256 HMAC hex digest of the request body, using your webhook secret as the key. You can use this header to verify that the webhook payload was sent by PlanetScale. See the documentation on [validating a webhook signature](/docs/concepts/webhooks#validating-a-webhook-signature) for more information.

## Webhook request body parameters

| Parameter   | Type    | Description                                                                                                              |
| ----------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `timestamp` | integer | Unix epoch time.                                                                                                         |
| `event`     | string  | Name of the webhook event, see [webhook events](#webhook-events) for more info about each event.                         |
| `resource`  | object  | Information about the event, uses the same response body as the API responses for the same resource. See examples below. |

## Webhook events

| Webhook event                                                     | `event` parameter                | Trigger                                                         |
| ----------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------- |
| [Branch anomaly](#branch-anomaly)                                 | `branch.anomaly`                 | The branch has a new anomaly in insights.                       |
| [Branch ready](#branch-ready)                                     | `branch.ready`                   | The branch is created and ready to connect.                     |
| [Branch sleeping](#branch-sleeping)                               | `branch.sleeping`                | The branch is now sleeping.                                     |
| [Deploy request opened](#deploy-request-opened)                   | `deploy_request.opened`          | The deploy request has been opened.                             |
| [Deploy request queued](#deploy-request-queued)                   | `deploy_request.queued`          | The deploy request has been added to the deploy queue.          |
| [Deploy request in progress](#deploy-request-in-progress)         | `deploy_request.in_progress`     | The deploy request has started running.                         |
| [Deploy request pending cutover](#deploy-request-pending-cutover) | `deploy_request.pending_cutover` | The deploy request is ready to cutover and waiting on the user. |
| [Deploy request schema applied](#deploy-request-schema-applied)   | `deploy_request.schema_applied`  | The deploy request has finished applying the schema.            |
| [Deploy request errored](#deploy-request-errored)                 | `deploy_request.errored`         | The deploy request has stopped due to an error.                 |
| [Deploy request reverted](#deploy-request-reverted)               | `deploy_request.reverted`        | The deploy request has been reverted.                           |
| [Deploy request closed](#deploy-request-closed)                   | `deploy_request.closed`          | The deploy request has been closed.                             |
| [Webhook test](#webhook-test)                                     | `webhook.test`                   | A webhook test is triggered.                                    |

{% callout type="note" %}
If there is an event you want to use that is not included in this list, please [contact us](/contact) and let us know what event you want to trigger a webhook on.
{% /callout %}

### Branch anomaly

The branch has a new anomaly event in PlanetScale Insights.

The `branch.anomaly` event uses the same response body as a `200` response from the [Get a branch](https://api-docs.planetscale.com/reference/get_branch) API endpoint. The link includes a detailed description of each field in the API reference.

**Example:**

```json
{
  "timestamp": 1698252879,
  "event": "branch.anomaly",
  "organization": "myorg",
  "database": "example_database",
  "resource": {
    "id": "ecrmjy2f4a5o",
    "type": "Branch",
    "name": "dev",
    "created_at": "2023-10-25T16:54:12.879Z",
    "updated_at": "2023-10-25T16:54:39.820Z",
    "restore_checklist_completed_at": null,
    "access_host_url": "ecrmjy2f4a5o.us-east-4.psdb.cloud",
    "schema_last_updated_at": "2023-10-25T16:54:12.879Z",
    "mysql_address": "us-east.connect.psdb.cloud",
    "mysql_provider_address": "aws.connect.psdb.cloud",
    "initial_restore_id": null,
    "schema_ready": true,
    "state": "ready",
    "cluster_rate_name": "PS_DEV",
    "mysql_edge_address": "aws.connect.psdb.cloud",
    "ready": true,
    "production": false,
    "safe_migrations": false,
    "sharded": false,
    "shard_count": 0,
    "stale_schema": false,
    "actor": {
      "id": "g2dr4sbhz6ag",
      "type": "User",
      "display_name": "PlanetScale Bot",
      "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
    },
    "restored_from_branch": null,
    "private_connectivity": false,
    "private_edge_connectivity": false,
    "html_url": "https://app.planetscale.com/demo-db/example_database/dev",
    "url": "https://api.planetscale.com/v1/organizations/demo-db/databases/example_database/branches/dev",
    "region": {
      "id": "kc0e1ij8juzp",
      "type": "Region",
      "provider": "AWS",
      "enabled": true,
      "public_ip_addresses": [
        "23.23.187.137",
        "52.6.141.108",
        "52.70.2.89",
        "50.17.188.76",
        "52.2.251.189",
        "52.72.234.74",
        "35.174.68.24",
        "52.5.253.172",
        "54.156.81.4",
        "34.200.24.255",
        "35.174.79.154",
        "44.199.177.24",
        "35.173.174.19",
        "44.212.228.57",
        "44.216.88.45"
      ],
      "display_name": "AWS us-east-1",
      "location": "N. Virginia",
      "slug": "us-east",
      "current_default": true
    },
    "parent_branch": "main"
  }
}
```

### Branch ready

The branch is created and ready to connect.

The `branch.ready` event uses the same response body as a `200` response from the [Get a branch](https://api-docs.planetscale.com/reference/get_branch) API endpoint. The link includes a detailed description of each field in the API reference.

**Example:**

```json
{
  "timestamp": 1698252879,
  "event": "branch.ready",
  "organization": "myorg",
  "database": "example_database",
  "resource": {
    "id": "ecrmjy2f4a5o",
    "type": "Branch",
    "name": "dev",
    "created_at": "2023-10-25T16:54:12.879Z",
    "updated_at": "2023-10-25T16:54:39.820Z",
    "restore_checklist_completed_at": null,
    "access_host_url": "ecrmjy2f4a5o.us-east-4.psdb.cloud",
    "schema_last_updated_at": "2023-10-25T16:54:12.879Z",
    "mysql_address": "us-east.connect.psdb.cloud",
    "mysql_provider_address": "aws.connect.psdb.cloud",
    "initial_restore_id": null,
    "schema_ready": true,
    "state": "ready",
    "cluster_rate_name": "PS_DEV",
    "mysql_edge_address": "aws.connect.psdb.cloud",
    "ready": true,
    "production": false,
    "safe_migrations": false,
    "sharded": false,
    "shard_count": 0,
    "stale_schema": false,
    "actor": {
      "id": "g2dr4sbhz6ag",
      "type": "User",
      "display_name": "PlanetScale Bot",
      "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
    },
    "restored_from_branch": null,
    "private_connectivity": false,
    "private_edge_connectivity": false,
    "html_url": "https://app.planetscale.com/demo-db/example_database/dev",
    "url": "https://api.planetscale.com/v1/organizations/demo-db/databases/example_database/branches/dev",
    "region": {
      "id": "kc0e1ij8juzp",
      "type": "Region",
      "provider": "AWS",
      "enabled": true,
      "public_ip_addresses": [
        "23.23.187.137",
        "52.6.141.108",
        "52.70.2.89",
        "50.17.188.76",
        "52.2.251.189",
        "52.72.234.74",
        "35.174.68.24",
        "52.5.253.172",
        "54.156.81.4",
        "34.200.24.255",
        "35.174.79.154",
        "44.199.177.24",
        "35.173.174.19",
        "44.212.228.57",
        "44.216.88.45"
      ],
      "display_name": "AWS us-east-1",
      "location": "N. Virginia",
      "slug": "us-east",
      "current_default": true
    },
    "parent_branch": "main"
  }
}
```

### Branch sleeping

The branch is now sleeping.

The `branch.sleeping` event uses the same response body as a `200` response from the [Get a branch](https://api-docs.planetscale.com/reference/get_branch) API endpoint. The link includes a detailed description of each field in the API reference.

**Example:**

```json
{
  "timestamp": 1697739653,
  "event": "branch.sleeping",
  "organization": "myorg",
  "database": "example_database",
  "resource": {
    "id": "bffzv8jfk9gc",
    "type": "Branch",
    "name": "dev",
    "created_at": "2023-10-14T18:17:42.998Z",
    "updated_at": "2023-10-19T18:17:43.105Z",
    "restore_checklist_completed_at": null,
    "access_host_url": "bffzv8jfk9gc.us-east-4.psdb.cloud",
    "schema_last_updated_at": "2023-10-19T18:07:57.623Z",
    "mysql_address": "us-east.connect.psdb.cloud",
    "mysql_provider_address": "aws.connect.psdb.cloud",
    "initial_restore_id": null,
    "schema_ready": true,
    "state": "ready",
    "cluster_rate_name": "PS_DEV",
    "mysql_edge_address": "aws.connect.psdb.cloud",
    "ready": true,
    "production": false,
    "safe_migrations": false,
    "sharded": false,
    "shard_count": 0,
    "stale_schema": false,
    "actor": {
      "id": "g2dr4sbhz6ag",
      "type": "User",
      "display_name": "PlanetScale Bot",
      "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
    },
    "restored_from_branch": null,
    "private_connectivity": false,
    "private_edge_connectivity": false,
    "html_url": "https://app.planetscale.com/demo-db/example_database/dev",
    "url": "https://api.planetscale.com/v1/organizations/demo-db/databases/example_database/branches/dev",
    "region": {
      "id": "kc0e1ij8juzp",
      "type": "Region",
      "provider": "AWS",
      "enabled": true,
      "public_ip_addresses": [
        "23.23.187.137",
        "52.6.141.108",
        "52.70.2.89",
        "50.17.188.76",
        "52.2.251.189",
        "52.72.234.74",
        "35.174.68.24",
        "52.5.253.172",
        "54.156.81.4",
        "34.200.24.255",
        "35.174.79.154",
        "44.199.177.24",
        "35.173.174.19",
        "44.212.228.57",
        "44.216.88.45"
      ],
      "display_name": "AWS us-east-1",
      "location": "N. Virginia",
      "slug": "us-east",
      "current_default": true
    },
    "parent_branch": "main"
  }
}
```

### Deploy request opened

The deploy request has been opened.

The `deploy_request.opened` event uses the same response body as a `200` response from the [Get a deploy request](https://api-docs.planetscale.com/reference/get_deploy_request) API endpoint. The link includes a detailed description of each field in the API reference.

**Example:**

```json
{
  "timestamp": 1698252899,
  "event": "deploy_request.opened",
  "organization": "myorg",
  "database": "example_database",
  "resource": {
    "id": "4xsz0ql82y4n",
    "type": "DeployRequest",
    "actor": {
      "id": "g2dr4sbhz6ag",
      "type": "User",
      "display_name": "PlanetScale Bot",
      "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
    },
    "closed_by": null,
    "branch": "dev",
    "branch_deleted": false,
    "branch_deleted_by": null,
    "branch_deleted_at": null,
    "into_branch": "main",
    "into_branch_sharded": false,
    "into_branch_shard_count": 0,
    "approved": false,
    "state": "open",
    "deployment_state": "pending",
    "num_comments": 0,
    "deployment": {
      "id": "uvkd7injje2f",
      "type": "Deployment",
      "into_branch": "main",
      "deploy_request_number": 5,
      "actor": {
        "id": "boo",
        "type": "User",
        "display_name": "Ghost",
        "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
      },
      "cutover_actor": null,
      "cancelled_actor": null,
      "schema_last_updated_at": "2023-10-25T16:54:59.728Z",
      "preceding_deployments": [],
      "deploy_operations": [],
      "deploy_operation_summaries": [],
      "deployable": false,
      "cutover_expiring": false,
      "lint_errors": [],
      "deployment_revert_request": null,
      "auto_cutover": true,
      "created_at": "2023-10-25T16:54:59.863Z",
      "cutover_at": null,
      "deploy_check_errors": null,
      "finished_at": null,
      "queued_at": null,
      "ready_to_cutover_at": null,
      "started_at": null,
      "state": "pending",
      "submitted_at": null,
      "updated_at": "2023-10-25T16:54:59.863Z"
    },
    "html_url": "https://app.planetscale.com/demo-db/example_database/deploy-requests/5",
    "number": 5,
    "notes": "",
    "html_body": "",
    "created_at": "2023-10-25T16:54:59.797Z",
    "updated_at": "2023-10-25T16:54:59.797Z",
    "closed_at": null,
    "deployed_at": null
  }
}
```

### Deploy request queued

The deploy request has been added to the deploy queue.

The `deploy_request.queued` event uses the same response body as a `200` response from the [Get a deploy request](https://api-docs.planetscale.com/reference/get_deploy_request) API endpoint. The link includes a detailed description of each field in the API reference.

**Example:**

```json
{
  "timestamp": 1698252953,
  "event": "deploy_request.queued",
  "organization": "myorg",
  "database": "example_database",
  "resource": {
    "id": "4xsz0ql82y4n",
    "type": "DeployRequest",
    "actor": {
      "id": "g2dr4sbhz6ag",
      "type": "User",
      "display_name": "PlanetScale Bot",
      "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
    },
    "closed_by": null,
    "branch": "dev",
    "branch_deleted": false,
    "branch_deleted_by": null,
    "branch_deleted_at": null,
    "into_branch": "main",
    "into_branch_sharded": false,
    "into_branch_shard_count": 0,
    "approved": false,
    "state": "open",
    "deployment_state": "queued",
    "num_comments": 0,
    "deployment": {
      "id": "uvkd7injje2f",
      "type": "Deployment",
      "into_branch": "main",
      "deploy_request_number": 5,
      "actor": {
        "id": "g2dr4sbhz6ag",
        "type": "User",
        "display_name": "PlanetScale Bot",
        "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
      },
      "cutover_actor": null,
      "cancelled_actor": null,
      "schema_last_updated_at": "2023-10-25T16:55:00.288Z",
      "preceding_deployments": [],
      "deploy_operations": [
        {
          "id": "wo1m619ufrpc",
          "type": "DeployOperation",
          "state": "pending",
          "keyspace_name": "example_database",
          "table_name": "Persons",
          "operation_name": "ALTER",
          "eta_seconds": null,
          "progress_percentage": null,
          "deploy_error_docs_url": null,
          "ddl_statement": "ALTER TABLE `Persons` DROP COLUMN `Address`",
          "syntax_highlighted_ddl": "<div class=\"line line-1\"><span class=\"k\">ALTER</span> <span class=\"k\">TABLE</span> <span class=\"nv\">`Persons`</span> </div><div class=\"line line-2\">  <span class=\"k\">DROP</span> <span class=\"k\">COLUMN</span> <span class=\"nv\">`Address`</span></div>",
          "created_at": "2023-10-25T16:55:26.562Z",
          "updated_at": "2023-10-25T16:55:26.562Z",
          "can_drop_data": true,
          "table_recently_used": false,
          "table_recently_used_at": null,
          "deploy_errors": null
        }
      ],
      "deploy_operation_summaries": [],
      "deployable": true,
      "cutover_expiring": false,
      "lint_errors": [],
      "deployment_revert_request": null,
      "auto_cutover": false,
      "created_at": "2023-10-25T16:54:59.863Z",
      "cutover_at": null,
      "deploy_check_errors": null,
      "finished_at": null,
      "queued_at": "2023-10-25T16:55:53.543Z",
      "ready_to_cutover_at": null,
      "started_at": null,
      "state": "queued",
      "submitted_at": null,
      "updated_at": "2023-10-25T16:55:53.552Z"
    },
    "html_url": "https://app.planetscale.com/demo-db/example_database/deploy-requests/5",
    "number": 5,
    "notes": "",
    "html_body": "",
    "created_at": "2023-10-25T16:54:59.797Z",
    "updated_at": "2023-10-25T16:55:53.556Z",
    "closed_at": null,
    "deployed_at": null
  }
}
```

### Deploy request in progress

The deploy request has started running.

The `deploy_request_in_progress` event uses the same response body as a `200` response from the [Get a deploy request](https://api-docs.planetscale.com/reference/get_deploy_request) API endpoint. The link includes a detailed description of each field in the API reference.

**Example:**

```json
{
  "timestamp": 1698252961,
  "event": "deploy_request.in_progress",
  "organization": "myorg",
  "database": "example_database",
  "resource": {
    "id": "4xsz0ql82y4n",
    "type": "DeployRequest",
    "actor": {
      "id": "g2dr4sbhz6ag",
      "type": "User",
      "display_name": "PlanetScale Bot",
      "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
    },
    "closed_by": null,
    "branch": "dev",
    "branch_deleted": false,
    "branch_deleted_by": null,
    "branch_deleted_at": null,
    "into_branch": "main",
    "into_branch_sharded": false,
    "into_branch_shard_count": 0,
    "approved": false,
    "state": "open",
    "deployment_state": "in_progress",
    "num_comments": 0,
    "deployment": {
      "id": "uvkd7injje2f",
      "type": "Deployment",
      "into_branch": "main",
      "deploy_request_number": 5,
      "actor": {
        "id": "g2dr4sbhz6ag",
        "type": "User",
        "display_name": "PlanetScale Bot",
        "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
      },
      "cutover_actor": null,
      "cancelled_actor": null,
      "schema_last_updated_at": "2023-10-25T16:55:00.288Z",
      "preceding_deployments": [],
      "deploy_operations": [
        {
          "id": "wo1m619ufrpc",
          "type": "DeployOperation",
          "state": "pending",
          "keyspace_name": "example_database",
          "table_name": "Persons",
          "operation_name": "ALTER",
          "eta_seconds": null,
          "progress_percentage": null,
          "deploy_error_docs_url": null,
          "ddl_statement": "ALTER TABLE `Persons` DROP COLUMN `Address`",
          "syntax_highlighted_ddl": "<div class=\"line line-1\"><span class=\"k\">ALTER</span> <span class=\"k\">TABLE</span> <span class=\"nv\">`Persons`</span> </div><div class=\"line line-2\">  <span class=\"k\">DROP</span> <span class=\"k\">COLUMN</span> <span class=\"nv\">`Address`</span></div>",
          "created_at": "2023-10-25T16:55:26.562Z",
          "updated_at": "2023-10-25T16:55:26.562Z",
          "can_drop_data": true,
          "table_recently_used": false,
          "table_recently_used_at": null,
          "deploy_errors": null
        }
      ],
      "deploy_operation_summaries": [],
      "deployable": true,
      "cutover_expiring": false,
      "lint_errors": [],
      "deployment_revert_request": null,
      "auto_cutover": false,
      "created_at": "2023-10-25T16:54:59.863Z",
      "cutover_at": null,
      "deploy_check_errors": null,
      "finished_at": null,
      "queued_at": "2023-10-25T16:55:53.543Z",
      "ready_to_cutover_at": null,
      "started_at": "2023-10-25T16:56:01.035Z",
      "state": "in_progress",
      "submitted_at": "2023-10-25T16:55:53.702Z",
      "updated_at": "2023-10-25T16:56:01.057Z"
    },
    "html_url": "https://app.planetscale.com/demo-db/example_database/deploy-requests/5",
    "number": 5,
    "notes": "",
    "html_body": "",
    "created_at": "2023-10-25T16:54:59.797Z",
    "updated_at": "2023-10-25T16:56:01.063Z",
    "closed_at": null,
    "deployed_at": null
  }
}
```

### Deploy request errored

The deploy request has stopped due to an error.

The `deploy_request.errored` event uses the same response body as a `200` response from the [Get a deploy request](https://api-docs.planetscale.com/reference/get_deploy_request) API endpoint. The link includes a detailed description of each field in the API reference.

**Example:**

```json
{
  "timestamp": 1697736651,
  "event": "deploy_request.errored",
  "organization": "myorg",
  "database": "example_database",
  "resource": {
    "id": "jwdnj3q31jd6",
    "type": "DeployRequest",
    "actor": {
      "id": "g2dr4sbhz6ag",
      "type": "User",
      "display_name": "PlanetScale Bot",
      "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
    },
    "closed_by": null,
    "branch": "dev",
    "branch_deleted": false,
    "branch_deleted_by": null,
    "branch_deleted_at": null,
    "into_branch": "main",
    "into_branch_sharded": false,
    "into_branch_shard_count": 0,
    "approved": false,
    "state": "open",
    "deployment_state": "error",
    "num_comments": 0,
    "deployment": {
      "id": "xqvfpq4yllwc",
      "type": "Deployment",
      "into_branch": "main",
      "deploy_request_number": 1,
      "actor": {
        "id": "boo",
        "type": "User",
        "display_name": "Ghost",
        "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
      },
      "cutover_actor": null,
      "cancelled_actor": null,
      "schema_last_updated_at": "2023-10-19T17:29:49.430Z",
      "preceding_deployments": [],
      "deploy_operations": [],
      "deploy_operation_summaries": [],
      "deployable": false,
      "cutover_expiring": false,
      "lint_errors": [
        {
          "type": "DeploymentLintError",
          "lint_error": "NO_UNIQUE_KEY",
          "subject_type": "table_error",
          "statement": "",
          "keyspace_name": "example_database",
          "table_name": "Persons",
          "error_description": "table \"Persons\" has no unique key: all tables must have at least one unique, not-null key without using text / blob columns or partial indexes.",
          "column_name": "",
          "foreign_key_column_names": [],
          "auto_increment_column_names": [],
          "charset_name": "",
          "engine_name": "",
          "vindex_name": null,
          "json_path": null,
          "schema_identifier": "SOURCE",
          "conflict_columns": null,
          "conflict_indexes": null,
          "conflict_constraints": null,
          "conflict_partitions": null,
          "conflict_error": "CONFLICT_UNSPECIFIED",
          "conflict_ddl_verb": "DDL_VERB_UNSPECIFIED",
          "check_constraint_name": "",
          "enum_value": "",
          "partitioning_type": "",
          "partition_name": "",
          "view_name": "",
          "boost_query": null
        }
      ],
      "deployment_revert_request": null,
      "auto_cutover": true,
      "created_at": "2023-10-19T17:29:49.032Z",
      "cutover_at": null,
      "deploy_check_errors": "",
      "finished_at": null,
      "queued_at": null,
      "ready_to_cutover_at": null,
      "started_at": null,
      "state": "error",
      "submitted_at": null,
      "updated_at": "2023-10-19T17:29:54.166Z"
    },
    "html_url": "https://app.planetscale.com/demo-db/example_database/deploy-requests/1",
    "number": 1,
    "notes": "",
    "html_body": "",
    "created_at": "2023-10-19T17:29:48.993Z",
    "updated_at": "2023-10-19T17:29:54.197Z",
    "closed_at": null,
    "deployed_at": null
  }
}
```

### Deploy request pending cutover

The deploy request is ready to apply the schema and is waiting on the user to confirm.

The `deploy_request.pending_cutover` event uses the same response body as a `200` response from the [Get a deploy request](https://api-docs.planetscale.com/reference/get_deploy_request) API endpoint. The link includes a detailed description of each field in the API reference.

**Example:**

```json
{
  "timestamp": 1698252961,
  "event": "deploy_request.pending_cutover",
  "organization": "myorg",
  "database": "example_database",
  "resource": {
    "id": "4xsz0ql82y4n",
    "type": "DeployRequest",
    "actor": {
      "id": "g2dr4sbhz6ag",
      "type": "User",
      "display_name": "PlanetScale Bot",
      "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
    },
    "closed_by": null,
    "branch": "dev",
    "branch_deleted": false,
    "branch_deleted_by": null,
    "branch_deleted_at": null,
    "into_branch": "main",
    "into_branch_sharded": false,
    "into_branch_shard_count": 0,
    "approved": false,
    "state": "open",
    "deployment_state": "pending_cutover",
    "num_comments": 0,
    "deployment": {
      "id": "uvkd7injje2f",
      "type": "Deployment",
      "into_branch": "main",
      "deploy_request_number": 5,
      "actor": {
        "id": "g2dr4sbhz6ag",
        "type": "User",
        "display_name": "PlanetScale Bot",
        "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
      },
      "cutover_actor": null,
      "cancelled_actor": null,
      "schema_last_updated_at": "2023-10-25T16:55:00.288Z",
      "preceding_deployments": [],
      "deploy_operations": [
        {
          "id": "wo1m619ufrpc",
          "type": "DeployOperation",
          "state": "in_progress",
          "keyspace_name": "example_database",
          "table_name": "Persons",
          "operation_name": "ALTER",
          "eta_seconds": null,
          "progress_percentage": 100,
          "deploy_error_docs_url": null,
          "ddl_statement": "ALTER TABLE `Persons` DROP COLUMN `Address`",
          "syntax_highlighted_ddl": "<div class=\"line line-1\"><span class=\"k\">ALTER</span> <span class=\"k\">TABLE</span> <span class=\"nv\">`Persons`</span> </div><div class=\"line line-2\">  <span class=\"k\">DROP</span> <span class=\"k\">COLUMN</span> <span class=\"nv\">`Address`</span></div>",
          "created_at": "2023-10-25T16:55:26.562Z",
          "updated_at": "2023-10-25T16:55:26.562Z",
          "can_drop_data": true,
          "table_recently_used": false,
          "table_recently_used_at": null,
          "deploy_errors": null
        }
      ],
      "deploy_operation_summaries": [],
      "deployable": true,
      "cutover_expiring": false,
      "lint_errors": [],
      "deployment_revert_request": {
        "id": "11ljwej314iy",
        "type": "DeploymentRevert",
        "actor": {
          "id": "boo",
          "type": "User",
          "display_name": "Ghost",
          "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
        },
        "cancelled_at": null,
        "finished_at": null,
        "waiting_period_end_at": null,
        "deploy_revert_operations": []
      },
      "auto_cutover": false,
      "created_at": "2023-10-25T16:54:59.863Z",
      "cutover_at": null,
      "deploy_check_errors": null,
      "finished_at": null,
      "queued_at": "2023-10-25T16:55:53.543Z",
      "ready_to_cutover_at": null,
      "started_at": "2023-10-25T16:56:01.035Z",
      "state": "in_progress",
      "submitted_at": "2023-10-25T16:55:53.702Z",
      "updated_at": "2023-10-25T16:56:01.057Z"
    },
    "html_url": "https://app.planetscale.com/demo-db/example_database/deploy-requests/5",
    "number": 5,
    "notes": "",
    "html_body": "",
    "created_at": "2023-10-25T16:54:59.797Z",
    "updated_at": "2023-10-25T16:56:01.063Z",
    "closed_at": null,
    "deployed_at": null
  }
}
```

### Deploy request schema applied

The deploy request has finished applying the schema.

The `deploy_request.schema_applied` event uses the same response body as a `200` response from the [Get a deploy request](https://api-docs.planetscale.com/reference/get_deploy_request) API endpoint. The link includes a detailed description of each field in the API reference.

```json
{
  "timestamp": 1698252989,
  "event": "deploy_request.schema_applied",
  "organization": "myorg",
  "database": "example_database",
  "resource": {
    "id": "4xsz0ql82y4n",
    "type": "DeployRequest",
    "actor": {
      "id": "g2dr4sbhz6ag",
      "type": "User",
      "display_name": "PlanetScale Bot",
      "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
    },
    "closed_by": null,
    "branch": "dev",
    "branch_deleted": false,
    "branch_deleted_by": null,
    "branch_deleted_at": null,
    "into_branch": "main",
    "into_branch_sharded": false,
    "into_branch_shard_count": 0,
    "approved": false,
    "state": "open",
    "deployment_state": "complete_pending_revert",
    "num_comments": 0,
    "deployment": {
      "id": "uvkd7injje2f",
      "type": "Deployment",
      "into_branch": "main",
      "deploy_request_number": 5,
      "actor": {
        "id": "g2dr4sbhz6ag",
        "type": "User",
        "display_name": "PlanetScale Bot",
        "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
      },
      "cutover_actor": {
        "id": "g2dr4sbhz6ag",
        "type": "User",
        "display_name": "PlanetScale Bot",
        "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
      },
      "cancelled_actor": {
        "id": "boo",
        "type": "User",
        "display_name": "Ghost",
        "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
      },
      "schema_last_updated_at": "2023-10-25T16:55:00.288Z",
      "preceding_deployments": [],
      "deploy_operations": [
        {
          "id": "krosesxjzl1p",
          "type": "DeployOperation",
          "state": "complete",
          "keyspace_name": "example_database",
          "table_name": "Persons",
          "operation_name": "ALTER",
          "eta_seconds": 0,
          "progress_percentage": 100,
          "deploy_error_docs_url": null,
          "ddl_statement": "ALTER TABLE `Persons` DROP COLUMN `Address`",
          "syntax_highlighted_ddl": "<div class=\"line line-1\"><span class=\"k\">ALTER</span> <span class=\"k\">TABLE</span> <span class=\"nv\">`Persons`</span> </div><div class=\"line line-2\">  <span class=\"k\">DROP</span> <span class=\"k\">COLUMN</span> <span class=\"nv\">`Address`</span></div>",
          "created_at": "2023-10-25T16:56:01.399Z",
          "updated_at": "2023-10-25T16:56:28.745Z",
          "can_drop_data": true,
          "table_recently_used": false,
          "table_recently_used_at": null,
          "deploy_errors": ""
        }
      ],
      "deploy_operation_summaries": [],
      "deployable": true,
      "cutover_expiring": false,
      "lint_errors": [],
      "deployment_revert_request": {
        "id": "1cio8bfvx0pp",
        "type": "DeploymentRevert",
        "actor": {
          "id": "boo",
          "type": "User",
          "display_name": "Ghost",
          "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
        },
        "cancelled_at": null,
        "finished_at": null,
        "waiting_period_end_at": "2023-10-25T17:26:29.153Z",
        "deploy_revert_operations": [
          {
            "id": "p3r4o6t4wr7x",
            "type": "DeployRevertOperation",
            "ddl_statement": "ALTER TABLE `Persons` DROP COLUMN `Address`",
            "operation_name": "ALTER",
            "state": "submit",
            "table_name": "Persons",
            "created_at": "2023-10-25T16:56:28.833Z",
            "updated_at": "2023-10-25T16:56:29.067Z",
            "revert_errors": null
          }
        ]
      },
      "auto_cutover": false,
      "created_at": "2023-10-25T16:54:59.863Z",
      "cutover_at": "2023-10-25T16:56:22.312Z",
      "deploy_check_errors": null,
      "finished_at": "2023-10-25T16:56:29.121Z",
      "queued_at": "2023-10-25T16:55:53.543Z",
      "ready_to_cutover_at": "2023-10-25T16:56:01.426Z",
      "started_at": "2023-10-25T16:56:01.035Z",
      "state": "complete_pending_revert",
      "submitted_at": "2023-10-25T16:55:53.702Z",
      "updated_at": "2023-10-25T16:56:29.121Z"
    },
    "html_url": "https://app.planetscale.com/demo-db/example_database/deploy-requests/5",
    "number": 5,
    "notes": "",
    "html_body": "",
    "created_at": "2023-10-25T16:54:59.797Z",
    "updated_at": "2023-10-25T16:56:29.128Z",
    "closed_at": null,
    "deployed_at": "2023-10-25T16:56:22.312Z"
  }
}
```

### Deploy request reverted

The deploy request has been reverted.

The `deploy_request.reverted` event uses the same response body as a `200` response from the [Get a deploy request](https://api-docs.planetscale.com/reference/get_deploy_request) API endpoint. The link includes a detailed description of each field in the API reference.

```json
{
  "timestamp": 1698253029,
  "event": "deploy_request.reverted",
  "organization": "myorg",
  "database": "example_database",
  "resource": {
    "id": "4xsz0ql82y4n",
    "type": "DeployRequest",
    "actor": {
      "id": "g2dr4sbhz6ag",
      "type": "User",
      "display_name": "PlanetScale Bot",
      "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
    },
    "closed_by": null,
    "branch": "dev",
    "branch_deleted": false,
    "branch_deleted_by": null,
    "branch_deleted_at": null,
    "into_branch": "main",
    "into_branch_sharded": false,
    "into_branch_shard_count": 0,
    "approved": false,
    "state": "open",
    "deployment_state": "in_progress_revert",
    "num_comments": 0,
    "deployment": {
      "id": "uvkd7injje2f",
      "type": "Deployment",
      "into_branch": "main",
      "deploy_request_number": 5,
      "actor": {
        "id": "g2dr4sbhz6ag",
        "type": "User",
        "display_name": "PlanetScale Bot",
        "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
      },
      "cutover_actor": {
        "id": "g2dr4sbhz6ag",
        "type": "User",
        "display_name": "PlanetScale Bot",
        "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
      },
      "cancelled_actor": {
        "id": "boo",
        "type": "User",
        "display_name": "Ghost",
        "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
      },
      "schema_last_updated_at": "2023-10-25T16:55:00.288Z",
      "preceding_deployments": [],
      "deploy_operations": [
        {
          "id": "krosesxjzl1p",
          "type": "DeployOperation",
          "state": "complete",
          "keyspace_name": "example_database",
          "table_name": "Persons",
          "operation_name": "ALTER",
          "eta_seconds": 0,
          "progress_percentage": 100,
          "deploy_error_docs_url": null,
          "ddl_statement": "ALTER TABLE `Persons` DROP COLUMN `Address`",
          "syntax_highlighted_ddl": "<div class=\"line line-1\"><span class=\"k\">ALTER</span> <span class=\"k\">TABLE</span> <span class=\"nv\">`Persons`</span> </div><div class=\"line line-2\">  <span class=\"k\">DROP</span> <span class=\"k\">COLUMN</span> <span class=\"nv\">`Address`</span></div>",
          "created_at": "2023-10-25T16:56:01.399Z",
          "updated_at": "2023-10-25T16:56:28.745Z",
          "can_drop_data": true,
          "table_recently_used": false,
          "table_recently_used_at": null,
          "deploy_errors": ""
        }
      ],
      "deploy_operation_summaries": [],
      "deployable": true,
      "cutover_expiring": false,
      "lint_errors": [],
      "deployment_revert_request": {
        "id": "1cio8bfvx0pp",
        "type": "DeploymentRevert",
        "actor": {
          "id": "g2dr4sbhz6ag",
          "type": "User",
          "display_name": "PlanetScale Bot",
          "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
        },
        "cancelled_at": null,
        "finished_at": "2023-10-25T16:57:09.472Z",
        "waiting_period_end_at": "2023-10-25T17:26:29.153Z",
        "deploy_revert_operations": [
          {
            "id": "p3r4o6t4wr7x",
            "type": "DeployRevertOperation",
            "ddl_statement": "ALTER TABLE `Persons` DROP COLUMN `Address`",
            "operation_name": "ALTER",
            "state": "complete",
            "table_name": "Persons",
            "created_at": "2023-10-25T16:56:28.833Z",
            "updated_at": "2023-10-25T16:57:09.437Z",
            "revert_errors": ""
          }
        ]
      },
      "auto_cutover": false,
      "created_at": "2023-10-25T16:54:59.863Z",
      "cutover_at": "2023-10-25T16:56:22.312Z",
      "deploy_check_errors": null,
      "finished_at": "2023-10-25T16:56:29.121Z",
      "queued_at": "2023-10-25T16:55:53.543Z",
      "ready_to_cutover_at": "2023-10-25T16:56:01.426Z",
      "started_at": "2023-10-25T16:56:01.035Z",
      "state": "in_progress_revert",
      "submitted_at": "2023-10-25T16:55:53.702Z",
      "updated_at": "2023-10-25T16:57:02.319Z"
    },
    "html_url": "https://app.planetscale.com/demo-db/example_database/deploy-requests/5",
    "number": 5,
    "notes": "",
    "html_body": "",
    "created_at": "2023-10-25T16:54:59.797Z",
    "updated_at": "2023-10-25T16:57:02.327Z",
    "closed_at": null,
    "deployed_at": "2023-10-25T16:56:22.312Z"
  }
}
```

### Deploy request closed

The deploy request has been closed.

The `deploy_request.closed` event uses the same response body as a `200` response from the [Get a deploy request](https://api-docs.planetscale.com/reference/get_deploy_request) API endpoint. The link includes a detailed description of each field in the API reference.

```json
{
  "timestamp": 1698253030,
  "event": "deploy_request.closed",
  "organization": "myorg",
  "database": "example_database",
  "resource": {
    "id": "4xsz0ql82y4n",
    "type": "DeployRequest",
    "actor": {
      "id": "g2dr4sbhz6ag",
      "type": "User",
      "display_name": "PlanetScale Bot",
      "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
    },
    "closed_by": {
      "id": "g2dr4sbhz6ag",
      "type": "User",
      "display_name": "PlanetScale Bot",
      "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
    },
    "branch": "dev",
    "branch_deleted": false,
    "branch_deleted_by": null,
    "branch_deleted_at": null,
    "into_branch": "main",
    "into_branch_sharded": false,
    "into_branch_shard_count": 0,
    "approved": false,
    "state": "closed",
    "deployment_state": "complete_revert",
    "num_comments": 0,
    "deployment": {
      "id": "uvkd7injje2f",
      "type": "Deployment",
      "into_branch": "main",
      "deploy_request_number": 5,
      "actor": {
        "id": "g2dr4sbhz6ag",
        "type": "User",
        "display_name": "PlanetScale Bot",
        "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
      },
      "cutover_actor": {
        "id": "g2dr4sbhz6ag",
        "type": "User",
        "display_name": "PlanetScale Bot",
        "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
      },
      "cancelled_actor": {
        "id": "boo",
        "type": "User",
        "display_name": "Ghost",
        "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
      },
      "schema_last_updated_at": "2023-10-25T16:55:00.288Z",
      "preceding_deployments": [],
      "deploy_operations": [
        {
          "id": "krosesxjzl1p",
          "type": "DeployOperation",
          "state": "complete",
          "keyspace_name": "example_database",
          "table_name": "Persons",
          "operation_name": "ALTER",
          "eta_seconds": 0,
          "progress_percentage": 100,
          "deploy_error_docs_url": null,
          "ddl_statement": "ALTER TABLE `Persons` DROP COLUMN `Address`",
          "syntax_highlighted_ddl": "<div class=\"line line-1\"><span class=\"k\">ALTER</span> <span class=\"k\">TABLE</span> <span class=\"nv\">`Persons`</span> </div><div class=\"line line-2\">  <span class=\"k\">DROP</span> <span class=\"k\">COLUMN</span> <span class=\"nv\">`Address`</span></div>",
          "created_at": "2023-10-25T16:56:01.399Z",
          "updated_at": "2023-10-25T16:56:28.745Z",
          "can_drop_data": true,
          "table_recently_used": false,
          "table_recently_used_at": null,
          "deploy_errors": ""
        }
      ],
      "deploy_operation_summaries": [],
      "deployable": true,
      "cutover_expiring": false,
      "lint_errors": [],
      "deployment_revert_request": {
        "id": "1cio8bfvx0pp",
        "type": "DeploymentRevert",
        "actor": {
          "id": "g2dr4sbhz6ag",
          "type": "User",
          "display_name": "PlanetScale Bot",
          "avatar_url": "https://app.planetscale.com/gravatar-fallback.png"
        },
        "cancelled_at": null,
        "finished_at": "2023-10-25T16:57:09.472Z",
        "waiting_period_end_at": "2023-10-25T17:26:29.153Z",
        "deploy_revert_operations": [
          {
            "id": "p3r4o6t4wr7x",
            "type": "DeployRevertOperation",
            "ddl_statement": "ALTER TABLE `Persons` DROP COLUMN `Address`",
            "operation_name": "ALTER",
            "state": "complete",
            "table_name": "Persons",
            "created_at": "2023-10-25T16:56:28.833Z",
            "updated_at": "2023-10-25T16:57:09.437Z",
            "revert_errors": ""
          }
        ]
      },
      "auto_cutover": false,
      "created_at": "2023-10-25T16:54:59.863Z",
      "cutover_at": "2023-10-25T16:56:22.312Z",
      "deploy_check_errors": null,
      "finished_at": "2023-10-25T16:56:29.121Z",
      "queued_at": "2023-10-25T16:55:53.543Z",
      "ready_to_cutover_at": "2023-10-25T16:56:01.426Z",
      "started_at": "2023-10-25T16:56:01.035Z",
      "state": "complete_revert",
      "submitted_at": "2023-10-25T16:55:53.702Z",
      "updated_at": "2023-10-25T16:57:09.836Z"
    },
    "html_url": "https://app.planetscale.com/demo-db/example_database/deploy-requests/5",
    "number": 5,
    "notes": "",
    "html_body": "",
    "created_at": "2023-10-25T16:54:59.797Z",
    "updated_at": "2023-10-25T16:57:10.046Z",
    "closed_at": "2023-10-25T16:57:09.995Z",
    "deployed_at": "2023-10-25T16:56:22.312Z"
  }
}
```

### Webhook test

A webhook test is triggered.

You can only send one webhook test every 20 seconds.

**Example:**

```json
{
  "timestamp": 1697738828,
  "event": "webhook.test",
  "organization": "myorg",
  "database": "example_database",
  "resource": {
    "id": "34rbgzmvgb9m",
    "type": "Database",
    "region": {
      "id": "kc0e1ij8juzp",
      "type": "Region",
      "provider": "AWS",
      "enabled": true,
      "public_ip_addresses": [
        "23.23.187.137",
        "52.6.141.108",
        "52.70.2.89",
        "50.17.188.76",
        "52.2.251.189",
        "52.72.234.74",
        "35.174.68.24",
        "52.5.253.172",
        "54.156.81.4",
        "34.200.24.255",
        "35.174.79.154",
        "44.199.177.24",
        "35.173.174.19",
        "44.212.228.57",
        "44.216.88.45"
      ],
      "display_name": "AWS us-east-1",
      "location": "N. Virginia",
      "slug": "us-east",
      "current_default": true
    },
    "name": "example_database",
    "notes": "",
    "state": "ready",
    "created_at": "2023-10-18T22:16:54.071Z",
    "updated_at": "2023-10-19T17:25:40.577Z",
    "ready": true,
    "sharded": false,
    "html_url": "https://app.planetscale.com/demo-db/example_database",
    "url": "https://api.planetscale.com/v1/organizations/demo-db/databases/example_database",
    "branches_url": "https://api.planetscale.com/v1/organizations/demo-db/databases/example_database/branches",
    "plan": "scaler_pro"
  }
}
```
