---
title: 'Security and compliance'
subtitle: 'Learn about security and compliance with PlanetScale'
date: '2023-10-09'
---

PlanetScale is committed to delivering a powerful and easy-to-use database
platform while keeping your data secure. The security of our systems is of
the utmost importance and we consistently aim to improve our security posture by
building security into every layer of our products.

## Compliance reporting

PlanetScale continuously monitors and reports primarily using System and Organization
Controls (SOC) 2 Type 2. To receive a copy of the report please
[contact Support](https://support.planetscale.com/hc/en-us).

## PCI compliance

[PlanetScale Managed (deployed on AWS)](/docs/enterprise/managed/overview) has been issued an Attestation of Compliance (AoC) and Report on Compliance (RoC), certifying our compliance with the PCI DSS 4.0 as a Level 1 Service Provider. This enables [PlanetScale Managed](/blog/introducing-planetscale-managed) on AWS to be used via a shared responsibility model across merchants, acquirers, issuers, and other roles in storing and processing cardholder data.

## HIPAA

PlanetScale can enter into Business Associate Agreements (BAAs) with customers on [Enterprise plans](/docs/concepts/planetscale-plans#planetscale-enterprise-plan). Please [reach out for more information](/contact), and we'll be in touch shortly.

The customer must determine whether they are a Covered Entity &mdash; or a Business Associate of a Covered Entity &mdash; as defined under HIPAA. If so, the customer may require a BAA with PlanetScale for the purposes of our relationship.

Responsibility around HIPAA compliance between PlanetScale and the customer is implemented using a shared responsibility model. While PlanetScale Enterprise plans provide a secure and compliant infrastructure for the storage and processing of Protected Health Information (PHI), the customer is ultimately responsible for ensuring that the environment and applications that they build on top of PlanetScale are properly configured and secured according to HIPAA requirements.

The Department of Health and Human Services does not recognize any formal certification for HIPAA. PlanetScale systems, software, networks, and procedures are consistent with the controls outlined in the relevant rules.

## Application security

### Encryption of data

PlanetScale databases and their client communications are AES encrypted throughout the PlanetScale platform both in transit and at rest.

#### At rest

Data is encrypted at rest on the underlying storage media that serves database branches and also the underlying storage media that hosts your PlanetScale database backups. This helps mitigate the risk of unintentional or malicious access to user data on storage systems.

#### In transit

Encrypted data is transmitted to PlanetScale databases through three major paths:

- The [PlanetScale CLI](/docs/reference/planetscale-cli), leverages [Mutual TLS](https://en.wikipedia.org/wiki/Mutual_authentication#mTLS) when initiating a connection to PlanetScale via `shell` or `connect` commands.
- PlanetScale [connection strings](/docs/concepts/connection-strings) require the successful establishment of a TLS session before any SQL commands can be issued.
- [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) is used to secure all data transmitted between PlanetScale and [clients using PlanetScale Connect](/docs/concepts/planetscale-connect).

### Additional data protection controls

Communications to the PlanetScale API and Dashboard are encrypted using TLS 1.3.
Certificates are issued by an established third party certificate authority.

## Corporate security

### Background checks

Background checks are performed on new team members during onboarding (within
30 days of their start date) as permitted by local law.

### Security training

All team members complete security awareness training covering company security
policies and procedures during onboarding (within 30 days of their hire date).
Trainings are required annually thereafter for all employees.

The training material is designed to assist the employee in how to identify and
respond to social engineering and other cybersecurity risks they may encounter
as part of their role at PlanetScale.

## Security operations

### Endpoints

All company-provided devices are managed with [Kandji](https://kandji.io).
Device configuration is based on the Center for Internet Security (CIS)
level 1 benchmark and is continuously enforced. Mobile device management
deploys and enables relevant services to ensure corporate endpoints are
appropriately monitored.

### Detection and response

PlanetScale employs measures for both corporate endpoints and cloud instances
to collect, analyze, and store events, connections, and other potentially
relevant metadata in real time. Automated systems match events against internal
and known bad patterns and intelligence streams.

## Vulnerability disclosure

### In Scope

PlanetScale is actively seeking vulnerability reports for the following components that make up the product and its Production Environment:

- **Dashboard and API**: The website hosted at app.planetscale.com, along with the API hosted at api.planetscale.com
- **Database Operations**: The actions taken within the product to create, branch, backup, and restore databases
- **Database Connectivity and Behavior**: The process of provisioning a password and issuing SQL statements against a PlanetScale database
- **Command-line Interface**: The open source command-line interface hosted at [planetscale/cli](https://github.com/planetscale/cli)

### Out of scope

PlanetScale is not actively seeking the following types of reports:

- **Testing software output**: Output generated from automated testing software like [Burp Suite](https://portswigger.net/burp). These include, but aren't limited to:
  - CSRF on forms that are available to anonymous users or are related to logging out
  - Disclosure of known public files or directories (i.e. `robots.txt`)
  - DNSSEC or other DNS configuration suggestions
  - TLS and security header configuration suggestions
  - Sender Policy Framework (SPF) configuration suggestions
  - Flags on cookies that are not sensitive
- **Software version reports**: Reports notifying PlanetScale that newer versions of software have been released

### Reporting a vulnerability

If you believe you have discovered a security vulnerability in a PlanetScale product or its Production Environment, please let us know immediately.
You can submit your vulnerability findings to [security@planetscale.com](mailto:security@planetscale.com).

If applicable, please include the following pieces of information in your report:

- Steps to reproduce the vulnerability
- The word "mochi" to acknowledge that you have read these guidelines
- Any relevant software (including versions) used to identify the vulnerability
