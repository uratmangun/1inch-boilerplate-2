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
import { getApiUrl, API_ENDPOINTS } from '@/lib/constants'
import {
  ArrowLeft,
  User,
  TrendingUp,
  DollarSign,
  PieChart,
  Activity,
  Wallet,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { PrivyLoginButton } from '@/components/PrivyLoginButton'
import { usePrivy } from '@privy-io/react-auth'
import { useNavigate } from 'react-router-dom'

// Portfolio data interfaces
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

interface PortfolioData {
  walletAddress: string
  chainId: number
  chainName: string
  total: number
  byAddress: AddressValue[]
  byCategory: CategoryValue[]
  byProtocolGroup: ProtocolGroupValue[]
  byChain: ChainValue[]
}

export function PortfolioApiPage() {
  const navigate = useNavigate()
  const { authenticated, user } = usePrivy()
  const [walletAddress, setWalletAddress] = useState('')
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const usePrivyWallet = () => {
    if (authenticated && user?.wallet?.address) {
      setWalletAddress(user.wallet.address)
    }
  }

  const analyzePortfolio = async () => {
    if (!walletAddress) return

    setIsLoading(true)
    setError(null)

    try {
      const apiUrl = getApiUrl(API_ENDPOINTS.PORTFOLIO)
      const response = await fetch(`${apiUrl}?address=${walletAddress}`)
      const result = await response.json()

      if (result.success && result.data) {
        setPortfolioData(result.data)
      } else {
        setError(result.error || 'Failed to fetch portfolio data')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error occurred')
    } finally {
      setIsLoading(false)
    }
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
            Portfolio Analytics API
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Analyze wallet portfolios with comprehensive metrics, asset
            allocation, and performance tracking using advanced DeFi analytics.
          </p>
        </div>

        {/* Portfolio Query Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Portfolio Analysis</CardTitle>
            <CardDescription>
              Enter an Ethereum wallet address to analyze portfolio composition
              and performance
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
              {authenticated && user?.wallet?.address && (
                <Button
                  onClick={usePrivyWallet}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Use My Wallet
                </Button>
              )}
              <Button
                onClick={analyzePortfolio}
                disabled={!walletAddress || isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Portfolio'
                )}
              </Button>
            </div>

            {/* API Endpoint Info */}
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">API Endpoint:</h4>
              <code className="text-sm">
                GET {getApiUrl(API_ENDPOINTS.PORTFOLIO)}?address=
                {walletAddress || '0x...'}
              </code>
              <Badge variant="secondary" className="ml-2">
                Base Chain (ID: 8453)
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
              <AlertCircle className="h-4 w-4" />
              <span className="font-semibold">Error:</span>
            </div>
            <p className="text-red-700 dark:text-red-300 mt-1">{error}</p>
          </div>
        )}

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">
                    {portfolioData
                      ? `$${portfolioData.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : '$0.00'}
                  </p>
                </div>
                <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Chain</p>
                  <p className="text-2xl font-bold">
                    {portfolioData?.chainName || 'Base'}
                  </p>
                </div>
                <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Assets</p>
                  <p className="text-2xl font-bold">
                    {portfolioData?.byCategory
                      ?.find(cat => cat.category_id === 'tokens')
                      ?.value_usd.toFixed(0) || 0}
                  </p>
                </div>
                <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <PieChart className="h-4 w-4 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Protocols</p>
                  <p className="text-2xl font-bold">
                    {portfolioData?.byCategory
                      ?.find(cat => cat.category_id === 'protocols')
                      ?.value_usd.toFixed(0) || 0}
                  </p>
                </div>
                <div className="h-8 w-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                  <Activity className="h-4 w-4 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Asset Allocation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>
              Portfolio composition by asset type and value
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioData && portfolioData.byCategory.length > 0 ? (
                portfolioData.byCategory.map((category, index) => {
                  const percentage =
                    portfolioData.total > 0
                      ? (category.value_usd / portfolioData.total) * 100
                      : 0
                  const colors = [
                    'bg-blue-500',
                    'bg-green-500',
                    'bg-orange-500',
                    'bg-purple-500',
                    'bg-pink-500',
                  ]
                  const color = colors[index % colors.length]

                  return (
                    <div
                      key={category.category_id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-10 w-10 ${color} rounded-full flex items-center justify-center`}
                        >
                          <span className="text-white font-bold text-sm">
                            {category.category_name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold">
                            {category.category_name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {category.category_id}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          $
                          {category.value_usd.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading portfolio data...
                    </div>
                  ) : (
                    'No portfolio data available. Enter a wallet address and click "Analyze Portfolio" to get started.'
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Protocol Groups */}
        {portfolioData && portfolioData.byProtocolGroup.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Protocol Groups</CardTitle>
              <CardDescription>
                Portfolio breakdown by protocol groups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.byProtocolGroup.map((protocolGroup, index) => {
                  const percentage =
                    portfolioData.total > 0
                      ? (protocolGroup.value_usd / portfolioData.total) * 100
                      : 0
                  const colors = [
                    'bg-indigo-500',
                    'bg-cyan-500',
                    'bg-emerald-500',
                    'bg-amber-500',
                    'bg-rose-500',
                  ]
                  const color = colors[index % colors.length]

                  return (
                    <div
                      key={protocolGroup.protocol_group_id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-10 w-10 ${color} rounded-full flex items-center justify-center`}
                        >
                          <span className="text-white font-bold text-sm">
                            {protocolGroup.protocol_group_name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold">
                            {protocolGroup.protocol_group_name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {protocolGroup.protocol_group_id}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          $
                          {protocolGroup.value_usd.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Historical performance and risk analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">7d Return</h4>
                <p className="text-2xl font-bold text-green-600">+8.32%</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">30d Return</h4>
                <p className="text-2xl font-bold text-blue-600">+15.67%</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Volatility</h4>
                <p className="text-2xl font-bold text-orange-600">12.4%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {!walletAddress && (
          <Card className="text-center py-12 mt-8">
            <CardContent>
              <Wallet className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Portfolio Data</h3>
              <p className="text-muted-foreground">
                Enter a wallet address above to analyze portfolio metrics and
                composition
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
