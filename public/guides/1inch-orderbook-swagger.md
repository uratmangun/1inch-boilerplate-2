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

GET

https://api.1inch.dev/orderbook/v4.0/{chain}/all

Get all limit orders

Network

![Ethereum](https://portal.1inch.dev/assets/icons/network-logos/ethereum.svg) Ethereum

\[object Object\]

Parameters

chain

number

\*

(path)

1

page

number

(query)

Pagination step, default: 1 (page = offset / limit)

1

limit

integer

(query)

Number of limit orders to receive (default: 100, max: 500)

100

statuses

string

(query)

A comma-separated list of statuses by which limit orders will be filtered. Valid statuses include: 1 - Valid orders, 2 - Temporarily invalid orders, 3 - Invalid orders.

1,2,3

sortBy

string

(query)

takerAsset

string

(query)

Address of the taker asset

0x1234567890ABCDEF1234567890ABCDEF12345678

makerAsset

string

(query)

Address of the maker asset

0x1234567890ABCDEF1234567890ABCDEF12345678

swagger.response

Code:

200

Array of queried limit orders

Schema:

array

itemsGetLimitOrdersV4Response object

signature\* string

orderHash\* string

createDateTime\* string

remainingMakerAmount\* string

makerBalance\* string

makerAllowance\* string

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

makerRate\* string

takerRate\* string

isMakerContract\* boolean

orderInvalidReason\* string

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

Authorization - API KEY

API KEY

### [Sign in](https://portal.1inch.dev/login) for automatic API key authentication.

Try it

NodeJS Python cURL Go

More

```javascript
const axios = require('axios')

async function httpCall() {
  const url = 'https://api.1inch.dev/orderbook/v4.0/1/all'

  const config = {
    headers: undefined,
    params: {
      page: 1,
      limit: 100,
      statuses: '1,2,3',
      takerAsset: '0x1234567890ABCDEF1234567890ABCDEF12345678',
      makerAsset: '0x1234567890ABCDEF1234567890ABCDEF12345678',
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

Get order by the specified order hash

Next

Get orders count by specified filters

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
