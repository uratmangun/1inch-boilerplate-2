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

Introduction

Quickstart guide

Swagger

GET

Gas Price from network

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

Gas Price API

Introduction

Quickstart guide

Swagger

GET

Gas Price from network

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

# 1inch Gas Price API

GET

https://api.1inch.dev/gas-price/v1.6/{chain}

Gas Price from network

Get Gas Price info from network

Network

![Ethereum](https://portal.1inch.dev/assets/icons/network-logos/ethereum.svg) Ethereum

\[object Object\]

Parameters

chain

number

\*

(path)

1

swagger.response

Code:

200

GasPrice

Schema:

Eip1559GasPriceResponse object

baseFee\* string

low\*Eip1559GasValueResponse object

maxPriorityFeePerGas\* string

maxFeePerGas\* string

medium\*Eip1559GasValueResponse object

maxPriorityFeePerGas\* string

maxFeePerGas\* string

high\*Eip1559GasValueResponse object

maxPriorityFeePerGas\* string

maxFeePerGas\* string

instant\*Eip1559GasValueResponse object

maxPriorityFeePerGas\* string

maxFeePerGas\* string

Authorization - API KEY

API KEY

### [Sign in](https://portal.1inch.dev/login) for automatic API key authentication.

Try it

NodeJS Python cURL Go

More

```javascript
const axios = require('axios')

async function httpCall() {
  const url = 'https://api.1inch.dev/gas-price/v1.6/1'

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

Introduction

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
