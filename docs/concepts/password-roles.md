---
title: 'Password roles'
subtitle: 'Restrict access to your database with password roles'
date: '2023-04-05'
---

## Overview

PlanetScale allows you to [create and manage passwords](/docs/concepts/connection-strings) for each branch of your database. PlanetScale passwords can be created with one of four roles:

- **Read-only** &mdash; Can query rows
- **Write-only** &mdash; Can modify rows
- **Read/Write** &mdash; Can query and modify rows
- **Admin** &mdash; All read/write permissions and can modify schema\*

\* _This does not apply to production branches with [safe migrations](/docs/concepts/safe-migrations) enabled, as we [do not allow direct DDL](/docs/learn/how-online-schema-change-tools-work) on those branches, even if your password has the `Admin` role._

## Create a password with custom role

1. Go to your database settings page.
2. Click "**Passwords**" > "**New password**".
3. Give it a name, select the role from the dropdown, select the branch, and click "**Generate password**".
   ![PlanetScale password roles](/assets/docs/concepts/password-roles/roles.png)

Once a password is created, **its role cannot be changed**.

The access level available to these roles is shown in the table below.

| Role name  | Can create/edit schema | Can insert/update/delete rows | Can query rows |
| :--------- | :--------------------- | :---------------------------- | :------------- |
| Read-only  | ❌                     | ❌                            | ✔             |
| Write-only | ❌                     | ✔                            | ❌             |
| Read/write | ❌                     | ✔                            | ✔             |
| Admin      | ✔                     | ✔                            | ✔             |

{% callout %}
The default role for all passwords created by the **Connect** button is `Administrator`. Passwords with custom roles
must be created from your database settings page.
{% /callout %}

## Troubleshooting

The following errors indicate that you do not have the permissions needed to perform an action. You must create a new password with a more privileged role to proceed.

**SELECT DENIED**

`Select command denied to user ‘planetscale-writer-only for table ‘customers’ (ACL check error) (CallerID: planetscale-writer-only)`

**INSERT DENIED**

`Insert command denied to user ‘planetscale-reader’ for table ‘customers’ (ACL check error) (CallerID: planetscale-reader)`

**DELETE DENIED**

`Delete command denied to user ‘planetscale-reader’ for table ‘customers’ (ACL check error) (CallerID: planetscale-reader)`

**DDL DENIED**

`DDL command denied to user ‘planetscale-writer' for table my-new-table’ (ACL check error) (CallerID: planetscale-writer)`

{% callout %}
If your pscale CLI version is less than 0.94.0, please upgrade your installation by following [this
document](/docs/concepts/planetscale-environment-setup)
{% /callout %}
