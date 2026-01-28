// import { createSession, deleteSession } from '@/app/_lib/session'
'use client'

import {
  registerUser as registerUserApi
} from '@/app/_lib/api/user'

export async function signup(state, formData) {
  const name = formData.get('name')
  const username = formData.get('username')
  const userType = formData.get('userType')
  const secret = formData.get('secret')

  await registerUserApi(name, username, userType, secret)

  // await createSession(token)
  router.push('/profile')
}

export async function logout() {
  //   deleteSession()
  redirect('/')
}