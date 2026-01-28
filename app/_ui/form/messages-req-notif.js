'use client'

import moment from 'moment'
import Link from 'next/link'
import Dropdown from '@/app/_ui/form/dropdown'

export default function MessageReqNotif({ type, notification, handleDelete }) {
  const isNotification = type === 'notification'
  const isRequest = type === 'request'

  const productLink = `/products/${window.btoa(notification.product)}`
  const userLink = `/${isNotification ? notification.sender_username : notification.recever}`
  const userLabel = isNotification
    ? `From @${notification.sender_username}`
    : `Sent to @${notification.recever}`

  const headerText = isNotification
    ? `${notification.sender_name} requests to buy your product `
    : isRequest
      ? 'Purchase request '
      : ''

  return (
    <div className='py-2 overflow-hidden'>
      <div className="flex items-center text-sm font-semibold">
        {headerText}
        <span className="font-normal text-[10px] ml-1 underline active:text-gray-500 lg:hover:text-gray-500">
          <Link href={productLink}>See Product</Link>
        </span>
        {isRequest && (
          <div className="ms-auto">
            <Dropdown
              size="6"
              color='Dropdown'
              requestId={notification._id}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>

      <p className="text-sm py-2.5 pr-3" dir="auto">
        {notification.message}
      </p>

      <div className="pt-1 flex items-center gap-x-2 text-xs text-gray-400">
        <Link href={userLink} className="active:text-gray-700 lg:hover:text-gray-700">
          {userLabel}
        </Link>
        <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
          <circle cx={1} cy={1} r={1} />
        </svg>
        <time dateTime={notification.created_at}>
          {moment(notification.created_at).format('D MMMM YYYY, h:mm a')}
        </time>
      </div>
    </div>
  )
}