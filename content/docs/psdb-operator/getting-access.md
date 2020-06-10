---
title: 'Getting Access'
category: 'psdb-operator'
---

# Getting access to the PlanetScaleDB Operator

This document describes different methods for getting access to the PlanetScaleDB Operator for Vitess.

The PlanetScaleDB operator resides in a private registry. There are two methods to get access to the registry:

- Request access to a Google Cloud Platform (GCP) service account that PlanetScale controls, or
- Request that PlanetScale grant access to an existing GCP service account that you control.

Once you have a service account with access to the registry, you can use that service account to deploy the operator in a Kubernetes cluster. The Kubernetes cluster can run on any cloud provider or local machine.

## Request a service account from PlanetScale (Recommended)

To request a service account from PlanetScale, contact us at <support@planetscale.com>. Include in your message how you wish to receive the details for the service account, including key material.

PlanetScale will provide you with a JSON keyfile containing the credentials for a service account with access to the private registry.

Note: Keep these credentials private, as they are not password-protected.

### Verifying access via Docker with a service account from PlanetScale

To verify access via Docker with a service account from PlanetScale, follow these steps:

1. Enter the following command to authorize your local Docker instance using the JSON keyfile you receive from PlanetScale:

   ```console
   cat credentials.json | docker login -u _json_key --password-stdin https://us.gcr.io/planetscale-operator
   ```

1. To confirm that you can access and pull images from the PlanetScale private registry using Docker, enter the following command:

   ```console
   docker pull us.gcr.io/planetscale-operator/operator2:latest
   ```

   You should see output like the following:

   ```console
   Trying to pull repository us.gcr.io/planetscale-operator/operator2 ...
   sha256:fa10ec7dc798ba31c1e89526d0b9b808a9892e943086185b5bb60f983d6c1a86: Pulling from
   us.gcr.io/planetscale-operator/operator2
   d4f4c1009c68: Pull complete
   281b84a2301a: Pull complete
   531dd41dff1a: Pull complete
   eb37bea6120f: Pull complete
   72083c8bd341: Pull complete
   Digest: sha256:fa10ec7dc798ba31c1e89526d0b9b808a9892e943086185b5bb60f983d6c1a86
   Status: Downloaded newer image for us.gcr.io/planetscale-operator/operator2:latest
   ```

## Provide an existing GCP service account to PlanetScale

To provide a service account to PlanetScale, follow these steps:

1. [Create the service account](https://cloud.google.com/iam/docs/creating-managing-service-accounts) you wish to use.
1. Contact us at <support@planetscale.com>. Include in your message the service account name. in the following format: `serviceaccountname@gcp_project_name.iam.gserviceaccount.com`. PlanetScale will grant the service account access to our private registry.
1. Generate token key material for this service account.

### Verifying access via Docker with your own service account

1. Create a JSON key for your service account using the `gcloud` command:

   ```console
   gcloud iam service-accounts keys create ~/credentials.json --iam-account=serviceaccountname --project gcp_project_name
   ```

1. Authorize your local Docker instance using the following command:

   ```console
   cat credentials.json | docker login -u _json_key --password-stdin https://us.gcr.io/planetscale-operator
   ```

1. To confirm that you can access and pull images from the PlanetScale private registry using Docker, enter the following command:.

   ```console
   docker pull us.gcr.io/planetscale-operator/operator2:latest
   ```

   You should see output like the following:

   ```console
   Trying to pull repository us.gcr.io/planetscale-operator/operator2 ...
   sha256:fa10ec7dc798ba31c1e89526d0b9b808a9892e943086185b5bb60f983d6c1a86: Pulling from
   us.gcr.io/planetscale-operator/operator2
   d4f4c1009c68: Pull complete
   281b84a2301a: Pull complete
   531dd41dff1a: Pull complete
   eb37bea6120f: Pull complete
   72083c8bd341: Pull complete
   Digest: sha256:fa10ec7dc798ba31c1e89526d0b9b808a9892e943086185b5bb60f983d6c1a86
   Status: Downloaded newer image for us.gcr.io/planetscale-operator/operator2:latest
   ```

## Next steps

- [Get started with the PSDB Operator on GCP](gcp-quickstart.md)
