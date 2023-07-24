---
title: 'Laravel query caching with PlanetScale Boost'
subtitle: 'Learn how to use PlanetScale Boost in a Laravel application.'
date: '2022-11-15'
---

## How to use PlanetScale Boost in a Laravel application

To enable caching for your connection, you need to set the session variable `boost_query_caching` to `true`. We can do this by adding the following database connection resolver to your `AppServiceProvider`.

```php
<?php

namespace App\Providers;

use Illuminate\Database\MySqlConnection;
use Illuminate\Support\Arr;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        MySqlConnection::resolverFor('mysql', function ($connection, $database, $prefix, $config) {
            $connection = new MySqlConnection($connection, $database, $prefix, $config);

            try {
                if (Arr::get($config, 'boost_cached_queries') === true) {
                    $connection->statement('SET GLOBAL boost_cached_queries = 1');
                }
            } catch (\Exception $e) {
                // Nothing to do here.
            }

            return $connection;
        });
    }
}
```

Then, in your `database.php` config file you can turn on `boost_cached_queries` for any connection:

```php
return [
    'connections' => [

        'mysql' => [
            'driver' => 'mysql',
            // All of the configuration options...
            // [...]

            // Turn Boost on for this connection.
            'boost_cached_queries' => true,
        ],
    ]
]
```

This is the simplest way to get started using PlanetScale Boost. We recommend going a step further and setting up separate connections for your cached and un-cached queries.

Doing this will allow you to be confident you're getting up-to-date data when [reading your own writes](/docs/concepts/query-caching-with-planetscale-boost#replication-lag-and-read-your-writes).

## PlanetScale Boost with multiple connections

Setting up multiple connections is our recommended way of using PlanetScale Boost in Laravel.

First, you will need to update your `database.php` to let Laravel know about the new connection.

```php
return [
    'connections' => [
        'mysql' => [
            'driver' => 'mysql',
            // All of the configuration options...
            // [...]

            // Turn Boost off for this connection.
            'boost_cached_queries' => false,
        ],

        'mysql_boosted' => [
            'driver' => 'mysql',
            // All of the configuration options...
            // [...]

            // Turn Boost on for this connection.
            'boost_cached_queries' => true,
        ],
    ]
]
```

You now have two connections: `mysql` and `mysql_boosted`.

Notice that the only difference for these connections is the value for the `boost_cached_queries` variable. Otherwise the connection details for each are identical.

### Choosing the connection

Now that you have multiple connections, the next step is tell Eloquent which connection to use using the `on` method:

```php
// Use the Boost connection.
User::on('mysql_boosted')->select(/* ... */);

// Use the non-Boost connection.
User::on('mysql')->select(/* ... */);

// Use the default connection.
User::select(/* ... */);
```

If you'd like for a particular model to always use the Boost connection, you can set the [`connection` property](https://laravel.com/docs/eloquent#database-connections) in the model class.

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The database connection that should be used by the model.
     *
     * @var string
     */
    protected $connection = 'mysql_boosted';
}
```
