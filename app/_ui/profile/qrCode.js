'use client'

import { useQRCode } from 'next-qrcode'
import { useEffect, useState } from 'react'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { DeviceTabletIcon, QrCodeIcon, XMarkIcon } from '@heroicons/react/24/outline'

import Spinner from '@/app/_ui/spinner'
import Image from 'next/image'

export default function QrCode({ open, setOpen, currentUserUsername, userProfile }) {
  const [scannerEnable, setScannerEnable] = useState(false)
  const [isDark, setIsDark] = useState(false)
  // const [result, setResult] = useState('No QR code scanned yet.')

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(media.matches)

    const listener = (e) => setIsDark(e.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [])

  const profileURL = currentUserUsername ? `https://pintalk.vercel.app/${currentUserUsername}` : ''

  const { Canvas } = useQRCode()

  return (
    <Transition show={open}>
      <Dialog className="relative z-40" onClose={() => { }} >
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-auth-overlay backdrop-blur-xl transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto select-none">
          <div className="flex h-screen items-center justify-center text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 sm:translate-y-0 sm:scale-50"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 sm:translate-y-0 sm:scale-50"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-2xl text-right shadow-xl transition-all w-screen h-screen py-safe-20">
                <div className='flex items-center justify-between px-0.5 -mt-2'>
                  <div className='px-3'>
                    {scannerEnable
                      ? <DeviceTabletIcon className="size-6 transition-none" aria-hidden="true" onClick={() => setScannerEnable(!scannerEnable)} />
                      : <QrCodeIcon className="size-6 transition-none" aria-hidden="true" />
                    }
                  </div>
                  <div className="mx-auto w-full max-w-md">
                    <h2 className="text-center text-xl font-medium">
                      @{currentUserUsername}
                    </h2>
                  </div>
                  <button
                    type="button"
                    className="rounded-xl text-gray-400 lg:hover:text-gray-500 active:text-gray-500 focus:outline-none px-3"
                    onClick={() => { setOpen(false) }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="size-6" aria-hidden="true" />
                  </button>
                </div>
                <div className='relative flex flex-col items-center justify-center h-full'>
                  {scannerEnable
                    ?
                    <div className='flex flex-col items-center gap-4 justify-center mt-3'>
                      <div
                        id='reader'
                        className='aspect-square w-[320px] mx-auto'
                      />
                    </div>
                    : profileURL ?
                      <div className='relative flex items-center justify-center my-auto size-[290px] rounded-[50px] overflow-hidden animate-rotate-in-y shadow-xl'>
                        <Canvas
                          text={profileURL}
                          options={{
                            margin: 6,
                            type: 'image/jpeg',
                            quality: 10,
                            errorCorrectionLevel: 'L',
                            scale: 3,
                            width: 300,
                            color: {
                              dark: '#00000000',
                              light: isDark ? '#f0f0f0' : '#A5B4FC',
                            }
                          }}
                        />

                        <div className="absolute size-20 rounded-full overflow-hidden bg-gray-400/25 backdrop-blur-sm">
                          <Image
                            src={userProfile ? userProfile : '/default-avatar.png'}
                            alt="User Profile"
                            fill
                            className="object-cover object-center"
                            unoptimized
                          />
                        </div>
                      </div>
                      :
                      <div className='py-32'>
                        <Spinner size="20" />
                      </div>
                  }
                  <GlitterRain />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

function GlitterRain({ count = 14 }) {
  return (
    <div className="pointer-events-none absolute bottom-12 inset-x-0 w-[210px] mx-auto h-40 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="size-1 glitter -mt-2"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 1.2}s`,
            animationDuration: `${1 + Math.random()}s`,
          }}
        />
      ))}
    </div>
  )
}