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

Introduction

Swagger

Migration

Fusion SDK

Classic Swap

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

Introduction

Swagger

Migration

Fusion SDK

Classic Swap

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

# Introduction

## 1inch intent-based swap (Fusion mode)

1inch intent swaps (Fusion mode) offer users a way to execute swaps without spending gas or risking being front-run. To the user, Fusion mode looks like a swap, but technically it is a limit order with a variable exchange rate filled by a third party called a resolver. An order's exchange rate decreases from the desired rate to the minimal return amount (Dutch auction) until it becomes profitable for resolvers to fill the order. Multiple resolvers compete for the order to ensure it is filled before the rate falls to the minimal return amount. Here are some examples of opportunities for resolvers to gain profit:

- The Dutch auction constantly decreases the order rate.
- Gas economy when filling matching orders.
- Gas economy due to batch filling.

For resolvers and integrators there is a [Fusion SDK](https://github.com/1inch/fusion-sdk) available to help with the integration.

## Dutch auction filling rate

Each order starts with an auction timestamp, calculated as the order's signature timestamp plus a waiting period to account for different network speeds. Before the auction begins, an order can be filled at the maximum rate. After the auction starts, the filling rate gradually decreases.

The filling rate depends on several factors, including swap volume, gas costs, and chosen preset (e.g., fast, fair, auction). To minimize price impact, the source token volume is divided into parts, creating multiple price points. This benefits users with better rates and allows resolvers to profit.

The partial fill functionality optimizes efficiency by allowing large swaps to be executed at better rates. Different resolvers can fill different parts of the order, making it profitable at various points.

The price curve is also dynamic, and adapts to gas market conditions to manage gas price volatility. This reduces the chance of order expiration and speeds up execution by 75%. If gas prices increase, the resolver might delay fulfillment, but if they decrease, the resolver benefits from lower costs. The adjusted price curve ensures users receive more tokens when base fees decline and corrects execution costs when they rise.

We recommend resolvers split orders into 6-10 parts and check if at least one part can be filled.

Below is a real-life example:

![auction curve](https://portal.1inch.dev/assets/docs-assets/img/fusion/auction-5.png)

## API reference

For detailed information about each endpoint, refer to the Intent swap API [Swagger section](https://portal.1inch.dev/documentation/apis/swap/intent-swap/swagger).

Previous

Websocket API

Next

Get gasless swap active orders

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
