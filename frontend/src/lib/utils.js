import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount, currency = "USD") {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  } else if (currency === "ZAR") {
    return `R${amount.toLocaleString()}`
  }
  return amount.toLocaleString()
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export function formatRelativeTime(date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000)
  
  if (diffInSeconds < 60) {
    return "just now"
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }
}

export function getGrowthStage(daysGrowing) {
  if (daysGrowing <= 7) return "sprout"
  if (daysGrowing <= 21) return "young"
  if (daysGrowing <= 42) return "growing"
  return "mature"
}

export function getGrowthStageColor(stage) {
  switch (stage) {
    case "sprout": return "bg-green-200 text-green-800"
    case "young": return "bg-green-300 text-green-900"
    case "growing": return "bg-green-400 text-green-900"
    case "mature": return "bg-green-600 text-white"
    default: return "bg-gray-200 text-gray-800"
  }
}

export function calculateCompletionRate(filled, total) {
  if (total === 0) return 0
  return Math.round((filled / total) * 100)
}

export function generatePocketGrid(totalPockets, pocketsPerRow = 10) {
  const grid = []
  const rows = Math.ceil(totalPockets / pocketsPerRow)
  
  for (let row = 0; row < rows; row++) {
    const pocketsInRow = Math.min(pocketsPerRow, totalPockets - (row * pocketsPerRow))
    grid.push(pocketsInRow)
  }
  
  return grid
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password) {
  // At least 8 characters, one letter, one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
  return passwordRegex.test(password)
}

export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}