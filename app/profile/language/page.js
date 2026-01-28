'use client'


import { LanguageIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { Field, Label, Switch } from '@headlessui/react'

import { classNames } from '@/app/_lib/general'

import Papa from 'papaparse'
import Header from '@/app/_ui/header'
import CountrySelector from '@/app/_ui/profile/country-selcetor'

const Languages = [
  { name: 'Arabic', value: 'United Arab Emirates' },
  { name: 'Chinese', value: 'China' },
  { name: 'English (UK)', value: 'United Kingdom' },
  { name: 'English (US)', value: 'United States' },
  { name: 'Franch', value: 'France' },
  { name: 'Persian', value: 'Iran' },
  { name: 'Spanish', value: 'Spain' },
]

export default function Example() {
  const [countries, setCountries] = useState([])
  const [language, setLanguage] = useState(true)
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(false)
  const [currentCountry, setCurrentCountry] = useState('')

  useEffect(() => {
    const storedCountry = localStorage.getItem('currentCountry')
    if (storedCountry) {
      setCurrentCountry(storedCountry)
    }
  }, [])

  useEffect(() => {
    const loadCountries = async () => {
      const response = await fetch('/country-codes.csv')
      const reader = response.body.getReader()
      const result = await reader.read()
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value)

      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          setCountries(results.data)
        },
      })
    }
    loadCountries()
  }, [])

  return (
    <>
      <Header title={'Language and Region'} Icon={LanguageIcon} />

      <main className="px-4 py-28 sm:px-6 lg:flex-auto lg:px-8">
        <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
          <div>
            <h2 className="text-base font-semibold leading-7">Language and Region</h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Choose what language and region to use throughout your account.
            </p>

            <dl className="mt-6 space-y-6 divide-y divide-gray-400/25 border-t border-gray-400/25 text-sm leading-6">
              <div className="pt-6 sm:flex">
                <dt className="font-medium sm:w-64 sm:flex-none sm:pr-6">Language</dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div>{Languages[3].name}</div>
                  <button
                    type="button"
                    className=" font-semibold active:text-gray-500 lg:hover:text-gray-500 disabled:text-gray-300"
                    onClick={() => setLanguage(!language)}
                    disabled
                  >
                    {language ? 'Change to Persian' : 'تغییر به انگلیسی'}
                  </button>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <label htmlFor="country" className="font-medium sm:w-64 sm:flex-none sm:pr-6">
                  Country
                </label>
                <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <CountrySelector
                    countries={countries}
                    currentCountry={currentCountry}
                    setCurrentCountry={setCurrentCountry}
                  />
                </div>
              </div>

              <Field as="div" className="flex pt-6">
                <Label as="dt" className="flex-none pr-6 font-medium sm:w-64" passive>
                  Automatic timezone
                </Label>
                <dd className="flex flex-auto items-center justify-end">
                  <Switch
                    // disabled
                    checked={automaticTimezoneEnabled}
                    onChange={setAutomaticTimezoneEnabled}
                    className={classNames(
                      automaticTimezoneEnabled ? 'bg-foreground' : 'bg-gray-400/25',
                      'flex w-8 cursor-pointer rounded-full p-0.5 ring-1 ring-inset ring-black/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50'
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        automaticTimezoneEnabled ? 'translate-x-3' : 'translate-x-0',
                        'size-4 transform rounded-full bg-background shadow-sm ring-1 ring-black/5 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </dd>
              </Field>
            </dl>
          </div>
        </div>
      </main>
    </>
  )
}
