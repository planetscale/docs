---
title: 'PlanetScale GitHub Actions'
subtitle: 'Learn how to integrate into your CI/CD flows with GitHub Actions.'
date: '2023-03-31'
---

See our [tech talk on Databases + CI/CD](https://planetscale.com/media/incorporating-databases-into-your-ci-cd-pipeline) to see pscale + GitHub Actions
used in a real application.

With GitHub Actions, you can automate the creation of branches and deploy requests all within your CI workflow.

- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Convert GitHub branch name to PlanetScale branch name](#convert-github-branch-name-to-planetscale-branch-name)
- [Create a PlanetScale branch](#create-a-planetscale-branch)
- [Create a password for a branch](#create-a-password-for-a-branch)
- [Open a deploy request](#open-a-deploy-request)
- [Get deploy request by branch name](#get-deploy-request-by-branch-name)
- [Get deploy request diff and comment on pull request](#get-deploy-request-diff-and-comment-on-pull-request)
- [Check for dropped columns](#check-for-dropped-columns)
- [Submit a deploy request by branch name](#submit-a-deploy-request-by-branch-name)

## Getting started

The best way to use PlanetScale within GitHub Actions is via the `pscale` CLI.

Use [`planetscale/setup-pscale-action`](https://github.com/planetscale/setup-pscale-action) to make pscale available within your GitHub Actions.

```yaml
- name: Setup pscale
  uses: planetscale/setup-pscale-action@v1
```

The action works with Linux, Windows, and Mac runners. Once installed it will be added to your tool cache for subsequent runs.

## Authentication

Authentication for pscale is via service token environment variables.

You will need to [create a service token](https://planetscale.com/docs/concepts/service-tokens). Make sure to give your service token the proper permissions to the database you'll be using in your workflow.

Add your `PLANETSCALE_SERVICE_TOKEN_ID` and `PLANETSCALE_SERVICE_TOKEN` to your [Actions secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository).

In your Actions workflow, you will need to make the secrets available as environment variables.

```yaml
- name: Run pscale command
  env:
    PLANETSCALE_SERVICE_TOKEN_ID: ${{ secrets.PLANETSCALE_SERVICE_TOKEN_ID }}
    PLANETSCALE_SERVICE_TOKEN: ${{ secrets.PLANETSCALE_SERVICE_TOKEN }}
  run: pscale database list
```

## Examples

The following examples show how to accomplish common Actions workflows with PlanetScale. In each example, notice that we use secrets for the service token, database and organization names.
You will need to set them in your GitHub repository to target your own database.

```
PLANETSCALE_ORG_NAME
PLANETSCALE_DATABASE_NAME
PLANETSCALE_SERVICE_TOKEN_ID
PLANETSCALE_SERVICE_TOKEN
```

### Convert GitHub branch name to PlanetScale branch name

PlanetScale branch names must be lowercase, alphanumeric characters and hyphens are allowed.

Since git branch names allow more possibilities, you can use the following code to transform a git branch name into an acceptable PlanetScale branch name.

```yaml
- name: Rename branch name
  run: echo "PSCALE_BRANCH_NAME=$(echo ${{ github.head_ref }} | tr -cd '[:alnum:]-'| tr '[:upper:]' '[:lower:]')" >> $GITHUB_ENV
```

This makes `${{ env.PSCALE_BRANCH_NAME }}` available for use in the rest of the workflow. This is useful to run in any scenario where you are creating
a PlanetScale branch to correspond with a git branch.

### Create a PlanetScale branch

You can use `pscale branch create` to create a branch that matches your GitHub branch name.

```yaml
- name: Create branch
  env:
    PLANETSCALE_SERVICE_TOKEN_ID: ${{ secrets.PLANETSCALE_SERVICE_TOKEN_ID }}
    PLANETSCALE_SERVICE_TOKEN: ${{ secrets.PLANETSCALE_SERVICE_TOKEN }}
  run: |
    set +e
    pscale branch show ${{ secrets.PLANETSCALE_DATABASE_NAME }} ${{ env.PSCALE_BRANCH_NAME }}
    exit_code=$?
    set -e

    if [ $exit_code -eq 0 ]; then
      echo "Branch exists. Skipping branch creation."
    else
      echo "Branch does not exist. Creating."
      pscale branch create ${{ secrets.PLANETSCALE_DATABASE_NAME }} ${{ env.PSCALE_BRANCH_NAME }} --wait
    fi
```

Notice that we first check if the branch exists. If it does, we do nothing. Otherwise we create it and pass the `--wait` flag.

This is useful when running in CI, as the workflow may run multiple times and you'll want the branch ready if you are running schema migrations immediately after creating the branch.

### Create a password for a branch

You can use `pscale password create` to generate credentials for your database branch.

```yaml
- name: Generate password for branch
  env:
    PLANETSCALE_SERVICE_TOKEN_ID: ${{ secrets.PLANETSCALE_SERVICE_TOKEN_ID }}
    PLANETSCALE_SERVICE_TOKEN: ${{ secrets.PLANETSCALE_SERVICE_TOKEN }}
  run: |
    response=$(pscale password create ${{ secrets.PLANETSCALE_DATABASE_NAME }} ${{ env.PSCALE_BRANCH_NAME }} -f json)

    id=$(echo "$response" | jq -r '.id')
    host=$(echo "$response" | jq -r '.access_host_url')
    username=$(echo "$response" | jq -r '.username')
    password=$(echo "$response" | jq -r '.plain_text')
    ssl_mode="verify_identity"  # Assuming a default value for ssl_mode
    ssl_ca="/etc/ssl/certs/ca-certificates.crt"  # Assuming a default value for ssl_ca

    # Set the password ID, allows us to later delete it if wanted.
    echo "PASSWORD_ID=$id" >> $GITHUB_ENV

    # Create the DATABASE_URL
    database_url="mysql://$username:$password@$host/${{ secrets.PLANETSCALE_DATABASE_NAME }}?sslmode=$ssl_mode&sslca=$ssl_ca"
    echo "DATABASE_URL=$database_url" >> $GITHUB_ENV
    echo "::add-mask::$DATABASE_URL"
- name: Use the DATABASE_URL in a subsequent step
  run: |
    echo "Using DATABASE_URL: $DATABASE_URL"
```

This example shows creating the password and getting back a response in json. The json is then parsed to create a `DATABASE_URL` which can be used in later steps.

{% callout type="note" %}
`pscale password create` can also accept a `ttl` flag which lets you limit the number of minutes the password is valid for.
{% /callout %}

### Open a deploy request

You can use `pscale deploy-request create` to open a new deploy request from GitHub Actions.
This can be useful after running migrations against a branch.

```yaml
- name: Open DR if migrations
  env:
    PLANETSCALE_SERVICE_TOKEN_ID: ${{ secrets.PLANETSCALE_SERVICE_TOKEN_ID }}
    PLANETSCALE_SERVICE_TOKEN: ${{ secrets.PLANETSCALE_SERVICE_TOKEN }}
  run: pscale deploy-request create ${{ secrets.PLANETSCALE_DATABASE_NAME }} ${{ env.PSCALE_BRANCH_NAME }}
```

### Get deploy request by branch name

You can use `pscale deploy-requests show` to grab the latest deploy request by branch name.

This can be useful when deploying your application. You can first check if there are any deploy requests open for the branch being deployed. If there are, you can
trigger the deploy request to run before you deploy your application.

```yaml
- name: Get Deploy Requests
  env:
    PLANETSCALE_SERVICE_TOKEN_ID: ${{ secrets.PLANETSCALE_SERVICE_TOKEN_ID }}
    PLANETSCALE_SERVICE_TOKEN: ${{ secrets.PLANETSCALE_SERVICE_TOKEN }}
  run: |
    deploy_request_number=$(pscale deploy-request show ${{ secrets.PLANETSCALE_DATABASE_NAME }} ${{ env.PSCALE_BRANCH_NAME }} -f json | jq -r '.number')
    echo "DEPLOY_REQUEST_NUMBER=$deploy_request_number" >> $GITHUB_ENV
```

This example also makes the deploy request number available as an `env` var so that it can be used in later steps.

### Get deploy request diff and comment on pull request

We can use `pscale deploy-request diff` to see the full schema diff of a deploy request.

This example is useful when combined with opening a deploy request for a git branch. You can then automatically comment the diff back to the GitHub pull request.

```yaml
- name: Comment on PR
  env:
    PLANETSCALE_SERVICE_TOKEN_ID: ${{ secrets.PLANETSCALE_SERVICE_TOKEN_ID }}
    PLANETSCALE_SERVICE_TOKEN: ${{ secrets.PLANETSCALE_SERVICE_TOKEN }}
  run: |
    echo "Deploy request opened: https://app.planetscale.com/${{ secrets.PLANETSCALE_ORG_NAME }}/${{ secrets.PLANETSCALE_DATABASE_NAME }}/deploy-requests/${{ env.DEPLOY_REQUEST_NUMBER }}" >> migration-message.txt
    echo "" >> migration-message.txt
    echo "\`\`\`diff" >> migration-message.txt
    pscale deploy-request diff ${{ secrets.PLANETSCALE_DATABASE_NAME }} ${{ env.DEPLOY_REQUEST_NUMBER }}  -f json | jq -r '.[].raw' >> migration-message.txt
    echo "\`\`\`" >> migration-message.txt
- name: Comment PR - db migrated
  uses: thollander/actions-comment-pull-request@v2
  with:
    filePath: migration-message.txt
```

This writes the diff to the `migration-message.txt` file. And then creates a comment on the pull request that triggered the workflow.

### Check for dropped columns

PlanetScale sets a `can_drop_data` boolean for any schema change that drop a column or table. We can make use of this to emit a warning into our pull requests.

In this example, we first wait for the deployment check to be `ready`. During this time, PlanetScale is examining the schema change, verifying that it is safe and
generating the DDL statements to make the change. Once it's done, we then use this information to put a comment on the deploy request with tips on how to deploy it safely.

```
- name: Check deployment state
    id: check-state
    env:
      PLANETSCALE_SERVICE_TOKEN_ID: ${{ secrets.PLANETSCALE_SERVICE_TOKEN_ID }}
      PLANETSCALE_SERVICE_TOKEN: ${{ secrets.PLANETSCALE_SERVICE_TOKEN }}
    run: |
      for i in {1..10}; do
        deployment_state=$(pscale deploy-request show ${{ secrets.PLANETSCALE_ORG_NAME }} ${{ env.PSCALE_BRANCH_NAME }} --format json | jq -r '.deployment_state')
        echo "Deployment State: $deployment_state"

        if [ "$deployment_state" = "ready" ]; then
          echo "Deployment state is ready. Continuing."
          break
        fi

        echo "Deployment state is not ready. Waiting 2 seconds before checking again."
        sleep 2
      done
  - name: Comment PR - db migrated
    if: ${{ env.DR_OPENED }}
    env:
      PLANETSCALE_SERVICE_TOKEN_ID: ${{ secrets.PLANETSCALE_SERVICE_TOKEN_ID }}
      PLANETSCALE_SERVICE_TOKEN: ${{ secrets.PLANETSCALE_SERVICE_TOKEN }}
    run: |
      deploy_data=$(pscale api organizations/${{ secrets.PLANETSCALE_ORG_NAME }}/databases/${{ secrets.PLANETSCALE_DATABASE_NAME }}/deploy-requests/${{ env.DEPLOY_REQUEST_NUMBER }}/deployment --org planetscale)
      can_drop_data=$(echo "$deploy_data" | jq -r '.deploy_operations[] | select(.can_drop_data == true) | .can_drop_data')

      echo "Deploy request opened: https://app.planetscale.com/${{ secrets.PLANETSCALE_ORG_NAME }}/${{ secrets.PLANETSCALE_DATABASE_NAME }}/deploy-requests/${{ env.DEPLOY_REQUEST_NUMBER }}" >> migration-message.txt
      echo "" >> migration-message.txt

      if [ "$can_drop_data" = "true" ]; then
        echo ":rotating_light: You are dropping a column. Before running the migration make sure to do the following:" >> migration-message.txt
        echo "" >> migration-message.txt

        echo "1. [ ] Deploy app changes to ensure the column is no longer being used." >> migration-message.txt
        echo "2. [ ] Once you've verified it's no used, run the deploy request." >> migration-message.txt
        echo "" >> migration-message.txt
      else
        echo "When adding to the schema, the Deploy Request must be run **before** the code is deployed." >> migration-message.txt
        echo "Please ensure your schema changes are compatible with the application code currently running in production." >> migration-message.txt
        echo "" >> migration-message.txt

        echo "1. [ ] Successfully run the Deploy Request" >> migration-message.txt
        echo "2. [ ] Deploy this PR" >> migration-message.txt
        echo "" >> migration-message.txt
      fi

      echo "\`\`\`diff" >> migration-message.txt
      pscale deploy-request diff ${{ secrets.PLANETSCALE_ORG_NAME }} ${{ env.DEPLOY_REQUEST_NUMBER }} -f json | jq -r '.[].raw' >> migration-message.txt
      echo "\`\`\`" >> migration-message.txt
  - name: Comment PR - db migrated
    uses: thollander/actions-comment-pull-request@v2
    if: ${{ env.DR_OPENED }}
    with:
      filePath: migration-message.txt
```

### Submit a deploy request by branch name

To trigger a deploy, we can use `pscale deploy-request deploy`. This command will accept either the deploy request number, or the branch name.

When using with GitHub Actions, it's often easier to use the branch name.

The `--wait` flag will let the command run until the deployment is complete. This is important if you want your schema change to run before the next step in your workflow.

```yaml
- name: Deploy schema migrations
  env:
    PLANETSCALE_SERVICE_TOKEN_ID: ${{ secrets.PLANETSCALE_SERVICE_TOKEN_ID }}
    PLANETSCALE_SERVICE_TOKEN: ${{ secrets.PLANETSCALE_SERVICE_TOKEN }}
  run: |
    pscale deploy-request deploy ${{ secrets.PLANETSCALE_DATABASE_NAME }} ${{ env.PSCALE_BRANCH_NAME }} --wait
```
