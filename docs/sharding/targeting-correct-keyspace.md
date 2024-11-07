---
title: 'Targeting the correct keyspace'
subtitle: 'This guide covers how to properly route queries the correct keyspace once you have multiple keyspaces.'
date: '2024-11-07'
---

Once you have more than one keyspace, with tables distributed across both keyspaces, your application may not know how to properly route queries to the correct keyspace.

If you originally set up your application configuration code with something like `DATABASE_NAME=your_database_name`, where `your_database_name` is the name of your original unsharded keyspace, you will need to update your configuration code so that all queries don't go straight to that keyspace.

The preferred way to do this is to just leave off the database name completely in your application configuration code. PlanetScale will be able to route traffic correctly just using the connection username and password.

While this is the preferred way, it's sometimes not possible. For example, many frameworks and ORMs require that you include a database name.

In those cases, you should use `@primary`. This will send any incoming queries first to our [Global Edge Network](/blog/introducing-global-replica-credentials#building-planetscale-global-network), which will see that you're targeting a primary. Edge will then send the request to the VTGate(s)/load balancer. We typically will use [Vitess's Global Routing](https://vitess.io/docs/reference/features/global-routing/) to direct the query to the correct keyspace and, optionally, correct shard.

{% callout %}
If you explicitly wish to target a replica for some or all reads, using `@replica` will have the same effect as `@primary` in that it will automatically route the request to the correct keyspace.
{% /callout %}

[Global Replica Credentials](/docs/concepts/replicas#1-create-a-global-replica-credential-recommended-) are not currently supported in this context. You can still target replicas instead of your primary with `@replica`, but it will not automatically route the query to the _closest_ replica.

## Framework examples

Using `@primary` is simple, but there are slight variations for each framework. The following code snippets show how to target `@primary` in some of the popular languages/frameworks. If you don't see your framework on here and are unsure of how to proceed, please [reach out to support](https://support.planetscale.com).

### MySQL CLI

```sql
mysql -h aws.connect.psdb.cloud -D @primary -u your_username -p pscale_pw_xxxxxxxxxxxxxxx --ssl-mode=VERIFY_IDENTITY --ssl-ca=/etc/ssl/cert.pem
```

### Rails

```ruby
# database.yml
production:
  <<: *default
  username: <%= Rails.application.credentials.planetscale&.fetch(:username) %>
  password: <%= Rails.application.credentials.planetscale&.fetch(:password) %>
  database: "@primary"
  host: <%= Rails.application.credentials.planetscale&.fetch(:host) %>
  ssl_mode: verify_identity
```

### Django

```python
# Connect to the database
connection = MySQLdb.connect(
  host=os.getenv("DATABASE_HOST"),
  user=os.getenv("DATABASE_USERNAME"),
  passwd=os.getenv("DATABASE_PASSWORD"),
  db="@primary",
  autocommit=True,
  ssl_mode="VERIFY_IDENTITY",
  ssl={"ca": os.getenv('SSL_CA')}
)
```

### Laravel

```php
'mysql' => [
  'driver' => 'mysql',
  'url' => env('DB_URL'),
  'host' => env('DB_HOST', '127.0.0.1'),
  'port' => env('DB_PORT', '3306'),
  'database' => '@primary',
  'username' => env('DB_USERNAME', 'root'),
  'password' => env('DB_PASSWORD', ''),
  'unix_socket' => env('DB_SOCKET', ''),
  'charset' => env('DB_CHARSET', 'utf8mb4'),
  'collation' => env('DB_COLLATION', 'utf8mb4_unicode_ci'),
  'prefix' => '',
  'prefix_indexes' => true,
  'strict' => true,
  'engine' => null,
  'options' => extension_loaded('pdo_mysql') ? array_filter([
    PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
   ]) : [],
],
```

### PHP MySQLi

```php
# .env
DATABASE_HOST=aws.connect.psdb.cloud
DATABASE=@primary
DATABASE_USERNAME=username
DATABASE_PASSWORD=password

# index.php
// Connect to PlanetScale using credentials stored in environment variables
$mysqli = mysqli_init();
$mysqli->ssl_set(NULL, NULL, "/etc/ssl/cert.pem", NULL, NULL);
$mysqli->real_connect(
  $_ENV["DATABASE_HOST"],
  $_ENV["DATABASE_USERNAME"],
  $_ENV["DATABASE_PASSWORD"],
  "@primary",
);
```

### PHP PDO

```php
# .env
DATABASE_HOST=aws.connect.psdb.cloud
DATABASE=@primary
DATABASE_USERNAME=username
DATABASE_PASSWORD=password

# index.php
// Use env variables to connect to the database
$dsn = "mysql:host={$_ENV["DATABASE_HOST"]};dbname={$_ENV["DATABASE"]}";
$options = array(
  PDO::MYSQL_ATTR_SSL_CA => "/etc/ssl/cert.pem",
);
$pdo = new PDO($dsn, $_ENV["DATABASE_USERNAME"], $_ENV["DATABASE_PASSWORD"], $options);
```

### Elixir

```elixir
defmodule Connect do

  def main do

    hostname = "aws.connect.psdb.cloud"

    {:ok, pid} = MyXQL.start_link(username: System.get_env("DATABASE_USERNAME"),
      database: "@primary",
      hostname: System.get_env("DATABASE_HOST"),
      password: System.get_env("DATABASE_PASSWORD"),
      ssl: true,
      ssl_opts: [
        verify: :verify_peer,
        cacertfile: CAStore.file_path(),
        server_name_indication: String.to_charlist(hostname),
        customize_hostname_check: [
          match_fun: :public_key.pkix_verify_hostname_match_fun(:https)
        ]
      ]
    )

    {:ok, res} = MyXQL.query(pid, "select * from users limit 1")
    IO.input(res)
    IO.puts "Successfully connected to PlanetScale!"
  end
end

Connect.main
```
