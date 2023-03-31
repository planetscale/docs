---
title: 'PlanetScale environment set up'
subtitle: 'Use the PlanetScale CLI to create development branches, make non-blocking schema changes, and open deploy requests directly from your terminal.'
date: '2022-08-01'
---

## Setup overview

To interact with PlanetScale and manage your databases, you can use the `pscale` CLI to do the following:

- Create, delete and list your databases and branches
- Open a secure MySQL shell instance
- Manage your deploy requests
- ...and more!

{% callout %}
`pscale` can use the MySQL command-line client to quickly open an interactive shell for a database branch. Optional
instructions for installing the MySQL client can be found for each platform below.
{% /callout %}

### macOS instructions

To install the PlanetScale CLI on macOS, we recommend using Homebrew.

How to install or verify Homebrew is on your computer:

1. Open Terminal.
2. Check if you have Homebrew installed by running the following command:

   ```bash
   brew -v
   ```

3. If you don't see "Homebrew" and a version number, then download and [install Homebrew](https://brew.sh/).
4. Once you've installed Homebrew, repeat _Step 2_ to verify.

**Installing via Homebrew**

- Run the following command:

```bash
brew install planetscale/tap/pscale
```

- To install the MySQL command-line client:

```bash
brew install mysql-client
```

To upgrade to the latest version:

```bash
brew upgrade pscale
```

### Linux instructions

`pscale` is available as downloadable binaries from the [releases](https://github.com/planetscale/cli/releases/latest) page.

Download the .deb or .rpm from the [releases](https://github.com/planetscale/cli/releases/latest) page and install with `sudo dpkg -i` and `sudo rpm -i` respectively.

The MySQL command-line client can be installed via your package manager.

- Debian-based distributions:

```bash
sudo apt-get install mysql-client
```

- RPM-based distributions:

```bash
sudo yum install community-mysql
```

### Windows instructions

On Windows, `pscale` is available via [scoop](https://scoop.sh/), and as a downloadable binary from the [releases](https://github.com/planetscale/cli/releases/latest) page:

```bash
scoop bucket add pscale https://github.com/planetscale/scoop-bucket.git
scoop install pscale mysql
```

To upgrade to the latest version:

```bash
scoop update pscale
```

**Installation via binary**

Download the latest [Windows release](https://github.com/planetscale/cli/releases/latest) and unzip the `pscale.exe` file into the folder of your choice. Then, run it from PowerShell or whatever terminal you regularly use.

The MySQL command-line client is available in the [Windows MySQL Installer](https://dev.mysql.com/doc/refman/8.0/en/windows-installation.html). To launch `pscale shell` you will need to have the `mysql.exe` executable's directory in your shell's PATH.

In PowerShell, add that directory to your current shell's PATH:

```powershell
$env:path += ";C:\Program Files\MySQL\MySQL Server 8.0\bin"
```

## Manual setup (any OS)

If you prefer to manually install the `pscale` binary for your operating system, the following two methods may be used.

### Download the binary

Download the pre-compiled binaries from the [releases](https://github.com/planetscale/cli/releases/latest) page and download the binary for your operating system to the desired location. The binary may be run using the terminal of your choice from that location.

### Install using `bin`

[bin](https://github.com/marcosnils/bin) is a cross-platform tool to manage binary files. You can install the `pscale` CLI using `bin` with the following command:

```bash
bin install https://github.com/planetscale/cli
```

### Install the MySQL Client

In either case, the MySQL client will need to be installed separately as well. To do so, refer to the [official documentation](https://dev.mysql.com/doc/refman/8.0/en/installing.html) and select the operation system you are working with.

## Using the PlanetScale CLI

See all available commands by running:

```bash
pscale --help
```

Verify that you're using the latest version:

```bash
pscale version
```

You're all set! Check out our [CLI reference page](/docs/reference/planetscale-cli) to explore all that's possible with the PlanetScale CLI.
