---
title: 'Set up PlanetScale Managed in GCP'
subtitle: 'Learn how to set up PlanetScale Managed within a GCP project.'
label: 'Enterprise'
date: '2023-11-07'
---

## Overview

The following guide will walk you through setting up a PlanetScale Managed cluster in your Google Cloud Platform (GCP) organization. If you have any questions while working through this documentation, contact your PlanetScale Solutions Engineer for assistance.

{% callout type="note" %}
This guide is only intended for PlanetScale Managed customers currently working with the PlanetScale team. You cannot set PlanetScale Managed up on your own without PlanetScale enabling it for your organization. If you are interested in [PlanetScale Managed](/docs/enterprise/managed/overview), please [contact us](/contact).
{% /callout %}

## Step 1: Account requirements

A new GCP project must be set up following this documentation to successfully bootstrap a new PlanetScale Managed cluster. To proceed with this guide, an existing GCP organization and an active Cloud Billing account are required.

Further information on creating GCP organizations can be found in the [creating and managing organization resources documentation](https://cloud.google.com/resource-manager/docs/creating-managing-organization).

## Dedicated GCP project

PlanetScale Managed requires the use of a standalone project in GCP. This project should not have any existing resources running within it, as PlanetScale will request a set of permissions as defined in step 2.

## Modification of accounts

Once the GCP project is handed over to PlanetScale via granting IAM permissions, it should not be modified. Issues caused by modifications of the GCP project or its resources void the PlanetScale Managed SLA. Contact <support@planetscale.com> to discuss configuration changes or customization.

## Step 2: Bootstrap GCP project

Before setting up the IAM roles, you must create a new GCP project, assign it to a GCP Billing Account, and enable the Compute Engine API.

### Create a new GCP project

A new GCP project can be created via the command line if the [gcloud](https://cloud.google.com/sdk/docs/install) SDK is installed and configured:

```shell
gcloud projects create <project-name>
```

Projects can also be created through the [GCP console](https://console.cloud.google.com/projectcreate).

Further information on creating GCP projects is available in the [Google Cloud Resource Manager documentation](https://cloud.google.com/resource-manager/docs/creating-managing-projects).

### Assign the new project to a GCP Billing Account

Next, assign the new project to a GCP Billing Account inside your organization. The account to use will depend on your organization and its policies.

{% callout type="note" %}
If the user who created the project has the Billing Administrator role, the project may already have billing enabled. Please review the settings to ensure it is attached to the intended Billing Account.
{% /callout %}

Further information on assigning projects to Billing Accounts is available [here](https://cloud.google.com/billing/docs/how-to/modify-project).

### Enable Compute Engine API

The Compute Engine API must be enabled on the new project. This can be done via the command line:

```shell
gcloud services enable compute.googleapis.com --project "<project-name>"
```

Further information on enabling an API is available [here](https://cloud.google.com/apis/docs/getting-started#enabling_apis).

### Assign IAM Roles

For PlanetScale to provision resources in the project, the following IAM roles must be granted to the following service accounts:

- `terraform-planner@planetscale-operations.iam.gserviceaccount.com` service account:

  - `roles/viewer` - Viewer

- `terraform-runner@planetscale-operations.iam.gserviceaccount.com` service account:
  - `roles/cloudkms.admin` - Cloud KMS Admin
  - `roles/compute.admin` - Compute Admin
  - `roles/container.admin` - Kubernetes Engine Admin
  - `roles/container.clusterAdmin` - Kubernetes Engine Cluster Admin
  - `roles/iam.roleAdmin` - IAM Role Admin
  - `roles/iam.securityAdmin` - Security Admin
  - `roles/iam.serviceAccountAdmin` - Service Account Admin
  - `roles/iam.serviceAccountKeyAdmin` - Service Account Key Admin
  - `roles/logging.admin` - Logging Admin
  - `roles/serviceusage.serviceUsageAdmin` - Service Usage Admin
  - `roles/storage.admin` - Storage Admin
  - `roles/viewer` - Viewer

These can be assigned using the `gcloud` command line tool:

```shell
gcloud projects add-iam-policy-binding "<project-name>" --member serviceAccount:terraform-planner@planetscale-operations.iam.gserviceaccount.com --role roles/viewer
gcloud projects add-iam-policy-binding "<project-name>" --member serviceAccount:terraform-runner@planetscale-operations.iam.gserviceaccount.com --role roles/cloudkms.admin
gcloud projects add-iam-policy-binding "<project-name>" --member serviceAccount:terraform-runner@planetscale-operations.iam.gserviceaccount.com --role roles/compute.admin
gcloud projects add-iam-policy-binding "<project-name>" --member serviceAccount:terraform-runner@planetscale-operations.iam.gserviceaccount.com --role roles/container.admin
gcloud projects add-iam-policy-binding "<project-name>" --member serviceAccount:terraform-runner@planetscale-operations.iam.gserviceaccount.com --role roles/container.clusterAdmin
gcloud projects add-iam-policy-binding "<project-name>" --member serviceAccount:terraform-runner@planetscale-operations.iam.gserviceaccount.com --role roles/iam.roleAdmin
gcloud projects add-iam-policy-binding "<project-name>" --member serviceAccount:terraform-runner@planetscale-operations.iam.gserviceaccount.com --role roles/iam.securityAdmin
gcloud projects add-iam-policy-binding "<project-name>" --member serviceAccount:terraform-runner@planetscale-operations.iam.gserviceaccount.com --role roles/iam.serviceAccountAdmin
gcloud projects add-iam-policy-binding "<project-name>" --member serviceAccount:terraform-runner@planetscale-operations.iam.gserviceaccount.com --role roles/iam.serviceAccountKeyAdmin
gcloud projects add-iam-policy-binding "<project-name>" --member serviceAccount:terraform-runner@planetscale-operations.iam.gserviceaccount.com --role roles/logging.admin
gcloud projects add-iam-policy-binding "<project-name>" --member serviceAccount:terraform-runner@planetscale-operations.iam.gserviceaccount.com --role roles/serviceusage.serviceUsageAdmin
gcloud projects add-iam-policy-binding "<project-name>" --member serviceAccount:terraform-runner@planetscale-operations.iam.gserviceaccount.com --role roles/storage.admin
gcloud projects add-iam-policy-binding "<project-name>" --member serviceAccount:terraform-runner@planetscale-operations.iam.gserviceaccount.com --role roles/viewer
```

Alternatively, they can be assigned through the GCP console under the project's "**IAM & Admin > IAM**" section of the [GCP console](<(https://console.cloud.google.com/iam-admin/iam)>).

Further information on assigning IAM roles to projects is available in the [GCP IAM documentation](https://cloud.google.com/iam/docs/granting-changing-revoking-access).

## Step 3: Requesting an initial quota increase

By default, GCP provides most new projects with quotas that are too small for PlanetScale's initial provisioning process.

Submit increase requests for the following quotas. This must be done for all regions in which PlanetScale will provision resources. Depending on your organization, the default quotas may already be at or above these levels:

1. `compute.googleapis.com/ssd_total_storage`: 10000 GB
2. `compute.googleapis.com/disks_total_storage`: 10000 GB
3. `compute.googleapis.com/n2_cpus`: 256
4. `compute.googleapis.com/n2d_cpus`: 256
5. `compute.googleapis.com/cpus_all_regions`: 256
6. `compute.googleapis.com/instances`: 100

You can submit GCP quota increase requests via the project's "**IAM & Admin > Quotas**" section of the [GCP console](<(https://console.cloud.google.com/iam-admin/quotas)>). Copy and paste the quota metrics from above into the table to search for them in the quota interface.

While PlanetScale does not immediately consume all requested resources, we recommend these values to ensure enough resources are available for auto-scaling, growth, and upgrades.

PlanetScale will request the quota increase if the customer does not but recommends that the customer initiate the request due to an unknown turnaround time for quota requests.

Further information on requesting and managing GCP quotas can be found in the [Google Cloud Allocation quotas documentation](https://cloud.google.com/compute/quotas).

## Step 4: Initiating the provisioning process

Once the GCP project has been created, the IAM roles have been applied, and the quota increases have been granted, notify your Solutions Engineer, providing them the following information:

- The name of the organization that you have created on `app.planetscale.com`.
- The GCP project name
- A confirmation of the region(s) that you have chosen for the deployment to reside in. The canonical list of regions can be found in the [Google Cloud Regions and Zones documentation](https://cloud.google.com/compute/docs/regions-zones).

Once your Solutions Engineer receives this information, they will forward it to the team responsible for provisioning your deployment. Provisioning the deployment takes PlanetScale, on average, one business day.

Once the deployment has been provisioned, your Solutions Engineer will contact you to confirm that your team can start creating databases.

{% callout type="note" %}
Optionally, PlanetScale can connect you to your databases via [GCP Private Service Connect](https://cloud.google.com/vpc/docs/private-service-connect) with PlanetScale Managed. See the [GCP Private Service Connect documentation](/docs/enterprise/managed/gcp/private-service-connect) for more information on establishing a Private Service Connect connection.
{% /callout %}
