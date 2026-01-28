import Link from "next/link";

export default function EmcTab() {
  return (
    <div className="flex flex-col items-center justify-center pb-16 px-10 text-center text-gray-400 min-h-[calc(49.1vh)]">
      <h1 className="font-bold">EMC</h1>
      <p className="mt-3 text-xs">Some import and export companies related to your activity will be displayed for you after purchasing the <Link href='/premium' className="font-bold underline active:no-underline">premium</Link> version of the program</p>
    </div>
  )
}