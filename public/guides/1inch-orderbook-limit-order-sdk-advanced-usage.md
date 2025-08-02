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

Limit Order SDK

Introduction

Limit orders

Advanced usage for custom protocol integration

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

Limit Order SDK

Introduction

Limit orders

Advanced usage for custom protocol integration

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

![We couldn't find any articles for: ](https://portal.1inch.dev/documentation/apis/orderbook/limit-order-sdk/advanced-usage) ](https://portal.1inch.dev/assets/icons/empty-state.svg)

Search again using another term.

# Advanced usage for custom protocol integration

The [limit-order-sdk](https://github.com/1inch/limit-order-sdk) can be used not only to integrate with the 1inch Orderbook, but also as a toolkit for building custom trading infrastructure based on the 1inch Limit Order Protocol.

This approach is intended for teams who want full control over how orders are constructed, signed, and filled—independently of the public 1inch backend.

With this scenario, you can benefit from using the following advanced features:

- Manually construct limit and RFQ orders
- Asset evaluation helpers
- Custom execution predicates

## Difference between Orderbook API and custom protocol

| Feature             | Orderbook API               | Custom Protocol Integration |
| ------------------- | --------------------------- | --------------------------- |
| Limit orders        | ✅ Supported                | ✅ Supported                |
| `permit` field      | ✅ Supported                | ✅ Supported                |
| RFQ orders          | ❌ Not supported            | ✅ Fully supported          |
| Custom predicates   | ❌ Ignored                  | ✅ Executed on-chain        |
| `interaction` field | ❌ Not accepted             | ✅ Fully usable             |
| Fee customization   | ❌ Fixed (protocol default) | ✅ Fully configurable       |

## About RFQ orders

A Request for Quotation (RFQ) is a business process where a trader requests a price quote from a supplier for the purchase of specific tokens. RFQ orders are gas-optimized and purpose-built for the needs of professional market makers. They offer lightweight execution with specific constraints:

- Supports expiration time
- Can be canceled by order ID
- Fillable only once
- Allows partial fill (only once)

These characteristics make RFQ orders ideal for real-time, short-lived liquidity provisioning.

## Start your custom integration

Explore internals and primitives in the Limit Order SDK repository:

- [Limit order](https://github.com/1inch/limit-order-sdk/blob/master/src/limit-order/README)
- [RFQ order](https://github.com/1inch/limit-order-sdk/tree/master/src/rfq-order)

Previous

Limit orders

Next

Migration from v3.0 to v4.0

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
