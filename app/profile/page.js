'use client'

import ProfileDetails from '@/app/_ui/profile/profile'
import { useUserStore } from '@/app/_lib/hooks/store'

export default function Profile() {
  const user = useUserStore((state) => state.user)

  return (
    <ProfileDetails
      user={user}
    />
  )
}