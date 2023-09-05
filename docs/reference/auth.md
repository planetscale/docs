---
title: 'PlanetScale CLI commands - auth'
subtitle: 'Use the PlanetScale CLI to create development branches, open deploy requests, and make non-blocking schema changes directly from your terminal.'
date: '2022-08-01'
meta:
  title: 'CLI reference - auth'
---

## Getting Started

Make sure to first [set up your PlanetScale developer environment](/docs/concepts/planetscale-environment-setup). Once you've installed the `pscale` CLI, you can interact with PlanetScale and manage your databases straight from the command line.

## The `auth` command

This command allows you to login, logout, and refresh your authentication.

**Usage:**

```bash
pscale auth <SUB-COMMAND> <FLAG>
```

### Available sub-commands

| **Sub-Command** | **Description**                       |
| --------------- | ------------------------------------- |
| `login`         | Authenticate with the PlanetScale API |
| `logout`        | Log out of the PlanetScale API        |
| `check`         | Check if you are authenticated        |

### Available flags

| **Flag**       | **Description**              |
| -------------- | ---------------------------- |
| `-h`, `--help` | View help for `auth` command |

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

### The `login` sub-command

**Command:**

```bash
pscale auth login
```

**Output:**

A new browser tab will open and ask you to sign in via browser if you're not already signed in. Next, you'll be asked to confirm the Device confirmation code displayed in your terminal:

```bash
Confirmation Code: XXXXXXX
```

If they match, click "Confirm code", and you'll be signed in to the CLI.

### The `logout` sub-command

**Command:**

```bash
pscale auth logout
```

**Output:**

```bash
Press Enter to log out of the PlanetScale API.
```

### The `check` sub-command

**Command:**

```bash
pscale auth check
```

**Output:**

```bash
You are authenticated.
```

If you are not authenticated, exit code 1 will be returned.
