'use client'

import { useEffect, useState } from 'react'

import Navbar from '@/app/_ui/navbar'
import SplashScreen from '@/app/_ui/splashScreen'
import PullToRefreshLayout from '@/app/_ui/Pull-to-Refresh'

import { ToastProvider } from '@/app/_ui/toast-context'

export default function ClientLayout({ children }) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <ToastProvider>
          <PullToRefreshLayout>
            <Navbar />
            <div className="min-h-screen md:min-h-[calc(100vh-56px)] bg-background">
              {children}
            </div>
          </PullToRefreshLayout>
        </ToastProvider>
      )}
    </>
  )
}