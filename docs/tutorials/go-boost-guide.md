---
title: 'Go query caching with PlanetScale Boost'
subtitle: 'Learn how to use PlanetScale Boost in a Go application.'
date: '2023-09-19'
---

This guide will walk you through two methods to connect to your database using the [PlanetScale Boost query caching feature](/docs/concepts/query-caching-with-planetscale-boost) in Go. We'll first go over a simple example showing how to enable PlanetScale Boost for all queries, and then expand on it to create a separate connection that has the query cache enabled.

## Enable PlanetScale Boost on a SQL connection

Below is a simple code snippet showing how to connect to a PlanetScale database.

```go
package main

import (
	"context"
	"database/sql"
	"log"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", os.Getenv("DSN"))
	if err != nil {
		log.Fatalf("failed to connect: %v", err)
	}
	defer db.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := db.PingContext(ctx); err != nil {
		log.Fatalf("failed to ping: %v", err)
	}

	log.Println("Successfully connected to PlanetScale!")
}
```

In order for the connection to direct queries through your query cache, you’ll need to set the `@@boost_cached_queries` session variable. Because a Go `*sql.DB` is a connection _pool_, you must fetch a _single connection from the pool_ in order to safely modify its session state.

An updated version of the full code snippet might look like this:

```go
package main

import (
	"context"
	"database/sql"
	"log"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", os.Getenv("DSN"))
	if err != nil {
		log.Fatalf("failed to connect: %v", err)
	}
	defer db.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Fetch a connection from the pool and enable query caching in its session.
	conn, err := db.Conn(ctx)
	if err != nil {
		log.Fatalf("failed to get connection: %v", err)
	}
	defer conn.Close()

	if _, err := conn.ExecContext(ctx, "SET @@boost_cached_queries = true"); err != nil {
		log.Fatalf("failed to enable boost: %v", err)
	}

	if err := conn.PingContext(ctx); err != nil {
		log.Fatalf("failed to ping: %v", err)
	}

	log.Println("Successfully connected to PlanetScale!")
}
```

Using this method, all of your queries will be run through the boosted connection, even those that aren't using PlanetScale Boost. This may make it difficult to tell which queries are actually being boosted. For this reason, we recommend setting up two separate connections: one for regular queries and one for boosted queries.

## Set up multiple connections

Our recommended strategy for working with PlanetScale Boost is to use multiple separate connections so you can be explicit when executing your queries. Below is an updated version of the snippet that manages the use of PlanetScale Boost on individual database connections from the pool.

```go
package main

import (
	"context"
	"database/sql"
	"log"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", os.Getenv("DSN"))
	if err != nil {
		log.Fatalf("failed to connect: %v", err)
	}
	defer db.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Fetch a connection from the pool and explicitly disable query caching.
	//
	// For a long-lived application, we don't know the session state of the
	// connection prior to fetching it from the pool. The safest approach is to
	// explicitly set the session variables each time a connection is fetched
	// from the pool.
	//
	// Important: make sure to return the connections to the pool by deferring
	// conn.Close, see: https://pkg.go.dev/database/sql#DB.Conn
	conn, err := db.Conn(ctx)
	if err != nil {
		log.Fatalf("failed to get connection: %v", err)
	}
	defer conn.Close()

	if _, err := conn.ExecContext(ctx, "SET @@boost_cached_queries = false"); err != nil {
		log.Fatalf("failed to disable boost on connection: %v", err)
	}

	// Fetch a second connection from the pool and enable query caching. See the
	// notes above regarding session state and connection pool management.
	cachingConn, err := db.Conn(ctx)
	if err != nil {
		log.Fatalf("failed to get caching connection: %v", err)
	}
	defer cachingConn.Close()

	if _, err := cachingConn.ExecContext(ctx, "SET @@boost_cached_queries = true"); err != nil {
		log.Fatalf("failed to enable boost on caching connection: %v", err)
	}

	if err := conn.PingContext(ctx); err != nil {
		log.Fatalf("failed to ping: %v", err)
	}

	if err := cachingConn.PingContext(ctx); err != nil {
		log.Fatalf("failed to ping with caching: %v", err)
	}

	log.Println("Successfully connected to PlanetScale!")
}
```
