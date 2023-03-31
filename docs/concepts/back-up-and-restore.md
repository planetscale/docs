---
title: 'Back up and restore'
subtitle: 'Create, schedule, and restore backups for your PlanetScale databases.'
date: '2022-08-01'
---

## Overview

PlanetScale provides the ability to create, schedule, and restore backups for production and development database branches.

{% callout %}
Daily backups of database branches are included free of charge for all databases. Our
[Scaler and Team plans](/docs/concepts/billing#planetscale-plans) include automated backups every 12
hours.
{% /callout %}

## View backups

To view backups for all of your branches, go to your database backups page: `app.planetscale.com/<org>/<database>/backups`.

Once there, you'll find additional details about your backup history.

![View backups for your database](/assets/docs/concepts/back-up-and-restore/view-backups.png)

## Create manual backups

In addition to the daily default backups that PlanetScale schedules for your database branches, you can create additional **manual** backups.

To create a manual backup, follow the steps outlined below:

1. Go to your database backups page: `app.planetscale.com/<org>/<database>/backups`.

2. Click the **Create new backup** button.

   This will bring up a pop-up modal that prompts you to pick a **branch** to backup, _name_ your backup, and select how long you wish to keep the backup.

   ![Manual backup pop-up modal](/assets/docs/concepts/back-up-and-restore/create-new-backup.png)

3. Click the **Create backup** button to finish the backup and close the pop-up modal.

4. Manual backups are not free and are denoted by the `$` icon next to their name in the list view on the backups page.

   ![Manual backups are shown with a $ sign](/assets/docs/concepts/back-up-and-restore/manual-backup-row.png)

5. To see the cost associated with storage of a manual backup, click on the backup name. You will see the cost per month on the details page.

   ![Monthly storage cost for a Manual backup](/assets/docs/concepts/back-up-and-restore/manual-backup-cost.png)

## Schedule backups

You can add additional **scheduled backups** for your branches, billed at $0.023 per GB per month.

1. Go to your database backups page: `app.planetscale.com/<org>/<database>/backups`.

2. Select the type of branch (`Production branches` | `Development branches` ) you'd like to be backed up by the new backup schedule.

   ![Schedule backup pop-up modal](/assets/docs/concepts/back-up-and-restore/new-backup-schedule.png)

3. Click the **Add new schedule** button.

   This will bring up a pop-up modal that prompts you to configure backup frequency, select how long you wish to keep the backup, and to _name_ your **schedule**.

   ![Schedule backup pop-up modal](/assets/docs/concepts/back-up-and-restore/new-backup-schedule.png)

4. Click the **Save schedule** button to save your new scheduling configurations and to close the pop-up modal.

{% callout %}
For additional scheduled backups beyond the included default (daily for the
[free Hobby plan](/docs/concepts/billing#planetscale-plans) and every 12 hours for the
[Scaler and Team plans](/docs/concepts/billing#planetscale-plans), you will be billed
**$0.023 per GB per month**.
{% /callout %}

## Restore from a backup

To restore a backup to a new branch, click on the individual backup to see the option to restore them.

1. Go to your database backups page: `app.planetscale.com/<org>/<database>/backups`.

2. Select the backup you wish to restore.

3. Click the **Restore backup** button.

   This will bring up a pop-up modal that prompts you to name your branch.

   ![Restore backup pop-up modal](/assets/docs/concepts/back-up-and-restore/restore.png)

4. Click the **Restore backup** button to finish restoring your backup and to close the pop-up modal.

5. To see all branches that are `restored` from a backup, head to the backup details and you'll see a list of those branches.

   ![Branches restored from a backup](/assets/docs/concepts/back-up-and-restore/restored-branches-list.png)

{% callout title="Next steps" %}

- [Audit log](/docs/concepts/audit-log)

{% /callout %}
