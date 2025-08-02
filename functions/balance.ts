// Deno function for querying token balances using 1inch Balance API
// Supports Base chain (chain ID: 8453)

interface BalanceResponse {
  success: boolean
  data?: {
    walletAddress: string
    chainId: number
    chainName: string
    totalTokens: number
    totalValue: number
    balances: TokenBalance[]
    raw: Record<string, unknown>
  }
  error?: string
  timestamp: string
}

interface TokenBalance {
  address: string
  symbol: string
  name: string
  decimals: number
  balance: string
  balanceRaw: string
  logoURI?: string
  price?: number
  value?: number
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
      const apiKey = Deno.env.get('ONEINCH_API_KEY')
      if (!apiKey) {
        console.warn(
          '1inch API key not found, using public endpoint (rate limited)'
        )
      }

      // Base chain ID is 8453
      const chainId = 8453
      const apiUrl = `https://api.1inch.dev/balance/v1.2/${chainId}/balances/${walletAddress}`

      console.log(
        `Fetching balance for ${walletAddress} on Base chain (${chainId})`
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

      // Make request to 1inch Balance API
      const response = await fetch(apiUrl, {
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

      const balanceData = await response.json()
      console.log('Successfully fetched balance data from 1inch API')

      // Transform the response to a more user-friendly format
      const transformedBalances: TokenBalance[] = []

      if (balanceData && typeof balanceData === 'object') {
        // Handle different response formats from 1inch API
        const balances = balanceData.balances || balanceData

        for (const [tokenAddress, tokenData] of Object.entries(balances)) {
          if (typeof tokenData === 'object' && tokenData !== null) {
            const token = tokenData as Record<string, unknown>

            // Skip tokens with zero balance if requested
            const balance =
              (token.balance as string) || (token.amount as string) || '0'
            if (balance === '0' || balance === 0) {
              continue
            }

            const decimals = (token.decimals as number) || 18
            const price = token.price as number | undefined
            const symbol = (token.symbol as string) || 'UNKNOWN'

            transformedBalances.push({
              address: tokenAddress,
              symbol,
              name: (token.name as string) || symbol || 'Unknown Token',
              decimals,
              balance: formatBalance(balance, decimals),
              balanceRaw: balance.toString(),
              logoURI: (token.logoURI as string) || (token.logo as string),
              price,
              value:
                (token.value as number) ||
                (price
                  ? parseFloat(formatBalance(balance, decimals)) * price
                  : undefined),
            })
          }
        }
      }

      const result: BalanceResponse = {
        success: true,
        data: {
          walletAddress,
          chainId,
          chainName: 'Base',
          totalTokens: transformedBalances.length,
          totalValue: transformedBalances.reduce(
            (sum, token) => sum + (token.value || 0),
            0
          ),
          balances: transformedBalances,
          raw: balanceData, // Include raw response for debugging
        },
        timestamp: new Date().toISOString(),
      }

      return new Response(JSON.stringify(result, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      })
    } catch (error) {
      console.error('Error fetching balance:', error)

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Internal server error while fetching balance',
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

// Helper function to format balance from raw value
function formatBalance(rawBalance: string | number, decimals: number): string {
  try {
    const balance = BigInt(rawBalance.toString())
    const divisor = BigInt(10 ** decimals)
    const wholePart = balance / divisor
    const fractionalPart = balance % divisor

    if (fractionalPart === 0n) {
      return wholePart.toString()
    }

    const fractionalStr = fractionalPart.toString().padStart(decimals, '0')
    const trimmedFractional = fractionalStr.replace(/0+$/, '')

    if (trimmedFractional === '') {
      return wholePart.toString()
    }

    return `${wholePart}.${trimmedFractional}`
  } catch (error) {
    console.error('Error formatting balance:', error)
    return '0'
  }
}
