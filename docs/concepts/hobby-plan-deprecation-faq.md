---
title: 'Hobby tier deprecation - FAQ'
subtitle: 'Frequently asked questions about the removal of the Hobby tier.'
date: '2024-03-06'
---

## Overview

PlanetScale is removing our Hobby tier. [Please read our blog post here to learn more](/blog/planetscale-forever).

All existing Hobby tier databases will need to upgrade their database to a paid plan by April 8, 2024. Databases which are not upgraded by April 8th will be put into sleep mode. If you need to retrieve your data after April 8th, you will be able to temporarily wake your database for 24 hours.

- [What is happening to the Hobby Tier?](#what-is-happening-to-the-hobby-tier-)
- [How do I stop my database from being slept?](#how-do-i-stop-my-database-from-going-offline-)
- [Will PlanetScale delete my data?](#will-planetscale-delete-my-data-)
- [How do I migrate off of PlanetScale?](#how-do-i-migrate-off-of-planetscale-)
- [How do I get my data after April 8th?](#how-do-i-get-my-data-after-april-8th-)
- [I can't migrate in time, help!](#i-can-t-migrate-in-time-help-)
- [Where do I learn about the Scaler Pro plan?](#where-do-i-learn-about-the-scaler-pro-plan-)
- [Can I pay for a hobby database?](#can-i-pay-for-a-hobby-database-)

## What is happening to the Hobby tier?

PlanetScale has made the decision to stop offering our Hobby tier.

On March 6th, it will no longer be possible to create new Hobby tier databases. Databases which are not upgraded by April 8th will be put into sleep mode. If you need to retrieve your data after April 8th, you will be able to temporarily wake your database for 24 hours.

## How do I stop my database from going offline?

To prevent your database from going offline on April 8th, you need to upgrade to a paid plan.

## Will PlanetScale delete my data?

No! PlanetScale's [database sleeping](/docs/concepts/database-sleeping) makes a backup copy of your data before shutting a database down and safely archives it.

## How do I migrate off of PlanetScale?

First, export the data from your branch using the [PlanetScale CLI](/docs/concepts/planetscale-environment-setup):

```bash
pscale db dump <DATABASE_NAME> <BRANCH_NAME>
```

This may take several minutes, depending on the amount of data in the branch. The dump of your data will be in a folder in your working directory. For example:

```bash
pscale database dump test main
```

You'll see a message like this:

```
Starting to dump all tables from database test to folder /Users/nick/pscale_dump_test_main_20240305_144231
Dumping is finished! (elapsed time: 3.886106333s)
```

Inside of the `pscale_dump_test_main_20240305_144231` folder, there are files with names ending in `-schema.sql` which contains the schema for the database, as well as files with names like `test.test.00001.sql` which contain the data. When [restoring the backup files](https://dev.mysql.com/doc/refman/8.0/en/reloading-sql-format-dumps.html) to a new MySQL server be sure to create the database first, and to load the schema files before the table data files.

```
mysql -e "create database test"
mysql test < pscale_dump_test_main_20240305_144231/*.sql
```

Database dumps created with pscale are also compatible with [`myloader`](https://github.com/mydumper/mydumper), which is useful for loading larger backups into another instance of MySQL. Using a MySQL instance hosted on DigitalOcean as an example:

```bash
cat db.ini
[myloader]
host = db-mysql-sfo3-5233-do-user-137498-0.b.db.ondigitalocean.com
user = doadmin
password = <REDACTED>
database = defaultdb
port = 25060
```

Then, we can run `myloader` to load data into the other MySQL instance:

```bash
myloader --defaults-file db.ini --directory pscale_dump_test_main_20240305_144231/
```

If you get an error that looks like:

```sql
Unknown column 'nick2' in 'field list'
```

Ensure that your `SQL_MODE` does not contain `ANSI_QUOTES`.

Once this is done, your data should be loaded in your other MySQL database.

If you run into any issues, please don't hesitate to reach out to `support@planetscale.com` or submit a ticket at [`https://support.planetscale.com`](https://support.planetscale.com).

## How do I get my data after April 8th?

If you do not wish to upgrade, you will be able to temporarily wake your database for 24 hours to retrieve your data.

## I can't migrate in time, help!

If this causes you or your business problems, please don't hesitate to reach out to `support@planetscale.com` or submit a ticket at [`https://support.planetscale.com`](https://support.planetscale.com). We are happy
to work with you to minimize the disruption that this change causes.

## Where do I learn about the Scaler Pro plan?

You can find information about our paid plan, Scaler Pro, in the [Scaler Pro documentation](/docs/concepts/planetscale-plans#scaler-pro). The [Scaler Pro upgrade FAQ](/docs/concepts/scaler-pro-upgrade-faq) also contains additional helpful information about migrating from a usage-based plan (in this case, Hobby) to our resource-based plan (Scaler Pro).

## Can I pay for a hobby database?

At this time, PlanetScale does not offer database plans that are smaller than [Scaler Pro at the PS-10 cluster size](/docs/concepts/planetscale-plans).
