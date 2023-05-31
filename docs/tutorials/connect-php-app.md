---
title: 'Connect a PHP application to PlanetScale'
subtitle: 'Spin up a PlanetScale MySQL serverless database in seconds and connect to a PHP application'
className: 'ignore-img-borders'
date: '2023-04-05'
---

## Introduction

In this tutorial, you'll learn how to connect a PHP application to a PlanetScale MySQL database with a sample PHP starter app using [MySQLi](https://www.php.net/manual/en/book.mysqli.php).

{% callout type="tip" %}
Already have a PHP application and just want to connect to PlanetScale? Check out the [PHP quick connect repo](https://github.com/planetscale/connection-examples/tree/main/php).
{% /callout %}

## Prerequisites

- [PHP](https://www.php.net/manual/en/install.php) &mdash; This tutorial uses `v8.1`
- [Composer](https://getcomposer.org/)
- A [free PlanetScale account](https://auth.planetscale.com/sign-up)
- [PlanetScale CLI](https://github.com/planetscale/cli) (Optional) &mdash; You can also follow this tutorial using just the PlanetScale admin dashboard, but the CLI will make setup quicker.

## Set up the PHP app

This guide uses [a simple PHP app](https://github.com/planetscale/php-example) that displays a list of products stored in a PlanetScale database. If you have an existing application, you can also use that.

![PHP sample application homepage](/assets/docs/tutorials/connect-php-app/example.png)

1. Clone the starter PHP application:

   ```bash
   git clone https://github.com/planetscale/php-example.git
   ```

2. Enter into the folder and install the dependencies:

   ```bash
   cd php-example
   composer install
   ```

3. Rename the `.env.example` file to `.env`:

   ```bash
   mv .env.example .env
   ```

4. Start the application:

   ```bash
   php -S localhost:8000
   ```

You can view the application at [http://localhost:8000](http://localhost:8000).

## Set up the database

Next, you need to set up your PlanetScale database and connect it to the PHP application.

You can create a database either in the [PlanetScale dashboard](https://app.planetscale.com) or from the PlanetScale CLI.

This guide will use the CLI, but you can follow the database setup instructions in the [PlanetScale quickstart guide](/docs/tutorials/planetscale-quick-start-guide#create-a-database) if you prefer the dashboard. Just create the database and then come back here to continue.

1. Install the [PlanetScale CLI](/docs/concepts/planetscale-environment-setup).
2. Authenticate in the CLI with the following command:

   ```bash
   pscale auth login
   ```

3. Create a new database with the following command:

   ```bash
   pscale database create <DATABASE_NAME> --region <REGION_SLUG>
   ```

You can use any name with lowercase, alphanumeric characters, or underscores. You can also use dashes, but we don't recommend them, as they may need to be escaped in some instances.

For `REGION_SLUG`, choose a region closest to you from the [available regions](/docs/concepts/regions#available-regions) or leave it blank.

The database is created with a default branch, `main`, that's meant to serve as your initial development branch before promoting it to production.

That's it! Your database is ready to use. Next, let's connect it to the PHP application and then add some data.

## Connect to the PHP app

There are **two ways to connect** to PlanetScale:

- With an auto-generated username and password
- Using the PlanetScale proxy with the CLI

Both options are covered below.

The environment variables you fill in next will be used in the [`db.php` file of the sample application](https://github.com/planetscale/php-example/blob/main/db.php):

```php
<?php
$hostname = $_ENV['HOST'];
$dbName = $_ENV['DATABASE'];
$username = $_ENV['USERNAME'];
$password = $_ENV['PASSWORD'];
$ssl = $_ENV['MYSQL_ATTR_SSL_CA'];

$mysqli = mysqli_init();
$mysqli->ssl_set(NULL, NULL, $ssl, NULL, NULL);
$mysqli->real_connect($hostname, $username, $password, $dbName, $port);

if ($mysqli->connect_error) {
    echo 'not connected to the database';
} else {
    echo "Connected successfully";
}
```

### Option 1: Connect with username and password (Recommended)

If you're not using the CLI, you can get the exact values to copy/paste from your PlanetScale dashboard. In the dashboard, select the branch you want to connect to from the infrastructure card (we're using `main`), click "**Get connection strings**", and select "**PHP**" from the language dropdown. Copy these credentials, and then skip to step 2 to fill them in.

1. Create a username and password with the PlanetScale CLI by running:

   ```bash
   pscale password create <DATABASE_NAME> <BRANCH_NAME> <PASSWORD_NAME>
   ```

   A default branch, `main`, was created when you created the database, so you can use that for `BRANCH_NAME`.

   {% callout %}
   The `PASSWORD_NAME` value represents the name of the username and password being generated. You can have multiple
   credentials for a branch, so this gives you a way to categorize them. To manage your passwords in the dashboard, go to
   your database overview page, click "Settings", and then click "Passwords".
   {% /callout %}

   Take note of the values returned to you, as you won't be able to see this password again.

2. Open the `.env` file in your PHP app:

   ```bash
   HOST=<ACCESS_HOST_URL>
   DATABASE=<DATABASE_NAME>
   USERNAME=<USERNAME>
   PASSWORD=<PASSWORD>
   MYSQL_ATTR_SSL_CA=
   ```

   Fill in your database name. For `USERNAME`, `PASSWORD`, and `HOST`, use the corresponding values from the CLI output.

3. For `MYSQL_ATTR_SSL_CA`, use our [CA root configuration doc](/docs/concepts/secure-connections#ca-root-configuration) to find the correct value for your system. For example, if you're on MacOS, it would be:

   ```bash
   MYSQL_ATTR_SSL_CA=/etc/ssl/cert.pem
   ```

4. Refresh your PHP homepage, and you should see the message that you're connected to your database!

### Option 2: Connect with the PlanetScale proxy

We recommend connecting with a username and password, but you can also open a quick connection with the PlanetScale proxy. You'll need the [PlanetScale CLI](https://github.com/planetscale/cli) for this option.

1. Open a connection by running the following:

   ```bash
   pscale connect <DATABASE_NAME> <BRANCH_NAME>
   ```

   If you're following this guide exactly and haven't created any branches, you can use the default branch, `main`.

2. A secure connection to your database will be established, and you'll see a local address you can use to connect to your application.

3. Open the `.env` file in your PHP app and update it as follows:

   ```bash
   HOST=127.0.0.1
   PORT=3306 # Get this from the output of the previous step
   DATABASE=<DATABASE_NAME>
   ```

   The connection uses port `3306` by default, but we'll assign a random port if `3306` is in use. Make sure you paste in whatever port is returned in the terminal. Fill in the database name as well.

4. Open `db.php` and replace it with the following:

   ```php
   <?php
   $hostname = $_ENV['HOST'];
   $dbName = $_ENV['DATABASE'];
   $port = $_ENV['PORT'];
   // $ssl = $_ENV['MYSQL_ATTR_SSL_CA'];

   $mysqli = mysqli_init();
   // $mysqli->ssl_set(NULL, NULL, $ssl, NULL, NULL);
   $mysqli->real_connect($hostname, '', '', $dbName, $port);

   if ($mysqli->connect_error) {
       echo 'not connected to the database';
   } else {
       echo "Connected successfully";
   }
   ```

   This removes all references to `username`, `password`, and `ssl`.

   {% callout %}
   It's important to make sure that you add the SSL check back if you switch back to username and password credentials.
   We're intentionally commenting it out instead of deleting it in case you switch back.
   {% /callout %}

5. Refresh your PHP homepage, and you should see the message that you're connected to your database!

## Add the schema and data

Now that you're connected to the database let's create the `products` and `categories` tables and add some data. There are a few ways to do this:

- PlanetScale CLI shell
- PlanetScale dashboard console
- Your favorite MySQL client (for a list of tested MySQL clients, review our article on [how to connect MySQL GUI applications](/docs/tutorials/connect-mysql-gui))

The first two options are covered below.

### Option 1: Add data with PlanetScale dashboard console

If you don't care to install the MySQL client or the PlanetScale CLI, another quick option is using the MySQL console built into the PlanetScale dashboard.

1. Go to your [PlanetScale dashboard](https://app.planetscale.com) and select your PHP database.
2. Click on the "**Branches** and select the `main` branch (or whatever development branch you used).
3. Click on "**Console**"
4. Create the `categories` table:

   ```sql
   CREATE TABLE categories (
   id INT AUTO_INCREMENT NOT NULL,
   name VARCHAR(255) NOT NULL,
   description VARCHAR(255) NOT NULL,
   PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB;
   ```

5. Create the `products` table:

   ```sql
   CREATE TABLE products (
   id INT AUTO_INCREMENT NOT NULL,
   name VARCHAR(255) NOT NULL,
   description VARCHAR(255) NOT NULL,
   image VARCHAR(255) NOT NULL,
   category_id INT NOT NULL,
   PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB;
   ```

   PlanetScale does not support foreign key constraints, but we do support the concept of relationships with foreign keys, as shown in this example. For more information, check out our [Operating without foreign key constraints documentation](/docs/learn/operating-without-foreign-key-constraints).

6. Add data to the `products` table with:

   ```sql
   INSERT INTO `products` (name, description, image, category_id) VALUES
   ('Shoes', 'Description for Shoes', 'https://via.placeholder.com/150.png', '1'),
   ('Hat', 'Description for Hats', 'https://via.placeholder.com/150.png', '1'),
   ('Bicycle', 'Description for Bicycle', 'https://via.placeholder.com/150.png', '4');
   ```

7. Add data to the `categories` table with:

   ```sql
   INSERT INTO `categories` (name, description) VALUES
   ('Clothing', 'Description for Clothing'),
   ('Electronics', 'Description for Electronics'),
   ('Appliances', 'Description for Appliances'),
   ('Health', 'Description for Health');
   ```

8. You can confirm that it was added by running:

   ```sql
   SELECT * FROM products;
   SELECT * FROM categories;
   ```

You can now refresh the [PHP homepage](http://localhost:8000) to see the new record.

### Option 2: Add data with PlanetScale CLI

You can use the PlanetScale CLI to open a MySQL shell to interact with your database.

You may need to [install the MySQL command line client](/docs/concepts/planetscale-environment-setup) if you haven't already.

1. Run the following command in your terminal:

   ```bash
   pscale shell <DATABASE_NAME> <BRANCH_NAME>
   ```

   This will open up a MySQL shell connected to the specified database and branch.

   {% callout %}
   A branch, `main`, was automatically created when you created your database, so you can use that for `BRANCH_NAME`.
   {% /callout %}

2. Create the `categories` table:

   ```sql
   CREATE TABLE categories (
     id INT AUTO_INCREMENT NOT NULL,
     name VARCHAR(255) NOT NULL,
     description VARCHAR(255) NOT NULL
   );
   ```

3. Create the `products` table:

   ```sql
   CREATE TABLE products (
     id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     description VARCHAR(255) NOT NULL,
     image VARCHAR(255) NOT NULL,
     category_id INT NOT NULL,
     KEY category_id_idx (category_id)
   );
   ```

   PlanetScale does not support foreign key constraints, but we do support the use of relationships with foreign keys, as shown in this example. For more information, check out our [Operating without foreign key constraints documentation](/docs/learn/operating-without-foreign-key-constraints).

4. Add some records to the `products` table:

   ```sql
   INSERT INTO `products` (name, description, image, category_id) VALUES
   ('Shoes', 'Description for Shoes', 'https://via.placeholder.com/150.png', '1'),
   ('Hat', 'Description for Hats', 'https://via.placeholder.com/150.png', '1'),
   ('Bicycle', 'Description for Bicycle', 'https://via.placeholder.com/150.png', '4');
   ```

   The value `id` will be filled with a default value.

5. Add some data to the `categories` table:

   ```sql
   INSERT INTO `categories` (name, description) VALUES
   ('Clothing', 'Description for Clothing'),
   ('Electronics', 'Description for Electronics'),
   ('Appliances', 'Description for Appliances'),
   ('Health', 'Description for Health');
   ```

6. You can verify everything was added in the PlanetScale CLI MySQL shell with:

   ```sql
   SELECT * FROM products;
   SELECT * FROM categories;
   ```

7. Type `exit` to exit the shell.

You can now refresh the [PHP homepage](http://localhost:8000) to see the new records.

## What's next?

Once you're done with development, you can [promote your `main` branch to production](/docs/concepts/branching#promote-a-branch-to-production) and enable [safe migrations](/docs/concepts/safe-migrations) to get a highly available branch protected by direct schema changes.

When you're reading to make more schema changes, you'll [create a new branch](/docs/concepts/branching) off of your production branch. Branching your database creates an isolated copy of your production schema so that you can easily test schema changes in development. Once you're happy with the changes, you'll [open a deploy request](/docs/concepts/deploy-requests). This will generate a diff showing the changes that will be deployed, making it easy for your team to review.

Learn more about how PlanetScale allows you to make [non-blocking schema changes](/docs/concepts/nonblocking-schema-changes) to your database tables without locking or causing downtime for production databases.
