import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Copy, ExternalLink, Search, Wallet, ArrowLeft } from 'lucide-react'
import { PrivyLoginButton } from '@/components/PrivyLoginButton'
import { useNavigate } from 'react-router-dom'
import { getApiUrl, API_ENDPOINTS, DEFAULT_CHAIN } from '@/lib/constants'

interface TokenBalance {
  symbol: string
  balance: string
  balanceRaw: string
  decimals: number
  contractAddress: string
  price?: number
  value?: number
}

export function BalanceApiPage() {
  const navigate = useNavigate()
  const [walletAddress, setWalletAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [balances, setBalances] = useState<TokenBalance[]>([])
  const [error, setError] = useState<string | null>(null)

  // API call to fetch real balance data
  const fetchBalanceData = async (address: string): Promise<TokenBalance[]> => {
    const apiUrl = getApiUrl(API_ENDPOINTS.BALANCE)
    const url = `${apiUrl}?address=${encodeURIComponent(address)}`

    console.log('Fetching balance data from:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: 'Unknown error' }))
      throw new Error(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`
      )
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || 'API request failed')
    }

    // Transform API response to match our TokenBalance interface
    return data.data.balances.map(
      (token: {
        symbol: string
        balance: string
        balanceRaw: string
        decimals: number
        address: string
        price?: number
        value?: number
      }) => ({
        symbol: token.symbol,
        balance: token.balance,
        balanceRaw: token.balanceRaw,
        decimals: token.decimals,
        contractAddress: token.address,
        price: token.price,
        value: token.value,
      })
    )
  }

  const handleQuery = async () => {
    if (!walletAddress) return

    setIsLoading(true)
    setError(null)
    setBalances([])

    try {
      const balanceData = await fetchBalanceData(walletAddress)
      setBalances(balanceData)
      console.log('Successfully fetched balance data:', balanceData)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch balance data'
      setError(errorMessage)
      console.error('Error fetching balance data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const totalValue = balances.reduce(
    (sum, token) => sum + (token.value || 0),
    0
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={() => navigate('/api-explorer')}
            variant="outline"
            size="sm"
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            API Explorer
          </Button>
          <PrivyLoginButton />
        </div>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Multi-token Balance Queries
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Query multiple token balances via RPC calls using the 1inch Balance
            API. Enter a wallet address to get comprehensive balance
            information.
          </p>
        </div>

        {/* Query Interface */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Balance Query
            </CardTitle>
            <CardDescription>
              Enter an Ethereum wallet address to fetch all token balances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="0x1234567890abcdef1234567890abcdef12345678"
                value={walletAddress}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setWalletAddress(e.target.value)
                }
                className="flex-1"
              />
              <Button
                onClick={handleQuery}
                disabled={!walletAddress || isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {isLoading ? 'Querying...' : 'Query Balances'}
              </Button>
            </div>

            {/* API Endpoint Info */}
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">API Endpoint:</h4>
              <code className="text-sm">
                GET {getApiUrl(API_ENDPOINTS.BALANCE)}?address={walletAddress}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `${getApiUrl(API_ENDPOINTS.BALANCE)}?address=${walletAddress}`
                  )
                }
                className="ml-2"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <div className="mt-2 text-xs text-muted-foreground">
                Chain: {DEFAULT_CHAIN.name} (ID: {DEFAULT_CHAIN.id})
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {balances.length > 0 && (
          <>
            {/* Portfolio Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">Total Value</p>
                      <p className="text-2xl font-bold">
                        ${totalValue.toLocaleString()}
                      </p>
                    </div>
                    <Wallet className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">Total Tokens</p>
                      <p className="text-2xl font-bold">{balances.length}</p>
                    </div>
                    <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">T</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">Network</p>
                      <p className="text-2xl font-bold">Ethereum</p>
                    </div>
                    <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-sm">
                        ETH
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Token Balances Table */}
            <Card>
              <CardHeader>
                <CardTitle>Token Balances</CardTitle>
                <CardDescription>
                  Detailed breakdown of all token holdings in the wallet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {balances.map((token, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {token.symbol.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              {token.symbol}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              ERC-20
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>
                              {token.contractAddress.slice(0, 6)}...
                              {token.contractAddress.slice(-4)}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(token.contractAddress)
                              }
                              className="h-4 w-4 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <ExternalLink className="h-3 w-3" />
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {token.balance} {token.symbol}
                        </div>
                        {token.value && (
                          <div className="text-sm text-muted-foreground">
                            ${token.value.toLocaleString()}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          Raw: {token.balanceRaw} (10^{token.decimals})
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* RPC Details */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>RPC Call Details</CardTitle>
                <CardDescription>
                  Technical information about the balance query implementation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Request Parameters</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="text-sm">
                        {`{
  "address": "${walletAddress}",
  "chainId": 1,
  "includeNative": true,
  "includeTokens": true
}`}
                      </pre>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Response Format</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="text-sm">
                        {`{
  "success": true,
  "balances": {
    "0xToken...": "1250450000",
    "0xOther...": "875300000000000000"
  },
  "metadata": { ... }
}`}
                      </pre>
                    </div>
                  </div>
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
                Error Fetching Balance
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
        {balances.length === 0 && !isLoading && !error && (
          <Card className="text-center py-12">
            <CardContent>
              <Wallet className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Balance Data</h3>
              <p className="text-muted-foreground">
                Enter a wallet address above to query multi-token balances on{' '}
                {DEFAULT_CHAIN.name}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
