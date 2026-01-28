import { classNames } from "@/app/_lib/general"

export default function ProgressCircle({ textLength }) {
  const formattedTextLength = Math.max(0, Math.min(textLength, 800))
  const strokeDashoffset = (800 - formattedTextLength) / 8
  const number = 800 - textLength

  return (
    <div className="relative w-9 h-9 transition-all">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        {/* Background Circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className={classNames(
            number <= 0 ? 'text-red-200' : 'text-gray-200',
            "stroke-current"
          )}
          strokeWidth="2"
        />
        {/* Progress Circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className={classNames(
            textLength >= 800 ? 'text-red-200' : (
              number <= 20 ? 'text-yellow-200' : 'text-blue-200'
            ),
            "stroke-current"
          )}
          strokeWidth="2"
          strokeDasharray="100"
          strokeDashoffset={strokeDashoffset <= 0 ? 100 : strokeDashoffset}
          strokeLinecap="butt"
        />
      </svg>

      {/* Percentage Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <span className={classNames(
          textLength >= 800 ? 'text-red-400' : (
            number <= 20 ? 'text-yellow-400' : 'text-blue-400'
          ),
          "text-center font-bold text-[9px]"
        )}
        >
          {number < 30 && number}
        </span>
      </div>
    </div>
  )
}