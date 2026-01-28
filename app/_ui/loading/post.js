export default function LoadingPost() {
  return (
    <div className="grid gap-y-2.5 py-3">
      <div className="flex items-center gap-x-2">
        <div className='bg-gray-400/25 h-2.5 w-1/5 rounded-full animate-pulse' />
        <div className='bg-gray-400/25 h-5 w-1/6 rounded-full animate-pulse' />
        <div className='bg-gray-400/25 ms-auto mr-2.5 h-1.5 w-5 rounded-full animate-pulse' />
      </div>
      <div className="grid gap-y-2">
        <div className='bg-gray-400/25 h-2.5 rounded-full animate-pulse' />
        <div className='bg-gray-400/25 h-2.5 rounded-full animate-pulse' />
        <div className='bg-gray-400/25 h-2.5 w-2/3 rounded-full animate-pulse' />
        <div className='bg-gray-400/25 h-2.5 w-5/6 rounded-full animate-pulse' />
      </div>
      <div className="flex items-center gap-x-2">
        <div className='bg-gray-400/25 size-7 rounded-full animate-pulse' />
        <div className='bg-gray-400/25 h-3.5 w-1/6 rounded-full animate-pulse' />
        <div className='bg-gray-400/25 h-3.5 w-1/5 rounded-full animate-pulse' />
      </div>
    </div>
  )
}