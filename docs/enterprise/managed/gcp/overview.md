---
title: 'PlanetScale Managed on GCP overview'
subtitle: 'Learn more about deploying PlanetScale in your Google Cloud Platform account with our PlanetScale Managed plan.'
label: 'Enterprise'
date: '2024-08-29'
---

## Overview

With PlanetScale Managed on Google Cloud Platform (GCP) is a single-tenant deployment of PlanetScale in your GCP organization within an isolated project. In this configuration, you can use the same API, CLI, and web interface that PlanetScale offers, with the benefit of running entirely in a GCP project that you own and PlanetScale manages for you.

## Architecture

As you can see in the architecture diagram below, the PlanetScale data plane is deployed inside of a PlanetScale-controlled project in your GCP organization.
The Vitess cluster will run within this project, orchestrated by Kubernetes.

We distribute components of the cluster across three GCP zones within a region to ensure high availability.
You can deploy PlanetScale Managed to any GCP region with at least three zones, including zones not supported by the PlanetScale self-serve product, so long as the region supports the required GCP services (including but not limited to Google Compute Engine (GCE), Google Kubernetes Engine (GKE), Cloud Storage, Persistent Disk, Cloud Key Management Service (Cloud KMS), Cloud Logging).

Backups, part of the data plane, are stored in Cloud Storage inside the same project.
PlanetScale Managed uses isolated GCE instances as part of the deployment.

![Architecture diagram for PlanetScale Managed in GCP](/assets/docs/managed/gcp/gcp-arch-diagram.png)

Your database lives entirely inside a dedicated project within GCP. PlanetScale will not have access to other projects nor your organization-level settings within GCP. Outside of your GCP organization, we run the PlanetScale control plane, which includes the PlanetScale API and web application, including the dashboard you see at `app.planetscale.com`.

The Vitess cluster running inside Kubernetes is composed of a number of Vitess Components.
All incoming queries are received by one of the **VTGates**, which then routes them to the appropriate **VTTablet**.
The VTGates, VTTablets, and MySQL instances are distributed across 3 availability zones.

![Diagram of Vitess cluster on GCP](/assets/docs/managed/gcp/gcp-vitess.png)

Several additional required Vitess components are run in the Kubernetes cluster as well.
The topology server keeps track of cluster configuration.
**VTOrc** monitors cluster health and handles repairs, including managing automatic failover in case of an issue with a primary.
**vtctld** along with the client **vtctl** can be used to make changes to the cluster configuration and run workflows.

## Security and compliance

PlanetScale Managed is an excellent option for organizations with specific security and compliance requirements.

You own the AWS organization and sub-account that PlanetScale is deployed within in an isolated architecture. This differs from when your PlanetScale database is deployed within our AWS organizations.

## Security and compliance

PlanetScale Managed is an excellent option for organizations with specific security and compliance requirements.

You own the GCP organization and project that PlanetScale is deployed within in an isolated architecture. This differs from when your PlanetScale database is deployed within our GCP organizations.

Along with System and Organization Controls (SOC) 2 Type 2 and PlanetScale [security and compliance](/docs/concepts/security) practices that PlanetScale has been issued and follows, we can also sign BAAs for [HIPAA compliance](/blog/planetscale-and-hipaa) on PlanetScale Managed.

### GCP Private Service Connect

By default, all connections are encrypted, but public. Optionally, you also have the option to use private database connectivity through [GCP Private Service Connect](/docs/enterprise/managed/gcp/private-service-connect), which is only available on single-tenancy deployment options, including PlanetScale Managed.

{% callout type="note" %}
If you have any questions or concerns related to the security and compliance of PlanetScale Managed, please [contact us](/contact), and we will be happy to discuss them further.
{% /callout %}

## Getting started with PlanetScale Managed in GCP

If you want to see what is involved in getting set up with PlanetScale Managed in GCP, you can see the [GCP set up documentation](/docs/enterprise/managed/gcp/getting-started).

If you are interested in exploring PlanetScale Managed further, please [contact us](/contact), and we can chat more about your requirements and see if PlanetScale Managed is a good fit for you.
