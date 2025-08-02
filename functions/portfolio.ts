// Deno function for querying portfolio data using 1inch Portfolio API
// Supports Base chain (chain ID: 8453)

interface PortfolioResponse {
  success: boolean
  data?: {
    walletAddress: string
    chainId: number
    chainName: string
    total: number
    byAddress: AddressValue[]
    byCategory: CategoryValue[]
    byProtocolGroup: ProtocolGroupValue[]
    byChain: ChainValue[]
    raw: Record<string, unknown>
  }
  error?: string
  timestamp: string
}

interface AddressValue {
  value_usd: number
  address: string
}

interface CategoryValue {
  value_usd: number
  category_id: string
  category_name: string
}

interface ProtocolGroupValue {
  value_usd: number
  protocol_group_id: string
  protocol_group_name: string
}

interface ChainValue {
  value_usd: number
  chain_id: number
  chain_name: string
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
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/
    if (!ethAddressRegex.test(walletAddress)) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            'Invalid wallet address format. Must be a valid Ethereum address.',
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
      // Get 1inch API key from environment
      const apiKey = globalThis.Deno?.env.get('ONEINCH_API_KEY')
      if (!apiKey) {
        console.warn(
          '1inch API key not found, using public endpoint (rate limited)'
        )
      }

      // Base chain ID is 8453
      const chainId = 8453

      // Portfolio API endpoint - current value
      const portfolioUrl = `https://api.1inch.dev/portfolio/portfolio/v5.0/general/current_value`

      console.log(
        `Fetching portfolio for ${walletAddress} on Base chain (${chainId})`
      )

      // Prepare headers
      const headers: Record<string, string> = {
        Accept: 'application/json',
        'User-Agent': '1inch-boilerplate-deno/1.0',
      }

      // Add API key if available
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`
      }

      // Prepare URL with query parameters
      const url = new URL(portfolioUrl)
      url.searchParams.append('addresses', walletAddress)
      url.searchParams.append('chain_id', chainId.toString())

      // Fetch portfolio data
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`1inch API error: ${response.status} - ${errorText}`)

        return new Response(
          JSON.stringify({
            success: false,
            error: `1inch API error: ${response.status} - ${response.statusText}`,
            details: errorText,
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

      const portfolioData = await response.json()
      console.log('Successfully fetched portfolio data from 1inch API')

      // Transform the response to match our interface
      const result = portfolioData.result

      if (!result) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'No portfolio data found in API response',
            timestamp: new Date().toISOString(),
          }),
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        )
      }

      const portfolioResult: PortfolioResponse = {
        success: true,
        data: {
          walletAddress,
          chainId,
          chainName: 'Base',
          total: result.total || 0,
          byAddress: result.by_address || [],
          byCategory: result.by_category || [],
          byProtocolGroup: result.by_protocol_group || [],
          byChain: result.by_chain || [],
          raw: portfolioData, // Include raw response for debugging
        },
        timestamp: new Date().toISOString(),
      }

      return new Response(JSON.stringify(portfolioResult, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      })
    } catch (error) {
      console.error('Error fetching portfolio:', error)

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Internal server error while fetching portfolio',
          details: error instanceof Error ? error.message : 'Unknown error',
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
