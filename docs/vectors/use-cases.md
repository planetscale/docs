---
title: 'Common use cases for Vector search'
subtitle: 'Vector search is an extremely powerful tool to leverage in your database. Learn common ways to use it to improve your product.'
label: 'Beta feature'
date: '2024-10-29'
---

{% callout type="note" %}
PlanetScale MySQL vectors is [still in beta](/docs/vectors/overview) and is not intended for use in production workloads.
{% /callout %}

The ability to store and search vector data in your MySQL database, right alongside the rest of your relational data, is a powerful tool when applied correctly.
Some are already keenly familiar with the types of features and products that you can build with this.
However, many are not.
Here, we provide some examples of the types of features you can build with vector search when it is built directly in to your MySQL database.

## Semantic search

We use search all the time, from getting answers to questions via Google, looking for products on Amazon, finding a video on YouTube, or even searching for a document in our local file system.
However, not all search systems are created equal, and they can be implemented in a variety of ways.

Let's say we have a corpus of blog posts that we want to be able to search through to find relevant articles to read.
The table to store the blog posts in looks like this:

```sql
CREATE TABLE blog (
  id BIGINT NOT NULL AUTO_INCREMENT,
  url VARCHAR(2048) NOT NULL,
  title VARCHAR(1024),
  subtitle VARCHAR(1024),
  author VARCHAR(128),
  PRIMARY KEY(id)
);
```

One way we could accomplish this is using plain-text matching.
For our search feature, a user would type in a search string, and then the text of each blog post's title and subtitle is searched for exact string (or substring) matches of our search term.

```sql
SELECT title, url
  FROM blog
  WHERE title LIKE '%$SEARCH_TERM%'
  OR subtitle LIKE '%$SEARCH_TERM%'
  LIMIT 10;
```

(Note: we could also use a MySQL `FULLTEXT` index to perform faster text-matching search).

This could give some good results, however there would be some instances where it would be problematic.
Searching only for exact matches may miss some of the relevant results.
For example, a user might search for the term "dogs" and end up with some posts about dogs.
However, it would miss results that do not use the term dog in favor of words like "puppy" or "hound."
It also might miss documents that are about "wolves" or "coyotes."
This search knows nothing about the _meaning_ of the word "dog."

This is where **vector similarity search** comes into play.
With this type of search, we would generate an [embedding](/docs/vectors/terminology-and-concepts#vector-embedding-) for each blog post in our data set.
An embedding is an N-dimensional vector that captures opaque meaning about some piece of data &mdash; in this case, the title + subtitle of a blog post.
This vector would then be stored right along with the corresponding blog post row in the database.

```sql
CREATE TABLE blog (
  id BIGINT NOT NULL AUTO_INCREMENT,
  url VARCHAR(2048) NOT NULL,
  title VARCHAR(1024),
  subtitle VARCHAR(1024),
  author VARCHAR(128),
  embedding VECTOR(384), /* <-- New column for the embedding */
  PRIMARY KEY(id)
);
```

Whenever a search occurs on our database, we will also generate an embedding for that search term.
Then, we can use vector similarity search to find the top 10 results that have the most similar _meaning_ to the search term.

```sql
SELECT title, url
  FROM blog
  ORDER BY DISTANCE($SEARCH_TERM_VECTOR, embedding, 'L2_squared')
  LIMIT 10;
```

This type of search will be able to include those other posts, since we are now searching by meaning rather than text matches.

## Recommendation systems

Recommendation systems are also common in many products.
Amazon may recommend purchases similar to ones you view, and streaming services may recommend shows to you based on your watch history.
Similar types of systems can be built using vector similarity search.

Perhaps we have an e-commerce platform.
In our database, we have a `product` table, a `user` table, and ` purchase` table to track which items each user purchases.

```sql
CREATE TABLE product (
  product_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(256) NOT NULL,
  description VARCHAR(1024) NOT NULL,
  price INT NOT NULL,
  ...
);

CREATE TABLE user (
  user_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(256) NOT NULL,
  email VARCHAR(256) NOT NULL,
  ...
);

CREATE TABLE purchase (
  purchase_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  purchased_at DATETIME NOT NULL,
  ...
);
```

A great way to add a purchase recommendation feature to our application would be to use vectors.
The first step would be to add a `VECTOR` column to the `product` table:

```sql
CREATE TABLE product (
  product_id bigint not null auto_increment primary key,
  title varchar(256) not null,
  description varchar(1024) not null,
  price INT NOT NULL,
  embedding VECTOR(384), /* <-- New column for the embedding */
  ...
);
```

We could generate an embedding for each row by feeding the title and description into an embedding model and storing the results in this new column.
Whenever a user logs in to our platform, we want to show them a list of 5 recommended purchases, based on similarity to their most recently purchased item.
To do this, we need a query that finds a user's most recent purchase, and then performs a KNN search for the 5 most similar products in the product table, based on vector similarity.
This query would look something like this:

```sql
SET @uid = 12345;

SET @recentEmbedding =
  (SELECT product.embedding
     FROM product
     JOIN purchase ON product.product_id = purchase.product_id
     JOIN user ON purchase.user_id = user.user_id
     WHERE user.user_id = @uid
     ORDER BY purchase.purchased_at DESC
     LIMIT 1);

SET @recommendationIDs =
  (SELECT product_id
    FROM product
    ORDER BY DISTANCE(@recentEmbedding, embedding, 'L2_squared')
    LIMIT 5);
```

We can then use the products in `@recommendationIDs` and display those to the user.

## Retrieval-Augmented Generation (RAG)

RAG is a popular technique for augmenting and enhancing results produced by an LLM.
LLMs such as GPT-4.0 or Sonnet-3.5 are extremely powerful, as they have been trained on immense data sets.
However, these LLMs are not trained on the entire universe of data, and it is often useful to pass them additional context to help answer a query.

Suppose we have a private question/answer platform, internal to our organization.
None of the information on this platform is on the public internet and was not used to train any public LLMs.
This platform stores questions and answers like so:

```sql
CREATE TABLE question (
  question_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(256) NOT NULL,
  text VARCHAR(2048) NOT NULL
);

CREATE TABLE answer(
  answer_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  question_id BIGINT NOT NULL,
  text VARCHAR(2048) NOT NULL
);
```

We would like to add a feature to this internal Q/A platform to allow a user to ask an LLM-powered chatbot questions instead of posting a question for other humans to answer.

One way we could do this is allow the user to enter a question, send the prompt directly to the OpenAI API (or similar APIs), fetch the result, and display to the user.
This may not work well for questions that are specific to our organization, as OpenAI may not have sufficient knowledge in this area.
What we can do instead is leverage similarity search to augment the user's question with additional context before sending the prompt to OpenAI, which will allow it to produce better answers.

To do this, we will yet again need to add a vector column to the `answer` table and populate them with embeddings:

```sql
CREATE TABLE answer(
  answer_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  question_id BIGINT NOT NULL,
  text VARCHAR(2048) NOT NULL,
  embedding VECTOR(384) /* <-- New column for the embedding */
);
```

Whenever a user enters a query for the chatbot, we will first generate an embedding for that question.
Then, we will perform similarity search to find existing answers on our platform that are related to this:

```sql
SELECT answer.text
  FROM answer
  JOIN question ON question.question_id = answer.question_id
  ORDER BY DISTANCE($QUERY_EMBEDDING, question.embedding, 'L2_squared')
  LIMIT 5;
```

Now we have the user's initial question and several related answers.
We will construct a string formatted something like this:

```
Here is some information that is related to a question that a user has:

[RELATED ANSWERS]

Using this information, please answer the following user question:

[THE USER'S ORIGINAL QUERY]
```

This new larger string will get passed on to our AI API for a response.
Since we have added context to the prompt, it will be able to do a better job at giving the user a satisfactory answer.
