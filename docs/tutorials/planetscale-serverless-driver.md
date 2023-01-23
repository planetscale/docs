---
title: The PlanetScale serverless driver for JavaScript
subtitle: Learn about the PlanetScale serverless driver for JavaScript.
date: '2022-08-18'
---

## Overview

This article will cover the PlanetScale serverless driver for JavaScript and why you'd want to use it for your projects.

## Why use the PlanetScale serverless driver for JavaScript

Before learning how to use the PlanetScale serverless driver for JavaScript, it’s worth understanding why you should use this over other MySQL packages available in the directory. Some serverless & edge function hosts do not permit arbitrary outbound TCP connections, which is how many MySQL clients operate.

Using the PlanetScale serverless driver for JavaScript provides a means of accessing your database and executing queries over an HTTP connection, which is generally not blocked by cloud providers. If you encounter issues using MySQL packages with PlanetScale, use the serverless driver instead.

You’ll need to generate a new set of credentials to use the driver. You may do this by navigating to **"Settings"** > **"Password"** and clicking **"New password"**.

![How to create a new password in the PlanetScale dashboard.](/docs/tutorials/planetscale-serverless-driver/how-to-create-a-new-password-in-the-planetscale-dashboard.png)

Give the password a name and click **"Generate password"**.

![The New password modal.](/docs/tutorials/planetscale-serverless-driver/the-new-password-modal.png)

The new credentials that will be generated should have a hostname like `<REGION>.connect.psdb.cloud`.

![The New password modal after the password has been created.](/docs/tutorials/planetscale-serverless-driver/the-new-password-modal-after-the-password-has-been-created.png)
