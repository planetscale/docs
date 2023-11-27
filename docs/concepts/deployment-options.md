---
title: 'Deployment options'
subtitle: 'Learn about the different deployment options PlanetScale offers.'
date: '2023-10-16'
---

## Overview

PlanetScale offers two deployment options to accommodate your application and business needs: multi-tenancy and single-tenancy.

**Multi-tenancy** &mdash; In a multi-tenant environment, your database is hosted on infrastructure shared with other users/customers.
**Single-tenancy** &mdash; In a single-tenant environment, your database is hosted on dedicated infrastructure that is not shared with any other users/customers.

Your deployment options depend on the [PlanetScale plan](/docs/concepts/planetscale-plans) you choose. This documentation covers some differences between single-tenancy and multi-tenancy so you can evaluate which plan may be suitable for you. For an in-depth look at the different plans we offer, see the [PlanetScale plans documentation](/docs/concepts/planetscale-plans).

## Multi-tenancy deployment on PlanetScale

Multi-tenancy is the default deployment option. When you sign up for a PlanetScale account, whether on a Hobby, Scaler, or Scaler Pro plan, your databases will be created in our multi-tenancy deployment offering. Our Enterprise plan also offers a multi-tenancy deployment option.

### Multi-tenancy highlights

- Your database runs on PlanetScale's [secure cloud infrastructure](/docs/concepts/security)
- Lowest cost plans
- No configuration requirements on your end
- BAAs available for HIPAA compliance

## Single-tenancy deployment on PlanetScale

Single-tenant deployment options are available with [PlanetScale Enterprise](/docs/concepts/planetscale-plans#planetscale-enterprise-plan). Companies that require their PlanetScale databases to be hosted in a single-tenant environment have two options: Enterprise &mdash; Single-tenant and Managed.

{% callout %}
In both options, your database is deployed in a single-tenant environment. The main difference between Enterprise &mdash; Single-tenant and Managed is who owns the underlying account. With [Managed](/docs/enterprise/managed/overview), your database is deployed in your own AWS/GCP account. With Enterprise &mdash; Single-tenant, PlanetScale owns and manages the account.

If you're interested in learning more, please [reach out](/contact) and we can figure out the best solution for your use case.
{% /callout %}

### Single-tenancy highlights

- Your resources run on a separate isolated AWS or GCP account, apart from other customers
- Your databases can be deployed to any cloud provider region you choose that offers three Availability Zones, even [regions](/docs/concepts/regions) that PlanetScale does not offer on our self-serve plans
- You can continue to use the PlanetScale UI and CLI in the same way that you would our general self-serve offerings, but the infrastructure runs in an isolated environment
- BAAs available for HIPAA compliance
- Support for private database connectivity via:
  - **AWS** &mdash; [AWS PrivateLink](https://aws.amazon.com/privatelink/) (recommended) or [VPC Peering](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html)
  - **GCP** &mdash; [Private Service Connect](https://cloud.google.com/vpc/docs/private-access-options)

If you have any questions about which deployment option may be best for you, [reach out to us](/contact) and we can help you figure it out.
