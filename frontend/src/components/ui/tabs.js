import * as React from "react"
import { clsx } from "clsx"

const TabsContext = React.createContext()

const Tabs = React.forwardRef(({ value, onValueChange, className, ...props }, ref) => {
  const [activeTab, setActiveTab] = React.useState(value)
  
  const handleValueChange = (newValue) => {
    setActiveTab(newValue)
    onValueChange?.(newValue)
  }
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleValueChange }}>
      <div
        ref={ref}
        className={clsx("", className)}
        {...props}
      />
    </TabsContext.Provider>
  )
})
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-600",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef(({ className, value, ...props }, ref) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext)
  
  return (
    <button
      ref={ref}
      className={clsx(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        activeTab === value
          ? "bg-white text-gray-900 shadow-sm"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
        className
      )}
      onClick={() => setActiveTab(value)}
      {...props}
    />
  )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef(({ className, value, ...props }, ref) => {
  const { activeTab } = React.useContext(TabsContext)
  
  if (activeTab !== value) return null
  
  return (
    <div
      ref={ref}
      className={clsx("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}
      {...props}
    />
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }