---
title: 'Connection strings'
subtitle: 'Create reusable connection strings to connect to your PlanetScale database.'
date: '2022-12-06'
---

## Creating a password

1. To create a password, head to your database overview page at `https://app.planetscale.com/<ORGANIZATION>/<DATABASE_NAME>` and click on the "**Get connection strings**" button.

   ![Database overview page](/assets/docs/concepts/connection-strings/connect-2.png?v2)

2. On this dialog, click the `New password` button and you'll have the opportunity to select the branch to create a password for, pick a [password role](/docs/concepts/password-roles), and provide a recognizable name for the new credentials. Clicking `Create password` will then generate a **unique username and password pair** that can only be used to access the designated branch of your database. Take note of this password, as you won't be able to see it again.

3. Once created, you can browse the connection string in different framework formats by selecting the framework in the "Connect with" dropdown. This will also show you all of the files you need to modify to get connected with PlanetScale in your framework or language of choice.

{% callout %}
You can connect to PlanetScale from any platform that supports MySQL. These connection strings are in place to let you
hit the ground running. Please let us know if we're missing your favorite framework in this list or if you have any
suggestions. We support pre-generating connection strings for Go, Java, .Net, PHP, Laravel, Symfony, Prisma, Python,
Rails, and Rust.
{% /callout %}

![Browse connection string in formats](/assets/docs/concepts/connection-strings/formats-2.png?v2)

{% callout type="tip" %}
Make sure you copy the connection string for your application and the "General" format. We don't save the password in
clear text, so there's no way to retrieve the password after you leave this page.
{% /callout %}

## Managing passwords

Once you've created the password, you can head over to the "**Passwords**" settings page available at `Organization > Database > Settings > Passwords` to manage them.

{% callout type="tip" %}
You can also create passwords for branches other than `main` on this page.
{% /callout %}

![Manage passwords page](/assets/docs/concepts/connection-strings/manage-2.png?v2)

Clicking on the `...` icon on the row for your password allows you to pull up the connection string (except the password), rename it, or delete it.

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

## Disconnect clients by deleting passwords

PlanetScale automatically disconnects clients that are using a deleted password.
Head on over to the `Organization > Database > Settings > Passwords` page on your database branch to delete passwords for that branch.
It may take up to five minutes for all active clients to be disconnected.

## No plain text password storage

PlanetScale only stores hashes and metadata about your database passwords.
To add an extra layer of security to your database, we do not store any passwords in plain text.

{% callout %}
In the event that you lose a password, we cannot recover it for you. We recommend creating a new password with the
same access level.
{% /callout %}

## GitHub Secret Scanning integration

All passwords and service tokens generated for use with PlanetScale databases are part of [GitHub's Secret Scanning](https://docs.github.com/en/code-security/secret-security/about-secret-scanning) program. If any database passwords or service tokens are committed in plain text to any public GitHub repository, we will be notified and take corrective action to delete the access tokens and cut off their access.
