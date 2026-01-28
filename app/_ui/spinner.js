import { motion } from "framer-motion"

export default function Spinner({ size = 24 }) {
  return (
    <motion.svg
      key="loader"
      width={size}
      height={size}
      viewBox="0 0 50 50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, rotate: 360 }}
      // exit={{ opacity: 1, scale: 1 }}
      transition={{
        rotate: { repeat: Infinity, duration: 1.1, ease: "linear" },
        opacity: { duration: 0.25 },
        scale: { duration: 0.2 }
      }}
    >
      <motion.circle
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="5"
        fill="transparent"
        strokeLinecap="round"
        animate={{
          strokeDasharray: ["1, 125", "80, 125", "1, 125"],
          strokeDashoffset: [0, -60, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut"
        }}
      />
    </motion.svg>
  )
}