export default function LoadingInformation() {
  return (
    <>
      <div className="mb-2 mt-3 max-w-sm grid gap-2 animate-pulse">
        <div className="h-4 bg-gray-400/25 rounded-full w-1/4"></div>
        <div className="h-3 bg-gray-400/25 rounded-full w-1/6"></div>
        <span className="sr-only">Loading...</span>
      </div>
      <div role="status" className="max-w-sm grid gap-1.5 animate-pulse">
        <div className="h-2 bg-gray-400/25 rounded-full w-1/4"></div>
        <div className="h-2 bg-gray-400/25 rounded-full w-2/5"></div>
        <div className="h-2 bg-gray-400/25 rounded-full w-10/12"></div>
        <div className="h-2 bg-gray-400/25 rounded-full w-2/6"></div>
        <div className="h-2 bg-gray-400/25 rounded-full w-1/2"></div>
        <span className="sr-only">Loading...</span>
      </div>
      <div className='mt-1 animate-pulse'>
        <div className="h-2 bg-gray-400/25 rounded-full w-40 my-2"></div>
      </div>
    </>
  )
}