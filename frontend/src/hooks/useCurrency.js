import { useState, useEffect } from "react"

export function useCurrency() {
  const [currency, setCurrency] = useState("USD")
  const [exchangeRate, setExchangeRate] = useState(1)
  
  useEffect(() => {
    // In a real app, you would fetch current exchange rates
    // For now, we'll use a fixed rate
    const rates = {
      USD: 1,
      ZAR: 18.5, // 1 USD = 18.5 ZAR (approximate)
    }
    
    setExchangeRate(rates[currency] || 1)
  }, [currency])
  
  const formatAmount = (amount, targetCurrency = currency) => {
    const convertedAmount = amount * (targetCurrency === "ZAR" ? 18.5 : 1)
    
    if (targetCurrency === "ZAR") {
      return `R${convertedAmount.toLocaleString()}`
    } else {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(convertedAmount)
    }
  }
  
  const convertAmount = (amount, fromCurrency, toCurrency) => {
    const rates = {
      USD: 1,
      ZAR: 18.5,
    }
    
    // Convert to USD first, then to target currency
    const usdAmount = amount / rates[fromCurrency]
    return usdAmount * rates[toCurrency]
  }
  
  return {
    currency,
    setCurrency,
    exchangeRate,
    formatAmount,
    convertAmount,
  }
}