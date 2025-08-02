import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Github, ExternalLink, Zap, Shield, Rocket, Code, Globe, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            DeFi Template Ready
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            1inch-boilerplate
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Use this template to create your 1inch project
          </p>
          
          {/* Check Balance Button */}
          <div className="mb-12">
            <Button size="lg" asChild className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 text-lg">
              <Link to="/balance" className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Check Balance
              </Link>
            </Button>
          </div>
          
          {/* Repository Link & Usage Instructions */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <Github className="h-6 w-6" />
                  Get Started with 1inch-boilerplate
                </CardTitle>
                <CardDescription className="text-lg">
                  Use this template to create your own 1inch DeFi project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Repository Link */}
                <div className="text-center">
                  <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
                    <a 
                      href="https://github.com/uratmangun/1inch-boilerplate-2" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-5 w-5" />
                      View Repository
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                {/* GitHub CLI Instructions */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Public Repository */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Create Public Repository
                    </h3>
                    <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 relative group">
                      <code className="text-green-400 font-mono text-sm block break-all">
                        gh repo create my-1inch-project --template uratmangun/1inch-boilerplate-2 --public --clone
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white"
                        onClick={() => navigator.clipboard.writeText('gh repo create my-1inch-project --template uratmangun/1inch-boilerplate-2 --public --clone')}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>

                  {/* Private Repository */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Create Private Repository
                    </h3>
                    <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 relative group">
                      <code className="text-blue-400 font-mono text-sm block break-all">
                        gh repo create my-1inch-project --template uratmangun/1inch-boilerplate-2 --private --clone
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white"
                        onClick={() => navigator.clipboard.writeText('gh repo create my-1inch-project --template uratmangun/1inch-boilerplate-2 --private --clone')}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Quick Setup Instructions */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Quick Setup Instructions:</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <li>• Replace <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">my-1inch-project</code> with your desired project name</li>
                    <li>• The <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">--clone</code> flag automatically clones the repo to your local machine</li>
                    <li>• After cloning, run <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">pnpm install</code> to install dependencies</li>
                    <li>• Start development with <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">pnpm dev</code></li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <Rocket className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-xl">1inch Integration</CardTitle>
              <CardDescription>
                Pre-built components for 1inch DEX aggregator
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Ready-to-use React components for token swaps, liquidity pools, and yield farming with 1inch protocol.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-xl">Web3 Security</CardTitle>
              <CardDescription>
                Built-in security best practices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Includes wallet connection security, transaction validation, and smart contract interaction safety measures.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-xl">Developer Ready</CardTitle>
              <CardDescription>
                TypeScript, testing, and documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Full TypeScript support, comprehensive testing setup, and detailed documentation for rapid development.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
