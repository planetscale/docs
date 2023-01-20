---
title: 'PlanetScale Connect - Airbyte'
subtitle: 'Extract, load, and transform your PlanetScale data with Airbyte.'
date: '2022-08-26'
meta:
  title: 'Connect with Airbyte ELT'
---

With the PlanetScale Connect (beta), you can extract data from your PlanetScale database and safely load it into other destinations for analysis, transformation, and more.

We implemented an [Airbyte](https://airbyte.com/) connector as the pipeline between your PlanetScale source and selected destination. This document will walk you through how to connect your PlanetScale database to Airbyte.

{% callout %}
PlanetScale Connect is currently in beta. To generate a working connection string, you must opt into the beta.
{% /callout %}

## Connect to Airbyte

Only [Airbyte Open Source](https://docs.airbyte.com/quickstart/deploy-airbyte) supports the PlanetScale data source. In this section, you'll learn how to set up Airbyte and connect your PlanetScale source.

### Requirements

- A PlanetScale database
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Docker terms apply)

### Set up Airbyte locally

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. Clone the Airbyte repo and run Docker:

```bash
git clone https://github.com/airbytehq/airbyte.git
cd airbyte
docker-compose up
```

3. Open Airbyte in the browser at [http://localhost:8000](http://localhost:8000).

### Set up PlanetScale source

Now that Airbyte is running locally, let's set up the custom PlanetScale source.

1. In the Airbyte dashboard, click "**Settings**" on the bottom left.
2. Click "**Sources**" on the left sidebar.
3. Click the "**New connector**" button.
4. Fill in the connector values as follows:

- **Connector display name**: PlanetScale
- **Docker repository name**: planetscale/airbyte-source
- **Docker image tag**: `latest`
- **Connector Documentation URL**: https://planetscale.com/docs/integrations/airbyte

You can find the [PlanetScale Airbyte Source Dockerhub release page here](https://hub.docker.com/r/planetscale/airbyte-source).

![Airbyte new PlanetScale connector](/docs/integrations/airbyte/connector.png)

### Fill in PlanetScale connection information

You're now ready to connect your PlanetScale database to Airbyte.

1. In the PlanetScale dashboard, head to the organization Settings page by clicking your organization > "**Settings**" > "**Beta features**" (`https://app.planetscale.com/~/settings/beta-features`).
2. Find and click the "**Enroll this organization in the Connect beta**" checkbox and save your changes.
3. Click on the database and branch you want to connect to.
4. Click "**Connect**", select "**General**" from the "**Connect with**" dropdown.
5. Leave this tab open, as you'll need to copy these credentials shortly.
6. Back in Airbyte, click "**Sources**" in the main left sidebar > "**New source**".
7. Select the new PlanetScale source you created from the dropdown.
8. Fill in the "**Set up the source**" values as follows:

- **Name**: Any name of your choice
- **Source type**: Select "PlanetScale"
- **Host**: Paste in the copied value for `host`
- **Database**: Paste in the copied value for `database`
- **Username**: Paste in the copied value for `username`
- **Password**: Paste in the copied value for `password`
- **Shards**: Sharding is only supported on our Enterprise plan. Please [reach out to us](/contact) for more information.

![Airbyte - PlanetScale source setup](/docs/integrations/airbyte/source.png)

9. Click "**Set up source**" to connect.

You should get a success message that the connection test passed.

### Choose your destination

With the connection complete, you can now choose your destination.

1. Click "**Destinations**" in the sidebar or the "**New destination**" button on the source connection page.
2. Set up the destination you want to sync your data to.

Each destination should have a Setup Guide linked on its destination setup page.

### Choose your sync frequency

Next, you need to choose how often you want to sync your PlanetScale data to this destination.

1. Choose your PlanetScale source as the "**Source connector**".
2. Select the destination you want to sync your PlanetScale data to.
3. Choose a sync frequency, which is how often we will connect to your PlanetScale database to download data.

![Airbyte - PlanetScale replication frequency](/docs/integrations/airbyte/replication-frequency.png)

{% callout %}
**Important:** The sync frequency will affect your PlanetScale billing. The rows read during sync are
counted toward your database rows read, so if you choose "Full refresh", you will be billed for full table reads of
all tables selected every time the sync runs.

You can find more information about your plan's read limits in our
[Billing documentation](/docs/concepts/billing#planetscale-plans).
{% /callout %}

4. Choose the Destination Namespace configuration from the dropdown. This is where the data will be stored in the destination.
5. _(Optional)_ Choose your destination stream prefix.
6. Select the data you want to sync. You should see a list of table names. You can select all or choose which ones to sync individually.
7. Choose what type of sync mode you'd like to use for each source table.

- **Incremental** &mdash; Incremental sync pulls _only_ the data that has been modified/added since the last sync. We use [Vitess VStream](https://vitess.io/docs/13.0/concepts/vstream/) to track the stopping point of the previous sync and only pull any changes since then.
- **Full refresh** &mdash; Full refresh pulls _all_ data at every scheduled sync frequency. This will lead to a higher rows read count than Incremental sync. For more information, see the [billing section of this doc](#billing).

![Airbyte - PlanetScale stream sync](/docs/integrations/airbyte/streams.png)

8. Click "**Set up connection**".

Everything is now configured to pull your PlanetScale data into Airbyte and sync it to the selected destination on the schedule you chose. To run the connection, click "**Connections**" > "**Launch**".

## Handling schema changes

Airbyte will not automatically detect when you make schema changes to your PlanetScale database. If you drop a column, your sync should throw an error as it looks for a column that doesn't exist. However, if you add a column, the sync will continue without any errors. Airbyte will be unaware of the new column altogether. This is known as schema drift.

Whenever you perform a schema change, you need to notify Airbyte of it:

1. In the Airbyte dashboard, click "**Destinations**" > "**Settings**".
2. Click "**Refresh source schema**".
3. Click "**Save changes and reset data**". Keep in mind, this will delete all data for the connection and start a new sync from scratch.

## Billing

PlanetScale Connect is available on all of our [free and paid plans](/docs/concepts/billing#planetscale-plans) during the beta period.

Every Airbyte connection sync will count toward [your plan's `rows read`](/docs/concepts/billing#planetscale-plans). When setting up your connection, make sure you're aware of the impact on `rows read`, and choose [a synchronization schedule](#choose-your-sync-frequency) that you're comfortable with.

## Stopping Airbyte

At any point, you can disable any incremental or full syncs by going to the 'Connection' settings page and clicking 'Delete this connection'. This will not touch any of the source or destination data, but will prevent Airbyte from doing any further operations.

![Airbyte - PlanetScale disconnection](/docs/integrations/airbyte/disconnect.png)
