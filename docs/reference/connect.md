---
title: 'PlanetScale CLI commands - connect'
subtitle: 'Use the PlanetScale CLI to create development branches, open deploy requests, and make non-blocking schema changes directly from your terminal.'
date: '2022-08-01'
meta:
  title: 'CLI reference - connect'
---

## Getting Started

Make sure to first [set up your PlanetScale developer environment](/docs/concepts/planetscale-environment-setup). Once you've installed the `pscale` CLI, you can interact with PlanetScale and manage your databases straight from the command line.

## The `connect` command

This command creates a secure connection to a database branch for a local client.

**Usage:**

```bash
pscale connect <DATABASE_NAME> <BRANCH_NAME> <FLAG>
```

If there is only one branch available on the database, you can leave off `<BRANCH_NAME>`.

### Available flags

| **Flag** | **Description** |
| --- | --- |
| `--execute <COMMAND>` | Run the specified command after successfully connecting to the database. |
| `--execute-env-url <ENV_VAR_NAME>` | Environment variable name that contains the exposed Database URL. Default is `DATABASE_URL`. |
| `--execute-protocol <PROTOCOL>` | Protocol for the exposed URL (by default `DATABASE_URL`) value in execute. Default is `mysql2`. |
| `--h` | Help with the `connect` command. |
| `--host <HOST>` | Local host to bind and listen for connections. Default is `127.0.0.1`. |
| `--org <ORG_NAME>` | The organization of the database you want to connect to. |
| `--port <PORT>` | Local port to bind and listen for connections. Default is `3306`. |
| `--remote-addr <ADDRESS>` | PlanetScale Database remote network address. By default, the remote address is automatically populated from the PlanetScale API. |
| `--role <ROLE>` | Define the access level [with a role](/docs/concepts/password-roles) |

Available roles for the `--role` flag are:

- `reader`
- `writer`
- `readwriter`
- `admin`

### Global flags

| **Command** | **Description** |
| --- | --- |
| `--api-token <TOKEN>` | The API token to use for authenticating against the PlanetScale API. |
| `--api-url <URL>` | The base URL for the PlanetScale API. Default is `https://api.planetscale.com/`. |
| `--config <CONFIG_FILE>` | Config file. Default is `$HOME/.config/planetscale/pscale.yml`. |
| `--debug` | Enable debug mode. |
| `-f`, `--format <FORMAT>` | Show output in a specific format. Possible values: `human` (default), `json`, `csv`. |
| `--no-color` | Disable color output. |
| `--service-token <TOKEN>` | The service token for authenticating. |
| `--service-token-id <TOKEN_ID>` | The service token ID for authenticating. |

## Examples

### The `connect` command with `--execute` flag

**Command:**

```bash
pscale connect <DATABASE_NAME> <BRANCH_NAME> --execute 'node app.js'
```

**Output:**

This command connects to the specified PlanetScale branch and runs the `node app.js` command. Since no `--execute-env-url` flag was passed, it uses the default `DATABASE_URL` environment variable. You can find a full example of this in our [Node quickstart](/docs/tutorials/connect-nodejs-app).
