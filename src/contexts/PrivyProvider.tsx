import { PrivyProvider as BasePrivyProvider } from '@privy-io/react-auth'
import { ReactNode } from 'react'

interface PrivyProviderProps {
  children: ReactNode
}

export function PrivyProvider({ children }: PrivyProviderProps) {
  const appId = import.meta.env.VITE_PRIVY_APP_ID

  if (!appId) {
    console.warn(
      'VITE_PRIVY_APP_ID is not set. Privy authentication will not work.'
    )
  }

  return (
    <BasePrivyProvider
      appId={appId || 'dummy-app-id'} // Use dummy ID for development if not set
      config={{
        // Customize the Privy appearance
        appearance: {
          theme: 'light',
          accentColor: '#6366f1',
          logo: undefined,
        },
        // Configure login methods
        loginMethods: ['email', 'wallet', 'google', 'github'],
        // Configure embedded wallet creation
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      {children}
    </BasePrivyProvider>
  )
}
