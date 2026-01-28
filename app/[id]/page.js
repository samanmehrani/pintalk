'use client'

import { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'
import { getAUserInfo } from '@/app/_lib/api/user'
import { useUserStore } from '@/app/_lib/hooks/store'

import ProfileDetails from '@/app/_ui/profile/profile'

export default function IdProfile() {
  const me = useUserStore((state) => state.user)
  const pathname = usePathname()
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const userId = pathname.split('/')[1]

    if (me.username === userId) {
      router.push('/profile')
      return
    }

    const fetchUser = async () => {
      try {
        const res = await getAUserInfo(userId)
        if (!res?.ok) return
        const data = await res.json()
        setUser(data)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchUser()
  }, [me.username, pathname, router])

  if (error) {
    return (
      <div className='min-h-svh flex flex-col items-center justify-center text-center w-full lg:col-span-3'>
        <b>{error}</b>
        <p className='active:text-gray-600 lg:hover:text-gray-600' onClick={() => router.back()}>
          Go back &rarr;
        </p>
      </div>
    )
  }

  return (
    <ProfileDetails
      user={user}
    />
  )
}