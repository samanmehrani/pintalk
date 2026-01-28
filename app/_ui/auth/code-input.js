'use client'

import * as texts from '@/app/_text/common'

import { motion, AnimatePresence } from "framer-motion"

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  authenticateUser as authenticateUserApi
} from '@/app/_lib/api/auth'

import { classNames } from '@/app/_lib/general'
import { storeUser } from '@/app/_lib/user'

import { useToast } from '@/app/_ui/toast-context'

export default function InputVerificationCode({
  email,
  requestCode,
  setEmailSecret,
  setActiveIndex
}) {
  const COUNTER_INITIAL_VALUE = 60

  const { addToast } = useToast()

  const [otp, setOtp] = useState(['', '', '', '', ''])
  const [counter, setCounter] = useState(COUNTER_INITIAL_VALUE)
  const [hasError, setHasError] = useState(false)
  const [successSubmit, setSuccessSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const timerRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCounter(prev => {
        if (prev <= 1) clearInterval(timerRef.current)
        return prev - 1
      })
    }, 1000)
  }

  const resetTimer = () => {
    setOtp(['', '', '', '', ''])
    setCounter(COUNTER_INITIAL_VALUE)
    startTimer()
  }

  const handleChange = (index, e) => {
    const value = e.target.value
    if (value !== '' && isNaN(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`)?.focus()
    }

    if (newOtp.every(d => d)) {
      if (!isSubmitting) onSubmit(newOtp.join(''))
    } else {
      setHasError(false)
    }
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)?.focus()
    }
  }

  const onSubmit = async (code) => {
    setIsSubmitting(true)
    try {
      const response = await authenticateUserApi(email, code)
      if (response.ok) {
        const data = await response.json()
        setSuccessSubmit(true)

        setTimeout(() => {
          if (data.email_secret) {
            setEmailSecret(data.email_secret)
            setActiveIndex(2)
          } else {
            storeUser(data)
            router.push('/profile')
          }
        }, 2000)

      } else if (response.status === 401) {
        setHasError(true)
        setSuccessSubmit(false)
        if (navigator.vibrate) navigator.vibrate(100)
      }
    } catch (error) {
      addToast({
        message: 'Connection failed!',
        description: 'Could not connect to the server. Please check your internet connection.',
        type: 'warning',
        position: 'bottom-9 left-4 md:bottom-5'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onClickResendCode = async () => {
    await requestCode(email)
    resetTimer()
  }

  return (
    <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-[480px] px-3">
      <div className="px-2">
        <form className="relative space-y-4 text-center">
          <div>
            <div className={classNames(
              hasError ? 'shake' : '',
              "my-6 h-20 flex items-center justify-between gap-2 relative"
            )}>
              <AnimatePresence>
                {successSubmit ? (
                  <motion.div
                    key="success"
                    className="absolute inset-0 flex justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    >
                      <motion.path
                        d="M4 12 L9 17 L20 6"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      />
                    </motion.svg>
                  </motion.div>
                ) : (
                  otp.map((digit, index) => (
                    <motion.input
                      key={index}
                      id={`otp-input-${index}`}
                      type="tel"
                      value={digit}
                      onChange={(e) => handleChange(index, e)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={classNames(
                        "w-full max-w-16 aspect-square text-center text-md bg-transparent border rounded-xl focus:outline-none transition-colors",
                        hasError ? 'border-red-700' :
                          successSubmit ? 'border-green-700' : 'border-gray-400/25 focus:border-gray-400/50',
                      )}
                      disabled={isSubmitting}
                      maxLength={1}
                      required
                      initial={{ x: 0 }}
                      animate={{ x: successSubmit ? 0 : 0 }}
                      exit={{ opacity: 0 }}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>

            <div className="block py-2.5 rounded-xl text-xs md:text-base">
              {texts.verificationCodeIsSentText(email)}
            </div>
          </div>

          <div className='absolute -top-36 inset-x-0 justify-center items-center pointer-events-auto z-20'>
            {counter > 0 ? (
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="max-w-9 md:max-w-10 mx-auto aspect-square rounded-full text-xs md:text-sm text-foreground bg-auth flex items-center justify-center"
              >
                {counter}
              </motion.span>
            ) : (
              <span className='flex text-sm items-center justify-center'>
                <p className='text-foreground'>{texts.askForResendVerificationCodeText}</p>
                <button
                  type="button"
                  onClick={onClickResendCode}
                  className="px-2 py-1.5 font-black text-foreground lg:hover:text-gray-400 active:text-gray-400"
                >
                  {texts.resendVerificationCodeText}
                </button>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}