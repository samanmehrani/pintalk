'use client'

import { Radio, RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { classNames } from '@/app/_lib/general'

export default function TypeSelector({ selectedMailingLists, setSelectedMailingLists, mailingLists }) {
  return (
    <RadioGroup
      value={selectedMailingLists}
      onChange={setSelectedMailingLists}
      className="grid grid-cols-2 gap-x-3 lg:order-last lg:mb-0"
    >
      {mailingLists.map((mailingList) => (
        <Radio
          key={mailingList.id}
          value={mailingList.value}
          className={({ checked }) =>
            classNames(
              checked && 'border-emerald-400',
              !checked && 'border-gray-400/25',
              'relative flex cursor-pointer rounded-2xl border p-2.5 ps-3.5 focus:outline-none shadow-sm outline-none'
            )
          }
        >
          {({ checked }) => (
            <>
              <span className="flex flex-1 items-center">
                <span className="flex flex-col">
                  <div className={classNames(
                    checked && 'font-semibold text-emerald-600',
                    !checked && 'text-gray-400',
                    "block text-xs py-1"
                  )}>
                    <span>{mailingList.title}</span>
                  </div>
                </span>
              </span>
              <div
                className={classNames(
                  !checked && "invisible",
                  "size-6 p-0.5 rounded-lg bg-emerald-500 flex items-center justify-center my-auto after:content-['✓'] text-white"
                )}
              />
            </>
          )}
        </Radio>
      ))}
    </RadioGroup>
  )
}