import * as React from "react"
import { clsx } from "clsx"

const Card = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "border border-gray-200 bg-white hover:border-green-300",
    elevated: "border-0 bg-white shadow-lg hover:shadow-2xl",
    glass: "border border-white border-opacity-20 bg-white bg-opacity-90 backdrop-blur-lg",
    gradient: "border-0 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100",
    orchard: "border-2 border-green-200 bg-gradient-to-br from-green-50 via-white to-emerald-50 hover:border-green-300 hover:shadow-lg",
    rain: "border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 hover:border-blue-300 hover:shadow-lg",
    harvest: "border-2 border-orange-200 bg-gradient-to-br from-orange-50 via-white to-yellow-50 hover:border-orange-300 hover:shadow-lg"
  }
  
  return (
    <div
      ref={ref}
      className={clsx(
        "rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent before:opacity-0 hover:before:opacity-20 before:transform before:translate-x-[-100%] hover:before:translate-x-full before:transition-transform before:duration-1000",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx("flex flex-col space-y-2 p-6 pb-4", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={clsx(
      "text-2xl font-bold leading-tight tracking-tight",
      "bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={clsx("text-sm text-gray-600 leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={clsx("p-6 pt-2", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx("flex items-center p-6 pt-4 gap-3", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }