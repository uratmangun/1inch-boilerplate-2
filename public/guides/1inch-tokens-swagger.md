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

Balance API

Gas Price API

Spot Price API

Token API

Introduction

Quickstart guide

Swagger

GET

1inch whitelisted multi-chain tokens

GET

1inch whitelisted multi-chain tokens in list format

GET

Get all supported chain ids

GET

Search multi-chain tokens by name or symbol

GET

1inch whitelisted tokens

GET

1inch whitelisted tokens

GET

1inch whitelisted tokens

GET

1inch whitelisted tokens in list format

GET

1inch whitelisted tokens in list format

GET

1inch whitelisted tokens in list format

GET

Search tokens by name or symbol

GET

Search tokens by name or symbol

GET

Search tokens by name or symbol

GET

Get many tokens

GET

Get many tokens

GET

Get many tokens

GET

Get single token

GET

Get single token

GET

Get single token

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

Balance API

Gas Price API

Spot Price API

Token API

Introduction

Quickstart guide

Swagger

GET

1inch whitelisted multi-chain tokens

GET

1inch whitelisted multi-chain tokens in list format

GET

Get all supported chain ids

GET

Search multi-chain tokens by name or symbol

GET

1inch whitelisted tokens

GET

1inch whitelisted tokens

GET

1inch whitelisted tokens

GET

1inch whitelisted tokens in list format

GET

1inch whitelisted tokens in list format

GET

1inch whitelisted tokens in list format

GET

Search tokens by name or symbol

GET

Search tokens by name or symbol

GET

Search tokens by name or symbol

GET

Get many tokens

GET

Get many tokens

GET

Get many tokens

GET

Get single token

GET

Get single token

GET

Get single token

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

# Swagger

# 1inch Tokens API

GET

https://api.1inch.dev/token/v1.3/multi-chain

1inch whitelisted multi-chain tokens

Get 1inch whitelisted multi-chain tokens info

Parameters

provider

string

(query)

Provider code. Default value is 1inch

1inch

country

string

(query)

Country code

US

swagger.response

Code:

200

Token info map

Schema:

object

Authorization - API KEY

API KEY

### [Sign in](https://portal.1inch.dev/login) for automatic API key authentication.

Try it

NodeJS Python cURL Go

More

```javascript
const axios = require('axios')

async function httpCall() {
  const url = 'https://api.1inch.dev/token/v1.3/multi-chain'

  const config = {
    headers: undefined,
    params: {
      provider: '1inch',
      country: 'US',
    },
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

1inch whitelisted multi-chain tokens in list format

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
