'use client'

import { FireIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react'

export default function SplashScreen({ onComplete }) {

  useEffect(() => {
    const timer = setTimeout(() => onComplete(true), 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [onComplete])


  return (
    <div className="fixed min-h-screen inset-0 z-[9999] flex items-center justify-center overflow-hidden pb-safe">
      <div className='z-10'>
        <FireIcon className="size-28 transition-none animate-fade-scale" aria-hidden="true" />
      </div>
    </div>
  )
}
