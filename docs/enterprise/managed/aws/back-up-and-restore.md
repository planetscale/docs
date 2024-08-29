---
title: 'Back up and restore'
subtitle: 'Learn about how backups work in AWS and PlanetScale Managed.'
label: 'Enterprise'
date: '2023-11-06'
---

PlanetScale Managed backup and restore functions like the hosted PlanetScale product. For more info, see [how to create, schedule, and restore backups for your PlanetScale databases](/docs/concepts/back-up-and-restore).

To learn more about the backup and restore access levels, see the [database level permissions documentation](/docs/concepts/access-control#database-level-permissions).

By default, databases are automatically backed up once per day to an S3 bucket in the customer's AWS sub-account. This default can be adjusted when working with PlanetScale Support. Configuring and validating additional backup frequencies is the customer's responsibility.

During the initial provisioning process, PlanetScale applies an S3 configuration to ensure that backups are encrypted at rest on Amazon S3.
