'use client'

import { ArchiveBoxIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline'
import Header from '@/app/_ui/header'
import CircleLoader from '@/app/_ui/circleLoader'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getAPrice } from '@/app/_lib/api/market'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function AssetPage() {
  const [price, setPrice] = useState(null)
  const [error, setError] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  const assetId = typeof window !== 'undefined' ? window.atob(pathname.split('/')[3]) : null

  useEffect(() => {
    if (!assetId) return
    const fetchPrice = async () => {
      try {
        const res = await getAPrice(assetId)
        if (!res?.ok) return setError(true)
        const data = await res.json()
        setPrice(data)
      } catch {
        setError(true)
      }
    }

    fetchPrice()
  }, [assetId])

  if (error) {
    return (
      <div className='text-center text-gray-400 mt-48'>
        <p className='text-md'>Something went wrong!</p>
        <p
          className='text-sm mt-4 active:text-black lg:hover:text-black cursor-pointer'
          onClick={() => router.back()}
        >
          &larr; Back
        </p>
      </div>
    )
  }

  if (!price) {
    return (
      <>
        <Header title={'Price'} Icon={ArchiveBoxIcon} />
        <div role="status" className='flex justify-center items-center h-screen'>
          <CircleLoader />
        </div>
      </>
    )
  }

  const color =
    price.direction === 'up'
      ? 'text-green-500'
      : price.direction === 'down'
        ? 'text-red-500'
        : 'text-gray-800'

  const chartData = {
    labels: price.history?.map((p) => new Date(p.timestamp).toLocaleTimeString()) ?? [],
    datasets: [
      {
        label: price.name,
        data: price.history?.map((p) => p.price) ?? [],
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.3,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: false },
      x: { ticks: { maxRotation: 0, minRotation: 0 } }
    }
  }

  return (
    <>
      <Header title={price.name} Icon={ArchiveBoxIcon} />

      <div className="px-3 lg:px-8 py-safe-20 space-y-6">

        {/* Current Price */}
        <div className="text-center pt-safe">
          <p className="text-sm text-gray-500">Current Price</p>
          <p className={`text-2xl font-extrabold flex items-center justify-center gap-2 ${color}`}>
            {price.price?.toLocaleString('en-US', { maximumFractionDigits: 2 })} USD
            {price.direction === 'up' && <ArrowUpIcon className="size-4" />}
            {price.direction === 'down' && <ArrowDownIcon className="size-4" />}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {price.change ? `${price.change > 0 ? '+' : ''}${price.change}%` : '—'}
          </p>
        </div>

        {/* Price Chart */}
        <div className="bg-white p-4">
          {price.history?.length > 0 ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <p className="text-center text-gray-400">No historical data</p>
          )}
        </div>

      </div>
    </>
  )
}