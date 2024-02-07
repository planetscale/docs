---
title: 'AWS Lambda connection strings'
subtitle: 'Learn how to securely use your PlanetScale MySQL connection strings with AWS Lambda Functions'
date: '2023-06-21'
---

## Introduction

In this guide, you'll learn how to properly store and use PlanetScale MySQL connection strings for use in AWS Lambda Functions. We'll use a [pre-built NodeJS](https://github.com/planetscale/aws-connection-strings-example) app for this example, but you can follow along using your own application as well.

## Prerequisites

- An AWS account
- A [free PlanetScale account](https://auth.planetscale.com/sign-up)

## Set up the database

{% callout %}
If you already have a database with a production branch, skip to [the next section](#configure-the-lambda-function).
{% /callout %}

Let's start by creating the database. In the PlanetScale dashboard, click the "**New database**" button followed by "**Create new database**". Name the database **lambda-connection-strings,** or any other name that you prefer. Click "**Create database**".

Once your database has finished initializing, you'll need to enable the web console on production branches. To do this, go to the "**Settings**" tab, check "**Allow web console access to production branches**", and click "**Save database settings**".

Now, access the console of the main branch by clicking "**Console**", then "**Connect**".

![The console {priority}](/assets/docs/tutorials/aws-lambda-connection-strings/console-3.png)

Create a simple table & insert some data using the following script:

```sql
CREATE TABLE Tasks(
	Id int PRIMARY KEY AUTO_INCREMENT,
	Name varchar(100),
	IsDone bit
);

INSERT INTO Tasks (Name) VALUES ('Clean the kitchen');
INSERT INTO Tasks (Name) VALUES ('Fold the laundry');
INSERT INTO Tasks (Name) VALUES ('Watch the sportsball game');
```

You may run `SELECT * FROM Tasks` to ensure the data was properly added from the console.

![Records from the console](/assets/docs/tutorials/aws-lambda-connection-strings/select.png)

Now we need to enable [**safe migrations**](/docs/concepts/safe-migrations) on the **main** branch. Click the **Dashboard** tab, then click the **cog** icon in the upper right of the infrastructure card.

![The option to promote a branch](/assets/docs/tutorials/aws-lambda-connection-strings/production-2.png)

Toggle on the "**Enable safe migrations**" option and click the "**Enable safe migrations**" button.

![Enable safe migrations](/assets/docs/tutorials/aws-lambda-connection-strings/safe-migrations-2.png)

Before moving on from the PlanetScale dashboard, grab the connection details to be used in the next step. Click on the **Connect** button to open the Connect modal.

![The dashboard after the database has been promoted](/assets/docs/tutorials/aws-lambda-connection-strings/promoted-2.png)

Select **NodeJS** from the **Connect with** dropdown, and note the details in the .env tab of the modal. These details will be required to connect to the database.

![The connection string for this database](/assets/docs/tutorials/aws-lambda-connection-strings/connect-2.png)

## Configure the Lambda function

Secrets in AWS Lambda functions, which include database connection strings, are often stored as environment variables with the Lambda function. We’ll be uploading a sample NodeJS app that has been provided and storing the connection string from the previous section as an environment variable to test.

Start by cloning the following Git repository:

```bash
git clone https://github.com/planetscale/aws-connection-strings-example.git
```

Log into the AWS Console, use the universal search to search for ‘**Lambda**’, and select it from the list of services.

![Search for Lambda in the AWS Console](/assets/docs/tutorials/aws-lambda-connection-strings/aws.png)

Create a new function using the **Create function** button in the upper right of the console.

![The default view of Lambda functions](/assets/docs/tutorials/aws-lambda-connection-strings/functions.png)

Name your function **lambda-connection-strings** (or any other name that suits you) and select **NodeJS** under **Runtime**. The other fields can be left as default. Click **Create function** to finish the initial setup of your Lambda.

![The view to create a Lambda function](/assets/docs/tutorials/aws-lambda-connection-strings/create-function.png)

On the next view, about halfway down the page you’ll see a section called **Code source**. Click the **Upload from** button, then **.zip file**.

![The default NodeJS Lambda function](/assets/docs/tutorials/aws-lambda-connection-strings/node.png)

Click the **Upload** button which will display a file browser. Select the **aws-connection-strings-example.zip** file from the **dist** folder of the provided repository. Click **Save** once it’s been selected.

![The modal to upload code](/assets/docs/tutorials/aws-lambda-connection-strings/upload.png)

The contents of the code editor under **Code source** should have updated to show the code stored in the zip file.

![The code of the Lambda function that was uploaded](/assets/docs/tutorials/aws-lambda-connection-strings/source.png)

### Configure environment variables

Next, you need to set the PlanetScale `DATABASE_URL` environment variable that you copied earlier. Select the **Configuration** tab, and click **Edit**.

![The configuration tab](/assets/docs/tutorials/aws-lambda-connection-strings/configuration.png)

You’ll be presented with a view to add or update environment variables. Click **Add environment variable** and the view will update with a row to add an environment variable. Set the **Key** field to **DATABASE_URL** and the **Value** to the connection string taken from the previous section. Click **Save** once finished.

![The view to manage environment variables](/assets/docs/tutorials/aws-lambda-connection-strings/environment-variables.png)

Finally, test the function by selecting the **Test** tab, and then clicking the **Test** button.

![The test tab](/assets/docs/tutorials/aws-lambda-connection-strings/test.png)

An **Execution results** box will display above the **Test event** section. If the box is green, it likely means everything executed as expected. Click the dropdown next to **Details** to see the results of the query. Since the results of the query were logged out to the console, they will be displayed in the **Log output** section.

![The execution results](/assets/docs/tutorials/aws-lambda-connection-strings/success.png)
