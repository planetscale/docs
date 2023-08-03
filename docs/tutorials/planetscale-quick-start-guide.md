---
title: 'PlanetScale quickstart guide'
subtitle: 'Get started with PlanetScale in just a few minutes'
className: 'ignore-img-borders'
date: '2023-06-21'
---

## Overview

The following guide will show you how to:

- Create a database with PlanetScale
- Make a schema change
- Insert data
- Promote your database branch to production

If you already have your PlanetScale database set up, you may find the [Connecting your application](/docs/tutorials/connect-any-application) or [Branching](/docs/concepts/branching) guides more helpful.

This guide is split up so that you can either follow it in the [PlanetScale dashboard](#getting-started--planetscale-dashboard) or using the [PlanetScale CLI](#getting-started--planetscale-cli).

{% vimeo src="https://player.vimeo.com/video/830571983" caption="A video demo of everything covered in this guide" /%}

## Getting started &mdash; PlanetScale dashboard

You'll need [a PlanetScale account](https://auth.planetscale.com/sign-up) to complete this guide.

### Create a database

Follow these steps to create a database:

1. Click "**New database**" > "**Create a database**" on your organization's overview page.
2. Name your database using lowercase, alphanumeric characters or underscores. You may also use dashes, but we don't recommend that, as sharded databases require them to be escaped.
3. Select a [region](/docs/concepts/regions). For the lowest latency, select a region near you or your application's hosting location.
4. Select the desired [plan type](/docs/concepts/billing#planetscale-plans) for your database.
5. Enter a valid credit or debit card. If you are creating a database on the **Hobby** plan, you will not be charged.
6. Finally, click the "**Create database**" button to deploy your database.

Your database is created with a [**default production branch**](/docs/concepts/branching), `main`, which you will use to apply a schema change and insert data. While this is just the first branch we create for you, you can always create new development branches (isolated copies of the production schema) off of production to use for development.

### Add a schema to your database

This quickstart demonstrates how to create and use two relational tables: `categories` and `products`.

1. By default, web console access to production branches is disabled to prevent accidental deletion. From your database's overview page, click on the "**Settings**" tab, check the box labelled "**Allow web console access to production branches**", and click "**Save database settings**".

2. Click on the "**Console**" tab in the database navigation. This will open up a [web console](/docs/concepts/web-console) connected to your database branch.

   ![Branches](/assets/docs/tutorials/planetscale-quick-start-guide/the-console-tab.png)

3. By default the `main` branch is preselected. Click **"Connect"**.
4. Create the `categories` and `products` tables by running the following commands in the web console:

   ```sql
   CREATE TABLE categories (
     id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
     name varchar(255) NOT NULL
   );
   ```

   ```sql
   CREATE TABLE products (
     id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
     name varchar(255) NOT NULL,
     image_url varchar(255),
     category_id INT,
     KEY category_id_idx (category_id)
   );
   ```

   {% callout %}
   PlanetScale does not support foreign key _constraints_, but we do support the use of relationships with foreign
   keys, as shown in this example. For more information, check out our
   [Operating without foreign key constraints](/docs/learn/operating-without-foreign-key-constraints)
   documentation.
   {% /callout %}

5. You can confirm that the tables have been added by running:

   ```sql
   SHOW TABLES;
   ```

### Insert data into your database

Now that you have created your tables, let's insert some data. Run the following commands to add a product and category to your tables:

```sql
INSERT INTO categories (name)
VALUES  ('Office supplies');
```

```sql
INSERT INTO products (name, image_url, category_id)
VALUES  ('Ballpoint pen', 'https://example.com/500x500', '1');
```

You can confirm the data has been added with:

```sql
SELECT * FROM products;
```

```sql
SELECT * FROM categories;
```

If you click on the "**Schema**" tab in the database navigation and click the "**Refresh schema**" button, you'll see the new database schema.

### Enable safe migrations on your `main` branch

All of the work you've done so far has been on a default production branch, `main`, that was automatically created when you created the database.

A production branch is a highly available database branch that includes an additional replica. It also has the option to enable [safe migrations](/docs/concepts/safe-migrations), which enables non-blocking schema changes and can protect your database from accidental schema changes.

[Safe migrations](/docs/concepts/safe-migrations) is an optional, but highly recommended, feature that adds an additional layer of protection to your branch by preventing accidental schema modifications and enabling no-downtime schema changes. With safe migrations enabled, any DDL issued directly to the branch will not be accepted. Instead, changes must be made using the PlanetScale flow, where deploy requests are used to safely merge changes in a collaborative environment.

### To enable safe migrations:

1. Click "Overview" in the navigation, and click the "**cog**" in the upper right of the infrastructure card to open a modal.

   ![Production UI card](/assets/docs/tutorials/planetscale-quick-start-guide/production-branch-card-with-sm-disabled-2.png?v2)

2. Toggle "**Enable safe migrations**", then click the "**Enable safe migrations**" button.

The `main` branch now contains the `categories` and `products` tables you created, along with the data you inserted. In addition, it is highly available with an additional replica, and is enabled for zero-downtime migrations with [safe migrations](/docs/concepts/safe-migrations).

### What's next?

Now that you've created a database, applied schema changes, added data, and enable safe migrations, it's time to connect to your application.

You can use our [Connect Any Application tutorial](/docs/tutorials/connect-any-application) for a general step-by-step approach, one of our language-specific guides, or head straight to our [Connection Strings documentation](/docs/concepts/connection-strings) for more information about creating connection strings.

When you want to continue development on your database:

1. [Create a new branch](/docs/concepts/branching) off of your production branch
2. Go through the same process described in this doc to make schema changes
3. [Create a deploy request](/docs/concepts/deploy-requests) to merge the changes into your production branch

{% callout %}
When you branch off of a production branch, your development branch will have the same schema as production, but it
**will not** copy over any data from the production database. We suggest seeding development branches with mock
data.
{% /callout %}

## Getting started &mdash; PlanetScale CLI

Make sure you first have [downloaded and installed the PlanetScale CLI](https://github.com/planetscale/cli#installation).

You will also need a PlanetScale account. You can [sign up for a free PlanetScale account here](https://auth.planetscale.com/sign-up) or run `pscale signup` to create an account straight from the CLI.

### Sign in to your account

To authenticate with the PlanetScale CLI, enter the following:

```bash
pscale auth login
```

You'll be taken to a screen in the browser where you'll be asked to confirm the code displayed in your terminal. If the confirmation codes match, click the "**Confirm code**" button in your browser.

You should receive the message "Successfully logged in" in your terminal. You can now close the confirmation page in the browser and proceed in the terminal.

### Create a database

Run the following command to create a database:

```bash
pscale database create <DATABASE_NAME> --region <REGION_SLUG>
```

- **DATABASE_NAME** &mdash; Your database name can contain lowercase, alphanumeric characters, or underscores. We allow dashes, but don't recommend them, as they may need to be escaped in some instances.
- **REGION_SLUG** &mdash; For the lowest latency, choose the region closest to you or your application's hosting location. You can find our regions and their slugs on the [Regions page](/docs/concepts/regions#available-regions).

{% callout %}
If you do not specify a region, your database will automatically be deployed to **US East - Northern Virginia**.
{% /callout %}

Your database is created with an [**initial branch**](/docs/concepts/branching), `main`, which you will use to apply a schema change and insert data. While this is just the first branch we create for you, you can always create new branches (isolated copies of the production schema) off of production to use for development.

### Add a schema to your database

To add a schema to your database, you will need to connect to MySQL, so [make sure you `mysql-client` installed](/docs/concepts/planetscale-environment-setup#setup-overview).

1. Run the following command:

   ```bash
   pscale shell <DATABASE_NAME> main
   ```

   You are now connected to your `main` branch and can run MySQL queries against it.

2. Create the `categories` and `products` tables by running the following:

   ```sql
   CREATE TABLE categories (
     id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
     name varchar(255) NOT NULL
   );
   ```

   ```sql
   CREATE TABLE products (
     id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
     name varchar(255) NOT NULL,
     image_url varchar(255),
     category_id INT,
     KEY category_id_idx (category_id)
   );
   ```

   {% callout %}
   PlanetScale does not support foreign key _constraints_, but we do support the use of relationships with foreign
   keys, as shown in this example. For more information, check out our
   [Operating without foreign key constraints](/docs/learn/operating-without-foreign-key-constraints)
   documentation.
   {% /callout %}

3. You can confirm that the table has been added by running:

   ```sql
   SHOW TABLES;
   ```

4. To see the table schemas, run:

   ```sql
   DESCRIBE categories;
   ```

   ```sql
   DESCRIBE products;
   ```

### Insert data into your database

Now that you have your schema set up, let's insert some data.

1. Run the following commands to add one entry to each table:

   ```sql
   INSERT INTO `categories` (name)
   VALUES  ('Office supplies');
   ```

   ```sql
   INSERT INTO `products` (name, image_url, category_id)
   VALUES  ('Ballpoint pen', 'https://example.com/500x500', '1');
   ```

2. You can confirm the data has been added with:

   ```sql
   SELECT * FROM products;
   ```

   ```sql
   SELECT * FROM categories;
   ```

3. Exit the shell by typing `exit`.

### Enable safe migrations

All of the work you've done so far has been on a default production branch, `main`, that was automatically created when you created the database.

A production branch is a highly available database branch that includes an additional replica. It also has the option to enable [safe migrations](/docs/concepts/safe-migrations), which enables non-blocking schema changes and can protect your database from accidental schema changes.

[Safe migrations](/docs/concepts/safe-migrations) is an optional, but highly recommended, feature that adds an additional layer of protection to your branch by preventing accidental schema modifications and enabling no-downtime schema changes. With safe migrations enabled, any DDL issued directly to the branch will not be accepted. Instead, changes must be made using the PlanetScale flow, where deploy requests are used to safely merge changes in a collaborative environment.

To enable safe migrations on your branch, run:

```bash
pscale branch safe-migrations enable <DATABASE_NAME> main
```

The `main` branch now contains the `categories` and `products` tables you created, along with the data you inserted. In addition, it is highly available with an additional replica, and is enabled for zero-downtime migrations with [safe migrations](/docs/concepts/safe-migrations).

### What's next?

Now that you've created a database, applied schema changes, added data, and enabled safe migrations, it's time to connect to your application.

You can use our [Connect Any Application tutorial](/docs/tutorials/connect-any-application) for a general step-by-step approach, one of our language-specific guides, or head straight to our [Connection Strings documentation](/docs/concepts/connection-strings) for more information about creating connection strings.

When you want to continue development on your database:

1. [Create a new branch](/docs/concepts/branching) off of your production branch
2. Go through the same process described in this doc to make schema changes
3. [Create a deploy request](/docs/concepts/deploy-requests) to merge the changes into your production branch

{% callout %}
When you branch off of a production branch, your development branch will have the same schema as production, but it
**will not** copy over any data from the production database. We suggest seeding development branches with mock
data.
{% /callout %}
