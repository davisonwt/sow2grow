import * as React from "react"
import { clsx } from "clsx"
import { ChevronDown } from "lucide-react"

const Select = ({ children, value, onValueChange, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(value)
  
  const handleSelect = (newValue) => {
    setSelectedValue(newValue)
    setIsOpen(false)
    onValueChange?.(newValue)
  }
  
  return (
    <div className="relative">
      {React.Children.map(children, child => 
        React.cloneElement(child, { 
          isOpen, 
          setIsOpen, 
          selectedValue, 
          handleSelect,
          ...props 
        })
      )}
    </div>
  )
}

const SelectTrigger = React.forwardRef(({ className, children, isOpen, setIsOpen, ...props }, ref) => (
  <button
    ref={ref}
    className={clsx(
      "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    onClick={() => setIsOpen(!isOpen)}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </button>
))
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = ({ placeholder, selectedValue, ...props }) => (
  <span className="truncate">
    {selectedValue || placeholder}
  </span>
)

const SelectContent = React.forwardRef(({ className, children, isOpen, handleSelect, ...props }, ref) => {
  if (!isOpen) return null
  
  return (
    <div
      ref={ref}
      className={clsx(
        "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm",
        className
      )}
      {...props}
    >
      {React.Children.map(children, child => 
        React.cloneElement(child, { handleSelect })
      )}
    </div>
  )
})
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef(({ className, children, value, handleSelect, ...props }, ref) => (
  <button
    ref={ref}
    className={clsx(
      "relative cursor-default select-none py-2 pl-3 pr-9 text-left text-gray-900 hover:bg-gray-50 focus:bg-gray-50 w-full",
      className
    )}
    onClick={() => handleSelect(value)}
    {...props}
  >
    {children}
  </button>
))
SelectItem.displayName = "SelectItem"

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }