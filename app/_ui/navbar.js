'use client'

import * as texts from '@/app/_text/common'

import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { useEffect, useRef, useState } from 'react'

import { motion } from "framer-motion"

import {
  UserIcon,
  FireIcon,
  XMarkIcon,
  GlobeAltIcon,
  PlusCircleIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline'

import {
  FireIcon as FireSolidIcon,
  GlobeAltIcon as GlobeAltSolidIcon,
  PlusCircleIcon as PlusCircleSolidIcon,
  ShoppingBagIcon as ShoppingBagSolidIcon,
} from '@heroicons/react/20/solid'

import { useScrollDirection } from '@/app/_lib/hooks/useScrollDirection'
import { useUserStore } from '@/app/_lib/hooks/store'
import { clearStorage } from '@/app/_lib/storage'
import { classNames } from '@/app/_lib/general'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const navbarRef = useRef(null)

  const user = useUserStore((state) => state.user)

  const [openSearch, setOpenSearch] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)

  const { scrollY: scrollHeight, showNavbar: showNavbarBotton } =
    useScrollDirection({
      threshold: 10,
      topOffset: 200,
    })

  function isActivePath(pathname, href) {
    if (href === '/profile') return pathname === '/profile' || pathname.startsWith('/profile/')
    return pathname === href
  }

  /* header height */
  useEffect(() => {
    if (!navbarRef.current) return
    const observer = new ResizeObserver(() => setHeaderHeight(navbarRef.current.offsetHeight))
    observer.observe(navbarRef.current)
    return () => observer.disconnect()
  }, [])

  const pages = [
    { name: texts.contactUsText, href: '/contactus', needToAuthentication: !!user.email },
    { name: texts.exploreText, href: '/explore', needToAuthentication: true },
    { name: texts.shopText, href: '/shop', needToAuthentication: true },
  ]

  const navigations = [
    { name: texts.appName, href: '/', icon: pathname == '/' ? FireSolidIcon : FireIcon },
    { name: texts.exploreText, href: '/explore', icon: pathname == '/explore' ? GlobeAltSolidIcon : GlobeAltIcon },
    { name: texts.addText, href: '/create', icon: pathname == '/create' ? PlusCircleSolidIcon : PlusCircleIcon },
    { name: texts.BazaarText, href: '/shop', icon: pathname == '/shop' ? ShoppingBagSolidIcon : ShoppingBagIcon },
  ]

  function handleHomeScreenOnClick() {
    router.push('/')
  }

  const isHomePage = pathname === '/'
  const isTransparentNavbar = isHomePage && scrollHeight < window.innerHeight - headerHeight

  return (
    <>
      {/* Top navigation */}
      <div
        ref={navbarRef}
        className={classNames(
          isHomePage ? 'fixed w-full' : 'sticky',
          (!isHomePage || user.email) && 'hidden md:block',
          isTransparentNavbar
            ? 'bg-white/0 text-white'
            : 'bg-background',
          'z-30 top-0 transition-all pt-safe'
        )}
      >
        <div className="mx-auto px-3 sm:px-8 lg:px-6">
          <div className="border-gray-200">
            <div className="flex h-14 items-center justify-between">
              {/* Logo (lg+) */}
              <div className="hidden md:flex md:items-center mb-1">
                <button onClick={handleHomeScreenOnClick}>
                  <span className="sr-only">{texts.appNameLowerCase}</span>
                  <FireIcon className="size-7 transition-none" aria-hidden="true" />
                </button>
              </div>

              <div className="hidden h-full md:flex">
                {/* Mega menus */}
                <div className="mx-8">
                  <div className="flex h-full justify-center gap-x-8">
                    {pages.map((page) => (
                      !!user.email === page.needToAuthentication &&
                      <Link
                        key={page.name}
                        href={page.href}
                        className="flex items-center gap-1 text-sm font-medium lg:hover:text-gray-500 active:text-gray-500"
                      >
                        <span>{page.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Logo (lg-) */}
              <button onClick={handleHomeScreenOnClick} className="md:hidden">
                <span className="sr-only">{texts.appNameLowerCase}</span>
                <FireIcon className="size-7 transition-none" aria-hidden="true" />
              </button>

              <div className="flex flex-1 items-center justify-end">
                <div className="flex items-center md:ml-6">
                  <div className="flex gap-x-8">
                    <div className="hidden md:flex">
                      <div
                        className={classNames(
                          openSearch && 'md:max-w-72',
                          'ml-2 p-2'
                        )}>
                        <span className="sr-only">Search</span>
                        <div className={classNames(
                          openSearch && isActivePath(pathname, '/shop') ? 'block' : 'hidden',
                          'flex items-center gap-6 text-black transition-all'
                        )}>
                          <div className='relative'>
                            <div className='absolute h-full flex items-center px-3'>
                              <XMarkIcon className="size-4 text-gray-400 lg:hover:text-black active:text-black cursor-pointer" aria-hidden="true" onClick={() => setOpenSearch(!openSearch)} />
                            </div>
                            <input className='text-foreground border-b bg-transparent border-gray-400 focus:outline-none px-5 py-2 placeholder:text-sm pl-9' placeholder='Search in products' dir='auto' />
                          </div>
                        </div>
                        <div className={classNames(
                          openSearch && isActivePath(pathname, '/shop') ? 'hidden' : 'block',
                        )}>
                          <MagnifyingGlassIcon className="size-7 lg:hover:text-gray-300 active:text-gray-300 cursor-pointer" aria-hidden="true" onClick={() => { setOpenSearch(!openSearch); router.push('/shop') }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <span className="h-6 w-px block md:hidden mx-2.5" aria-hidden="true" />
                  <span className="h-6 w-px hidden md:block bg-gray-200 md:mx-6" aria-hidden="true" />

                  <div className="flex items-center">
                    {user.email ?
                      <Link href="/profile" className="-m-2 p-2 lg:hover:text-gray-500 active:text-gray-500">
                        <span className="sr-only">Account</span>
                        <UserIcon className="size-7" aria-hidden="true" />
                      </Link>
                      :
                      <button onClick={() => {
                        clearStorage()
                        router.push('/auth')
                      }}
                        className="-m-2 p-2 lg:hover:text-gray-500 active:text-gray-500"
                      >
                        <span className="sr-only">Login</span>
                        <ArrowRightEndOnRectangleIcon className="size-7" aria-hidden="true" />
                      </button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className={classNames(
        (!user.email || pathname === "/auth") && 'hidden',
        showNavbarBotton ? 'translate-y-0 opacity-100 border-t border-gray-300/15' : isHomePage ? 'translate-y-24' : 'translate-y-5 opacity-25 pointer-events-none',
        "z-40 fixed bottom-0 w-full block md:hidden bg-background transition-all duration-300 pb-safe--16"
      )}
      >
        <div className="mx-auto px-5">
          {/* {scrollHeight} */}
          <div className="flex items-center justify-between py-2">
            {navigations.map((n) => {
              const isActive = isActivePath(pathname, n.href)

              return (
                <Link
                  key={n.name}
                  href={n.href}
                  className={classNames(
                    isActive && 'text-indigo-500',
                    'flex flex-col group justify-center items-center gap-y-0.5 w-10 duration-100 active:text-indigo-500',
                  )}
                >
                  <n.icon className='size-7 origin-center' />
                  <motion.p
                    className="text-[10px] h-[1rem] text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showNavbarBotton ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {n.name}
                  </motion.p>
                </Link>
              )
            })}

            <button
              onClick={() => router.push('/profile')}
              className={classNames(
                isActivePath(pathname, '/profile') && 'text-indigo-500',
                'relative group grid justify-center focus:outline-none w-10',
              )}
            >
              <Image
                src={user?.profilePicture || '/default-avatar.png'}
                alt={`${user?.name} Avatar`}
                width={96}
                height={96}
                className={classNames(
                  isActivePath(pathname, '/profile') ? 'ring-2 ring-indigo-500' : 'group-active:ring-1 group-active:ring-indigo-500',
                  'size-7 mx-auto rounded-full object-cover object-center border border-gray-400/15 bg-gray-400/15 select-none transition-all'
                )}
                unoptimized
              />

              <motion.span
                className="text-[10px] h-[1rem] mt-1 group-active:text-blue-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: showNavbarBotton ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {user.username}
              </motion.span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
