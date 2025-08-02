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

Introduction

Quickstart guide

Swagger

GET

Returns history events for address

POST

Get history events by address

POST

Returns history event with search filter

POST

Returns swap events for the user

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

History API

Introduction

Quickstart guide

Swagger

GET

Returns history events for address

POST

Get history events by address

POST

Returns history event with search filter

POST

Returns swap events for the user

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

# Transaction history

GET

https://api.1inch.dev/history/v2.0/history/{address}/events

Returns history events for address

Network

![Ethereum](https://portal.1inch.dev/assets/icons/network-logos/ethereum.svg) Ethereum

\[object Object\]

Parameters

address

string

\*

(path)

Account address

0x266E77cE9034a023056ea2845CB6A20517F6FDB7

limit

number

(query)

Amount of events to return, default is 100, max is 2048

100

tokenAddress

string

(query)

Token address used at event

chainId

number

(query)

chainId

1

toTimestampMs

string

(query)

To time at milliseconds

1695283931212

fromTimestampMs

string

(query)

From time at milliseconds

1694754179096

swagger.response

Code:

200

Schema:

array

itemsHistoryResponseDto object

items\* array

itemsHistoryEventDto object

id\* string

address\* string

type\* number

rating\* string (Enum)

Reliable

Scam

timeMs\* number

details\*TransactionDetailsDto object

orderInBlock\* number

txHash\* string

chainId\* number (Enum)

1

45

137

10

56

42161

43114

100

250

1313161554

8217

324

8453

59144

501

146

130

blockNumber\* number

blockTimeSec\* number

status\* string

type\* string (Enum)

Unknown

Approve

Wrap

Unwrap

Transfer

SwapExactInput

SwapExactOutput

LimitOrderFill

LimitOrderCancel

LimitOrderCancelAll

Multicall

AddLiquidity

RemoveLiquidity

Borrow

Repay

Stake

Unstake

Vote

DelegateVotePower

UnDelegateVotePower

DiscardVote

DeployPool

Claim

AbiDecoded

TraceDecoded

Action

Bridge

BuyNft

BidNft

OfferSellNft

Burn

WrappedTx

RegisterENSDomain

Revoke

CreateSafe

AddOwner

Send

Receive

MultiStage

Swap

LimitOrderCreate

tokenActions\* array

itemsTokenActionDto object

address\* string

standard\* string

fromAddress\* string

toAddress\* string

tokenId object

amount object

direction\* string (Enum)

In

Out

Self

On

fromAddress\* string

toAddress\* string

nonce\* number

feeInSmallestNative\* string

metaTransactionDetailsMetaDto object

is1inchFusionSwap object

is1inchCrossChainSwap object

orderFillPercentage object

ensDomainName object

fromChainId object

toChainId object

safeAddress object

protocol object

cache_counter\* number

Code:

400

Bad Request.

Code:

401

Unauthorized.

Code:

500

Internal server error.

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
    'https://api.1inch.dev/history/v2.0/history/0x266E77cE9034a023056ea2845CB6A20517F6FDB7/events'

  const config = {
    headers: undefined,
    params: {
      limit: 100,
      chainId: '1',
      toTimestampMs: 1695283931212,
      fromTimestampMs: 1694754179096,
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

Get history events by address

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
