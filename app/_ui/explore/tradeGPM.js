'use client'

import { useEffect, useState } from 'react'
import {
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline'

import { getMarketPrices } from '@/app/_lib/api/market'
import { getAllUsers } from '@/app/_lib/api/user'

import { PriceCardSkeleton } from '@/app/_ui/explore/loading/prices'
import { UserCardSkeleton } from '@/app/_ui/explore/loading/users'

import { classNames } from '@/app/_lib/general'

import Link from 'next/link'
import Image from 'next/image'

export default function TradeGPM() {
  const [users, setUsers] = useState(null)
  const [market, setMarket] = useState(null)
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [loadingPrices, setLoadingPrices] = useState(true)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await getMarketPrices()
        if (res?.ok) {
          const data = await res.json()

          setMarket(data)
          setLoadingPrices(false)
        }
      } catch {
        console.error('Failed to fetch market prices:', err)
      }
    }
    fetchPrices()
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers()
        if (res?.ok) {
          const data = await res.json()

          setUsers(data)
          setLoadingUsers(false)
        }
      } catch {
        console.error('Failed to fetch market prices:', err)
      }
    }
    fetchUsers()
  }, [])

  const pricesCards = [
    { title: 'Bitcoin (BTC)', key: 'bitcoin', unit: 'USD', source: 'Yahoo Finance' },
    { title: 'Gold (XAU)', key: 'gold', unit: 'USD / oz', source: 'Yahoo Finance' },
    { title: 'Oil (Brent)', key: 'oil', unit: 'USD / barrel', source: 'Yahoo Finance' }
  ]

  return (
    <main className="w-full overflow-hidden">
      <div className={classNames(
        loadingPrices ? "overflow-x-hidden" : "overflow-x-auto",
        "flex items-center justify-start ps-0 pt-2 p-4"
      )}
      >
        {loadingPrices ? Array(3).fill().map((_, i) => (
          <PriceCardSkeleton key={i} />
        )) : pricesCards?.map(({ title, key, unit, source }) => (
          <PriceCard
            key={key}
            id={key}
            title={title}
            data={market[key]}
            unit={unit}
            source={source}
          />
        ))}
      </div>

      <p className='mx-3 mt-6 mb-4 font-black text-xl'>Top Companies</p>

      <div className='grid divide-y divide-gray-400/25 px-2 '>
        {loadingUsers ? Array(5).fill().map((_, i) => (
          <UserCardSkeleton key={i} />
        )) : users?.map((user, index) => (
          <UsersCard key={index} data={user} />
        ))}
      </div>
    </main>
  )
}

function PriceCard({ title, id, data, unit, source }) {
  const color =
    data?.direction === 'up'
      ? 'text-green-500'
      : data?.direction === 'down'
        ? 'text-red-500'
        : 'text-foreground'

  return (
    <Link
      href={`/explore/market/` + window.btoa(id)}
      className="rounded-3xl bg-gray-400/20 p-3 text-center shadow-sm min-w-[40vw] md:min-w-[25vw] md:max-w-64 ms-2"
    >
      <h2 className="text-[10px] font-semibold mb-1.5">{title}</h2>
      <p
        className={classNames(
          color,
          'text-lg font-extrabold flex items-center justify-center whitespace-nowrap gap-1'
        )}
      >
        {data?.price ? Number(data.price).toLocaleString('en-US', { maximumFractionDigits: 2 }) : '—'}
        <span className="text-sm font-medium ml-1">{unit}</span>
      </p>

      <p className="flex items-center justify-center gap-x-1 text-[10px] pt-px">
        {data?.change
          ? `${data.change > 0 ? '+' : '-'}${data.change}%`
          : '—'}

        {data?.direction === 'up' && <ArrowUpIcon className="size-2.5" />}
        {data?.direction === 'down' && <ArrowDownIcon className="size-2.5" />}
      </p>

      <span className="text-[8px] block mt-2 opacity-50">
        Source: {source}
      </span>
    </Link>
  )
}

function UsersCard({ data }) {
  return (
    <div className="flex items-center justify-between gap-x-3 py-3 w-full">
      <div className="flex items-center gap-x-2.5 w-1/2">
        <div className="inline-flex overflow-hidden rounded-full ring-1 ring-gray-400/25">
          <Image
            src={
              data?.profilePicture
                ? data.profilePicture
                : '/default-avatar.png'
            }
            alt={`${data?.name} Avatar`}
            width={96}
            height={96}
            className='size-12 object-cover object-center bg-gray-400/15'
            unoptimized
          />
        </div>

        <div className='flex flex-col'>
          <span className="text-base font-semibold whitespace-nowrap select-none">{data?.name}</span>
          <Link
            className="text-xs text-gray-400 active:text-gray-700 lg:hover:text-gray-700"
            href={`/${data?.username}`}
          >
            @{data.username}
          </Link>
        </div>
      </div>

      <div className='flex justify-end w-1/2 text-xs font-medium gap-x-8 mx-2'>
        <div className='flex items-center justify-end space-x-1'>
          <p className="font-bold text-sm min-w-5 text-end">{data?.productCount ?? 0}</p>
          <span className="text-gray-400">Product</span>
        </div>
        <div className="flex items-center space-x-1">
          <p className="font-bold text-sm min-w-5 text-end">{data?.postCount ?? 0}</p>
          <span className='text-gray-400'>Post</span>
        </div>
      </div>
    </div>
  )
}