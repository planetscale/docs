---
title: 'Creating a Custom Kubernetes Region (Beta)'
---

# Create a cluster in a Custom Kubernetes Region

This document explains how to create a cluster in a **Custom Kubernetes Region** using the PlanetScale console. A Custom Kubernetes Region uses a Kubernetes cluster that you control on a cloud provider, instead of using a PlanetScale-managed private cloud.

## Overview

To create a cluster in a Custom Kubernetes Region, complete the following steps:

1. Open the **Custom K8s Regions** view.
1. Click **Create new Custom Kubernetes Region**.
1. Download the script.
1. Execute the script.
1. Paste the output of the script into the field under **Step 2: Provide details**.
1. Click **Continue**.
1. Provide details for Backup Store.
1. Select a load balancer type.
1. Name your Custom Region.
1. Click **Create Custom Region.**
1. Click **Finish**.

## Step 1: Open the **Custom K8s Regions** view.

In the left menu of the [PlanetScaleDB console](https://console.planetscale.com/regions), click **Custom K8s Regions**. You can also access this view by going to [console.planetscale.com/regions](https://console.planetscale.com/regions).

## Step 2: Click **Add your first custom Kubernetes region**.

## Step 3: Download the script.

This script will output details about your Kubernetes cluster.

To download the script using cURL, use the following command:

```bash
curl -o kubernetes-prepare.sh https://console.planetscale.com/api/kubernetes-prepare-script
```

To download the script using Wget, use the following command:

```bash
wget -O kubernetes-prepare.sh https://staging.planetscalelabs.com/api/kubernetes-prepare-script
```

## Step 4: Execute the script.

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

For more information about the `kubernetes-prepare.sh` script, see [Custom Kubernetes Region requirements](custom-region-requirements).

## Step 5: Provide script output.

Paste the output of the script from Step 7 into the field under **C: Paste Script Output**.

## Step 6: Click **Continue**.

## Step 7: Provide the details for your Backup Store.

PlanetScaleDB requires access to a storage bucket. Provide storage bucket details for yourAmazon S3, GCP Cloud Storage, or Azure Cloud Storage bucket.

## Step 8: Select a load balancer type

Under **Kubernetes Configuration**, click the **Load Balancer** drop-down menu to select **Internal**, **External**, or **None**.

+ An **Internal** load balancer does not have a public IP: a client outside the Kubernetes cluster VPC cannot access your database.
+ An **External** load balancer allows clients to connect to your database from outside of the VPC.
+ **None** provides a service that is only accessible from within the same Kubernetes cluster.

## Step 9: Input your **Custom Region Name**.

## Step 10: Click **Create Custom Kubernetes Region.**

A summary of your Custom Kubernetes Region will appear.

## Step 11: Review and click **Finish**.

Your Custom Kubernetes Region name now appears when you [Create a cluster](creating-cluster).

## What's next

+ [Create a cluster](creating-cluster) 
+ Learn about [Custom Kubernetes Region requirements](custom-region-requirements). 
