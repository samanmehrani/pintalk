'use client'

import { useCallback, useEffect, useState } from 'react'

import { classNames } from '@/app/_lib/general'

import * as texts from '@/app/_text/common'

import Spinner from '@/app/_ui/spinner'

export default function EmailInput({ email, setEmail, isPending, setIsPending, requestCode }) {
  const [errors, setErrors] = useState({})

  const validateInput = useCallback(() => {
    let errors = {}

    if (!email) {
      errors.email = 'Email is required.'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.'
    }

    setErrors(errors)
  }, [email])

  useEffect(() => {
    validateInput()
  }, [validateInput])

  async function handleFormSubmit() {
    setIsPending(true)
    await requestCode(email)
    setIsPending(false)
  }

  function handleMobileChange(e) {
    setEmail(e.target.value)
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px] px-4">
      <div className="rounded-2xl">
        <form className="space-y-5">
          <div className="relative z-0">
            <input
              id="email"
              name="email"
              value={email}
              onChange={handleMobileChange}
              type="email"
              dir="ltr"
              autoComplete="email"
              required
              disabled={isPending}
              className="block px-0 pb-2.5 pt-4 w-full bg-transparent border-b border-gray-400/25 rounded-none appearance-none focus:outline-none focus:ring-0 peer focus:border-indigo-600"
            />
            <label
              htmlFor="email"
              className={classNames(
                email !== '' ? '-translate-y-6' : 'translate-y-1',
                "absolute text-lg opacity-50 duration-200 transform scale-75 top-3 z-10 origin-[0] peer-focus:opacity-100 peer-focus:start-0 peer-focus:text-indigo-600 peer-focus:font-semibold peer-focus:scale-75 peer-focus:-translate-y-6"
              )}
            >
              {texts.enterYourEmailNumberText}
            </label>
          </div>

          <p className='text-center px-2 text-xs md:text-base'>Enter your email address. We&apos;ll send a confirmation code next.</p>

          <div>
            <button
              className="flex w-full justify-center rounded-3xl bg-foreground text-background px-3 py-2.5 text-sm md:hover:scale-95 active:scale-95 focus:outline disabled:bg-foreground disabled:opacity-10 disabled:scale-100 transition-transform"
              type="submit"
              onClick={handleFormSubmit}
              disabled={!!errors.email || isPending}
            >
              {isPending ? <Spinner size="20" /> : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}