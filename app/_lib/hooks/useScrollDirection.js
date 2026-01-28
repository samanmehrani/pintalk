'use client'

import { useEffect, useState } from 'react'

export function useScrollDirection(options) {
  const { threshold = 10, topOffset = 200 } = options

  const [scrollY, setScrollY] = useState(0)
  const [showNavbar, setShowNavbar] = useState(true)

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const currentY = window.scrollY
      setScrollY(currentY)

      if (currentY < topOffset) {
        setShowNavbar(true)
      } else if (currentY > lastY + threshold) {
        setShowNavbar(false)
      } else if (currentY < lastY - threshold) {
        setShowNavbar(true)
      }

      lastY = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold, topOffset])

  return {
    scrollY,
    showNavbar,
  }
}
