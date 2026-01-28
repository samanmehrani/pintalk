'use client'

import InfiniteScroll from 'react-infinite-scroll-component'

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { FireIcon, XMarkIcon } from '@heroicons/react/24/outline'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { getProductsByHsCode } from '@/app/_lib/api/product'

import LoadingPoroductExplore from '@/app/_ui/loading/searched-product-exp'

export default function SearchedItems({ open, setOpen, filter }) {
  const [page, setPage] = useState(1)
  const [error, setError] = useState(false)
  const [products, setProducts] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const router = useRouter()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (open && filter?.hsCode) {
      setProducts([])
      setPage(1)
      setHasMore(true)
      loadInitial()
    }
  }, [open, filter])

  const loadInitial = async () => {
    if (!filter?.hsCode) return

    const res = await getProductsByHsCode(filter, 1)
    if (!res?.ok) return
    const data = await res.json()
    if (!data || data.length === 0) {
      setHasMore(false)
      setError(true)
      return
    }

    setProducts(data)
    setError(false)
    setHasMore(data.length >= 10)
    if (data.length >= 10) {
      setPage(2)
    }
  }

  const fetchMore = async () => {
    try {
      const res = await getProductsByHsCode(filter, page)
      if (!res?.ok) return
      const data = await res.json()

      if (!data || data.length === 0) {
        setHasMore(false)
        return
      }

      setProducts(prev => [...prev, ...data])
      setHasMore(data.length >= 10)
      if (data.length >= 10) {
        setPage(prev => prev + 1)
      }
    } catch {
      setHasMore(false)
    }
  }

  return (
    <Transition show={open} as="div">
      <Dialog className="relative z-50" onClose={() => { }}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-400/25 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen select-none mb-32">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-3xl bg-background text-right shadow-xl transition-all w-screen max-w-4xl pt-3">
                <div className='bg-background flex items-center justify-between pb-3'>
                  <div className='px-3'>
                    <FireIcon className="size-6 transition-none" aria-hidden="true" />
                  </div>
                  <div className="mx-auto w-full max-w-md">
                    <h2 className="flex items-start justify-center gap-2.5 text-xs">
                      {filter.hsCode && <span className='bg-gray-300/25 px-3.5 pt-1.5 pb-1 rounded-full'>HS Code: {filter.hsCode}</span>}
                      {filter.type && <span className='bg-gray-300/25 px-3.5 pt-1.5 pb-1 rounded-full'>Type: {filter.type}</span>}
                    </h2>
                  </div>
                  <button
                    type="button"
                    className="rounded-xl text-gray-400 hover:text-gray-500 focus:outline-none px-3"
                    onClick={() => { setProducts([]); setOpen(false) }}
                  >
                    <XMarkIcon className="size-6" aria-hidden="true" />
                  </button>
                </div>

                <div id="scrollableDiv" className='h-[450px] overflow-y-scroll'>
                  {!filter.hsCode ? (
                    <div className='py-44 text-center w-full'>
                      <p className='text-gray-400 text-xs'>No filter for search</p>
                    </div>
                  ) : error ? (
                    <div className='py-44 text-center w-full'>
                      <p className='text-gray-400 text-xs'>No Products found</p>
                    </div>
                  ) : (
                    <InfiniteScroll
                      dataLength={products.length}
                      next={fetchMore}
                      hasMore={hasMore}
                      scrollableTarget="scrollableDiv"
                      loader={
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 px-2">
                          {Array(4).fill().map((_, i) => (
                            <LoadingPoroductExplore key={i} />
                          ))}
                        </div>
                      }
                      endMessage={
                        <p className="text-center text-xs text-gray-400 pt-10 pb-14">No Products more!</p>
                      }
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 px-2">
                        {products.map((product, index) => (
                          <div
                            key={index}
                            className="group relative text-xs grid grid-cols-4 p-2 rounded-xl cursor-pointer active:bg-gray-400/25 lg:hover:bg-gray-400/25"
                          >
                            <div
                              onClick={() => router.push('/products/' + window.btoa(product._id))}
                              className="relative aspect-square w-full select-none bg-gray-200 rounded-xl cursor-pointer overflow-hidden"
                            >
                              <Image
                                src={product.images[0].url}
                                alt="Product image"
                                fill
                                className="object-cover object-center"
                                unoptimized
                              />
                            </div>
                            <div className='col-span-3 text-left px-3'>
                              <div className='flex items-center gap-x-2 line-clamp-1'>
                                <span className='text-gray-500'>Producer:</span>
                                <span className='truncate'>{product.producer_id.name}</span>
                                <Link href={`/${product.producer_id.username}`} className='hover:text-gray-500'>
                                  @{product.producer_id.username}
                                </Link>
                              </div>
                              <div className='mb-3'>
                                <p className='line-clamp-2'>
                                  <span className='text-gray-500'>Product Name:{' '}</span>
                                  <span className='font-medium'>{product.name}</span>
                                </p>
                                <p><span className='text-gray-500'>Price:{' '}</span>{product.currency} {product.price}</p>
                              </div>
                              <p>
                                <span className='bg-gray-400/25 px-3 py-0.5 rounded-full text-[9px]'>
                                  {product.label || <span className='bg-gray-400/25 opacity-25'>No Label</span>}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </InfiniteScroll>
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition >
  )
}