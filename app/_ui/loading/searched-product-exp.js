export default function LoadingPoroductExplore() {
  return (
    <div className='grid grid-cols-4 p-3'>
      <div className='bg-gray-400/25 aspect-square rounded-xl animate-pulse' />
      <div className='grid gap-y-1 col-span-3 text-left px-3'>
        <div className='bg-gray-400/25 h-3 rounded-xl animate-pulse' />
        <div className='bg-gray-400/25 h-3 rounded-xl animate-pulse' />
        <div className='bg-gray-400/25 h-3 w-3/5 rounded-xl animate-pulse' />
        <div className='bg-gray-400/25 h-5 mt-2 w-14 rounded-full animate-pulse' />
      </div>
    </div>
  )
}