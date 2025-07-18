import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useCurrency } from "../hooks/useCurrency"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { 
  Sprout, 
  Heart, 
  Gift, 
  Church, 
  Plus, 
  Search, 
  BarChart3,
  Star,
  Users,
  TrendingUp,
  ArrowRight,
  Sparkles
} from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()
  const { formatAmount } = useCurrency()
  
  // Mock data for dashboard
  const dashboardData = {
    totalOrchards: 3,
    totalBestowed: 2450,
    totalReceived: 1800,
    activeBestowals: 12,
    recentActivity: [
      { type: "bestowed", amount: 150, orchard: "Solar Panel Installation", time: "2 hours ago" },
      { type: "received", amount: 300, orchard: "2019 Toyota Corolla", time: "5 hours ago" },
      { type: "created", orchard: "Laptop for Studies", time: "1 day ago" },
      { type: "tithing", amount: 100, time: "3 days ago" },
    ],
    featuredOrchards: [
      { 
        id: 1, 
        title: "Emergency Medical Fund", 
        category: "The Gift of Wellness", 
        progress: 85, 
        needed: 5000, 
        raised: 4250,
        pockets: 120,
        filledPockets: 102,
        grower: "Maria S.",
        location: "Cape Town"
      },
      { 
        id: 2, 
        title: "Small Business Equipment", 
        category: "The Gift of Tools", 
        progress: 45, 
        needed: 8000, 
        raised: 3600,
        pockets: 160,
        filledPockets: 72,
        grower: "John M.",
        location: "Johannesburg"
      },
      { 
        id: 3, 
        title: "Education Fund", 
        category: "The Gift of Innovation", 
        progress: 70, 
        needed: 12000, 
        raised: 8400,
        pockets: 240,
        filledPockets: 168,
        grower: "Sarah K.",
        location: "Durban"
      },
    ]
  }
  
  const getActivityIcon = (type) => {
    switch (type) {
      case "bestowed": return <Heart className="h-4 w-4 text-rose-600" />
      case "received": return <TrendingUp className="h-4 w-4 text-green-600" />
      case "created": return <Plus className="h-4 w-4 text-blue-600" />
      case "tithing": return <Church className="h-4 w-4 text-amber-600" />
      default: return <Sprout className="h-4 w-4 text-green-600" />
    }
  }
  
  const getActivityColor = (type) => {
    switch (type) {
      case "bestowed": return "bg-rose-50 border-rose-200"
      case "received": return "bg-green-50 border-green-200"
      case "created": return "bg-blue-50 border-blue-200"
      case "tithing": return "bg-amber-50 border-amber-200"
      default: return "bg-gray-50 border-gray-200"
    }
  }
  
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-100 to-amber-100 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
              Welcome back, {user?.first_name}! 🌱
            </h1>
            <p className="text-green-600 text-lg">
              Your farm stall in the 364yhvh Community Farm
            </p>
            <Badge className="mt-2 bg-green-600 text-white">
              <Sprout className="h-3 w-3 mr-1" />
              Farm Stall Owner
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-800">{dashboardData.totalOrchards}</div>
            <div className="text-sm text-green-600">Active Orchards</div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/browse-orchards">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="font-semibold text-rose-800 mb-2">Browse Farm Mall</h3>
              <p className="text-sm text-rose-600">Visit other farm stalls and bestow into orchards</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/create-orchard">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Plant New Seed</h3>
              <p className="text-sm text-green-600">Create a new orchard in your farm stall</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/tithing">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Church className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-amber-800 mb-2">Tithing</h3>
              <p className="text-sm text-amber-600">Give to yhvh364 gosat's ministry</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/free-will-gifting">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-purple-800 mb-2">Free-Will Gifting</h3>
              <p className="text-sm text-purple-600">Make voluntary community gifts</p>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/90 backdrop-blur-sm border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Total Bestowed</CardTitle>
            <Heart className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{formatAmount(dashboardData.totalBestowed)}</div>
            <p className="text-xs text-green-600">Your generous giving</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Received</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">{formatAmount(dashboardData.totalReceived)}</div>
            <p className="text-xs text-blue-600">Community support received</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/90 backdrop-blur-sm border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Active Bestowals</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">{dashboardData.activeBestowals}</div>
            <p className="text-xs text-purple-600">Ongoing support</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Featured Orchards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-green-800" style={{ fontFamily: "Playfair Display, serif" }}>
              Featured Orchards
            </h2>
            <Link to="/browse-orchards">
              <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {dashboardData.featuredOrchards.map((orchard) => (
              <Card key={orchard.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{orchard.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{orchard.category}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="h-3 w-3" />
                        <span>{orchard.grower}</span>
                        <span>•</span>
                        <span>{orchard.location}</span>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {orchard.progress}%
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{formatAmount(orchard.raised)} / {formatAmount(orchard.needed)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${orchard.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{orchard.filledPockets} / {orchard.pockets} pockets</span>
                      <span>{orchard.pockets - orchard.filledPockets} remaining</span>
                    </div>
                  </div>
                  
                  <Link to={`/animated-orchard/${orchard.id}`}>
                    <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                      <Heart className="h-4 w-4 mr-2" />
                      Bestow Support
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-green-800" style={{ fontFamily: "Playfair Display, serif" }}>
              Recent Activity
            </h2>
            <Link to="/my-orchards">
              <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {dashboardData.recentActivity.map((activity, index) => (
              <Card key={index} className={`${getActivityColor(activity.type)} hover:shadow-md transition-shadow`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          {activity.type === "bestowed" && (
                            <p className="text-sm font-medium text-gray-800">
                              You bestowed {formatAmount(activity.amount)} into <span className="text-rose-600">{activity.orchard}</span>
                            </p>
                          )}
                          {activity.type === "received" && (
                            <p className="text-sm font-medium text-gray-800">
                              Received {formatAmount(activity.amount)} for <span className="text-green-600">{activity.orchard}</span>
                            </p>
                          )}
                          {activity.type === "created" && (
                            <p className="text-sm font-medium text-gray-800">
                              Created new orchard: <span className="text-blue-600">{activity.orchard}</span>
                            </p>
                          )}
                          {activity.type === "tithing" && (
                            <p className="text-sm font-medium text-gray-800">
                              Made a tithing of {formatAmount(activity.amount)}
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-amber-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Community Impact</h3>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Your participation in the 364yhvh Community Farm has helped <strong>23 growers</strong> in their journey, 
              creating a ripple effect of blessings throughout the community.
            </p>
            <blockquote className="text-sm italic text-green-700 border-l-4 border-green-300 pl-4">
              "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, 
              will be poured into your lap." - Luke 6:38
            </blockquote>
          </div>
        </div>
      </div>
      
      {/* Quick Links */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-800 mb-4">Quick Links</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/my-orchards" className="flex items-center gap-2 p-3 rounded-lg hover:bg-green-50 transition-colors">
            <BarChart3 className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700">My Orchards</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-2 p-3 rounded-lg hover:bg-green-50 transition-colors">
            <Users className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700">Profile</span>
          </Link>
          <Link to="/admin/analytics" className="flex items-center gap-2 p-3 rounded-lg hover:bg-green-50 transition-colors">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700">Analytics</span>
          </Link>
          <Link to="/app-flow" className="flex items-center gap-2 p-3 rounded-lg hover:bg-green-50 transition-colors">
            <Star className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700">App Flow</span>
          </Link>
        </div>
      </div>
    </div>
  )
}