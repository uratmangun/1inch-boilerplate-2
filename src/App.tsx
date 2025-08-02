import { StagewiseToolbar } from '@stagewise/toolbar-react'
import ReactPlugin from '@stagewise-plugins/react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { PrivyProvider } from '@/contexts/PrivyProvider'
import { ThemeToggle } from '@/components/ThemeToggle'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BalancePage } from '@/components/BalancePage'
import { HomePage } from '@/components/HomePage'
import { ApiExplorerPage } from '@/components/ApiExplorerPage'
import { BalanceApiPage } from '@/components/BalanceApiPage'
import { PortfolioApiPage } from '@/components/PortfolioApiPage'
import { HistoryApiPage } from '@/components/HistoryApiPage'
import { SpotPriceApiPage } from '@/components/SpotPriceApiPage'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <PrivyProvider>
        <Router>
          <StagewiseToolbar
            config={{
              plugins: [ReactPlugin],
            }}
          />
          <ThemeToggle />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/balance" element={<BalancePage />} />
            <Route path="/api-explorer" element={<ApiExplorerPage />} />
            <Route
              path="/implementation/balance-api"
              element={<BalanceApiPage />}
            />
            <Route
              path="/implementation/portfolio-api"
              element={<PortfolioApiPage />}
            />
            <Route
              path="/implementation/history-api"
              element={<HistoryApiPage />}
            />
            <Route
              path="/implementation/spot-price-api"
              element={<SpotPriceApiPage />}
            />
          </Routes>
        </Router>
      </PrivyProvider>
    </ThemeProvider>
  )
}

export default App
