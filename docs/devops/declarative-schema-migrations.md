---
title: 'Declarative schema migrations'
subtitle: 'Learn how the schema migrations are performed using a single state definition.'
date: '2023-03-13'
---

The DevOps world has embraced the concept of Infrastructure as Code (IaC) as a way to define infrastructure in configuration files. These configuration files can then be used with orchestration tools to automatically deploy and configure architecture in the hosting provider of your choice.

As an example, the following code snippet can be used by the AWS Serverless Application Model (SAM) CLI and will deploy a Lambda function to AWS, and configure an API Gateway instance to execute the function over HTTP:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: >
  sam-go-sample


Resources:
  HelloWorldFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: hello-world/
      Handler: hello-world
      Runtime: go1.x
      Events:
        CatchAll:
          Type: Api
          Properties:
            Path: /hello
            Method: GET
```

Performing the above actions manually, while not prohibitively difficult, would certainly take more time than deploying this configuration with a simple CLI command. This is also a fairly simple example. Consider how much manual effort it would take to configure and deploy 20 Lambda functions!

## Declarative SQL Schemas

Several tools can manage your database schema in a very similar way to IaC tools. Using these tools, you can define your SQL schema in a specially-crafted file that the tool can understand, and simply apply the changes using the CLI. For example, the following file can be used by the Atlas CLI to define a schema:

```
table "hotels" {
  schema = schema.hotels_db
  column "id" {
    null           = false
    type           = int
    unsigned       = true
    auto_increment = true
  }
  column "name" {
    null = false
    type = varchar(50)
  }
  column "address" {
    null = false
    type = varchar(50)
  }
  primary_key {
    columns = [column.id]
  }
}
schema "hotels_db" {
  charset = "utf8mb4"
  collate = "utf8mb4_0900_ai_ci"
}
```

Making a change to the schema is as simple as modifying the file and applying the changes using the CLI tool.

```
table "hotels" {
  schema = schema.hotels_db
  column "id" {
    null           = false
    type           = int
    unsigned       = true
    auto_increment = true
  }
  column "name" {
    null = false
    type = varchar(50)
  }
  column "address" {
    null = false
    type = varchar(50)
  }
  # Adding the "stars" column.
  column "stars" {
    null     = true
    type     = float
    unsigned = true
  }
  primary_key {
    columns = [column.id]
  }
}
schema "hotels_db" {
  charset = "utf8mb4"
  collate = "utf8mb4_0900_ai_ci"
}
```

{% callout %} Refer to our blog post on [how to use the Atlas CLI with PlanetScale](/blog/declarative-mysql-schemas-with-atlas-cli) for more detail. {% /callout %}

## Benefits of a declarative approach

Managing schema migrations with this approach has some benefits. The first major benefit is that it fits the Single Source of Truth approach encouraged by DevOps, where there is one place that contains the main file used to control the schema.

It is also easier to read by developers in comparison to using [versioned migrations](/docs/devops/versioned-schema-migrations). In addition to being easier to understand, it may eliminate the need to learn DDL, the language used by SQL to define the schema. This makes it a lower barrier to entry for developers that may not be experienced with SQL yet.

Finally, automating the process of applying changes is fairly simple since many of the tools used to apply changes can be scripted. This makes it easy to implement the process of upgrading your schema into your continuous deployment tools.

## Drawbacks of this strategy

While eliminating the need to learn DDL can be a benefit, using tools to circumvent the process of learning may act as a crutch for developers.

Conflicting schema definitions are also a concern with this approach. If you consider that multiple developers may be making changes to the schema definition files at the same time on separate machines, you may run into a scenario where one developer's changes will overwrite another's, causing conflicts in what the database schema should be.

It’s also worth considering that databases are inherently stateful, where the data that is stored by the database is just as important as the structure of the database. Because of this, some care needs to be taken when applying changes so there are no undesired results of migrating the schema.

## How to use declarative migrations with PlanetScale

The [branching flow](/docs/concepts/branching) used by databases hosted in PlanetScale is a form of schema migration in itself. When making changes to a database in PlanetScale, developers will typically create a working branch of the production database branch to make changes to.

Since production branches in PlanetScale restrict the use of DDL (something that these tools ultimately use to make changes), the development branch used in the previous example would be where these tools can be used to control the schema.

One possible strategy that teams can use is to open a new branch each time code changes are required, typically at the begining of a development cycle. When a change needs to be made to the datanase schema, a dedicated repository (let’s call it the `db` repository) can be used for developers to check in changes to the definition file. Automated tools can be used to monitor the `db` repository for changes, apply the schema changes to the active development branch, and notify the development team that the schema has changed so they can act accordingly.

When changes need to be applied to the production database branch, [deploy requests](/docs/concepts/deploy-requests) can then be used to review and apply the changes before deploying the latest release.
