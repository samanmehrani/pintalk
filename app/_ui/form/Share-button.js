'use client'

import { ShareIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'

import { useToast } from '@/app/_ui/toast-context'

export default function ShareButton({
  title = 'Share',
  text = '',
  className = '',
}) {
  const pathname = usePathname()
  const { addToast } = useToast()

  const handleShare = async () => {
    if (typeof window === 'undefined') return

    const url = `${window.location.origin}${pathname}`

    // 1. Native Share (Mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        })
        return
      } catch {
        // کاربر Share Sheet را بسته
        addToast({
          message: 'Share cancelled',
          description:
            'You closed the share menu without selecting an app.',
          type: 'warning',
          position: 'bottom-safe left-4 md:bottom-5',
        })
        return
      }
    }

    // 2. Fallback: Clipboard
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url)
        addToast({
          message: 'Link copied',
          description: 'The page link has been copied to your clipboard.',
          type: 'success',
          position: 'bottom-safe left-4 md:bottom-5',
        })
        return
      } catch {
        // ادامه به fallback نهایی
      }
    }

    // 3. Fallback نهایی (مرورگرهای خیلی قدیمی)
    try {
      const textarea = document.createElement('textarea')
      textarea.value = url
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)

      addToast({
        message: 'Link copied',
        description: 'The page link has been copied to your clipboard.',
        type: 'success',
        position: 'bottom-safe left-4 md:bottom-5',
      })
    } catch {
      addToast({
        message: 'Unable to share',
        description:
          'Your browser does not support sharing or copying this link.',
        type: 'error',
        position: 'bottom-safe left-4 md:bottom-5',
      })
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={className}
      aria-label="Share page"
    >
      <ShareIcon className="size-6" />
    </button>
  )
}
