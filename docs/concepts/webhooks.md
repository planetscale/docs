---
title: 'Webhooks'
subtitle: 'Automatically trigger HTTP callbacks on events in PlanetScale to build custom integrations, notifications, and workflows.'
date: '2023-10-26'
---

## Webhooks in PlanetScale

With a webhook in PlanetScale, you can trigger an HTTP POST callback to a configured URL when a specific event occurs within your PlanetScale organization. The callback payload will contain useful data related to the event. With this data, webhooks can be used to build custom integrations, notifications, and automate other workflows.

{% callout type="note" %}
Webhooks are currently in beta.
{% /callout %}

Webhooks in PlanetScale are not like MySQL triggers and cannot be triggered on database table events like `INSERT`, `UPDATE`, or `DELETE`. Instead, think of events like:

- `branch.ready` - The branch is created and ready to connect.
- `branch.sleeping` - The branch is now sleeping.
- `deploy_request.opened` - The deploy request has been opened.
- `deploy_request.queued` - The deploy request has been added to the deploy queue.
- `deploy_request.in_progress` - The deploy request has started running.
- `deploy_request.schema_applied` - The deploy request has finished applying the schema.
- `deploy_request.errored` - The deploy request has stopped due to an error.
- `deploy_request.reverted` - The deploy request has been reverted.
- `deploy_request.closed` - The deploy request has been closed.

{% callout type="note" %}
If there is an event you want to use that is not included in this list, please [contact us](/contact) and let us know what event you want to trigger a webhook on.
{% /callout %}

For more information about the events you can trigger a webhook with in PlanetScale, including example payloads, see the [webhook event reference documentation](/docs/reference/webhook-events).

## Common webhook use cases

There are various scenarios where webhooks can be useful, some of them include:

- Creating notifications in Slack, Microsoft Teams, GitHub, and other tools
- Integrating with CI/CD processes for the automation of schema changes
- Updating external issue trackers like Jira

## Setting up a webhook in PlanetScale

You must be a [database administrator](/docs/concepts/access-control#database-administrator) to create a webhook for a database.

1. Go to your database's settings page > **"Webhooks"** page.
2. Click **"Add webhook"**.
3. Add an unique URL for the webhook to send events to. The URL must:

- Use HTTPS. You can use sites like [https://webhook.site](https://webhook.site/) or tools like [ngrok](https://ngrok.com/docs/getting-started/) to create a HTTPS URL to test webhooks locally.
- Be reachable from the internet, no local hosts.
- Be able to handle incoming HTTP callbacks.

4. Select the events you want to trigger the webhook. See the [webhook events reference](/docs/reference/webhook-events) for more information on the events and example response bodies.
5. Click **"Save webhook"**.
6. Select the **...** ellipsis and click **"Test webhook"** to send a test event to the webhook. You should receive a POST request with the event type `webhook.test`.
7. On the **"Webhooks"** page, you can see the status of the last sent webhook under each webhook you set up.

## Handling deliveries

There are a few things to remember when receiving a webhook from PlanetScale:

- You must receive events with an HTTPS server.
- Your server must [quickly respond](#responding-to-webhooks-quickly) with a `2xx` successful status code to indicate that the webhook was received successfully.
- PlanetScale will not follow any redirects from the server.
- We recommend [validating all webhook signatures](#validating-a-webhook-signature) to ensure the webhook came from PlanetScale, not from a third party, and was not tampered with.

### Responding to webhooks quickly

To protect your service from being overloaded by webhook deliveries, we recommend responding to the webhook request immediately and handling the processing of the webhook asynchronously. PlanetScale will wait a maximum of 2 seconds for a response from your server before marking the webhook as failed.

### Limits

- Each database can have up to **5 webhooks**. If you need more webhooks per database, please [contact us](https://planetscale.com/contact).
- You can only send one webhook test **every 20 seconds**.
- Webhooks that repeatedly fail will be disabled.

### Validating a webhook signature

To ensure that your server only processes webhook deliveries sent by PlanetScale, we recommend validating the webhook signature before processing the delivery further.

All webhooks from PlanetScale will have an `X-PlanetScale-Signature` header. This header is a SHA-256 HMAC hex digest of the request body, using your webhook secret as the key. You can use this header to verify that the webhook payload was sent by PlanetScale.

To do this, you need to:

1. Retrieve your webhook secret from PlanetScale. Go to your database's settings page > **"Webhooks"** page. Click the **...** ellipsis next to the webhook you want to validate and click **"Show secret"**.
2. Copy and securely store your webhook secret on your server. Never hard code the secret into your application or check it into source control. Follow the best practices for your deployment provider and framework for storing secrets.
3. Validate incoming webhook payloads against the secret to verify that the payload was sent by PlanetScale. You should calculate a hash using the JSON payload and the webhook secret. Then, compare the calculated hash to the `X-PlanetScale-Signature` header. If the two hashes match, the webhook payload is valid.

### Example webhook signature validation

The following are examples of validating a webhook signature that uses a SHA-256 HMAC hex digest of the request body.

#### JavaScript

```javascript
const crypto = require('crypto')

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

const verify_signature = (req) => {
  const signature = crypto.createHmac('sha256', WEBHOOK_SECRET).update(JSON.stringify(req.body)).digest('hex')
  const trusted = Buffer.from(signature, 'ascii')
  const header = req.headers.get('x-planetscale-signature')

  if (header === undefined) {
    return false
  }

  const untrusted = Buffer.from(header)
  return crypto.timingSafeEqual(trusted, untrusted)
}
```

You can then call `verifySignature` in any JavaScript environment when you receive a webhook.

#### TypeScript

```typescript
import crypto from 'crypto'

const WEBHOOK_SECRET: string = process.env.WEBHOOK_SECRET

const verify_signature = (req: Request): boolean => {
  const signature = crypto.createHmac('sha256', WEBHOOK_SECRET).update(JSON.stringify(req.body)).digest('hex')
  const trusted = Buffer.from(signature, 'ascii')
  const header = req.headers.get('x-planetscale-signature')

  if (header === undefined) {
    return false
  }

  const untrusted = Buffer.from(header)
  return crypto.timingSafeEqual(trusted, untrusted)
}
```

You can then call `verify_signature` when you receive a webhook.

```typescript
const handleWebhook = (req: Request, res: Response) => {
  if (!verify_signature(req)) {
    res.status(401).send('Unauthorized')
    return
  }
  // The rest of your logic here
}
```

#### Python

This example shows how to validate the webhook in a Flask app.

```python
from flask import Flask, request
from hashlib import sha256
import hmac

app = Flask(__name__)

# Use the PLANETSCALE_WEBHOOK_SECRET environment variable to set the secret token
SECRET_TOKEN = os.environ.get('PLANETSCALE_WEBHOOK_SECRET', 'default_secret_token')

@app.route('/webhook', methods=['POST'])
def webhook():
    payload_body = request.data
    signature_header = request.headers.get('x-planetscale-signature')

    try:
        verify_signature(payload_body, SECRET_TOKEN, signature_header)
        # The signature is valid, you can process the payload here
        return "Signature is valid."
    except Exception as e:
        # Handle the verification failure here
        return str(e), 403

def verify_signature(payload_body, secret_token, signature_header):
    if not signature_header:
        raise Exception("x-planetscale-signature header is missing!")

    hash_object = hmac.new(secret_token.encode('utf-8'), msg=payload_body, digestmod=sha256)
    expected_signature = hash_object.hexdigest()

    if not hmac.compare_digest(expected_signature, signature_header):
        raise Exception("Request signatures didn't match!")

if __name__ == '__main__':
    app.run(debug=True)
```

#### Ruby on Rails

```ruby
SECRET = Rails.application.credentials.planetscale.fetch(:webhook_secret)

# Private method in your controller
def verify_signature
  body = request.body.read
  signature = request.headers["X-PlanetScale-Signature"]

  calculated_signature = OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new("sha256"), SECRET, body)

  unless ActiveSupport::SecurityUtils.secure_compare(signature, calculated_signature)
    render(json: { message: "Unauthorized" }, status: :unauthorized)
  end
end
```

You can then call `verify_signature` on each request to validate the webhook.

```ruby
before_action :verify_signature, only: [:create]
```
