'use client'

import moment from "moment"
import Link from "next/link"
import Dropdown from "@/app/_ui/form/dropdown"

import { useUserStore } from "@/app/_lib/hooks/store"

import { useRouter } from "next/navigation"
import { parseTextWithLinks } from "@/app/_lib/format"
import Image from "next/image"

export default function Post({ post, onDelete }) {
  const user = useUserStore((state) => state.user)
  const router = useRouter()

  const parts = parseTextWithLinks(post.text)

  return (
    <article className="flex flex-col items-start justify-between my-2 md:my-3">
      <div className="w-full">
        <div className="flex items-center gap-x-3 text-sm">
          <time dateTime={post.created_at} className="text-gray-400 text-xs">
            {moment(post.created_at).fromNow()}
          </time>
          <button
            onClick={() => router.push(`/shop/${post.label}`)}
            className="relative z-10 rounded-full text-[9px] bg-gray-400/15 px-3 pt-1.5 pb-1 font-medium active:bg-gray-400/50 lg:hover:bg-gray-400/50 disabled:bg-gray-400/25 disabled:opacity-25"
            disabled={post.label == 'No Label'}
          >
            {post.label}
          </button>
          <div className="ms-auto">
            {post.author_id?.username == user.username &&
              <Dropdown
                size="6"
                color="foreground"
                postId={post._id}
                onDelete={onDelete}
              />
            }
          </div>
        </div>
        <div className="overflow-hidden text-sm whitespace-pre-wrap my-1.5 md:my-4" dir="auto">
          {parts.map((part, i) =>
            part.type === "link" ? (
              <a
                key={i}
                href={part.content}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 active:underline lg:hover:underline"
              >
                {part.content}
              </a>
            ) : (
              <span key={i}>{part.content}</span>
            )
          )}
        </div>
      </div>
      <div className="relative flex items-center gap-2">
        <div className="relative size-8 rounded-full border border-gray-500/5 overflow-hidden bg-gray-400/25">
          <Image
            src={
              post.author_id?.profilePicture
                ? post.author_id.profilePicture
                : '/default-avatar.png'
            }
            alt="Author avatar"
            fill
            className="object-cover object-center"
            unoptimized
          />
        </div>
        <div className="text-xs">
          <p className="flex gap-x-2">
            <span className="font-semibold">
              {post.author_id?.name}
            </span>
            <Link
              className="text-gray-400 active:text-gray-700 lg:hover:text-gray-700"
              href={`/${post.author_id?.username == user.username ? 'profile' : post.author_id?.username}`}
            >
              @{post.author_id?.username}
            </Link>
          </p>
        </div>
      </div>
    </article>
  )
}