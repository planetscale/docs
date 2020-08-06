---
title: 'Secure database connection'
category: 'setting-up-your-planetscale-database'
---

# Securing the connection to your PlanetScaleDB database

This document describes how to encrypt and authenticate the connection between your application and your PlanetScaleDB database using the TLS protocol.

## Overview

By default, every [connection to a PlanetScaleDB database](connecting-to-db) will use transport encryption if possible, using the [`PREFERRED` SSL mode](https://dev.mysql.com/doc/refman/5.7/en/connection-options.html#option_general_ssl-mode). If the server cannot establish an encrypted connection, it will fall back to an unencrypted connection.

To enforce encrypted transport, use the `--ssl-mode=REQUIRED` option in your MySQL connection string.

To enforce encrypted transport and verify the certificate authority, use the `--ssl-mode=VERIFY_CA`. This SSL mode requires a certificate authority (CA) certificate. To configure your MySQL client to use the CA cert for your database, follow these steps:

1. Go to your [PlanetScale console](https://console.planetscale.com).
1. Click on your cluster.
1. Click on your database.
1. Click **Connection Security**.
1. Click **Copy**.
1. Save the certificate to a document.
1. Specify the certificate location in your MySQL connection string.

PlanetScaleDB databases currently do not support the `VERIFY_IDENTITY` SSL mode.

## Step 1. Go to the [PlanetScale console](https://console.planetscale.com).

This opens the **Clusters Overview**.

## Step 2. Click on your cluster name.

This opens the **Overview** for your cluster.

## Step 3. Click on your database name.

This opens the **Overview** for your database.

## Step 4. Click **Connection Security**.

![Connection Security tab](/img/docs/connection-security-tab.png)

This displays your Certificate Authority certificate.

## Step 5. Click **Copy**.

![Certificate Authority certificate copy button](/img/docs/ca-cert-copy-button.png)

## Step 6. Save the certificate to a document.

This document should be accessible by your MySQL client.

For example, you can create a file named `ca.pem` and paste the certificate from your clipboard.

Note: Include the lines that read `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE`.

## Step 7. Specify the certificate location in your MySQL connection string.

Update your [MySQL connection configuration file](connecting-to-db) to include the following line:

`ssl-ca=/path/to/ca-cert.pem`

Replace `/path/to/ca-cert.pem` with the path to your certificate.

## See also

- [Connecting to your database](connecting-to-db)
- [Allowing access to specific IP addresses](whitelisting-ips)
- [Using Encrypted Connections](https://dev.mysql.com/doc/refman/5.7/en/encrypted-connections.html) on [mysql.com](https://dev.mysql.com).
