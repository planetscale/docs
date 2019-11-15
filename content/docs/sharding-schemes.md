---
title: 'Sharding schemes'
category: 'concepts'
---

# Sharding schemes

This document explains the basic concept of sharding schemes as used in the PlanetScale CNDb. PlanetScale is built on Vitess, where sharding schemes are called **VSchemas**; these two terms are equivalent. To learn more about VSchemas, see the open source [Vitess documentation for VSchemas](http://vitess.io/docs/reference/vschema).

<!-- We may want to link out to this doc also/instead: vitess.io/docs/reference/sharding This document contains a table under the "Resharding" section that gives a good run-down on why you would want more shards vs. more replicas. Key takeaways: Splitting shards increases read and write capacity uniformly; merging shards frees up resources; splitting shards can also cool a hot tablet. -->

## What is a sharding scheme?

<!-- This doc still doesn't address the initial question: why have a sharding scheme, and when? How many shards should the typical user have? Probably more in-depth questions are out of scope, and need to be covered in the Vitess docs. -->

In order to scale your database, PlanetScale can distribute your database tables into **shards**. If you want a sharded database, you need to configure a sharding scheme. However, if you want replicas of your database tables, you do not need a sharding scheme. Your database can also use both sharding and replication. An unsharded database does not require a sharding scheme. Your application does not need to be aware of the sharding scheme.

<!-- Can we omit the rest of this section as implementation detail?-->
PlanetScale uses **keyspaces** to divide data into shards: each shard is assigned a range within the keyspace. Vitess uses Vindexes to map column values onto keyspaces. The sharding scheme relates tables, shards, keyspaces, and Vindexes. Your PlanetScale database uses all of this information to treat the different shards as one database.

<!-- What is a keyspace? Do we want to use this term? Do we need to? -->
<!-- Do we need a separate section or document on Vindexes? Can we point out to the Vitess docs? -->
<!-- Do we need to address multiple keyspaces ? -->

## What is the format for a sharding scheme?

<!-- We still can't get around using the term 'vindex', because it's baked into the vschema format. Explain. -->

Sharding schemes use JSON format. Each sharding scheme contains at least one key-value pair indicating whether or not the database is sharded; it also contains at least one JSON object, called `tables`, which itself contains one JSON object for each sharded table. Each of these table objects can contain an object called `column_vindexes`, which contains the name of any column(s) in the table that map to a Vindex, along with the name of the Vindex. Finally, it contains a JSON object called `vindexes`, which contains one JSON object for each Vindex on the database; each of these Vindex objects contains a key-value pair called `type`, which specifies the [Vindex type](http://vitess.io/docs/reference/vschema/#predefined-vindexes).
 
### Example sharding scheme
<!-- Should we include an example non-sharded scheme? -->
<!-- This section also references vindexes. -->

Below is an example sharding scheme. This sharding scheme indicates that the database is sharded, that it has one sharded table called `user`, whose `user_id` column maps to the Vindex `hash`, and that this Vindex is of type `hash`.

```
    {
        "sharded": true,
        "vindexes": {
          "hash": {
            "type": "hash"
          }
        },
        "tables": {
          "user": {
            "column_vindexes": [
              {
                "column": "user_id",
                "name": "hash"
              }
            ]
          }
        }
      }
```

## What does the sharding scheme do?

The sharding scheme contains, among other things, the [Vindex](http://vitess.io/docs/reference/vindexes/) for a sharded table. The Vindex tells Vitess where to find the shard that contains a particular row for a sharded table. Every sharding scheme must have at least one Vindex, called the Primary Vindex, defined. The Primary Vindex is unique: given an input value, it produces a single keyspace ID, or value in the keyspace used to shard the table. The Primary Vindex is typically a **functional** Vindex: Vitess computes the keyspace ID as needed from a column in the sharded table.

### Example

In the example sharding scheme above, the `user` table object contains an object called `column_vindexes`, which itself contains two key-value pairs: `column` and `name`:

```
    "column_vindexes": [
        {
        "column": "user_id",
        "name": "hash"
        }
    ]
```

The `column_vindexes` object specifies that the `user_id` column maps to a Vindex called `hash`. This means that, at query execution time, your database will use the `WHERE` clause of the SQL query to identify the range of values of `user_id` it needs to return; then, it will use a hash function to compute the keyspace IDs for the desired rows.

<!-- We should probably revise this to remove any redundancies, and consider how much of this should actually be happening in the vitess.io docs. The user will likely need more information than this, but the VSchema docs at vitess.io are difficult to understand. --> 

<!-- Should we develop a graphic here or somewhere that demonstrates the relation between sharded table, Vindex, and keyspace ID? E.g., at query execution time, how does Vitess route a query to a shard? Perhaps this ought to live in the Vitess open source docs instead. -->
  
