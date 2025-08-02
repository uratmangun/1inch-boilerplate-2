

import { StagewiseToolbar } from '@stagewise/toolbar-react'
import ReactPlugin from '@stagewise-plugins/react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ThemeToggle } from '@/components/ThemeToggle'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BalancePage } from '@/components/BalancePage'
import { HomePage } from '@/components/HomePage'

function App() {

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
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
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
