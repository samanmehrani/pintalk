'use client'

import { useState, useEffect } from 'react'
import {
  CheckBadgeIcon,
  SparklesIcon,
} from '@heroicons/react/20/solid'

import {
  BellIcon,
  CalendarDateRangeIcon,
  EnvelopeIcon,
  FingerPrintIcon,
  FireIcon,
  LanguageIcon,
  PencilSquareIcon,
  Bars2Icon,
  PlusIcon,
  QrCodeIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'

import * as texts from '@/app/_text/common'

import { classNames } from '@/app/_lib/general'

import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'

import Header from '@/app/_ui/header'
import Create from '@/app/create/page'
import QRCode from '@/app/_ui/profile/qrCode'
import TabProfile from '@/app/_ui/profile/tab'
import DrawerMenu from '@/app/_ui/profile/drawer-menu'
import LoadingInformation from '@/app/_ui/profile/loading-info'
import SidebarNavigation from '@/app/_ui/profile/sidebar-navigation'

const sidebarNavigation = [
  { name: 'Edit Profile', href: '/profile/editProfile', icon: PencilSquareIcon },
  { name: 'Notifications', href: '/profile/notifications', icon: BellIcon },
  { name: 'Requests', href: '/profile/requests', icon: EnvelopeIcon },
  { name: 'Privacy and Security', href: '/profile/privacy', icon: FingerPrintIcon },
  { name: 'Language and Region', href: '/profile/language', icon: LanguageIcon },
  { name: `${texts.appName} FAQs`, href: '/faq', icon: QuestionMarkCircleIcon },
]

export default function ProfileDetails({ user }) {
  const [openQR, setOpenQR] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 124) setShowTitle(true)
      else setShowTitle(false)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const info = [
    {
      name: "location",
      title: user?.location
    },
    {
      name: "founded",
      title: user?.founded && moment(user?.founded).format('LL')
    },
    {
      name: "industry",
      title: user?.industry
    },
    {
      name: "number of locations",
      title: user?.numberOfLocations
    },
    {
      name: "website",
      title: user?.link && <a className='text-blue-400 active:text-foreground lg:hover:text-foreground lowercase' href={user?.link}>{user?.link}</a>
    },
  ]

  return (
    <div>
      {!user?.email &&
        <Header
          title={user?.name}
          Icon={UserCircleIcon}
        />
      }

      <DrawerMenu
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarNavigation={sidebarNavigation}
      />

      {/* Static sidebar for desktop */}
      <SidebarNavigation
        sidebarNavigation={sidebarNavigation}
      />

      {/* QR Code Modal */}
      <QRCode
        open={openQR}
        setOpen={setOpenQR}
        currentUserUsername={user?.username}
        userProfile={user?.profilePicture}
      />

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:right-0 lg:inset-y-0 md:z-0 lg:flex lg:w-80 xl:w-96 2xl:w-[500px] lg:flex-col lg:mt-14">
        <div className="h-full overflow-y-auto no-scrollbar border-l border-gray-400/25">
          <Create />
        </div>
      </div>

      {/* Static Creating Button for medium */}
      {user?.email &&
        <div className="hidden md:block lg:hidden fixed right-0 bottom-0 z-30 m-5">
          <Link href='/create' className='bg-foreground text-background rounded-full p-3 flex'>
            <PlusIcon className='size-7' />
          </Link>
        </div>
      }

      <div
        className={classNames(
          !user?.email && 'hidden',
          // sidebarOpen ? 'translate-x-[calc(100%-56px)]' : 'translate-x-0',
          "fixed w-full top-0 z-40 flex items-center bg-background justify-between px-3 md:hidden pt-safe-10 pb-2 transition duration-300"
        )}
      >
        {/* <FireIcon className="size-7 transition-none" aria-hidden="true" /> */}

        <h1
          className={classNames(
            "font-extrabold truncate max-w-[60%] text-sm transition-opacity duration-300 ease-in-out",
            showTitle ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
        >
          <div className="flex items-center gap-1">
            <span className="select-none">{user?.name}</span>
            {user?.isAdmin && <CheckBadgeIcon className='size-4 mb-0.5' />}
          </div>
        </h1>

        <button type="button" className="relative lg:hidden size-7 outline-none" onClick={() => setSidebarOpen(true)}>
          <span className="sr-only">Open sidebar</span>
          <div
            className={classNames(
              sidebarOpen && 'opacity-0 transition-opacity',
              "grid gap-1.5 rounded-xl cursor-pointer items-center justify-center outline-none"
            )}
          >
            <div className='bg-foreground rounded-full h-0.5 w-4' />
            <div className='bg-foreground rounded-full h-0.5 w-2 ms-auto' />
          </div>
        </button>
      </div>

      <main className={classNames(
        // sidebarOpen ? 'translate-x-[calc(100%-56px)]' : 'translate-x-0',
        'md:pl-72 xl:pl-96 lg:pr-80 xl:pr-96 2xl:pr-[500px] transition duration-300'
      )}>
        {/* User Information */}
        <section className="relative pt-32 md:pt-2 z-20 flow-root px-3 items-center">
          <div>
            <div className="flex items-end justify-between">
              <div className="inline-flex overflow-hidden rounded-full ring-1 ring-gray-400/25">
                <Image
                  src={
                    user?.profilePicture
                      ? user.profilePicture
                      : '/default-avatar.png'
                  }
                  alt={`${user?.name} Avatar`}
                  width={96}
                  height={96}
                  className='size-24 object-cover object-center bg-gray-400/15'
                  unoptimized
                />
              </div>
              <div className='flex items-center gap-1.5'>
                {user?.username ?
                  <>
                    {user?.email &&
                      <Link
                        href='/premium'
                        className="flex items-center justify-center rounded-full py-2 h-9 w-28 text-[10px] ring-1 ring-inset ring-gray-400/25 active:ring-gray-400/50"
                      >
                        <span className='font-medium flex items-center gap-1.5'>
                          <SparklesIcon className='size-4 -mt-0.5' />
                          Get Premium
                        </span>
                      </Link>
                    }
                    <button
                      onClick={() => setOpenQR(true)}
                      className="flex items-center justify-center rounded-full py-2 h-9 w-28 text-[10px] ring-1 ring-inset ring-gray-400/25 active:ring-gray-400/50"
                    >
                      <span className='font-medium flex items-center gap-1.5'>
                        <QrCodeIcon className='size-4 -mt-0.5' />
                        QR Code
                      </span>
                    </button>
                  </>
                  :
                  <div className='bg-gray-400/25 rounded-full h-9 w-28 animate-pulse' />
                }
              </div>
            </div>
          </div>

          {user?.username ?
            <>
              <div className="mb-1 mt-2 lg:mt-5">
                <div className="flex items-center gap-1">
                  <span className="text-lg font-semibold select-none">{user?.name}</span>
                  {user?.isAdmin && <CheckBadgeIcon className='size-4 mb-1' />}
                </div>
                <p className="text-xs text-gray-500 select-none">@{user?.username}</p>
              </div>

              <div className='text-gray-400 text-xs/[18px] grid'>
                {info.map((i, index) => (
                  i.title && <span className='capitalize' key={index}>{i.name} : {i.title}</span>
                ))}
                {user?.registerationTimestamp &&
                  <div className='flex items-center gap-1 mt-1'>
                    <CalendarDateRangeIcon className='size-4 mb-1' />
                    <span>Joined</span>
                    <span>{moment(user?.registerationTimestamp).format('LL')}</span>
                  </div>
                }
                {user?.created_at &&
                  <div className='flex items-center gap-1 mt-1'>
                    <CalendarDateRangeIcon className='size-4 mb-1' />
                    <span>Joined</span>
                    <span>{moment(user?.created_at).format('LL')}</span>
                  </div>
                }
              </div>
            </>
            :
            <LoadingInformation />
          }
        </section>

        {/* Tab section */}
        <TabProfile user={user} />
      </main>
    </div>
  )
}