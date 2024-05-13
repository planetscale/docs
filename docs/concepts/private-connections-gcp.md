---
title: 'Connecting to PlanetScale privately on GCP'
subtitle: 'How to connect to PlanetScale privately on GCP via Private Service Connect.'
date: '2024-05-13'
---

## Connecting to PlanetScale privately via GCP Private Service Connect

When your compliance mandates that your connections do not route through the public Internet, PlanetScale provides private connection endpoints to GCP regions via [GCP Private Service Connect](https://cloud.google.com/vpc/docs/private-service-connect). Private connections are included on Scaler Pro plans. There is no additional charge on PlanetScale's end, but this may impact your GCP bill.

Below is a list of instructions to set up your VPC network to utilize a Private Service Connect endpoint when communicating with PlanetScale databases.

## Establishing a Private Service Connect Endpoint

1. Identify the GCP region that your VPC lives in, which we will refer to as `<gcp-region>` for the rest of this document.

2. In the GCP console, go to ["Network Service > Private Service Connect"](<(https://console.cloud.google.com/net-services/psc)>) page, select the "**Connected endpoints**" tab, and select the "**+ Connect endpoint**" button.

3. Add a Private Service Connect Endpoint with the following details:

- **Target**: Published Service.
- **Target Service**: Select the target service from the table below for the region you want to establish an endpoint in.
- **Name**: Select the endpoint name from the table below for the region you want to establish an endpoint in.
- **Network and subnet**: Select the network (VPC) to create the endpoint in. The endpoint will reserve a static IP address in the subnet. The VPC and subnet must be reachable by the applications you intend to connect to your PlanetScale databases from.
- **Create an IP Address**: Create a reserved IP address. This is the address your applications will use to access your PlanetScale databases. PlanetScale recommends using the `Endpoint Name` for the name of the reserved IP address for consistency, but you may use any name.
- **Enable Global Access**: PlanetScale recommends enabling this option. When enabled this allows applications in other regions to reach the PSC endpoint.
- Finally, click **Add Endpoint** to start the process. Setup will take approximately 1-2 minutes.

![setup_endpoint_details](/assets/docs/multi/gcp/private-service-connect/connect_endpoint_details.png)

{% table %}

- GCP Region
- Endpoint Name
- Target Service

---

- asia-northeast3
- gcp-asia-northeast3
- `projects/planetscale-production/regions/asia-northeast3/serviceAttachments/edge-gateway-gcp-asia-northeast3`

---

- northamerica-northeast1
- gcp-northamerica-northeast1
- `projects/planetscale-production/regions/northamerica-northeast1/serviceAttachments/edge-gateway-gcp-northamerica-northeast1`

---

- us-central1
- gcp-us-central1
- `projects/planetscale-production/regions/us-central1/serviceAttachments/edge-gateway-gcp-us-central1`

---

- us-east4
- gcp-us-east4
- `projects/planetscale-production/regions/us-east4/serviceAttachments/edge-gateway-gcp-us-east4`

{% /table %}

4. The endpoint creation process will take a minute or two. When finished, select the endpoint and verify the status is **Accepted**:

![Showing endpoint status as "Accepted"](/assets/docs/multi/gcp/private-service-connect/endpoint_status.png)

## Verifying the connectivity of your Private Service Connect endpoint

GCP will automatically create a private Cloud DNS zone in the project where the PSC consumer endpoints are created.

The domain name used is `private-connect.psdb.cloud`. Your endpoints will be available via DNS records visible only within your VPC using the format:

- `<Endpoint-Name>.private-connect.psdb.cloud`

1. Log into any VM instance in the configured VPC and run `dig +short <Endpoint-Name>.private-connect.psdb.cloud` to confirm that DNS resolution resolves to the static IP address reserved during endpoint creation.

```shell
$ dig +short gcp-us-central1.private-connect.psdb.cloud
10.128.0.17
```

2. Run `curl https://<Endpoint-Name>.private-connect.psdb.cloud` to verify your connectivity. A successful response will yield `Welcome to PlanetScale`.

```shell
curl https://gcp-us-central1.private-connect.psdb.cloud
Welcome to PlanetScale.
```

## Modifying your Connection Strings to utilize your Private Service Connect endpoint.

By default, PlanetScale provides users with a connection string that reads `<planetscale-region>.connect.psdb.cloud`.

To utilize your newly configured VPC endpoint, prepend `private-` to the `connect` subdomain as shown above, yielding a connection string that reads `<planetscale-region>.private-connect.psdb.cloud`.
