import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import {
  ArrowRightStartOnRectangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

import { classNames } from '@/app/_lib/general'
import { removeUser } from '@/app/_lib/user'
import { useRouter } from 'next/navigation'

export default function DrawerMenu({ sidebarOpen, setSidebarOpen, sidebarNavigation }) {
  const router = useRouter()

  async function onClickLogout() {
    removeUser()
    setSidebarOpen(false)
    router.push('/')
  }

  return (
    <Transition appear show={sidebarOpen} as="div">
      <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
        <TransitionChild
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-300/25 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 flex">
          <TransitionChild
            enter="transition duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="relative me-14 flex w-full max-w-sm flex-1">
              <TransitionChild
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-14 justify-center mt-3 pt-safe">
                  <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="size-6 text-foreground" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col overflow-y-auto bg-background pb-2 pt-safe">
                <div className='flex items-center justify-between px-4 mb-10 mt-3'>
                  <h1 className="text-xl font-bold">Setting</h1>
                  {/* <ThemeToggle /> */}
                </div>

                <nav className="flex flex-1 flex-col px-3">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7 content-between">
                    <li>
                      <ul role="list" className="-mx-1 grid gap-3">
                        {sidebarNavigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-400/25 text-foreground'
                                  : 'text-foreground hover:text-foreground hover:bg-gray-400/25',
                                'relative group flex items-center gap-x-3 rounded-xl p-2 text-sm font-semibold'
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  item.current ? 'text-foreground' : 'text-gray-400 group-hover:text-foreground',
                                  'relative size-6'
                                )}
                                aria-hidden="true"
                              />
                              <p className='pt-1'>{item.name}</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className='mt-auto mb-safe'>
                      <ul role="list" className="-mx-1">
                        <button
                          className='text-red-600 hover:text-red-500 group flex items-center gap-x-3 rounded-xl p-2 text-sm font-semibold'
                          onClick={onClickLogout}
                        >
                          <ArrowRightStartOnRectangleIcon className='size-6 shrink-0 text-red-400 group-hover:text-red-500 mb-0.5' />
                          Logout
                        </button>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}