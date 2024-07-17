---
title: 'PlanetScale CLI commands: data-imports'
subtitle: 'Use the PlanetScale CLI “data-imports” command to create, and manage database imports.'
date: '2024-07-15'
meta:
  title: 'CLI reference: data-imports'
---

## Getting Started

Make sure to first [set up your PlanetScale developer environment](/docs/concepts/planetscale-environment-setup). Once you've installed the `pscale` CLI, you can interact with PlanetScale and manage your databases straight from the command line.

## The `service-token` command

This command allows you to manage your [database import](/docs/imports/database-imports) from the PlanetScale CLI.

**Usage:**

```bash
pscale data-imports <SUB-COMMAND> <FLAG>
```

### Available sub-commands

| **Sub-command**            | **Sub-command flags**                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **Description**                                                                  |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `cancel <DATABASE_NAME>`   | `--name`\*, `--force`                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Cancel data import request                                                       |
| `detach-external-database` | `--name`\*, `--force`                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Detach external database that is used as a source for PlanetScale database       |
| `get <DATABASE_NAME>`      | `--name`\*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Get the current state of a data import request into a PlanetScale database       |
| `lint`                     | `--database <EXTERNAL_DATABASE_NAME>`\*, `--host <EXTERNAL_HOST_NAME>`\*, `--password <EXTERNAL_DATABASE_PASS>`\*, `--ssl-mode <SSL_MODE>`\*, `--username <EXTERNAL_DATABASE_USER>`\*, `--port <PORT>`, `--ssl-certificate-authority <SSL_CA>`, `--ssl-client-certificate <SSL_CERT>`, `--ssl-client-key <SSL_CLIENT_KEY>`, `--ssl-server-name <SSL_SERVER_NAME>`                                                                                                                         | Lint external database for compatibility with PlanetScale                        |
| `make-primary`             | `--name`\*, `--force`                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Mark PlanetScale's database as the Primary, and the external database as Replica |
| `make-replica`             | `--name`\*, `--force`                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Mark PlanetScale's database as the Replica, and the external database as Primary |
| `start`                    | `--database <EXTERNAL_DATABASE_NAME>`\*, `--host <EXTERNAL_HOST_NAME_>`\*, `--port <EXTERNAL_PORT_NUMBER>`, `--name <PLANETSCALE_DATABASE_NAME>`\*, `--username <EXTERNAL_DATABASE_USERNAME>`\*, `--password <EXTERNAL_DATABASE_PASSWORD>`\*, `--region <PLANETSCALE_DATABASE_REGION>`, `--ssl-certificate-authority <SSL_CA>`, `--ssl-client-certificate <SSL_CERT>`, `--ssl-client-key <SSL_CLIENT_KEY>`, `--ssl-mode <SSL_MODE>`\*, `--ssl-server-name <SSL_SERVER_NAME>`, `--dry-run` | Start importing data from an external database                                   |

> \* _Flag is required_

#### Sub-command flag descriptions

Some of the sub-commands have additional flags unique to the sub-command. This section covers what each of those does. See the above table for which context.

| **Sub-command flag**                      | **Description**                                                                                            | **Applicable sub-commands**                                                          |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `--database <PLANETSCALE_DATABASE_NAME>`  | Name of the PlanetScale database for which you wish to cancel the import                                   | `cancel`, `lint`                                                                     |
| `--name <PLANETSCALE_DATABASE_NAME>`      | Name of the PlanetScale database you are importing into                                                    | `cancel`, `get`, `detach-external-database`, `make-primary`, `make-replica`, `start` |
| `--force`                                 | Make PlanetScale database replica or primary without confirmation                                          | `cancel`, `detach-external-database`, `make-primary`, `make-replica`                 |
| `--database <EXTERNAL_DATABASE_NAME>`     | Name of the external database                                                                              | `lint`, `start`                                                                      |
| `--dry-run`                               | Only run compatibility check; do not start the import (true by default)                                    | `start`                                                                              |
| `--host <EXTERNAL_HOST_NAME_>`            | Host name of the external database                                                                         | `start`, `lint`                                                                      |
| `--port <EXTERNAL_PORT_NUMBER>`           | Port number to connect to external database (default 3306)                                                 | `start`, `lint`                                                                      |
| `--username <EXTERNAL_DATABASE_USERNAME>` | Username of the external database you are importing from                                                   | `start`, `lint`                                                                      |
| `--password <EXTERNAL_DATABASE_PASSWORD>` | External database password                                                                                 | `start`, `lint`                                                                      |
| `--region <PLANETSCALE_DATABASE_REGION>`  | Region of the PlanetScale database you're importing into                                                   | `start`                                                                              |
| `--ssl-certificate-authority <SSL_CA>`    | The full CA certificate chain                                                                              | `start`, `lint`                                                                      |
| `--ssl-client-certificate <SSL_CERT>`     | Client Certificate to authenticate PlanetScale with your database server                                   | `start`, `lint`                                                                      |
| `--ssl-client-key <SSL_CLIENT_KEY>`       | Private key for the client certificate                                                                     | `start`, `lint`                                                                      |
| `--ssl-mode <SSL_MODE>`                   | SSL verification mode, allowed values: `disabled`, `preferred`, `required`, `verify_ca`, `verify_identity` | `start`, `lint`                                                                      |
| `--ssl-server-name <SSL_SERVER_NAME>`     | SSL server name override                                                                                   | `start`, `lint`                                                                      |

### Available flags

| **Flag**                    | **Description**                       |
| --------------------------- | ------------------------------------- |
| `-h`, `--help`              | View help for `service-token` command |
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
| `--org`                         | The organization for the current user.                                               |
| `--service-token <TOKEN>`       | The service token for authenticating.                                                |
| `--service-token-id <TOKEN_ID>` | The service token ID for authenticating.                                             |
