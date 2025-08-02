import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  ExternalLink,
  ArrowLeft,
  BookOpen,
  Code,
  Wallet,
  TrendingUp,
  History,
  DollarSign,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { PrivyLoginButton } from '@/components/PrivyLoginButton'

// API categories and their interactions
const apiInteractions = [
  {
    category: 'Balance & Portfolio',
    name: 'Balance API',
    description: 'Get token balances for wallet addresses',
    implementation: 'Multi-token balance queries via RPC',
    type: 'Balance',
    endpoint: '/balance/v1.2',
    methods: ['GET'],
    icon: <Wallet className="h-4 w-4" />,
    docs: '1inch-balance-api-introduction.md',
  },
  {
    category: 'Balance & Portfolio',
    name: 'Portfolio API',
    description: 'Get comprehensive portfolio data',
    implementation: 'Aggregated portfolio analytics and metrics',
    type: 'Portfolio',
    endpoint: '/portfolio/overview',
    methods: ['GET'],
    icon: <TrendingUp className="h-4 w-4" />,
    docs: '1inch-portfolio-api-introduction.md',
  },
  {
    category: 'Transaction & History',
    name: 'History API',
    description: 'Get transaction history and analytics',
    implementation: 'Historical data aggregation with filtering',
    type: 'History',
    endpoint: '/history/v2.0',
    methods: ['GET'],
    icon: <History className="h-4 w-4" />,
    docs: '1inch-history-api-introduction.md',
  },
  {
    category: 'Market Data',
    name: 'Spot Price API',
    description: 'Get real-time token prices',
    implementation: 'Multi-DEX price aggregation and caching',
    type: 'Price',
    endpoint: '/price/v1.1',
    methods: ['GET'],
    icon: <DollarSign className="h-4 w-4" />,
    docs: '1inch-spot-price-api-introduction.md',
  },
]

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    Auth: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    Swap: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    Balance:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Portfolio:
      'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
    History:
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    Transaction: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    Price:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Gas: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    Token: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
    Order: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    NFT: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300',
  }
  return (
    colors[type] ||
    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  )
}

export function ApiExplorerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="sm" asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            {/* Login Button in Top Right */}
            <div className="flex-shrink-0">
              <PrivyLoginButton />
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              <BookOpen className="h-4 w-4" />
              API Reference
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              1inch API Explorer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore all available 1inch API endpoints and their
              functionalities. Click on any API to view detailed documentation.
            </p>
          </div>
        </div>

        {/* API Table */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Code className="h-6 w-6" />
              Available API Endpoints
            </CardTitle>
            <CardDescription className="text-lg">
              Complete list of 1inch API integrations available in this
              boilerplate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Icon</TableHead>
                    <TableHead>API Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Methods</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Implementation</TableHead>
                    <TableHead className="w-[100px]">LLMs.txt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiInteractions.map((api, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    >
                      <TableCell>
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          {api.icon}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{api.name}</TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {api.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(api.type)}>
                          {api.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                          {api.endpoint}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {api.methods.map(method => (
                            <Badge
                              key={method}
                              variant="outline"
                              className="text-xs"
                            >
                              {method}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {api.description}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-auto p-1 text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-200"
                        >
                          <Link
                            to={`/implementation/${api.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {api.implementation}
                          </Link>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            // In a real implementation, this would open the documentation
                            window.open(`/guides/${api.docs}`, '_blank')
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View documentation</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {apiInteractions.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total APIs
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {[...new Set(apiInteractions.map(api => api.category))].length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Categories
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {[...new Set(apiInteractions.map(api => api.type))].length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                API Types
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {apiInteractions.reduce(
                  (acc, api) => acc + api.methods.length,
                  0
                )}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                HTTP Methods
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
