---
title: 'Connect a Node.js application to PlanetScale'
subtitle: 'Spin up a PlanetScale MySQL database in seconds and connect to a Node.js application'
date: '2022-08-01'
---

## Introduction

In this tutorial, you'll create a simple Node.js and Express.js application and connect it to a PlanetScale database.

{% callout type="tip" %}
Already have a Node.js application and just want to connect to PlanetScale? Check out the [Node.js quick connect repo](https://github.com/planetscale/connection-examples/tree/main/nodejs).
{% /callout %}

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)

## Set up the database

First, create a new database with the following command:

```bash
pscale database create <DATABASE_NAME>
```

Next, let's add some data to the database. You'll create a new table called `users` and add one record to it.

To do this, use the PlanetScale CLI shell to open a MySQL shell where you can manipulate your database. You may need to [install the MySQL command line client](/docs/concepts/planetscale-environment-setup) if you haven't already.

```bash
pscale shell <DATABASE_NAME> <BRANCH_NAME>
```

{% callout %}
A branch, `main`, was automatically created when you created your database, so you can use that for `BRANCH_NAME`.
{% /callout %}

Create the `users` table:

```sql
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255),
  `last_name` varchar(255)
);
```

Then, add a record to it with:

```sql
INSERT INTO `users` (id, email, first_name, last_name)
VALUES  (1, 'hp@example.com', 'Harry', 'Potter');
```

You can verify it was added with:

```sql
select * from users;
```

```
+----+----------------+------------+-----------+
| id | email          | first_name | last_name |
+----+----------------+------------+-----------+
|  1 | hp@example.com | Harry      | Potter    |
+----+----------------+------------+-----------+
```

Next, you'll set up the Express starter application.

## Set up the starter Node.js app

Clone the starter repository:

```bash
git clone https://github.com/planetscale/express-example.git
```

Enter into the folder and install the dependencies with:

```bash
cd express-example
npm install
```

Now that your application is set up and the database is ready to be used, let's connect them.

## Connect to PlanetScale with Express.js

There are **two ways to connect** to PlanetScale:

- With an auto-generated username and password
- Using the PlanetScale proxy with the CLI

Both options are covered below.

### Option 1: Connect with username and password (Recommended)

These instructions show you how to generate a set of credentials with [the PlanetScale CLI](/docs/concepts/planetscale-environment-setup).

You can also get these exact values to copy/paste from your [PlanetScale dashboard](https://app.planetscale.com). In the dashboard, click on the database > "**Connect**" > "**Connect with**" language dropdown > "**Node.js**". If the password is blurred, click "**New password**". Skip to step 3 once you have these credentials.

1. Authenticate the CLI with the following command:

   ```bash
   pscale auth login
   ```

2. Using the PlanetScale CLI, create a new username and password for the branch of your database:

   ```bash
   pscale password create <DATABASE_NAME> <BRANCH_NAME> <PASSWORD_NAME>
   ```

   {% callout %}
   The `PASSWORD_NAME` value represents the name of the username and password being generated. You can have multiple credentials for a branch, so this gives you a way to categorize them. To manage your passwords in the dashboard, go to your database dashboard page, click "Settings", and then click "Passwords".
   {% /callout %}

   Take note of the values returned to you, as you won't be able to see this password again.

   ```
   Password production-password was successfully created.
   Please save the values below as they will not be shown again

     NAME                  USERNAME       ACCESS HOST URL                     ROLE               PASSWORD
    --------------------- -------------- ----------------------------------- ------------------ -------------------------------------------------------
     production-password   xxxxxxxxxxxxx   xxxxxx.us-east-2.psdb.cloud   Can Read & Write   pscale_pw_xxxxxxx
   ```

3. Next, create your `.env` file by renaming the `.env.example` file to `.env`:

   ```bash
   mv .env.example .env
   ```

4. Use the values from the CLI output in step 1 to construct your connection string that will be used to connect your Node app to your PlanetScale database. Create your connection string in the following format:

   ```
   mysql://<USERNAME>:<PLAIN_TEXT_PASSWORD>@<ACCESS_HOST_URL>/<DATABASE_NAME>?ssl={"rejectUnauthorized":true}
   ```

5. In the `.env` file, fill in the `DATABASE_URL` variable with the value you constructed above. It should look something like this:

   ```bash
   DATABASE_URL=mysql://xxxxxxxxxxxxx:pscale_pw_xxxxxxx@xxxxxx.us-east-2.psdb.cloud/express_database?ssl={"rejectUnauthorized":true}
   ```

6. Finally, run your Express application with:

   ```bash
   node app.js
   ```

Navigate to [http://localhost:3000](http://localhost:3000) and you'll see the data from your `users` table!

### Option 2: Using the PlanetScale proxy with the CLI

Use the following command to create a connection to your database and start the application:

```bash
pscale connect <DATABASE_NAME> <BRANCH_NAME> --execute 'node app.js'
```

{% callout %}
Running `pscale connect` with the execute flag will pass a `DATABASE_URL` to the Node application, enabling it to connect to PlanetScale. Don't forget to look in `app.js` to see how the DATABASE_URL is used.
{% /callout %}

Navigate to [http://localhost:3000](http://localhost:3000) and you'll see the data from your `users` table!

## What's next?

Learn more about how PlanetScale allows you to make [non-blocking schema changes](/docs/concepts/nonblocking-schema-changes) to your database tables without locking or causing downtime for production databases. If you're interested in learning how to secure your application when connecting to PlanetScale,
please read [Connecting to PlanetScale securely](/docs/concepts/secure-connections).
