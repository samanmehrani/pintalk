'use client'

import { FingerPrintIcon } from '@heroicons/react/24/outline'

import Header from '@/app/_ui/header'

import { DeleteAccount, logout } from '@/app/_lib/api/user'
import { removeUser } from '@/app/_lib/user'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function PrivacySetting() {
  const [code, setCode] = useState()
  const router = useRouter()

  const handleChange = (event) => {
    setCode(event.target.value)
  }

  async function handleDeleteAccount() {
    try {
      await DeleteAccount(code)
      removeUser()
      router.push('/')
    } catch (error) {
      console.log("The account was not deleted.")
    }
  }

  return (
    <>
      <Header title={'Privacy'} Icon={FingerPrintIcon} />

      <main className="px-4 py-28 sm:px-6 lg:flex-auto lg:px-8">
        <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
          <div>
            <h2 className="text-base font-semibold leading-7">Privacy and Security</h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Choose what privacy and security to use throughout your account.
            </p>

            <dl className="mt-6 space-y-6 divide-y divide-gray-400/25 border-t border-gray-400/25 text-sm leading-6">
              <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-semibold leading-7">Delete account</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    No longer want to use our service? You can delete your account here. This action is not reversible.
                    All information related to this account will be deleted permanently.
                  </p>
                </div>

                <form className="md:col-span-2">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full">
                      <label htmlFor="logout-password" className="block font-medium leading-5">
                        Code
                        <p className='text-[10px] text-gray-400'>
                          A one-time code will be sent to your email to delete your account
                        </p>
                      </label>
                      <div className="flex items-center mt-2 border border-gray-400/75 rounded-xl">
                        <input
                          id="logout-password"
                          name="password"
                          type="password"
                          onChange={handleChange}
                          autoComplete="current-password"
                          className="block bg-transparent w-full text-lg py-1.5 pl-3 pr-2 focus:outline-none"
                        />
                        <button
                          className='text-[9px] text-gray-600 bg-gray-400/25 active:bg-gray-50 rounded-xl px-2 whitespace-nowrap mr-2 disabled:bg-gray-200 disabled:opacity-25'
                          disabled
                        >
                          Send Code
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex">
                    <button
                      type="submit"
                      onClick={handleDeleteAccount}
                      className="rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 disabled:bg-red-600 disabled:opacity-15"
                      disabled
                    >
                      Yes, delete my account
                    </button>
                  </div>
                </form>
              </div>

            </dl>
          </div>
        </div>
      </main>
    </>
  )
}