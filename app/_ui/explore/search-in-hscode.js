'use client'

import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { classNames } from '@/app/_lib/general'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function SearchInHsCodes({ setHasHS, searchQuery, setSearchQuery }) {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [filteredData, setFilteredData] = useState([])
  const [visibleCount, setVisibleCount] = useState(50)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/harmonized-system.csv')
        if (!response?.ok) throw new Error('Failed to fetch CSV')
        const csvText = await response.text()
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data)
            setFilteredData(results.data)
            setHasHS(results.data.length > 0)
          },
          error: () => setHasHS(false),
        })
      } catch {
        setHasHS(false)
      }
    }
    loadData()
  }, [setHasHS])

  useEffect(() => {
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase()
      const filtered = data.filter(
        item =>
          item.hscode?.toLowerCase().includes(lowerCaseQuery) ||
          item.description?.toLowerCase().includes(lowerCaseQuery) ||
          item.section?.toLowerCase().includes(lowerCaseQuery)
      )
      setFilteredData(filtered)
    } else {
      const sorted = [...data].sort((a, b) => (a.hscode?.length || 0) - (b.hscode?.length || 0))
      setFilteredData(sorted)
    }
  }, [searchQuery, data])

  useEffect(() => {
    if (!open) setVisibleCount(50)
  }, [open])

  const fetchMore = () => {
    setVisibleCount(prev => prev + 50)
  }

  const handleSelect = (value) => {
    setSearchQuery(value)
  }

  return (
    <>
      <input
        type="text"
        value={searchQuery}
        onClick={() => setOpen(true)}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Please enter HS Code of the product"
        className="block w-full rounded-2xl bg-transparent py-2 px-3.5 black shadow-sm border border-gray-400/25 placeholder:text-gray-400 placeholder:text-xs focus:outline-none active:border-foreground lg:hover:border-foreground"
      />

      <Transition show={open} appear>
        <Dialog className="relative z-50" onClose={setOpen}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-400/25 backdrop-blur-[2px] transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto no-scrollbar p-4 sm:p-6 md:p-20">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="relative mx-auto max-w-3xl mt-20 transform rounded-2xl bg-background py-2 md:py-4 shadow-2xl transition-all">
                {/* <div className='absolute bottom-1 flex items-center justify-center w-full'>
                  <ChevronDownIcon className={classNames(
                    visibleCount < filteredData.length && 'opacity-0 transition-opacity',
                    filteredData.length === 0 && 'opacity-0',
                    'size-6 text-gray-400/50 animate-bounce'
                  )}
                  />
                </div> */}
                <Combobox className="px-2 md:px-4" as='div' value={searchQuery || ''} onChange={handleSelect}>
                  <ComboboxInput
                    className="w-full rounded-xl bg-gray-400/25 px-4 py-1.5 md:py-3 focus:outline-none placeholder:text-gray-400 placeholder:text-xs md:placeholder:text-base"
                    placeholder={`Search in ${data.length} codes`}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery || ''}
                    displayValue={(val) => val || ''}
                  />

                  {filteredData.length > 0 && (
                    <div id="hs-combobox-scroll" className="max-h-[60vh] overflow-y-auto -mb-2 pt-2">
                      <InfiniteScroll
                        dataLength={visibleCount}
                        next={fetchMore}
                        hasMore={visibleCount < filteredData.length}
                        loader={
                          <p className="text-xs md:text-sm text-center p-2 md:p-4 text-gray-400">Loading more...</p>
                        }
                        scrollableTarget="hs-combobox-scroll"
                      >
                        <ComboboxOptions static className="text-xs md:text-sm divide-y divide-gray-400/15">
                          {filteredData.slice(0, visibleCount).map((item, index) => (
                            <ComboboxOption
                              key={`${item.hscode}-${index}`}
                              value={item.hscode}
                              onClick={() => setOpen(false)}
                              className={({ focus }) =>
                                classNames(
                                  'cursor-pointer pl-4 pr-2 py-3 transition-all last:md:mb-2',
                                  focus && 'bg-gray-400/15 rounded-2xl'
                                )
                              }
                            >
                              <div className="grid grid-cols-5 gap-x-3">
                                <p className="font-bold">{item.hscode}</p>
                                <div className="col-span-4">
                                  <p>{item.description}</p>
                                  <div className="grid grid-cols-3 gap-x-2 mt-1 md:mt-3 text-gray-400 text-[10px] md:text-sm">
                                    <p>Section: {item.section},</p>
                                    <p>Parent: {item.parent},</p>
                                    <p>Level: {item.level}</p>
                                  </div>
                                </div>
                              </div>
                            </ComboboxOption>
                          ))}
                        </ComboboxOptions>
                      </InfiniteScroll>
                    </div>
                  )}
                </Combobox>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition >
    </>
  )
}