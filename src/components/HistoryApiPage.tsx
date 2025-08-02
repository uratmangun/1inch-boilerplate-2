import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  Clock,
  Hash,
  Activity,
  Wallet,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { PrivyLoginButton } from '@/components/PrivyLoginButton'
import { usePrivy } from '@privy-io/react-auth'

// History event interfaces
interface TokenAction {
  address: string
  standard: string
  fromAddress: string
  toAddress: string
  amount?: string
  tokenId?: string
  direction: string
}

interface HistoryEvent {
  id: string
  address: string
  type: number
  timeMs: number
  rating: string
  direction: string
  details: {
    txHash: string
    chainId: number
    blockNumber: number
    blockTimeSec: number
    status: string
    type: string
    tokenActions: TokenAction[]
    fromAddress: string
    toAddress: string
    nonce: number
    orderInBlock: number
    feeInSmallestNative: string
  }
}

export function HistoryApiPage() {
  const navigate = useNavigate()
  const { authenticated, user } = usePrivy()
  const [walletAddress, setWalletAddress] = useState('')
  const [historyData, setHistoryData] = useState<HistoryEvent[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [limit, setLimit] = useState('1')

  const usePrivyWallet = () => {
    if (authenticated && user?.wallet?.address) {
      setWalletAddress(user.wallet.address)
    }
  }

  const fetchHistory = async () => {
    if (!walletAddress) return

    setIsLoading(true)
    setError(null)

    try {
      const apiUrl = getApiUrl(API_ENDPOINTS.HISTORY)
      const response = await fetch(
        `${apiUrl}?address=${walletAddress}&limit=${limit}`
      )
      const result = await response.json()

      if (result.success && result.data && result.data.items) {
        setHistoryData(result.data.items)
      } else {
        setError(result.error || 'Failed to fetch history data')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  // Format timestamp to readable date
  const formatTimestamp = (timestampMs: number) => {
    return new Date(timestampMs).toLocaleString()
  }

  // Get transaction type name from type number
  const getTransactionType = (type: number) => {
    const types: Record<number, string> = {
      0: 'Unknown',
      1: 'Approve',
      2: 'Wrap',
      3: 'Unwrap',
      4: 'Transfer',
      5: 'SwapExactInput',
      6: 'SwapExactOutput',
      7: 'LimitOrderFill',
      8: 'LimitOrderCancel',
      9: 'LimitOrderCancelAll',
      10: 'Multicall',
      11: 'AddLiquidity',
      12: 'RemoveLiquidity',
      13: 'Borrow',
      14: 'Repay',
      15: 'Stake',
      16: 'Unstake',
      17: 'Vote',
      18: 'DelegateVotePower',
      19: 'UnDelegateVotePower',
      20: 'DiscardVote',
      21: 'DeployPool',
      22: 'Claim',
      23: 'AbiDecoded',
      24: 'TraceDecoded',
      25: 'Action',
      26: 'Bridge',
      27: 'BuyNft',
      28: 'BidNft',
      29: 'OfferSellNft',
      30: 'Burn',
      31: 'WrappedTx',
      32: 'RegisterENSDomain',
      33: 'Revoke',
      34: 'CreateSafe',
      35: 'AddOwner',
      36: 'Send',
      37: 'Receive',
      38: 'MultiStage',
      39: 'Swap',
      40: 'LimitOrderCreate',
    }

    return types[type] || 'Unknown'
  }

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'default'
      case 'failed':
        return 'destructive'
      default:
        return 'secondary'
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
            Transaction History API
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore wallet transaction history with detailed event information,
            token transfers, and comprehensive on-chain activity tracking.
          </p>
        </div>

        {/* History Query Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              Enter an Ethereum wallet address to fetch transaction history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <Input
                placeholder="0x1234567890abcdef1234567890abcdef12345678"
                value={walletAddress}
                onChange={e => setWalletAddress(e.target.value)}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Limit (default: 100)"
                value={limit}
                onChange={e => setLimit(e.target.value)}
                className="w-32"
                min="1"
                max="2048"
              />
              <Button
                onClick={usePrivyWallet}
                variant="outline"
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 cursor-pointer"
              >
                <User className="h-4 w-4 mr-2" />
                Use Privy Wallet
              </Button>
            </div>
            <Button
              onClick={fetchHistory}
              disabled={isLoading || !walletAddress}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Fetching History...
                </>
              ) : (
                <>
                  <Activity className="h-4 w-4 mr-2" />
                  Get Transaction History
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="mb-8 border-red-500 bg-red-50 dark:bg-red-950/20">
            <CardContent className="pt-6">
              <div className="flex items-center text-red-600 dark:text-red-400">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* History Results */}
        {historyData && historyData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                Recent transactions for {walletAddress}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {historyData.map(event => (
                  <div
                    key={event.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-sm">
                          {event.details.txHash.substring(0, 10)}...
                          {event.details.txHash.substring(
                            event.details.txHash.length - 8
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {formatTimestamp(event.timeMs)}
                        </span>
                      </div>
                      <Badge variant={getStatusVariant(event.details.status)}>
                        {event.details.status}
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <span className="text-sm font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded">
                        {getTransactionType(event.type)}
                      </span>
                    </div>

                    <div className="text-sm text-muted-foreground mb-2">
                      Block #{event.details.blockNumber} • Chain ID:{' '}
                      {event.details.chainId}
                    </div>

                    {event.details.tokenActions.length > 0 && (
                      <div className="mt-3">
                        <h4 className="font-semibold text-sm mb-2">
                          Token Actions:
                        </h4>
                        <div className="space-y-2">
                          {event.details.tokenActions.map(
                            (action: TokenAction, index: number) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-900 rounded"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs">
                                    {action.address.substring(0, 6)}...
                                    {action.address.substring(
                                      action.address.length - 4
                                    )}
                                  </span>
                                  <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded">
                                    {action.standard}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs">
                                    {action.fromAddress.substring(0, 6)}...
                                    {action.fromAddress.substring(
                                      action.fromAddress.length - 4
                                    )}{' '}
                                    → {action.toAddress.substring(0, 6)}...
                                    {action.toAddress.substring(
                                      action.toAddress.length - 4
                                    )}
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {action.direction}
                                  </Badge>
                                  {action.amount && (
                                    <span className="text-xs font-mono">
                                      {action.amount}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!walletAddress && (
          <Card className="text-center py-12 mt-8">
            <CardContent>
              <Wallet className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No History Data</h3>
              <p className="text-muted-foreground">
                Enter a wallet address above to fetch transaction history
              </p>
            </CardContent>
          </Card>
        )}

        {/* No Results State */}
        {historyData && historyData.length === 0 && !isLoading && (
          <Card className="text-center py-12 mt-8">
            <CardContent>
              <Activity className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No Transactions Found
              </h3>
              <p className="text-muted-foreground">
                No transaction history was found for this wallet address
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
