export function UserCardSkeleton() {
  return (
    <div className="flex items-center justify-between gap-x-3 py-3 w-full animate-pulse">
      <div className="flex items-center gap-x-2.5 w-1/2">
        <div className="inline-flex overflow-hidden rounded-full ring-1 ring-gray-400/25 bg-gray-300/30 size-12 aspect-square" />

        <div className="flex flex-col gap-y-1 w-2/3">
          <div className="h-4 w-full bg-gray-300/40 rounded-full" />
          <div className="h-3 w-2/3 bg-gray-300/30 rounded-full" />
        </div>
      </div>

      <div className="flex justify-start text-xs font-medium gap-x-8 mx-2">
        <div className="space-x-1 flex items-center">
          <div className="h-4 w-5 bg-gray-300/40 rounded-md" />
          <div className="h-3 w-8 bg-gray-300/30 rounded-md" />
        </div>
        <div className="space-x-1 flex items-center">
          <div className="h-4 w-5 bg-gray-300/40 rounded-md" />
          <div className="h-3 w-6 bg-gray-300/30 rounded-md" />
        </div>
      </div>
    </div>

  )
}