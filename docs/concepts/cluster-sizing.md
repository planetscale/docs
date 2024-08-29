---
title: 'Cluster sizing'
subtitle: 'Learn about how to select the right cluster size, how to upsize, and how to downsize.'
date: '2024-08-29'
---

You can easily upsize and downsize your database cluster from within the PlanetScale dashboard. This doc covers some information about selecting a cluster size upon database creation as well as how to upsize and downsize.

![Select a cluster size](/assets/docs/concepts/cluster-sizes/select-cluster-size.png)

{% callout type="note" %}
If you are on a consumption commitment plan, please be aware that any changes in cluster size will be reflected against your monthly or annual consumption commitment amount. Changes to the originally selected cluster size may cause you to utilize this amount either more quickly or slowly. If you have further questions, please reach out to your account manager or our [Support](/contact) team.
{% /callout %}

## Selecting a cluster size

Selecting the correct cluster size for your database can have a dramatic impact on how it performs and how much it costs.

A good rule of thumb is when you notice CPU usage is consistently at or close to 100% for an extended period of time, you may benefit from [upsizing your cluster](#upsizing-and-downsizing-scaler-pro-clusters). Conversely, if your CPU usage is consistently below 50%, you may be able to downsize. You can monitor your CPU usage by clicking on your database, clicking "Primary" in your architecture diagram, and referencing the chart under "Metrics and performance".

There are also special cases where you may want to temporarily upsize out of caution if you're anticipating a large spike in traffic, such as during a launch or event. In these cases, you can easily [upsize](#upsizing-and-downsizing-sclusters) ahead of your event, and then downsize after. Changing cluster sizes is a seamless operation that requires no downtime.

If you are migrating from an existing cloud provider with resource-based pricing, be sure to compare your currently selected instance with our available **Scaler Pro** cluster sizes.

Keep in mind, each database comes with a production branch with two replicas, as well as 1,440 hours worth of development branches. The development branches essentially equate to two extra "always on" databases. In many cases, you can deprecate your dev/staging databases that you pay extra for with other providers in favor of the development branches. In the end, this usually results in significant cost savings.

Databases in PlanetScale also come with additional beneficial infrastructure that is not easily configured or available in other hosted database solutions. For more information on what is provisioned with each database, read our [Architecture](/docs/concepts/architecture) doc.

If you are unsure which plan or cluster size is right for your application, [contact us](/contact) to get further assistance.

Our self-serve plans are flexible enough to handle the majority of customers. However, there are several use cases where you may need a more custom plan. This is where our Enterprise offerings shine.

### Upsizing and downsizing clusters

As your application scales, upgrading or downgrading your **Scaler Pro** cluster is a seamless operation that does not involve any downtime.

To change cluster sizes, go to your PlanetScale dashboard, click on your database, click the gear icon that specifies your current cluster size, select the new cluster size, and click "Update".

The time it takes to change sizes depends on the size and region of your database. Larger databases may take 20 minutes to upsize/downsize. However, this is all done online, so you will not experience any downtime. Keep in mind, once you update your cluster size, you cannot change sizes again until the first size change completes.

When you choose to change cluster size, we upgrade each of your replicas one by one: delete the tablet container, create a new tablet container of the new size, attach the persistent volume, start it up, and connect it to the primary. Once that's complete, we fail the primary over to one of those new replicas, and do the same thing to the old primary.

## Sharding

If you are an Enterprise customer, another way you can scale your database is with **sharding**.
Check out our [sharding documentation](/docs/sharding/overview) for more information.
