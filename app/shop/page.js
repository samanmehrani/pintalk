'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import {
  getShopProducts,
  SearchProductsByLabel,
} from '@/app/_lib/api/product'

import { useScrollDirection } from '@/app/_lib/hooks/useScrollDirection'
import { classNames } from '@/app/_lib/general'

import ProductQuickview from '@/app/_ui/products/product-quickview'
import Search from '@/app/_ui/shop/search'

export default function Shop() {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [productView, setProductView] = useState()
  const [openQuickview, setOpenQuickview] = useState(false)

  const { showNavbar: showHeader } = useScrollDirection({
    threshold: 10,
    topOffset: 200,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setProducts([])
    setPage(1)
    setHasMore(true)
    if (query) {
      const delay = setTimeout(loadInitial, 1000)
      return () => clearTimeout(delay)
    } else {
      loadInitial()
    }
  }, [query])

  const loadInitial = async () => {
    const res = query.length === 0
      ? await getShopProducts(1)
      : await SearchProductsByLabel(query, 1)
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
      const res = query.length === 0
        ? await getShopProducts(page)
        : await SearchProductsByLabel(query, page)
      if (!res?.ok) return
      const data = await res.json()
      if (!data || data.length === 0) {
        setHasMore(false)
        setError(true)
        return
      }

      setProducts(prev => [...prev, ...data])
      setHasMore(data.length >= 10)
      if (data.length >= 10) {
        setPage(prev => prev + 1)
      }
    } catch (err) {
      setError(true)
      setHasMore(false)
      setProducts([])
    }
  }

  const handleDelete = (productId) => {
    setProducts(prev => prev.filter(p => p._id !== productId))
  }

  return (
    <>
      <main className="mx-auto lg:px-3">
        <div className={classNames(
          "flex items-center justify-between gap-4 px-3 fixed w-full top-0 z-10 transition-transform duration-500",
          showHeader ? '-translate-y-2' : '-translate-y-32'
        )}>
          <div className='flex bg-background size-full pt-safe-20 pb-2.5'>
            <Search
              setQuery={(q) => {
                setPage(1)
                setQuery(q)
              }}
            />
          </div>
        </div>

        <section className="pt-28 md:pt-0 px-3 gap-x-6 gap-y-10">
          {error ? (
            <div className='pt-40 text-center w-full'>
              <p className="text-gray-400 text-xs">ُNo products found!</p>
            </div>
          ) : (
            <InfiniteScroll
              dataLength={products.length}
              next={fetchMore}
              hasMore={hasMore}
              loader={
                <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-x-3">
                  {Array(12).fill().map((_, i) => {
                    const height = 150 + Math.floor(Math.random() * 200)
                    return (
                      <div
                        key={i}
                        className="break-inside-avoid pb-3"
                      >
                        <div
                          className="bg-gray-400/25 rounded-3xl animate-pulse w-full"
                          style={{ height: `${height}px` }}
                        />
                      </div>
                    )
                  })}
                </div>
              }
              endMessage={
                <p className="text-center text-xs text-gray-400 py-20 mb-safe-20">You have reached the end!</p>
              }
            >
              <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-x-3 mt-2">
                {products?.map((product, index) => {
                  const height = 150 + Math.floor(Math.random() * 200)
                  return (
                    <div
                      key={index}
                      className="break-inside-avoid pb-3 group relative cursor-pointer"
                      onClick={() => {
                        setProductView(product);
                        setOpenQuickview(true)
                      }}
                    >
                      <div className="relative w-full max-h-96 rounded-3xl overflow-hidden select-none bg-gray-400/25 lg:group-hover:opacity-75">
                        <Image
                          src={product.images[0].url}
                          alt="Product Image"
                          width={300}
                          height={height}
                          className="object-cover object-center"
                          unoptimized
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </InfiniteScroll>
          )}
        </section>
      </main>

      <ProductQuickview
        open={openQuickview}
        product={productView}
        setOpen={setOpenQuickview}
        handleDelete={handleDelete}
      />
    </>
  )
}