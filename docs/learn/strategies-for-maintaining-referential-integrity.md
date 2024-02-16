---
title: 'Strategies for maintaining referential integrity'
subtitle: 'How to design systems that maintain referential integrity without foreign key constraints'
date: '2024-02-16'
---

If you choose to not use foreign key constraints, cascading actions need to be addressed via code instead of letting the database engine handle them for you. This document outlines some recommended strategies for building a system that handles those actions for you.

{% callout type="note" %}
If you want to use foreign key constraints instead for referential integrity, enable [foreign key constraint](/docs/concepts/foreign-key-constraints) support in your database settings page. If you are unsure if you should use them, the [foreign key constraints documentation](/docs/concepts/foreign-key-constraints) covers some of the advantages and disadvantages.
{% /callout %}

The following examples will use the concept of a recipe manager with the following schema. Samples will be provided in SQL, so they are relatively universal regardless of the language or framework used.

![A sample recipes database schema. {priority}](/assets/docs/learn/strategies-for-maintaining-referential-integrity/diagram.svg)

The same scenario will be used for each suggestion below: deleting a recipe and its associated records.

## Executing actions inline

The first method you could use to address stale records is to write the necessary code to handle cascading actions in line with the main execution.

For example, if you are deleting a recipe using an API, you could extend the route handler to delete the associated ingredients and steps as well.

```sql
-- Main action
DELETE FROM recipes WHERE id = 123

-- Secondary actions
DELETE FROM ingredients WHERE recipe_id = 123
DELETE FROM steps WHERE recipe_id = 123
```

The benefit this approach provides is that it’s relatively straightforward using the systems that are already in place. The downside is in situations where a large number of records need to be deleted or updated, you might make your users wait for longer than needed as the cascading actions are handled.

## Scheduled jobs

The second approach is using a system that will scan the database at regular intervals for cascading actions that need to be performed.

For example, you might set up Cron with a script that will execute queries against the database to find records that are soft-deleted, and run the necessary SQL to delete the ingredients and steps, then the recipe itself.

The main action would flag the record in the `recipes` table as being soft-deleted:

```sql
-- Flag the record as requiring deletion.
UPDATE recipes SET is_deleted = true WHERE id = 123
```

A scheduled task could then execute the following statements to find the records requiring cleanup, and delete those records:

```sql
-- Find the recipes that have been deleted.
SELECT id FROM recipes WHERE is_deleted = true

-- Then for each recipe delete the necessary records.
DELETE FROM ingredients WHERE recipe_id = 123
DELETE FROM steps WHERE recipe_id = 123
DELETE FROM recipes WHERE id = 123
```

The benefit this approach provides is that the main execution point of your application (ex: an API) would return quicker as you are simply updating a single value in the database. This prevents the user from waiting for those records to be cleaned up.

The downside is that this requires an additional system with its own associated code that would require maintenance. While `DELETE` operations are relatively straightforward, addressing `UPDATE` operations may be a challenge. There is also an inherent delay where stale records would exist in the database between script executions.
You can see a full example of how to handle this in Rails in our [Ruby on Rails: 3 tips for deleting data at scale blog post](/blog/ruby-on-rails-3-tips-for-deleting-data-at-scale).

## Asynchronous cleanup using queues

The final recommended strategy would be to use a message queue like AWS SQS or RabbitMQ. The application would send messages to the queue so that a handler can perform the cascading operations asynchronously.

For example, you may set up an AWS SQS queue to receive messages from your API on what actions were performed on a particular recipe or what data was changed. When a message is dropped on the queue, a Lambda function is triggered to perform the required operations.

In this scenario, your API may start by deleting the recipe record:

```sql
DELETE FROM recipes WHERE id = 123
```

The API might then drop a message into the queue in the following format:

```json
{
  "id": 123,
  "action": "deleted"
}
```

The Lambda function that receives the message from the API could then perform the cleanup operations:

```sql
DELETE FROM ingredients WHERE recipe_id = 123
DELETE FROM steps WHERE recipe_id = 123
DELETE FROM recipes WHERE id = 123
```

This approach provides the greatest number of benefits. Cascading operations are asynchronous, so the caller wouldn’t need to wait. It scales well since any number of serverless functions may be started to handle the load. Cleanup operations would be executed in near real-time, as long as it takes for a message to enter the queue and the serverless function to pick it up. It is also decoupled and easily fits the serverless model very well.

The primary downside is that it increases the complexity of the overall application and requires the largest number of moving parts, as well as the knowledge to support these systems.
