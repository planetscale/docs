---
title: 'Set up PlanetScale Managed in AWS'
subtitle: 'Learn how to set up PlanetScale Managed within a AWS sub-account.'
label: 'Managed'
date: '2023-12-06'
---

## Overview

The following guide will walk you through setting up a PlanetScale Managed cluster in your Amazon Web Services (AWS) organization. If you have any questions while working through this documentation, contact your PlanetScale Solutions Engineer for assistance.

{% callout type="note" %}
This guide is only intended for PlanetScale Managed customers currently working with the PlanetScale team. You cannot set PlanetScale Managed up on your own without PlanetScale enabling it for your organization. If you are interested in [PlanetScale Managed](/docs/enterprise/managed/overview), please [contact us](/contact).
{% /callout %}

## Step 1: Account requirements

A new AWS sub-account must be set up following this documentation to successfully bootstrap a new PlanetScale Managed cluster. An existing AWS organization is required to proceed with this guide.

### Dedicated sub-account

PlanetScale Managed requires the use of a standalone sub-account in Amazon Web Services. This account should not have any existing resources running within it.

The [creating a member account in your organization document](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_create.html#orgs_manage_accounts_create-new) covers how to create a new sub-account in an existing AWS organization. The document also includes the required permissions to create a sub-account in your AWS organization.

### Modification of accounts

Once the sub-account is handed over to PlanetScale via granting IAM permissions, it should not be modified. Issues caused by modifications of the sub-account or its resources void the PlanetScale Managed SLA. Contact <support@planetscale.com> to discuss configuration changes or customization.

### Recommendations

During the initial provisioning process, PlanetScale applies the following recommendations to the AWS sub-account but still recommends that a customer enable them once the sub-account has been created:

- **Encryption by default:** PlanetScale enables EBS encryption by default using the AWS-managed keys in the relevant regions in the sub-account. If you want to change this behavior, please consult PlanetScale before the initial deployment process.

- **AWS CloudTrail + AWS Config:** Enable AWS CloudTrail for management events and resource tracking using AWS Config.

### PCI Compliance

Customers of PlanetScale Managed should ensure the following additional configurations are applied and maintained to ensure that the customer environment remains PCI-compliant for the storage and protection of cardholder data:

#### Local Authentication Parameters

As PlanetScale does not have access to IAM logs for the customer application environment, to maintain compliance with PCI requirement 8.3.4, it is the customer’s responsibility to ensure that all invalid login attempts to the cardholder data environment hosted in AWS are logged.

#### Log Level Configuration

The PlanetScale-controlled AWS sub-account will be pre-configured by PlanetScale with [AWS CloudTrail](https://aws.amazon.com/cloudtrail/) enabled and configured to emit logging events from the customer application. As PlanetScale does not retain access to these logs after the account is configured, to maintain compliance with PCI requirement 10.2.1.1 (audit logs capture all individual user access to cardholder data), it is the customer’s responsibility to ensure this logging remains enabled and to regularly review and verify the following events:

- All administrative action
- Accessing cardholder data
- Accessing audit trails
- Invalid access attempts
- Successful access attempts
- Elevation of privileges
- Creation/deletion/changing an account with admin privileges
- Start/stop/pausing of audit logs

As a best practice, it is recommended that these logs be captured and continuously analyzed by a Security Information & Event Management (SIEM) platform.

## Step 2: Cross-account key management

PlanetScale supports using Amazon Web Services Key Management Service with cross-account IAM permissions. This enables the isolation of keys so the infrastructure operated by PlanetScale has limited access to symmetric keys. AWS Elastic Block Storage and S3 are the services used with the key in question.

In the KMS key's account, apply the baseline key policy:

```json
{
  "Sid": "Allow PlanetScale Managed to use this key",
  "Effect": "Allow",
  "Principal": {
    "AWS": ["[PlanetScale Managed sub-account ID]"]
  },
  "Action": ["kms:Encrypt", "kms:Decrypt", "kms:ReEncrypt*", "kms:GenerateDataKey*", "kms:DescribeKey"],
  "Resource": "*"
}
```

Additional key policy is required to allow the sub-account to create persistent resources with the KMS key:

```json
{
  "Sid": "Allow attachment of persistent resources for PlanetScale Managed",
  "Effect": "Allow",
  "Principal": {
    "AWS": "[PlanetScale Managed sub-account ID]"
  },
  "Action": ["kms:CreateGrant", "kms:ListGrants", "kms:RevokeGrant"],
  "Resource": "*",
  "Condition": {
    "Bool": {
      "kms:GrantIsForAWSResource": "true"
    }
  }
}
```

Once these policies are attached to the key, provide PlanetScale with the full ARN of the KMS key. PlanetScale will attach relevant IAM policies to roles that require using the key.

## Step 3: Bootstrap with CloudFormation

We've created a CloudFormation template to complete the setup of required permissions in your AWS sub-account.

Save the following as `planetscale-bootstrap.json`:

```json
{
  "Resources": {
    "GrantTerraformRunnerAccess": {
      "Type": "AWS::IAM::Role",
      "DeletionPolicy": "Retain",
      "Properties": {
        "RoleName": "TerraformRunner",
        "ManagedPolicyArns": ["arn:aws:iam::aws:policy/AdministratorAccess"],
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "AWS": [
                  "arn:aws:iam::313573332105:role/aws-reserved/sso.amazonaws.com/AWSReservedSSO_Ops_feec88bc3aad314d"
                ]
              },
              "Action": ["sts:AssumeRole"]
            }
          ]
        }
      }
    },
    "GrantOpsAccess": {
      "Type": "AWS::IAM::Role",
      "DeletionPolicy": "Retain",
      "Properties": {
        "RoleName": "PlanetscaleOps",
        "ManagedPolicyArns": ["arn:aws:iam::aws:policy/AdministratorAccess"],
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "AWS": [
                  "arn:aws:iam::867309876077:role/aws-reserved/sso.amazonaws.com/AWSReservedSSO_Ops_f1d00b216d43a785"
                ]
              },
              "Action": ["sts:AssumeRole"]
            }
          ]
        }
      }
    }
  }
}
```

Next, apply the CloudFormation template as a new stack:

```shell
aws cloudformation create-stack --stack-name planetscale-bootstrap \
  --template-body file://planetscale-bootstrap.json \
  --capabilities CAPABILITY_NAMED_IAM
```

Let your Solutions Engineer know once the new stack reaches the `CREATED` state in AWS.

## Step 4: Requesting an initial quota increase

By default, AWS may provision new sub-accounts with EC2 On-Demand quotas that may be too small for:

- PlanetScale's initial provisioning process
- The databases you may want to provision on your PlanetScale Managed cluster

Although the PlanetScale Support and Operations teams will have the ability to request quota increases on your behalf after you give us access to the AWS sub-account, we recommend that you review the following quotas and request increases as necessary, as requesting quota increases later will delay the process:

- [Running On-Demand Standard (A, C, D, H, I, M, R, T, Z) instances](https://console.aws.amazon.com/servicequotas/home/services/ec2/quotas/L-1216C47A) &mdash; Since PlanetScale Managed typically runs small instances by default, it is generally best to set this high enough to avoid any later issues. At least **300** is sufficient for most customers.
- [Storage for General Purpose SSD (gp3) volumes, in TiB](https://console.aws.amazon.com/servicequotas/home/services/ebs/quotas/L-7A658B76) &mdash; Note that we typically will keep 3 copies of all data (primary plus 2 replicas), so you have to consider that here. We will also create volumes at backup time, which could be a temporary 4th copy for quota purposes. **50** TiB should be sufficient for most customers.
- [Storage modifications for General Purpose SSD (gp3) volumes, in TiB](https://console.aws.amazon.com/servicequotas/home/services/ebs/quotas/L-59C8FC87) &mdash; Ensure this is large enough, if possible, to cover your largest database so that storage volume performance modifications can be made (if necessary), without replacing volumes. Again, **50** TiB or more should be sufficient in most cases.

You can read more about how to request a quota increase in the [AWS requesting a quota increase documentation](https://docs.aws.amazon.com/servicequotas/latest/userguide/request-quota-increase.html).

{% callout type="note" %}
If you have AWS Enterprise Support, you can contact your account manager to expedite quota requests; otherwise, quota requests above your current limit can take at least one business day. There is also a limit on how often you can make quota requests. A quota request can only be made once every 6 hours.
{% /callout %}

## Step 5: Initiating the provisioning process

Once the CloudFormation stack has returned as `CREATED`, notify your Solutions Engineer, providing them the following information:

- The name of the organization that you have created on `app.planetscale.com`.
- The AWS Account ID of the sub-account, which can be found by using one of the choices in the [AWS account ID and alias documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html).
- A confirmation of the region(s) that you have chosen for the deployment to reside in. The canonical list of regions can be found in the [AWS Regions and Zones documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions).

Once your Solutions Engineer receives this information, they will forward it to the team responsible for provisioning your deployment. Provisioning the deployment takes PlanetScale, on average, one business day.

Once the deployment has been provisioned, your Solutions Engineer will contact you to confirm that your team can start creating databases.

{% callout type="note" %}
Optionally, PlanetScale can connect you to your databases via [AWS PrivateLink](https://aws.amazon.com/privatelink/) with PlanetScale Managed. See the [AWS PrivateLink documentation](/docs/enterprise/managed/aws/privatelink) for more information on establishing a PrivateLink connection.
{% /callout %}
