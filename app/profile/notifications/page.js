'use client'

import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { BellIcon } from '@heroicons/react/24/outline'

import { getNotifications } from '@/app/_lib/api/notification'

import MessageReqNotif from '@/app/_ui/form/messages-req-notif'
import LoadingReqNotif from '@/app/_ui/loading/req-notif'
import Header from '@/app/_ui/header'

export default function Notifications() {
  const [usersNotifications, setUsersNotifications] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    loadInitial()
  }, [])

  const loadInitial = async () => {
    try {
      const res = await getNotifications(1)
      if (!res?.ok) return
      const data = await res.json()

      if (!data || data.length === 0) {
        setHasMore(false)
        return
      }

      setUsersNotifications(data)
      setPage(2)
      if (data.length < 5) setHasMore(false)
    } catch (err) {
      console.error('Failed to load notifications:', err)
      setHasMore(false)
    }
  }

  const fetchMore = async () => {
    try {
      const res = await getNotifications(page)
      if (!res?.ok) return
      const data = await res.json()

      if (!data || data.length === 0) {
        setHasMore(false)
        return
      }

      setUsersNotifications((prev) => [...prev, ...data])
      setPage((prev) => prev + 1)
      if (data.length < 5) setHasMore(false)
    } catch (err) {
      console.error('Failed to fetch more notifications:', err)
      setHasMore(false)
    }
  }

  return (
    <>
      <Header title={'Notification'} Icon={BellIcon} />

      <div className="max-w-xl mx-auto sm:bg-gray-400/5 sm:rounded-3xl sm:px-4 py-28">
        <InfiniteScroll
          dataLength={usersNotifications.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={
            <div className="grid divide-y divide-gray-400/25 px-2.5">
              {Array(5).fill().map((_, i) => (
                <div key={i}>
                  <LoadingReqNotif />
                </div>
              ))}
            </div>
          }
        >
          <div className='divide-y divide-gray-400/25 px-2.5'>
            {usersNotifications.length > 0 ? (
              usersNotifications.map((notification, index) => (
                <MessageReqNotif
                  type='notification'
                  key={index}
                  notification={notification}
                />
              ))
            ) : !hasMore && (
              <div className='my-40 text-center mx-auto w-full'>
                <p className='text-gray-400 text-xs'>You have no notification!</p>
              </div>
            )
            }
          </div>
        </InfiniteScroll>
      </div>
    </>
  )
}