---
title: 'Connect a Laravel application to PlanetScale'
subtitle: 'Spin up a PlanetScale MySQL serverless database in seconds and connect to a Laravel application'
className: 'ignore-img-borders'
date: '2023-06-21'
---

## Introduction

In this tutorial, you'll learn how to connect a Laravel application to a PlanetScale MySQL database using a sample Laravel starter app.

## Prerequisites

- [PHP](https://www.php.net/manual/en/install.php) &mdash; This tutorial uses `v8.1`
- [Composer](https://getcomposer.org/)
- A [free PlanetScale account](https://auth.planetscale.com/sign-up)

## Set up the Laravel app

This guide will integrate [a simple Laravel 9 app](https://github.com/planetscale/laravel-example) with PlanetScale. The application will display a list of stars and what constellation each star is in. The sample repo contains migrations and seed data to create and populate the `constellations` and `stars` tables. If you have an existing application, you can also use that.

1. Clone the starter Laravel application:

   ```bash
   git clone https://github.com/planetscale/laravel-example.git
   ```

2. Enter into the folder and install the dependencies:

   ```bash
   cd laravel-example
   composer install
   ```

   You may need to run `composer update` if you haven't updated in a while.

3. Copy the `.env.example` file into `.env` and generate the app key:

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Start the application:

   ```bash
   php artisan serve
   ```

You can view the application at [http://localhost:8000](http://localhost:8000).

## Set up the database

Next, you need to set up your PlanetScale database and connect to it in the Laravel application.

If this is your first time in the dashboard, you'll be prompted to go through a database creation walkthrough where you'll create a new database. Otherwise, click "**New database**" > "**Create new database**".

- **Name** &mdash; You can use any name with lowercase, alphanumeric characters, or underscores. We also permit dashes, but don't recommend them, as they may need to be escaped in some instances.
- **Plan type** &mdash; Select the [desired plan](/docs/concepts/billing#planetscale-plans) for your database.
- **Region** &mdash; Choose the [region](/docs/concepts/regions#available-regions) closest to you or your application. It's important to note if you intend to make this branch a production branch, you will not be able to change the region later, so choose the region with this in mind.

Finally, click "**Create database**".

{% callout %}
If you have an existing cloud-hosted database, you can also choose the "**Import**" option to import your database to PlanetScale using our Import tool. If you go this route, we recommend using our [Database Imports documentation](/docs/imports/database-imports).
{% /callout %}

A [production branch](/docs/concepts/branching), `main`, is automatically created when you create your database. Though safe migrations are off by default, so you can make schema changes directly to this branch. Once you're happy with any schema changes, you can turn on safe migrations to protect from accidental schema changes and enable zero-downtime deployments.

That's it! Your database is ready to use. Next, let's connect it to the Laravel application and then add some data.

## Connect to the Laravel app

There are **two ways to connect** to PlanetScale:

- With an auto-generated username and password
- Using the PlanetScale proxy with the CLI

Both options are covered below.

### Option 1: Connect with username and password (Recommended)

Next, you need to generate a database username and password so that you can use it to connect to your application.

In your PlanetScale dashboard, select your database, click "**Connect**", and select "**Laravel**" from the "**Connect with**" dropdown.

As long as you're an organization administrator, this will generate a username and password that has administrator privileges to the database.

{% callout type="tip" %}
If the password value is blurred, you need to click "**New password**" to generate a new one.
{% /callout %}

Copy the contents of the `.env` tab and paste them into your own `.env` file in your Laravel application. The structure will look like this:

```bash
DB_CONNECTION=mysql
DB_HOST=<ACCESS HOST URL>
DB_PORT=3306
DB_DATABASE=<DATABASE_NAME>
DB_USERNAME=<USERNAME>
DB_PASSWORD=<PASSWORD>
MYSQL_ATTR_SSL_CA=/etc/ssl/cert.pem
```

The `MYSQL_ATTR_SSL_CA` value is platform dependent. Please see our documentation around [how to connect to PlanetScale securely](/docs/concepts/secure-connections#ca-root-configuration) for the configuration for the platform you're using.

Refresh your Laravel homepage and you should see the message that you're connected to your database!

### Option 2: Connect with the PlanetScale proxy

To connect with the PlanetScale proxy, you need to install and use the [PlanetScale CLI](https://github.com/planetscale/cli).

1. Open a connection by running the following:

   ```bash
   pscale connect <DATABASE_NAME> <BRANCH_NAME>
   ```

   If you're following this guide exactly and haven't created any branches, you can use the default branch, `main`.

2. A secure connection to your database will be established and you'll see a local address you can use to connect to your application.

3. Open the `.env` file in your Laravel app and update it as follows:

   ```bash
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306 # Get this from the output of the previous step
   DB_DATABASE=<DATABASE_NAME>
   DB_USERNAME=
   DB_PASSWORD=
   ```

   The connection uses port `3306` by default, but if that's being used, it will pick a random port. Make sure you paste in whatever port is returned in the terminal. You can leave `DB_USERNAME` and `DB_PASSWORD` blank.

Refresh your Laravel homepage and you should see the message that you're connected to your database!

## Run migrations and seeder

Now that you're connected, let's add some data to see it in action. The sample application comes with two migration files:

- `database/migrations/2021_12_20_194637_create_stars_table.php` &mdash; Creates a `stars` table
- `database/migrations/2022_07_26_190656_create_constellations_table.php` &mdash; Creates a `constellations` table

{% callout %}
PlanetScale does not support foreign key _constraints_, but we do support the use of relationships with foreign keys, as shown in the Stars migration file in this example.

You can use the [`foreignId()` method](https://laravel.com/docs/migrations#foreign-key-constraints) to create a relationship between the `constellations` and `stars` tables, but you cannot enforce referential integrity with the `constrained()` method.

For more information, check out our [Operating without foreign key constraints](/docs/learn/operating-without-foreign-key-constraints) documentation.
{% /callout %}

There are also two seeders, `database/seeders/ConstellationSeeder.php` and `database/seeders/StarSeeder.php`, that will add two rows to the each table. Let's run those now.

1. Make sure your database connection has been established. You'll see the message "You are connected to your_database_name" on the [Laravel app homepage](http://localhost:8000/) if everything is configured properly.

2. In the root of the Laravel project, run the following to migrate and seed the database:

   ```bash
   php artisan migrate --seed
   ```

3. Refresh your Laravel homepage and you'll see a list of stars and their constellations printed out.

The `resources/views/home.blade.php` file pulls this data from the `stars` table with the help of the `app/Http/Controllers/StarController.php` file.

![Laravel PlanetScale starter app homepage](/assets/docs/tutorials/connect-laravel-app/example.png)

## Add data manually

If you want to continue to play around with adding data on the fly, you have a few options:

- PlanetScale dashboard console
- [Laravel Tinker](https://laravel.com/docs/9.x/artisan#tinker)
- [PlanetScale CLI shell](/docs/reference/shell)
- Your favorite MySQL client (for a list of tested MySQL clients, review our article on [how to connect MySQL GUI applications](/docs/tutorials/connect-mysql-gui))

The first two options are covered below.

### Add data in PlanetScale dashboard console

PlanetScale has a [built-in console](/docs/concepts/web-console) where you can run MySQL commands against your branches.

By default, web console access to production branches is disabled to prevent accidental deletion. From your database's overview page, click on the "**Settings**" tab, check the box labelled "**Allow web console access to production branches**", and click "**Save database settings**".

To access it, click "**Console**" > select your branch > "**Connect**".

From here, you can run MySQL queries and DDL against your database branch.

1. Add a record to the `constellations` table:

   ```sql
   INSERT INTO `constellations` (name)
   VALUES  ('Kaus Media');
   ```

2. Add a record to the `stars` table:

   ```sql
   INSERT INTO `stars` (name, constellation_id)
   VALUES  ('Sagittarius', 3);
   ```

3. Refresh the Laravel homepage to see the new record. You can also verify it was added in the console with:

   ```sql
   SELECT * FROM stars;
   ```

![PlanetScale web console](/assets/docs/tutorials/connect-laravel-app/console.png)

### Add data with Laravel Tinker

Laravel comes with a powerful tool called [Tinker](https://laravel.com/docs/9.x/artisan#tinker) that lets you interact with your database from the command line. Let's add some data with it.

1. In your terminal, run the following command:

   ```bash
   php artisan tinker
   ```

2. Insert a new record into the `constellations` table with:

   ```php
   DB::table('constellations')->insert(['name'=>'Kaus Media']);
   ```

3. Insert a new record into the `stars` table with:

   ```php
   DB::table('stars')->insert(['name'=>'Sagitarrius', 'constellation'=>3]);
   ```

4. Refresh your Laravel application homepage to see your new data. You can also run the following command in Tinker to see all records in the `stars` table.

   ```php
   App\Models\Star::all();
   ```

5. Type `exit` to exit Tinker.

## What's next?

Once you're done with initial development, you can enable [safe migrations](/docs/concepts/safe-migrations) to protect from accidental schema changes and enable zero-downtime deployments.

To learn more about PlanetScale, take a look at the following resources:

- [PlanetScale workflow](/docs/concepts/planetscale-workflow) &mdash; Quick overview of the PlanetScale workflow: branching, non-blocking schema changes, deploy requests, and reverting a schema change.
- [PlanetScale branching](/docs/concepts/branching) &mdash; Learn how to utilize branching to ship schema changes with no locking or downtime.
- [PlanetScale CLI](/docs/reference/planetscale-cli) &mdash; Power up your workflow with the PlanetScale CLI. Every single action you just performed in this quickstart (and much more) can also be done with the CLI.
