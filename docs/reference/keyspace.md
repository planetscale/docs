---
title: 'PlanetScale CLI commands: keyspace'
subtitle: 'Use the PlanetScale CLI "keyspace" command to create and modify keyspaces and VSchemas from the pscale CLI.'
date: '2024-09-20'
meta:
  title: 'CLI reference: keyspace'
---

## Getting started

Make sure to first [set up your PlanetScale developer environment](/docs/concepts/planetscale-environment-setup). Once you've installed the `pscale` CLI, you can interact with PlanetScale and manage your databases straight from the command line.

## The `keyspace` command

This command allows you to view your keyspaces and view or update your VSchemas.

**Usage:**

```bash
pscale keyspace <SUB-COMMAND> <FLAG>
```

### Available sub-commands

| **Sub-command**                                                | **Sub-command flags** | **Description**                                                          |
| -------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------ |
| `list <DATABASE_NAME> <BRANCH_NAME>` `                         |                       | List all keyspaces within a database branch.                             |
| `show  <DATABASE_NAME> <BRANCH_NAME> <KEYSPACE_NAME>`          |                       | Show a specific keyspace within a database branch.                       |
| `vschema show <DATABASE_NAME> <BRANCH_NAME> <KEYSPACE_NAME>`   |                       | Show the VSchema for a sharded keyspace. Empty on non-sharded keyspaces. |
| `vschema update <DATABASE_NAME> <BRANCH_NAME> <KEYSPACE_NAME>` | `--vschema <FILE>`\*  | Update a VSchema of a keyspace.                                          |

> \* _Flag is required_

#### Sub-command flag descriptions

| **Sub-command flag** | **Description**                                   | **Applicable sub-commands** |
| -------------------- | ------------------------------------------------- | --------------------------- |
| `--vschema <FILE>`   | `<FILE>` is the path to the updated VSchema file. | `vschema update`            |

### Available flags

| **Flag**                    | **Description**                       |
| --------------------------- | ------------------------------------- |
| `-h`, `--help`              | View help for auth command            |
| `--org <ORGANIZATION_NAME>` | The organization for the current user |

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
