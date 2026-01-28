import Image from "next/image"
import Footer from "@/app/_ui/footer"

export default function LastSection() {
  return (
    <div className="relative bg-gray-900">
      <div className="relative h-72 overflow-hidden bg-blue-950 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
        <div className="relative size-full bg-gray-950">
          <Image
            src="/1702509848176.png"
            alt="Background image"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <svg
          viewBox="0 0 926 676"
          aria-hidden="true"
          className="absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]"
        >
          <path
            fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
            fillOpacity=".4"
            d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
          />
          <defs>
            <linearGradient
              id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
              x1="926.392"
              x2="-109.635"
              y1=".176"
              y2="321.024"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#776FFF" />
              <stop offset={1} stopColor="#FF4694" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="relative mx-auto py-24 px-6 lg:px-40">
        <div className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
          <h2 className="text-base font-semibold leading-7 text-blue-400">Award winning support</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">We’re here to help</p>
          <p className="mt-6 text-sm leading-7 text-gray-300">
            We aim to create a smart and secure B2B ecosystem that simplifies global trade while eliminating fraud and inefficiencies. Our goal is to empower the next generation of entrepreneurs and contribute to economic growth worldwide.
          </p>
          <p className="mt-6 text-sm leading-7 text-gray-300">
            Launching this platform at the age of 19 was just the first step in our journey to reshape global trade. We believe that commerce and economic growth are not just business activities—they are the foundation of a strong and sustainable future. We are committed to expanding opportunities for businesses worldwide and making global trade more efficient than ever before.
          </p>
          <Footer />
        </div>
      </div>
    </div>
  )
}