'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { FireIcon, XMarkIcon } from '@heroicons/react/24/outline'

import * as texts from '@/app/_text/common'

import Spinner from '@/app/_ui/spinner'
import { useToast } from '@/app/_ui/toast-context'

import { useState } from 'react'

import { sendPurchaseRequest } from '@/app/_lib/api/notification'
import { useUserStore } from '@/app/_lib/hooks/store'

export default function RequsetToBuy({ open, setOpen, productId }) {
  const user = useUserStore((state) => state.user)

  const { addToast } = useToast()

  const [message, setMessage] = useState('')
  const [isPending, setIsPending] = useState(false)

  const handlePurchaseRequest = async () => {
    const requestData = {
      message,
      productId,
      sender_name: user?.name,
      sender_username: user?.username,
    }

    try {
      setIsPending(true)
      const response = await sendPurchaseRequest(requestData)

      addToast({
        message: 'Request sent',
        description: 'Your purchase request has been successfully sent to the seller.',
        type: 'success',
        position: 'bottom-safe left-4 md:bottom-5',
      })

      if (!response?.ok) throw new Error('Failed to send request')

      setIsPending(false)
      setMessage('')
    } catch (err) {

      addToast({
        message: 'Request failed!',
        description: 'Unable to send your purchase request. Please try again later.',
        type: 'error',
        position: 'bottom-safe left-4 md:bottom-5',
      })

      setIsPending(false)
    }
  }

  return (
    <Transition show={open}>
      <Dialog className="relative z-40" onClose={() => { }} >
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/85 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto select-none mb-3">
          <div className="flex min-h-full items-end justify-center p-3 text-center sm:items-center sm:p-0 pb-20">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 -translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-3xl bg-gray-300/25 backdrop-blur-lg text-right shadow-xl transition-all w-screen max-w-sm py-5 px-1">
                <div className='flex items-center justify-between'>
                  <div className='px-4'>
                    <FireIcon className="size-6 transition-none" aria-hidden="true" />
                  </div>
                  <div className="mx-auto w-full max-w-md">
                    <h2 className="text-center text-md font-medium">
                      Requset to buy
                    </h2>
                  </div>
                  <button
                    type="button"
                    className="rounded-xl hover:text-gray-500 focus:outline-none px-4"
                    onClick={() => { setOpen(false); setMessage('') }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="size-6" aria-hidden="true" />
                  </button>
                </div>
                <div className='text-left px-4'>
                  <div className="mt-4">
                    <textarea
                      id="comment"
                      rows={10}
                      name="comment"
                      placeholder='Write a text to the product manufacturer so that after the manufacturer sees your request, they will reply or call you.'
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      dir='auto'
                      className="block w-full rounded-xl bg-transparent p-4 text-base border border-gray-400/25 placeholder:text-gray-100/75 placeholder:text-xs focus:placeholder:opacity-0 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                  <div className='mt-4'>
                    <button
                      type="button"
                      className="flex w-full justify-center rounded-3xl bg-background text-foreground px-4 py-3 text-sm lg:hover:opacity-90 active:opacity-90 outline-none disabled:opacity-25"
                      disabled={isPending}
                      onClick={() => { handlePurchaseRequest(); setOpen(false); setMessage('') }}
                    >
                      {isPending ? <Spinner size="20" /> : texts.sendRequestText}
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}