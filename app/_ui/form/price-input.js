'use client'

import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { classNames } from '@/app/_lib/general'
import { BanknotesIcon } from '@heroicons/react/24/outline'

export default function Currency({ priceInput, currencies, selectedCurrency, setSelectedCurrency }) {

  return (
    <div className="relative flex items-center">
      <label htmlFor="currency-input" className="mb-2 text-sm font-medium sr-only">Your Amount</label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
          <BanknotesIcon className='size-4' />
        </div>
        <input
          type="number"
          step="any"
          id={priceInput.name}
          name={priceInput.name}
          className="block p-2 w-full ps-10 placeholder:text-xs bg-transparent rounded-s-xl rounded-e-none border-r-0 border-e-gray-40/25 border border-gray-400/25 focus:outline-none"
          placeholder="Enter product price"
          disabled={priceInput.disabled}
          required
        />
      </div>
      <Listbox as="div" value={selectedCurrency} onChange={setSelectedCurrency}>
        {({ open }) => (
          <>
            <Label className="sr-only">Add a label</Label>
            <div className="relative h-11 lg:h-[42px]">
              <ListboxButton
                className="z-10 flex items-center px-2 h-full text-xs font-medium text-center bg-gray-400/25 border border-gray-400/25 rounded-e-xl hover:bg-gray-400/75 focus:outline-none"
              >
                <span
                  className={classNames(
                    selectedCurrency === null ? 'text-gray-300' : 'text-foreground',
                    'truncate w-10'
                  )}
                >
                  {selectedCurrency.symbol}
                </span>
              </ListboxButton>

              <Transition
                show={open}
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions className="absolute right-0 top-11 z-10 mt-1 max-h-56 w-32 overflow-auto rounded-xl bg-background shadow ring-1 ring-gray-400/25 ring-opacity-5 focus:outline-none text-xs">
                  {currencies.map((currency) => (
                    <ListboxOption
                      key={currency.id}
                      className={({ focus }) =>
                        classNames(
                          focus && 'bg-gray-400/25',
                          !focus && 'bg-background',
                          'relative cursor-default select-none px-3 py-2.5'
                        )
                      }
                      value={currency}
                    >
                      <div className="flex items-center">
                        <span className="block truncate font-medium">{currency.name}</span>
                        <span className="block truncate font-medium ml-auto">{currency.symbol}</span>
                      </div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  )
}