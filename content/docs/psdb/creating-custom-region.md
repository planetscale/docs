---
title: 'Create a custom region (Beta)'
---

# Create a cluster in a custom region

This document explains how to create a cluster in a **custom region** using the PlanetScale console. A custom region uses a Kubernetes cluster that you control on a cloud provider, instead of using a PlanetScale-managed private cloud.

<!-- If we create a concept doc for custom cluster, we should link to it here.-->

## Overview

To create a custom cluster, complete the following steps:

1. Open the **Clusters** view.
1. Click **Create Cluster**.
1. Name your cluster.
1. Select **Custom Kubernetes Region**.
1. Click **Create new custom region**.
1. Download the script.
1. Execute the script.
1. Paste the output of the script into the field under **Step 2: Provide details**.
1. Click **Continue**.
1. Provide details for Backup Store.
1. Name your Custom Region.
1. Click **Create Custom Region.**
1. Click **Finish**.

## Step 1: Open the **Clusters** view.

When you create a PlanetScale.com account, you are prompted to create a cluster. You can also access this view by going to [console.planetscale.com/clusters](https://console.planetscale.com/clusters).

## Step 2: Click **Create Cluster**.

## Step 3: Name your cluster.

After clicking **Create Cluster**, you are prompted to name your cluster.

The name of your cluster is prepended with your account name, and must be unique.

## Step 4: Select **Custom Kubernetes Region**.

## Step 5: Click **Create new custom region**.

## Step 6: Download the script.

<!-- We need to update this with more details about what the script does, especially if it makes changes to the user's k8s environment. -->

This script will output details about your Kubernetes cluster.

To download the script using cURL, use the following command:

```bash
curl -o kubernetes-prepare.sh https://console.planetscale.com/api/kubernetes-prepare-script
```

To download the script using Wget, use the following command:

```bash
wget -O kubernetes-prepare.sh https://staging.planetscalelabs.com/api/kubernetes-prepare-script
```

## Step 7: Execute the script.

Run `kubernetes-prepare.sh`. The script will target the Kubernetes cluster in your current `kubectl` context.

Optionally, you can run the script with either of the following flags:

+ `--dry-run`: Review the changes that the script would make to your Kubernetes cluster without making the changes.
+ `--namespace`: Run the script against a specific namespace. The default namespace is the namespace of your current context. The most common value for this namespace is `default`.

For example, the following command outputs the changes that the script would make to the namespace `other-namespace`:

```console
$ bash kubernetes-prepare.sh --dry-run --namespace other-namespace
```

The following command runs the script against the namespace in the current `kubectl` context:

```console
$ bash kubernetes-prepare.sh
```

Because the script makes changes to your Kubernetes cluster, you must run the script without the `--dry-run` flag before you can create a custom cluster.

You should see output like this:

```console
----- COPY EVERYTHING BELOW THIS LINE -----
apiserver: "https://35.193.15.193"
ca_crt:"<CA certificate string>"
token: "<token string>"
namespace: "default"
storageclasses:
  - "standard"
default_storageclass: "standard"
failure_domain:
  zone:
    - "us-central1-a"
    - "us-central1-a"
    - "us-central1-a"
  region:
    - "us-central1"
    - "us-central1"
    - "us-central1"
provider: "gce"
```

For more information about the `kubernetes-prepare.sh` script, see [Custom region requirements](custom-region-requirements).

## Step 8: Provide script output.

Paste the output of the script from Step 7 into the field under \*\*C: Paste Script Output".

## Step 9: Click **Continue**.

## Step 10: Provide the details for your Backup Store.

PlanetScaleDB requires access to a storage bucket. Provide storage bucket details for yourAmazon S3, GCP Cloud Storage, or Azure Cloud Storage bucket.

## Step 11: Input your **Custom Region Name**.

## Step 12: Click **Create custom region.**

A summary of your custom region will appear.

## Step 13: Review and click **Finish**.

Your custom region name now appears when you [Create a cluster](creating-cluster).

## What's next

+ [Create a cluster](creating-cluster) 
+ Learn about [custom region requirements](custom-region-requirements). 