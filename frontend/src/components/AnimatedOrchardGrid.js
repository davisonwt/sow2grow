import React, { useState, useEffect } from "react"
import { cn, getGrowthStage, getGrowthStageColor } from "../lib/utils"
import { Sprout, Sparkles, Heart, Star } from "lucide-react"

export function AnimatedOrchardGrid({
  totalPockets = 120,
  pocketPrice = 150,
  takenPockets = [],
  selectedPockets = [],
  onPocketClick,
  pocketsPerRow = 10,
  showNumbers = true,
  interactive = true,
  className = "",
}) {
  const [animatingPockets, setAnimatingPockets] = useState(new Set())
  const [sparklingPockets, setSparklingPockets] = useState(new Set())
  
  // Generate grid layout
  const generateGrid = () => {
    const grid = []
    const rows = Math.ceil(totalPockets / pocketsPerRow)
    
    for (let row = 0; row < rows; row++) {
      const pocketsInRow = Math.min(pocketsPerRow, totalPockets - (row * pocketsPerRow))
      const rowPockets = []
      
      for (let col = 0; col < pocketsInRow; col++) {
        const pocketNumber = row * pocketsPerRow + col + 1
        rowPockets.push(pocketNumber)
      }
      
      grid.push(rowPockets)
    }
    
    return grid
  }
  
  const grid = generateGrid()
  
  // Animate new selections
  useEffect(() => {
    const newSelections = selectedPockets.filter(pocket => 
      !animatingPockets.has(pocket)
    )
    
    if (newSelections.length > 0) {
      const newAnimating = new Set(animatingPockets)
      newSelections.forEach(pocket => {
        newAnimating.add(pocket)
      })
      setAnimatingPockets(newAnimating)
      
      // Remove animation after 600ms
      setTimeout(() => {
        setAnimatingPockets(prev => {
          const updated = new Set(prev)
          newSelections.forEach(pocket => {
            updated.delete(pocket)
          })
          return updated
        })
      }, 600)
    }
  }, [selectedPockets, animatingPockets])
  
  // Sparkling effect for mature pockets
  useEffect(() => {
    const maturePockets = takenPockets.filter(pocket => 
      getGrowthStage(pocket.daysGrowing) === "mature"
    )
    
    if (maturePockets.length > 0) {
      const interval = setInterval(() => {
        const randomPocket = maturePockets[Math.floor(Math.random() * maturePockets.length)]
        setSparklingPockets(prev => new Set([...prev, randomPocket.number]))
        
        setTimeout(() => {
          setSparklingPockets(prev => {
            const updated = new Set(prev)
            updated.delete(randomPocket.number)
            return updated
          })
        }, 2000)
      }, 3000)
      
      return () => clearInterval(interval)
    }
  }, [takenPockets])
  
  const getPocketStatus = (pocketNumber) => {
    const takenPocket = takenPockets.find(p => p.number === pocketNumber)
    const isSelected = selectedPockets.includes(pocketNumber)
    const isAnimating = animatingPockets.has(pocketNumber)
    const isSparkling = sparklingPockets.has(pocketNumber)
    
    return {
      isTaken: !!takenPocket,
      isSelected,
      isAnimating,
      isSparkling,
      takenPocket,
      growthStage: takenPocket ? getGrowthStage(takenPocket.daysGrowing) : null,
    }
  }
  
  const getPocketContent = (pocketNumber, status) => {
    if (status.isTaken) {
      // Show growth stage icon
      switch (status.growthStage) {
        case "sprout":
          return <Sprout className="h-3 w-3 text-green-600" />
        case "young":
          return <Sprout className="h-4 w-4 text-green-700" />
        case "growing":
          return <Sprout className="h-5 w-5 text-green-800" />
        case "mature":
          return <Star className="h-5 w-5 text-yellow-600" />
        default:
          return <Sprout className="h-3 w-3 text-green-600" />
      }
    } else if (status.isSelected) {
      return <Heart className="h-4 w-4 text-rose-600" />
    } else if (showNumbers) {
      return <span className="text-xs font-medium text-gray-600">{pocketNumber}</span>
    }
    
    return null
  }
  
  const getPocketClasses = (pocketNumber, status) => {
    const baseClasses = "relative w-8 h-8 rounded-full border-2 transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95"
    
    if (status.isTaken) {
      // Green circles with seedling for taken pockets
      return cn(
        baseClasses,
        "bg-gradient-to-br from-green-300 to-green-500 border-green-600",
        "hover:shadow-lg",
        status.isSparkling && "animate-pulse ring-2 ring-yellow-400 ring-opacity-50"
      )
    } else if (status.isSelected) {
      // Blue circles for selected pockets
      return cn(
        baseClasses,
        "bg-gradient-to-br from-blue-300 to-blue-500 border-blue-600 shadow-md",
        status.isAnimating && "animate-bounce scale-110"
      )
    } else {
      // Brown circles for available pockets
      return cn(
        baseClasses,
        "bg-gradient-to-br from-amber-200 to-amber-400 border-amber-600 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-200 hover:to-blue-300 hover:shadow-md",
        !interactive && "cursor-default"
      )
    }
  }
  
  const handlePocketClick = (pocketNumber) => {
    if (!interactive) return
    
    const status = getPocketStatus(pocketNumber)
    if (status.isTaken) return
    
    onPocketClick?.(pocketNumber)
  }
  
  const getPocketTooltip = (pocketNumber, status) => {
    if (status.isTaken) {
      return `Pocket ${pocketNumber} - ${status.takenPocket.bestower} - ${status.takenPocket.daysGrowing} days growing (${status.growthStage})`
    } else if (status.isSelected) {
      return `Pocket ${pocketNumber} - Selected (R${pocketPrice})`
    } else {
      return `Pocket ${pocketNumber} - Available (R${pocketPrice})`
    }
  }
  
  return (
    <div className={cn("space-y-4", className)}>
      {/* Grid Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-rose-100 border-2 border-rose-400 rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-200 border-2 border-green-400 rounded"></div>
            <span>Growing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 border-2 border-green-400 rounded"></div>
            <span>Mature</span>
          </div>
        </div>
      </div>
      
      {/* Orchard Grid */}
      <div className="bg-gradient-to-br from-green-50 to-amber-50 p-8 rounded-2xl border-2 border-green-200 shadow-inner">
        <div className="space-y-3">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2">
              {row.map(pocketNumber => {
                const status = getPocketStatus(pocketNumber)
                
                return (
                  <div
                    key={pocketNumber}
                    className={getPocketClasses(pocketNumber, status)}
                    onClick={() => handlePocketClick(pocketNumber)}
                    title={getPocketTooltip(pocketNumber, status)}
                  >
                    {/* Pocket Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {getPocketContent(pocketNumber, status)}
                    </div>
                    
                    {/* Sparkling Effect */}
                    {status.isSparkling && (
                      <div className="absolute -top-1 -right-1">
                        <Sparkles className="h-3 w-3 text-yellow-500 animate-spin" />
                      </div>
                    )}
                    
                    {/* Pulse Effect for New Selections */}
                    {status.isAnimating && (
                      <div className="absolute inset-0 rounded-lg bg-rose-400 opacity-50 animate-ping"></div>
                    )}
                    
                    {/* Growth Progress Ring */}
                    {status.isTaken && (
                      <div className="absolute -inset-0.5 rounded-lg">
                        <div 
                          className={cn(
                            "absolute inset-0 rounded-lg border-2 border-dashed",
                            status.growthStage === "sprout" && "border-green-300 animate-pulse",
                            status.growthStage === "young" && "border-green-400",
                            status.growthStage === "growing" && "border-green-500",
                            status.growthStage === "mature" && "border-yellow-400 animate-pulse"
                          )}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Growth Stage Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
        <div className="space-y-2">
          <div className="w-8 h-8 bg-green-200 rounded-lg mx-auto flex items-center justify-center">
            <Sprout className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <div className="font-semibold text-green-800">Sprout</div>
            <div className="text-green-600">0-7 days</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="w-8 h-8 bg-green-300 rounded-lg mx-auto flex items-center justify-center">
            <Sprout className="h-5 w-5 text-green-700" />
          </div>
          <div>
            <div className="font-semibold text-green-800">Young</div>
            <div className="text-green-600">8-21 days</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="w-8 h-8 bg-green-400 rounded-lg mx-auto flex items-center justify-center">
            <Sprout className="h-6 w-6 text-green-800" />
          </div>
          <div>
            <div className="font-semibold text-green-800">Growing</div>
            <div className="text-green-600">22-42 days</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg mx-auto flex items-center justify-center">
            <Star className="h-5 w-5 text-yellow-400" />
          </div>
          <div>
            <div className="font-semibold text-green-800">Mature</div>
            <div className="text-green-600">43+ days</div>
          </div>
        </div>
      </div>
    </div>
  )
}