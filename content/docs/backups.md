---
title: 'Backups'
category: 'concepts'
---

# Backups

This document explains the basic ideas behind backups in the PlanetScale CNDb context.

## Backups are inactive copies of your data

In the context of your PlanetScale CNDB, a **backup** is a copy of data in your [database](databases).

Unlike a [replica](replicas) or a [read-only instance](read-only-instances), a backup does not serve data in response to queries. 

## Backups are frequent and temporary

PlanetScale backs up your database automatically every 12 hours.

PlanetScale keeps each backup for 72 hours.

For custom backup requests, please contact <support@planetscale.com>.

## Each shard has its own backup

If your database uses [sharding](sharding-schemes), each backup contains data from a single shard. All shards are backed up at 12-hour intervals, but the point in time at which each shard backup occurs may vary across shards in a database.

If your database is not sharded, each backup contains all of the data from your database.

## PlanetScale validates your backups

When your backup status is **Validated**, it means that an automated test job has restored an empty replica from that backup, started it, and resumed replication from the master.

## You can access your backups from the console

You can [view your backups and use them to restore your database](restoring-backups) from the PlanetScale console at any time.
