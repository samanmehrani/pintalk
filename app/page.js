'use client'

import dynamic from 'next/dynamic'

const components = Array.from({ length: 5 }, (_, i) =>
  dynamic(() => import(`@/app/_ui/home/section-${i + 1}`))
)

export default function Home() {
  return components.map((Component, index) => (
    <Component key={index} as='div' />
  ))
}
