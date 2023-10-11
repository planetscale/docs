---
title: 'Connect a Rails application to PlanetScale'
subtitle: 'Spin up a PlanetScale MySQL serverless database in seconds and connect to a Rails application'
date: '2023-06-21'
---

## Introduction

In this tutorial, you’re going to create a simple Rails application named _blog_ and connect it to a PlanetScale database. You’ll perform the initial migration from your local Rails application, and set up the database for future development.

{% callout type="tip" %}
Already have a Rails application and just want to connect to PlanetScale? Check out the [Rails quick connect repo](https://github.com/planetscale/connection-examples/tree/main/ruby).
{% /callout %}

## Prerequisites

- Install [Ruby and the Rails gem](https://guides.rubyonrails.org/getting_started.html#creating-a-new-rails-project-installing-rails).
- Install the [PlanetScale CLI](https://github.com/planetscale/cli).
- Authenticate the CLI with the following command:

```bash
pscale auth login
```

## Create a Rails project

To connect a Rails application to a PlanetScale database, you'll first create a sample Rails project named _blog_ and install the libraries needed to connect to your PlanetScale database.

Open the command line and follow these steps:

1. Create a Rails app named _blog_ by running the following command:

   ```bash
   rails new blog
   ```

2. Change into the directory you just created, the `blog` Rails app:

   ```bash
   cd blog
   ```

3. Next, add the `mysql2` gem to your _Gemfile_:

   ```ruby
   gem "mysql2"
   ```

4. Then run `bundle install`

   At this point, you have accomplished two things: you've created a Rails project called _blog_ and installed the libraries that you'll need to connect to your PlanetScale database. Now, it’s time to create a PlanetScale database.

## Create a PlanetScale database and password

Now you'll need to create credentials for your Rails application to use.

### Using the CLI to create a connection string

1. Using the `pscale` CLI, create a new database also named _blog_:

   ```bash
   pscale database create blog
   ```

2. Using the `pscale` CLI, create a new database password for the `main` branch of your database named _blog_:

   ```bash
   pscale password create blog main <PASSWORD_NAME>
   ```

   {% callout %}
   The `PASSWORD_NAME` value represents the name of the username and password being generated. You can have multiple credentials for a branch, so this gives you a way to categorize them. To manage your passwords in the dashboard, go to your database overview page, click "Settings", and then click "Passwords".
   {% /callout %}

3. Take note of the values returned to you, as they will not be shown again.

   ```
     NAME                  BRANCH   USERNAME       ACCESS HOST URL                     ROLE     ROLE DESCRIPTION   PASSWORD
    --------------------- -------- -------------- ----------------------------------- -------- ------------------ -------------------------------------------------------
     development-password  main     xxxxxxxx   xxxxxxxxxx.us-east-3.psdb.cloud   writer   Can Read & Write   pscale_pw_xxxxxxxxxxxxxxxxxxxxx
   ```

{% callout %}
You can also create passwords in the PlanetScale dashboard, as documented [in our Creating a password documentation](/docs/concepts/connection-strings#creating-a-password).
{% /callout %}

## Configure Rails and PlanetScale

Let's set up the Rails application to talk to the new database.

Open `config/database.yml` and configure the `development` database settings with your new credentials from the output in the previous step:

```yaml
development:
  <<: *default
  adapter: mysql2
  database: blog
  username: <USERNAME>
  host: <ACCESS HOST URL>
  password: <PASSWORD>
  ssl_mode: :verify_identity
  sslca: "/etc/ssl/cert.pem"
```

The correct `sslca` path depends on your operating system and distribution. See [CA root configuration](/docs/concepts/secure-connections#ca-root-configuration) for more information.

{% callout %}
You're configuring the **development** Rails environment here for the sake of expedience. In actual use, the **main** database branch would typically serve the **production** environment.
{% /callout %}

Because this is a Rails app, you can also enable [Automatic Rails migrations](/docs/tutorials/automatic-rails-migrations) from the database's settings page. Select your database, click on the `main` branch, click "**Settings**", check the "**Automatically copy migration data**" box, and select "**Rails**" from the dropdown.

## Migrate your database

Here comes the fun stuff! Now that your application is configured to talk to PlanetScale, you can create your first migration.

1. Create a Rails migration and call it `CreateUsers`:

   ```bash
   rails generate migration CreateUsers
   ```

   This rails command begins the migration for your table that is currently empty and generates a Ruby file that’ll be named something like this:
   `db/migrate/20211014210422_create_users.rb`

2. Fill in the body of this skeleton file with a few more relevant details, such as a user's **name** and **email**.

   ```ruby
   class CreateUsers < ActiveRecord::Migration[6.1]
     def change
       create_table :users do |t|
         t.string :name
         t.string :email
         t.timestamps
       end
     end
   end
   ```

3. Run your migration:

   ```bash
   bin/rails db:migrate
   ```

4. Now, give it a whirl to make sure you can query the new table with the `pscale` CLI:

   ```bash
   pscale shell blog main
   ```

   ```sql
   blog/main> show tables;
   +----------------------+
   | Tables_in_blog       |
   +----------------------+
   | ar_internal_metadata |
   | schema_migrations    |
   | users                |
   +----------------------+
   blog/main> describe users;
   +------------+--------------+------+-----+---------+----------------+
   | Field      | Type         | Null | Key | Default | Extra          |
   +------------+--------------+------+-----+---------+----------------+
   | id         | bigint       | NO   | PRI | NULL    | auto_increment |
   | name       | varchar(255) | YES  |     | NULL    |                |
   | email      | varchar(255) | YES  |     | NULL    |                |
   | created_at | datetime(6)  | NO   |     | NULL    |                |
   | updated_at | datetime(6)  | NO   |     | NULL    |                |
   +------------+--------------+------+-----+---------+----------------+
   ```

## Enable safe migrations

[Safe migrations](/docs/concepts/safe-migrations) is an optional but highly recommended feature for production branches on PlanetScale. With safe migrations enabled, direct schema changes (`CREATE`, `ALTER`, and `DELETE`) are not allowed on production branches to prevent accidental data loss and must be applied via [deploy requests](/docs/concepts/planetscale-workflow).

```bash
pscale branch safe-migrations enable blog main
```

Congratulations! You're ready to develop your Rails application against PlanetScale.

## Summary

In this tutorial, you created a simple Rails application named _blog_ and connected it to a PlanetScale database.

## Further reading

If you're interested in learning how to secure your application's connection to PlanetScale, please read [Connecting to PlanetScale securely](/docs/concepts/secure-connections).

## What's next?

Now that you've successfully connected your Rails app to PlanetScale, it's time to make more schema changes to your tables! Learn more about how PlanetScale allows you to make [non-blocking schema changes](/docs/concepts/nonblocking-schema-changes) to your database, or how to keep your **schema_migrations** table up-to-date between development and production branches with [automatic schema migrations](/docs/tutorials/automatic-rails-migrations).
