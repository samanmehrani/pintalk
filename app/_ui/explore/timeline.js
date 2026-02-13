'use client'

import { useState, useEffect, useRef } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import Image from 'next/image'
import Link from "next/link"

import { motion, AnimatePresence } from "framer-motion"

import { useScrollDirection } from '@/app/_lib/hooks/useScrollDirection'
import { getTimelinePosts } from "@/app/_lib/api/post"
import { useUserStore } from "@/app/_lib/hooks/store"

import { labels } from "@/constants/labels"
import { adGifList } from "@/constants/ads"

import LoadingPost from "@/app/_ui/loading/post"
import CreatePost from "@/app/_ui/creating/post"
import Post from "@/app/_ui/form/post"

import { PlusIcon } from "@heroicons/react/20/solid"
import { classNames } from "@/app/_lib/general"

const AdGif = ({ href, gifSrc }) => (
  <div className="p-3 md:p-5 flex justify-center">
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative overflow-hidden w-full lg:w-3/4 active:scale-y-105 transition-transform duration-200 rounded-2xl"
    >
      <Image
        src={gifSrc}
        width={1000}
        height={300}
        placeholder="blur"
        alt="Advertisement"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAnIGhlaWdodD0nMTAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSIjZGRkZGRkIi8+PC9zdmc+"
      />
      <p className="absolute bottom-0 left-0 text-xs bg-gray-200/50 text-black/75 rounded-tr-2xl pt-1.5 pb-1 px-3.5">
        Ads
      </p>
    </a>
  </div>
)

export default function ExploreTimeline() {

  const user = useUserStore((state) => state.user)

  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState([])
  const [atTop, setAtTop] = useState(true)
  const [hasMore, setHasMore] = useState(true)

  const usedAdIndexes = useRef(new Set())

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY < 100)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getRandomAd = () => {
    let remainingAds = adGifList
      .map((ad, index) => ({ ad, index }))
      .filter(({ index }) => !usedAdIndexes.current.has(index))

    if (remainingAds.length === 0) {
      usedAdIndexes.current.clear()
      remainingAds = adGifList.map((ad, index) => ({ ad, index }))
    }

    const randomIndex = Math.floor(Math.random() * remainingAds.length)
    const { ad, index } = remainingAds[randomIndex]
    usedAdIndexes.current.add(index)
    return ad
  }

  const insertAdsRandomly = (posts) => {
    const result = []

    for (let i = 0; i < posts.length; i++) {
      result.push({ type: 'post', data: posts[i] })

      if ((i + 1) % 3 === 0) {
        const ad = getRandomAd()
        if (ad) {
          result.push({ type: 'ad', data: ad })
        }
      }
    }

    return result
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (user?.username) {
      setPage(1)
      setPosts([])
      setHasMore(true)
      usedAdIndexes.current.clear()
      loadInitial()
    }
  }, [user?.username])

  const loadInitial = async () => {
    const res = await getTimelinePosts(1)
    if (!res?.ok) return
    const data = await res.json()

    if (!data || data.length === 0) {
      setHasMore(false)
      return
    }
    const sorted = data.sort((p1, p2) =>
      new Date(p2.created_at) - new Date(p1.created_at)
    )
    const withAds = insertAdsRandomly(sorted)

    setPosts(withAds)
    setHasMore(data.length >= 10)
    if (data.length >= 10) {
      setPage(2)
    }

    if (!data || data.length < 10) {
      setHasMore(false)
    } else {
      const sorted = data.sort((p1, p2) =>
        new Date(p2.created_at) - new Date(p1.created_at)
      )
      const withAds = insertAdsRandomly(sorted)
      setPosts(withAds)
      setPage(2)
    }
  }

  const fetchMore = async () => {
    if (!user?.username) return

    const res = await getTimelinePosts(page)
    if (!res?.ok) return
    const data = await res.json()

    if (!data || data.length === 0) {
      setHasMore(false)
      return
    }
    const sorted = data.sort((p1, p2) =>
      new Date(p2.created_at) - new Date(p1.created_at)
    )
    const withAds = insertAdsRandomly(sorted)
    setPosts(prev => [...prev, ...withAds])
    setHasMore(data.length >= 10)
    if (data.length >= 10) {
      setPage(prev => prev + 1)
    }
  }

  const handleDelete = (postId) => {
    setPosts((prev) => prev.filter(item => item.type !== 'post' || item.data.id !== postId))
  }

  const { showNavbar } = useScrollDirection({
    threshold: 10,
    topOffset: 200,
  })

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {/* Sidebar */}
      <div className="hidden lg:fixed lg:right-0 lg:inset-y-0 md:z-0 lg:flex lg:w-80 xl:w-96 2xl:w-[475px] lg:flex-col lg:top-14 z-50">
        <div className="h-full overflow-y-auto no-scrollbar border-l border-gray-400/15 p-3">
          <CreatePost labels={labels} user={user} />
        </div>
      </div>

      <AnimatePresence>
        {posts.length > 0 && !atTop && (
          <motion.div
            key="scroll-to-top"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: showNavbar ? 1 : .5, y: showNavbar ? 52 : 4, }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: .25, ease: "easeOut" }}
            className={classNames(
              !showNavbar && "pointer-events-none",
              "fixed inset-x-0 top-safe-44 z-30 md:ms-80 lg:ms-0 xl:me-24"
            )}
          >
            <div
              onClick={scrollToTop}
              className="flex items-center justify-between bg-blue-500/50 backdrop-blur-sm shadow-xl shadow-indigo-400/50 w-28 h-10 rounded-full mx-auto p-1.5 active:w-32 transition-all cursor-pointer"
            >
              <div className="relative h-full">
                <div className="bg-gray-300 absolute h-full aspect-square rounded-full z-10" />
                <div className="bg-gray-500 absolute h-full aspect-square rounded-full z-20 ms-3" />
                <div className="bg-gray-400 absolute h-full aspect-square rounded-full z-30 ms-6" />
              </div>
              <p className="flex items-center px-2 whitespace-nowrap font-bold">
                <PlusIcon className="size-4" />
                <span className="text-sm mt-0.5">
                  {posts.length > 9 ? 9 : posts.length}
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline */}
      <div className="lg:pe-80 xl:pe-96 2xl:pe-[475px] bg-background">
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={
            <div className="grid px-2.5 divide-y divide-gray-400/25 pb-24">
              {Array(6).fill().map((_, i) => (
                <div key={i}>
                  <LoadingPost />
                </div>
              ))}
            </div>
          }
          endMessage={
            <p className="text-center text-xs text-gray-400 py-20 mb-safe">You have reached the end!</p>
          }
        >
          {posts.length > 0 ?
            <div className="divide-y divide-gray-400/25 border-b border-gray-400/25 last:border-0">
              <AnimatePresence>
                {posts.map((item, index) => {
                  if (item.type === 'post') {
                    return (
                      <motion.div
                        key={item.data.id}
                        initial={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="grid px-2.5 overflow-hidden"
                      >
                        <Post post={item.data} onDelete={handleDelete} />
                      </motion.div>
                    )
                  }

                  if (item.type === 'ad') {
                    return (
                      <AdGif
                        key={`ad-${index}`}
                        href={item.data.href}
                        gifSrc={item.data.gifSrc}
                      />
                    )
                  }

                  return null
                })}
              </AnimatePresence>
            </div>
            : !hasMore && (
              <div className="flex-col py-20 mx-10 text-center text-gray-400">
                <h1 className="font-bold">Timeline</h1>
                <p className="mt-3 text-xs">
                  The timeline is empty. Write a <Link href={'/create'} className="text-gray-600 underline">new post</Link> so we can share it here for everyone.
                </p>
              </div>
            )}
        </InfiniteScroll>
      </div>
    </>
  )
}