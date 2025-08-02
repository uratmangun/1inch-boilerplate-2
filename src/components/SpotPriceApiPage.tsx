import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, ExternalLink, Search, DollarSign, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getApiUrl, API_ENDPOINTS } from '@/lib/constants'

interface TokenPrice {
  address: string
  price: string
}

export function SpotPriceApiPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [prices, setPrices] = useState<TokenPrice[]>([])
  const [error, setError] = useState<string | null>(null)

  // API call to fetch spot price data
  const fetchSpotPriceData = async (): Promise<TokenPrice[]> => {
    setIsLoading(true)
    setError(null)

    try {
      const apiUrl = getApiUrl(API_ENDPOINTS.SPOT_PRICE)
      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error(
          `Failed to fetch spot prices: ${response.status} ${response.statusText}`
        )
      }

      const result = await response.json()
      console.log('Successfully fetched spot price data:', result)

      // Transform the data to match our TokenPrice interface
      // The API returns an object with token addresses as keys and prices as values
      if (result.success && result.data) {
        const transformedData: TokenPrice[] = Object.entries(result.data).map(
          ([address, price]) => ({
            address,
            price: price as string,
          })
        )

        return transformedData
      } else {
        throw new Error(result.error || 'Failed to fetch spot prices')
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch spot price data'
      setError(errorMessage)
      console.error('Error fetching spot price data:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuery = async () => {
    setIsLoading(true)
    setError(null)
    setPrices([])

    try {
      const priceData = await fetchSpotPriceData()
      setPrices(priceData)
      console.log('Successfully fetched spot price data:', priceData)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch spot price data'
      setError(errorMessage)
      console.error('Error fetching spot price data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={() => navigate('/api-explorer')}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to API Explorer
          </Button>
          <Button
            onClick={() =>
              window.open(
                'https://docs.1inch.io/docs/spot-price-api/introduction/',
                '_blank'
              )
            }
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View Documentation
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Spot Price API</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get real-time token prices aggregated from multiple DEXes with
            caching mechanisms for optimal performance.
          </p>
        </div>

        {/* Query Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Query Spot Prices</CardTitle>
            <CardDescription>
              Enter a token address to get real-time price data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Button
                onClick={handleQuery}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                {isLoading ? 'Loading...' : 'Load Price Data'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {prices.length > 0 && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Spot Price Results</CardTitle>
                <CardDescription>
                  Real-time token prices aggregated from multiple DEXes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prices.map((token, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="font-semibold">
                            Token: {token.address.substring(0, 6)}...
                            {token.address.substring(token.address.length - 4)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Multi-DEX price aggregation and caching
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${token.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Error State */}
        {error && (
          <Card className="text-center py-12 border-red-200 dark:border-red-800">
            <CardContent>
              <div className="h-16 w-16 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-red-600 dark:text-red-400 text-2xl">
                  ⚠️
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-400">
                Error Fetching Spot Prices
              </h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button
                onClick={() => setError(null)}
                variant="outline"
                size="sm"
              >
                Dismiss
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {prices.length === 0 && !isLoading && !error && (
          <Card className="text-center py-12">
            <CardContent>
              <DollarSign className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Price Data</h3>
              <p className="text-muted-foreground">
                Click "Load Price Data" to view real-time spot prices aggregated
                from multiple DEXes
              </p>
              {prices && prices.length > 0 && (
                <div className="mt-4 p-4 bg-muted rounded-lg max-h-60 overflow-y-auto">
                  <h4 className="font-semibold mb-2">Raw API Response:</h4>
                  <pre className="text-sm whitespace-pre-wrap">
                    {JSON.stringify(
                      {
                        success: true,
                        data: prices.reduce(
                          (acc, token) => ({
                            ...acc,
                            [token.address]: token.price,
                          }),
                          {}
                        ),
                      },
                      null,
                      2
                    )}
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() =>
                      copyToClipboard(
                        JSON.stringify(
                          {
                            success: true,
                            data: prices.reduce(
                              (acc, token) => ({
                                ...acc,
                                [token.address]: token.price,
                              }),
                              {}
                            ),
                          },
                          null,
                          2
                        )
                      )
                    }
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Response
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
