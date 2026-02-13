'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { useUserStore } from '@/app/_lib/hooks/store'
import Dropdown from '@/app/_ui/form/dropdown'

export default function ProductQuickview({ product, handleDelete, open, setOpen }) {
  const user = useUserStore((state) => state.user)
  if (!product) return null

  const isOwner = product.producer_id?.username === user.username

  return (
    <Transition show={open}>
      <Dialog className="relative z-50" onClose={setOpen}>
        {/* Overlay */}
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xl transition-opacity pointer-events-none" />
        </TransitionChild>

        {/* Modal panel */}
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-25"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-25"
          >
            <DialogPanel className="w-full h-5/6 max-w-md overflow-hidden text-left relative text-white">
              {/* Close button */}
              <button
                type="button"
                className="absolute top-8 right-8 sm:top-10 sm:right-10 p-2 rounded-full bg-gray-400/25 backdrop-blur-sm lg:hover:bg-gray-300 active:bg-gray-300 transition z-20"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="size-6 text-black" />
              </button>

              <div className="flex flex-col gap-6 p-6 sm:p-8">
                {/* Product image */}
                <div className="sm:col-span-5 relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-gray-400/50 backdrop-blur-lg">
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                    unoptimized
                  />
                </div>

                {/* Product info */}
                <div className="flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl md:text-3xl font-bold">{product.name}</h2>
                    {isOwner && (
                      <Dropdown
                        size="7"
                        color="white"
                        setOpen={setOpen}
                        productId={product.id}
                        onDelete={handleDelete}
                      />
                    )}
                  </div>

                  <p className="text-3xl font-semibold text-indigo-300 drop-shadow-lg mb-10">
                    {product.currency} {product.price}
                  </p>

                  <Link
                    href={'/products/' + window.btoa(product.id)}
                    className="inline-block text-center py-2 px-4 bg-indigo-600 lg:hover:bg-indigo-700 active:bg-indigo-700 text-white rounded-3xl font-medium transition"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}