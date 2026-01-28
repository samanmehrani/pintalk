import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"

import { classNames } from "@/app/_lib/general"
import { removeUser } from "@/app/_lib/user"

import { useRouter } from "next/navigation"

import Link from "next/link"

export default function SidebarNavigation({ sidebarNavigation }) {
  const router = useRouter()

  async function onClickLogout() {
    removeUser()
    router.push('/')
  }

  return (
    <div className="hidden md:fixed md:inset-y-0 md:z-0 md:flex md:w-72 xl:w-96 md:flex-col md:mt-14">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-400/25 bg-background px-3">
        <h1 className="hidden md:block text-md font-bold px-2 mb-6 mt-2">Setting</h1>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 grid gap-3">
                {sidebarNavigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-300/25 text-foreground'
                          : 'text-gray-400 hover:text-foreground hover:bg-gray-300/25',
                        'relative group flex gap-x-3 rounded-xl px-3 py-2 text-sm font-semibold'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current ? 'text-foreground' : 'text-gray-400 group-hover:text-foreground',
                          'size-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      <p className="pt-1">{item.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className='mt-auto mb-2'>
              <ul role="list" className="-mx-2">
                <button
                  className='text-red-600 hover:text-red-500 group flex items-center gap-x-3 rounded-xl p-2 text-sm font-semibold'
                  onClick={onClickLogout}
                >
                  <ArrowRightStartOnRectangleIcon className='size-6 shrink-0 text-red-400 group-hover:text-red-500' />
                  Logout
                </button>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}