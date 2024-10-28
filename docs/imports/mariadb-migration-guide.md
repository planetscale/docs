---
title: 'MariaDB migration guide'
subtitle: 'Learn how to import your database from a MariaDB server into a PlanetScale MySQL database.'
date: '2024-02-16'
---

## Overview

In this article, you’ll learn how to migrate a database from MariaDB, a fork of MySQL, into PlanetScale.

{% callout type="warning" %}
The steps outlined in this guide used MariaDB version 10.6.12 on an Ubuntu host. Depending on the version of MariaDB you are using, your results may vary. Don't hesitate to [reach out to us](/contact) for further assistance.
{% /callout %}

We recommend reading through the [Database import documentation](/docs/imports/database-imports) to learn how our import tool works before proceeding.

### Prerequisites

- A PlanetScale account
- A MariaDB server with traffic permitted from our [import tool IP addresses](/docs/imports/import-tool-migration-addresses)

## Configure MariaDB

Before you can start migrating data, there are a number of configuration options that need to be in place for our import tool to work properly:

- `binlog_format`
- `log_bin`
- `sql_mode`

You may run the following query to check these values:

```sql
SHOW variables WHERE Variable_name IN ('binlog_format','log_bin','sql_mode');

+---------------+-------------------------------------------------------------------------------------------+
| Variable_name | Value                                                                                     |
+---------------+-------------------------------------------------------------------------------------------+
| binlog_format | MIXED                                                                                     |
| log_bin       | OFF                                                                                       |
| sql_mode      | STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION |
+---------------+-------------------------------------------------------------------------------------------+
```

In the results listed above, none of the options are configured properly, so let’s set them up now. The exact path to your configuration file varies by operating system. This demo uses Ubuntu, so the MariaDB configuration file is located at `/etc/mysql/mariadb.conf.d/50-server.cnf`. Edit the configuration file and add the following values at the end of the file:

```
binlog_format = ROW
log_bin = /var/log/mysql/mysql-bin.log
sql_mode = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,ONLY_FULL_GROUP_BY'
```

With the configuration updated, restart the MariaDB service. The exact command varies by the service manager you are using on your host, with this demo using `systemctl`:

```bash
sudo systemctl restart mariadb
```

## Configure a migration account

The PlanetScale import tool requires a user account with a specific set of permissions on the database you wish to migrate, as well as the server itself to set up the necessary database that tracks replication changes. To create a user named `migration_user`, run the following:

```sql
CREATE USER 'migration_user'@'%' IDENTIFIED BY '<SUPER_STRONG_PASS>';
```

Next, configure the proper grants to allow `migration_user` to set up replication:

```sql
GRANT PROCESS, REPLICATION SLAVE, REPLICATION CLIENT, RELOAD ON *.* TO 'migration_user'@'%';
```

Now you can configure the necessary permissions on the database you wish to migrate. Replace `<DATABASE_NAME>` with the name of your database in MariaDB:

```sql
GRANT SELECT, INSERT, UPDATE, DELETE, SHOW VIEW, LOCK TABLES ON `<DATABASE_NAME>`.* TO 'migration_user'@'%';
```

Finally, you’ll need to configure permissions for a database named `ps_import_<id>` (the last portion of the name will vary) that will be created by the import tool to track replication between MariaDB and PlanetScale.

```sql
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER ON `ps\_import\_%`.* TO 'migration_user'@'%';
```

For a full explanation on what each of these grants do, [our article on configuring a migration account for MySQL databases](/docs/imports/import-tool-user-requirements) details each requirement.

## Importing your database

In the PlanetScale dashboard, click “**New database**”, then “**Import database**”.

![](/assets/docs/imports/mariadb-migration-guide/CleanShot_2023-04-18_at_15.52.11.png)

At the time of this writing, the Import database feature is in beta. If this is your first time accessing this feature, you will be prompted to opt in to using the feature. Click “**Join beta”** to proceed.

Complete the form using the information gathered in the previous section. The first section will ask what the new name of the database will be in PlanetScale. Most of the time you’d set this to the same name as the database you are importing, but in this example I’ll be migrating to a database named “bookings_imported”.

![](/assets/docs/imports/mariadb-migration-guide/CleanShot_2023-04-18_at_16.10.07.png)

The next section will ask for your the details required to connect to your existing MariaDB database. Use `migration_user` credentials configured in the previous section along with the name of your database. In this demo, I’m moving a database named “bookings_db”. Advanced security options are available if needed, but will not be utilized in this demo.

![](/assets/docs/imports/mariadb-migration-guide/CleanShot_2023-04-18_at_16.11.11.png)

Click "**Connect to database”** and the import tool will attempt to connect to your database in MariaDB.

The “**Connect to database**” button will update with the connection status.

{% callout %}
If your database uses foreign key constraints, we will detect them after successfully connecting to your external database and automatically enable foreign key constraint support for your database.
{% /callout %}

If the connection is successful, click “**Begin database import**” to migrate your data to PlanetScale.

If the connection was successful, you’ll see the following message. Click “**Begin database import”** to start importing data.

The following view will show you the progress of your data being imported.

![](/assets/docs/imports/mariadb-migration-guide/CleanShot_2023-04-18_at_16.17.18.png)

Once your database has finished importing, the view will update to show the database that was created in PlanetScale, as well as the option to enable primary mode. This button will make the PlanetScale version of the database the primary replica. Clicking “**Enable primary mode”** will display a modal where you can confirm that you want to make this change.

![](/assets/docs/imports/mariadb-migration-guide/CleanShot_2023-04-18_at_16.20.40.png)

After primary mode is enabled, the third card in the flow will update to give you two options. **Enable replica mode** will revert the change performed in the previous step, whereas **Finish import** will detach the databases from replication and future changes to either the PlanetScale database or the MariaDB database will not be replicated to each other. Click “**Finish import”** to complete the import process. Confirm in the modal that will be displayed.

![](/assets/docs/imports/mariadb-migration-guide/CleanShot_2023-04-18_at_16.21.32.png)

This concludes the process used to import a database into PlanetScale from MariaDB.
