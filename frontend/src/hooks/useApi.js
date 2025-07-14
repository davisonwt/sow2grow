import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "./useAuth"

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const API = `${BACKEND_URL}/api`

export function useApi() {
  const { token } = useAuth()
  
  const createAuthHeaders = () => {
    return token ? { Authorization: `Bearer ${token}` } : {}
  }
  
  const api = {
    // Orchard endpoints
    getOrchards: async (params = {}) => {
      const response = await axios.get(`${API}/orchards`, { 
        params,
        headers: createAuthHeaders() 
      })
      return response.data
    },
    
    getOrchard: async (id) => {
      const response = await axios.get(`${API}/orchards/${id}`, {
        headers: createAuthHeaders()
      })
      return response.data
    },
    
    createOrchard: async (orchardData) => {
      const response = await axios.post(`${API}/orchards`, orchardData, {
        headers: createAuthHeaders()
      })
      return response.data
    },
    
    updateOrchard: async (id, orchardData) => {
      const response = await axios.patch(`${API}/orchards/${id}`, orchardData, {
        headers: createAuthHeaders()
      })
      return response.data
    },
    
    deleteOrchard: async (id) => {
      const response = await axios.delete(`${API}/orchards/${id}`, {
        headers: createAuthHeaders()
      })
      return response.data
    },
    
    bestowIntoOrchard: async (id, pocketNumbers) => {
      const response = await axios.post(`${API}/orchards/${id}/bestow`, {
        orchard_id: id,
        pocket_numbers: pocketNumbers
      }, {
        headers: createAuthHeaders()
      })
      return response.data
    },
    
    completeOrchard: async (id) => {
      const response = await axios.post(`${API}/orchards/${id}/complete`, {}, {
        headers: createAuthHeaders()
      })
      return response.data
    },
    
    // PayPal endpoints
    getPayPalAccount: async () => {
      const response = await axios.get(`${API}/users/paypal-account`, {
        headers: createAuthHeaders()
      })
      return response.data
    },
    
    createPayPalAccount: async (accountData) => {
      const response = await axios.post(`${API}/users/paypal-account`, accountData, {
        headers: createAuthHeaders()
      })
      return response.data
    },
    
    updatePayPalAccount: async (accountData) => {
      const response = await axios.put(`${API}/users/paypal-account`, accountData, {
        headers: createAuthHeaders()
      })
      return response.data
    },
    
    verifyPayPalAccount: async () => {
      const response = await axios.post(`${API}/users/paypal-account/verify`, {}, {
        headers: createAuthHeaders()
      })
      return response.data
    },
    
    // Payment endpoints
    getPaymentConfig: async () => {
      const response = await axios.get(`${API}/payments/config`)
      return response.data
    },
    
    createPaypalPayment: async (paymentData) => {
      const response = await axios.post(`${API}/payments/paypal-create`, paymentData, {
        headers: createAuthHeaders()
      })
      return response.data
    },
    processCardPayment: async (paymentData) => {
      const response = await axios.post(`${API}/payments/card`, paymentData, {
        headers: createAuthHeaders()
      })
      return response.data
    },
    
    createPayPalOrder: async (paymentData) => {
      const response = await axios.post(`${API}/payments/paypal-create`, paymentData, {
        headers: createAuthHeaders()
      })
      return response.data
    },
    
    capturePayPalOrder: async (orderId) => {
      const response = await axios.post(`${API}/payments/paypal-capture`, { order_id: orderId }, {
        headers: createAuthHeaders()
      })
      return response.data
    },
    
    // Analytics endpoints
    getAnalytics: async (params = {}) => {
      const response = await axios.get(`${API}/analytics/categories`, {
        params,
        headers: createAuthHeaders()
      })
      return response.data
    },
    
    updateAnalytics: async () => {
      const response = await axios.post(`${API}/analytics/categories`, {}, {
        headers: createAuthHeaders()
      })
      return response.data
    }
  }
  
  return api
}

// Custom hook for fetching data with loading states
export function useFetch(endpoint, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const api = useApi()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Call the appropriate API method
        const result = await api[endpoint](options.params)
        
        if (result.success) {
          setData(result.data)
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [endpoint, JSON.stringify(options.params)])
  
  return { data, loading, error, refetch: () => fetchData() }
}