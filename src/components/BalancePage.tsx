import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowLeft, Wallet, RefreshCw, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { Link } from 'react-router-dom'

export function BalancePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [balances, setBalances] = useState([
    { token: 'ETH', amount: '2.45', usdValue: '$6,125.50', change: '+5.2%', isPositive: true },
    { token: 'USDC', amount: '1,250.00', usdValue: '$1,250.00', change: '0.0%', isPositive: null },
    { token: '1INCH', amount: '850.75', usdValue: '$425.38', change: '-2.1%', isPositive: false },
    { token: 'DAI', amount: '500.00', usdValue: '$500.00', change: '+0.1%', isPositive: true },
  ])

  const totalBalance = balances.reduce((sum, balance) => {
    return sum + parseFloat(balance.usdValue.replace('$', '').replace(',', ''))
  }, 0)

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      // Mock balance updates
      setBalances(prev => prev.map(balance => ({
        ...balance,
        amount: (parseFloat(balance.amount.replace(',', '')) * (0.95 + Math.random() * 0.1)).toFixed(2),
        change: `${(Math.random() * 10 - 5).toFixed(1)}%`,
        isPositive: Math.random() > 0.5
      })))
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Balance Checker
          </h1>
        </div>

        {/* Total Balance Card */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Wallet className="h-6 w-6" />
              Total Portfolio Value
            </CardTitle>
            <CardDescription>
              Your current DeFi portfolio balance
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">
              ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <Button 
              onClick={handleRefresh} 
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Balances
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Token Balances Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {balances.map((balance, index) => (
            <Card key={index} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{balance.token}</CardTitle>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    {balance.amount}
                  </div>
                  <div className="text-lg text-gray-600 dark:text-gray-300">
                    {balance.usdValue}
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    balance.isPositive === true 
                      ? 'text-green-600 dark:text-green-400' 
                      : balance.isPositive === false 
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {balance.isPositive === true && <TrendingUp className="h-3 w-3" />}
                    {balance.isPositive === false && <TrendingDown className="h-3 w-3" />}
                    {balance.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mock Transaction History */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl mt-8">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your latest DeFi activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'Swap', from: 'ETH', to: 'USDC', amount: '0.5 ETH', time: '2 hours ago' },
                { type: 'Add Liquidity', from: 'DAI', to: 'USDC', amount: '100 DAI', time: '1 day ago' },
                { type: 'Claim Rewards', from: '1INCH', to: '', amount: '25.5 1INCH', time: '3 days ago' },
              ].map((tx, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium">{tx.type}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {tx.from} {tx.to && `→ ${tx.to}`}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{tx.amount}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{tx.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
