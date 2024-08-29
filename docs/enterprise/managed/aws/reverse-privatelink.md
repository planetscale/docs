---
title: 'Set up AWS Reverse PrivateLink with PlanetScale Managed'
subtitle: 'Learn how to set up AWS PrivateLink to allow for data imports from an existing database environment into PlanetScale Managed.'
label: 'Enterprise'
date: '2024-05-03'
---

## Overview

PlanetScale Managed can connect to your existing databases via AWS PrivateLink for the purposes of data imports. Often one of the first tasks for a new Managed deployment is to import data from an existing MySQL database housed in a separate AWS sub-account. This guide explains how to set up AWS PrivateLink components that enable cross-account communication to facilitate this process. In PrivateLink parlance, the MySQL database that serves as the import source is known as the "producer", and PlanetScale is the "consumer".

While there are a number of different ways to set up and configure PrivateLink components, in this guide we'll be using the AWS CLI tool in our examples.

## How PlanetScale Managed and AWS PrivateLink work

Broadly speaking, there are three major components to this PrivateLink setup:

- A [VPC Endpoint Service](https://docs.aws.amazon.com/vpc/latest/privatelink/endpoint-service-overview.html) conceptually lives in the producer's VPC and AWS account. Once configured, it allows authorized principals (e.g. AWS accounts, IAM users) to establish a connection to an existing VPC Endpoint Service ID.

- A [VPC Endpoint Interface](https://docs.aws.amazon.com/vpc/latest/privatelink/vpce-interface.html) exists on the consumer side, and once configured with an endpoint service address exposes an internal IP address and port which consumers may use for cross-account communication.

- A [Network Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html) (NLB) is created on the producer side, and by managing the IP target group on this NLB you can choose which internal services to expose via the PrivateLink Endpoint Service.

## Starting State

Below is a simplified diagram of our initial state. We've got two separate accounts, each with their own VPCs and availability zones. We're using AWS [AZ IDs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#az-ids) as well as of AZ names to ensure that we're always referring to the correct AZ, as AZ names are not consistent across AWS accounts. On the producer side, we have a network subnet inside each AZ.

![starting-state](/assets/docs/managed/aws/privatelink/starting-state.png)

## Create and Configure the NLB

Our first task is to create the Network Load Balancer in the producer AWS account. We want the NLB to be available in each of the three AZs that the two accounts share. We accomplish this by adding the ids of the three subnets associated with those AZs using the `--subnets` option.

```bash
aws elbv2 create-load-balancer \
  --name pl-nlb \
  --scheme internal \
  --type network \
  --subnets subnet-cafed00d subnet-c0ffee subnet-cafef00d
  --security-groups sg-f00
```

If you want to attach a security group to your NLB you must do so at creation time. This allows you to restrict the inbound protocol and port range to `TCP:3306`. This command will return an ARN that uniquely identifies the newly created NLB. We'll need this later.

### Create an IP Target Group

This creates an empty IP target group on `TCP:3306` in the producer VPC.

```bash
aws elbv2 create-target-groups \
  --name pl-nlb-target-group \
  --protocol TCP \
  --port 3306 \
  --vpc-id vpc-f00 \
  --target-type ip
```

This will return an ARN that uniquely identifies the target group.

### Register a Target

This step adds the IP address of the existing Primary RDS instance to the target group. We want to make sure that only the RDS writer is registered as a target.

```bash
aws elbv2 register-targets \
  --target-group-arn <arn>
  --targets Id=10.0.0.1
```

### Create a Listener

Finally we'll associate the target group NLB by creating a listener.

```bash
aws elbv2 create-listener \
   --load-balancer-arn <arn>\
   --protocol TCP \
   --port 3306 \
   --default-actions Type=forward,TargetGroupArn=<arn>
```

Now that we've created the NLB and configured it, we can add the NLB to the diagram. Although on the diagram it looks like there are three separate NLBs, it's meant to represent a single NLB object that has network interfaces in three different subnets.

![create-and-configure-nlb](/assets/docs/managed/aws/privatelink/create-and-configure-nlb.png)

## Create and Configure the PrivateLink VPC Endpoint Service

Now let's configure the endpoint service. We'll need the ARN of our load balancer for this.

```bash
aws ec2 create-vpc-endpoint-service-configuration \
  --network-load-balancer-arn <arn> \
  --no-acceptance-required
```

This will return a a VPC service id.

### Configure Service Permissions

We only want to allow incoming connections on this endpoint service from the PlanetScale Managed sub-account. We'll need to know the account number for this step.

```bash
aws ec2 modify-vpc-endpoint-service-permissions \
  --service-id vpce-svc-f00 \
  --add-allowed-principals '["arn:aws:iam:123456789012:root"]'
```

![create-and-configure-vpce-svc](/assets/docs/managed/aws/privatelink/create-and-configure-vpce-svc.png)

## Wrapping Up

Once you've communicated your newly created VPC Service Endpoint ID to your Solutions Engineer, the PlanetScale Engineering team can then complete the rest of the process. This involves creating, configuring, and testing the PrivateLink VPC Interface Endpoint. The diagram below illustrates the completed system.

![wrapping-up](/assets/docs/managed/aws/privatelink/wrapping-up.png)
