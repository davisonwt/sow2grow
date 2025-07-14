import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { 
  Sprout, 
  Home, 
  Search, 
  Plus, 
  BarChart3, 
  Heart, 
  Gift, 
  Church, 
  User, 
  LogOut,
  Menu,
  X,
  HandHeart
} from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

export default function Layout({ children }) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  
  const handleLogout = () => {
    logout()
    navigate("/")
  }
  
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Cultivate Community Orchards", href: "/browse-orchards", icon: Search },
    { name: "Create Orchard", href: "/create-orchard", icon: Plus },
    { name: "My Orchards", href: "/my-orchards", icon: BarChart3 },
    { name: "Tithing", href: "/tithing", icon: HandHeart },
    { name: "Free-Will Gifting", href: "/free-will-gifting", icon: Gift },
  ]
  
  const isActive = (href) => location.pathname === href
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Navigation Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-green-800" style={{ fontFamily: "Playfair Display, serif" }}>
                  sow2grow
                </h1>
                <p className="text-xs text-green-600">364yhvh community farm</p>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2">
              {navigation.map((item, index) => {
                const Icon = item.icon
                // Define pastel colors for each button
                const colors = [
                  'from-pink-200 to-pink-300 border-pink-300 text-pink-800 shadow-pink-200/50',
                  'from-blue-200 to-blue-300 border-blue-300 text-blue-800 shadow-blue-200/50',
                  'from-green-200 to-green-300 border-green-300 text-green-800 shadow-green-200/50',
                  'from-yellow-200 to-yellow-300 border-yellow-300 text-yellow-800 shadow-yellow-200/50',
                  'from-purple-200 to-purple-300 border-purple-300 text-purple-800 shadow-purple-200/50',
                  'from-indigo-200 to-indigo-300 border-indigo-300 text-indigo-800 shadow-indigo-200/50'
                ]
                const colorClass = colors[index % colors.length]
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border-2 
                      bg-gradient-to-b ${colorClass} 
                      shadow-inner hover:shadow-lg hover:scale-105 active:shadow-sm active:scale-95
                      ${isActive(item.href) ? 'ring-2 ring-offset-1 ring-blue-300' : ''}
                    `}
                    style={{
                      boxShadow: isActive(item.href) 
                        ? 'inset 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.15)' 
                        : 'inset 0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-sm text-gray-700 hover:text-green-700 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>{user?.first_name} {user?.last_name}</span>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-green-100">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-green-100 text-green-700 shadow-sm"
                        : "text-gray-600 hover:text-green-700 hover:bg-green-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              
              <div className="pt-4 mt-4 border-t border-green-100">
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-green-700 hover:bg-green-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-red-700 hover:bg-red-50 w-full text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-sm border-t border-green-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center">
                  <Sprout className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-800" style={{ fontFamily: "Playfair Display, serif" }}>
                    sow2grow
                  </h3>
                  <p className="text-xs text-green-600">364yhvh community farm</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                A biblical community giving platform where growers create orchards and bestowers help them grow and stand up together.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-4">Community</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Faith-based giving</p>
                <p>• Mutual community support</p>
                <p>• Biblical principles</p>
                <p>• Transparent platform</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-4">Scripture</h4>
              <blockquote className="text-sm text-gray-600 italic">
                "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap."
                <br />
                <cite className="text-green-600 font-semibold">- Luke 6:38</cite>
              </blockquote>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-green-100 text-center text-sm text-gray-600">
            <p>&copy; 2024 364yhvh Community Farm. Built with love for the community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}