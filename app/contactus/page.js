'use client'

import { useState } from 'react'

import Header from '@/app/_ui/header'

import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { useToast } from '@/app/_ui/toast-context'

export default function ContactUs() {
  const { addToast } = useToast()
  const [comment, setComment] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()

    if (!comment.trim()) {
      addToast({
        message: 'Please enter a message',
        description: 'You need to write something before submitting.',
        type: 'warning',
        position: 'top-safe left-4 md:bottom-5',
      })
      return
    }

    // API

    addToast({
      message: 'Thank you!',
      description:
        'Thank you for your feedback and suggestions. We appreciate it!',
      type: 'success',
      position: 'top-safe left-4 md:bottom-5',
    })

    setComment('')
  }

  return (
    <>
      <Header title="Contact Us" Icon={ChatBubbleLeftRightIcon} />

      <div className="relative overflow-hidden">
        <div
          className="
            absolute inset-0
            bg-gradient-to-b from-background via-purple-500/40 my-auto
            h-[50vh]
            blur-2xl scale-110
          "
        />

        <div className="relative z-10 flex min-h-screen md:min-h-[calc(100vh-56px)] items-center justify-center px-4 py-16">
          <div className="w-full max-w-[min(90vw,420px)] space-y-8 rounded-3xl bg-gray-600/10 p-6 pt-8 shadow-xl shadow-gray-800/10 backdrop-blur-2xl">

            <div className="space-y-1 text-center">
              <h2 className="text-base font-semibold">
                We’d love to hear from you
              </h2>
              <p className="text-xs text-muted-foreground">
                Report a problem, share feedback, or leave a comment.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <textarea
                rows={6}
                required
                dir="auto"
                id="comment"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us what’s on your mind…"
                className="
                  block w-full resize-none rounded-3xl
                  bg-transparent px-5 py-4 text-sm
                  border border-gray-400/25
                  focus:border-transparent focus:outline-none
                  focus:ring-1 focus:ring-foreground
                  placeholder-gray-500 dark:placeholder-gray-400
                "
              />

              <button
                type="submit"
                className="
                  flex w-full items-center justify-center gap-2
                  rounded-3xl bg-foreground p-3
                  text-sm font-semibold text-background
                  transition-all
                  hover:bg-foreground/90
                  active:scale-[0.98]
                "
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}