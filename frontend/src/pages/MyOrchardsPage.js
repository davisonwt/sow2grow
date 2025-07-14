import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { useCurrency } from "../hooks/useCurrency"
import { 
  Plus, 
  Sprout, 
  BarChart3, 
  Users, 
  Eye, 
  Edit,
  Trash2,
  TrendingUp,
  Clock,
  CheckCircle,
  MapPin,
  Heart
} from "lucide-react"

export default function MyOrchardsPage() {
  const { formatAmount } = useCurrency()
  
  // Mock data for user's orchards
  const [orchards] = useState([
    {
      id: "1",
      title: "2019 Toyota Corolla",
      description: "Reliable family car for daily transportation",
      category: "The Gift of Vehicles",
      seed_value: 18000,
      pocket_price: 150,
      total_pockets: 120,
      filled_pockets: 85,
      completion_rate: 70.8,
      location: "Cape Town",
      status: "active",
      created_at: "2024-01-15T10:30:00Z",
      views: 234,
      supporters: 67,
      recent_activity: "3 new bestowals today",
      timeline: "Need by March 2024",
      images: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj4yMDE5IFRveW90YSBDb3JvbGxhPC90ZXh0Pjwvc3ZnPg=="
      ]
    },
    {
      id: "2",
      title: "Laptop for Studies",
      description: "Educational laptop for computer science degree",
      category: "The Gift of Technology",
      seed_value: 8000,
      pocket_price: 150,
      total_pockets: 53,
      filled_pockets: 45,
      completion_rate: 84.9,
      location: "Cape Town",
      status: "active",
      created_at: "2024-01-10T14:20:00Z",
      views: 156,
      supporters: 39,
      recent_activity: "1 new bestowal yesterday",
      timeline: "Need by February 2024",
      images: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY2NmZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5MYXB0b3AgZm9yIFN0dWRpZXM8L3RleHQ+PC9zdmc+"
      ]
    },
    {
      id: "3",
      title: "Home Office Setup",
      description: "Professional home office equipment",
      category: "The Gift of Tools",
      seed_value: 12000,
      pocket_price: 150,
      total_pockets: 80,
      filled_pockets: 80,
      completion_rate: 100,
      location: "Cape Town",
      status: "completed",
      created_at: "2023-12-05T09:15:00Z",
      views: 189,
      supporters: 52,
      recent_activity: "Payout processed",
      timeline: "Completed December 2023",
      images: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOTk5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Ib21lIE9mZmljZSBTZXR1cDwvdGV4dD48L3N2Zz4="
      ]
    }
  ])
  
  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "completed": return "bg-blue-100 text-blue-800"
      case "paused": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }
  
  const getCompletionColor = (rate) => {
    if (rate >= 80) return "bg-green-500"
    if (rate >= 60) return "bg-yellow-500"
    if (rate >= 40) return "bg-orange-500"
    return "bg-red-500"
  }
  
  const totalStats = {
    totalRaised: orchards.reduce((sum, o) => sum + (o.filled_pockets * o.pocket_price), 0),
    totalViews: orchards.reduce((sum, o) => sum + o.views, 0),
    totalSupporters: orchards.reduce((sum, o) => sum + o.supporters, 0),
    averageCompletion: orchards.reduce((sum, o) => sum + o.completion_rate, 0) / orchards.length
  }
  
  return (
    <div className="relative min-h-screen">
      {/* Full Background Video */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover"
        >
          <source src="/orchards main mp4.mp4" type="video/mp4" />
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-amber-100"></div>
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      
      {/* Content over video */}
      <div className="relative z-10 space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-green-800 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
            My Farm Stall
          </h1>
          <p className="text-lg text-gray-600">
            Manage your orchards in the 364yhvh Community Farm
          </p>
        </div>
        <Link to="/create-orchard">
          <Button className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Plus className="h-4 w-4 mr-2" />
            Plant New Seed
          </Button>
        </Link>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Total Raised</p>
                <p className="text-2xl font-bold text-green-800">{formatAmount(totalStats.totalRaised)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Views</p>
                <p className="text-2xl font-bold text-blue-800">{totalStats.totalViews}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Total Supporters</p>
                <p className="text-2xl font-bold text-purple-800">{totalStats.totalSupporters}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Avg. Completion</p>
                <p className="text-2xl font-bold text-amber-800">{totalStats.averageCompletion.toFixed(1)}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Orchards List */}
      <div className="space-y-6">
        {orchards.map((orchard) => (
          <Card key={orchard.id} className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                  <Sprout className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg text-gray-800">{orchard.title}</CardTitle>
                  <p className="text-sm text-gray-600">{orchard.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={getStatusColor(orchard.status)}>
                  {orchard.status}
                </Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            {/* Orchard Image */}
            {orchard.images && orchard.images.length > 0 && (
              <div className="px-6 pb-3">
                <div className="flex items-center space-x-4">
                  <img
                    src={orchard.images[0]}
                    alt={orchard.title}
                    className="w-24 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                  <div className="text-xs text-gray-500">
                    Product Image
                  </div>
                </div>
              </div>
            )}
            
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">{orchard.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{orchard.completion_rate.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getCompletionColor(orchard.completion_rate)}`}
                      style={{ width: `${orchard.completion_rate}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{orchard.filled_pockets} / {orchard.total_pockets} pockets</span>
                    <span>{formatAmount(orchard.seed_value - (orchard.filled_pockets * orchard.pocket_price))} needed</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Eye className="h-4 w-4" />
                      <span>{orchard.views} views</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{orchard.supporters} supporters</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{orchard.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{orchard.timeline}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-600">
                      {formatAmount(orchard.filled_pockets * orchard.pocket_price)}
                    </div>
                    <div className="text-sm text-gray-500">
                      of {formatAmount(orchard.seed_value)} raised
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {orchard.recent_activity}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Created {new Date(orchard.created_at).toLocaleDateString()}
                </div>
                <div className="flex space-x-2">
                  <Link to={`/animated-orchard/${orchard.id}`}>
                    <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                      <Eye className="h-4 w-4 mr-2" />
                      View Orchard
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Empty State */}
      {orchards.length === 0 && (
        <Card className="bg-white/90 backdrop-blur-sm border-green-200">
          <CardContent className="text-center py-12">
            <Sprout className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No orchards yet</h3>
            <p className="text-gray-600 mb-6">
              Start your journey by planting your first seed in the community farm
            </p>
            <Link to="/create-orchard">
              <Button className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Plant Your First Seed
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
      
      {/* Farm Stall Info */}
      <Card className="bg-gradient-to-r from-green-50 to-amber-50 border-green-200">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-green-800 mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Your Farm Stall in the Community
          </h3>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            As a grower in the 364yhvh Community Farm, you have your own farm stall where you can create multiple orchards. 
            Each orchard represents a specific need that the community can help fulfill through bestowals.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/create-orchard">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Sow Seed Into New Orchard
              </Button>
            </Link>
            <Link to="/browse-orchards">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                <Heart className="h-4 w-4 mr-2" />
                Browse Other Stalls
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}