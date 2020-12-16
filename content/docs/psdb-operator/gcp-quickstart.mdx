---
title: 'PlanetScaleDB Operator Quickstart on GCP'
category: 'psdb-operator'
---

# Getting started with the PlanetScaleDB Operator on Google Cloud Platform

## Introduction

This document shows how to use the PlanetScaleDB Operator to deploy a Vitess cluster on Google Cloud Platform (GCP).

## Prerequisites

This guide assumes you have the following components and services:

- [Access to the PlanetScaleDB Operator](/psdb-operator/getting-access)
- A [GCP service account](https://cloud.google.com/storage/docs/projects#service-accounts) with [access to the PlanetScaleDB Operator](getting-access).
- A [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/docs) (GKE) cluster;
- A local `kubectl` client [configured to access the GKE cluster](https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl) where you wish to install the operator;
- A [Google Cloud Storage (GCS) storage bucket](https://cloud.google.com/storage/docs/creating-buckets);
- A [Kubernetes secret matching your service account](https://cloud.google.com/kubernetes-engine/docs/tutorials/authenticating-to-cloud-platform#step_3_create_service_account_credentials);
- A local [installation of `vtctlclient`](https://vitess.io/docs/get-started/kubernetes/#prerequisites).

## Overview

To deploy a Vitess cluster on GCP using the PlanetScaleDB Operator, follow these steps:

1. Download the operator and example database configuration files.
1. Apply the Prometheus configuration file against your Kubernetes cluster.
1. Apply the operator configuration file against your Kubernetes cluster.
1. Edit the name of the Kubernetes secret in the database configuration file.
1. Apply the database configuration file to your cluster.
1. Port-forward the `vtctld` service to your Kubernetes cluster.
1. Apply the VSchema to your Vitess database.
1. Apply the SQL schema to your Vitess database.
1. Expose the Vitess service.
1. Connect to your Vitess database using a MySQL client.

## Step 1. Download the operator and example database configuration files.

Download the following files:

- [Prometheus configuration file](https://storage.googleapis.com/planetscale-operator/install/prometheus.yaml)
- [Operator configuration file](https://storage.googleapis.com/planetscale-operator/install/operator2.yaml)
- [Database configuration file](https://storage.googleapis.com/planetscale-operator/examples/exampledb.yaml)
- [Example VSchema](https://storage.googleapis.com/planetscale-operator/examples/vschema.json)
- [Example SQL schema](https://storage.googleapis.com/planetscale-operator/examples/schema.sql)

This guide will assume that the above files are in your working directory.

## Step 2. Apply the Prometheus configuration file against your Kubernetes cluster.

This step assumes that `kubectl` is configured to access the GKE cluster.

Enter the following command:

```console
$ kubectl apply -f prometheus.yaml
```

You should see the following output:

```console
customresourcedefinition.apiextensions.k8s.io/alertmanagers.monitoring.coreos.com created
customresourcedefinition.apiextensions.k8s.io/podmonitors.monitoring.coreos.com created
customresourcedefinition.apiextensions.k8s.io/prometheuses.monitoring.coreos.com created
customresourcedefinition.apiextensions.k8s.io/prometheusrules.monitoring.coreos.com created
customresourcedefinition.apiextensions.k8s.io/servicemonitors.monitoring.coreos.com created
```

## Step 3. Apply the operator configuration file against your Kubernetes cluster.

Enter the following command:

```console
$ kubectl apply -f operator2.yaml
```

You should see the following output:

```console
customresourcedefinition.apiextensions.k8s.io/etcdlockservers.planetscale.com configured
customresourcedefinition.apiextensions.k8s.io/ingresstemplates.planetscale.com created
customresourcedefinition.apiextensions.k8s.io/planetscaleclusters.planetscale.com created
customresourcedefinition.apiextensions.k8s.io/vitessbackups.planetscale.com unchanged
customresourcedefinition.apiextensions.k8s.io/vitessbackupstorages.planetscale.com configured
customresourcedefinition.apiextensions.k8s.io/vitesscells.planetscale.com configured
customresourcedefinition.apiextensions.k8s.io/vitessclusters.planetscale.com configured
customresourcedefinition.apiextensions.k8s.io/vitesskeyspaces.planetscale.com configured
customresourcedefinition.apiextensions.k8s.io/vitessshards.planetscale.com configured
serviceaccount/planetscale-operator2 created
serviceaccount/planetscale-operator2-admin-proxy created
role.rbac.authorization.k8s.io/planetscale-operator2 created
role.rbac.authorization.k8s.io/planetscale-operator2-admin-proxy created
rolebinding.rbac.authorization.k8s.io/planetscale-operator2 created
rolebinding.rbac.authorization.k8s.io/planetscale-operator2-admin-proxy created
service/planetscale-operator2-metrics created
service/planetscale-operator2-vbs-subcontroller-metrics created
priorityclass.scheduling.k8s.io/vitess configured
priorityclass.scheduling.k8s.io/vitess-monitoring created
priorityclass.scheduling.k8s.io/vitess-operator-control-plane configured
deployment.apps/planetscale-operator2 created
```

You can verify the status of the operator pods using the following command:

```console
$ kubectl get pods
```

You should see output like the following:

```console
NAME                                   READY  STATUS   RESTARTS  AGE
planetscale-operator2-5955f9889-6zx45  1/1    Running  0         12s
prometheus-operator-7ff5cf6455-9bzjh   1/1    Running  0         2m1s
```

## Step 4. Edit the name of the Kubernetes secret in the database configuration file.

This step is only necessary if you want to backup your database; for a quick test deployment, you can skip this step.

The exampledb.yaml file contains the name of the Kubernetes secret for your database:

```yaml
# Version: 20200113
apiVersion: planetscale.com/v2
kind: PlanetScaleCluster
metadata:
  name: example
spec:
  backup:
    locations:
      - gcs:
          bucket: mybucketname1
          authSecret:
            name: gcs-secret
            key: gcs_key.json
```

Edit the values of 'spec.backup.locations.gcs.bucket', 'spec.backup.locations.gcs.authSecret.name', and 'spec.backup.locations.gcs.authSecret.key' to reflect the values for your storage bucket and the Kubernetes secret for your GCP service account with access to a GCS bucket.

## Step 5. Apply the database configuration file to your cluster.

Apply the example database configuration to your Kubernetes cluster using the following command:

```console
$ kubectl apply -f exampledb.yaml
```

You should see the following output:

```console
planetscalecluster.planetscale.com/example created
secret/example-cluster-config created
```

After a few minutes, you should see the pods for your keyspace using the following command:

```console
$ kubectl get pods
```

You should see output like this:

```console
NAME                                                  READY  STATUS   RESTARTS  AGE
example-90089e05-vitessbackupstorage-subcontroller    1/1    Running  0         59s
example-etcd-faf13de3-1                               1/1    Running  0         59s
example-etcd-faf13de3-2                               1/1    Running  0         59s
example-etcd-faf13de3-3                               1/1    Running  0         59s
example-uscentral1a-vtctld-6a268099-56c48bbc89-6r9dp  1/1    Running  2         58s
example-uscentral1a-vtgate-bbffae2f-54d5fdd79-gmwlm   0/1    Running  2         54s
example-uscentral1a-vtgate-bbffae2f-54d5fdd79-jldzg   0/1    Running  2         54s
example-vttablet-uscentral1a-0261268656-d6078140      2/3    Running  2         58s
example-vttablet-uscentral1a-1579720563-f892b0e6      2/3    Running  2         59s
example-vttablet-uscentral1a-2253629440-17557ac0      2/3    Running  2         58s
example-vttablet-uscentral1a-3067826231-d454720e      2/3    Running  2         59s
example-vttablet-uscentral1a-3815197730-f3886a80      2/3    Running  2         58s
example-vttablet-uscentral1a-3876690474-0ed30664      2/3    Running  2         59s
planetscale-operator2-6f54958746-mr9hp                      1/1    Running  0         17m
```

## Step 6. Port-forward the `vtctld` service to your Kubernetes cluster.

Use the following command:

```console
kubectl port-forward --address localhost deployment/$(kubectl get deployment --selector="planetscale.com/component=vtctld" -o=jsonpath="{.items..metadata.name}") 15999:15999
```

You should now be able to see all of your tablets using the following command:

```console
$ vtctlclient -server localhost:15999 ListAllTablets
```

You should see output like this:

```console
uscentral1a-0261268656 main -80 replica 10.16.1.16:15000 10.16.1.16:3306 []
uscentral1a-1579720563 main 80- replica 10.16.1.15:15000 10.16.1.15:3306 []
uscentral1a-2253629440 main -80 replica 10.16.0.18:15000 10.16.0.18:3306 []
uscentral1a-3067826231 main 80- replica 10.16.0.17:15000 10.16.0.17:3306 []
uscentral1a-3815197730 main 80- master 10.16.2.20:15000 10.16.2.20:3306 []
uscentral1a-3876690474 main -80 master 10.16.2.21:15000 10.16.2.21:3306 []
```

## Step 7. Apply the VSchema to your Vitess database.

Apply the example [VSchema](https://vitess.io/docs/reference/vschema/) using the following command:

```console
$ vtctlclient -server localhost:15999 ApplyVSchema -vschema "$(cat ./vschema.json)" main
```

## Step 8. Apply the SQL schema to your Vitess database.

Apply the example SQL schema using the following command:

```console
$ vtctlclient -server localhost:15999 ApplySchema -sql "$(cat ./schema.sql)" main
```

## Step 9. Expose the Vitess service.

Expose the service using the following command:

```console
$ kubectl expose deployment $( kubectl get deployment --selector="planetscale.com/component=vtgate" -o=jsonpath="{.items..metadata.name}" ) --type=LoadBalancer --name=test-vtgate --port 3306 --target-port 3306
```

Use the following command to find the external IP for your LoadBalancer service:

```console
$ kubectl get service test-vtgate
```

You should see output like the following:

```console
NAME         TYPE          CLUSTER-IP      EXTERNAL-IP      PORT(S)         AGE
test-vtgate  LoadBalancer  [`cluster_ip`]  [`external_ip`]  3306:32157/TCP  90s
```

## Step 10. Connect to your Vitess database using a MySQL client.

Use the IP from the previous step to connect to your Vitess database using a command like the following:

```console
$ mysql -u user -h `external_ip`
```

You can now submit queries against your Vitess database from your MySQL client.

For example, the following query displays the tables in your database with VSchemas:

```sql
> SHOW VSCHEMA TABLES;
```

The above query should return the following output:

```sql
+----------------+
| Tables         |
+----------------+
| dual           |
| users          |
| users_name_idx |
+----------------+
3 rows in set (0.06 sec)
```
