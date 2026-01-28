export function PriceCardSkeleton() {
  return (
    <div className="rounded-3xl bg-gray-400/20 p-3 shadow-sm min-w-[40vw] md:min-w-[25vw] md:max-w-64 ms-2 animate-pulse space-y-2">
      <div className="h-3 w-1/2 bg-gray-400/20 rounded-full mx-auto" />
      <div className="h-6 w-full bg-gray-400/30 rounded-3xl mx-auto" />
      <div className="h-3 w-1/4 bg-gray-400/30 rounded-3xl mx-auto" />
      <div className="h-3 w-3/4 bg-gray-400/20 rounded-full mx-auto" />
    </div>
  )
}