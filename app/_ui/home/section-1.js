import { classNames } from "@/app/_lib/general"
import { useRouter } from "next/navigation"

export default function FirstSection() {
  const router = useRouter()

  return (
    <div className="bg-black h-screen">
      <div className="relative lg:isolate overflow-hidden">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 animate-pulse"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ca8a04] to-[#7e22ce] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="h-screen flex items-center">
          <div className="mx-auto max-w-2xl px-2">
            <div className="mb-6 flex justify-center md:hidden">
              <div className="relative rounded-full px-3 py-1 text-xs transition-all text-gray-400 ring-1 ring-white/10 active:scale-105 active:ring-white/20 lg:hover:ring-white/20">
                A way to receive your reports and questions.{' '}
                <button
                  onClick={() => router.push('/contactus')}
                  className="font-semibold text-white"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  Contact Us <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>
            <div className="text-center">
              <h1
                className={classNames(
                  // animate && 'slide-in-left',
                  'text-4xl font-bold tracking-tight text-white sm:text-6xl'
                )}
              >
                Connecting Global Trade, One Click at a Time
              </h1>
              <p
                className={classNames(
                  // animate && 'slide-in-right',
                  'mt-4 text-lg leading-8 text-gray-300'
                )}
              >
                Connect with businesses globally by showcasing your import and export products and discovering new partnerships all in one place.
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#451a03] to-[#a8a29e] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}