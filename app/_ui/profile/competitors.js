import Link from "next/link";

export default function CompetitorsTab() {
  return (
    <div className="flex flex-col items-center justify-center pb-16 px-10 text-center text-gray-400 min-h-[calc(49.1vh)]">
      <h1 className="font-bold">Competitors</h1>
      <p className="mt-3 text-xs">Do you know how many companies around you have similar activities to yours? We give you this information in the <Link href='/premium' className="font-bold underline active:no-underline">premium</Link> version</p>
    </div>
  )
}