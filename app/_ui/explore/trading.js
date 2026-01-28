import { useState } from 'react'

import SearchInHsCodes from '@/app/_ui/explore/search-in-hscode'
import SearchedItems from '@/app/_ui/explore/searched-items'
import TypeSelector from '@/app/_ui/creating/type-sections'
import Spinner from '@/app/_ui/spinner'

const mailingLists = [
  { id: 1, title: 'Imports', value: 'imports' },
  { id: 2, title: 'Exports', value: 'exports' },
]

const inputs = [
  {
    selector: [{
      id: 'country',
      type: 'text',
      name: 'Country',
      placeholder: 'Please enter a country/territory or region name',
    }],
    radios: [
      { id: 'country', title: 'Country' },
      { id: 'region', title: 'Region' },
    ],
  },
  {
    selector: [{
      id: 'partner',
      type: 'text',
      name: 'Partner',
      placeholder: 'Please enter a country/territory or region name (optional)',
    }],
    radios: [
      { id: 'partner', title: 'Partner' },
      { id: 'region', title: 'Region' },
    ],
  },
]

export default function ExploreTrading() {
  const [hasHS, setHasHS] = useState(true)
  const [filter, setFilter] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchedOpen, setSearchedOpen] = useState(false)
  const [selectedMailingLists, setSelectedMailingLists] = useState('')

  const [inputValues, setInputValues] = useState({
    country: '',
    partner: '',
    radioCountry: '',
    radioPartner: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInputValues({
      ...inputValues,
      [name]: value,
    })
  }

  const handleSearch = () => {
    setFilter({
      inputValues,
      type: selectedMailingLists,
      hsCode: searchQuery
    })
    setSearchedOpen(true)
  }

  if (!hasHS) {
    return (
      <div className='mt-40 text-center w-full lg:col-span-3'>
        <Spinner size="20" />
      </div>
    )
  }

  return (
    <>
      <div className='pt-3 md:pt-0 md:-mt-1'>
        <div className='px-2.5 xl:px-4 lg:mr-80 xl:mr-96'>
          <fieldset>
            <legend className="text-sm font-semibold leading-6">HS Code Product Finder</legend>
            <p className="text-xs pt-1">
              By utilizing HS codes, businesses can ensure compliance with international trade regulations, facilitate smooth customs processes, and accurately track tariff and trade statistics.
            </p>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 items-center justify-between mt-6'>
              <TypeSelector
                mailingLists={mailingLists}
                selectedMailingLists={selectedMailingLists}
                setSelectedMailingLists={setSelectedMailingLists}
              />

              <SearchInHsCodes
                setHasHS={setHasHS}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </fieldset>


          <fieldset className='grid grid-cols-1 ld:grid-cols-2 mt-6'>
            <div className="space-y-6">
              {inputs.map((input, index) => (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3' key={index}>
                  <div className='flex items-center gap-4'>
                    {input.selector.map((selector) => (
                      <input
                        key={selector.id}
                        name={selector.id}
                        type={selector.type}
                        onChange={handleInputChange}
                        placeholder={selector.placeholder}
                        className="block w-full rounded-2xl py-2 px-3.5 bg-transparent shadow-sm border border-gray-400/25 placeholder:text-gray-400 placeholder:text-xs focus:outline-none focus:border-foreground"
                      />
                    ))}
                  </div>

                  <div className='flex w-44'>
                    {input.radios.map((radio) => (
                      <div key={radio.id} className="flex items-center mx-auto">
                        <input
                          id={input.id}
                          name={`radio-${index}`}
                          value={radio.id}
                          type="radio"
                          onChange={() => {
                            handleInputChange({
                              target: {
                                name: `radio${radio.title}`,
                                value: radio.id,
                              },
                            })
                          }}
                          className="appearance-none size-6 p-0.5 border cursor-pointer border-gray-400/25 rounded-lg bg-transparent checked:bg-emerald-600 checked:border-emerald-600 checked:after:content-['✓'] checked:after:text-white checked:after:block checked:after:text-center checked:after:leading-5"
                        />
                        <label htmlFor={radio.id} className="ml-3 block text-xs font-medium leading-6">
                          {radio.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          <div className='grid mt-6'>
            <button
              onClick={handleSearch}
              className='rounded-2xl py-2 bg-foreground text-background transition-colors active:bg-gray-400/75 disabled:bg-gray-400/25'
              disabled={!searchQuery}
            >
              Search
            </button>
          </div>
        </div>

        <div className="hidden xl:fixed xl:right-0 xl:inset-y-0 xl:z-0 xl:flex xl:w-96 xl:flex-col mt-14">
          <div className="h-full overflow-y-scroll xl:grid xl:grid-cols-1 xl:gap-8 p-3 mr-1">
            <Statistics />
          </div>
        </div>

        <div className="xl:hidden relative w-full overflow-x-auto snap-x snap-mandatory whitespace-nowrap mt-6 mb-safe-20">
          <div className="mx-2.5 inline-flex gap-x-4">
            <Statistics />
          </div>
        </div>
      </div>

      <SearchedItems
        filter={filter}
        open={searchedOpen}
        setOpen={setSearchedOpen}
      />
    </>
  )
}

const tradeMap = [
  { id: 1, title: 'Import', img: 'https://www.trademap.org/Preview/TempFiles/ChartPic_000227.png?bbf2ce33-2d0e-4045-8935-0f1538889122' },
  { id: 2, title: 'Import', img: 'https://www.trademap.org/Preview/TempFiles/ChartPic_000228.png?dbfca5a7-6ee1-4929-ab1d-c76300848ab5' },
  { id: 3, title: 'Import', img: 'https://www.trademap.org/Preview/TempFiles/MapPic_000116.png?d19336a2-664d-40d7-85e0-21aca75ce432' },
]

export function Statistics() {
  return
  return tradeMap.map((i, index) => (
    <li key={index} className="inline-flex snap-center w-[calc(100vw-5rem)] scree h-full flex-col text-center xl:w-auto">
      <div className="group relative">
        <div className="relative aspect-[4/3] w-full border border-gray-400/25 overflow-hidden flex items-center rounded-2xl">
          <span className='sr-only'>{i.title}</span>
          <div
            style={{ backgroundImage: `url(${i.img})` }}
            className="aspect-square select-none w-full rounded-xl bg-transparent bg-center bg-contain bg-no-repeat"
          />
        </div>
      </div>
    </li>
  ))
}