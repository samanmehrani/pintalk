'use client'

import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels
} from '@headlessui/react'

import { Fragment } from 'react'

import CompetitorsTab from './competitors'
import ProductsTab from './products'
import PostsTab from './posts'
import EmcTab from './emc'

export default function TabProfile({ user }) {

  const tabsList = [
    {
      name: 'Products',
      queryValue: 'products',
      featured: <ProductsTab user={user} />
    },
    {
      name: 'Posts',
      queryValue: 'posts',
      featured: <PostsTab user={user} />
    },
    {
      name: 'Competitors',
      queryValue: 'competitors',
      featured: <CompetitorsTab />
    },
    {
      name: 'EMC',
      queryValue: 'emc',
      featured: <EmcTab />
    },
  ]

  return (
    <>
      <TabGroup>
        <div className=" bg-background sticky top-safe-34 pt-5 pb-2 z-30">
          <TabList className="flex gap-x-2 px-2 md:px-4 lg:px-5">
            {tabsList.map((tab) => (
              <Tab
                key={tab.name}
                className="flex-1 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium text-gray-400 data-[selected]:bg-gray-300/25 data-[selected]:shadow-sm data-[selected]:scale-105 data-[selected]:text-foreground outline-none transition-all"
              >
                {tab.name}
              </Tab>
            ))}
          </TabList>
        </div>
        <TabPanels as={Fragment}>
          {tabsList.map((tab) => (
            <TabPanel key={tab.name}>
              {tab.featured}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </>
  )
}