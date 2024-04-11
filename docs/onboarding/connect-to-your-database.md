---
title: Connect to your database
subtitle: Understand how to connect your application to your PlanetScale database.
date: '2023-09-05'
---

## Overview

Now that you have your database set up, the next step is to connect it to your application. Most database systems, including PlanetScale, allow applications to connect using connection strings. Connection strings are strings that contain your database credentials and other connection information needed to connect to your database.

In this guide, you’ll learn how to generate a connection string for your application and how branches affect the connection strings.

{% callout %}
This guide continues from the [previous entry](/docs/onboarding/branching-and-deploy-requests) describing how branching & deployments work. Please follow the steps in that guide before proceeding.
{% /callout %}

## Create a connection string

Open the `beam-demo` database and click the **"Connect"** button. This will take you to the **Connect** page where you can generate credentials to connect to your database.

Enter a name for your password and click the **"Create password"** button to generate a set of credentials. In the
following section, you can select the language or framework you are using to connect to your database. If you don't see your language or framework listed, you can select **"Other"** to get a generic connection string.

If you want a language-specific guide for your newly created credential, you will be able to select one in the next section. Selecting any of these options not only provides the connection string specific to your environment, but also a sample file that can be used in your code. For example, if you select **"Go"** from the list of options, you’ll be provided a sample `.env` file that contains the connection string as well as a `main.go` file that has the necessary code to connect to PlanetScale using that connection string.

## Branches and connection strings

Connection strings allow your application to securely connect to PlanetScale, but since branches are effectively separate copies of your database, it’s important to know how to generate a connection string for the branch you want to connect to. In the above section, we generated a connection string from the Dashboard tab of the database. This will create a connection string to the default `main` branch, which is our production database.

When you're working in development, you'll want to connect your dev (local or staging) application to a PlanetScale development branch. To create a connection string for another branch, simply navigate to the branch, and click the Connect button from the overview tab of that branch. If you already have existing credentials that you've created in the past, those will be listed below (excluding the password). If you need to generate new credentials, click "New password".

## What's next?

At this point, you should have a good understanding of how to work with and manage databases on PlanetScale, including branching, deployments, and connecting to your database.

Use the resources below to determine next steps for your application.

## Connect your code

Use one of the following quick-starts to get up and running using your preferred language/framework.

{% grid columns=4 %}
{% cell href="/docs/tutorials/connect-django-app" title="Django" imgPath="/assets/logos/django.png" /%}
{% cell href="/docs/tutorials/connect-go-app" title="Go CloudSQL" imgPath="/assets/logos/go.png" /%}
{% cell href="/docs/tutorials/connect-nodejs-app" title="Node.js" imgPath="/assets/logos/node.png" /%}
{% cell href="/docs/tutorials/connect-nextjs-app" title="Next.js" imgPath="/assets/logos/next.png" /%}
{% cell href="/docs/tutorials/connect-laravel-app" title="Laravel" imgPath="/assets/logos/laravel.png" /%}
{% cell href="/docs/tutorials/connect-symfony-app" title="Symfony" imgPath="/assets/logos/symfony.png" /%}
{% cell href="/docs/tutorials/connect-php-app" title="PHP" imgPath="/assets/logos/php.png" /%}
{% cell href="/docs/tutorials/connect-rails-app" title="Rails" imgPath="/assets/logos/rails.png" /%}
{% /grid %}

## Import your database

Learn how to import an existing MySQL database from supported cloud providers.

{% grid columns=4 %}
{% cell href="/docs/imports/aws-rds-migration-guide" title="AWS RDS" imgPath="/assets/logos/aws.png" /%}
{% cell href="/docs/imports/gcp-cloudsql-migration-guide" title="GCP CloudSQL" imgPath="/assets/logos/gcp.png" /%}
{% cell href="/docs/imports/azure-database-for-mysql-migration-guide" title="Azure MySQL" imgPath="/assets/logos/azure.png" /%}
{% cell href="/docs/imports/digitalocean-database-migration-guide" title="Digital Ocean" imgPath="/assets/logos/digitalocean.jpeg" /%}
{% /grid %}
