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

Introduction

Quickstart guide

Swagger

GET

Get balances and allowances by spender for list of wallets addresses

GET

Get balances of tokens for walletAddress

POST

Get balances of custom tokens for walletAddress

POST

Get balances of custom tokens for list of wallets addresses

GET

Get balances and allowances of tokens by spender for walletAddress

POST

Get balances and allowances of custom tokens by spender for walletAddress

GET

Get allowances of tokens by spender for walletAddress

POST

Get allowances of custom tokens by spender for walletAddress

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

Balance API

Introduction

Quickstart guide

Swagger

GET

Get balances and allowances by spender for list of wallets addresses

GET

Get balances of tokens for walletAddress

POST

Get balances of custom tokens for walletAddress

POST

Get balances of custom tokens for list of wallets addresses

GET

Get balances and allowances of tokens by spender for walletAddress

POST

Get balances and allowances of custom tokens by spender for walletAddress

GET

Get allowances of tokens by spender for walletAddress

POST

Get allowances of custom tokens by spender for walletAddress

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

# 1inch Balance API

GET

https://api.1inch.dev/balance/v1.2/{chain}/aggregatedBalancesAndAllowances/{spender}

Get balances and allowances by spender for list of wallets addresses

Network

![Ethereum](https://portal.1inch.dev/assets/icons/network-logos/ethereum.svg) Ethereum

\[object Object\]

Parameters

chain

number

\*

(path)

1

spender

string

\*

(path)

wallets

array

\*

(query)

List of wallet addresses

string

filterEmpty

boolean

(query)

Filter out empty balances and allowances

swagger.response

Code:

200

Aggregated balances and allowances by tokens

Schema:

array

itemsAggregatedBalancesAndAllowancesResponse object

decimals\* number

symbol\* string

tags\* array

items string

address\* string

name\* string

logoURI\* string

isCustom\* boolean

wallets\* object

type\* string

tracked boolean

Authorization - API KEY

API KEY

### [Sign in](https://portal.1inch.dev/login) for automatic API key authentication.

Try it

NodeJS Python cURL Go

More

```javascript
const axios = require('axios')

async function httpCall() {
  const url =
    'https://api.1inch.dev/balance/v1.2/1/aggregatedBalancesAndAllowances/{spender}'

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

Get balances of tokens for walletAddress

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
