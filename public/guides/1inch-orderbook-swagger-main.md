[Docs](https://portal.1inch.dev/documentation/overview)

[Pricing & Features](https://portal.1inch.dev/pricing)

[Support](https://portal.1inch.dev/support) [Docs](https://portal.1inch.dev/documentation/overview) [Pricing & Features](https://portal.1inch.dev/pricing) [Sign In](https://portal.1inch.dev/login)

[Sign In](https://portal.1inch.dev/login)

Overview

APIs

Authentication

Swap APIs

Orderbook API

Introduction

Quickstart guide

Swagger

POST

Include a limit order to the 1inch limit orders database

GET

Get limit orders belonging to the specified address

GET

Get order by the specified order hash

GET

Get all limit orders

GET

Get orders count by specified filters

GET

Get fill/cancel events related to the specified order

GET

Get all orders fill/cancel events

GET

Get all active orders which have permit for the specified wallet address and token

GET

Get unique active token pairs

GET

Get calculated making amount on trading pair by provided amount

Limit Order SDK

Migration

History API

Traces API

Portfolio API

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

Introduction

Quickstart guide

Swagger

POST

Include a limit order to the 1inch limit orders database

GET

Get limit orders belonging to the specified address

GET

Get order by the specified order hash

GET

Get all limit orders

GET

Get orders count by specified filters

GET

Get fill/cancel events related to the specified order

GET

Get all orders fill/cancel events

GET

Get all active orders which have permit for the specified wallet address and token

GET

Get unique active token pairs

GET

Get calculated making amount on trading pair by provided amount

Limit Order SDK

Migration

History API

Traces API

Portfolio API

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

# Swagger

# 1inch Orderbook API

POST

https://api.1inch.dev/orderbook/v4.0/{chain}

Include a limit order to the 1inch limit orders database

You can send your limit orders to the 1inch database and then your order will participate in the 1inch aggregation protocol.

Network

![Ethereum](https://portal.1inch.dev/assets/icons/network-logos/ethereum.svg) Ethereum

\[object Object\]

Parameters

chain

number

\*

(path)

1

Request Body

Content typeapplication/json

Click in to adjust the request body:

```css outline-none
  {
  "orderHash": "string",
  "signature": "string",
  "data": {
    "makerAsset": "string",
    "takerAsset": "string",
    "maker": "string",
    "receiver": "0x0000000000000000000000000000000000000000",
    "makingAmount": "string",
    "takingAmount": "string",
    "salt": "string",
    "extension": "0x",
    "makerTraits": "0"
  }
}

```

Request Body Schema:

LimitOrderV4Request object

orderHash\* string

signature\* string

data\* any

allOf\[0\]LimitOrderV4Data object

makerAsset\* string

takerAsset\* string

maker\* string

receiver string

makingAmount\* string

takingAmount\* string

salt\* string

extension string

makerTraits string

swagger.response

Code:

201

The limit order has been successfully saved

Schema:

LimitOrderV4Response object

success\* boolean

Code:

400

Input data is invalid

Schema:

object

statusCode integer (Enum)

400

message string

error string (Enum)

Bad Request

Code:

403

Max valid orders per user: 100. Cancel previous orders to create new ones

Authorization - API KEY

API KEY

### [Sign in](https://portal.1inch.dev/login) for automatic API key authentication.

Try it

NodeJS Python cURL Go

More

```javascript
const axios = require('axios')

async function httpCall() {
  const url = 'https://api.1inch.dev/orderbook/v4.0/1'

  const config = {
    headers: undefined,
    params: {},
    paramsSerializer: {
      indexes: null,
    },
  }
  const body = {
    orderHash: 'string',
    signature: 'string',
    data: {
      makerAsset: 'string',
      takerAsset: 'string',
      maker: 'string',
      receiver: '0x0000000000000000000000000000000000000000',
      makingAmount: 'string',
      takingAmount: 'string',
      salt: 'string',
      extension: '0x',
      makerTraits: '0',
    },
  }

  try {
    const response = await axios.post(url, body, config)
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

Get limit orders belonging to the specified address

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
