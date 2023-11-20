---
title: 'Set up GCP Private Service Connect with PlanetScale Managed'
subtitle: 'Learn how to set up GCP Private Service Connect to establish private database connectivity with PlanetScale Managed.'
label: 'Managed'
date: '2023-11-08'
---

## Overview

PlanetScale Managed can connect you to your databases via [GCP Private Service Connect](https://cloud.google.com/vpc/docs/private-service-connect). The following guide describes how PlanetScale Managed with GCP Private Service Connect works and how to set it up.

{% callout type="note" %}
GCP Private Service Connect is only available on single-tenancy PlanetScale deployment options, including PlanetScale Managed. It is **not available on Hobby, Scaler, Scaler Pro plans, or other [multi-tenancy deployments](/docs/concepts/deployment-options)**. If you are interested in [PlanetScale Managed](/docs/enterprise/managed/overview), please [contact us](/contact).
{% /callout %}

## How PlanetScale Managed and GCP Private Service Connect work

Private Service Connect (PSC) lets a service producer offer services to a service consumer without the consumer being a member of the service producer's organization.

The service producer is the Google Cloud project controlled by PlanetScale, and the service consumer is the project(s) where your applications operate. Your applications connect to a private IP you allocate in your project, which is routed to your PlanetScale databases in the project that PlanetScale controls.

GCP PSC requires multiple components:

- A Private Service Connect [Service Attachment](https://cloud.google.com/vpc/docs/private-service-connect#service-attachments) deployed in the project that PlanetScale controls.
- A Private Service Connect [Endpoint](https://cloud.google.com/vpc/docs/private-service-connect#endpoints) deployed in the project(s) that your applications operate in.

Once all components are operating correctly, the applications in the project with the endpoint configured will connect to the service attachment using private IP addresses instead of the publicly accessible endpoint.

### Limitations

Cross-region connectivity is not supported by Google Cloud for Private Service Connect. For example, if your PlanetScale databases are located in `us-central1` and your applications are located in `us-east4`, then you cannot connect to them using Private Service Connect.

## Step 1: Initiating the setup process

If you would like to initiate the process, please contact your Solutions Engineer and let them know the Google Cloud project ID(s) in which you intend to create Private Service Connect endpoints. If you need to add additional projects to the allowlist, please get in touch with your Solutions Engineer.

{% callout type="warning" %}
Google Cloud project IDs cannot be changed after initial setup. Please be sure to choose an ID that you will continue to use.
{% /callout %}

Once they receive your project IDs and forward them to the team responsible for provisioning your deployment, the team will provide them (and ultimately you) with the Private Service Connect Service Attachment URI, which will be in the form `projects/SERVICE_PROJECT/regions/REGION/serviceAttachments/SERVICE_NAME`.

{% callout type="warning" %}
If you use VPC Service Controls in your VPC, you must ensure that the policy allows access to the PlanetScale-controlled project.
{% /callout %}

Your Solutions Engineer will provide you the following information when the setup is complete:

- `PS_Region`
- `PSC_Link_URI`

## Step 2: Establishing Private Service Connect

{% callout type="warning" %}
Only proceed to the next steps once a PlanetScale Solutions Engineer has provided the `PS_Region` and `PSC_Link_URI`.
{% /callout %}

Refer to Google Cloud's [Access managed services using Private Service Connect](https://cloud.google.com/vpc/docs/configure-private-service-connect-services) for more information on consuming services via Private Service Connect. This document covers additional details not covered here, including the IAM roles required to perform the configuration process.

### Using the GCP console

The following steps are an example of establishing a Private Service Connect endpoint in the [GCP Console](https://console.cloud.google.com/).

1. Obtain the Private Service Connect Attachment URI from your Solutions Engineer. It will be in the format: `projects/SERVICE_PROJECT/regions/REGION/serviceAttachments/SERVICE_NAME`.

2. Create a Private Service Connect Endpoint using the Attachment URI. In the GCP console, go to ["Private Service Connect"](<(https://console.cloud.google.com/net-services/psc)>) page, select the "**Connected endpoints**" tab, and select the "**Connect endpoint**" button.

3. Add a Private Service Connect Endpoint with the following details:

- **Target**: Published Service. This is the `PSC_Link_URI` provided by your Solutions Engineer.
- **Target Service**: Paste the Private Service Connect Attachment URI from step 1.
- **Name**: Enter a name for this endpoint. Use the `PS_Region` value provided by your Solutions Engineer.
- **Network and subnet**: Select the network to create the endpoint in.
- **Create and IP Address**: Create a reserved IP address. This is the address your applications will connect to to access your PlanetScale databases. PlanetScale recommends using the `PS_Region` name for the name of the reserved IP address.

Then, add the endpoint.

![connect_endpoint_details](/assets/docs/managed/gcp/private-service-connect/connect_endpoint_details.png)

{% callout type="note" %}
You must provide the list of projects to your Solutions Engineer. Your endpoint will only function once they have PlanetScale added to the allowlist.
{% /callout %}

4. The endpoint creation process will take a minute or two. When finished, select the endpoint and verify the status is **Accepted**.

Repeat steps 2-4 for **each project** you wish to connect to the Private Service Connect Attachment.

![Showing endpoint status as "Accepted"](/assets/docs/managed/gcp/private-service-connect/endpoint_status.png)

## Step 3: Private Cloud DNS

Next, you will set up a private Cloud DNS zone. This step may be optional. This step aims to make it possible to use the same PlanetScale connection strings and host names inside and outside of the project. When these host names are resolved inside the project, they will resolve to the IP address of the Private Service Connect Endpoint. When resolved anywhere else, they will resolve to the public IP address.

When connecting to the PlanetScale Private Service Connect Endpoint directly via IP address or an alternate host name, you may need to disable TLS verification due to host name mismatch.

1. Create a private Cloud DNS zone. In the GCP console, go to the ["Create a DNS zone"](https://console.cloud.google.com/net-services/dns/zones/new/create) page.

- **Zone type**: `Private`
- **Zone name**: `connect-psdb-cloud`
- **DNS Name**: `connect.psdb.cloud`
- **Options**: `Default (private)`
- **Network**: Select all VPCs where this DNS zone should be available.

![cloud_dns_zone_details](/assets/docs/managed/gcp/private-service-connect/cloud_dns_zone_details.png)

2. Create DNS records. For each PlanetScale Private Service connect endpoint, create a DNS record with the following details by opening the zone's details page in the GCP Console.

![add_record_set](/assets/docs/managed/gcp/private-service-connect/add_record_set.png)

- **DNS name**: Use the **PS_Region** value provided by your Solutions Engineer.
- **IP Address**: The reserved IP address assigned to the Private Service Connect Endpoint created in the first section of this document. You can also find this on the Private Service Connect page in the GCP Console.

![record_set_details](/assets/docs/managed/gcp/private-service-connect/record_set_details.png)

Repeat steps 1-2 for **each project** you wish to connect to set up Private Cloud DNS for.
