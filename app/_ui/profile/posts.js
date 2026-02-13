'use client'

import { useEffect, useState } from "react"

import * as texts from '@/app/_text/common'
import InfiniteScroll from "react-infinite-scroll-component"

import { motion, AnimatePresence } from "framer-motion"

import { getUsersPosts } from "@/app/_lib/api/post"

import Post from "@/app/_ui/form/post"
import LoadingPost from "@/app/_ui/loading/post"

export default function PostsTab({ user }) {
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(true)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (user?.username) {
      setPage(1)
      setPosts([])
      setHasMore(true)
      loadInitial()
    }
  }, [user?.username])

  const loadInitial = async () => {
    const res = await getUsersPosts(user.username, 1)
    if (!res?.ok) return
    const data = await res.json()
    if (!data || data.length === 0) {
      setHasMore(false)
      return
    }

    setPosts(data)
    setHasMore(data.length >= 10)
    if (data.length >= 10) {
      setPage(2)
    }
  }

  const fetchMore = async () => {
    if (!user?.username) return
    const res = await getUsersPosts(user.username, page)
    if (!res?.ok) return
    const data = await res.json()

    if (!data || data.length === 0) {
      setHasMore(false)
      return
    }

    setPosts(prev => [...prev, ...data])
    setHasMore(data.length >= 10)
    if (data.length >= 10) {
      setPage(prev => prev + 1)
    }
  }

  const handleDelete = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId))
  }

  return (
    <div className="divide-y divide-gray-400/25">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={
          <div className="grid px-2.5 divide-y divide-gray-400/25 pb-24">
            {Array(3).fill().map((_, i) => (
              <div key={i}>
                <LoadingPost />
              </div>
            ))}
          </div>
        }
      >
        {posts.length > 0 ? (
          <div className="divide-y divide-gray-400/25 border-b border-gray-400/25 last:border-0 min-h-[calc(49.1vh)]">
            <AnimatePresence>
              {posts.map((post) => (
                <motion.div
                  key={post?.id}
                  initial={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid px-2.5 overflow-hidden"
                >
                  <Post post={post} onDelete={handleDelete} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : !hasMore && (
          <div className="flex flex-col items-center justify-center pb-16 mx-10 text-center text-gray-400 min-h-[calc(49.1vh)]">
            <h1 className="font-bold">Posts</h1>
            <p className="mt-3 text-xs">
              You can publish news and announcements about your company’s products in {texts.appName}
            </p>
          </div>
        )}
      </InfiniteScroll>
    </div>
  )
}