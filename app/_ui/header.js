import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import Spinner from "@/app/_ui/spinner"

export default function Header({ title, Icon }) {
  const [isOffline, setIsOffline] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine)
    }

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    // Initial check
    updateOnlineStatus()

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  return (
    <div className='md:hidden fixed top-0 w-full z-40 bg-background flex items-center justify-between px-3 pt-safe-10 pb-4'>
      <ChevronLeftIcon
        className='size-6 active:scale-125 transition-all active:text-gray-500 lg:hover:text-gray-500'
        onClick={() => router.back()}
      />
      <p className='font-extrabold truncate max-w-52'>{isOffline ? <Spinner size="20" /> : title}</p>
      <Icon className='size-6' />
    </div>
  )
}