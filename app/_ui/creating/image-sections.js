'use client'

import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef } from "react";

import Image from "next/image"

export default function ImageSections({ imageSections, setImageSections }) {
  const objectUrlsRef = useRef([])

  const addNewImageSection = (event) => {
    const files = Array.from(event.target.files)

    if (files.length) {
      setImageSections(draft => {
        for (let file of files) {
          if (draft.length < 10) {
            draft.push(file)
            objectUrlsRef.current.push(URL.createObjectURL(file))
          } else {
            break
          }
        }
      })
      event.target.value = null
    }
  }

  const removeSection = (sectionIndex) => {
    const newImageSections = imageSections.filter((_, i) => i !== sectionIndex)

    const removedUrl = objectUrlsRef.current[sectionIndex]
    if (removedUrl) URL.revokeObjectURL(removedUrl)
    objectUrlsRef.current.splice(sectionIndex, 1)

    setImageSections(newImageSections)
  }

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach(url => {
        URL.revokeObjectURL(url)
      })
      objectUrlsRef.current = []
    }
  }, [])

  return (
    <>
      <div>
        <p className="font-bold text-md mb-1">Images</p>
        <p className="text-xs">You can upload up to <b>10 photos</b> for each product.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-5">
        {imageSections.map((file, index) => (
          <div
            key={index}
            className="relative"
          >
            <div className="overflow-hidden flex justify-center items-center rounded-xl border border-gray-400/25 aspect-square">
              <Image
                src={objectUrlsRef.current[index]}
                alt={`img-${index + 1}`}
                fill
                className="object-cover rounded-xl"
                unoptimized
              />
              <button
                type="button"
                className="absolute top-0 right-0 z-20 m-1.5 p-1.5 rounded-full bg-opacity-35 bg-black active:scale-105 transition-colors duration-50"
                onClick={() => removeSection(index)}
              >
                <XMarkIcon className='size-4' />
              </button>
            </div>
          </div>
        ))}

        {imageSections.length < 10 && (
          <div className="flex justify-center items-center rounded-3xl border border-dashed border-gray-400/25 aspect-square">
            <div className="text-center">
              <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
              <div className="mt-4 grid text-sm/6 text-gray-400">
                <label
                  htmlFor="file-upload"
                  className="relative text-center cursor-pointer bg-background font-semibold text-foreground focus-within:outline-none lg:hover:text-gray-400 active:text-gray-400"
                >
                  <p>Upload a file</p>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    onChange={addNewImageSection}
                    accept=".png,.jpeg,.jpg"
                    className="sr-only bg-transparent"
                    multiple
                  />
                </label>
              </div>
              <p className="text-[9px]/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}