---
title: 'Rails query caching with PlanetScale Boost'
subtitle: 'Learn how to use PlanetScale Boost in a Rails application.'
date: '2022-11-15'
---

{% callout %}
PlanetScale Boost is in limited beta. [Reserve your spot on the waitlist](/features/boost) today.
{% /callout %}

## How to use PlanetScale Boost in a Rails application

To enable caching for our connection, you need to set the session variable `boost_query_caching` to `true`. This can be done in your `database.yml`

```yaml
<<: *default
username: <%= Rails.application.credentials.planetscale.fetch(:username) %>
password: <%= Rails.application.credentials.planetscale.fetch(:password) %>
database: <%= Rails.application.credentials.planetscale.fetch(:database) %>
host: <%= Rails.application.credentials.planetscale.fetch(:host) %>
ssl_mode: verify_identity
sslca: "/etc/ssl/cert.pem"
variables:
  boost_cached_queries: true
```

This enables caching for all of your database connections.

```ruby
Star.joins(repository: :tags).where(spammy: false).where(tags: {name: "trending"}).group(:repository).count

#  Star Count (2.1ms)  SELECT COUNT(*) AS `count_all`, `stars`.`repository_id` AS `stars_repository_id` FROM `stars` INNER JOIN `repositories` ON `repositories`.`id` = `stars`.`repository_id` INNER JOIN `repository_tags` ON `repository_tags`.`repository_id` = `repositories`.`id` INNER JOIN `tags` ON `tags`.`id` = `repository_tags`.`tag_id` WHERE `stars`.`spammy` = FALSE AND `tags`.`name` = 'trending' GROUP BY `stars`.`repository_id`
```

This is the simplest way to get started using PlanetScale Boost. We recommend going a step further and setting up separate connections for your cached and un-cached queries.
Doing this will allow you to be confident you're getting up-to-date data when [reading your own writes](/docs/concepts/query-caching-with-planetscale-boost#replication-lag-and-read-your-writes).

## PlanetScale Boost with multiple connections

Setting up multiple connections is our recommended way of using PlanetScale Boost in Rails. To do this, we will be using Rails
[multiple databases support](https://guides.rubyonrails.org/active_record_multiple_databases.html) built into ActiveRecord.

First, you will need to update your `database.yml` to let Rails know about the new connection.

```yaml
development:
  primary:
    <<: *default
  primary_replica:
    <<: *default
    replica: true # Note: for development/test we do not set `boost_cached_queries` since we are using standard MySQL
production:
  primary:
    <<: *default
    username: <%= Rails.application.credentials.planetscale.fetch(:username) %>
    password: <%= Rails.application.credentials.planetscale.fetch(:password) %>
    database: <%= Rails.application.credentials.planetscale.fetch(:database) %>
    host: <%= Rails.application.credentials.planetscale.fetch(:host) %>
    ssl_mode: verify_identity
    sslca: "/etc/ssl/cert.pem"
  primary_with_caching:
    <<: *default
    username: <%= Rails.application.credentials.planetscale.fetch(:username) %>
    password: <%= Rails.application.credentials.planetscale.fetch(:password) %>
    database: <%= Rails.application.credentials.planetscale.fetch(:database) %>
    host: <%= Rails.application.credentials.planetscale.fetch(:host) %>
    ssl_mode: verify_identity
    sslca: "/etc/ssl/cert.pem"
    replica: true
    variables:
      boost_cached_queries: true
```

You now have two connections: `primary` and `primary_with_caching`. You will want to replicate these for all of your environments.

Make sure to only include the `boost_cached_queries` variable for environments that use PlanetScale. If you use standard MySQL for development/test, you will still need to setup
the `primary_with_caching` connection, just without the `boost_cached_queries` variable. This allows you to test the connection role in your Rails app without connecting to PlanetScale.

Notice in `primary_with_caching` you have set `boost_cached_queries: true` and `replica: true`. Otherwise, the connection details for each are identical.

### Update ApplicationRecord

Now that you have multiple connections, the next step is defining the new role for ActiveRecord to connect to.

```ruby
class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  connects_to database: { writing: :primary, with_caching: :primary_with_caching }
end
```

### Running cached queries

By default, Rails will always connect using the `writing` role. All of your existing queries will work as normal.

The new `with_caching` role will allow you to specifically use caching in your application when needed.

```ruby
ActiveRecord::Base.connected_to(role: :with_caching) do
  Star.joins(repository: :tags).where(spammy: false).where(tags: {name: "trending"}).group(:repository).count
end

#  Star Count (2.1ms)  SELECT COUNT(*) AS `count_all`, `stars`.`repository_id` AS `stars_repository_id` FROM `stars` INNER JOIN `repositories` ON `repositories`.`id` = `stars`.`repository_id` INNER JOIN `repository_tags` ON `repository_tags`.`repository_id` = `repositories`.`id` INNER JOIN `tags` ON `tags`.`id` = `repository_tags`.`tag_id` WHERE `stars`.`spammy` = FALSE AND `tags`.`name` = 'trending' GROUP BY `stars`.`repository_id`
```
