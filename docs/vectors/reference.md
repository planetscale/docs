---
title: 'Vector type and index reference'
subtitle: 'Learn how to use vectors in MySQL on PlanetScale'
label: 'Beta feature'
date: '2024-10-29'
---

{% callout type="note" %}
PlanetScale MySQL vectors is [still in beta](/docs/vectors/overview) and is not intended for use in production workloads.
{% /callout %}

## Vector type

PlanetScale MySQL provides a `VECTOR(X)` type that can be used to store vectors.
To add a vector column to a table, set it to type `VECTOR(X)` where `X` is the dimension of the vectors to be stored in this column.

### Example

```sql
CREATE TABLE t1 (
  id INT PRIMARY KEY auto_increment,
  embedding VECTOR(4)
);
```

## Vector index

PlanetScale MySQL provides a new `VECTOR INDEX` to facilitate fast and scalable approximate nearest neighbor (ANN) search on vector data.

Statements that create a vector index may take optional parameters, which can be specified as JSON key-value pairs, via the `SECONDARY_ENGINE_ATTRIBUTE` variable.
There are two options that can be specified in the JSON:

- `type`: specifies the algorithm used to build and query the vector index.
  - Supported values: `spann` (more info on the [SPANN algorithm](#TODO-link-to-other-doc))
- `distance` specifies the distance metric that queries will use.
  - Supported values:
    - `dot` for the dot product
    - `cosine` for the cosine of the angle between the two vectors, which is the same as the dot product divided by the magnitude of the two vectors
    - `l2` or `euclidean` for the length of a line between the ends of the vectors
    - `l2_squared` or `euclidean_squared` for the square of the Euclidean distance. This is the default.

The distance metric specified at index creation time must match the distance metric used at query time, or the index cannot be used, and MySQL will perform a full-table scan instead.

### Examples

```sql
CREATE /*vt+ QUERY_TIMEOUT_MS=0 */
  VECTOR INDEX embedding_index ON t1(embedding);
```

```sql
CREATE /*vt+ QUERY_TIMEOUT_MS=0 */
  VECTOR INDEX embedding_index ON t1(embedding)
  SECONDARY_ENGINE_ATTRIBUTE='{"type":"spann", "distance":"cosine"}';
```

## Vector functions

PlanetScale MySQL includes several new functions for working with vectors.

## `TO_VECTOR(string)` or `STRING_TO_VECTOR(string)`

Converts a text string to a binary vector value. The text string is an array of floating point numbers in JSON format.

### Example

```sql
SELECT TO_VECTOR('[1, 2.78, 3.14]');
  -> 0x0000803F85EB3140C3F54840
```

## `FROM_VECTOR(string)` or `VECTOR_TO_STRING(vector)`

Converts a binary vector to a human-readable string.

### Example

```sql
SELECT FROM_VECTOR(0x0000803F85EB3140C3F54840);
  -> [1.00000e+00,2.78000e+00,3.14000e+00]
```

## `VECTOR_DIM(string)`

Calculates the dimension of a vector.

### Example

```sql
SELECT VECTOR_DIM(TO_VECTOR('[1,2,3]'));
  -> 3
```

## `DISTANCE(vector1, vector2, [metric])`

Calculates the distance between `vector1` and `vector2`.
The optional third parameter specifies which distance metric is to be used: `DOT`, `COSINE`, `L2` (`EUCLIDEAN)`, or `L2_SQUARED` (`EUCLIDEAN_SQUARED)`.

- `DOT` means the dot product.
- `COSINE` means the cosine of the angle between the two vectors, which is the same as the dot product divided by the magnitude of the two vectors. Example:
- `L2` (or `EUCLIDEAN`) means the length of a line between the ends of the vectors. Example:
- `L2_SQUARED` (or `EUCLIDEAN_SQUARED`) is the square of the Euclidean distance

If the distance metric is omitted, it defaults to `DOT`.

### Examples

```sql
SELECT DISTANCE(TO_VECTOR('[1,2]'), TO_VECTOR('[5,4]'), 'DOT');
  -> 13
```

```sql
SELECT DISTANCE(TO_VECTOR('[1,2]'), TO_VECTOR('[5,4]'), 'COSINE');
  -> 0.9079593845004517
```

```sql
SELECT DISTANCE(TO_VECTOR('[1,2]'), TO_VECTOR('[5,4]'), 'L2');
  -> 4.47213595499958
```

```sql
SELECT DISTANCE(TO_VECTOR('[1,2]'), TO_VECTOR('[5,4]'), 'L2_SQUARED');
  -> 20
```

```sql
SELECT id, price, seller_id
  FROM products
  WHERE price < 20.0
  ORDER BY DISTANCE(TO_VECTOR('[1.2, 3.4, 5.6]'), embedding, 'L2_SQUARED')
  LIMIT 10;
```

## `DISTANCE_DOT(vector1, vector2)`

Is the same as `DISTANCE(vector1, vector2, 'DOT')`

## `DISTANCE_COSINE(vector1, vector2)`

Is the same as `DISTANCE(vector1, vector2, 'COSINE')`

## `DISTANCE_L2(vector1, vector2)`

Is the same as `DISTANCE(vector1, vector2, 'L2')`

## `DISTANCE_EUCLIDEAN(vector1, vector2)`

Is the same as `DISTANCE(vector1, vector2, 'L2')`

## `DISTANCE_L2_SQUARED(vector1, vector2)`

Is the same as `DISTANCE(vector1, vector2, 'L2_SQUARED')`

## `DISTANCE_EUCLIDEAN_SQUARED(vector1, vector2)`

Is the same as `DISTANCE(vector1, vector2, 'L2_SQUARED')`
