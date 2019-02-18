---
title: 'Database-as-a-Service Service Level Agreement'
date: '2019-02-01'
---

#Database-as-a-Service Service Level Agreement

##Last Updated February 15, 2019

This PlanetScale DBaaS Service Level Agreement ("SLA") is a policy governing the use of the PlanetScale Database As a Service ("PlanetScale DBaaS") under the terms of the PlanetScale Cloud Database Agreement (the "PlanetScale Agreement") between PlanetScale Inc. and its affiliates ("PlanetScale", "us" or "we") and users of PlanetScale’ services ("you"). This SLA applies separately to each account using PlanetScale DBaaS. Unless otherwise provided herein, this SLA is subject to the terms of the PlanetScale Agreement and capitalized terms will have the meaning specified in the PlanetScale Agreement. We reserve the right to change the terms of this SLA in accordance with the PlanetScale Agreement.

###Service Commitment

PlanetScale will use commercially reasonable efforts to make shards (with at least 3 replicas) available with a Monthly Uptime Percentage (defined below) of at least 99.95% during any monthly billing cycle (the "Service Commitment"). In the event PlanetScale DBaaS does not meet the Monthly Uptime Percentage commitment, you will be eligible to receive a Service Credit as described below.

###Definitions

* "Monthly Uptime Percentage" for a given shard (with at least 3 replicas) is calculated by subtracting from 100% the percentage of 1 minute periods during the monthly billing cycle in which the shards (with at least 3 replicas) was "Unavailable". If you have been running the shards (with at least 3 replicas) for only part of the month, your shard with at least 3 replicas is assumed to be 100% available for the portion of the month that it was not running. Monthly Uptime Percentage measurements exclude downtime resulting directly or indirectly from any PlanetScale DBaaS SLA Exclusion (defined below).

* "Unavailable" means that all connection requests to the running shards (with at least 3 replicas) fail during a 1 minute period.

* A "Service Credit" is a dollar credit, calculated as set forth below, that we may credit back to an eligible account.

###Service Credits

Service Credits are calculated as a percentage of the charges paid by you for the shard (with at least 3 replicas) that did not meet the Monthly Uptime Percentage commitment in a billing cycle in accordance with the schedule below.

| Monthly Uptimes Percentage | Service Credit Percentage |
| Less than 99.95% but equal to or greater than 99.0% | 10% |

We will apply any Service Credits only against future PlanetScale DBaaS payments otherwise due from you. At our discretion, we may issue the Service Credit to the credit card you used to pay for the billing cycle in which the unavailability occurred. Service Credits will not entitle you to any refund or other payment from PlanetScale. A Service Credit will be applicable and issued only if the credit amount for the applicable monthly billing cycle is greater than one dollar ($1 USD). Service Credits may not be transferred or applied to any other account. Notwithstanding anything to the contrary in the PlanetScale Agreement, your sole and exclusive remedy for any unavailability or non-performance or other failure by us to provide PlanetScale DBaaS is the receipt of a Service Credit (if eligible) in accordance with the terms of this SLA.

###Credit Request and Payment Procedures

To receive a Service Credit, you will need to submit a claim by opening a case in the [PlanetScale Support Center](www.planetscale.com/support). To be eligible, the credit request must be received by us by within 30 days after which the incident occurred and must include:

i. the words "SLA Credit Request" in the subject line;

ii. the dates and times of each Unavailability incident you are claiming;

iii. the DB Instance IDs and the PlanetScale Regions of the affected shards (with at least 3 replicas); and

iv. your request logs that document the errors and corroborate your claimed outage (any confidential or sensitive information in these logs should be removed or replaced with asterisks).

If the Monthly Uptime Percentage of such request is confirmed by us and is less than the Service Commitment, then we will issue the Service Credit to you within one billing cycle following the month in which the request occurred. Your failure to provide the request and other information as required above will disqualify you from receiving a Service Credit.

###PlanetScale DBaaS SLA Exclusions

The Service Commitment does not apply to any unavailability, suspension or termination of PlanetScale DBaaS, or any other PlanetScale DBaaS performance issues:

(i) that result from any suspension or termination of your right to use PlanetScale DBaaS in accordance with the PlanetScale Agreement;

(ii) caused by factors outside of our reasonable control, including any force majeure event or Internet access or related problems beyond the demarcation point of PlanetScale DBaaS;

(iii) that result from any voluntary actions or inactions from you or any third party (e.g., rebooting a database instance, scaling compute capacity, not scaling storage when the storage is full, misconfiguring security groups, VPC configurations or credential settings, disabling encryption keys or making the encryption keys inaccessible, etc.);

(iv) that result from instances belonging to the Micro DB instance class or other instance classes which have similar CPU and memory resource limitations;

(v) that result from you not following the basic operational guidelines described in the PlanetScale DBaaS Documentation (e.g., overloading a database instance to the point it is inoperable, creating excessively large number of tables that significantly increase the recovery time etc.);

(vi) caused by underlying database engine software that lead to repeated database crashes or an inoperable database instance;

(vii) that result in long recovery time due to insufficient IO capacity for your database workload;

(viii) that result from your equipment, software or other technology and/or third party equipment, software or other technology (other than third party equipment within our direct control); or

(ix) that result from any maintenance as provided for pursuant to the PlanetScale Agreement (collectively, the "PlanetScale DBaaS SLA Exclusions").

If availability is impacted by factors other than those explicitly used in our Monthly Uptime Percentage calculation, then we may issue a Service Credit considering such factors at our discretion.
