---
title: 'User and Password Management'
category: 'managing-users-and-passwords-for-your-database'
---

# User and Password Management

This document describes how to manage users and passwords for your PlanetScaleDB clusters

## Overview

Access control to your database is configured at the cluster level on the security tab. Roles are created to give read, write, or admin access to groups of users. Users can then be added as members of a role.

## Managing Roles

Role define sets of access to the database. Access is granted to individual databases or to all databases in the cluster. Available access levels are Read, Write, or Admin. To view existing roles or define new ones, follow these steps:

1. Go to your [PlanetScale console](https://console.planetscale.com).
2. Click on your cluster.
3. Click on the security tab for your cluster.
4. Click on the Roles section to view currently configured roles.
5. New roles are created by selecting `Create new role`.
6. A Role can be edited by selecting the role and clicking the `Edit` button.

### Step 1. Go to the [PlanetScale console](https://console.planetscale.com).

This opens the **Clusters Overview**.

### Step 2. Click on your cluster name.

This opens the **Overview** for your cluster.

### Step 3. Click on your database name.

This opens the **Overview** for your database.

### Step 4. Click on **Security**.

![Security Tab](/img/docs/security-tab.png)

### Step 5. Click on **Roles**.

![Roles Tab](/img/docs/roles-tab.png)

### Step 6. New roles are created by selecting `Create new role`.

![Create new role](/img/docs/create-new-role.png)

### Step 7. Edit roles by selecting the `Edit` button.

![Edit exiting role](/img/docs/edit-existing-role.png)

## Managing Users

Users are created and assigned to roles to govern access to the database. Users can be added to any number of Roles. To view existing users or create new ones, follow these steps

1. Go to your [PlanetScale console](https://console.planetscale.com).
2. Click on your cluster.
3. Click on the security tab for your cluster.
4. Click on the Users section.
5. New Users are created by selecting `Create new user`, when creating a new user a password must be set for this user
6. Existing Users can be edited by selecting the User and clicking the `Edit` button
7. Roles can be assigned to the User during at creation time or while editing the user.

### Step 1. Go to the [PlanetScale console](https://console.planetscale.com).

This opens the **Clusters Overview**.

### Step 2. Click on your cluster name.

This opens the **Overview** for your cluster.

### Step 3. Click on your database name.

This opens the **Overview** for your database.

### Step 4. Click on **Security**.

![Security Tab](/img/docs/security-tab.png)

### Step 5. Click on **Users**.

![Users Tab](/img/docs/users-tab.png)

### Step 6. New Users are created by selecting `Create new user`.

![Create new user](/img/docs/create-new-user.png)

### Step 7. Edit Users by selecting the `Edit` button.

![Edit exiting user](/img/docs/edit-existing-user.png)

## Resetting a User's password

There is no way to recover an unknown password. If a password is lost or forgotten it must be reset. To reset a password follow these steps:

1. Go to your [PlanetScale console](https://console.planetscale.com).
2. Click on your cluster.
3. Click on the security tab for your cluster.
4. Click on the Users section.
5. Select the user you wish to modify, and click the `Edit` button.
6. Enter a new password.
7. Click on the `Update User` button.

### Step 1. Go to the [PlanetScale console](https://console.planetscale.com).

This opens the **Clusters Overview**.

### Step 2. Click on your cluster name.

This opens the **Overview** for your cluster.

### Step 3. Click on your database name.

This opens the **Overview** for your database.

### Step 4. Click on **Security**.

![Security Tab](/img/docs/security-tab.png)

### Step 5. Click on **Users**.

![Users Tab](/img/docs/users-tab.png)

### Step 6. Select the user you wish to modify, and click the **Edit** button.

![Edit exiting user](/img/docs/edit-existing-user.png)

### Step 7. Enter a new password.

![Enter new password](img/docs/update-password.png)

### Step 8. Click on the **Update User** button.

## See also

- [Connecting to your database](connect-to-db)
- [Allowing access to specific IP addresses](whitelisting-ips)
- [Secure Database Connection](secure-connection)
