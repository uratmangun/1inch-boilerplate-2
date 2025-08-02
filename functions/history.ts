// Deno function for querying transaction history using 1inch History API
// Supports Base chain (chain ID: 8453) by default

interface HistoryEvent {
  id: string
  address: string
  type: number
  timeMs: number
  txHash: string
  chainId: number
  blockNumber: number
  status: string
  tokenActions: TokenAction[]
  details?: Record<string, unknown>
}

interface TokenAction {
  address: string
  standard: string
  fromAddress: string
  toAddress: string
  amount?: string
  tokenId?: string
  direction: string
}

interface HistoryResponse {
  success: boolean
  data?: HistoryEvent[]
  error?: string
  timestamp: string
}

export default {
  async fetch(request: Request): Promise<Response> {
    // Handle CORS for development
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      })
    }

    // Only allow GET requests
    if (request.method !== 'GET') {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Method not allowed. Use GET request.',
          timestamp: new Date().toISOString(),
        }),
        {
          status: 405,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      )
    }

    const url = new URL(request.url)
    const walletAddress = url.searchParams.get('address')
    const limit = url.searchParams.get('limit') || '100'
    const chainId = url.searchParams.get('chainId') || '8453' // Base chain as default
    const fromTimestampMs = url.searchParams.get('fromTimestampMs')
    const toTimestampMs = url.searchParams.get('toTimestampMs')
    const tokenAddress = url.searchParams.get('tokenAddress')

    // Validate wallet address
    if (!walletAddress) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing wallet address. Use ?address=0x... parameter.',
          timestamp: new Date().toISOString(),
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      )
    }

    // Validate Ethereum address format
    const addressRegex = /^0x[a-fA-F0-9]{40}$/
    if (!addressRegex.test(walletAddress)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid Ethereum address format.',
          timestamp: new Date().toISOString(),
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      )
    }

    try {
      // Get API key from environment variables
      const apiKey = globalThis.Deno.env.get('ONEINCH_API_KEY')
      if (!apiKey) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Missing ONEINCH_API_KEY environment variable.',
            timestamp: new Date().toISOString(),
          }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        )
      }

      // Build query parameters
      const queryParams = new URLSearchParams()
      queryParams.append('limit', limit)
      queryParams.append('chainId', chainId)

      if (fromTimestampMs) {
        queryParams.append('fromTimestampMs', fromTimestampMs)
      }

      if (toTimestampMs) {
        queryParams.append('toTimestampMs', toTimestampMs)
      }

      if (tokenAddress) {
        queryParams.append('tokenAddress', tokenAddress)
      }

      // Make request to 1inch History API
      const response = await fetch(
        `https://api.1inch.dev/history/v2.0/history/${walletAddress}/events?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        return new Response(
          JSON.stringify({
            success: false,
            error: `1inch API error: ${errorText}`,
            timestamp: new Date().toISOString(),
          }),
          {
            status: response.status,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        )
      }

      const data = await response.json()

      const result: HistoryResponse = {
        success: true,
        data: data,
        timestamp: new Date().toISOString(),
      }

      return new Response(JSON.stringify(result), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      })
    } catch (err) {
      return new Response(
        JSON.stringify({
          success: false,
          error: err instanceof Error ? err.message : 'Unknown error occurred',
          timestamp: new Date().toISOString(),
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      )
    }
  },
}
