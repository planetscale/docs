---
title: 'Security and compliance'
subtitle: 'Learn about the security features of the PlanetScale database platform.'
date: '2024-02-09'
---

PlanetScale is committed to delivering a powerful and easy-to-use database platform while keeping your data secure. The security of our systems is of the utmost importance. We consistently aim to improve our security posture by building security into every layer of our products.

Below is a breakdown of common security and compliance requirements by PlanetScale plan:

|                                                                                                            | Self-serve (Hobby, Scaler Pro) | **Enterprise multi-tenant** | **Enterprise single-tenant** | **PlanetScale Managed** |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------ | --------------------------- | ---------------------------- | ----------------------- |
| [Encryption of data (at rest and in transit)](/docs/concepts/security#encryption-of-data)                  | ✔                             | ✔                          | ✔                           | ✔                      |
| [SOC 2 Type 2+ HIPAA available](/docs/concepts/security#soc-2-type-2-hipaa)                                | ✔                             | ✔                          | ✔                           | ✔                      |
| [IP restrictions](/docs/concepts/connection-strings#ip-restrictions)                                       | ✔                             | ✔                          | ✔                           | ✔                      |
| [Audit logs](/docs/concepts/audit-log)                                                                     | ✔                             | ✔                          | ✔                           | ✔                      |
| [Security logs](/docs/concepts/security-log)                                                               | ✔                             | ✔                          | ✔                           | ✔                      |
| [Data Processing Addendum available](/docs/concepts/security#data-processing-addendum)                     | ✔                             | ✔                          | ✔                           | ✔                      |
| [Business Associate Agreements available](/docs/concepts/security#hipaa-and-business-associate-agreements) | ❌                             | ✔                          | ✔                           | ✔                      |
| [Private database connectivity](/docs/concepts/security#private-database-connectivity)                     | ❌                             | ❌                          | ✔                           | ✔                      |
| Dedicated AWS/GCP account                                                                                  | ❌                             | ❌                          | ✔                           | ✔                      |
| [PCI compliant](/docs/concepts/security#pci-compliance)                                                    | ❌                             | ❌                          | ❌                           | ✔ (on AWS)             |
| [Your own AWS/GCP account](/security#deploy-in-your-own-aws-or-gcp-account)                                | ❌                             | ❌                          | ❌                           | ✔                      |

## Available on all PlanetScale plans

### SOC 2 Type 2+ HIPAA

PlanetScale continuously monitors and reports primarily using System and Organization Controls (SOC) 2 Type 2 paired with the HIPAA Security Rule. To receive a copy of the report please [contact Support](https://support.planetscale.com/hc/en-us).

### Data security

#### Encryption of data

PlanetScale databases and their client communications are AES encrypted throughout the PlanetScale platform, both in transit and at rest.

##### At rest

Data is encrypted at rest on the underlying storage media that serves database branches and also the underlying storage media that hosts your PlanetScale database backups. This helps mitigate the risk of unintentional or malicious access to user data on storage systems.

##### In transit

Data in transit to PlanetScale databases is encrypted and goes through three major paths:

- The [PlanetScale CLI](/docs/reference/planetscale-cli), leverages [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) when initiating a connection to PlanetScale's API and Edge.
- PlanetScale [connection strings](/docs/concepts/connection-strings) require the successful establishment of a TLS session before any SQL commands can be issued.
- [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) is used to secure all data transmitted between PlanetScale and [clients using PlanetScale Connect](/docs/concepts/planetscale-connect).

#### Additional data protection controls

Communications to the PlanetScale API and Dashboard are encrypted using TLS 1.3. Certificates are issued by established third-party certificate authorities.

### General Data Protection Regulation (GDPR)

PlanetScale offers database services in Amazon Web Services and Google Cloud Platform regions around the world. PlanetScale complies with the EU General Data Protection Regulation (GDPR) and other global privacy regulations, where applicable. Customers are responsible for their applications' compliance with regulatory requirements, including as they relate to data subjects of their systems.

#### Data Processing Addendum

All PlanetScale plans are covered by our [Data Progressing Addendum (DPA)](/legal/data-processing-addendum). Markups are accepted for addendums on all PlanetScale Enterprise plans. [Contact us](/contact) to talk more about PlanetScale Enterprise plans and changes to our DPA.

#### Data locality

The infrastructure supporting user databases, backups, etc., is in the provider (AWS or GCP) and region where the database is created. Any read-only replicas in other geographies will copy the data set to the selected regions.

The following are two examples of data locality in PlanetScale:

- If you create a database in a US-based region, all data, including customer data, is stored and processed in the US, except in cases where sub-processors are identified as having other locations.
- If you create a database in a Europe-based region, your data does not leave the region the database was created in, unless you create a read-only region in another region.

## Available on all Enterprise plans

### HIPAA and Business Associate Agreements

PlanetScale can enter into Business Associate Agreements (BAAs) with customers on [Enterprise plans](/docs/concepts/planetscale-plans#planetscale-enterprise-plan). Please [reach out for more information](/contact), and we'll be in touch shortly.

The customer must determine whether they are a Covered Entity &mdash; or a Business Associate of a Covered Entity &mdash; as defined under HIPAA. If so, the customer may require a BAA with PlanetScale for the purposes of our relationship.

Responsibility around HIPAA compliance between PlanetScale and the customer is implemented using a shared responsibility model. While PlanetScale Enterprise plans provide a secure and compliant infrastructure for the storage and processing of Protected Health Information (PHI), the customer is ultimately responsible for ensuring that the environment and applications that they build on top of PlanetScale are properly configured and secured according to HIPAA requirements.

The Department of Health and Human Services does not recognize any formal certification for HIPAA. PlanetScale systems, software, networks, and procedures are consistent with the controls outlined in the relevant rules.

### Additional audit logging features

In addition to the [audit log](https://planetscale.com/docs/concepts/audit-log) feature available to all PlanetScale plans, Enterprise plans can use our EventBridge configuration to send logs to your AWS account. Ask your PlanetScale account manager for more information on how to set it up.

{% callout type="note" %}
If you have any questions or concerns related to the security and compliance of any PlanetScale Enterprise plans, please [contact us](/contact), and we will be happy to discuss them further.
{% /callout %}

## Available on Enterprise single-tenant plans

PlanetScale offers two single-tenant deployment options: Single-tenant and PlanetScale Managed for organizations that require a single-tenant environment. See the [section below](#available-on-planetscale-managed) for more information on PlanetScale Managed-only security and compliance features.

{% callout type="note" %} [Contact us](/contact) if you are interested in exploring PlanetScale single-tenant deployment options for your organization.{% /callout %}

### Private database connectivity

By default, all PlanetScale connections are encrypted but public. Optionally, you also have the option to use private database connectivity through [AWS PrivateLink](/docs/enterprise/managed/aws/privatelink) or [GCP Private Service Connect](/docs/enterprise/managed/gcp/private-service-connect), which are only available on single-tenant deployment options.

### Dedicated AWS sub-account or GCP organization

PlanetScale single-tenant deployment options are deployed into a dedicated AWS sub-account or GCP organization owned by PlanetScale. If you want PlanetScale to deploy into your own AWS sub-account or GCP organization, owned by your organization, see PlanetScale Managed below.

## Available on PlanetScale Managed

PlanetScale Managed is a single-tenant deployment of PlanetScale within your Amazon Web Services (AWS) or Google Cloud Platform (GCP) account. In this configuration, you can use the same API, CLI, and web interface that PlanetScale offers, with the benefit of running entirely in your own AWS sub-account or GCP organization. You can learn more on the [PlanetScale Managed overview page](/docs/enterprise/managed/overview).

### Deploy in your own AWS or GCP account

PlanetScale Managed is a packaged [data plane](https://en.wikipedia.org/wiki/Data_plane), built on [Vitess and Kubernetes](/blog/scaling-hundreds-of-thousands-of-database-clusters-on-kubernetes), that's deployed to an AWS sub-account or GCP project that you own and we operate. Your database lives entirely inside a dedicated sub-account or project within your cloud organization. PlanetScale will not have access to other sub-accounts or projects nor your organization-level settings within the cloud service provider.

Read more on how PlanetScale Managed works inside either cloud provider:

- [PlanetScale Managed on Amazon Web Services](/docs/enterprise/managed/aws/overview)
- [PlanetScale Managed on Google Cloud Platform](/docs/enterprise/managed/gcp/overview)

### PCI compliance

PlanetScale Managed, when deployed inside AWS with the appropriate controls enabled via our Shared Responsibility Matrix, has been issued an Attestation of Compliance (AoC) and Report on Compliance (RoC), certifying our compliance with the PCI DSS 4.0 as a Level 1 Service Provider. This enables PlanetScale Managed on AWS to be used via a shared responsibility model across merchants, acquirers, issuers, and other roles in storing and processing cardholder data.

### Human access flow

PlanetScale Managed supports customer counter-approval for access to Managed environment(s) by PlanetScale employees via an integration in the web application. Talk to your Customer Engineer about enabling this feature.

### Other PlanetScale Managed security features

PlanetScale Managed on AWS also supports:

- [Fully private network isolation](/docs/enterprise/managed/aws/overview#fully-private-network-isolation)
- [Third-account customer-controlled public key infrastructure (PKI)](/docs/enterprise/managed/aws/overview#third-account-customer-controlled-public-key-infrastructure)

## Corporate security

### Background checks

Background checks are performed on new team members during onboarding (within 30 days of their start date) as permitted by local law.

### Security training

All team members complete security awareness training covering company security policies and procedures during onboarding (within 30 days of their hire date). Trainings are required annually after that for all employees.

The training material is designed to assist the employee in identifying and responding to social engineering and other cybersecurity risks they may encounter as part of their role at PlanetScale.

## Security operations

### Endpoints

All company-provided devices are managed with [Kandji](https://kandji.io). Device configuration is based on the Center for Internet Security (CIS) level 1 benchmark and is continuously enforced. Mobile device management deploys and enables relevant services to ensure corporate endpoints are appropriately monitored.

### Extended Detection and Response (XDR)

PlanetScale administrative endpoints, such as devices used by employees, are monitored via endpoint detection and response systems.

### Detection and response

PlanetScale employs measures for both corporate endpoints and cloud instances to collect, analyze, and store events, connections, and other potentially relevant metadata in real-time. Automated systems match events against internal and known bad patterns and intelligence streams.
