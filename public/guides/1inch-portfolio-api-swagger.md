[Docs](https://portal.1inch.dev/documentation/overview)

[Pricing & Features](https://portal.1inch.dev/pricing)

[Support](https://portal.1inch.dev/support) [Docs](https://portal.1inch.dev/documentation/overview) [Pricing & Features](https://portal.1inch.dev/pricing) [Sign In](https://portal.1inch.dev/login)

[Sign In](https://portal.1inch.dev/login)

Overview

APIs

Authentication

Swap APIs

Orderbook API

History API

Traces API

Portfolio API

Introduction

Quickstart guide

Swagger v5.0

GET

Check if portfolio service is available

GET

Check addresses for compliance

GET

Get supported chains

GET

Get supported protocols

GET

Get current portfolio value breakdown

GET

General value chart

GET

Overview report

GET

Get protocols snapshot

GET

Get protocols metrics

GET

Get tokens snapshot

GET

Get tokens metrics

Swagger v4

Migration

Balance API

Gas Price API

Spot Price API

Token API

NFT API

Transaction Gateway API

Web3 RPC API

Charts API

Domains API

Token Details API

Contracts

FAQ

Becoming a Resolver

Articles

Articles

Overview

APIs

Authentication

Swap APIs

Orderbook API

History API

Traces API

Portfolio API

Introduction

Quickstart guide

Swagger v5.0

GET

Check if portfolio service is available

GET

Check addresses for compliance

GET

Get supported chains

GET

Get supported protocols

GET

Get current portfolio value breakdown

GET

General value chart

GET

Overview report

GET

Get protocols snapshot

GET

Get protocols metrics

GET

Get tokens snapshot

GET

Get tokens metrics

Swagger v4

Migration

Balance API

Gas Price API

Spot Price API

Token API

NFT API

Transaction Gateway API

Web3 RPC API

Charts API

Domains API

Token Details API

Contracts

FAQ

Becoming a Resolver

## We couldn't find any articles for:

![We couldn't find any articles for: ](https://portal.1inch.dev/assets/icons/empty-state.svg)

Search again using another term.

# Swagger v5.0

# V5.0 API Docs

GET

https://api.1inch.dev/portfolio/portfolio/v5.0/general/status

Check if portfolio service is available

Check if portfolio service is available

swagger.response

Code:

200

Successful Response

Schema:

ResponseEnvelope_ApiStatusResponse\_ object

result\*ApiStatusResponse object

is_available\* boolean

meta any

anyOf\[0\]ResponseMeta object

cached_at any

anyOf\[0\] integer

anyOf\[1\] null

system any

anyOf\[0\]ProcessingInfo object

click_time number

node_time number

microservices_time number

redis_time number

total_time number

anyOf\[1\] null

anyOf\[1\] null

Authorization - API KEY

API KEY

### [Sign in](https://portal.1inch.dev/login) for automatic API key authentication.

Try it

NodeJS Python cURL Go

More

```javascript
const axios = require('axios')

async function httpCall() {
  const url = 'https://api.1inch.dev/portfolio/portfolio/v5.0/general/status'

  const config = {
    headers: undefined,
    params: {},
    paramsSerializer: {
      indexes: null,
    },
  }

  try {
    const response = await axios.get(url, config)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}
```

Response

Click the try-it button to test your API call and see the real-time response right here.

Previous

Quickstart guide

Next

Check addresses for compliance

© 2025 1inch Limited

[Privacy Policy](https://portal.1inch.dev/assets/legal-docs/privacy_policy_20241211.pdf)[Terms of Service](https://portal.1inch.dev/assets/legal-docs/terms_of_service_public_api_20250508.pdf)[Commercial API Terms of Use](https://portal.1inch.dev/assets/legal-docs/terms_of-service_commercial_api_20250603.pdf)

![](https://portal.1inch.dev/assets/cookie.png)

We use cookies to ensure that we give you the best experience on our website.For more info read [Privacy Policy](https://portal.1inch.dev/assets/legal-docs/privacy_policy_20241211.pdf)

I agree

Decline

![unichain](https://portal.1inch.dev/assets/banner/unichain.gif)

1inch + Unichain

Integrate seamless cross-chain swaps

Explore the APIs
