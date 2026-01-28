'use client'

import { useEffect, useState } from "react"
import { useImmer } from "use-immer"

import LabelSelector from "@/app/_ui/creating/label-selcetor"
import DetailsSections from "@/app/_ui/creating/details-sections"
import SearchInHsCodes from '@/app/_ui/explore/search-in-hscode'
import ImageSections from "@/app/_ui/creating//image-sections"
import TypeSelector from "@/app/_ui/creating/type-sections"
import Currency from "@/app/_ui/form/price-input"
import Input from "@/app/_ui/form/input"
import Spinner from "@/app/_ui/spinner"

import { usePathname, useRouter } from "next/navigation"

import { useToast } from '@/app/_ui/toast-context'

import { createNewProduct } from "@/app/_lib/api/product"
import { currencies } from "@/constants/currencies"
import { labels } from "@/constants/labels"

import Link from "next/link"

const mailingLists = [
  { id: 1, title: 'Imports', value: 'imports' },
  { id: 2, title: 'Exports', value: 'exports' },
]

export default function CreateProducts() {
  const { addToast } = useToast()
  const [hasHS, setHasHS] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [productType, setProductType] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [labelled, setLabelled] = useState(labels[0])
  const [imageSections, setImageSections] = useImmer([])
  const [currentCountry, setCurrentCountry] = useState('')
  const [detailsSections, setDetailsSections] = useImmer([])
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])

  const inputs = [
    {
      name: "product-name",
      type: "text",
      placeholder: 'Please enter the product name',
      disabled: false,
      required: true,
    },
    {
      name: "product-description",
      type: "text",
      placeholder: "Please write a description about the product",
      disabled: false
    },
  ]

  const priceInput = {
    name: "product-price",
    placeholder: 'Enter product price',
    disabled: false
  }

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const storedCountry = localStorage.getItem('currentCountry')
    if (storedCountry) {
      setCurrentCountry(storedCountry)
    }
  }, [])

  async function onSubmit(event) {
    setIsPending(true)
    event.preventDefault()
    const formData = new FormData(event.target)

    const name = formData.get('product-name')
    const price = formData.get('product-price')
    const description = formData.get('product-description')

    const newProduct = {
      name,
      price,
      description,
      productType,
      type: productType,
      hscode: searchQuery,
      label: labelled.value,
      country: currentCountry,
      details: detailsSections,
      currency: selectedCurrency.symbol,
    }

    const fullFormData = new FormData()
    fullFormData.append("product", JSON.stringify(newProduct))

    if (imageSections.length === 0) {
      addToast({
        message: 'No images selected',
        description: 'Please add at least one image for your product.',
        type: 'warning',
        position: 'bottom-safe left-4 md:bottom-5',
      })
      setIsPending(false)
      return
    }

    imageSections.forEach((file) => {
      if (file instanceof File) {
        fullFormData.append("images", file)
      }
    })

    try {
      await createNewProduct(fullFormData)

      addToast({
        message: 'Product created',
        description: 'Thank you! Your product has been successfully created.',
        type: 'success',
        position: 'bottom-safe left-4 md:bottom-5',
      })

      pathname === '/profile'
        ? window.location.reload()
        : router.push('/profile')
    } catch (error) {
      console.error("Error creating product:", error)
      addToast({
        message: 'Error creating product',
        description: 'Something went wrong while creating your product. Please try again.',
        type: 'error',
        position: 'bottom-safe left-4 md:bottom-5',
      })
    }
    setIsPending(false)
  }

  return (
    <form className="grid gap-y-3" onSubmit={onSubmit}>
      {inputs.map((input) => (
        <div key={input.name}>
          <Input input={input} />
        </div>
      ))}

      <SearchInHsCodes
        setHasHS={setHasHS}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Currency
        priceInput={priceInput}
        currencies={currencies}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
      />

      <div className="border-y border-gray-400/25 py-3">
        <p className="text-sm">Your current country:{' '}
          <span className="text-xs font-semibold">
            {currentCountry
              ? currentCountry
              : <Link className="lg:hover:text-gray-600 active:text-gray-600" href='/profile/language'>Not selected, Choose now</Link>}
          </span>
        </p>
      </div>

      <div className="py-3">
        <p className="font-semibold text-md">Label for easy categorization</p>
        <p className='text-xs pb-2'>Choosing a label helps to find your product more easily in the category section</p>
        <LabelSelector
          labels={labels}
          labelled={labelled}
          setLabelled={setLabelled}
        />
      </div>

      <div className="py-3">
        <legend className="font-semibold text-md">Product import and export</legend>
        <p className="text-xs pb-2">
          Choose whether you want to export this product or request to import it
        </p>
        <TypeSelector
          mailingLists={mailingLists}
          selectedMailingLists={productType}
          setSelectedMailingLists={setProductType}
        />
      </div>

      <DetailsSections
        detailsSections={detailsSections}
        setDetailsSections={setDetailsSections}
      />

      <ImageSections
        imageSections={imageSections}
        setImageSections={setImageSections}
      />

      <div className='mt-auto mb-safe pb-12 md:pb-0'>
        <button
          type="submit"
          className="flex w-full justify-center rounded-full bg-foreground px-3 py-1.5 text-sm font-semibold leading-6 text-background shadow-sm active:bg-gray-400/25 focus:outline-none disabled:bg-foreground disabled:opacity-25"
          disabled={isPending || imageSections.length === 0}
        >
          {isPending ? <Spinner size="24" /> : 'Create Products'}
        </button>
      </div>
    </form >
  )
}