---
title: Node.js example using the PlanetScale serverless driver
subtitle: Learn the PlanetScale serverless driver by running a local Node.js project.
date: '2023-01-30'
---

## Overview

This guide will cover how to use the provided Node.js sample application using the PlanetScale serverless driver for JavaScript.

{% callout %}
This guide will be using VS Code as the IDE, but you may use your preferred IDE.
{% /callout %}

## Use the sample repository

We offer a sample repository that can be used as an educational resource. It is an Express API that can be run locally with sample `SELECT`, `INSERT`, `UPDATE`, and `DELETE` statements mapped to the proper API endpoints.

To follow along, you’ll need the following:

- A PlanetScale account, as well as knowing how to create a database.
- The PlanetScale CLI is installed on your computer, which will be used to seed data.

Start by creating a database in PlanetScale by clicking **"New database"** > **"Create new database"**.

![How to create a new database.](/assets/docs/tutorials/planetscale-serverless-driver-node-example/how-to-create-a-new-database-2.png?v2)

Name the database `travel_db`. Click **"Create database"**. Wait for the database to finish initializing before moving on.

![The travel_db initializing.](/assets/docs/tutorials/planetscale-serverless-driver-node-example/initializing-2.png?v2)

Generate a set of credentials by clicking the **"Get connection strings"** button.

![The Connect button in the PlanetScale dashboard.](/assets/docs/tutorials/planetscale-serverless-driver-node-example/the-connect-button-in-the-planetscale-dashboard-2.png?v2)

Select **"@planetscale/database"** from the options in the **"Connect with"** dropdown. Copy the text from the **".env"** tab as we'll be putting this in the project after it's pulled down from GitHub.

![The Connect modal.](/assets/docs/tutorials/planetscale-serverless-driver-node-example/the-serverlessjs-connect-modal-2.png?v2)

{% callout %}
When using the serverless JS driver, your host name will always be `aws.connect.psdb.cloud`. You might notice this is slightly different from the regular PlanetScale connection strings, which are formatted as `<REGION>.connect.psdb.cloud`.
{% /callout %}

On your workstation, open a terminal and clone the repository to your computer by running the following command:

```bash
git clone https://github.com/planetscale/database-js-starter
```

Navigate to the `scripts` folder and run the `seed_database.sh` script to populate a small database simulating a travel agency.

```bash
cd database-js-starter/scripts
./seed-database.sh
```

{% callout %}
If you are using Windows, run this command through the [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/)
{% /callout %}

Create a new file named `.env` in the root of the project and paste in the sample provided from PlanetScale that you copied earlier.

To run the project, run the following commands from the root of the project.

```bash
npm install
npm start
```

If the project is running properly, you should receive a message stating that the API is running.

The `tests.http` file is designed to work with the [VS Code Rest Client plugin](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), but can be used as a reference when testing with the tool of your choosing. If you are using the plugin, you may click the **"Send request"** button that appears above each request to see the API in action.

![An example of a POST request to the sample project.](/assets/docs/tutorials/planetscale-serverless-driver-node-example/an-example-of-a-post-request-to-the-sample-project.png)

If you check the terminal where the API was started, the response from the `execute` function is logged out for review.
