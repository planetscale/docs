---
title: 'MySQL compatibility'
subtitle: 'Learn what MySQL syntax, functions, and more are supported by PlanetScale'
date: '2022-09-23'
---

## Overview

PlanetScale is built on top of open-source Vitess, a database clustering system for horizontal scaling of MySQL. Consequently, PlanetScale is only compatible with MySQL databases.

If you're [importing an existing database](/docs/imports/database-imports), PlanetScale supports MySQL database versions `5.7` through `8.0`.

New PlanetScale databases are created on MySQL 8 with character set `utf8mb4_0900_ai_ci`. PlanetScale supports `utf8`, `utf8mb4`, and `utf8mb3`, character sets. We also support `latin1` and `ascii` character sets, but do not recommend them.

## MySQL compatibility limitations

The following reference guide will cover some MySQL syntax, features, and more that PlanetScale either does not support or has limitations around. We are actively working on driving up compatibility, but it's an ongoing effort and will take some time to complete. See this [project board on GitHub](https://github.com/vitessio/vitess/projects/4) to learn what the Vitess team is currently focusing on.

If you're attempting to import a database using our Import tool, there are some additional requirements that you can find in our [Database imports documentation](/docs/imports/database-imports#import-limitations).

### Queries, functions, syntax, data types, and SQL modes

{% callout %}
❗ = _Limitations in support_

❌ = _Not supported_
{% /callout %}

| Statement                     | Support | Description                                                                                                                                                                                                                                                |
| ----------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONSTRAINT...FOREIGN KEY`    | ❌      | The usage of foreign key constraints or `FOREIGN KEY` syntax is [not supported on PlanetScale](/docs/learn/operating-without-foreign-key-constraints).                                                                                                     |
| `ALTER TABLE...RENAME COLUMN` | ❌      | Renaming columns and tables may be destructive. See our [guide for column rename recommendations](/docs/learn/handling-table-and-column-renames).                                                                                                          |
| `CREATE DATABASE`             | ❌      | You cannot `CREATE` a PlanetScale database from the MySQL command line, however, this is supported in the [PlanetScale CLI](/docs/reference/database).                                                                                                     |
| `DROP DATABASE`               | ❌      | You cannot `DROP` a PlanetScale database from the MYSQL command line, however, this is supported in the [PlanetScale CLI](/docs/reference/database).                                                                                                       |
| `JSON_TABLE`                  | ❌      | The [`JSON_TABLE` function](https://dev.mysql.com/doc/refman/8.0/en/json-table-functions.html#function_json-table) is not yet supported. All other [JSON SQL functions](https://dev.mysql.com/doc/refman/8.0/en/json-function-reference.html) should work. |
| `PROCEDURE`                   | ❌      | We do not support any form of [stored routines](https://dev.mysql.com/doc/refman/8.0/en/stored-routines.html).                                                                                                                                             |
| `FUNCTION`                    | ❌      | We do not support any form of [stored routines](https://dev.mysql.com/doc/refman/8.0/en/stored-routines.html).                                                                                                                                             |
| `TRIGGER`                     | ❌      | We do not support any form of [stored routines](https://dev.mysql.com/doc/refman/8.0/en/stored-routines.html).                                                                                                                                             |
| `EVENT`                       | ❌      | We do not support any form of [stored routines](https://dev.mysql.com/doc/refman/8.0/en/stored-routines.html).                                                                                                                                             |
| `LOAD DATA INFILE`            | ❌      | Loading data via [`LOAD DATA INFILE` is not supported](https://github.com/vitessio/vitess/issues/2976).                                                                                                                                                    |
| `KILL`                        | ❌      | We do not support killing queries or shards from the command line.                                                                                                                                                                                         |
| `:=`                          | ❌      | The `:=` assignment operator is not yet supported.                                                                                                                                                                                                         |
| `SET GLOBAL time_zone`        | ❌      | The global time zone is set to UTC and can not be modified.                                                                                                                                                                                                |
| `SET GLOBAL sql_mode`         | ❌      | The global SQL mode can not be changed permanently. Set each new session's mode instead with `SET sql_mode`.                                                                                                                                               |
| `PIPES_AS_CONCAT`             | ❌      | Enabling this SQL mode can interfere with Vitess' evalengine parsing the SQL queries so enabling it may result in incorrect or unexpected results. Please use MySQL's standard dialect instead, e.g. `CONCAT()`.                                           |
| `ANSI_QUOTES`                 | ❌      | Enabling this SQL mode can interfere with Vitess' evalengine parsing the SQL queries so enabling it may result in incorrect or unexpected results. Please use MySQL's standard quotation instead.                                                          |
| `ON DUPLICATE KEY UPDATE AS`  | ❌      | In an `INSERT... ON DUPLICATE KEY UPDATE` statement, aliasing the columns or rows is not yet supported.                                                                                                                                                    |

## Miscellaneous

| Action                        | Support | Description                                                                                                                                                                                                                                     |
| ----------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Empty schemas**             | ❌      | Databases with empty schemas are invalid. You cannot deploy a schema change to production if no tables exist.                                                                                                                                   |
| **Non-InnoDB Storage engine** | ❌      | We only support [InnoDB](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html) storage engine.                                                                                                                                    |
| **No unique key**             | ❌      | We require all tables have a [unique, non-null key](/docs/learn/change-single-unique-key) that remains unchanged during migrations.                                                                                                             |
| **Direct DDL**                | ❌      | We do [not allow Direct DDL](/docs/learn/how-online-schema-change-tools-work) on [production branches](/docs/concepts/branching). This includes `TRUNCATE` statements.                                                                          |
| **Disabled binary logs**      | ❗      | You must have binary logs enabled if importing a database using our [database importer tool](/docs/imports/database-imports). See our [Import doc](/docs/imports/database-imports#server-configuration-issues) for more required configuration. |
| **Large JSON documents**      | ❗      | MySQL supports JSON documents up to 1 GB in size. However, we do not recommend to store more than a few MB in a JSON document for performance reasons.                                                                                          |

## FAQ

### Postgres support

PlanetScale does not support PostgreSQL. We have worked with customers to migrate their Postgres databases to MySQL/PlanetScale. If you have questions about migrating, [get in touch](/contact).

## Additional assistance

If you need additional assistance or have any questions, contact the [PlanetScale Support team](https://support.planetscale.com), or join our [GitHub Discussion board](https://github.com/planetscale/beta/discussions).
