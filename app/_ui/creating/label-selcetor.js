'use client'

import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { classNames } from '@/app/_lib/general'
import { TagIcon } from '@heroicons/react/24/outline'

export default function LabelSelector({ labels, labelled, setLabelled }) {
  return (
    <>
      <Listbox as="div" value={labelled} onChange={setLabelled} className="flex-shrink-0">
        {({ open }) => (
          <>
            <Label className="sr-only">Add a label</Label>
            <div className="relative">
              <ListboxButton className="relative max-w-full inline-flex items-center whitespace-nowrap rounded-full bg-gray-300/25 pl-3 pr-2 py-2 text-sm font-medium active:bg-gray-200/50 lg:hover:bg-gray-200/50 transition-colors sm:px-3">
                <TagIcon
                  className={classNames(
                    labelled.value === null ? 'text-foreground' : '',
                    'size-5 flex-shrink-0 '
                  )}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    labelled.value === null ? 'text-foreground' : '',
                    'truncate mx-2 text-xs'
                  )}
                >
                  {labelled.value === null ? 'No Label' : labelled.name}
                </span>
              </ListboxButton>

              <Transition
                show={open}
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions className="absolute left-0 bottom-11 z-10 mt-1 max-h-56 overflow-y-scroll rounded-xl bg-background shadow ring-1 ring-gray-400/25 ring-opacity-5 focus:outline-none text-xs">
                  {labels.map((label) => (
                    <ListboxOption
                      key={label.value}
                      className={({ focus }) =>
                        classNames(
                          focus ? 'bg-gray-400/25' : '',
                          !focus ? 'bg-background' : '',
                          label.value === null ? 'text-red-700' : 'text-foreground',
                          'relative cursor-default select-none p-3'
                        )
                      }
                      value={label}
                    >
                      <div className="flex items-center">
                        <span className="block truncate font-medium">{label.name}</span>
                      </div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </>
  )
}