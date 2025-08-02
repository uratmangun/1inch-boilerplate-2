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

# Quick Start

Let's go over an example of how to perform a token swap using the **1inch Classic Swap API**.

---

## Before You Start

- You must have a valid **1inch API Key**. You can get one from the [1inch Developer Portal](https://portal.1inch.dev/).
- Your wallet must have:
  - USDC (or the token you're swapping)
  - Native tokens (such as ETH on Base) to pay gas fees

Typescript Go

## What the Program Does

1. Loads configuration variables (private key, wallet address, RPC URL, and Developer Portal API key) from the environment or a local `.env` file
2. Connects to the Base chain using viem
3. Uses the 1inch `/approve/allowance` endpoint to check if your wallet has granted the proper USDC allowance to the 1inch router
4. If the allowance is **insufficient**, it uses the `/approve/transaction` endpoint to construct and send an approval transaction
5. Then, it uses the `/swap` endpoint to construct the swap transaction
6. It signs and broadcasts the transaction using viem

### Dependencies

- node v18.17.1
- npm v10.9.2

```bash
npm install dotenv viem

```

### Code

```typescript
import dotenv from "dotenv";
import { createPublicClient, createWalletClient, Hex, http } from "viem";
import { base } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

dotenv.config();

const requiredEnvVars = [\
  "WALLET_ADDRESS",\
  "PRIVATE_KEY",\
  "DEV_PORTAL_API_KEY",\
  "RPC_URL",\
];
for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

const config = {
  walletAddress: process.env.WALLET_ADDRESS!.toLowerCase(),
  privateKey: process.env.PRIVATE_KEY! as Hex,
  apiKey: process.env.DEV_PORTAL_API_KEY!,
  rpcUrl: process.env.RPC_URL!,
  tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
  amountToSwap: 100_000, // 0.1 USDC (6 decimals)
  dstToken: "0x4200000000000000000000000000000000000006", // WETH on Base
  slippage: 1,
};

type AllowanceResponse = { allowance: string };
type TransactionPayload = { to: Hex; data: Hex; value: bigint };
type TxResponse = { tx: TransactionPayload };
type ApproveTransactionResponse = {
  to: Hex;
  data: Hex;
  value: bigint;
  gas?: string;
};

const baseUrl = `https://api.1inch.dev/swap/v6.1/${base.id}`;

const publicClient = createPublicClient({
  chain: base,
  transport: http(config.rpcUrl),
});

const account = privateKeyToAccount(config.privateKey);
const walletClient = createWalletClient({
  account,
  chain: base,
  transport: http(config.rpcUrl),
});

function buildQueryURL(path: string, params: Record<string, string>): string {
  const url = new URL(baseUrl + path);
  url.search = new URLSearchParams(params).toString();
  return url.toString();
}

async function call1inchAPI<T>(
  endpointPath: string,
  queryParams: Record<string, string>,
): Promise<T> {
  const url = buildQueryURL(endpointPath, queryParams);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`1inch API returned status ${response.status}: ${body}`);
  }

  return (await response.json()) as T;
}

async function signAndSendTransaction(tx: TransactionPayload): Promise<string> {
  console.log("Estimating gas for transaction...");
  const gas = await publicClient.estimateGas({
    account: config.walletAddress as Hex,
    to: tx.to,
    data: tx.data,
    value: BigInt(tx.value),
  });

  const latestBlock = await publicClient.getBlock();
  const baseFeePerGas = latestBlock.baseFeePerGas;

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  });

  console.log("Nonce:", nonce.toString());

  try {
    if (baseFeePerGas !== null && baseFeePerGas !== undefined) {
      console.log("Using EIP-1559 transaction format");
      const fee = await publicClient.estimateFeesPerGas();

      return await walletClient.sendTransaction({
        account,
        to: tx.to,
        data: tx.data,
        value: BigInt(tx.value),
        gas,
        maxFeePerGas: fee.maxFeePerGas,
        maxPriorityFeePerGas: fee.maxPriorityFeePerGas,
        chain: base,
        nonce,
        kzg: undefined,
      });
    } else {
      console.log("Using legacy transaction format");
      const gasPrice = await publicClient.getGasPrice();

      return await walletClient.sendTransaction({
        account,
        to: tx.to,
        data: tx.data,
        value: BigInt(tx.value),
        gas,
        gasPrice,
        chain: base,
        nonce,
        kzg: undefined,
      });
    }
  } catch (err) {
    console.error("Transaction signing or broadcasting failed");
    console.error("Transaction data:", tx);
    console.error("Gas:", gas.toString());
    console.error("Nonce:", nonce.toString());
    throw err;
  }
}

async function checkAllowance(): Promise<bigint> {
  console.log("Checking token allowance...");

  const allowanceRes = await call1inchAPI<AllowanceResponse>(
    "/approve/allowance",
    {
      tokenAddress: config.tokenAddress,
      walletAddress: config.walletAddress,
    },
  );

  const allowance = BigInt(allowanceRes.allowance);
  console.log("Allowance:", allowance.toString());

  return allowance;
}

async function approveIfNeeded(requiredAmount: bigint): Promise<void> {
  const allowance = await checkAllowance();

  if (allowance >= requiredAmount) {
    console.log("Allowance is sufficient for the swap.");
    return;
  }

  console.log("Insufficient allowance. Creating approval transaction...");

  const approveTx = await call1inchAPI<ApproveTransactionResponse>(
    "/approve/transaction",
    {
      tokenAddress: config.tokenAddress,
      amount: requiredAmount.toString(),
    },
  );

  console.log("Approval transaction details:", approveTx);

  const txHash = await signAndSendTransaction({
    to: approveTx.to,
    data: approveTx.data,
    value: approveTx.value,
  });

  console.log("Approval transaction sent. Hash:", txHash);
  console.log("Waiting 10 seconds for confirmation...");
  await new Promise((res) => setTimeout(res, 10000));
}

async function performSwap(): Promise<void> {
  const swapParams = {
    src: config.tokenAddress,
    dst: config.dstToken,
    amount: config.amountToSwap.toString(),
    from: config.walletAddress,
    slippage: config.slippage.toString(),
    disableEstimate: "false",
    allowPartialFill: "false",
  };

  console.log("Fetching swap transaction...");
  const swapTx = await call1inchAPI<TxResponse>("/swap", swapParams);

  console.log("Swap transaction:", swapTx.tx);

  const txHash = await signAndSendTransaction(swapTx.tx);
  console.log("Swap transaction sent. Hash:", txHash);
}

async function main() {
  try {
    await approveIfNeeded(BigInt(config.amountToSwap));
    await performSwap();
  } catch (err) {
    console.error("Error:", (err as Error).message);
  }
}

main().catch((err) => {
  console.error("Unhandled error in main:", err);
  process.exit(1);
});

```

Previous

Introduction

Next

Find the best quote to swap with 1inch Router

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
