---
title: 'Cloudflare Workers Database Integration'
subtitle: 'Use the Cloudflare Database Integration feature to automatically connect Workers to your PlanetScale database'
date: '2023-06-21'
---

## Introduction

[Cloudflare Workers Database Integrations](https://developers.cloudflare.com/workers/learning/integrations/databases/#planetscale) is designed to connect your Cloudflare Workers to data sources automatically by generating connection strings and storing them in the worker's secrets.

This article will utilize a sample repository that is a preconfigured Cloudflare Worker you can use to deploy to your Cloudflare account.

## Prerequisites

- [NodeJS](https://nodejs.org) installed
- A [PlanetScale account](https://auth.planetscale.com/sign-up)
- The [PlanetScale CLI](https://github.com/planetscale/cli)
- A [Cloudflare account](https://www.cloudflare.com)

## Set up the database

1. Create a database in your PlanetScale account named `bookings_db`.

```bash
pscale database create bookings_db
```

2. Connect to the `main` branch of the new database.

```bash
pscale shell bookings_db main
```

3. Run the following commands to create a table in the database and populate it with some data.

```sql
CREATE TABLE hotels (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL,
  stars FLOAT(2) UNSIGNED
);

INSERT INTO hotels (name, address, stars) VALUES
  ('Hotel California', '1967 Can Never Leave Ln, San Fancisco CA, 94016', 7.6),
  ('The Galt House', '140 N Fourth St, Louisville, KY 40202', 8.0);
```

## Deploy the Cloudflare Worker

1. Clone the sample repository.

```sh
git clone https://github.com/planetscale/cloudflare-workers-quickstart.git
```

2. Navigate to the `worker` folder of the repository and install the dependencies.

```sh
cd cloudflare-workers-quickstart/worker
npm install
```

3. Deploy the Worker to your Cloudflare account.

```sh
npx wrangler publish
```

## Configure the Cloudflare PlanetScale Integration

1. Log into the Cloudflare dashboard and navigate to **"Workers"** > **"Overview"**. You should see a service in the list named **"planetscale-worker"**. Select it from the list.

![PlanetScale Cloudflare integration wizard - step 1](/assets/docs/integrations/cloudflare-workers/CleanShot_2023-05-16_at_11.52.48.png)

2. Select the **"Settings"** tab, then **"Integrations"**, and finally **"Add Integration"** in the PlanetScale card.

![PlanetScale Cloudflare integration wizard - step 2](/assets/docs/integrations/cloudflare-workers/CleanShot_2023-05-16_at_11.51.19.png)

3. Click **"Accept"** under **Review and grant permissions** to allow the wizard to write the database connection details to the Worker secrets.

![PlanetScale Cloudflare integration wizard - step 3](/assets/docs/integrations/cloudflare-workers/CleanShot_2023-05-16_at_11.55.06.png)

4. Under **Connect to PlanetScale**, click **"Connect"** to start the process of connecting your PlanetScale and Cloudflare accounts.

![PlanetScale Cloudflare integration wizard - step 4](/assets/docs/integrations/cloudflare-workers/CleanShot_2023-05-16_at_11.56.11.png)

5. A modal will appear allowing you to grant access to your organization, database, and branch. Start by selecting your organization from the list. This demonstration uses an organization named “ps-deved”.

![PlanetScale Cloudflare integration wizard - step 5](/assets/docs/integrations/cloudflare-workers/CleanShot_2023-05-16_at_11.59.44.png)

6. Select the “bookings_db” database from the list in the **Databases** card, and the “main” branch from the list in the **Branches** card. Finally, click **"Authorize access"**.

![PlanetScale Cloudflare integration wizard - step 6](/assets/docs/integrations/cloudflare-workers/CleanShot_2023-05-16_at_12.00.34.png)

7. Select your organization again from the list and click **"Continue"**.

![PlanetScale Cloudflare integration wizard - step 7](/assets/docs/integrations/cloudflare-workers/CleanShot_2023-05-16_at_12.01.32.png)

8. Select your database and the [user role](/docs/concepts/password-roles) you want the integration to have.

![PlanetScale Cloudflare integration wizard - step 8](/assets/docs/integrations/cloudflare-workers/CleanShot_2023-05-16_at_12.02.29.png)

9. Select the “main” branch from the list and click **"Continue"**.

![PlanetScale Cloudflare integration wizard - step 9](/assets/docs/integrations/cloudflare-workers/CleanShot_2023-05-16_at_12.03.07.png)

10. You’ll be given the option to rename the secrets that will be configured on your behalf. These can be left as is. Click **"Add Integration"** to complete the process.

![Untitled](/assets/docs/integrations/cloudflare-workers/CleanShot_2023-05-16_at_13.33.05.png)

## Test the integration

Back in the overview of the Worker, there is a preview URL that you can use to open a new tab in your browser that runs the Worker and displays the results. Once you’ve located the preview URL, click it to test the Worker.

![CleanShot 2023-05-16 at 13.03.41.png](/assets/docs/integrations/cloudflare-workers/CleanShot_2023-05-16_at_13.03.41.png)

Once the integration is configured, you can also run the project on your computer using:

```sh
npx wrangler dev
```

This will automatically use the secrets defined in Cloudflare to run the Worker on your computer.

### Test other database operations (optional)

To test other database operations that are mapped to HTTP methods, you may use the provided `tests.http` file which is designed to work with the [VSCode REST client plugin](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). The file is preconfigured to work with the local environment, or you can change the `@host` variable to match the URL provided in the Cloudflare dashboard that cooresponds with your Worker project.

| Method      | Operation                 |
| ----------- | ------------------------- |
| GET /       | Get a list of all hotels. |
| POST /      | Create a hotel.           |
| PUT /:id    | Update a hotel.           |
| DELETE /:id | Delete a hotel.           |

## What's next?

Once you're done with development, it is highly recommended that [safe migrations](/docs/concepts/safe-migrations) be turned on for your `main` production branch to protect from accidental schema changes and enable zero-downtime deployments.

When you're ready to make more schema changes, you'll [create a new branch](/docs/concepts/branching) off of your production branch. Branching your database creates an isolated copy of your production schema so that you can easily test schema changes in development. Once you're happy with the changes, you'll open a [deploy request](/docs/concepts/deploy-requests). This will generate a diff showing the changes that will be deployed, making it easy for your team to review.

Learn more about how PlanetScale allows you to make [non-blocking schema changes](/docs/concepts/nonblocking-schema-changes) to your database tables without locking or causing downtime for production databases.
