'use client'

import * as texts from '@/app/_text/common'

import {
  requestCodeToEmail as requestCodeApi
} from '@/app/_lib/api/auth'

import { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { ChevronLeftIcon, FireIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { useToast } from '@/app/_ui/toast-context'

import GlassCard from '@/app/_ui/auth/glassCard'
import AuthSteps from '@/app/_ui/auth/AuthSteps'

import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [emailSecret, setEmailSecret] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPending, setIsPending] = useState(false)
  const [started, setStarted] = useState(false)
  const [email, setEmail] = useState('')

  const router = useRouter()

  const { addToast } = useToast()

  const stepNames = ['Email Address', 'Confirmation Code', 'Sign Up']

  const requestCode = async (email) => {
    const response = await requestCodeApi(email)

    if (response.ok) {
      setActiveIndex(1)
    } else if (response.status === 409) {
      addToast({
        message: 'Already sent',
        description: 'A code has already been sent to this email. Please check your inbox.',
        type: 'error',
        position: 'bottom-9 left-4 md:bottom-5'
      })
    }
  }

  const renderButton = (condition, onClick, icon) => (
    condition
      ? <button onClick={onClick} className="px-3 py-1 text-sm text-foreground lg:hover:scale-125 active:scale-110 transition-transform">{icon}</button>
      : <div className="w-11" />
  )

  return (
    <div className="relative flex flex-col items-center justify-center h-screen md:h-[90vh] overflow-x-hidden">
      <div className="absolute top-0 inset-x-0 w-full h-[40vh] md:h-[60vh] bg-gradient-to-b md:via-purple-700 md:from-transparent md:to-transparent from-purple-700 pointer-events-none transition-all" />

      <div className='flex flex-col items-center justify-center gap-y-3 mt-safe pt-safe-20 mb-5 z-10'>
        <FireIcon className="size-12" aria-hidden="true" />
        <p className="text-xl font-black opacity-25">Welcome to</p>
        <h1 className="text-5xl font-black font-sans">{texts.appName}</h1>
        <p className="mt-3 text-base opacity-50 px-10 text-center whitespace-pre-line">
          {"Share Memorable Moments \n with your Friends."}
        </p>
      </div>

      <GlassCard />

      <div className='mb-safe pb-4 grid items-end justify-center gap-4 w-full'>
        <AnimatePresence>
          {!started ? (
            <>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStarted(true)}
                className="flex items-center justify-center z-10 px-24 py-3 h-12 rounded-full bg-foreground text-background font-bold"
              >
                Get Started
              </motion.button>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/')}
                className="md:hidden flex items-center justify-center z-10 px-24 py-3 h-12 rounded-full border border-gray-400/50 font-bold"
              >
                Back to Home
              </motion.button>
            </>
          ) : (
            <div className='h-28' />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {started && (
          <>
            {/* Backdrop blur */}
            <motion.div
              key="auth-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-auth-overlay backdrop-blur-2xl"
            />

            {/* Auth box */}
            <motion.div
              key="auth-box"
              initial={{ opacity: 0, y: 60, scale: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0 }}
              className="fixed inset-x-0 bottom-0 md:bottom-10 z-50 flex justify-center px-6 pb-safe"
            >
              <div className="bg-auth rounded-[32px] w-full max-w-md p-5">
                <div className="flex items-center justify-between">
                  {
                    renderButton(
                      activeIndex === 1,
                      () => setActiveIndex(activeIndex - 1),
                      <ChevronLeftIcon className="size-5" />
                    )
                  }

                  <h2 className="text-base md:text-lg font-black text-foreground">
                    {stepNames[activeIndex]}
                  </h2>

                  {
                    renderButton(
                      activeIndex < 2,
                      () => setStarted(false),
                      <XMarkIcon className="size-5" />
                    )
                  }
                </div>


                <AuthSteps
                  activeIndex={activeIndex}
                  {...{
                    email,
                    setEmail,
                    isPending,
                    setIsPending,
                    requestCode,
                    setEmailSecret,
                    setActiveIndex,
                    emailSecret,
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}