---
title: 'Connecting to PlanetScale privately on AWS'
subtitle: 'How to connect to PlanetScale privately on AWS via PrivateLink.'
date: '2024-05-06'
---

## Connecting to PlanetScale privately via AWS PrivateLink

When your compliance mandates that your connections do not route through the public Internet, PlanetScale provides private connection endpoints to AWS regions via [AWS PrivateLink](https://aws.amazon.com/privatelink/). Private connections are included on Scaler Pro plans. There is no additional charge on PlanetScale's end, but this may impact your AWS bill.

Below is a list of instructions to set up your Virtual Private Cloud (VPC) to utilize a VPC endpoint when communicating with PlanetScale databases.

## Establishing a VPC endpoint

1. Identify the AWS region that your VPC lives in, which we will refer to as `<aws-region>` for the rest of this document.

2. Navigate to the "Endpoints" section on the VPC page and select "**Create Endpoint**."

![nav_to_splash](/assets/docs/managed/aws/privatelink/nav_to_splash.png)

3. Select "Other endpoint services" and fill the Service Name text box according to which region you want to establish AWS PrivateLink for:

![find_service](/assets/docs/multi/aws/privatelink/find_service.png)

{% table %}

- AWS Region Name
- AWS Region
- VPC Endpoint Service Name

---

- US East (Ohio)
- us-east-2
- `com.amazonaws.vpce.us-east-2.vpce-svc-069f88c102c1a7fba`

---

- US East (N. Virginia)
- us-east-1
- `com.amazonaws.vpce.us-east-1.vpce-svc-02fef31be60d3fd35`

---

- US West (Oregon)
- us-west-2
- `com.amazonaws.vpce.us-west-2.vpce-svc-0f63a383cb2d41919`

---

- Asia Pacific (Mumbai)
- ap-south-1
- `com.amazonaws.vpce.ap-south-1.vpce-svc-06556ed2371c5fdd2`

---

- Asia Pacific (Singapore)
- ap-southeast-1
- `com.amazonaws.vpce.ap-southeast-1.vpce-svc-046d8feae38660302`

---

- Asia Pacific (Sydney)
- ap-southeast-2
- `com.amazonaws.vpce.ap-southeast-2.vpce-svc-03e5578eeaf446c90`

---

- Asia Pacific (Tokyo)
- ap-northeast-1
- `com.amazonaws.vpce.ap-northeast-1.vpce-svc-099c246fa320e54d1`

---

- Europe (Frankfurt)
- eu-central-1
- `com.amazonaws.vpce.eu-central-1.vpce-svc-091260498e58d4dc3`

---

- Europe (Ireland)
- eu-west-1
- `com.amazonaws.vpce.eu-west-1.vpce-svc-049577caa775e8648`

---

- Europe (London)
- eu-west-2
- `com.amazonaws.vpce.eu-west-2.vpce-svc-0f69e183c9a555f03`

---

- South America (São Paulo)
- sa-east-1
- `com.amazonaws.vpce.sa-east-1.vpce-svc-09b11604d399b5c58`

{% /table %}

4. Once you have filled in the Service Name text box, click "Verify service".

![find_service](/assets/docs/multi/aws/privatelink/verify_service.png)

5. Choose the VPC and subnets that should be peered with the PlanetScale service endpoint.

6. Click the "Additional settings" dropdown arrow to reveal the "DNS name" configuration, and select the "Enable DNS name" checkbox.

![enable_dns_name](/assets/docs/multi/aws/privatelink/enable_dns_name.png)

7. Choose the security group of your choice to control what can send traffic to the PlanetScale service endpoint.

8. Click "Create endpoint" and verify that the VPC endpoint's status reports "Available" after a few minutes.

## Verifying the connectivity of your VPC endpoint

1. In the AWS UI, confirm that the endpoint has successfully been created by verifying that the Status section of the endpoint reads "Available".

{% callout type="warning" %}
Some PlanetScale regions are named differently than AWS Provider regions. We will refer to the PlanetScale region as `<planetscale-region>` for the rest of this document.
{% /callout %}

2. Confirm that the Private DNS Names reads: `<planetscale-region>.private-connect.psdb.cloud`. In the below example, we have configured our own VPC endpoint for `us-east`.

![private_dns](/assets/docs/multi/aws/privatelink/private_dns.png)

3. Log into any EC2 instance in the configured VPC and run `dig +short <planetscale-region>.private-connect.psdb.cloud` to confirm that DNS resolution is producing IP Addresses in the range of your VPC's CIDR.

```shell
dig +short us-east.private-connect.psdb.cloud
172.31.16.197
172.31.13.7
```

4. Run `curl https://<planetscale-region>.private-connect.psdb.cloud` to verify your connectivity. A successful response will yield `Welcome to PlanetScale`.

```shell
curl https://us-east.private-connect.psdb.cloud
Welcome to PlanetScale.
```

## Modifying your Connection Strings to utilize your VPC endpoint.

By default, PlanetScale provides users with a connection string that reads `<planetscale-region>.connect.psdb.cloud`.

To utilize your newly configured VPC endpoint, prepend `private-` to the `connect` subdomain as shown above, yielding a connection string that reads `<planetscale-region>.private-connect.psdb.cloud`.
