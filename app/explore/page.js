'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { classNames } from "@/app/_lib/general"

import { useEffect, useState } from "react"

import { useScrollDirection } from '@/app/_lib/hooks/useScrollDirection'

import TradeGPM from "@/app/_ui/explore/tradeGPM"
import ExploreTrading from "@/app/_ui/explore/trading"
import Intelligent from "@/app/_ui/explore/intelligent"
import ExploreTimeline from "@/app/_ui/explore/timeline"

import Spinner from "@/app/_ui/spinner"

const navigations = [
  {
    name: 'Timeline',
    section: <ExploreTimeline />,
  },
  {
    name: 'Marketplace',
    section: <ExploreTrading />,
  },
  {
    name: 'Trade GPM',
    section: <TradeGPM />,
  },
  {
    name: 'Intelligent',
    section: <Intelligent />,
  },
]

export default function Explore() {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine)
    }

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    // Initial check
    updateOnlineStatus()

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  const { showNavbar } = useScrollDirection({
    threshold: 10,
    topOffset: 200,
  })

  return (
    <div>
      <div className={classNames(
        !showNavbar && "opacity-25 -translate-y-12",
        "sticky top-0 pt-safe-10 bg-background flex items-center justify-center px-3 z-40 md:hidden transition-all duration-300"
      )}
      >
        <div className="font-bold">{isOffline ? <Spinner size="20" /> : 'Explore'}</div>
      </div>

      <TabGroup>
        <div className={classNames(
          showNavbar
            ? "border-b-0 border-gray-400/15 md:border-b-0"
            : "opacity-25 -translate-y-12 md:opacity-100 md:border-gray-400/15 md:translate-y-0 pointer-events-none md:pointer-events-auto",
          "bg-background sticky top-safe-34 pt-2 md:fixed md:left-0 md:top-14 md:w-80 xl:w-96 md:h-full md:border-e md:px-1 z-40 transition-all duration-300"
        )}
        >
          <h1 className="hidden md:block text-md font-bold px-3 md:px-6 mb-10 mt-2">
            {isOffline ? <Spinner size="20" /> : 'Explore'}
          </h1>
          <TabList className="flex md:flex-col gap-2 px-2 mb-1 py-2">
            {navigations.map((navigation) => (
              <Tab
                key={navigation.name}
                className={({ selected }) =>
                  classNames(
                    selected ? 'text-foreground bg-gray-300/25 shadow-sm md:shadow-none scale-105 md:scale-100' : 'text-gray-400',
                    'flex-1 whitespace-nowrap rounded-full text-xs md:flex-none md:text-sm md:font-medium md:flex md:hover:bg-gray-400/15 md:pe-3 md:ps-4 md:py-4 md:rounded-xl py-2 outline-none transition-all'
                  )
                }
              >
                <div className="flex items-center justify-center md:justify-between w-full">
                  <p className="mx-4 md:mx-0">{navigation.name}</p>
                  <ChevronRightIcon className="size-4 hidden md:block" />
                </div>
              </Tab>
            ))}
          </TabList>
        </div>
        <TabPanels as="div">
          {navigations.map((navigation) => (
            <TabPanel key={navigation.name} className="space-y-8 md:ml-80 xl:ml-96">
              <div className="grid grid-cols-1 gap-2">
                {navigation.section}
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div >
  )
}