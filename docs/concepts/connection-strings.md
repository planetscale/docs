---
title: 'Connection strings'
subtitle: 'Create reusable connection strings to connect to your PlanetScale database.'
date: '2023-08-15'
---

## Creating a password

1. To create a password, head to your database dashboard page at `https://app.planetscale.com/<ORGANIZATION>/<DATABASE_NAME>` and click on the "**Connect**" button.

2. On the **Connect page**, select the branch you wanted to create a password for, , pick a [password role](/docs/concepts/password-roles), and provide a recognizable name for the new credentials. Clicking `Create password` will then generate a **unique username and password pair** that can only be used to access the designated branch of your database. Take note of this password, as you won't be able to see it again.

3. Once created, you can browse the connection string in different framework formats by selecting framework in the "Select your language or framework" section. This will also show you all of the files you need to modify to get connected with PlanetScale in your framework or language of choice.

{% callout %}
You can connect to PlanetScale from any platform that supports MySQL. These connection strings are in place to let you hit the ground running. We support generating connection strings for Go, Java, .NET, PHP, Laravel, Symfony, Prisma, Python, Rails, Rust, and more. Please let us know if we're missing your favorite framework in this list or if you have any suggestions.
{% /callout %}

{% callout type="tip" %}
Make sure you copy the credentials for your application and the "Other" format. We do not save the password in plaintext, so there will be no way to retrieve the password after you leave this page.
{% /callout %}

## Managing passwords

Once you've created the password, you can head over to the "**Passwords**" settings page available at `Organization > Database > Settings > Passwords` to manage them.

{% callout type="tip" %}
You can also create passwords for branches other than `main` on this page.
{% /callout %}

![Manage passwords page](/assets/docs/concepts/connection-strings/manage-2.png)

Clicking on the `...` icon on the row for your password allows you rename or delete the password.

## Renaming a password

Since the **username & password** pair is unique, the only metadata you can edit is the `display name` of the password.

## Deleting a password

Deleting a password will invalidate the username & password pair and **disconnect any active clients using this password**.

{% callout %}
Any open database connections authenticated with a deleted password will be disconnected within five minutes.
{% /callout %}

## Native MySQL authentication support

Use the tools you're familiar with to connect to PlanetScale databases.
PlanetScale supports both [MySQL native authentication](https://dev.mysql.com/doc/refman/8.0/en/native-pluggable-authentication.html), which is widely used to provide a secure connection to MySQL servers,
and [MySQL Caching SHA-2 authentication](https://dev.mysql.com/doc/refman/8.0/en/caching-sha2-pluggable-authentication.html), which is the most secure authentication mechanism to connect to MySQL.
Based on your application needs and platform support, you can switch between the authentication modes, with the same password.

For a list of tested MySQL GUI clients, review our article on [how to connect MySQL GUI applications](/docs/tutorials/connect-mysql-gui).

## Strong security model

PlanetScale Passwords are created for use with a single database branch.
This strong security model allows you to generate passwords that are tied to a branch, and cannot access data/schema from another branch.

## IP restrictions

You can restrict database connections to specific IP ranges for a single password by updating its IP restrictions. For example, if you have a database for a web application and you create a password for use in the deployed application, you can restrict usage of that specific password to the IP ranges of the deployed application. If somebody attempts to connect to the database from outside of the deployed application, the connection will be refused. IP restrictions work on a per-password basis, so if you want to use the same restriction across passwords, they must be applied to each password separately.

Some passwords are incompatible with IP restrictions, and you will need to create a new password to use IP restrictions.

Examples of when you may want to use IP restrictions:

- You want to segment database access so that the production database can only be connected to from production environments or development branches.
- You use a bastion in production and want to ensure that all database connections originate or pass through the bastion.
- You want to allow a single client to be able to access your database (e.g., for debugging) and want to provide the least amount of access for them to do so.
- You have compliance requirements that require implementing a more stringent access control list in your database.

### Updating the IP restrictions for a password

1. Go to your database's "**Settings**" tab.
2. Click "**Passwords**."
3. You can update the IP restrictions for a password in two different ways: The first way is by opening the dropdown menu to the right of any password on the Passwords page and clicking "**Manage IP restrictions**." The second way is by clicking on the password and scrolling to the bottom of its page to update IP restrictions.
4. Add the IP ranges that you want to allow to connect using the selected password.

{% callout %}
If your password has no IP restrictions, it is set to **allow all traffic**. Similarly, when you add a new IP range to the restrictions, all IP addresses out of this range cannot connect to your database using that password.
{% /callout %}

## Disconnect clients by deleting passwords

PlanetScale automatically disconnects clients that are using a deleted password.
Head on over to the `Organization > Database > Settings > Passwords` page on your database branch to delete passwords for that branch.
It may take up to five minutes for all active clients to be disconnected.

## No plain text password storage

PlanetScale only stores hashes and metadata about your database passwords.
To add an extra layer of security to your database, we do not store any passwords in plaintext.

{% callout %}
In the event that you lose a password, we cannot recover it for you. We recommend creating a new password with the
same access level.
{% /callout %}

## GitHub Secret Scanning integration

All passwords and service tokens generated for use with PlanetScale databases are part of [GitHub's Secret Scanning](https://docs.github.com/en/code-security/secret-security/about-secret-scanning) program. If any database passwords or service tokens are committed in plaintext to any public GitHub repository, we will be notified and take corrective action to delete the access tokens and cut off their access.
