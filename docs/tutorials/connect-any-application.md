---
title: 'Connect any application to PlanetScale'
subtitle: 'Connect your PlanetScale database to any application using connection strings or the PlanetScale proxy.'
date: '2023-06-21'
---

## Introduction

In this tutorial, you'll learn how to connect any application to your PlanetScale database.

If you're just getting started and still need to set up a database, we recommend starting with the [PlanetScale quick start guide](/docs/tutorials/planetscale-quick-start-guide) first. We also have language/framework-specific guides under "**Integration guides**" if you prefer a more detailed walk-through.

PlanetScale uses [database branches](/docs/concepts/branching) to create a development-friendly workflow. Your database is initially created with a default branch, `main`, which is meant to serve as a production database branch. Production branches are highly available databases intended for production traffic. They are automatically provided with an additional replica to resist outages, enabling zero-downtime failovers.

You can connect to a _production_ or _development_ database branch. We recommend creating and connecting to a _development_ branch while in _development_, as it allows you to make schema changes without affecting production. Your production application, however, should be connected to your production database branch. Check out our [Branching guide](/docs/concepts/branching) for more information about the branching workflow.

{% callout %}
By default, production branches have safe migrations turned off. This means that any schema changes you make will be applied immediately. Once you are ready to go to production, we recommend turning on safe migrations if you want to make non-blocking schema changes. Check out our [Safe migrations documentation](/docs/concepts/safe-migrations) for more information.
{% /callout %}

There are two ways to connect your app to PlanetScale. Both are covered below.

## Option 1: Connect with username and password (Recommended)

This section will show you how to create a username and password for your branch and use those credentials to connect to your database. This is the recommended way to connect.

There are two ways to generate a new username and password for your branch:

- In the PlanetScale dashboard
- With the PlanetScale CLI

### Generate credentials in the PlanetScale dashboard

1. On the database overview page, select the branch you want to connect to from the **Branch** dropdown.
2. Click "**Connect**".
3. Select the applicable language from the "**Connect with**" dropdown or choose "General".

   ![Credentials to connect to PlanetScale](/assets/docs/tutorials/connect-any-application/credentials-2.png)

4. If the password isn't visible, click "New password".
5. Copy the credentials.
6. Paste them in your application's MySQL configuration file (often just a `.env` file). The layout and name of this file will vary depending on the application language, but it may look something like this:

   ```bash
   DATABASE=<DATABASE_NAME>
   USERNAME=<USERNAME>
   HOST=<HOST_NAME>
   PASSWORD=<PASSWORD>
   SSL= // more information about this in next step
   ```

   Check out our language integration guides in the side navigation for more explicit instructions.

7. To ensure a secure connection, you must validate the server-side certificate from PlanetScale. This configuration depends on your application, but often it just means adding a line to your `.env` file similar to this:

   ```bash
   MYSQL_ATTR_SSL_CA=/etc/ssl/cert.pem
   ```

   The path to the certificate depends on your system. The above example shows the path for macOS, but you can find others in our [Secure connections documentation](/docs/concepts/secure-connections#ca-root-configuration).

   Again, the variable name here, `MYSQL_ATTR_SSL_CA`, is just an example. The actual name and location for it will depend on the application.

   If you're **unsure what to put here**, we recommend selecting your application's language from the dropdown in the PlanetScale dashboard (see step 3 above) and copy the credentials from there. This includes the necessary SSL configuration variables and shows what files they belong in. Additionally, we show you the correct certificate path by default based on your system.

### Generate credentials in the PlanetScale CLI

If you prefer working from the CLI, you can quickly spin up new credentials there. Make sure you have the [CLI set up](/docs/concepts/planetscale-environment-setup) first.

1. Run the following command in the CLI to create a new username and password for your branch.

   ```bash
   pscale password create <DATABASE_NAME> <BRANCH_NAME> <PASSWORD_NAME>
   ```

   {% callout %}
   The `PASSWORD_NAME` value represents the name of the username and password being generated. You can have multiple credentials for a branch, so this gives you a way to categorize them. To manage your passwords in the dashboard, go to your database overview page, click "Settings", and then click "Passwords".
   {% /callout %}

2. Take note of the values returned. You won't be able to see this password again.

   ```
   Password production-password was successfully created.
   Please save the values below, as they will not be shown again.

     NAME                  USERNAME       ACCESS HOST URL                     ROLE               PASSWORD
    --------------------- ------------- --------------------------------- ------------------ --------------------------------
     production-password   xxxxxxxxxx   xxxxxxxxxx.us-east-2.psdb.cloud   Can Read & Write   pscale_pw_xxxxxx_xxxxxxxxxxxxx
   ```

3. Paste the values from the console output into your application's MySQL configuration file. The layout and name of this file will vary depending on the application language, but it may look something like this:

   ```bash
   DATABASE=<DATABASE_NAME>
   USERNAME=<USERNAME>
   HOST=<ACCESS HOST URL>
   PASSWORD=<PASSWORD>
   SSL= // This is covered in the next step
   ```

4. To ensure a secure connection, you must validate the server-side certificate from PlanetScale. This configuration depends on your application, but often it just means adding a line to your `.env` file similar to this:

   ```bash
   MYSQL_ATTR_SSL_CA=/etc/ssl/cert.pem
   ```

   The path to the certificate depends on your system. The above example shows the path for macOS, but you can find others in our [Secure connections documentation](/docs/concepts/secure-connections#ca-root-configuration).

   Again, the variable name here, `MYSQL_ATTR_SSL_CA`, is just an example. The actual name and location for it will depend on the application.

   If you're **unsure what to put here**, we recommend selecting your application's language from the dropdown in the PlanetScale dashboard (see step 3 from the previous section) and copying the credentials from there. This includes the necessary SSL configuration variables and shows what files they belong in. Additionally, we show you the correct certificate path by default based on your system.

## Option 2: Connect using the PlanetScale proxy

Another way to connect your application to your PlanetScale database _during development_ is using the PlanetScale proxy. You won't have to fiddle with configuring any credential details, as that's handled by PlanetScale. It's as simple as a single CLI command.

You'll use the CLI to establish a secure connection to PlanetScale. It will listen on a local port that your application can connect to. The main benefit of this method is you won't have to generate and remember multiple passwords every time you're creating or switching to a new branch.

1. Make sure you have [the CLI set up](/docs/concepts/planetscale-environment-setup), and then run the following command:

   ```bash
   pscale connect <DATABASE_NAME> <BRANCH_NAME>
   ```

   This establishes a secure connection and opens a port on your local machine that you can use to connect to any MySQL client.

2. Take note of the address it returns to you. By default, it is `127.0.0.1:3306`. The CLI will use a different port if `3306` is unavailable.

3. In your application's MySQL configuration file, use the following to connect:

   ```bash
   DATABASE=<DATABASE_NAME>
   HOST=127.0.0.1
   PORT=3306 // use the value that was returned in the console
   ```

Your application should now be connected to the specified PlanetScale database branch!

## What's next?

Once your application is connected to a development database branch, you can make schema changes in an isolated development environment without worrying about affecting production. Additionally, we recommend that [safe migrations](/docs/concepts/safe-migrations) be enabled on your production database branch, which allows you to make [non-blocking schema changes](/docs/concepts/nonblocking-schema-changes) without locking or causing downtime.

### PlanetScale workflow

Here's the general workflow that you'll go through to get schema changes from development to production:

1. Follow this guide to connect to a development branch.
2. Modify your schema as needed.
3. Test them locally or in your staging environment.
4. Once satisfied and ready to deploy your changes to production, [create a deploy request](/docs/concepts/deploy-requests).
5. You or your team can review and approve the schema changes.
6. Deploy your deploy request to production.
7. Bonus: If you realize you made a mistake, you can click "Revert changes" to [undo a schema change](/docs/concepts/deploy-requests#revert-a-schema-change).

Note: you must already have [a production branch](/docs/concepts/branching#promote-a-branch-to-production) in place to create a deploy request.
