import * as React from "react"
import { clsx } from "clsx"

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "button"
  
  const variants = {
    default: "bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg",
    destructive: "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 shadow-sm hover:shadow-md",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm hover:shadow-md",
    ghost: "hover:bg-gray-100 text-gray-700",
    link: "text-green-600 underline-offset-4 hover:underline",
  }
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 text-sm",
    lg: "h-11 px-8 text-lg",
    icon: "h-10 w-10",
  }
  
  return (
    <Comp
      className={clsx(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
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