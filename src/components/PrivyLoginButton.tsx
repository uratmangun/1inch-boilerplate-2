import { Button } from '@/components/ui/button'
import { LogIn, LogOut, User } from 'lucide-react'
import { usePrivy } from '@privy-io/react-auth'

export function PrivyLoginButton() {
  const { ready, authenticated, user, login, logout } = usePrivy()

  // Don't render anything if Privy is not ready
  if (!ready) {
    return (
      <Button
        size="lg"
        disabled
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 text-lg"
      >
        <span className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Loading...
        </span>
      </Button>
    )
  }

  // If user is authenticated, show logout button
  if (authenticated && user) {
    return (
      <Button
        size="lg"
        onClick={logout}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
      >
        <span className="flex items-center gap-2">
          <LogOut className="h-5 w-5" />
          Logout (
          {user.email?.address ||
            user.wallet?.address?.slice(0, 6) + '...' ||
            'User'}
          )
        </span>
      </Button>
    )
  }

  // If user is not authenticated, show login button
  return (
    <Button
      size="lg"
      onClick={login}
      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
    >
      <span className="flex items-center gap-2">
        <LogIn className="h-5 w-5" />
        Login with Privy
      </span>
    </Button>
  )
}
