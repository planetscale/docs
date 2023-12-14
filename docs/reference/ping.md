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
| `-n`, `--count` | Number of pings (default 10)                |
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
  NAME (17)                     LATENCY   ENDPOINT                                         TYPE
 ----------------------------- --------- ------------------------------------------------ -----------
  AWS us-west-2                 34.6ms    aws.connect.psdb.cloud                           optimized
  AWS us-west-2                 34.8ms    us-west.connect.psdb.cloud                       direct
  GCP us-central1               57.5ms    gcp.connect.psdb.cloud                           optimized
  GCP us-central1               57.9ms    gcp-us-central1.connect.psdb.cloud               direct
  AWS us-east-2                 60.5ms    aws-us-east-2.connect.psdb.cloud                 direct
  GCP us-east4                  69.2ms    gcp-us-east4.connect.psdb.cloud                  direct
  AWS us-east-1                 70.2ms    us-east.connect.psdb.cloud                       direct
  GCP northamerica-northeast1   80.9ms    gcp-northamerica-northeast1.connect.psdb.cloud   direct
  AWS ap-northeast-1            116.6ms   ap-northeast.connect.psdb.cloud                  direct
  GCP asia-northeast3           149.5ms   gcp-asia-northeast3.connect.psdb.cloud           direct
  AWS ap-southeast-2            150.9ms   aws-ap-southeast-2.connect.psdb.cloud            direct
  AWS eu-central-1              154.4ms   eu-central.connect.psdb.cloud                    direct
  AWS eu-west-1                 157.2ms   eu-west.connect.psdb.cloud                       direct
  AWS sa-east-1                 179.5ms   aws-sa-east-1.connect.psdb.cloud                 direct
  AWS ap-southeast-1            189.4ms   ap-southeast.connect.psdb.cloud                  direct
  AWS ap-south-1                243.1ms   ap-south.connect.psdb.cloud                      direct
  AWS eu-west-2                 670.5ms   aws-eu-west-2.connect.psdb.cloud                 direct
```
