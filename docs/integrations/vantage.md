---
title: 'Vantage integration'
subtitle: 'View and optimize your PlanetScale costs with Vantage.'
date: '2024-01-23'
meta:
  title: 'Cloud cost observability and optimization with Vantage'
  description: 'Use the Vantage integration to visualize PlanetScale alongside your other infrastructure providers for a single-pane-of-glass view of your costs.'
---

With [Vantage](https://www.vantage.sh/), you can set up [PlanetScale cost management](https://vantage.sh/integrations/planetscale) to report on PlanetScale costs alongside other infrastructure providers, such as AWS or GCP. After integrating, you can create [cost reports](https://docs.vantage.sh/cost_reports) to break down costs per database and branch.

Beyond reporting, set up budget alerts, forecast usage, and view active database costs in Vantage. Vantage connects to your PlanetScale organizations using an OAuth flow.

## Prerequisites

- The [Organization Admin role](/docs/concepts/access-control) in PlanetScale
- A [Vantage account](https://console.vantage.sh/signup)

{% callout type="note" %}
Database cost reporting in Vantage is not available for [PlanetScale Managed](docs/enterprise/managed/overview) customers via the integration.
{% /callout %}

## Configure the Vantage integration

1. From the Vantage console, navigate to the [Integrations page](https://console.vantage.sh/settings/integrations).
2. Select **PlanetScale**, then click **Connect PlanetScale Account**.
3. The PlanetScale login screen is displayed. Log in to your PlanetScale account and select the organizations you want to connect with.
4. Click **Authorize access**.
5. On the [PlanetScale Settings](https://console.vantage.sh/settings/planetscale/) page in Vantage, you should see the status of your connection change to **Importing**.

Costs will be ingested and processed in Vantage once you add the integration. It typically takes less than 15 minutes to ingest PlanetScale costs. The costs will be available on your **All Resources** Cost Report in Vantage as soon as they are processed.

{% callout type="note" %}
PlanetScale data refreshes daily in Vantage.
{% /callout %}

## View PlanetScale costs in Vantage

In Vantage, you can create cost reports to drill down into your costs. Vantage displays PlanetScale costs by Organization, Service, Category, and Resource.

![Image of a PlanetScale Cost Report in Vantage showing costs per database](/assets/docs/integrations/vantage/vantage-console.png)

In the graphic above, PlanetScale costs are grouped by database for the month. For complete cost reporting dimensions and more information, see the [PlanetScale documentation](https://docs.vantage.sh/connecting_planetscale) for Vantage.

## Billing

The Vantage integration is available on all our [plans](/docs/concepts/billing#planetscale-plans).
