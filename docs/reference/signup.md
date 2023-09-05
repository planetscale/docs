---
title: 'PlanetScale CLI commands - signup'
subtitle: 'Use the PlanetScale CLI “signup” command to sign up for a PlanetScale account directly from your terminal.'
date: '2022-08-01'
meta:
  title: 'CLI reference - signup'
---

## Getting Started

Make sure to first [set up your PlanetScale developer environment](/docs/concepts/planetscale-environment-setup). Once you've installed the `pscale` CLI, you can interact with PlanetScale and manage your databases straight from the command line.

## The `signup` command

This command allows you to sign up for a PlanetScale account straight from the command line. You'll be prompted to register with an email and password.

**Usage:**

```bash
pscale signup <FLAG>
```

### Available flags

| **Flag**       | **Description**                |
| -------------- | ------------------------------ |
| `-h`, `--help` | View help for `signup` command |

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

### The `signup` command

**Command:**

```bash
pscale signup
```

**Output:**

```bash
You are registering a new PlanetScale account.
? What is your e-mail? me@example.com
? Please type your password ******************
? Please confirm your password ******************
You've successfully signed up for PlanetScale!
Please check your email for a confirmation link and then get started with `pscale auth login`.
```

The password must be a minimum of 10 characters and include: 1 uppercase, digit, or special character.
