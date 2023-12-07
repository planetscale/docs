---
title: 'PlanetScale CLI commands - ping'
subtitle: "Use the PlanetScale CLI “ping” command to measure the latency to PlanetScale's public regions from your terminal."
date: '2023-12-07'
meta:
  title: 'CLI reference - ping'
---

## Getting Started

Make sure to first [set up your PlanetScale developer environment](/docs/concepts/planetscale-environment-setup). Once you've installed the `pscale` CLI, you can interact with PlanetScale and manage your databases straight from the command line.

## The `ping` command

This command allows you to see the [latency](/docs/concepts/network-latency) between your machine and PlanetScale's public regions.

**Usage:**

```bash
pscale ping
```

### Available flags

| **Flag**        | **Description**                             |
| --------------- | ------------------------------------------- |
| `-h`, `--help`  | View help for `ping` command                |
| `--concurrency` | Number of concurrent pings. (default 8)     |
| `--timeout`     | Timeout for a ping to succeed. (default 5s) |

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

**Command:**

```bash
pscale ping
```

**Output:**

```shell
ENDPOINT (17)                                    LATENCY   TYPE
------------------------------------------------ --------- -----------
us-east.connect.psdb.cloud                       18.6ms    direct
gcp-us-east4.connect.psdb.cloud                  21.8ms    direct
gcp.connect.psdb.cloud                           24.3ms    optimized
aws.connect.psdb.cloud                           25.1ms    optimized
gcp-northamerica-northeast1.connect.psdb.cloud   27.9ms    direct
aws-us-east-2.connect.psdb.cloud                 29.2ms    direct
gcp-us-central1.connect.psdb.cloud               39.9ms    direct
us-west.connect.psdb.cloud                       88.7ms    direct
aws-eu-west-2.connect.psdb.cloud                 89.2ms    direct
eu-west.connect.psdb.cloud                       97ms      direct
eu-central.connect.psdb.cloud                    98.8ms    direct
aws-sa-east-1.connect.psdb.cloud                 144.8ms   direct
ap-northeast.connect.psdb.cloud                  173.4ms   direct
gcp-asia-northeast3.connect.psdb.cloud           206.9ms   direct
ap-south.connect.psdb.cloud                      213.2ms   direct
aws-ap-southeast-2.connect.psdb.cloud            221.1ms   direct
ap-southeast.connect.psdb.cloud                  248.7ms   direct
```
