'use client'

import { useImmer } from "use-immer"
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"

export default function DetailsSections({ detailsSections, setDetailsSections }) {
  const [newDetailsSections, setNewDetailsSections] = useImmer("")

  // Function to handle input change
  const handleInputChange = (event) => {
    setNewDetailsSections(event.target.value)
  }

  const addNewDetailsSections = () => {
    setDetailsSections(draft => {
      draft.push(newDetailsSections)
    })
    setNewDetailsSections("")
  }

  const removeSection = (sectionIndex) => {
    const newDetailsSections = detailsSections.filter((_, i) => i !== sectionIndex)
    setDetailsSections(newDetailsSections)
  }

  return (
    <div className="flex-grow py-3">
      <div>
        <p className="font-bold text-md mb-1">Write the details in the format below</p>
        <li className='text-xs ms-4'>Title of Details <b>-</b> Text for details</li>
      </div>
      <div className="min-w-full divide-gray-400/25">
        {detailsSections.map((section, index) => (
          <div key={index} className="flex items-start py-4 text-sm font-medium sm:pl-0">
            <span className="mx-3 w-full" dir="auto">
              {section}
            </span>
            <button type="button" className="ms-auto me-3 text-gray-400 active:text-foreground transition-colors duration-50"
              onClick={() => removeSection(index)}
            >
              <XMarkIcon className='size-4' />
            </button>
          </div>
        ))}
        <div className="py-2 flex items-center gap-x-4">
          <input
            dir="auto"
            type="text"
            className="block w-full rounded-xl py-1.5 px-3 shadow-sm bg-transparent border border-gray-400/25 placeholder:text-gray-400 placeholder:text-xs focus:outline-none focus:border-foreground sm:text-sm sm:leading-6"
            placeholder="Title - Description..."
            value={newDetailsSections}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="justify-center flex-1 rounded-full p-2.5 aspect-square border bg-foreground text-background disabled:border disabled:opacity-10"
            onClick={addNewDetailsSections}
            disabled={!newDetailsSections}
          >
            <CheckIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}