---
title: 'PlanetScale CLI commands - deploy-request'
subtitle: 'Use the PlanetScale CLI to create development branches, open deploy requests, and make non-blocking schema changes directly from your terminal.'
date: '2022-11-17'
---

## Getting Started

Make sure to first [set up your PlanetScale developer environment](/docs/concepts/planetscale-environment-setup). Once you've installed the `pscale` CLI, you can interact with PlanetScale and manage your databases straight from the command line.

## The `deploy-request` command

This command allows you to create, review, diff, and manage deploy requests.

**Usage:**

```bash
pscale deploy-request <SUB-COMMAND> <FLAG>
```

{% callout %}
Your database must have a production branch before you can create a deploy request.
{% /callout %}

### Available sub-commands

| **Sub-command**                           | **Sub-command flags**                                                        | **Description**                                 |
| ----------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------- |
| `apply <DATABASE_NAME> <DR_NUMBER>`       |                                                                              | Apply changes to a gated deploy request.        |
| `cancel <DATABASE_NAME> <DR_NUMBER>`      |                                                                              | Cancel a deploy request.                        |
| `close <DATABASE_NAME> <DR_NUMBER>`       |                                                                              | Close the specified deploy request.             |
| `create <DATABASE_NAME> <BRANCH_NAME>`    | `--deploy-to <BRANCH_NAME>`                                                  | Create a new deploy request.                    |
| `deploy <DATABASE_NAME> <DR_NUMBER>`      |                                                                              | Deploy the specified deploy request.            |
| `diff <DATABASE_NAME> <DR_NUMBER>`        | `--web`                                                                      | Show the diff of the specified deploy request.  |
| `edit <DATABASE_NAME> <DR_NUMBER>`        | `--auto-apply string` Possible values: [enable, disable] (default: "enable") | Edit a deploy request.                          |
| `list <DATABASE_NAME>`                    | `--web`                                                                      | List all deploy requests for a database.        |
| `revert <DATABASE_NAME> <DR_NUMBER>`      |                                                                              | Revert a deployed deploy request.               |
| `review <DATABASE_NAME> <DR_NUMBER>`      | `--web`, `--approve`, `--comment <COMMENT>`                                  | Approve or comment on a deploy request.         |
| `show <DATABASE_NAME> <DR_NUMBER>`        | `--web`                                                                      | Show the specified deploy request.              |
| `skip-revert <DATABASE_NAME> <DR_NUMBER>` |                                                                              | Skip and close a pending deploy request revert. |

> \* _Flag is required_

The value `<DR_NUMBER>` represents the deploy request number (not to be confused with `id`). To see a deploy request number, run `pscale deploy-request list <DATABASE_NAME>`.

You can also find the number in the PlanetScale dashboard in the URL of the specified deploy request: `https://app.planetscale.com/<ORGANIZATION>/<DATABASE>/deploy-requests/<DR_NUMBER>`.

#### Sub-command flag descriptions

Some of the sub-commands have additional flags unique to the sub-command. This section covers what each of those does. See the above table for which context.

| **Sub-command flag**        | **Description**                                                                      | **Applicable sub-commands** |
| --------------------------- | ------------------------------------------------------------------------------------ | --------------------------- |
| `--deploy-to <BRANCH_NAME>` | Specify that the new deploy request deploy to a specified branch. Default is `main`. | `create`                    |
| `--web`                     | Perform the action in your web browser                                               | `diff`, `list`, `show`      |
| `--approve`                 | Approve a deploy request                                                             | `review`                    |
| `--comment <COMMENT>`       | Leave a comment on a deploy request                                                  | `review`                    |

### Available flags

| **Flag**                    | **Description**                                                    |
| --------------------------- | ------------------------------------------------------------------ |
| `--h`                       | Get help with the `deploy-request` command                         |
| `--org <ORGANIZATION_NAME>` | Specify the organization for the deploy request you're acting upon |

### Global flags

| **Command**                     | **Description**                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| `--api-token <TOKEN>`           | The API token to use for authenticating against the PlanetScale API.                 |
| `--api-url <URL>`               | The base URL for the PlanetScale API. Default is `https://api.planetscale.com/`.     |
| `--config <CONFIG_FILE>`        | Config file. Default is `$HOME/.config/planetscale/pscale.yml`.                      |
| `--debug`                       | Enable debug mode.                                                                   |
| `-f`, `--format <FORMAT>`       | Show output in a specific format. Possible values: `human` (default), `json`, `csv`. |
| `--no-color`                    | Disable color output.                                                                |
| `--service-token <TOKEN>`       | The service token for authenticating.                                                |
| `--service-token-id <TOKEN_ID>` | The service token ID for authenticating.                                             |

## Examples

### The `deploy-request` command with `review` subcommand and `--comment` flag

**Command:**

```bash
pscale deploy-request review <DATABASE_NAME> 1 --comment 'Lets wait on this.'
```

**Output:**

A comment is added to the deploy request `<DATABASE_NAME>`/1.
