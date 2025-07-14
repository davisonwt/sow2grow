import * as React from "react"
import { clsx } from "clsx"

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "button"
  
  const variants = {
    default: "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl border-0 ring-2 ring-green-200 hover:ring-green-300",
    destructive: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl border-0 ring-2 ring-red-200 hover:ring-red-300",
    outline: "border-2 border-green-300 bg-white hover:bg-green-50 text-green-700 shadow-md hover:shadow-lg hover:border-green-400 backdrop-blur-sm",
    secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg border border-gray-300",
    ghost: "hover:bg-green-50 text-green-700 hover:shadow-md transition-all duration-300",
    link: "text-green-600 underline-offset-4 hover:underline hover:text-green-700 transition-colors duration-200",
    rain: "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl border-0 ring-2 ring-blue-200 hover:ring-blue-300 animate-pulse hover:animate-none",
    golden: "bg-gradient-to-r from-yellow-400 to-amber-500 text-white hover:from-yellow-500 hover:to-amber-600 shadow-lg hover:shadow-xl border-0 ring-2 ring-yellow-200 hover:ring-yellow-300",
    harvest: "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl border-0 ring-2 ring-orange-200 hover:ring-orange-300"
  }
  
  const sizes = {
    default: "h-12 px-6 py-3 text-base",
    sm: "h-9 px-4 text-sm",
    lg: "h-14 px-8 text-lg font-semibold",
    xl: "h-16 px-10 text-xl font-bold",
    icon: "h-12 w-12",
  }
  
  return (
    <Comp
      className={clsx(
        "inline-flex items-center justify-center whitespace-nowrap rounded-2xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 transform hover:scale-105 cursor-pointer relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-white before:opacity-0 hover:before:opacity-10 before:transition-opacity before:duration-300",
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent after:opacity-0 hover:after:opacity-20 after:transform after:skew-x-12 after:translate-x-full hover:after:translate-x-[-100%] after:transition-transform after:duration-700",
        variants[variant || "default"],
        sizes[size || "default"],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }