---
title: 'Debezium connector for PlanetScale'
subtitle: 'Learn how to set up the Debezium connector for PlanetScale.'
date: '2024-10-28'
---

The Debezium connector for PlanetScale is a connector for [Debezium](https://debezium.io/), an open-source distributed platform for change data capture. This connector is a fork of the 2.4.x release of the [Debezium connector for Vitess](https://debezium.io/documentation/reference/stable/connectors/vitess.html).

This documentation shows you how to set up the Debezium connector for PlanetScale. This will allow you to get the `debezium-server` running on your machine, connect to PlanetScale, and send messages to a webhook endpoint.

## Install Java

1. First, you’ll need the Java Development SDK installed on your machine. You can find this at [https://www.oracle.com/java/technologies/downloads/\#jdk22-mac](https://www.oracle.com/java/technologies/downloads/#jdk22-mac).

## Running standalone in Debezium Server

[Debezium Server](https://debezium.io/documentation/reference/stable/operations/debezium-server.html) is a standalone application that can test a Debezium connector end-to-end by hosting the Debezium core as an in-process library and pass data from the source to the sink.

1. Download Debezium Server from the [distribution link](https://repo1.maven.org/maven2/io/debezium/debezium-server-dist/2.4.1.Final/debezium-server-dist-2.4.1.Final.tar.gz).
2. Create a directory on your machine where you want to run it.
3. Move the download to that directory.
4. Extract it by running `tar -xvf <path to file>`
5. You’ll now have a `debezium-server` directory.
6. `cd debezium-server`
7. Create a `data` folder.
8. Download the JAR with dependencies for the `debezium-vitess-planetscale` from [GitHub](https://github.com/planetscale/debezium-connector-planetscale/releases/download/v2.4.0.Final.PS20241031.1/debezium-connector-planetscale-2.4.0.Final-jar-with-dependencies.jar), and place in `lib/`.

### Configure the Debezium connector for PlanetScale

Create a file `conf/application.properties`. This is where your config will go.

In this example config, we are going to have the sink send HTTP requests to `webhook.site`.

Go to [`http://webhook.site`](http://webhook.site) to get your own endpoint.

Place the sample config below in `conf/application.properties`, replacing the following placeholders:

- `<webhook>` with your webhook.site endpoint.
- `<planetscale-database-name>` with your PlanetScale database name.
- `<planetscale-hostname>` with your PlanetScale connection string hostname.
- `<planetscale-username>` with your PlanetScale connection string username.
- `<planetscale-password>` with your PlanetScale connection string password.

```java
debezium.sink.type=http
quarkus.log.level=DEBUG
debezium.format.value=json
debezium.sink.http.url=<webhook>
log4j.logger.io.debezium.relational.history=DEBUG, stdout
debezium.source.offset.storage.file.filename=data/offsets.dat
debezium.source.offset.flush.interval.ms=0
debezium.source.schema.history.internal=io.debezium.storage.file.history.FileSchemaHistory
debezium.source.schema.history.internal.file.filename=data/schema_history.dat
debezium.source.connector.class=io.debezium.connector.planetscale.PlanetScaleConnector
debezium.source.vitess.keyspace=<planetscale-database-name>
debezium.source.vitess.tablet.type=MASTER
debezium.source.database.hostname=<planetscale-hostname>
debezium.source.database.port=443
debezium.source.database.user=<planetscale-username>
debezium.source.database.password=<planetscale-password>
debezium.source.topic.prefix=connector-test
```

## Run it

Once the config is set, you can start it by running `./run.sh`

Any existing rows in any table of `<planetscale-database-name>` will show up as events in your `webhook.site` endpoint. Adding/modifying/deleting rows will also show up as events in your endpoint.
