---
title: 'PlanetScale CLI commands - api'
subtitle: 'Use the PlanetScale CLI to make authenticated calls against the PlanetScale API.'
date: '2023-07-17'
meta:
  title: 'CLI reference - api'
---

## Getting Started

Make sure to first [set up your PlanetScale developer environment](/docs/concepts/planetscale-environment-setup). Once you've installed the `pscale` CLI, you can interact with PlanetScale and manage your databases straight from the command line.

## The `api` command

A helper for constructing any call to [the PlanetScale API](https://api-docs.planetscale.com/reference). It can invoke any endpoint, whether support in equivalent commands of the CLI has been added or not. For these reasons, the `api` command is useful in cases such as scripting or where you might use `curl` against the API.

**Usage:**

```bash
pscale api <ENDPOINT> <FLAG>
```

The `<ENDPOINT>` is a URL path such as `/organizations/{org}/databases/{db}/branches/{branch}`, omitting the `v1` prefix. You can use placeholders such as `{org}`, `{db}` and `{branch}` in the endpoint, and these will be replaced by the values found in `~/.config/planetscale/pscale.yml` and in the `.pscale.yml` at the root of the current Git repository (if present). These values can also be specified by the `--org`, `--database`, and `--branch` flags. Refer to the [API documentation](https://api-docs.planetscale.com/reference) for details.

### Available flags

| **Flag**                     | **Description**                                                                |
| ---------------------------- | ------------------------------------------------------------------------------ |
| `-h`, `--help`               | View help for `audit-log` command.                                             |
| `-F`, `--field` key=value    | HTTP body to send with the request, in `key=value` format.                     |
| `-H`, `--header` stringArray | HTTP headers to add to the request.                                            |
| `-I`, `--input`              | HTTP body to send with the request, as a file that will be read and then sent. |
| `-X`, `--method`             | HTTP method to use for the request.                                            |
| `-Q`, `--query`              | Query to append to the URL path, in `key=value` format.                        |
| `--org <ORGANIZATION_NAME>`  | The organization for the current user.                                         |
| `--database <DATABASE_NAME>` | The database for the current project.                                          |
| `--branch <BRANCH_NAME>`     | The name of the current branch.                                                |

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

### To get the current user:

**Command:**

```bash
pscale api user
```

**Output:**

The body of the HTTP response.

### To list an organization's databases:

**Command:**

```bash
pscale api organizations/{org}/databases
```

**Output:**

The body of the HTTP response.

### To create a database:

**Command:**

```bash
pscale api organizations/{org}/databases -F 'name="my-database"'
```

**Output:**

The body of the HTTP response.

### To get a database:

**Command:**

```bash
pscale api organizations/{org}/databases/my-database
```

**Output:**

The body of the HTTP response.

### To delete a database:

**Command:**

```bash
pscale api -X DELETE organizations/{org}/databases/my-database
```

**Output:**

The body of the HTTP response.

### To add a note on a database from the content of a file:

**Command:**

```bash
pscale api -X PATCH organizations/{org}/databases/{db} -F 'notes=@mynotes.txt'
```

**Output:**

The body of the HTTP response.

### To create a database branch from a file:

**Command:**

```bash
pscale api organizations/{org}/databases/{db}/branches --input=spec.json
```

**Output:**

The body of the HTTP response.

### To create a database branch from stdin, override the name:

**Command:**

```bash
pscale api organizations/{org}/databases/{db}/branches --input=- -F 'name="my-name"'
```

**Output:**

The body of the HTTP response.
