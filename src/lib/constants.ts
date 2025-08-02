// API Configuration Constants
// This file manages API URLs and other configuration constants

/**
 * Get the Deno API base URL from environment variables
 * Falls back to localhost for development if VITE_DENO_API_URL is not set
 */
export const getDenoApiUrl = (): string => {
  // Check for environment variable first (production/staging)
  const envApiUrl = import.meta.env.VITE_DENO_API_URL

  if (envApiUrl) {
    // Remove trailing slash if present
    return envApiUrl.replace(/\/$/, '')
  }

  // Fallback to localhost for development
  return 'http://localhost:8000'
}

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  // Deno function endpoints
  BALANCE: '/api/balance',
  HELLO: '/api/hello',
} as const

/**
 * Get full API URL for a specific endpoint
 */
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = getDenoApiUrl()
  return `${baseUrl}${endpoint}`
}

/**
 * Chain configurations
 */
export const SUPPORTED_CHAINS = {
  BASE: {
    id: 8453,
    name: 'Base',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.base.org',
  },
  ETHEREUM: {
    id: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    rpcUrl: 'https://eth.llamarpc.com',
  },
} as const

/**
 * Default chain for balance queries
 */
export const DEFAULT_CHAIN = SUPPORTED_CHAINS.BASE

/**
 * API Configuration
 */
export const API_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const
