---
title: 'PlanetScale Managed on AWS overview'
subtitle: 'Learn more about deploying PlanetScale in your Amazon Web Services account with our PlanetScale Managed plan.'
label: 'Managed'
date: '2023-11-15'
---

## Overview

With PlanetScale Managed on Amazon Web Services (AWS) is a single-tenant deployment of PlanetScale in your AWS organization within an isolated sub-account. In this configuration, you can use the same API, CLI, and web interface that PlanetScale offers, with the benefit of running entirely in an AWS sub-account that you own and PlanetScale manages for you.

## Architecture

As you can see in the architecture diagram below, the PlanetScale data plane is deployed inside of a PlanetScale-controlled sub-account in your AWS organization. Within the Vitess cluster orchestrated by Kubernetes, we use three AWS availability zones within a region to ensure high availability.

You can deploy PlanetScale Managed to any AWS region with at least three availability zones, including those not supported by the PlanetScale self-serve product.

Backups, part of the data plane, are stored in S3 inside the same sub-account. PlanetScale Managed uses isolated Amazon Elastic Compute Cloud (Amazon EC2) instances as part of the deployment.

![Architecture diagram](/assets/docs/managed/aws/aws-arch-diagram.jpg)

PlanetScale will not have access to any other sub-accounts or your organization level settings. Outside of your AWS organization, we run the PlanetScale control plane, which includes the PlanetScale API and web application, including the dashboard you see at `app.planetscale.com`.

## Security and compliance

PlanetScale Managed is an excellent option for organizations with specific security and compliance requirements.

You own the AWS organization and sub-account that PlanetScale is deployed within in an isolated architecture. This differs from when your PlanetScale database is deployed within our AWS organizations.

### PCI compliance

Along with System and Organization Controls (SOC) 2 Type 2 and other [security and compliance](/docs/concepts/security) practices that PlanetScale has been issued and follows, PlanetScale Managed on AWS has been issued an Attestation of Compliance (AoC) and Report on Compliance (RoC), certifying our compliance with the PCI DSS 4.0 as a [Level 1 Service Provider](https://www.pcisecuritystandards.org/glossary/service-provider/). This enables PlanetScale Managed to be used via a shared responsibility model across merchants, acquirers, issuers, and other roles in storing and processing cardholder data.

{% callout type="note" %}
If you have any questions or concerns related to the security and compliance of PlanetScale Managed, please [contact us](/contact), and we will be happy to discuss them further.
{% /callout %}

### AWS PrivateLink

By default, all connections are encrypted, but public. Optionally, you also have the option to use private database connectivity through [AWS PrivateLink](/docs/enterprise/managed/aws/privatelink), which is only available on single-tenancy deployment options, including PlanetScale Managed.

## Billing

With any of the PlanetScale Enterprise offerings, including PlanetScale Managed, you have the option to purchase PlanetScale through the [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-luy3krhkpjne4). In addition to this, the resources you use on PlanetScale will qualify against your EDP commitment.

{% callout type="note" %}
If you have any billing-related questions for PlanetScale Managed, please [contact us](/contact), and we will be happy to discuss them further.
{% /callout %}

## Getting started with PlanetScale Managed in AWS

If you want to see what is involved in getting set up with PlanetScale Managed in AWS, you can see the [AWS set up documentation](/docs/enterprise/managed/aws/getting-started).

If you are interested in exploring PlanetScale Managed further, please [contact us](/contact), and we can chat more about your requirements and see if PlanetScale Managed is a good fit for you.
