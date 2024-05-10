---
title: 'Set up GCP Private Service Connect with PlanetScale Managed'
subtitle: 'Learn how to set up GCP Private Service Connect to establish private database connectivity with PlanetScale Managed.'
label: 'Managed'
date: '2023-11-08'
---

## Overview

PlanetScale Managed can connect you to your databases via [GCP Private Service Connect](https://cloud.google.com/vpc/docs/private-service-connect). The following guide describes how PlanetScale Managed with GCP Private Service Connect works and how to set it up.

{% callout type="note" %}
GCP Private Service Connect is only available on single-tenancy PlanetScale deployment options, including PlanetScale Managed. It is **not available on Scaler Pro plans, or other [multi-tenancy deployments](/docs/concepts/deployment-options)**. If you are interested in [PlanetScale Managed](/docs/enterprise/managed/overview), please [contact us](/contact).
{% /callout %}

## How PlanetScale Managed and GCP Private Service Connect work

Private Service Connect (PSC) lets a service producer offer services to a service consumer without the consumer being a member of the service producer's organization.

The service producer is the Google Cloud project controlled by PlanetScale, and the service consumer is the project(s) where your applications operate. Your applications connect to a private IP you allocate in your project, which is routed to your PlanetScale databases in the project that PlanetScale controls.

GCP PSC requires multiple components:

- A Private Service Connect [Service Attachment](https://cloud.google.com/vpc/docs/private-service-connect#service-attachments) (also known as a Published Service) deployed in the project that PlanetScale controls on your behalf.
- A Private Service Connect [Endpoint](https://cloud.google.com/vpc/docs/private-service-connect#endpoints) deployed in the project(s) that your applications operate in.

Once all components are operating correctly, the applications in the project with the endpoint configured will connect to the service attachment using private IP addresses instead of the publicly accessible endpoint.

## Step 1: Initiating the setup process

If you would like to initiate the process, please contact your Solutions Engineer and let them know the Google Cloud project ID(s) in which you intend to create Private Service Connect endpoints. If you need to add additional projects to the allowlist, please get in touch with your Solutions Engineer.

{% callout type="warning" %}
Google Cloud project IDs cannot be changed after initial setup. Please be sure to choose an ID that you will continue to use.
{% /callout %}

Once they receive your project IDs and forward them to the team responsible for provisioning your deployment, the team will provide them (and ultimately you) with the Private Service Connect Service Attachment URI, which will be in the form `projects/PROJECT/regions/REGION/serviceAttachments/SERVICE_NAME`.

{% callout type="warning" %}
If you use VPC Service Controls in your VPC, you must ensure that the policy allows access to the PlanetScale-controlled project.
{% /callout %}

Your Solutions Engineer will provide you the following information when the setup is complete:

- `Endpoint Name` (example: `rmqmwz7pgrjo-uscentral1`)
- `Target Service` (example: `projects/PROJECT/regions/REGION/serviceAttachments/SERVICE_NAME`)

You will use these values when configuring the Private Service Connect in your application projects.

## Step 2: Establishing Private Service Connect

{% callout type="warning" %}
Only proceed to the next steps once a PlanetScale Solutions Engineer has provided the `Endpoint Name` and `Target Service`.
{% /callout %}

Refer to Google Cloud's [Access published services through endpoints](https://cloud.google.com/vpc/docs/configure-private-service-connect-services) document for more information on connecting to services via Private Service Connect. This document covers additional details not covered here, including the IAM roles required to perform the configuration process.

### Using the GCP console

The following steps are an example of establishing a Private Service Connect endpoint in the [GCP Console](https://console.cloud.google.com/).

1. Obtain the Private Service Connect Attachment URI (`Target Service`) from your Solutions Engineer. It will be in the format: `projects/PROJECT/regions/REGION/serviceAttachments/SERVICE_NAME`.

2. Create a Private Service Connect Endpoint. In the GCP console, go to ["Network Service > Private Service Connect"](<(https://console.cloud.google.com/net-services/psc)>) page, select the "**Connected endpoints**" tab, and select the "**+ Connect endpoint**" button.

3. Add a Private Service Connect Endpoint with the following details:

- **Target**: Published Service.
- **Target Service**: Paste the `Target Service` attachment URI provided by your Solutions Engineer in step 1.
- **Name**: This is the `Endpoint Name` provided by your Solutions Engineer.
- **Network and subnet**: Select the network (VPC) to create the endpoint in. The endpoint will reserve a static IP address in the subnet. The VPC and subnet must be reachable by the applications you intend to connect to your PlanetScale databases from.
- **Create an IP Address**: Create a reserved IP address. This is the address your applications will use to access your PlanetScale databases. PlanetScale recommends using the `Endpoint Name` for the name of the reserved IP address for consistency, but you may use any name.
- **Enable Global Access**: PlanetScale recommends enabling this option. When enabled this allows applications in other regions to reach the PSC endpoint.

Finally, click **Add Endpoint** to start the process. Setup will take approximately 1-2 minutes.

![connect_endpoint_details](/assets/docs/managed/gcp/private-service-connect/connect_endpoint_details.png)

4. The endpoint creation process will take a minute or two. When finished, select the endpoint and verify the status is **Accepted**:

![Showing endpoint status as "Accepted"](/assets/docs/managed/gcp/private-service-connect/endpoint_status.png)

{% callout type="note" %}
You must provide the list of projects you wish to connect from to your Solutions Engineer. Your endpoint will only function once they have been added to the allowlist in the published service.
{% /callout %}

Repeat steps 2-4 to create an endpoint in **each project** you wish to connect to the Private Service Connect Attachment.

## Step 3: Verifying Connectivity

## DNS

{% callout type="note" %}
Published Private Service Connect services created after **May 8, 2024** will automatically create a private Cloud DNS zone in the project where the PSC consumer endpoints are created.

PSC services published before **May 8, 2024** will need to create a private Cloud DNS zone and configure records pointing to the PSC endpoint IP's manually if you wish to us DNS names to connect to your PlanetScale databases. The IP is static and so risk of it changing is low. If you delete and recreate a PSC endpoint and change the IP it is is assigned you should update your DNS records.

Google maintains additional documentation covering DNS and Private Service Connect here:

- [Automatic DNS configuration for Service Consumers](https://cloud.google.com/vpc/docs/dns-vpc-hosted-services#auto-dns-consumer)
- [Other ways to configure DNS for Service Consumers](https://cloud.google.com/vpc/docs/configure-private-service-connect-services#other-dns)
  {% /callout %}

Private Service Connect services created by PlanetsCale after May 8, 2024 are configured to automatically create a private Cloud DNS zone in the project where the PSC consumer endpoints are created.

The domain name used is `private-connect.psdb.cloud`. Your consumer endpoints will be available via DNS records visible only within your VPC using the format:

- `<Endpoint-Name>.private-connect.psdb.cloud`

If your endpoint was creatd with automatic DNS or your created your own DNS records manually you can verify resolution with `dig`, eg:

```shell
$ dig +short rmqmwz7pgrjo-uscentral1.private-connect.psdb.cloud
10.0.1.2
```

## Test Connectivity

A simple way to test connectivity is to create a new VM or use an existing VM (or Kubernetes pod) within the same VPC and subnet as your created the endpoint in:

And to test reachability you can use netcat (`nc`):

```shell
$ nc -v rmqmwz7pgrjo-uscentral1.private-connect.psdb.cloud 3306
Connection to rmqmwz7pgrjo-uscentral1.private-connect.psdb.cloud (10.0.1.2) 3306 port [tcp/mysql] succeeded!
8.0.34-PlanetScale/l+&?;
```
