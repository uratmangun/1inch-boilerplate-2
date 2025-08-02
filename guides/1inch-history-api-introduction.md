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

History API allows you to access accurate transaction history data across several major networks. With it, you can get such information as:

- Transaction type, hash, status, fee, timestamps
- Participants addresses
- Token transfers, and more

## Use cases

The History API can be applied across various industries and scenarios that require access to accurate on-chain transaction data. Below are some common use cases:

### Compliance and auditing

The History API enables companies to access transaction details, including participants, amounts, and timestamps, helping them meet auditing requirements and adhere to Anti-Money Laundering (AML) regulations.

### Portfolio management

Investors and portfolio managers can use the History API to analyze transaction histories across multiple blockchain networks. It helps track token movements, swaps, staking activities, and liquidity provisions, allowing your users to generate reports and optimize investment strategies.

### DeFi protocol analytics

Decentralized Finance (DeFi) protocols rely on transaction data to monitor user behavior, liquidity, and protocol usage. The History API provides detailed information on liquidity additions, removals, borrowing, lending, and staking activities, making it essential for DeFi analytics platforms.

### NFT marketplaces

NFT marketplaces can integrate the History API to display detailed transaction histories for NFTs, including purchases, bids, sales, and transfers. This enables buyers and sellers to review historical data before making decisions.

### Security and risk management

Security platforms can use the History API to track transaction histories and identify suspicious activities, such as unauthorized approvals or large token transfers. The API's detailed breakdown of transaction types helps detect patterns indicative of potential security threats, protecting users from fraud and malicious actions.

### Enterprise resource management

Enterprises engaging in blockchain transactions can integrate the History API to manage internal operations and resources more effectively. It helps track employee or system-triggered transactions, manage smart contract interactions, and ensure transparency in decentralized workflows.

### Tax reporting

Individuals and businesses dealing with cryptocurrencies must track all transactions for accurate tax reporting. The History API allows users to retrieve transaction histories to calculate gains, losses, and taxable events such as token swaps and sales.

##### info

If you are an enterprise with significant trading volumes, [**complete this application**](https://portal.1inch.dev/pricing) so we can assign you a custom API endpoint. The enterprise endpoint will offer significantly better performance across market rates and response times.

## Transaction types

We define the following transaction types:

| Transaction type      | Description                                                                                                          |
| --------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `Unknown`             | A transaction type that hasn't been identified or categorized.                                                       |
| `Approve`             | Granting permission for a smart contract to spend your tokens.                                                       |
| `Wrap`                | Converting a cryptocurrency into its wrapped version.                                                                |
| `Unwrap`              | Converting a wrapped token back to its original cryptocurrency.                                                      |
| `Swap`                | Exchanging one type of token for another.                                                                            |
| `Transfer`            | Sending tokens from one address to another.                                                                          |
| `LimitOrderFill`      | Executing a limit order by buying or selling tokens at the specified price or better.                                |
| `LimitOrderCancel`    | Canceling an existing limit order that is expired or hasn't been filled fully.                                       |
| `LimitOrderCancelAll` | Canceling an active limit order.                                                                                     |
| `AddLiquidity`        | Providing tokens to a liquidity pool to facilitate trading and earn rewards.                                         |
| `RemoveLiquidity`     | Withdrawing tokens from a liquidity pool.                                                                            |
| `Borrow`              | Taking out a loan in the form of tokens from a lending protocol.                                                     |
| `Repay`               | Returning borrowed tokens to a lending protocol.                                                                     |
| `Stake`               | Locking tokens in a protocol to earn rewards or participate in governance.                                           |
| `Unstake`             | Withdrawing staked tokens from a protocol.                                                                           |
| `Vote`                | Casting a vote on a proposal in a decentralized governance system.                                                   |
| `DelegateVotePower`   | Assigning your voting power to another address to vote on your behalf.                                               |
| `UnDelegateVotePower` | Revoking the assignment of your voting power from a delegate.                                                        |
| `DiscardVote`         | Invalidating or withdrawing a previously cast vote.                                                                  |
| `Claim`               | Retrieving rewards or tokens that are due to you.                                                                    |
| `Action`              | Performing a specific function or task within a smart contract.                                                      |
| `Bridge`              | Transferring tokens across different blockchains.                                                                    |
| `BuyNft`              | Purchasing an NFT from the marketplace.                                                                              |
| `BidNft`              | Placing a bid on an NFT in an auction.                                                                               |
| `OfferSellNft`        | Making an offer to sell an NFT you own.                                                                              |
| `Burn`                | Permanently removing tokens from circulation.                                                                        |
| `WrappedTx`           | A [Gnosis Safe](https://app.safe.global/welcome) transaction which can include one or more multisigned transactions. |
| `RegisterENSDomain`   | Registering a human-readable name on the Ethereum Name Service (ENS) to associate with your address.                 |
| `Revoke`              | Withdrawing previously granted permissions or approvals.                                                             |
| `CreateSafe`          | Creating a multisig Gnosis Safe Wallet.                                                                              |
| `AddOwner`            | Adding a new owner to a multisig Gnosis Safe Wallet.                                                                 |
| `MultiStage`          | A transaction that involves multiple steps or stages, often used in complex operations.                              |

## Supported networks

- [Ethereum Mainnet](https://ethereum.org/)
- [Arbitrum](https://arbitrum.io/)
- [Avalanche](https://www.avax.network/)
- [BNB Chain](https://www.binance.com/en/support/announcement/854415cf3d214371a7b60cf01ead0918)
- [Gnosis](https://www.xdaichain.com/)
- [Sonic](https://www.soniclabs.com/)
- [Optimism](https://www.optimism.io/)
- [Polygon](https://polygon.technology/)
- [zkSync Era](https://docs.zksync.io/build)
- [Base](https://docs.base.org/)
- [Unichain](https://www.unichain.org/)

## Quickstart

To start using History API swiftly, refer to the [Quickstart guide](https://portal.1inch.dev/documentation/apis/history/quick-start).

## API reference

For detailed information about each endpoint, refer to the History API [Swagger section](https://portal.1inch.dev/documentation/apis/history/swagger).

Previous

Migration from v3.0 to v4.0

Next

Quickstart guide

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
