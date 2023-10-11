---
title: 'Data Branching®'
subtitle: 'Create a development or staging environment for your database pre-seeded with data and schema'
date: '2022-07-22'
---

## Overview

The PlanetScale Data Branching® feature (beta) allows you to create isolated copies of your database that include both the schema and data. This differs from our [regular branching feature](/docs/concepts/branching), which only includes the schema.

This feature is only available for organizations on the [`Scaler Pro`](/pricing) plan.

{% callout %}
The Data Branching® feature is currently in beta.
{% /callout %}

## Enable the Data Branching® feature for your database.

Before you can use the feature, you have to enable it in your database settings page.

1. Navigate to the database that you'd like to enable.
2. Click on the "**Settings**" link in the header navigation bar.
3. Scroll to the option with the text "**Enable Data Branching®**"
4. Enable this option and click "**Save database settings**".

{% vimeo aspect="other" src="https://player.vimeo.com/video/830595378" caption="Demonstration of how to enable the Data Branching® feature" /%}

## Create a development branch with data & schema from the Base branch

1. After enabling the Data Branching feature, navigate to the overview page of the database.
2. Clicking on "**New Branch**" should now offer an option to select "**Seed Data**".

   - **None** &mdash; Creates a database branch with only the **schema** copied to the new branch.
   - **From most recent backup** &mdash; Creates a database branch with both the **schema and data** from the latest backup of the Base branch.

   ![PlanetScale dashboard new branch dialog with seed option](/assets/docs/concepts/data-branching/branch.jpg)

3. Once you've selected an option, click "**Create branch**" to create a new branch.

{% vimeo aspect="other" src="https://player.vimeo.com/video/830572488" caption="Demonstration of how to create a PlanetScale branch with data" /%}

### FAQ

1. **Can I pick which backup is used for the new branch?**

   PlanetScale picks the latest backup so that your new branch has the latest dataset to work with.

2. **Can I pick which tables are copied into the new branch?**

   PlanetScale seeds the new branch with **all the schema & data** from the base branch.
   We do not offer a way to filter out data or schema when creating a new branch.

3. **Is data in the new branch kept up to date with changes to the base branch?**

   PlanetScale does not provide data syncing between a production branch and a development branch.

4. **When I merge my deploy request, will any data changes be merged back to the base branch?**

   PlanetScale does not provide data syncing between a production branch and a development branch.

5. **Will enabling the Data Branching® feature affect my billing?**

   PlanetScale will bill for the data inside of the new branch as part of your [overall database's plan](/docs/concepts/billing#planetscale-plans). In this way, it is no different than if you filled the branch up manually.
