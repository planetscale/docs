---
title: 'PlanetScale CLI commands - backup'
subtitle: 'Use the PlanetScale CLI to create development branches, open deploy requests, and make non-blocking schema changes directly from your terminal.'
date: '2022-08-01'
meta:
  title: 'CLI reference - backup'
---

## Getting Started

Make sure to first [set up your PlanetScale developer environment](/docs/concepts/planetscale-environment-setup). Once you've installed the `pscale` CLI, you can interact with PlanetScale and manage your databases straight from the command line.

## The `backup` command

This command allows you to create, list, show, and delete [branch backups](/docs/concepts/back-up-and-restore).

**Usage:**

```bash
pscale backup <SUB-COMMAND> <FLAG>
```

### Available sub-commands

| **Sub-command**                                     | **Description**                    |
| --------------------------------------------------- | ---------------------------------- |
| `create <DATABASE_NAME> <BRANCH_NAME>`              | Backup a branch's data and schema  |
| `delete <DATABASE_NAME> <BRANCH_NAME> <BACKUP_ID>`  | Delete a branch backup             |
| `list <DATABASE_NAME> <BRANCH_NAME>`                | List all backups of a branch       |
| `restore <DATABASE_NAME> <BRANCH_NAME> <BACKUP_ID>` | Restore a backup to a new branch   |
| `show <DATABASE_NAME> <BRANCH_NAME> <BACKUP_ID>`    | Show a specific backup of a branch |

### Available flags

| **Flag**                    | **Description**                       |
| --------------------------- | ------------------------------------- |
| `-h`, `--help`              | View help for `backup` command        |
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

## Examples

### The `list` sub-command with `--org` flag

**Command:**

```bash
pscale backup list <DATABASE_NAME> <BRANCH_NAME> --org <ORGANIZATION_NAME>
```

**Output:**

```
ID             NAME                  STATE     SIZE    CREATED AT    UPDATED AT    STARTED AT    EXPIRES AT          COMPLETED AT
-------------- --------------------- --------- ------- ------------- ------------- ------------- ------------------- --------------
xxxxxxxx   2022.02.11 16:01:03   success   24.1M   3 hours ago   3 hours ago   3 hours ago   1 day from now      3 hours ago
xxxxxxxx   2022.02.10 16:01:03   success   23.2M   1 day ago     1 day ago     1 day ago     20 hours from now   1 day ago
```

### The `show` sub-command

**Command:**

```bash
pscale backup list <DATABASE_NAME> <BRANCH_NAME> <BACKUP_ID>
```

You can find the `<BACKUP_ID>` by running the `pscale backup list <DATABASE_NAME> <BRANCH_NAME>` command.

**Output:**

```
ID             NAME                  STATE     SIZE    CREATED AT    UPDATED AT    STARTED AT    EXPIRES AT          COMPLETED AT
-------------- --------------------- --------- ------- ------------- ------------- ------------- ------------------- --------------
xxxxxxxx   2022.02.11 16:01:03   success   24.1M   3 hours ago   3 hours ago   3 hours ago   1 day from now      3 hours ago
```
