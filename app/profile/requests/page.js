'use client'

import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { EnvelopeOpenIcon } from '@heroicons/react/24/outline'

import { getRequestsSent } from '@/app/_lib/api/notification'

import MessageReqNotif from '@/app/_ui/form/messages-req-notif'
import LoadingReqNotif from '@/app/_ui/loading/req-notif'
import Header from '@/app/_ui/header'

export default function Requests() {
  const [usersRequests, setUsersRequests] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    loadInitial()
  }, [])

  const loadInitial = async () => {
    try {
      const res = await getRequestsSent(1)
      if (!res?.ok) return
      const data = await res.json()

      if (!data || data.length === 0) {
        setHasMore(false)
        return
      }

      setUsersRequests(data)
      setPage(2)
      if (data.length < 5) setHasMore(false)
    } catch (err) {
      console.error('Failed to load requests:', err)
      setHasMore(false)
    }
  }

  const fetchMore = async () => {
    try {
      const res = await getRequestsSent(page)
      if (!res?.ok) return
      const data = await res.json()

      if (!data || data.length === 0) {
        setHasMore(false)
        return
      }

      setUsersRequests((prev) => [...prev, ...data])
      setPage((prev) => prev + 1)
      if (data.length < 5) setHasMore(false)
    } catch (err) {
      console.error('Failed to fetch more requests:', err)
      setHasMore(false)
    }
  }

  const handleDelete = (requestId) => {
    setUsersRequests((prev) => prev.filter(item => item.id !== requestId))
  }

  return (
    <>
      <Header title={'Requests'} Icon={EnvelopeOpenIcon} />

      <div className="max-w-xl mx-auto sm:bg-gray-400/5 sm:rounded-3xl sm:px-4 py-28">
        <InfiniteScroll
          dataLength={usersRequests.length}
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
          <div className="divide-y divide-gray-400/25 px-2.5">
            {usersRequests.length > 0 ? (
              usersRequests.map((notification, index) => (
                <MessageReqNotif
                  type='request'
                  key={index}
                  notification={notification}
                  handleDelete={handleDelete}
                />
              ))
            ) : !hasMore && (
              <div className='my-40 text-center mx-auto w-full'>
                <p className='text-gray-400 text-xs'>You have no request!</p>
              </div>
            )
            }
          </div>
        </InfiniteScroll>
      </div>
    </>
  )
}