---
title: 'Access control'
subtitle: 'Explore roles, permissions, and access control options at an organization and database level.'
date: '2022-08-01'
---

## Organization access control

When you set up your PlanetScale account, you're asked to create an **Organization**.

An organization is essentially a container for your databases, settings, and members. You can create multiple organizations in the same account for different applications or use cases.

Within each organization, you can add members and assign them different roles. This document covers the different roles, the ways you can assign roles, permissions associated with those roles.

## Roles and permissions

We currently support three different roles in your organization:

- `Organization Administrator`
- `Organization Member`
- `Database Administrator`

### Organization Administrator

An `Organization Administrator` can perform all actions in an organization, as well as all actions on _every_ database within that organization.

### Organization Member

An `Organization Member` can only perform limited actions within an organization and on all databases in that organization.

### Database Administrator

A `Database Administrator` can perform all actions on the database for which they were assigned the `Databases Administrator` role.

This role is assigned at the **database level** and therefore **does not** have any organization-level permissions. If you want to [grant a member _full_ access to manage one or several databases](#assign-roles-at-a-database-level) but not the organization, then this is the role you want.

## Organization-level permissions

Each role has a set of permissions assigned to it, which determines what actions that role is allowed to take within an organization or database.

The following table describes permissions assigned at the organization level for `Organization Administrators` and `Organization Members`. Because `Database Administrators` don't have any organization-level permissions, they are not included in this table.

| Action                                 | Description                                                                    | Member | Administrator |
| -------------------------------------- | ------------------------------------------------------------------------------ | ------ | ------------- |
| View branches                          | View a database branch                                                         | ✔     | ✔            |
| Create branches                        | Create a database branch                                                       | ✔     | ✔            |
| Delete non-production branches         | Delete a non-production database branch                                        | ✔     | ✔            |
| View databases                         | View one or all databases                                                      | ✔     | ✔            |
| Create databases                       | Create a new database                                                          | ✔     | ✔            |
| Create deploy requests                 | Create a deploy request for a branch                                           | ✔     | ✔            |
| Manage service tokens                  | Create, view, or delete service tokens                                         | ✔     | ✔            |
| Manage service token grants            | Create, view, update, or delete service token grants                           | ✔     | ✔            |
| View organization members              | View one or all organization members                                           | ✔     | ✔            |
| View database members                  | View one or all database members                                               | ✔     | ✔            |
| View organization                      | View an organization                                                           | ✔     | ✔            |
| View query statistics                  | View query statistics for an organization's databases                          | ✔     | ✔            |
| Delete production branches             | Delete a production database branch                                            |        | ✔            |
| Promote branches                       | Promote a branch to production                                                 |        | ✔            |
| Manage databases                       | Delete, update settings, or import a database                                  |        | ✔            |
| Manage beta features                   | Opt-in or opt-out of a beta feature                                            |        | ✔            |
| Create production service token grants | Create a service token grant to connect or delete a production database branch |        | ✔            |
| Update an integration                  | Update a third-party integration                                               |        | ✔            |
| Manage invitations                     | View, create, or cancel organization invitations                               |        | ✔            |
| Manage invoices                        | View or download organization invoices                                         |        | ✔            |
| Manage billing                         | View or update billing plans and payment methods                               |        | ✔            |
| View audit logs                        | View all audit logs                                                            |        | ✔            |
| Manage organization members            | Update member roles or delete organization members                             |        | ✔            |
| Manage database members                | Update member roles, add, or remove database members                           |        | ✔            |
| Manage organization                    | Update organization settings, SSO, or delete organization                      |        | ✔            |

## Database-level permissions

The following table describes the permissions assigned at the **database level** for `Organization Administrators`, `Organization Members`, and `Database Administrators`.

For `Organization Administrators` and `Organization Members`, these permissions apply to every database in the organization. Because the `Database Administrator` role is assigned at the database level, the permissions are for the specific database(s) for which they have the `Database Administrator` role.

| Action                         | Description                                                   | Member | Administrator |
| ------------------------------ | ------------------------------------------------------------- | ------ | ------------- |
| Create and view branches       | Create or view a database branch                              | ✔     | ✔            |
| Delete non-production branches | Delete a non-production branch of a specific database         | ✔     | ✔            |
| View database                  | View a database in an organization                            | ✔     | ✔            |
| Create deploy requests         | Create a deploy request for a branch on a specific database   | ✔     | ✔            |
| View database members          | View one or all database members                              | ✔     | ✔            |
| View query statistics          | View query statistics for an organization's databases         | ✔     | ✔            |
| Restore non-production backups | Restore the backup of a development branch                    | ✔     | ✔            |
| Manage billing                 | Update the billing plan of a specific database                |        | ✔            |
| Delete production branches     | Delete a production database branch of a specific database    |        | ✔            |
| Promote branches               | Promote a branch of a specific database to production         |        | ✔            |
| Manage database                | Delete, update settings, or import a database                 |        | ✔            |
| Manage beta features           | Opt-in or opt-out of a beta feature for a database            |        | ✔            |
| Manage database members        | Update database member roles, add, or remove database members |        | ✔            |
| Restore production backups     | Restore the backup of a production branch                     |        | ✔            |

An organization may have several databases, and an `Organization Member` may have different access to each database depending on whether or not they also have the `Database Administrator` role.

## Assign organization roles to members

You can follow the steps below to assign roles to your members. You must be an Organization Administrator to modify member roles.

- In the [PlanetScale dashboard](https://app.planetscale.com), click on the Settings tab in the top navigation.
- Click on "Members" in the sidebar on the left.
- From here, you can click on the dropdown on the right under the "Role" column to select the role you want to apply to each member.

You can also invite new members to your organization and assign roles once they accept their invitation. New members will be added with the [`Organization Member`](#organization-member) role by default.

{% callout %}
Member role management is issued at the organization level. Each organization in your account may have different
members with different access levels.
{% /callout %}

## Assign roles at a database level

There are two ways to assign database-level roles to Organization members:

1. Individually using the `Database Administrator` role.
2. Creating a Team, adding member(s), and adding database(s) to that team.

### Individually assign the `Database Administrator` role

To assign a member the role of `Database Administrator`, follow the steps outlined below. You must be an Organization Administrator or an existing Database Administrator to manage the `Database Administrator` role.

{% callout %}
Members that create a database are automatically assigned the role of `Database Administrator` for that database.
{% /callout %}

1. In the [PlanetScale dashboard](https://app.planetscale.com), click on the name of the database you want to add a Database Administrator to.
2. Click on the "**Settings**" tab in the top navigation.
3. Click on "**Administrators**" in the sidebar on the left.
4. To add an administrator, click on the "**Add administrator**" button and select the member you wish to add as a Database Administrator.
5. From here, you can also remove a Database Administrator by clicking the "**Remove**" button next to their name.

### Add Database Administrator role via Teams

If you wish to give several members the Database Administrator role, you may want to [create a Team](/docs/concepts/teams#create-and-manage-teams). This will allow you to manage the access to that database all in one place.

For instructions, see our [Teams documentation](/docs/concepts/teams).
