---
title: 'PlanetScale CLI commands - shell'
subtitle: 'Use the PlanetScale CLI “shell” command to open a secure MySQL shell instance to your database from your terminal.'
date: '2022-08-01'
meta:
  title: 'CLI reference - shell'
---

## Getting Started

Make sure to first [set up your PlanetScale developer environment](/docs/concepts/planetscale-environment-setup). Once you've installed the `pscale` CLI, you can interact with PlanetScale and manage your databases straight from the command line.

## The `shell` command

This command opens a secure MySQL shell instance to your database so that you can manipulate it from the command line.

It uses the MySQL command line client (`mysql`), which [must be installed](/docs/concepts/planetscale-environment-setup) prior to use.

**Usage:**

```bash
pscale shell <DATABASE_NAME> <BRANCH_NAME> <FLAG>
```

If no branch is specified, you'll be prompted to enter one. If only one branch exists on the database, you can leave off `<BRANCH_NAME>`.

### Available flags

| **Flag**                    | **Description**                                                                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `-h`, `--help`              | View help for `shell` command                                                                                                    |
| `--local-addr <ADDRESS>`    | Local address to bind and listen for connections. By default, the proxy binds to `127.0.0.1` with a random port.                 |
| `--org <ORGANIZATION_NAME>` | The organization for the current user                                                                                            |
| `--remote-addr <ADDRESS>`   | PlanetScale database remote network address. By default, the remote address is automatically populated from the PlanetScale API. |
| `--role <ROLE>`             | Define the access level [with a role](/docs/concepts/password-roles)                                                             |

Available roles for the `--role` flag are:

- `reader`
- `writer`
- `readwriter`
- `admin`

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

### The `shell` command

**Command:**

```bash
pscale shell <DATABASE_NAME> <BRANCH_NAME>
```

Once the shell is opened, you can run SQL as expected.

**Output:**

```bash
DATABASE_NAME/BRANCH_NAME >
DATABASE_NAME/BRANCH_NAME > show tables;
+---------------+
| Tables_in_db |
+---------------+
| users       |
+---------------+
DATABASE_NAME/BRANCH_NAME > exit;
```

Type `exit` to exit the shell.
