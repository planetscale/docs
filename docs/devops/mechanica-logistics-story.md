---
title: 'A story of DevOps'
subtitle: 'Follow along as a small team builds a new feature in their code with DevOps and PlanetScale.'
date: '2023-03-13'
---

## Intro

This article is about a fictitious company that uses a PlanetScale database to back its application and utilizes many of the techniques discussed in the phase-specific articles in our documentation.

### Background

The story follows Mechanica Logistics, a small warehousing and transportation company with a web application that their customers can use to place new shipping orders or track the status of existing orders. Since they are a small business, its tech team has a size to match. Jenny is their Architect and Lead Backend Developer. She primarily works with the other backend developer, Ricardo, when working on their API written with Go. Malik is the team’s designer and front-end developer and he is responsible for maintaining the React web application used by customers. Finally, Ainsley is the company’s sole Systems Engineer, responsible for maintaining the AWS infrastructure performing well.

Mechanica uses the following tools in its tech team:

| Tool        | Use case                                                                    |
| ----------- | --------------------------------------------------------------------------- |
| Jira        | Organize and assign work, and create development iterations.                |
| GitHub      | Source control management.                                                  |
| Slack       | Team messaging and system notifications.                                    |
| Jenkins     | Builds, tests, and deploys the application updates.                         |
| Datadog     | Provides a dashboard to monitor application and infrastructure performance. |
| PlanetScale | Hosts their MySQL databases.                                                |
| Terraform   | Automate AWS infrastructure management.                                     |
| Atlas CLI   | Perform schema migrations.                                                  |

### Infrastructure

Mechanica uses AWS as its primary cloud provider, with the exception of using PlanetScale for its MySQL database. Their React front end operates as a single-page application and is stored in a dedicated S3 bucket. A CloudFront instance is used in front of it to use a custom domain name, as well as cache the front end as close to end users as possible. The API is written in Go and is running on two Linux EC2 instances in production. A technique called “blue/green” is used with the API, so one instance is always live and the other is used as the staging server.

There are three environments active at any time. A development environment is used for building and testing new functionality by the developers. A test environment is used by Jenkins to run automated tests to ensure that everything is built according to spec. Finally, there is the production environment that's used by Mechanica customers. Although there are three separate environments, a single PlanetScale database is used, with a separate database branch configured for each environment.

### The request

One of Mechanica’s biggest partners, Empress Products, recently experienced large unexpected growth and their shipping orders likewise increased. Due to the increase in orders, the systems at Empress were struggling to continuously poll for order status using Mechanica’s API and needed another solution. The tech team at Empress submitted a request that Mechanica figures out a way to send them updates on order status whenever things change instead. Since Empress was one of their largest customers, they decided to prioritize it and address it during the next development cycle.

## Plan and Code

Early Monday morning, the team at Mechanica assembled as they do every two weeks to decide what needed to get done in this development cycle. Jada, the company project manager, was also present as usual to provide insight on the feedback they’ve gathered from Mechanica customers. Jada informed the team of the request from Empress. After some brainstorming among the technical team, they settled on building a system that used webhooks, a way to allow the systems at Mechanica to submit status updates to any HTTP endpoint at the point when an order changes, in near real-time. As the planning concluded around the new system, the team identified the following required changes:

- Update the front end to allow customers to register webhooks.
- Update the `Customers` table in the database to add columns for storing the webhook endpoints and signing keys for the webhooks system.
- Create a new serverless function to process outgoing webhook messages, signing the messages and sending them to the customer endpoint.
- Add a message queue to offload messages to buffer messages between the API and serverless function to reduce API load.
- Identify anywhere in the current API that order statuses change to submit a message to the message queue.

As soon as the Sprint was created and confirmed, a Jira automation would use the PlanetScale API to create a fresh `dev` database branch for the team to begin working with. The most recent backup would also be specified to seed data into that branch, giving the team an isolated environment that mirrored production.

Each member of the team was assigned work relevant to their expertise. Malik built the necessary views required for the React application. This included views to create webhook endpoints, manage and delete existing endpoints, and generate signing keys as needed.

Jenny and Ricardo worked on building the backend components. The new serverless function would be written in Go and would be responsible for using the signing key to sign webhook messages and POST them to customer endpoints. The two were also able to identify where changes in the existing API code were needed to allow the API to dispatch messages into the message queue.

Ainsley takes the security of Mechanica databases very seriously and they do not give out connection strings, even to developers in case one of their systems gets infected. Due to this policy, Jenny and Ricardo proxy connections to the PlanetScale database using the `pscale connect` command of the CLI. When Jenny and Ricardo are working on the backend services, they simply run `pscale connect` to set up a tunnel to the database before they start their local development instance of the APIs. This allows the locally running instances of their APIs to connect to `localhost`, where the PlanetScale CLI will redirect the queries directly into the database without having to use connection strings.

The backend team also updates the schema definition file to add the new table that was required and used the Atlas CLI to apply the database changes to the `dev` branch of their database. This will ensure that the state of the database is always consistent and reviewable by the team (since the definition is managed by source control) instead of having developers apply changes manually and make mistakes.

Ainsley worked to build out a Terraform definition that would be used to not only create the new infrastructure components in AWS but maintain them going forward so that they didn't have to manually tweak settings as things changed over time. Along with Jenny’s help, the two of them were able to quickly update the configuration file for the API to add credentials allowing the API to submit messages to the queue, as well as deploy the new serverless function into the development environment for some live testing by the developers.

Once everything was built and manually tested by the developers, it was time to open a pull request for the monorepo and review all of the changes as a team. Since the team had been working together for several years at this point, only minimal changes needed to be made before the pull request was closed and it could move into testing.

## Build and Test

At the moment the pull request closed, GitHub used a webhook to notify the Jenkins server to build the newest version of the code. Jenkins then cloned down the repo from GitHub at that specific commit where the PR was merged and compiled the API project and the new serverless function into their respective binaries and uploaded the artifacts to a dedicated AWS S3 bucket to store for usage throughout the pipeline.

Once the build stage of the pipeline was completed, it was time to move on to testing. Ainsley had previously spent weeks ensuring that the entire testing process was also automated by Jenkins. Since the team had taken a test-driven development approach to build the code, it had plenty of unit and integration tests built to ensure that the new code met the business requirements set during planning.

The process kicked off by running a Terraform command that would spin up the necessary infrastructure in AWS for testing. This would create an SQS queue in a dedicated AWS test account that could be used during integration testing to make sure the webhooks feature was built to spec. Next up would be building out the test database infrastructure.

Using the PlanetScale CLI, Jenkins would create a replica of the `main` production database branch by creating a new branch called `test`. This would automatically create an isolated MySQL environment where integration testing could be performed without affecting production. In the past, the team used to have a `.sql` script that would seed test data to their `test` branch for running this process, but more recently they’ve been using the Data Branching® feature set to restore the most recent backup of the `main` branch into `test`, creating an identical copy of their production database. To finalize the setup of the database, Jenkins would run the Atlas CLI to sync up the new table from the `dev` branch into `test`. Now the database looks exactly as it would once all of these changes make it into production.

Before running the test, the proper credentials needed to be generated and added to the project configuration. Jenkins would again use the PlanetScale CLI to generate a connection string and store it alongside the project. Next, Jenkins would use the cloned repository and run the `go test` command to execute all of the tests the team had written. This would not only be the unit tests that would validate business logic, but also the integration tests that would perform CRUD logic for storing and reading webhook configuration from the database, as well as simulating an order to check that the message gets processed as expected.

Once the tests have concluded and all have passed, Jenkins would use Terraform to tear down the test infrastructure in AWS and the PlanetScale CLI to delete the `test` branch since it is no longer required. Finally, Jenkins would once again use the PlanetScale CLI to open a Deploy request from `dev` into `main`, then notify the team using Slack so they could prepare for deploying the latest version of their application to production.

## Release and Deploy

After Jenny, Ricardo, Malik, and Ainsley reviewed the test results and confirm everything went smoothly, they approve the Deploy request so PlanetScale can start synchronizing the changes from the development environment into production. Since this process uses shadow tables to effectively stage changes without making them live, the actual process of going live happens quickly and painlessly.

At this point, the latest version of the code has been thoroughly tested and the schema changes have been staged for the database. Ainsley logs into Jenkins and approves the final phase of the pipeline to deploy all of the changes to production. This kicks off a process where Jenkins utilizes deploy agents installed on the production EC2 servers to download the latest artifacts from S3, replace the old binaries, and restart the service that keeps the API alive. The script also creates the necessary SQS queue in AWS using Terraform and uses the PlanetScale CLI to apply the schema changes from the deploy request, which effectively cuts over the application to use the new version of the schema. Finally, the load balancer is updated to reroute traffic to the newest version of the application. After a week and a half of hard work, the changes are now live and can be used by Mechanica customers.

## Operate and Monitor

Although the code has already gone through a rigorous testing process, it's inevitable that certain issues can occur once the application hits production as there are certain variables that simply can't be accounted for in testing. Upon deployment, Ainsley starts to monitor the Datadog dashboard configured to store the logs forwarded from AWS as well as Insights data forwarded from PlanetScale. This was important since the window to revert schema changes is open for 30 minutes, allowing for quickly rolling back changes.

The dashboard includes metrics detailing the operating capacity of the EC2 servers, network traffic, application errors, and query performance metrics. Since moving to PlanetScale, the team hasn’t had much to worry about regarding the database infrastructure since that is completely managed for them. This has freed much of Ainsley’s time to focus on optimizing the performance of other infrastructure components, so nearly all issues have been ironed out.

As the new feature started to be utilized, Ainsley did notice that some queries weren’t performing as expected based on analytical data being forwarded to Datadog from PlanetScale. Ainsley opened the Insights tab of the database to validate the data in their dashboard and indeed notice that the query for webhook configurations was performing a scan on the entire table instead of just the necessary rows. They decided to add a new issue to the Jira board to address it in the next cycle.

Although there was minor room to improve, the feedback from Empress Products on the new feature was overwhelmingly positive, and that they wanted this same functionality built into many other areas of the application. Jada took the feedback and added yet another issue in Jira to make in the future.

## Conclusion

Although this story is fictional, it demonstrates how DevOps and PlanetScale can help streamline team processes and ease the pain of deploying applications into production. After reading this, you should have a better understanding of how these practices can be used within your organization.
