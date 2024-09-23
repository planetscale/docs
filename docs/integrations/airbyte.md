---
title: 'Airbyte integration'
subtitle: 'Extract, load, and transform your PlanetScale data with Airbyte.'
date: '2024-09-23'
meta:
  title: 'Connect with Airbyte ELT'
---

With PlanetScale Connect, you can extract data from your PlanetScale database and safely load it into other destinations for analysis, transformation, and more.

We implemented an [Airbyte](https://airbyte.com/) connector as the pipeline between your PlanetScale source and selected destination. This document will walk you through how to connect your PlanetScale database to Airbyte.

## Connect to Airbyte

Only [Airbyte Open Source](https://docs.airbyte.com/quickstart/deploy-airbyte) supports the PlanetScale data source. In this section, you'll learn how to set up Airbyte and connect your PlanetScale source.

### Requirements

- A PlanetScale database
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Docker terms apply)

### Set up Airbyte locally

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. Clone the Airbyte repo and run the startup script:

   ```bash
   git clone https://github.com/airbytehq/airbyte.git
   cd airbyte
   ./run-ab-platform.sh
   ```

3. Open Airbyte in the browser at [http://localhost:8000](http://localhost:8000).
   The default username and password are `airbyte` and `password` respectively.

### Set up PlanetScale source

Now that Airbyte is running locally, let's set up the custom PlanetScale source.

1. In the Airbyte dashboard, click "**Settings**" on the bottom left.
2. Click "**Sources**" on the left sidebar.
3. Click the "**New connector**" button.
4. Click the "**Add a new Docker connector**" option.
5. Fill in the connector values as follows:
   - **Connector display name**: PlanetScale
   - **Docker repository name**: planetscale/airbyte-source
   - **Docker image tag**: `latest`
   - **Connector Documentation URL**: https://planetscale.com/docs/integrations/airbyte

You can find the [PlanetScale Airbyte Source Dockerhub release page here](https://hub.docker.com/r/planetscale/airbyte-source).

![Airbyte new PlanetScale connector](/assets/docs/integrations/airbyte/modal.png)

### Fill in PlanetScale connection information

You're now ready to connect your PlanetScale database to Airbyte.

1. Click on the database and branch you want to connect to.
2. Click "**Connect**", select "**General**" from the "**Connect with**" dropdown.
3. Leave this tab open, as you'll need to copy these credentials shortly.
4. Back in Airbyte, click "**Sources**" in the main left sidebar > "**New source**".
5. Select the new PlanetScale source you created from the dropdown.
6. Fill in the "**Set up the source**" values as follows:
   - **Name**: Any name of your choice
   - **Source type**: Select "PlanetScale"
   - **Host**: Paste in the copied value for `host`
   - **Database**: Paste in the copied value for `database`
   - **Username**: Paste in the copied value for `username`
   - **Password**: Paste in the copied value for `password`
     ![Airbyte - PlanetScale source setup](/assets/docs/integrations/airbyte/db-info.png)
7. You can also provide some optional values:
   - **Replicas**: Select whether or not you want to collect data from replica nodes.
   - **Shards**: Map your shards.
   - **Starting GTIDs**: Start replication from a specific GTID per keyspace shard.
     ![Airbyte - PlanetScale optional setup](/assets/docs/integrations/airbyte/optional.png)
     You can see the [PlanetScale airbyte-source README](https://github.com/planetscale/airbyte-source/blob/main/README.md) for more details on these options.
8. Click "**Set up source**" to connect.

You should get a success message that the connection test passed.

### Choose your destination

With the connection complete, you can now choose your destination.

1. Click "**Destinations**" in the sidebar or the "**New destination**" button on the source connection page.
2. Set up the destination you want to sync your data to.

Each destination should have a Setup Guide linked on its destination setup page.

### Configure a connection

Now to get the connection fully set up.
Click on "Connections" on the left side bar.
If you have not yet set up any connectors, you should see this:

![Airbyte - New connection](/assets/docs/integrations/airbyte/create.png)

Click the button to set up a connection.
Otherwise, click "**New Connection**" in the top right corner.
From here, follow these steps:

1. On the "**Define source**" page, choose your PlanetScale source as the **source**.
   ![Airbyte - Source](/assets/docs/integrations/airbyte/source.png)
2. On the "**Define destination**" page, select the **destination** you want to sync your PlanetScale data to.
   For this demo, we are using a CSV destination.
   ![Airbyte - Source](/assets/docs/integrations/airbyte/destination.png)
3. On the "**Select streams**" page, select a sync mode.
   ![Airbyte - Source](/assets/docs/integrations/airbyte/streams.png)
4. Also on this page, you will need to select the specific tables and columns you want to sync. For each, choose what type of sync mode you'd like to use for each source table.
   ![Airbyte - Sync](/assets/docs/integrations/airbyte/sync.png)
   - **Incremental** — Incremental sync pulls _only_ the data that has been modified/added since the last sync. We use [Vitess VStream](https://vitess.io/docs/concepts/vstream/) to track the stopping point of the previous sync and only pull any changes since then.
   - **Full refresh** — Full refresh pulls _all_ data at every scheduled sync frequency. This will lead to a higher rows read count than Incremental sync. For more information, see the [billing section of this doc](#billing).
5. On the "**Configure connection**" page, choose a sync frequency, which is how often we will connect to your PlanetScale database to download data.
   ![Airbyte - Connection ](/assets/docs/integrations/airbyte/connection.png)
6. Click "**Finish and sync**".

Everything is now configured to pull your PlanetScale data into Airbyte and sync it to the selected destination on the schedule you chose. To run the connection, click "**Connections**" > "**Launch**".

## Handling schema changes

Airbyte will not automatically detect when you make schema changes to your PlanetScale database. If you drop a column, your sync should throw an error as it looks for a column that doesn't exist. However, if you add a column, the sync will continue without any errors. Airbyte will be unaware of the new column altogether. This is known as schema drift.

Whenever you perform a schema change, you need to notify Airbyte of it:

1. In the Airbyte dashboard, click "**Connections**", select the connection, then navigate to the "**Schema**" tab.
2. Click "**Refresh source schema**".
3. Click "**Save changes**". Keep in mind, this might delete all data for the connection and start a new sync from scratch.

## Billing

PlanetScale Connect is available on all of our [plans](/docs/concepts/billing#planetscale-plans).

Every Airbyte connection sync will count toward [your plan's `rows read`](/docs/concepts/billing#planetscale-plans). When setting up your connection, make sure you're aware of the impact on `rows read`, and choose [a synchronization schedule](#choose-your-sync-frequency) that you're comfortable with.

## Stopping Airbyte

At any point, you can disable any incremental or full syncs by going to the 'Connection' settings page and clicking 'Delete this connection'. This will not touch any of the source or destination data, but will prevent Airbyte from doing any further operations.

![Airbyte - PlanetScale disconnection](/assets/docs/integrations/airbyte/delete.png)
