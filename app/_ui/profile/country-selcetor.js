'use client'

import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { ChevronDownIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline'

import { classNames } from '@/app/_lib/general'
import { useEffect, useState } from 'react'

export default function CountrySelector({ countries, currentCountry, setCurrentCountry }) {
  const [visibleCount, setVisibleCount] = useState(25)

  useEffect(() => {
    if (currentCountry) {
      localStorage.setItem('currentCountry', currentCountry)
    }
  }, [currentCountry])

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target
    const bottomThreshold = 50
    const isNearBottom = (scrollHeight - scrollTop - clientHeight) <= bottomThreshold
    if (isNearBottom && visibleCount < countries.length) {
      setVisibleCount((prevVisibleCount) => prevVisibleCount + 25)
    }
  }

  return (
    <Listbox as="div" value={currentCountry} onChange={setCurrentCountry}>
      {({ open }) => (
        <>
          <Label className="sr-only">Add a country</Label>
          <div className="relative w-full">
            <ListboxButton className="relative flex items-center whitespace-nowrap rounded-full border px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-400/25 sm:px-3">
              <GlobeAmericasIcon
                className={classNames(
                  'text-foreground',
                  'size-5'
                )}
                aria-hidden="true"
              />
              <span
                className={classNames(
                  'text-foreground',
                  'truncate mx-2 w-44 text-xs text-left'
                )}
              >
                {currentCountry || 'Select a country'}
              </span>
              <ChevronDownIcon
                aria-hidden="true"
                className="mr-2 size-4 text-gray-500 sm:size-4"
              />
            </ListboxButton>

            <Transition
              show={open}
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions
                className="absolute left-0 bottom-12 lg:bottom-[-16.5rem] z-40 mt-1 max-h-64 w-52 overflow-auto rounded-xl bg-background shadow ring-1 ring-gray-400/25 ring-opacity-5 focus:outline-none text-xs"
                onScroll={handleScroll}
              >
                {countries.slice(0, visibleCount).map((country, index) => (
                  <ListboxOption
                    key={index}
                    className={({ focus }) =>
                      classNames(
                        focus ? 'bg-gray-400/25' : '',
                        !focus ? 'bg-background' : '',
                        'relative cursor-default select-none p-3'
                      )
                    }
                    value={country?.official_name_en}
                  >
                    <div className="flex items-center">
                      <span className="block truncate font-medium">{country?.official_name_en}</span>
                    </div>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}