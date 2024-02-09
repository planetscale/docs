---
title: 'PlanetScale Managed overview'
subtitle: 'Deploy PlanetScale in your Amazon Web Services or Google Cloud Platform account with our PlanetScale Managed plan.'
label: 'Managed'
date: '2023-11-08'
---

## What is PlanetScale Managed?

PlanetScale Managed is a single-tenant deployment of PlanetScale within your Amazon Web Services (AWS) or Google Cloud Platform (GCP) account. In this configuration, you can use the same API, CLI, and web interface that PlanetScale offers, with the benefit of running entirely in your own AWS or GCP account.

We have packaged the best parts of PlanetScale into a container and can deploy and operate them in your own account, bringing you the best of SaaS with the added benefit of a deployment free of noisy neighbors, enhanced support, and additional security guarantees.

With PlanetScale Managed, it is more than just an on-premises deployment of your database; you are getting the PlanetScale expert team operating your database alongside your team for a _truly_ fully managed database solution. The PlanetScale team is on-call for your databases.

## How does PlanetScale Managed work?

PlanetScale Managed is a packaged [data plane](https://en.wikipedia.org/wiki/Data_plane), built on [Vitess and Kubernetes](/blog/scaling-hundreds-of-thousands-of-database-clusters-on-kubernetes), that's deployed to an AWS sub-account or GCP project that you own and we operate. Your database lives entirely inside a dedicated sub-account or project within your cloud organization. PlanetScale will not have access to other sub-accounts or projects nor your organization-level settings within the cloud service provider. At the same time, you still get to interact with your databases through the web application, pscale CLI, or the PlanetScale API, as you usually would with our hosted product. This includes developer experience features such as non-blocking schema changes, safe migrations, database branching, query insights, and more.

If you are an existing PlanetScale user, moving to PlanetScale Managed requires no changes to your existing developer workflows.

The database is deployed in a single-tenant environment and isolated in a sub-account in AWS or project in GCP from the rest of your organization's infrastructure. By default, all connections are encrypted, but public. You have the option to use private database connectivity through [AWS PrivateLink](/docs/enterprise/managed/aws/privatelink) or [GCP Private Service Connect](/docs/enterprise/managed/gcp/private-service-connect), which are only available on single-tenancy deployment options, including PlanetScale Managed.

Read more on how PlanetScale Managed works inside either cloud provider:

- [PlanetScale Managed on Amazon Web Services](/docs/enterprise/managed/aws/overview)
- [PlanetScale Managed on Google Cloud Platform](/docs/enterprise/managed/gcp/overview)

## Benefits of PlanetScale Managed

Single-tenancy is one of many benefits when it comes to PlanetScale Managed. Still, with this PlanetScale Enterprise service, you also get:

- [Database sharding](/docs/concepts/sharding) available
- Option to sign BAAs for [HIPAA compliance](/blog/planetscale-and-hipaa)
- Deployment to additional regions
- [PCI compliance](/blog/planetscale-managed-is-now-pci-compliant) (AWS only)
- Additional [support options](/docs/support/support-overview#enterprise)
- Available on [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-luy3krhkpjne4) (AWS only). Your PlanetScale purchase through the AWS Marketplace and the resources you use on PlanetScale will qualify against your EDP commitment.

## How do I get PlanetScale Managed?

If you are interested in seeing if PlanetScale Managed fits your needs, [contact us](/contact), and we can chat more about your requirements and see if PlanetScale Managed is a good fit for you.
