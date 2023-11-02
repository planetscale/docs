---
title: 'Fivetran integration'
subtitle: 'Extract, load, and transform your PlanetScale data with Fivetran.'
date: '2023-11-02'
meta:
  title: 'Connect with Fivetran ELT'
---

With PlanetScale Connect, you can extract data from your PlanetScale database and safely load it into other destinations for analysis, transformation, and more.

We implemented a [Fivetran](https://fivetran.com/) connector as the pipeline between your PlanetScale source and selected destination. This document will walk you through connecting your PlanetScale database to Fivetran.

## Connect to Fivetran

### Sign up for the PlanetScale connector private preview

Currently, the PlanetScale connector is in private preview mode in Fivetran. To get access:

1. Log into your [Fivetran dashboard](https://fivetran.com/dashboard/)
2. Click on "**Add connector**" and set up your destination (if needed)
3. On the "**Browse our data sources**" page, type `planetscale` in the search box
4. Click on the "**Contact us**" button in the `PlanetScale` search result
5. Fill out the form and submit

The Fivetran team will reach out to grant you access to the private preview.

### Requirements

- A PlanetScale database
- A Fivetran account
- Access to the private preview of the PlanetScale connector in Fivetran

#### Connect using private networking

{% callout type="note" %}
You must be using the [PlanetScale Enterprise single-tenant deployment option](/docs/concepts/deployment-options#single-tenancy-deployment-on-planetscale) and on a [Fivetran Business Critical plan](https://resources.fivetran.com/datasheets/fivetran-business-critical-product-overview) to use private networking.
{% /callout %}

If you are using private networking and not connecting directly to your PlanetScale database, the Fivetran integration supports AWS PrivateLink and GCP Private Service Connect. See the [Fivetran AWS Private Link setup guide](https://fivetran.com/docs/databases/connection-options#awsprivatelink) or [Fivetran GCP Private Service Connect setup guide](https://fivetran.com/docs/databases/connection-options#googlecloudprivateserviceconnect) for details.

### Set up Fivetran

1. In the [Fivetran dashboard](https://fivetran.com/dashboard/), click on "**Add connector**," set up your destination (if needed), and search for `planetscale` on the “**Browse our data sources**” page. Once selected, you should see the PlanetScale connector settings page.
2. In [PlanetScale](https://app.planetscale.com), navigate to the database you want to connect to Fivetran and click the "**Connect**" button.
3. Create a new password for your main branch with [read-only permissions](/docs/concepts/password-roles#overview).
4. Select "**General**" from the "**Connect with**" dropdown and leave this tab open, as you'll need to copy these credentials shortly.
5. Back in Fivetran, in your [connector setup form](https://fivetran.com/docs/getting-started/fivetran-dashboard/connectors#addanewconnector), enter the connector values as follows:

- **Destination schema**: This prefix applies to each replicated schema and cannot be changed once your connector is created. Note: Each replicated schema is appended with `_planetscale` at the end of your chosen name.
- **Database host name**: Paste in the copied value for `host`
- **Database name**: Paste in the copied value for `database`
- **Database username**: Paste in the copied value for `username`
- **Database password**: Paste in the copied value for `password`
- **Comma-separated list of shards to sync (optional)**: If your PlanetScale database is _not_ sharded, ignore this field. If the database is sharded, by default, the PlanetScale connector will download rows from all shards in the database. To pick which shards are synced by the connector, you can optionally provide a comma-separated list of shards in the connector configuration.
- **Use replica?**: In PlanetScale, VStream will connect to the primary tablet for your database, which also serves queries to your database. To lessen the load on the primary tablet, set this to `true` to make Vstream read from a replica of your database.
- **Treat tinyint(1) as boolean (optional)**: You can choose to have the connector transform tinyint(1) type columns in your database to either `true` or `false`.
- **Fivetran IPs (optional)**: If your connection string was created with [IP restrictions](/docs/concepts/connection-strings#ip-restrictions), ensure that the [Fivetran IP ranges](https://fivetran.com/docs/using-fivetran/ips) are added to the password.

6. Click "**Save & Test**". Fivetran tests and validates our connection to your PlanetScale database. Upon successfully completing the setup tests, you can sync your data using Fivetran.

## Sync overview

Once Fivetran is connected to your PlanetScale primary or read replica, we pull a complete dump of all selected data from your database. The connector then connects to your database's [VStream](https://vitess.io/docs/17.0/concepts/vstream/) to pull all your new and changed data at regular intervals. VStream is Vitess' change tracking mechanism that is underneath every PlanetScale database. If data in the source changes (for example, you add new tables or change a data type), the connector automatically detects and persists these changes into your destination.

### Syncing empty tables and columns

Fivetran can sync empty tables and columns for your PlanetScale connector. For more information, see our [Features documentation](https://fivetran.com/docs/getting-started/features#syncingemptytablesandcolumns).

## Schema information

Fivetran tries to replicate the exact schema and tables from your PlanetScale source database to your destination according to our [standard database update strategies](https://fivetran.com/docs/databases#transformationandmappingoverview). For every schema in the PlanetScale database you connect, we create a schema in your destination that maps directly to its native schema. This ensures that the data in your destination is in a familiar format to work with.

### Fivetran-generated columns

Fivetran adds the following columns to every table in your destination:

- `_fivetran_deleted` (BOOLEAN) marks deleted rows in the source database.
- `_fivetran_synced` (UTC TIMESTAMP) indicates when Fivetran last successfully synced the row.
- `_fivetran_index` (INTEGER) shows the order of updates for tables that do not have a primary key.
- `_fivetran_id` (STRING) is the hash of the non-Fivetran values of each row. It's a unique ID that Fivetran uses to avoid duplicate rows in tables that do not have a primary key.

We add these columns to give you insight into the state of your data and the progress of your data syncs.

### Type transformations and mapping

As the connector extracts your data, the connector matches MySQL data types in your PlanetScale database to types that Fivetran supports. If the connector doesn't support a specific data type, the connector automatically changes that type to the closest supported type or, for some types, does not load that data at all. Our system automatically skips columns with data types we do not accept or transform.

The following table illustrates how we transform your MySQL data types into Fivetran-supported types:

| MySQL Type         | Fivetran Data Type | Fivetran Supported | Notes                                                                                                                                                                                                                                                          |
| ------------------ | ------------------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BINARY             | BINARY             | True               |
| BIGINT             | LONG               | True               |
| BIT                | BOOLEAN            | True               | BIT type with a single digit is supported.                                                                                                                                                                                                                     |
| BLOB               | BINARY             | True               |
| CHAR               | STRING             | True               |
| DATE               | DATE               | True               | Invalid values will be loaded as NULL or EPOCH if the type is a primary key.                                                                                                                                                                                   |
| DATETIME           | TIMESTAMP_NTZ      | True               | Invalid values will be loaded as NULL or EPOCH if the type is a primary key.                                                                                                                                                                                   |
| DECIMAL/ NUMERIC   | BIGDECIMAL         | True               |
| DOUBLE             | DOUBLE             | True               |
| ENUM               | STRING             | True               |
| FLOAT              | DOUBLE             | True               |
| GEOMETRY           | JSON               | True               |
| GEOMETRYCOLLECTION | JSON               | True               |
| JSON               | JSON               | True               |
| INT                | INTEGER            | True               |
| LINESTRING         | JSON               | True               |
| LONGBLOB           | BINARY             | True               |
| LONGTEXT           | STRING             | True               |
| MEDIUMBLOB         | BINARY             | True               |
| MEDIUMINT          | INTEGER            | True               |
| MEDIUMTEXT         | STRING             | True               |
| MULTILINESTRING    | JSON               | True               |
| MULTIPOINT         | JSON               | True               |
| MULTIPOLYGON       | JSON               | True               |
| POINT              | JSON               | True               |
| POLYGON            | JSON               | True               |
| SET                | JSON               | True               |
| SMALLINT           | INTEGER            | True               |
| TIME               | STRING             | True               |
| TIMESTAMP          | TIMESTAMP          | True               | MYSQL always stores timestamps in UTC. Invalid values will be loaded as NULL or EPOCH if the type is a primary key.                                                                                                                                            |
| TINYBLOB           | BINARY             | True               |
| TINYINT            | BOOLEAN            | True               | If you select `Treat TinyInt(1) as boolean` in the connector configuration, we will enforce that the tinyint is either 1 or 0 and return true/false accordingly.                                                                                               |
| TINYINT            | INTEGER            | True               | In all other cases, the destination type for TINYINT columns will be INTEGER. If the width isn't specified to be exactly 1 (either no specification or a value other than 1), the destination type will be INTEGER, even if the column contains only 1s or 0s. |
| TINYTEXT           | STRING             | True               |
| UNSIGNED BIGINT    | BIGDECIMAL         | True               |
| UNSIGNED INT       | LONG               | True               |
| UNSIGNED SMALLINT  | INTEGER            | True               |
| VARCHAR            | STRING             | True               |
| VARBINARY          | BINARY             | True               |
| YEAR               | INTEGER            | True               |

{% callout type="note" %} If the connector is missing an important data type that you need, please [contact us](/contact). {% /callout %}

In some cases, when loading data into your destination, the connector may need to convert Fivetran data types into data types supported by the destination. For more information, see the [individual data destination pages](https://fivetran.com/docs/destinations).

### Unparsable values

When the connector encounters [an unparsable value](/docs/databases/mysql#unparsablevalues) of one of the following data types, the connector substitutes it with a default value. The default value the connector uses depends on whether the unparsable value is in a primary key column or non-primary key column:

| MySQL Type | Primary Key Value    | Non-Primary Key Value |
| ---------- | -------------------- | --------------------- |
| DATE       | 1970-01-01           | null                  |
| DATETIME   | 1970-01-01T00:00:00  | null                  |
| TIMESTAMP  | 1970-01-01T00:00:00Z | null                  |

Although we may be able to read some values outside the supported DATE, DATETIME, and TIMESTAMP ranges as defined by [MySQL's documentation](https://dev.mysql.com/doc/refman/8.0/en/datetime.html), there is no guarantee. Additionally, the special zero value 0000-00-00 00:00:00 is subject to this rule.

### Excluding source data

If you don’t want to sync all the data from your database, you can exclude schemas, tables, or columns from your syncs on your Fivetran dashboard. To do so, go to your connector details page and uncheck the objects you want to omit from syncing. For more information, see the [Fivetran column Blocking documentation](https://fivetran.com/docs/getting-started/features/column-blocking-hashing).

## Initial sync

When Fivetran connects to a new database, the connector first copies all rows from every table in every schema for which we have `SELECT` permission (except those you have excluded in your Fivetran dashboard) and add [Fivetran-generated columns](https://fivetran.com/docs/databases/mysql#fivetrangeneratedcolumns). Tables are copied in ascending size order (from smallest to largest). The connector copies rows by performing a `SELECT` statement on each table. For large tables, we copy a limited number of rows at a time so that we don't have to start the sync again from the beginning if our connection is lost midway.

The duration of initial syncs can vary depending on the number and size of tables to be imported. We, therefore, interleave incremental updates with the table imports during the initial sync.

## Updating data

Fivetran performs incremental updates of any new or modified data from your source database. The connector uses Vitess's inbuilt VStream VGtids, which allows Fivetran to update only the data that has changed since our last sync.

### Deleted rows

The connector does not delete rows from the destination. It handles deletes as part of streaming changes from VStream. Note: We only process `DELETE` events from the stream.

### Deleted columns

The connector does not delete columns from your destination. When a column is deleted from the source table, it replaces the existing values in the corresponding destination column with `NULL` values.

### Adding and dropping columns

When you add or drop a column, the connector attempts to migrate your destination schema to the new table structure automatically. In some cases, it will be unable to do this and instead perform an automatic re-sync of the changed table.

In the following scenarios, Fivetran will re-sync your table instead of automatically migrating it:

- Changing column order
- Changing primary keys
- Modifying `ENUM` or `SET` columns

## PlanetScale billing

PlanetScale Connect is available on all our [free and paid plans](/docs/concepts/billing#planetscale-plans).

Every Fivetran connection sync will count toward [your plan's `rows read`](/docs/concepts/billing#planetscale-plans). When setting up your connection, ensure you know the impact on `rows read`.
