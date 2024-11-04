---
title: 'Billing'
subtitle: 'PlanetScale pricing was designed for transparency and scalability.'
date: '2024-03-12'
---

## Overview

PlanetScale applies billing plans at the **database level**. You can create several databases under one Organization. The usage charges will be scoped to each database, which you can find all together in the [billing section of your Organization](/docs/concepts/billing#organization-usage-and-billing-page). Each plan is further broken down in the [PlanetScale plans documentation](/docs/concepts/planetscale-plans).

{% callout %}
We used **[gibibytes, otherwise known as binary gigabytes](https://simple.wikipedia.org/wiki/Gibibyte)**, to calculate storage and usage limits. For reference, 1 binary gigabyte is equivalent to 2^30 bytes.
{% /callout %}

## Organization usage and billing page

Each organization has its own billing page available for administrators, from which you can:

- View your current and previous usage per database
- Enter/update your credit card information
- Activate coupons
- Add/update your business address, Vat ID, and other information shown on invoices
- Download current and previous invoices

**To find your billing page:**

1. Go to your [PlanetScale dashboard](https://app.planetscale.com)
2. Select the organization whose billing page you want to view
3. Click on "Settings" in the top nav
4. Click on "Billing" in the side nav

### PlanetScale invoice details

Invoices provide line items for both usage and discounts received.
Depending on the configuration of your database and the features you use, you may see line items for:

- Your primary database branch
- Development branch usage
- Storage usage per GB
- Read-only region nodes and storage
- Prorated discounts, if the branch existed for a smaller time period than the billing period

Storage is prorated by a percentage equal to the existence of a branch's hours/billing period in hours.

### Download an invoice

To download an invoice, go to [your billing page](#find-your-database-billing-page) (`Organization > Settings > Billing`).

You'll see a table of current and previous monthly invoices. You can download an invoice by month by clicking the "**Download**" button. This will send you to a Stripe invoice page, where you'll have the option to download the complete invoice in PDF format, see invoice details, or download your receipt.

To see more details about your billing from the PlanetScale dashboard, click the "**View details**" button on the Billing page next to the month you want to view. This will show you an overview of the charges for all of the databases in your organization.

## Payment methods

All plans require your organization has a valid payment method on file. You can use a debit or credit card, but we do not accept pre-paid cards.

It's possible to use the same card for multiple organizations, but only after the card has been used to successfully pay for a database in the first organization.

## Spend management

You have the option to set spend alerts from your organization's billing page. Once on the billing page, click the checkbox on the right next to "Enable spend alerts", type in the max budget, and click "Save". Organization administrators will receive an email when you hit 75% and 100% of your maximum monthly spend.

## Using coupons

You can redeem a coupon in the PlanetScale dashboard. To redeem a coupon, you must first enter your credit card information. Once you have a credit card on file, go to your Organization Settings page, click "Billing", click "Redeem a coupon" on the right, enter your coupon, and click "Redeem coupon".

{% callout %} You may incur additional costs if your usage continues beyond the period, dollar amount, or any other metrics specified in the coupon terms. Additional costs will be charged to your card on file. If you have any questions about the terms of the coupon, please reach out to [our Support team](#need-help). {% /callout %}

### How do coupons affect invoices

You will see your coupon reflected in your monthly invoice. Go to "Settings" > "Billing" > and select the invoice for the month(s) where your coupon was active. You will see a note at the top of the invoice similar to this:

`Amount reflects your $xx.xx discount with code YOURCOUPONCODE`

![PlanetScale dashboard - Example coupon factored into invoice](/assets/docs/concepts/billing/coupons-in-invoices.png)

## Canceling a Scaler Pro plan

Deleting a database will end its Scaler Pro plan and prorate the plan fee on your current invoice. You can delete a database from its settings page.

## Why do I see a pre-authorization charge on my card?

If you added a new billing method to your account or created a new database afterwards, you may see a temporary hold on your credit card. This is a pre-authorization that we use to verify that your card is valid, but you will not be charged the amount. This pre-authorization is automatically cancelled after verification, but it may take a few days for your bank to update your account statement to show this cancellation.
