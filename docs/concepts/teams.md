---
title: 'Teams'
subtitle: 'Fine-tune individual database access with teams'
date: '2022-08-04'
---

## Overview

PlanetScale allows you to create teams within organizations. This allows you to easily manage administrator access to one or multiple databases all in one spot.

## Create and manage Teams

You can manage teams straight from your PlanetScale dashboard by going to "**Settings**" > "**Teams**".

{% callout %}
Only [Organization Administrators](/docs/concepts/access-control#organization-administrator) can create and
manage Teams.
{% /callout %}

Once you add databases to a team, any members on that team will have [Database Administrator access](/docs/concepts/access-control#database-level-permissions) to those databases. Review our [Access control documentation](/docs/concepts/access-control) to understand the full scope of Database Administrator access.

### Create a team

1. On your PlanetScale overview page, click "**Settings**".
2. Click "**Teams**" in the left nav.
   ![Dashboard UI - Create a PlanetScale team](/assets/docs/concepts/teams/create.png)
3. Give your team a name and description (_optional_).
4. Click "**Create team**".

### Add members

1. Click "**Add a member**".
2. You'll see a list of your Organization members. Select the member(s) one at a time that you wish to add to the team.

### Add databases

1. Click "**Add databases**".
2. Select the databases you want this team to have [database administrator access](/docs/concepts/access-control#database-level-permissions) to.

Now, when you go to the Settings page for any databases you've added to a team, you'll also be able to view and revoke access straight from the database Administrators page.

![Dashboard UI - Database Administrators settings page](/assets/docs/concepts/teams/settings.png)

### Remove members and databases

To remove a member from a team, find their name in the member list and click "**Remove**". At this time, you'll also be able to delete any passwords this member has created to ensure you've completely revoked their access to the database.

![Dashboard UI - Delete a member from a team](/assets/docs/concepts/teams/member.png)

To remove a database from a team, click the "**x**" next to the database name under "Administrator permissions". This will remove database administrator access for all members of the team.

![Dashboard UI - Delete a database from a team](/assets/docs/concepts/teams/database.png)

## Directory Sync with Teams

If you have [SSO with Directory Sync](/docs/concepts/sso#directory-sync) enabled, all Teams will be managed by your Directory Sync directory. You can add and remove database access to teams, but member management must be done through your directory.

![Dashboard UI - Directory-managed Teams page](/assets/docs/concepts/sso/managed.png)
