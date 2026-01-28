'use client'

import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import CreatePost from '@/app/_ui/creating/post'
import CreateProducts from '@/app/_ui/creating/products'

import { useScrollDirection } from '@/app/_lib/hooks/useScrollDirection'
import { useDeviceType } from "@/app/_lib/hooks/useDeviceType"
import { useUserStore } from '@/app/_lib/hooks/store'
import { classNames } from '@/app/_lib/general'
import { labels } from '@/constants/labels'

export default function Create() {
  const user = useUserStore((state) => state.user)
  const router = useRouter()

  const [mounted, setMounted] = useState(false)

  const { isLaptop } = useDeviceType()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && isLaptop) {
      router.replace('/profile')
    }
  }, [mounted, isLaptop, router])

  const { showNavbar: showHeader } = useScrollDirection({
    threshold: 10,
    topOffset: 200,
  })

  const categories = [
    {
      id: 'product',
      name: 'Product',
      sections: <CreateProducts labels={labels} />,
    },
    {
      id: 'post',
      name: 'Post',
      sections: <CreatePost labels={labels} user={user} />,
    },
  ]

  return (
    <>
      <div
        className={classNames(
          !showHeader && "opacity-25 -translate-y-12",
          "flex items-center justify-center font-bold bg-background sticky top-0 z-40 pt-safe-10 transition-all duration-300"
        )}
      >
        <span>Sell & Write</span>
      </div>

      <TabGroup>
        <div className={classNames(
          showHeader
            ? "border-b-0 border-gray-400/15 md:border-b-0"
            : "opacity-25 -translate-y-12 md:opacity-100 md:translate-y-0",
          "bg-background sticky top-safe-34 pt-2 z-40 transition-all duration-300"

        )}>
          <TabList className="-mb-px flex px-4 gap-x-10 py-2">
            {categories.map((category) => (
              <Tab
                key={category.name}
                className={({ selected }) =>
                  classNames(
                    selected ? 'text-foreground bg-gray-300/25 shadow-sm md:shadow-none scale-105 md:scale-100' : 'text-gray-400',
                    'flex-1 whitespace-nowrap rounded-full text-xs py-2 transition-all outline-none'
                  )
                }
              >
                {category.name}
              </Tab>
            ))}
          </TabList>
        </div>
        <TabPanels as={Fragment} >
          {categories.map((category) => (
            <TabPanel key={category.name} className="p-3 lg:px-4">
              {category.sections}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </>
  )
}