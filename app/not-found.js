import Link from "next/link"

export default function NotFound() {
  return (
    <>
      <main className="grid h-screen place-items-center px-6 py-36 sm:py-40 lg:px-8">
        <div className="text-center">
          <p className="text-9xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            404
          </p>
          <h1 className="mt-4 text-balance text-4xl font-black tracking-tight font-sans sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-pretty text-lg text-gray-400 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-8">
            <Link href="/contactus" className="flex items-center justify-center gap-x-2 lg:hover:gap-x-3 active:gap-x-3 text-base font-semibold whitespace-nowrap w-32 transition-all">
              <p className="-mt-0.5" aria-hidden="true">&larr;</p>
              <p>Contact support</p>
            </Link>
            <Link
              href="/"
              className="rounded-full bg-foreground px-5 py-2.5 text-base font-semibold text-background shadow-sm lg:hover:scale-90 active:scale-90"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}