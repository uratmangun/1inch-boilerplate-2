[Docs](https://portal.1inch.dev/documentation/overview)

[Pricing & Features](https://portal.1inch.dev/pricing)

[Support](https://portal.1inch.dev/support) [Docs](https://portal.1inch.dev/documentation/overview) [Pricing & Features](https://portal.1inch.dev/pricing) [Sign In](https://portal.1inch.dev/login)

[Sign In](https://portal.1inch.dev/login)

Overview

APIs

Authentication

Swap APIs

Overview

Cross-Chain Swaps (Fusion+)

Intent Swaps (Fusion)

Classic Swap

Introduction

Quick Start

Swagger

GET

Find the best quote to swap with 1inch Router

GET

Generate calldata to swap on 1inch Router

GET

Address of the 1inch Router that is trusted to spend funds for the swap

GET

Generate approve calldata to allow 1inch Router to perform a swap

GET

Get the number of tokens that the 1inch Router is allowed to swap

GET

List of liquidity sources that are available for routing in the 1inch Aggregation Protocol

GET

List of tokens that are available for swap in the 1inch Aggregation protocol

Parameter Descriptions

Migration

Orderbook API

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

Overview

Cross-Chain Swaps (Fusion+)

Intent Swaps (Fusion)

Classic Swap

Introduction

Quick Start

Swagger

GET

Find the best quote to swap with 1inch Router

GET

Generate calldata to swap on 1inch Router

GET

Address of the 1inch Router that is trusted to spend funds for the swap

GET

Generate approve calldata to allow 1inch Router to perform a swap

GET

Get the number of tokens that the 1inch Router is allowed to swap

GET

List of liquidity sources that are available for routing in the 1inch Aggregation Protocol

GET

List of tokens that are available for swap in the 1inch Aggregation protocol

Parameter Descriptions

Migration

Orderbook API

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

# 1inch Swap API

GET

https://api.1inch.dev/swap/v6.1/{chain}/quote

Find the best quote to swap with 1inch Router

Network

![Ethereum](https://portal.1inch.dev/assets/icons/network-logos/ethereum.svg) Ethereum

\[object Object\]

Parameters

chain

number

\*

(path)

1

src

string

\*

(query)

0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

dst

string

\*

(query)

0x111111111117dc0aa78b770fa6a738034120c302

amount

string

\*

(query)

10000000000000000

protocols

string

(query)

All supported liquidity sources by default

fee

number

(query)

Partner fee. min: 0; max: 3 Should be the same for /quote and /swap

gasPrice

string

(query)

Network price per gas in wei. By default fast network gas price

complexityLevel

number

(query)

parts

number

(query)

mainRouteParts

number

(query)

gasLimit

number

(query)

includeTokensInfo

boolean

(query)

Return fromToken and toToken info in response

includeProtocols

boolean

(query)

Return used swap protocols in response

includeGas

boolean

(query)

Return approximated gas in response

connectorTokens

string

(query)

excludedProtocols

string

(query)

excluded supported liquidity sources

swagger.response

Code:

200

Schema:

QuoteResponse object

srcToken any

allOf\[0\]TokenInfo object

address\* string

symbol\* string

name\* string

decimals\* number

logoURI\* string

domainVersion string

eip2612 boolean

isFoT boolean

tags array

items string

dstToken any

allOf\[0\]TokenInfo object

address\* string

symbol\* string

name\* string

decimals\* number

logoURI\* string

domainVersion string

eip2612 boolean

isFoT boolean

tags array

items string

dstAmount\* string

protocols array

itemsTokenSwaps object

token\* string

hops\* array

itemsTokenHop object

part\* number

dst\* string

fromTokenId\* number

toTokenId\* number

protocols\* array

itemsSelectedLiquiditySource object

name\* string

part\* number

gas number

Code:

400

Schema:

QuoteRequestError object

error\* string

description\* string

statusCode\* number (Enum)

400

500

requestId\* string

meta\* array

itemsHttpExceptionMeta object

type\* string

value\* string

Authorization - API KEY

API KEY

### [Sign in](https://portal.1inch.dev/login) for automatic API key authentication.

Try it

NodeJS Python cURL Go

More

```javascript
const axios = require('axios')

async function httpCall() {
  const url = 'https://api.1inch.dev/swap/v6.1/1/quote'

  const config = {
    headers: undefined,
    params: {
      src: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      dst: '0x111111111117dc0aa78b770fa6a738034120c302',
      amount: '10000000000000000',
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

Quick Start

Next

Generate calldata to swap on 1inch Router

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
