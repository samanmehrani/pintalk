'use client'

import { useEffect, useState } from "react"

import { CheckUsername } from "@/app/_lib/api/user"

import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid"

import * as texts from '@/app/_text/common'

import Spinner from "@/app/_ui/spinner"

export default function ChangeUsername({ user, username, setUsername }) {
  const [validationMessage, setValidationMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isValid, setIsValid] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    const handler = setTimeout(async () => {
      if (!/^[a-zA-Z0-9_.]+$/.test(username) && username.length > 0) {
        setIsValid(false)
        setIsLoading(false)
        setValidationMessage('Username can only contain letters, numbers, . and _')
        return
      }

      if (username.length < 5 && username.length > 0) {
        setIsValid(false)
        setIsLoading(false)
        setValidationMessage('Username must be at least 5 characters long.')
        return
      } else if (username === user.username) {
        setIsValid(false)
        setIsLoading(false)
        setValidationMessage('You cannot choose your current Username.')
      } else if (username.length >= 5) {
        setIsLoading(true)
        setIsValid(null)
        try {
          const response = await CheckUsername(username)
          const data = await response?.json()
          if (response.ok) {
            setIsValid(true)
            setIsLoading(false)
            setValidationMessage(data.message)
          } else {
            setIsValid(false)
            setIsLoading(false)
            setValidationMessage(data.message)
          }
        } catch (error) {
          setIsValid(false)
          setValidationMessage('An error occurred. Please try again.')
        } finally {
          setIsLoading(false)
        }
      }
    }, 1000)

    if (username.length === 0) {
      setIsValid(null)
      setIsLoading(false)
      setValidationMessage('')
    }

    return () => {
      clearTimeout(handler)
    }
  }, [username, user?.username])

  const handleUsernameInputChange = (event) => {
    setUsername(event.target.value)
  }

  return (
    <div className="col-span-full">
      <label htmlFor="username" className="block text-sm/6 font-medium">
        Username
      </label>
      <div className="mt-2">
        <div className="flex items-center rounded-xl bg-background pl-3 border border-gray-400/25 focus:outline-none">
          <div className="shrink-0 select-none text-base text-gray-300 sm:text-sm/6">{texts.appNameLowerCase}.com/</div>
          <input
            id="username"
            name="username"
            type="text"
            placeholder={user?.username}
            onChange={handleUsernameInputChange}
            className="block min-w-0 grow py-2 px-1 bg-transparent placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          // disabled
          />
          <div className="flex items-center justify-center size-5 mr-2">
            {isLoading ? <Spinner size="20" /> :
              <>
                {isValid === true && <CheckCircleIcon className="size-5 text-green-500" aria-hidden="true" />}
                {isValid === false && <ExclamationCircleIcon className="size-5 mb-0.5 text-red-500" aria-hidden="true" />}
              </>
            }
          </div>
        </div>
      </div>
      <span className={`absolute m-1 pr-10 text-xs ${isValid ? 'text-green-500' : 'text-red-500'}`}>
        {validationMessage}
      </span>
    </div>
  )
}