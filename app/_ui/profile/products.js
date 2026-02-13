'use client'

import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

import { getUsersProducts } from "@/app/_lib/api/product"
import ProductQuickview from "@/app/_ui/products/product-quickview"
import Image from "next/image"

export default function ProductsTab({ user }) {
  const [productView, setProductView] = useState()
  const [products, setProducts] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (user?.username) {
      setProducts([])
      setPage(1)
      setHasMore(true)
      loadInitial()
    }
  }, [user?.username])

  const loadInitial = async () => {
    const res = await getUsersProducts(user.username, 1)
    if (!res?.ok) return
    const data = await res.json()
    if (!data || data.length === 0) {
      setHasMore(false)
      return
    }

    setProducts(data)
    setHasMore(data.length >= 12)
    if (data.length >= 12) {
      setPage(2)
    }
  }

  const fetchMore = async () => {
    const res = await getUsersProducts(user.username, page)
    if (!res?.ok) return
    const data = await res.json()

    if (!data || data.length === 0) {
      setHasMore(false)
      return
    }

    setProducts(prev => [...prev, ...data])
    setHasMore(data.length >= 12)
    if (data.length >= 12) {
      setPage(prev => prev + 1)
    }
  }

  const handleDelete = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId))
  }

  return (
    <>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={
          <div className="columns-3 lg:columns-4 2xl:columns-5 gap-x-3 p-2 mb-safe-20 pb-8">
            {Array(9).fill().map((_, i) => {
              const height = 80 + Math.floor(Math.random() * 120)
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
      >
        {products.length > 0 ? (
          <div className="columns-3 lg:columns-4 2xl:columns-5 gap-x-3 p-2">
            {products.map((product, idx) => {
              const height = 80 + Math.floor(Math.random() * 120)

              return (
                <div
                  key={idx}
                  className="relative break-inside-avoid pb-3 group text-sm cursor-pointer"
                  onClick={() => { setProductView(product); setOpen(true) }}
                >
                  <div className="relative w-full max-h-96 rounded-3xl select-none bg-gray-400/25 group-active:opacity-75 lg:group-hover:opacity-75 overflow-hidden">
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
        ) : !hasMore && (
          <div className="flex flex-col items-center justify-center pb-16 mx-10 text-center text-gray-400 min-h-[calc(49.1vh)]">
            <h1 className="font-bold">Products</h1>
            <p className="mt-3 text-xs">
              Share your products so that applicants can easily find them and buy from you
            </p>
          </div>
        )}
      </InfiniteScroll>

      <ProductQuickview
        open={open}
        setOpen={setOpen}
        product={productView}
        handleDelete={handleDelete}
      />
    </>
  )
}