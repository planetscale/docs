---
title: 'The proof of concept phase of an enterprise contract'
subtitle: 'Our enterprise contracts include a proof of concept phase that allows you to test and verify that PlanetScale can handle your workloads before committing to a full contract.'
date: '2024-06-25'
---

## PlanetScale proof of concept

{% youtube title="How PlanetScale runs POCs with customers" url="https://www.youtube.com/watch?v=yj7nylLeyog" /%}

We get many customers that come to us with existing large, production databases.
These databases can be many terabytes of data, serving millions or billions of queries per day.
Such customers would like an opportunity to build confidence that PlanetScale will meet and exceed their expectations for database performance, reliability, and compatibility with their existing systems.
To help build this confidence, we often include a **Proof of Concept** (PoC) phase as a part of our contract with enterprise customers.
These are also sometimes referred to as a **Proof of Value** phases (PoV).

## What is a proof of concept?

We often sign multi-year contracts with our enterprise customers, and typically also include a Proof of Concept phase at the beginning.
The PoC phase is a short window of time at the beginning of a longer contract during which our customers work with a Solutions Architect from our team to test our product and ensure it will meet their needs going forward.
These can range from a few weeks to a few months depending on the details of the customers database, size, compute requirements, and testing needs.

The last day of the PoC phase is known as the opt-out date.
If a customer decides that they no longer want to move forward using PlanetScale before this opt-out date, they must notify our team of this decision in a timely manner.
Payment will still be required for all resource usage and services provided during the PoC, and anything else specified in the contract, but the customer will not be on-the-hook for the full contract amount. This gives you the opportunity to test drive PlanetScale before committing to the full contract period.

## What happens during a Proof of Concept phase?

Before signing a contract, customers typically have discussions with one of our Solutions Architects to gather the information needed to create your contract:

- Which database(s) you want to bring in to PlanetScale
- Your database storage and resource requirements
- Whether or not vertical or horizontal sharding will be needed
- The load that the database will need to be able to handle
- Other details about your database infrastructure

After signing a contract with PlanetScale, you will start working with your Solutions Architects on implementation and testing.
Though the details change from customer to customer, the flow of work during the first few weeks or months of an enterprise contract is as follows:

1. First, it's good to determine which database you want to start with.
   Long term, you may intend to move multiple databases and workloads into PlanetScale, but during the proof-of-concept phase it is often useful to focus on one specific database and workload to begin testing with.
2. Based on this choice, your Solutions Architect will help you get the infrastructure set up for your database, and configured appropriately.
3. If you are going to be using a sharded database, you will also work with us to determine your [sharding strategy](/docs/concepts/sharding), and we will help you decide the best [VSchema](https://vitess.io/docs/reference/features/vschema/) for your tables.
4. The next step is to get your data imported.
   We have a [self-serve tool for importing databases](/docs/imports/database-imports) into PlanetScale, but we often provide direct assistance with this, and for larger, more complex workloads our team can handle running the appropriate Vitess commands to migrate you over.
5. After this, customers typically want to start testing the capabilities of their imported database.
   Testing can be done in a number of ways.
   Some customers have testing scripts they have already developed, which can be run against the PlanetScale database.
   You may also want to do more specific testing with queries or workloads that you know to be problematic to see how PlanetScale handles them.
   You can use our powerful [Insights panel](/docs/concepts/query-insights) as well as your own custom tooling to assess how well these workloads are handled.
6. If any issues arise during the testing phase, you can work with our team to come up with solutions before going into production.

Ideally, customers have had sufficient time to test their database and build confidence in our platform before the opt-out date.

We often see customers completely cut over to PlanetScale during this phase as well &mdash; making PlanetScale their production database before the opt-out period is even over. The process has been optimized to quickly prove that PlanetScale can handle your workloads while still providing flexibility to ensure you're able to test everything you want to before the opt-out date.

## After the opt-out date

After a phase of testing has completed, our customers continue to work with our Customer Engineering team to continue onboarding. This process includes:

- Migrating other database(s) that you intend to use PlanetScale for
- Continued testing
- Performance tuning where needed
- Setting a cutover date to get your database into production
