"use client"

import { useEffect, useState } from "react"

export function useDeviceType() {
  const [state, setState] = useState({
    isMobile: false,
    isTablet: false,
    isLaptop: true,
  })

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)")
    const tablet = window.matchMedia("(min-width: 768px) and (max-width: 1023px)")
    const laptop = window.matchMedia("(min-width: 1024px)")

    const update = () => {
      setState({
        isMobile: mobile.matches,
        isTablet: tablet.matches,
        isLaptop: laptop.matches,
      })
    }

    update()

    mobile.addEventListener("change", update)
    tablet.addEventListener("change", update)
    laptop.addEventListener("change", update)

    return () => {
      mobile.removeEventListener("change", update)
      tablet.removeEventListener("change", update)
      laptop.removeEventListener("change", update)
    }
  }, [])

  return state
}
