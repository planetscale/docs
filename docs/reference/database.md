---
title: 'PlanetScale CLI commands - database'
subtitle: 'Use the PlanetScale CLI to create development branches, open deploy requests, and make non-blocking schema changes directly from your terminal.'
date: '2022-08-01'
---

## Getting Started

Make sure to first [set up your PlanetScale developer environment](/docs/concepts/planetscale-environment-setup). Once you've installed the `pscale` CLI, you can interact with PlanetScale and manage your databases straight from the command line.

## The `database` command

This command allows you to create, read, delete, dump, and restore databases.

**Usage:**

```bash
pscale database <SUB-COMMAND> <FLAG>
```

### Available sub-commands

| **Sub-command**                              | **Sub-command flags**                                                           | **Description**                                            |
| -------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `create <DATABASE_NAME>`                     | `--notes <NOTES>`, `--region <REGION_NAME>`, `--web`                            | Create a database with the specified name                  |
| `delete <DATABASE_NAME>`                     | `--force`                                                                       | Delete the specified database                              |
| `dump <DATABASE_NAME> <BRANCH_NAME>`         | `--local-addr <ADDRESS>`, `--output <DIRECTORY_NAME>`, `--tables <TABLES_LIST>` | Backup and dump the specified database                     |
| `list <DATABASE_NAME>`                       |                                                                                 | List all databases in the current org                      |
| `restore-dump <DATABASE_NAME> <BRANCH_NAME>` | `--dir <DIRECTORY_NAME>`\*, `--local-addr <ADDRESS>`, `--overwrite-tables`      | Restore the specified database from a local dump directory |
| `show <DATABASE_NAME>`                       | `--web`                                                                         | Retrieve information about a database                      |

> \* _Flag is required_

#### Sub-command flag descriptions

Some of the sub-commands have additional flags unique to the sub-command. This section covers what each of those does. See the above table for which context.

| **Sub-command flag**        | **Description**                                                                                               | **Applicable sub-commands** |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `--notes`                   | Add a description for the new database                                                                        | `create`                    |
| `--region`                  | Specify the [region](/docs/concepts/regions) of the new database. Default is `us-east`.                       | `create`                    |
| `--force`                   | Delete a database without confirmation.                                                                       | `delete`                    |
| `--local-addr <ADDRESS>`    | Local address to bind and listen for connections. By default the proxy binds to 127.0.0.1 with a random port. | `dump`, `restore-dump`      |
| `--output <DIRECTORY_NAME>` | Output directory of the dump. By default the dump is saved to a folder in the current directory.              | `dump`                      |
| `--tables <TABLES_LIST>`    | Comma separated string of tables to dump. By default, all tables are dumped.                                  | `dump`                      |
| `--dir <DIRECTORY_NAME>`    | Directory containing the files to be used for the restore.                                                    | `restore-dump`              |
| `--overwrite-tables`        | If true, will attempt to DROP TABLE before restoring.                                                         | `restore-dump`              |
| `--web`                     | Perform the action in your web browser                                                                        | `show`                      |

### Available flags

| **Flag**                    | **Description**                                              |
| --------------------------- | ------------------------------------------------------------ |
| `--h`                       | Get help with the `database` command                         |
| `--org <ORGANIZATION_NAME>` | Specify the organization for the database you're acting upon |

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

### The `database` command with `create` subcommand and `--notes` flag

**Command:**

```bash
pscale database create new-database --notes "This is my new database" --region <REGION_NAME>
```

**Output:**

Database `new-database` was successfully created.
