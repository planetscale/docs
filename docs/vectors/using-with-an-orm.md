---
title: 'Vectors with an ORM'
subtitle: 'Learn how to PlanetScale MySQL vectors with popular ORMs'
label: 'Beta feature'
date: '2024-10-29'
---

{% callout type="note" %}
PlanetScale MySQL vectors is [still in beta](/docs/vectors/overview) and is not intended for use in production workloads.
{% /callout %}

Many modern web development frameworks provide ORMs to make mapping data between your database and the objects in your application a seamless experience.
Here, we show several examples of how you can use the `VECTOR` MySQL type with ORMs.
These docs to not provide a comprehensive list of how to use vectors with all ORMs.
Rather, small examples for several popular choices are provided (Drizzle, Prisma, Rails).
If you use a different ORM and are having trouble getting it to work with vectors, please [reach out](/contact).

Also note that for now, using PlanetScale MySQL vectors with these ORMs requires either a custom type or running raw MySQL queries.

## Drizzle

Here, we'll show how you can create and insert rows into a table that has a `VECTOR` column using Drizzle.
First, modify your `schema.ts` file to import the appropriate items and define two new types.
The first type is for the distance functions, and the second is to represent a vector.

```typescript
import { sql } from 'drizzle-orm'
import { mysqlTable, customType, text, MySqlColumn, bigint } from 'drizzle-orm/mysql-core'

export type DistanceFunction = 'COSINE' | 'DOT' | 'L2' | 'L2_SQUARED'

export const vector = customType<{
  data: ArrayBuffer
  config: { length: number }
  configRequired: true
  driverData: Buffer
}>({
  dataType(config) {
    return `VECTOR(${config.length})`
  },
  fromDriver(value) {
    return value.buffer as ArrayBuffer
  },
  toDriver(value) {
    return Buffer.from(value)
  }
})
```

With these in place, we can go ahead and declare our table, also in `schema.ts`.

```typescript
export const product = mysqlTable('product', {
  id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().primaryKey(),
  name: text('name'),
  description: text('description'),
  embedding: vector('embedding', { length: 384 })
})
```

This would be in addition to other schema declarations you need for your application.

We now have an object to model a table with a vector embedding column.
Elsewhere in our application, we can perform typical operations like inserts, deletes, searches, etc.
For example, to insert a row into this table, do the following:

```typescript
const embedding = // generate an embedding with your preferred API
const serializedEmbedding = Buffer.from((new Float32Array(embedding)).buffer)
await db.insert(product).values({
  description: 'hi there',
  embedding: serializedEmbedding
})
```

We can also perform searches on the data:

```typescript
const rankedItems = await db
  .select({ description: product.description })
  .from(product)
  .orderBy(`DISTANCE(TO_VECTOR(${embedding}), ${product.embedding}, L2_SQUARED)`)
  .limit(10)
```

If you have a large data set, you'll want to make sure you create an index on this vector column.

## Prisma

Next, let's look at what it takes to get a table with a `VECTOR` column working with Prisma.
As of this writing, [Prisma does not support custom types](https://github.com/prisma/prisma/issues/5039).

Until Prisma provides support, you can still use vectors in a Prisma-powered application by using the `Unsupported` function in your `schema.prisma` and then use raw queries to perform vector searches.
We can add a new table with a `VECTOR(4)` column by adding the following to our `schema.prisma` file.

```typescript
model Product {
  id          BigInt     @id @default(autoincrement()) @db.UnsignedBigInt
  name        String?    @db.Text
  description String?    @db.Text
  embedding   Unsupported("vector(4)")?
}
```

When running `prisma db push`, it will create the table with the `embedding` column having type `VECTOR(4)`, even though Prisma does not technically support vectors.

From here, you can use Prisma's `queryRaw` feature to run raw SQL queries.
For example, to insert a row into this table.

```typescript
const name = 'Pots'
const description = 'For cooking'
const embedding = '[0.5, 0.4, 0.3, 0.2]'
await prisma.$queryRaw(
  Prisma.sql`
    INSERT INTO
      Product (name, description, embedding)
      VALUES(${name}, ${description}, TO_VECTOR(${embedding}))`
)
```

And to retrieve results from this table:

```typescript
const result = await prisma.$queryRaw(
  Prisma.sql`SELECT * FROM Product ORDER BY DISTANCE(TO_VECTOR(${query_vector}), embedding, 'l2_squared')`
)
console.log(result)
```

If you have a large data set, you'll want to make sure you create an index on this vector column.

## Ruby on Rails

Lets look at how you can work with a vector column in a Ruby on Rails application.
Say you have an existing object that models rows in a table, and you are using ActiveRecord to manage the mapping between your objects and your database.
For example, an object representing a tweet in `app/models/tweet.rb`.

```ruby
class Tweet < ApplicationRecord
  belongs_to :user
  has_one_attached :image
  default_scope -> { order(created_at: :desc) }
  validates :content, presence: true, length: { maximum: 140 }
  validates :user_id, presence: true
end
```

Since vectors are a new type for MySQL, we will add a custom migration to handle adding and dropping a `VECTOR` column to this table in the database.
To do this, add a new migration in `db/migrations` like so:

```ruby
class AddTweetEmbeddings < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL
      ALTER TABLE tweets ADD COLUMN embedding VECTOR(1536);
    SQL
    execute <<-SQL
      CREATE VECTOR INDEX idx_tweet_embeddings ON tweets(embedding) '{"type":"spann","distance":"cosine"}';
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE tweets DROP COLUMN embedding;
    SQL
  end
end
```

You'll also need to make the appropriate adjustments in your project to ensure that this gets executed when you run `rails db:migrate`.
With the schema updated appropriately, you can run raw SQL queries via ActiveRecord to insert rows with vectors and perform search.
For example, to insert a new row with a vector, you can do something like this:

```ruby
embedding = [1.0, 0.5, 0.25, 0.125].to_json
created_at = Time.now.to_s
updated_at = Time.now.to_s
content = 'A tweet!'
user_id =  100

sql = <<-SQL
  INSERT INTO tweets (user_id, content, content_embeddings, created_at, updated_at)
    VALUES (
      #{ActiveRecord::Base.connection.quote(user_id)},
      #{ActiveRecord::Base.connection.quote(content)},
      TO_VECTOR(#{ActiveRecord::Base.connection.quote(embedding)}),
      #{ActiveRecord::Base.connection.quote(created_at)},
      #{ActiveRecord::Base.connection.quote(updated_at)}
    )
SQL

ActiveRecord::Base.connection.execute(sql)
```

To perform a similarity search based on an input embedding, you can execute the following:

```ruby
embedding = [1.0, 0.5, 0.25, 0.125]
sql = <<-SQL
  SELECT id, content, distance(content_embeddings, TO_VECTOR('#{embedding}'), 'COSINE') as d FROM tweets ORDER BY d DESC LIMIT 10
SQL

results = ActiveRecord::Base.connection.execute(sql)
```

## Other ORMs

If you have requests for other ORMs you'd like to see documented for using with vectors, please [reach out](/contact) with your questions.
On the other hand, if you get PlanetScale MySQL vectors working with an ORM not listed here and would like to share your technique, please do as well.
