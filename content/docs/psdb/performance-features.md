---
title: 'Performance features'
---

# Performance features of PlanetScaleDB

This document provides an overview of the performance features of PlanetScaleDB.

## Query rewriting

Some SQL queries are inefficient to execute at the database layer due to missing indexes or small logic mistakes. These toxic queries can cause severe enough performance impacts to bring down your application. Vitess kills and rewrites dangerous queries to protect database performance. For example, Vitess adds limits to your OLTP queries, reducing the number of full table scans. Vitess also protects your database from hot queries by reusing results and preventing identical requests from hitting your database at the same time. Because your PlanetScale database is built on Vitess, your database has these features as well.

## Query de-duplication

PlanetScaleDB protects your database from "hot" or duplicate queries by reusing results, so that multiple identical requests do not reach your database simultaneously.

## Connection Pooling

Standard MySQL memory usage is fairly unpredictable; uncontrolled memory allocations may require configuring connection buffers or overprovisioning memory to avoid performance failures. Instead of opening a new thread for every connection to the database, Vitess maps its lightweight connections to a small set of MySQL connections to efficiently support a larger number of client connections. PlanetScale Database takes advantage of Vitess connection pooling by default.
