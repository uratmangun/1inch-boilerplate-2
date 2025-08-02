// Deno function for querying spot prices using 1inch Spot Price API
// Supports Base chain (chain ID: 8453)

interface SpotPriceResponse {
  success: boolean
  data?: Record<string, string>
  error?: string
  timestamp: string
}

export default {
  async fetch(request: Request): Promise<Response> {
    // Handle CORS for development
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      })
    }

    try {
      // Get 1inch API key from environment
      const apiKey = globalThis.Deno?.env.get('ONEINCH_API_KEY')
      if (!apiKey) {
        console.warn(
          '1inch API key not found, using public endpoint (rate limited)'
        )
      }

      // Prepare headers for 1inch API
      const headers = {
        'Content-Type': 'application/json',
        ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
      }

      console.log('Fetching spot prices from 1inch API')

      // Fetch spot price data from 1inch
      const url = 'https://api.1inch.dev/price/v1.1/8453?currency=USD'
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          ...headers,
          Accept: 'application/json',
        },
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

      const spotPriceData = await response.json()
      console.log('Successfully fetched spot price data from 1inch API')

      // Transform the response to match our interface
      const spotPriceResult: SpotPriceResponse = {
        success: true,
        data: spotPriceData,
        timestamp: new Date().toISOString(),
      }

      return new Response(JSON.stringify(spotPriceResult, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      })
    } catch (error) {
      console.error('Error fetching spot prices:', error)

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Internal server error while fetching spot prices',
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
