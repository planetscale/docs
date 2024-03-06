---
title: 'Set up AWS PrivateLink with PlanetScale Managed'
subtitle: 'Learn how to set up AWS PrivateLink to establish private database connectivity with PlanetScale Managed.'
label: 'Managed'
date: '2023-11-08'
---

## Overview

PlanetScale Managed can connect you to your databases via [AWS PrivateLink](https://aws.amazon.com/privatelink/). The following guide describes how PlanetScale Managed with AWS PrivateLink works and how to set it up.

{% callout type="note" %}
AWS PrivateLink is only available on single-tenancy PlanetScale deployment options, including PlanetScale Managed. It is **not available on Scaler Pro plans or other [multi-tenancy deployments](/docs/concepts/deployment-options)**. If you are interested in [PlanetScale Managed](/docs/enterprise/managed/overview), please [contact us](/contact).
{% /callout %}

## How PlanetScale Managed and AWS PrivateLink work

AWS PrivateLink requires two components:

- A [VPC endpoint service](https://docs.aws.amazon.com/vpc/latest/privatelink/endpoint-service-overview.html) deployed in the sub-account that PlanetScale controls.
- A [VPC endpoint interface](https://docs.aws.amazon.com/vpc/latest/privatelink/vpce-interface.html), sometimes referred to as a "VPC endpoint" in AWS, deployed in the account that your applications operate in.

Once both components are operating correctly, the EC2 instances in the VPC that the VPC endpoint has been assigned to will leverage [Private DNS](https://docs.aws.amazon.com/vpc/latest/privatelink/vpce-interface.html#vpce-private-dns) to connect to your VPC endpoint instead of the publicly accessible endpoint.

The connection strings that PlanetScale provides will operate successfully inside and outside your VPC, creating PrivateLink connections inside of your VPC and regular connections outside of your VPC.

## Step 1: Initiating the setup process

There is no fully automated way to establish a PrivateLink connection. If you would like to initiate the process, please get in touch with your Solutions Engineer and let them know the [AWS Account ID](https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html) that you intend to create the [VPC endpoint](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html) in.

Once they receive your AWS Account ID and forward it to the team responsible for provisioning your deployment, the team will provide the Solutions Engineer (and ultimately you) with the Service Name of the [VPC endpoint service](https://docs.aws.amazon.com/vpc/latest/privatelink/endpoint-service-overview.html) that will be responsible for accepting your connection.

{% callout type="note" %}
It is important to keep the service name in your records. It is the only piece of information you need to input when creating your VPC endpoint.
{% /callout %}

## Step 2: Establishing a VPC endpoint connection

{% callout type="warning" %}
Only proceed to the next steps once a PlanetScale Solutions Engineer has provided the service name and confirmed cross-account authentication has been configured.
{% /callout %}

The following steps are an example of establishing a VPC endpoint connection in the AWS Console. In this example, the customer has requested that their deployment be in the `eu-west-1` region.

When you go through the steps, make sure that you have selected the region that matches the region that your PlanetScale Managed cluster deployment has been provisioned into.

1. Navigate to the Endpoints section on the Virtual Private Cloud page and select "**Create Endpoint**."

![nav_to_splash](/assets/docs/managed/aws/privatelink/nav_to_splash.png)

2. Select the "**Find service by name**" selector, input the provided Service Name, and select the "**Verify**" button.

![verified](/assets/docs/managed/aws/privatelink/verified.png)

3. Select the VPC in the drop-down where you wish to provision this VPC endpoint and the relevant subnets inside your VPC.

![cyo_vpc](/assets/docs/managed/aws/privatelink/cyo_vpc.png)

4. Select the "**Enable DNS Name**" checkbox. Take note of the value of your "**Private DNS Name**" field. That is how we will verify that the connection is operating successfully.

![enable_dns_name](/assets/docs/managed/aws/privatelink/enable_dns_name.png)

5. Select the relevant Security Groups you want your VPC endpoint to adhere to.

![select_sgs](/assets/docs/managed/aws/privatelink/select_sgs.png)

6. Add as many tags as your heart desires (up to 50) and select "**Create endpoint**."

![click_it](/assets/docs/managed/aws/privatelink/click_it.png)

7. The "Creating" spinner will spin momentarily and then deliver you the news of the endpoint creation. You should see a VPC endpoint in the `pending` state if it was successful. If the creation failed, record the reason and consult your Solutions Engineer.

![pending.png](/assets/docs/managed/aws/privatelink/pending.png)

8. After 2-10 minutes (make sure to refresh), your VPC endpoint will report an `available` state.

![available.png](/assets/docs/managed/aws/privatelink/available.png)

## Step 3: Verifying a VPC endpoint connection

PlanetScale publishes a [wildcard DNS record](https://en.wikipedia.org/wiki/Wildcard_DNS_record) for your private region. AWS PrivateLink will override the DNS record in your VPC to point to your VPC endpoint instead of the publicly published record.

To verify that the DNS override is working correctly, issue the following `dig` command using the value of your "Private DNS Name" instead of the value in the example:

```shell
dig +short wildcard.frzzbztuqm3h-euwest1-1.psdb.cloud
172.31.16.197
172.31.13.7
```

If your `dig` command returns a set of static IP addresses, your VPC Endpoint connection is operating successfully. If it returns a `CNAME` to an ELB record (for example, something like `something.elb.region.amazoneaws.com`), your connection is not operating successfully, and you should consult your Solutions Engineer.

Once you've verified that your connection is operating successfully, you will need to verify that you can reach a database you've provisioned:

1. [Create a connection string](/docs/concepts/connection-strings#creating-a-password) for a PlanetScale database using the "**Connect**" button. Select "**MySQL CLI**" and copy the command.
2. Paste your MySQL CLI command into a command prompt of an EC2 instance running in your VPC with the `mysql-client` package installed:

```shell
mysql -h <HOST_NAME> -u <USERNAME> -p --ssl-mode=VERIFY_IDENTITY --ssl-ca=/etc/pki/tls/certs/ca-bundle.crt
Enter password:
...

mysql>
```

Note: The correct path for the CA root configuration for the `--ssl-ca` flag depends on your operating system. See the [CA root configuration documentation](/docs/concepts/secure-connections#ca-root-configuration) for more the correct path.

If you receive the `mysql>` prompt, your connection is operating successfully, and you have just confirmed that your connections to PlanetScale will be established through AWS PrivateLink. If you do not receive the `mysql>` prompt, please consult your Solutions Engineer.
