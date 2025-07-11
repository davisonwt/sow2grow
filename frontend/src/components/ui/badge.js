import * as React from "react"
import { clsx } from "clsx"

function Badge({ className, variant, ...props }) {
  const variants = {
    default: "bg-gray-900 text-white hover:bg-gray-800",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50",
    success: "bg-green-600 text-white hover:bg-green-700",
    warning: "bg-yellow-600 text-white hover:bg-yellow-700",
    info: "bg-blue-600 text-white hover:bg-blue-700",
  }
  
  return (
    <div
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant || "default"],
        className
      )}
      {...props}
    />
  )
}

export { Badge }