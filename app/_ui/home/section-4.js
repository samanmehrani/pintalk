'use client'

import { ArrowUpOnSquareIcon, InformationCircleIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function AddToHomeScreen() {
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true)
      }
    }

    checkIfInstalled()

    window.addEventListener('beforeinstallprompt', () => {
      setIsInstalled(false)
    })

    window.addEventListener('focus', checkIfInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', () => { })
      window.removeEventListener('focus', checkIfInstalled)
    }
  }, [])

  if (isInstalled) {
    return null
  }

  return (
    <div className="lg:flex gap-x-20 justify-center p-5 pb-10" role="alert">
      <div className="w-[136px] h-[300px] relative">
        <Image
          src="/iPhone-13-PRO.png"
          alt=""
          fill
          className="object-contain object-center"
          priority
        />
      </div>

      <div className="flex items-center my-6">
        <div className="mt-2">
          <div className="flex items-center -ml-2">
            <InformationCircleIcon className="size-7 mb-1 mr-2" aria-hidden="true" />
            <h3 className="font-medium">Install app on your iphone</h3>
          </div>
          <p className="mt-4">
            Want to use this website as a mobile app? You can easily add it to your home screen!
          </p>
          <ol className="grid gap-3 list-decimal mt-3 ml-4">
            <li><span className="flex">On your mobile browser, tap <ArrowUpOnSquareIcon className="size-5 mx-1" aria-hidden="true" /> icon. </span></li>
            <li>Select <span className="font-semibold">Add to Home Screen</span> from the options.</li>
            <li>Follow the prompts to place the icon on your device.</li>
          </ol>
        </div>
      </div>
    </div>
  )
}