---
title: 'Back up and restore'
subtitle: 'Learn about how backups work in GCP and PlanetScale Managed.'
label: 'Enterprise'
date: '2023-11-06'
---

PlanetScale Managed backup and restore functions like the hosted PlanetScale product. For more info, see [how to create, schedule, and restore backups for your PlanetScale databases](/docs/concepts/back-up-and-restore).

To learn more about the backup and restore access levels, see the [database level permissions documentation](/docs/concepts/access-control#database-level-permissions).

By default, databases are automatically backed up once per day to a Cloud Storage bucket in the customer's GCP project. This default can be adjusted when working with PlanetScale Support. However, configuring and validating additional backup frequencies is the customer's responsibility.

During the initial provisioning process, PlanetScale applies a Cloud Storage configuration to ensure backups are encrypted at rest on GCP Cloud Storage.
