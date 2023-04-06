---
title: Connect to your database
subtitle: Understand how to connect your application to your PlanetScale database.
date: '2022-09-13'
---

## Overview

Now that you have your database set up, the next step is to connect it to your application. Most database systems, including PlanetScale, allow applications to connect using connection strings. Connection strings are strings that contain your database credentials and other connection information needed to connect to your database.

In this guide, you’ll learn how to generate a connection string for your application and how branches affect the connection strings.

{% callout %}
This guide continues from the [previous entry](/docs/onboarding/branching-and-deploy-requests) describing how branching & deployments work. Please follow the steps in that guide before proceeding.
{% /callout %}

## Create a connection string

Open the `beam-demo` database and click the **"Connect"** button.

![The Overview tab of the database with the Connect button highlighted.](/assets/docs/onboarding/connect-to-your-database/the-overview-tab-of-the-database-with-the-connect-button-highlighted.png)

The following modal will provide the information required to connect to your database. If this is your first time accessing the **Connect** modal, the password will be displayed in plain text, otherwise, the password will be masked.

![The Connect to modal.](/assets/docs/onboarding/connect-to-your-database/the-connect-to-modal.png)

If you need to generate a new password, simply click the **"New password"** button to generate a new set of credentials.

If you want a language/framework-specific connection string, you can use the **"Connect with"** dropdown and pick the option that best suits what you are building with.

Selecting any of these options not only provides the connection string specific to your environment, but also a sample file that can be used in your code. For example, if you select **"Go"** from the list of options, you’ll be provided a sample **.env** file that contains the connection string as well as a **main.go** file that has the necessary code to connect to PlanetScale using that connection string.

## Branches and connection strings

Connection strings allow your application to securely connect to PlanetScale, but since branches are effectively separate copies of your database, it’s important to know how to generate a connection string for the branch you want to connect to. In the above section, we generated a connection string from the Overview tab of the database. This will create a connection string to the default `main` branch, which is our production database.

When you're working in development, you'll want to connect your dev (local or staging) application to a PlanetScale development branch. To create a connection string for another branch, simply navigate to the branch, and click the Connect button from the overview tab of that branch.

## What's next?

At this point, you should have a good understanding of how to work with and manage databases on PlanetScale, including branching, deployments, and connecting to your database.

Use the resources below to determine next steps for your application.

## Connect your code

Use one of the following quick-starts to get up and running using your preferred language/framework.

{% grid columns=4 %}
{% cell href="/docs/tutorials/connect-django-app" title="Django" imgPath="/img/logos/django.png" /%}
{% cell href="/docs/tutorials/connect-go-app" title="Go CloudSQL" imgPath="/img/logos/go.png" /%}
{% cell href="/docs/tutorials/connect-nodejs-app" title="Node.js" imgPath="/img/logos/node.png" /%}
{% cell href="/docs/tutorials/connect-nextjs-app" title="Next.js" imgPath="/img/logos/next.png" /%}
{% cell href="/docs/tutorials/connect-laravel-app" title="Laravel" imgPath="/img/logos/laravel.png" /%}
{% cell href="/docs/tutorials/connect-symfony-app" title="Symfony" imgPath="/img/logos/symfony.png" /%}
{% cell href="/docs/tutorials/connect-php-app" title="PHP" imgPath="/img/logos/php.png" /%}
{% cell href="/docs/tutorials/connect-rails-app" title="Rails" imgPath="/img/logos/rails.png" /%}
{% /grid %}

## Import your database

Learn how to import an existing MySQL database from supported cloud providers.

{% grid columns=4 %}
{% cell href="/docs/imports/aws-rds-migration-guide" title="AWS RDS" imgPath="/img/logos/aws.png" /%}
{% cell href="/docs/imports/gcp-cloudsql-migration-guide" title="GCP CloudSQL" imgPath="/img/logos/gcp.png" /%}
{% cell href="/docs/imports/azure-database-for-mysql-migration-guide" title="Azure MySQL" imgPath="/img/logos/azure.png" /%}
{% cell href="/docs/imports/digitalocean-database-migration-guide" title="Digital Ocean" imgPath="/img/logos/digitalocean.jpeg" /%}
{% /grid %}
