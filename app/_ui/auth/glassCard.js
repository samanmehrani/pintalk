'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import image from '@/public/lv_bag_1647340885_8fe9b6c2_progressive.jpg'

export default function GlassCard() {
  const cards = [
    {
      id: 1,
      section: (
        <div className="size-full flex flex-col items-center justify-center p-4 bg-gradient-to-bl from-rose-950">
          <p className="text-white text-[9px] sm:text-xs md:text-sm xl:text-base px-1 text-center">Discover breathtaking travel destinations and plan your next adventure.</p>
        </div>
      )
    },
    {
      id: 2,
      label: 'Shopping',
      image: image,
    },
    {
      id: 3,
      section: (
        <div className="size-full flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-indigo-700 from-15% to-blue-100">
          <p className="text-white text-xs sm:text-sm xl:text-base text-center">Explore the latest in modern art from around the world.</p>
        </div>
      )
    },
  ]

  return (
    <div className="h-full flex items-center justify-start gap-x-10 md:gap-x-20 ms-auto sm:mx-auto px-6 z-10">
      {cards.map((card, index) => {
        const isEven = index % 2 === 0
        const baseRotate = isEven ? 5 : -5

        return (
          <motion.div
            key={card.id}
            className={isEven ? '-mt-6' : ''}
            initial={{ scale: 1, rotate: baseRotate }}
            animate={{
              scale: [1, 1.02, 1],
              rotate: [
                baseRotate,
                baseRotate + (isEven ? 1.5 : -1.5),
                baseRotate,
              ],
            }}
            transition={{
              duration: 1.5,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: index * 0.35,
            }}
          >
            <div className="relative w-28 sm:w-32 md:w-40 xl:w-48 aspect-[5/6] rounded-2xl bg-gray-400/25 backdrop-blur-md flex items-center justify-center overflow-hidden">
              {card.image ? (
                <Image
                  fill
                  alt=""
                  src={card.image}
                  unoptimized
                  placeholder='blur'
                  className="size-full object-cover"
                />
              ) : card.section}

              {card.label && (
                <span className="absolute bottom-2.5 left-3 font-bold text-xs md:text-sm text-white">
                  {card.label}
                </span>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
