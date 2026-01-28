import { useState } from "react"
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { classNames } from "@/app/_lib/general"

export default function Search({ setQuery }) {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (event) => {
    const value = event.target.value
    setInputValue(value)
    setQuery(value)
  }

  const clearSearch = () => {
    setInputValue('')
    setQuery('')
  }

  return (
    <div className="relative lg:hidden w-full flex items-center -mb-6">
      <input
        type="search"
        name="search"
        value={inputValue}
        onChange={handleChange}
        placeholder='Search by product name...'
        className='absolute appearance-none bg-input backdrop-blur-md shadow-sm rounded-full w-full focus:outline-none pl-9 pr-11 h-10 placeholder-foreground placeholder:text-xs placeholder:opacity-95 focus:placeholder:opacity-0'
      />
      <XMarkIcon
        className={classNames(
          inputValue ? 'opacity-100' : 'opacity-0',
          "text-foreground active:text-black active:scale-125 absolute right-1 size-5 mx-3 mb-0.5 transition-opacity"
        )}
        onClick={clearSearch}
      />
      <MagnifyingGlassIcon className="text-foreground absolute size-4 mx-3 mb-0.5" />
    </div>
  )
}