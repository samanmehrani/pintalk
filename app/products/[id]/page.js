'use client'

import {
  DisclosureButton,
  DisclosurePanel,
  Disclosure,
} from '@headlessui/react'
import {
  ChevronDownIcon,
  ArchiveBoxIcon,
  ChevronUpIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { motion, AnimatePresence } from 'framer-motion'

import ImageGallery from '@/app/_ui/products/image-gallery'
import Header from '@/app/_ui/header'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

import { getAProduct } from '@/app/_lib/api/product'
import { useUserStore } from '@/app/_lib/hooks/store'

import RequsetToBuy from '@/app/_ui/products/requset-to-buy'
import CircleLoader from '@/app/_ui/circleLoader'
import ShareButton from '@/app/_ui/form/Share-button'

export default function Product() {
  const user = useUserStore((state) => state.user)

  const [openDetails, setOpenDetails] = useState(false)

  const [openRequest, setOpenRequest] = useState(false)
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = window.atob(pathname.split('/')[2])
        const res = await getAProduct(productId)
        if (!res?.ok) return
        const data = await res.json()
        setProduct(data)
      } catch (error) {
        setError(true)
      }
    }

    fetchProduct()
  }, [pathname])

  if (error) {
    return (
      <div className='text-center text-gray-400 mt-48'>
        <p className='text-md'>
          Somting went wrong!
        </p>
        <p className='text-sm mt-4 active:text-black lg:hover:text-black' onClick={() => router.back()}>
          &larr; Back
        </p>
      </div>
    )
  }

  if (!product) {
    return (
      <>
        <Header title={'Product'} Icon={ArchiveBoxIcon} />

        <div role="status" className='flex justify-center items-center h-[85vh]'>
          <CircleLoader />
        </div>
      </>
    )
  }

  const productId = window.atob(pathname.split('/')[2])

  const keywordMap = [
    { keywords: ["beauty", "زیبایی"], title: "Beauty" },
    { keywords: ["size", "سایز"], title: "Size" },
    { keywords: ["model", "مدل"], title: "Model" },
    { keywords: ["design", "دیزاین"], title: "Design" },
    { keywords: ["feature", "ویژگی"], title: "Features" },
  ]

  const guessTitle = (detail) => {
    if (!detail) return "Overview"

    const text = detail.toLowerCase()

    for (const item of keywordMap) {
      if (item.keywords.some(k => text.includes(k))) {
        return item.title
      }
    }

    return "Overview"
  }

  return (
    <>
      <Header title={product.name} Icon={ArchiveBoxIcon} />

      <div className="px-3 lg:px-8 py-safe-20">
        <div className="max-w-lg mx-auto">
          <ImageGallery images={product.images} />

          <div className="mt-5 md:mt-10 sm:px-0 relative">

            {/* BUTTON (CLOSED STATE) */}
            {!openDetails && (
              <motion.button
                layoutId="product-details"
                onClick={() => setOpenDetails(true)}
                className="w-full max-w-lg rounded-3xl bg-foreground px-4 py-3 text-sm font-semibold text-background"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                View product details
              </motion.button>
            )}

            {/* EXPANDED PANEL */}
            <AnimatePresence>
              {openDetails && (
                <>
                  {/* BACKDROP */}
                  <motion.div
                    className="fixed inset-0 z-40 bg-black/75"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setOpenDetails(false)}
                  />

                  {/* PANEL */}
                  <motion.div
                    layoutId="product-details"
                    className="
                      fixed z-50 inset-x-0 bottom-7
                      w-[calc(100%-1.25rem)] max-w-xl
                      mx-auto
                      rounded-[32px]
                      text-white
                      bg-gray-200/25 backdrop-blur-lg
                      shadow-lg
                      overflow-hidden
                    "
                    style={{ height: '60vh' }}
                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                  >
                    {/* HEADER */}
                    <div className="flex items-center justify-between p-6">

                      <ShareButton />

                      <button
                        type="button"
                        className="absolute top-3 right-3 p-3 transition z-20"
                        onClick={() => setOpenDetails(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="size-6" />
                      </button>
                    </div>

                    {/* CONTENT */}
                    <div className="h-full flex flex-col overflow-y-auto pb-8 pt-4">
                      <h1 className="text-base font-semibold px-5">
                        {product.name}
                      </h1>

                      <p className="mt-2 text-2xl font-black px-5">
                        {product.currency} {product.price}
                      </p>

                      <div
                        className="mt-4 space-y-6 text-sm/5 px-5"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                      />

                      <div className="mt-6 divide-y divide-gray-400/25 overflow-y-auto pb-safe-20 px-5">
                        {product.details?.map((detail, index) => {
                          let title = "Detail"
                          let description = detail

                          if (detail?.includes(" - ")) {
                            [title, description] = detail.split(" - ")
                          } else {
                            title = guessTitle(detail)
                          }

                          return (
                            <Disclosure key={index} as="div" className="py-4">
                              {({ open }) => (
                                <>
                                  <DisclosureButton className="flex w-full justify-between font-semibold">
                                    <span className='w-5/6 text-start'>
                                      {title?.trim()}
                                    </span>
                                    {open ? <ChevronUpIcon className="size-6" /> : <ChevronDownIcon className="size-6" />}
                                  </DisclosureButton>
                                  <DisclosurePanel className="pt-3 text-sm">
                                    {description?.trim()}
                                  </DisclosurePanel>
                                </>
                              )}
                            </Disclosure>
                          )
                        })}
                      </div>

                      {product.producer_id?.username !== user.username && (
                        <motion.button
                          onClick={() => { setOpenRequest(true); setOpenDetails(false) }}
                          className="mt-auto mb-safe-20 w-full rounded-3xl bg-foreground py-3 text-sm text-background font-medium focus:outline-none"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ scale: 1 }}
                          animate={{ scale: 1.05 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                          Request
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <RequsetToBuy
        open={openRequest}
        setOpen={setOpenRequest}
        productId={productId}
      />
    </>
  )
}