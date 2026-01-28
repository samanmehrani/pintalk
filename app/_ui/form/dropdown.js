'use client'

import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon, TrashIcon } from '@heroicons/react/24/outline'

import { classNames } from '@/app/_lib/general'
import { deletePost } from '@/app/_lib/api/post'
import { deleteProduct } from '@/app/_lib/api/product'
import { removeRequestsSent } from '@/app/_lib/api/notification'

export default function Dropdown({ postId, productId, requestId, setOpen, onDelete, size, color = "gray-400" }) {
  async function handleDeletePost() {
    try {
      await deletePost(postId)
      onDelete?.(postId)
    } catch (error) {
      console.error("The post was not deleted.")
    }
  }

  async function handleDeleteProduct() {
    try {
      await deleteProduct(productId)
      onDelete?.(productId)
      setOpen(false)
    } catch (error) {
      console.error("The product was not deleted.")
    }
  }

  async function handleDeleteNotifications() {
    try {
      await removeRequestsSent(requestId)
      onDelete?.(requestId)
    } catch (error) {
      console.error("The request was not deleted.")
    }
  }

  const items = []
  if (postId) {
    items.push({ name: 'Delete', icon: TrashIcon, onClick: handleDeletePost })
  }
  if (productId) {
    items.push({ name: 'Delete', icon: TrashIcon, onClick: handleDeleteProduct })
  }
  if (requestId) {
    items.push({ name: 'Delete', icon: TrashIcon, onClick: handleDeleteNotifications })
  }

  return (
    <>
      <Listbox as="div" className="flex-shrink-0">
        {({ open }) => (
          <>
            <Label className="sr-only">Add a label</Label>
            <div className="relative">
              <ListboxButton className={classNames(
                "text-" + color,
                "max-w-full flex items-center whitespace-nowrap px-2.5 font-semibold lg:hover:text-foreground active:text-foreground active:scale-110"
              )}
              >
                <EllipsisHorizontalIcon
                  className={`size-${size}`}
                />
              </ListboxButton>

              <Transition
                show={open}
                enter="transition ease-out duration-50"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-50"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions className="absolute right-0 z-10 mt-3 max-h-56 overflow-auto rounded-xl bg-background shadow-lg ring-1 ring-gray-400/25 focus:outline-none text-sm">
                  {items.map((item, index) => (
                    <ListboxOption
                      key={index}
                      className={classNames(
                        item.name == 'Delete' && 'text-red-700',
                        'relative cursor-pointer active:bg-gray-400/25 select-none p-3 w-40'
                      )}
                      onClick={() => { item.onClick() }}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="size-5" />
                        <span className="block truncate font-medium -mb-1">{item.name}</span>
                      </div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </>
  )
}