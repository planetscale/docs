---
title: 'Audit log'
subtitle: "Search your organization's audit log to review member actions and events."
date: '2022-08-04'
---

## Overview

The organization audit log grants [Organization Administrators](/docs/concepts/access-control#organization-administrator) access to review **actions** performed by individual members of the organization. In addition, each audit log includes **events** detailing who performed the **action** and when it happened.

Audit log retainment period is [based on your plan](/docs/concepts/billing#planetscale-plans):

- **Hobby** &mdash; 5 days
- **Scaler Pro** &mdash; 15 days
- **Enterprise** &mdash; Unlimited

{% callout %}
Organization audit log access is limited to [Organization Administrators](/docs/concepts/access-control#organization-administrator).
{% /callout %}

## Review your organization audit log

You can review your organization audit log under [your PlanetScale **organization** settings](https://app.planetscale.com/~/settings/audit-log).

Once there, you can filter the audit log by **Actor** and/or **Action**.

Clicking and expanding individual log **event** names empowers you to investigate additional metadata that can provide broader context around what changed.

![Click to expand individual log events.](/assets/docs/concepts/audit-log/event.png)

## Audited organization events

You can track the following organization **events** in your PlanetScale account:

{% table %}

- PlanetScale organization events
- Actions

---

- branch
- created

  deleted

---

- database
- created

  deleted

---

- deploy_request
- approved

  closed

  created

  deleted

  queued

  unqueued

---

- integration
- created

  deleted

---

- organization_invitation
- created

  deleted

---

- organization_membership
- created

---

- organization
- joined

  removed_member

  disabled_sso

  enabled_sso

  updated_role

---

- service_token
- created

  deleted

  granted_access

{% /table %}

{% callout title="Next steps" %}

- [Non-blocking schema changes](/docs/concepts/nonblocking-schema-changes)

{% /callout %}
