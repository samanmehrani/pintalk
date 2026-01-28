'use client'

import { classNames } from '@/app/_lib/general'
import { Tab } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useMemo, useState } from 'react'

function randomRotate() {
  return Math.floor(Math.random() * 15) - 5
}

export default function ImageGallery({ images }) {
  const [index, setIndex] = useState(0)

  const rotations = useMemo(
    () => images.map(() => randomRotate()),
    [images]
  )

  return (
    <Tab.Group selectedIndex={index} onChange={setIndex}>
      <div className="relative w-full pt-safe">
        <div className="relative aspect-[3/4] w-3/4 mx-auto">
          <AnimatePresence>
            {images.map((image, i) => {
              const isActive = i === index

              return (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-3xl overflow-hidden bg-gray-400/25 touch-pan-x"
                  style={{
                    zIndex: isActive ? 20 : 10 - i,
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: isActive ? 1 : 0.85,
                    scale: isActive ? 1 : 0.95,
                    rotate: rotations[i],
                  }}
                  exit={{ opacity: 0 }}
                  drag={isActive ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -50 && index < images.length - 1) {
                      setIndex(index + 1)
                    }
                    if (info.offset.x > 50 && index > 0) {
                      setIndex(index - 1)
                    }
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <Image
                    src={image.url}
                    alt="Image"
                    fill
                    className="object-cover object-center select-none"
                    draggable={false}
                    unoptimized
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        <Tab.List className="mt-10 grid grid-cols-5 gap-3">
          {images.map((image, i) => (
            <Tab key={i} className="outline-none">
              {({ selected }) => (
                <div
                  className={classNames(
                    "relative aspect-square rounded-xl overflow-hidden transition-all outline-none",
                    selected ? 'shadow-lg shadow-indigo-400/50' : 'opacity-25'
                  )}
                >
                  <Image
                    src={image.url}
                    alt="Thumb"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
            </Tab>
          ))}
        </Tab.List>
      </div>
    </Tab.Group>
  )
}