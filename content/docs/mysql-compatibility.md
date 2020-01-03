---
title: 'MySQL compatibility'
category: 'reference'
---

# MySQL compatibility

This document contains information about the compatibility of the PlanetScale CNDb with MySQL features.

## PlanetScale CNDb supports most MySQL features

The PlanetScale CNDb database supports most MySQL features, including standard SQL statements and MySQL-specific commands. In general, you can issue queries against your database as if it were a MySQL database.

## Limitations

The PlanetScale CNDb uses [Vitess](https://vitess.io) to scale your database. This means that the PlanetScale CNDb only supports the same set of MySQL features as the latest version of Vitess.

To learn about what MySQL features Vitess supports, see [the Vitess documentation](https://vitess.io/docs/reference/mysql-compatibility/).

