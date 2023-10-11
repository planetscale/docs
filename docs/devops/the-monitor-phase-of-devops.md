---
title: 'The Monitor phase of the DevOps cycle'
subtitle: 'Monitor the environment and gather feedback for the next cycle.'
date: '2023-09-29'
---

The last phase of the DevOps cycle is to monitor the entire application. This can be by gathering feedback from customers that use the application, but also to monitor performance metrics that the application tracks. This feedback should be used in decision-making when the team inevitably comes together again to plan the next cycle.

## How PlanetScale helps

One important metric of your application's performance is how quickly your queries are executed. Slow-running queries can bring an application to its knees.

### PlanetScale Insights

PlanetScale offers [Insights](/docs/concepts/query-insights) with every database that is hosted on our platform, which is a visual way to see how well your queries are performing. Performance data is automatically tracked in real-time and displayed on a graph so you can see periods of high usage. You can also see which queries are executed most frequently or are taking the longest to return data.

If your database is enrolled in the schema-revert feature, the metrics gathered by Insights could help in making a data-driven decision on if the schema you just deployed to production is experiencing issues and needs to be rolled back. While having your own logging and monitoring platform to analyze errors in your code is definitely a best-practice, this would act as an additional layer of analytics and may help in reducing downtime overall.

**Insights + PlanetScale Boost**

While not directly related to monitoring, it's worth mentioning that Insights integrates directly with [PlanetScale Boost](/docs/concepts/query-caching-with-planetscale-boost), an optional feature that can be used with databases on our platform to exponentially improve query performance by adding a query cache in front of your database to serve the most requested data from in-memory data.

### PlanetScale Connect

PlanetScale Connect is a feature provided to our databases that allows you to extract data from the database and safely load it into remote destinations for analytics or ETL purposes. Using Connect with our supported destinations can enable you to further process the data in any way your organization may need. This can help provide detail as to how users are using your application based on the data that's written to your database and assist in driving decisions in the next planning cycle.

We currently support loading data into [Airbyte](/docs/integrations/airbyte) and [Stitch](/docs/integrations/stitch) destinations, with more planned for the future.

### Datadog integration

If you are a Datadog customer and use their platform to centralize your analytical data, we offer an integration with the service. Our integration will gather similar data that is displayed in Insights and forward it to a PlanetScale dashboard that is automatically created when the integration setup is complete. Refer to the [Datadog integration](/docs/integrations/datadog) article for more details on how this can be configured for your PlanetScale database.

{% callout title="Next steps" %}
While the Monitor phase is what concludes the typical DevOps cycle, it loops back into the Plan phases for the next iteration to be set up. At this point, you should be well-equipped to make intelligent decisions on how to integrate PlanetScale into your existing pipelines, or understand how to get started with DevOps altogether!

Feel free to explore more of our [documentation](/docs) to further your understanding of the platform.

{% /callout %}
