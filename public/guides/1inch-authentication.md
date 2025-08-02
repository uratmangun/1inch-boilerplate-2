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

# Authentication

The 1inch Developer Portal API uses API keys to authenticate requests. You can view your API key in the Dashboard and Application menu.

Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.

Authentication to the API is performed via API Keys.
We provide multiple ways to authenticate depending on the protocol.

1. http protocol: Provide your API key as an `Authorization: Bearer {YOUR_API_KEY}` header.
2. websocket protocol: Provide your API key as an `Authorization: Bearer {YOUR_API_KEY}` header or as query parameter `apiKey={YOUR_API_KEY}`

---

```shell
# http call
curl -X 'GET' \
  'https://api.1inch.dev/swap/v5.2/1/tokens' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer YOUR_API_KEY'

```

```shell
# websocket
wscat -c 'wss://api.1inch.dev/web3/1/full?apiKey=YOUR_API_KEY'
# or
wscat -c 'wss://api.1inch.dev/web3/1/full' -H 'Authorization:Bearer YOUR_API_KEY'

```

Previous

Overview

Next

Overview

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
