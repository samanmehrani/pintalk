'use client'

import { createNewPost } from '@/app/_lib/api/post'

import { labels } from '@/constants/labels'

import { useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

import { useToast } from '@/app/_ui/toast-context'

import LabelSelector from '@/app/_ui/creating/label-selcetor'
import ProgressCircle from '@/app/_ui/form/progress-circle'

import { classNames } from '@/app/_lib/general'
import { LinkIcon } from '@heroicons/react/24/outline'

export default function PostCreator({ user }) {
  const [text, setText] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [labelled, setLabelled] = useState(labels[0])

  const router = useRouter()
  const pathname = usePathname()

  const { addToast } = useToast()

  function handleTextChange(e) {
    setText(e.target.value)
  }

  async function onSubmit() {
    if (!text.trim()) {
      addToast({
        message: 'Cannot publish empty post',
        description: 'Please write something before publishing.',
        type: 'warning',
        position: 'bottom-safe left-4 md:bottom-5',
      })
      return
    }

    setIsPending(true)
    try {
      await createNewPost({
        text,
        label: labelled.name,
      })

      addToast({
        message: 'Post published',
        description: 'Thank you! Your post has been successfully published.',
        type: 'success',
        position: 'bottom-safe left-4 md:bottom-5',
      })

      setText('')

      if (pathname === '/profile') {
        window.location.reload()
      } else {
        router.push('/profile')
      }
    } catch (error) {
      console.error('Error publishing post:', error)
      addToast({
        message: 'Error publishing post',
        description:
          'Something went wrong while publishing your post. Please try again.',
        type: 'error',
        position: 'bottom-safe left-4 md:bottom-5',
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className='flex flex-col'>
      <div className={classNames(
        pathname === "/profile" && "md:top-40",
        pathname === "/explore" && "md:top-16",
        "flex fixed top-safe-3/1 w-full gap-x-4"
      )}
      >
        <div className="w-12">
          <div className="relative size-10 rounded-full ring-1 ring-gray-400/25 overflow-hidden bg-gray-400/25">
            <Image
              src={
                user?.profilePicture
                  ? user.profilePicture
                  : '/default-avatar.png'
              }
              alt={`${user?.name} Avatar`}
              fill
              className="object-cover object-center"
              unoptimized
            />
          </div>
        </div>
        <label htmlFor="comment" className="sr-only">
          Add your comment
        </label>
        <textarea
          dir='auto'
          rows={15}
          value={text}
          name="comment"
          id="comment"
          onChange={handleTextChange}
          className="block w-full max-w-[calc(100%-100px)] lg:max-w-56 xl:max-w-72 2xl:max-w-96 h-full bg-transparent resize-none p-0 py-2 placeholder:text-gray-400 placeholder:pt-0.5 focus:outline-none"
          placeholder="Add your comment..."
        />
      </div>

      <div className="flex items-center justify-between py-2 border-0 border-gray-400/25 fixed bottom-24 md:bottom-3 w-full pr-8 lg:pr-3 2xl:pr-0 lg:w-[300px] xl:w-[360px] 2xl:w-[455px]">
        <div className="flex items-center gap-x-3.5">
          <div className="flow-root">
            <div className="flex justify-center items-center">
              <ProgressCircle
                textLength={text?.length}
              />
            </div>
          </div>
          {/* <div className="flow-root mx-3">
            <LinkIcon className='size-8' />
          </div> */}
          <div className="flow-root z-50 max-w-48 lg:max-w-72 xl:max-w-96">
            <LabelSelector
              labelled={labelled}
              setLabelled={setLabelled}
              labels={labels}
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center rounded-full bg-foreground px-3.5 pt-2.5 pb-2 text-xs text-background shadow-sm active:bg-gray-700 lg:hover:bg-foreground focus:outline-none disabled:bg-foreground disabled:opacity-15"
          disabled={text?.length === 0 || (800 - text?.length < 0) || isPending}
          onClick={onSubmit}
        >
          {isPending ? 'Publishing...' : 'Publish Post'}
        </button>
      </div>
    </div>
  )
}