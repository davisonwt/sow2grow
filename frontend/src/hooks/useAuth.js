import { useState, useEffect, createContext, useContext } from "react"
import axios from "axios"

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [loading, setLoading] = useState(true)
  
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
  const API = `${BACKEND_URL}/api`
  
  useEffect(() => {
    if (token) {
      // Verify token and get user info
      axios.get(`${API}/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        if (response.data.success) {
          setUser(response.data.data)
        } else {
          // Invalid token
          localStorage.removeItem("token")
          setToken(null)
        }
      })
      .catch(() => {
        // Invalid token
        localStorage.removeItem("token")
        setToken(null)
      })
      .finally(() => {
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [token, API])
  
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API}/auth/login`, {
        email,
        password
      })
      
      if (response.data.success) {
        const { user, access_token } = response.data.data
        setUser(user)
        setToken(access_token)
        localStorage.setItem("token", access_token)
        return { success: true, user }
      } else {
        return { success: false, error: response.data.error }
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || "Login failed" 
      }
    }
  }
  
  const register = async (userData) => {
    try {
      const response = await axios.post(`${API}/auth/register`, userData)
      
      if (response.data.success) {
        const { user, access_token } = response.data.data
        setUser(user)
        setToken(access_token)
        localStorage.setItem("token", access_token)
        return { success: true, user }
      } else {
        return { success: false, error: response.data.error }
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || "Registration failed" 
      }
    }
  }
  
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
  }
  
  const updateProfile = async (profileData) => {
    try {
      const response = await axios.patch(`${API}/users/me`, profileData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (response.data.success) {
        setUser(response.data.data)
        return { success: true, user: response.data.data }
      } else {
        return { success: false, error: response.data.error }
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || "Update failed" 
      }
    }
  }
  
  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!token && !!user,
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}