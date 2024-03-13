---
title: 'PlanetScale CLI commands: completion'
subtitle: 'Use the PlanetScale CLI “completion” command to generate a completion script for the specified shell from your terminal.'
date: '2022-08-01'
meta:
  title: 'CLI reference: completion'
---

## Getting Started

Make sure to first [set up your PlanetScale developer environment](/docs/concepts/planetscale-environment-setup). Once you've installed the `pscale` CLI, you can interact with PlanetScale and manage your databases straight from the command line.

## The `completion` command

This command allows you to generate a completion script for the specified shell.

**Usage:**

```bash
pscale completion <SUB-COMMAND> <FLAG>
```

### Available sub-commands

| **Sub-command** | **Description**                             |
| --------------- | ------------------------------------------- |
| `bash`          | Generated completion for `bash` shell       |
| `zsh`           | Generated completion for `zsh` shell        |
| `fish`          | Generated completion for `fish` shell       |
| `powershell`    | Generated completion for `powershell` shell |

### Available flags

| **Flag**       | **Description**                    |
| -------------- | ---------------------------------- |
| `-h`, `--help` | View help for `completion` command |

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

## How to load completions

### Bash

```bash
source <(pscale completion bash)

# To load completions for each session, execute once:
# Linux:
pscale completion bash > /etc/bash_completion.d/pscale
# macOS:
pscale completion bash > /usr/local/etc/bash_completion.d/pscale
```

### Zsh

```bash
# If shell completion is not already enabled in your environment,
# you will need to enable it.  You can execute the following once:

echo "autoload -U compinit; compinit" >> ~/.zshrc

# To load completions for each session, execute once:
pscale completion zsh > "${fpath[1]}/_yourprogram"

# You will need to start a new shell for this setup to take effect.
```

### fish

```bash
pscale completion fish | source

# To load completions for each session, execute once:
pscale completion fish > ~/.config/fish/completions/pscale.fish
```

### PowerShell

```bash
pscale completion powershell | Out-String | Invoke-Expression

# To load completions for every new session, run:
pscale completion powershell > pscale.ps1
# and source this file from your PowerShell profile.
```
