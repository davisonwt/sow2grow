import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useApi } from "../hooks/useApi"
import { useCurrency } from "../hooks/useCurrency"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { 
  Search, 
  Heart, 
  Users, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Filter,
  Sprout,
  Star,
  ArrowRight,
  Eye
} from "lucide-react"

export default function BrowseOrchardsPage() {
  const [orchards, setOrchards] = useState([])
  const [filteredOrchards, setFilteredOrchards] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  
  const api = useApi()
  const { formatAmount } = useCurrency()
  
  const categories = [
    "The Gift of Art",
    "The Gift of Accessories", 
    "The Gift of Adventure Packages",
    "The Gift of Appliances",
    "The Gift of Custom Made",
    "The Gift of DIY",
    "The Gift of Electronics",
    "The Gift of Energy",
    "The Gift of Free-will Gifting",
    "The Gift of Innovation",
    "The Gift of Kitchenware",
    "The Gift of Music",
    "The Gift of Nourishment",
    "The Gift of Pay as You Go",
    "The Gift of Property",
    "The Gift of Services",
    "The Gift of Technology",
    "The Gift of Tithing",
    "The Gift of Tools",
    "The Gift of Vehicles",
    "The Gift of Wellness",
  ]
  
  // Mock data for demonstration
  const mockOrchards = [
    {
      id: "1",
      title: "2019 Toyota Corolla",
      description: "Reliable family car for daily transportation to work and supporting my family",
      category: "The Gift of Vehicles",
      seed_value: 18000,
      pocket_price: 150,
      total_pockets: 120,
      filled_pockets: 85,
      completion_rate: 70.8,
      location: "Cape Town",
      grower: "Sarah M.",
      created_at: "2024-01-15T10:30:00Z",
      views: 234,
      supporters: 67,
      status: "active",
      images: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj4yMDE5IFRveW90YSBDb3JvbGxhPC90ZXh0Pjwvc3ZnPg=="
      ],
      why_needed: "I need reliable transportation to get to work and support my family",
      community_impact: "Having reliable transportation will help me maintain steady employment"
    },
    {
      id: "2", 
      title: "Solar Panel Installation",
      description: "Sustainable energy solution for home and small business",
      category: "The Gift of Energy",
      seed_value: 12000,
      pocket_price: 150,
      total_pockets: 80,
      filled_pockets: 34,
      completion_rate: 42.5,
      location: "Johannesburg",
      grower: "Michael T.",
      created_at: "2024-01-10T14:20:00Z",
      views: 189,
      supporters: 28,
      status: "active",
      images: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZkNzAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Tb2xhciBQYW5lbCBJbnN0YWxsYXRpb248L3RleHQ+PC9zdmc>"
      ],
      why_needed: "Want to reduce electricity costs and use clean energy",
      community_impact: "Will demonstrate sustainable living to the community"
    },
    {
      id: "3",
      title: "Laptop for Studies",
      description: "Educational laptop for computer science studies",
      category: "The Gift of Technology",
      seed_value: 8000,
      pocket_price: 150,
      total_pockets: 53,
      filled_pockets: 45,
      completion_rate: 84.9,
      location: "Durban",
      grower: "Priya K.",
      created_at: "2024-01-05T09:15:00Z",
      views: 156,
      supporters: 39,
      status: "active",
      images: [
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY2NmZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5MYXB0b3AgZm9yIFN0dWRpZXM8L3RleHQ+PC9zdmc+"
      ],
      why_needed: "Need a laptop to complete my computer science degree",
      community_impact: "Will help me become a software developer and give back to community"
    },
    {
      id: "4",
      title: "Small Business Equipment",
      description: "Professional equipment for starting a catering business",
      category: "The Gift of Tools",
      seed_value: 15000,
      pocket_price: 150,
      total_pockets: 100,
      filled_pockets: 23,
      completion_rate: 23.0,
      location: "Pretoria",
      grower: "David L.",
      created_at: "2024-01-20T16:45:00Z",
      views: 98,
      supporters: 18,
      status: "active",
      images: [],
      why_needed: "Want to start a catering business to support my family",
      community_impact: "Will provide affordable catering services to the community"
    },
    {
      id: "5",
      title: "Medical Equipment Fund",
      description: "Essential medical equipment for healthcare clinic",
      category: "The Gift of Wellness",
      seed_value: 25000,
      pocket_price: 150,
      total_pockets: 167,
      filled_pockets: 89,
      completion_rate: 53.3,
      location: "Port Elizabeth",
      grower: "Dr. Grace N.",
      created_at: "2024-01-12T11:30:00Z",
      views: 445,
      supporters: 78,
      status: "active",
      images: [],
      why_needed: "Our clinic needs modern equipment to serve the community better",
      community_impact: "Will improve healthcare access for underserved communities"
    }
  ]
  
  useEffect(() => {
    // Load orchards (using mock data for now)
    const loadOrchards = async () => {
      setLoading(true)
      try {
        // In production, use: const result = await api.getOrchards()
        // For now, simulate API call
        setTimeout(() => {
          setOrchards(mockOrchards)
          setFilteredOrchards(mockOrchards)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error loading orchards:", error)
        setLoading(false)
      }
    }
    
    loadOrchards()
  }, [])
  
  // Filter and sort orchards
  useEffect(() => {
    let filtered = orchards.filter(orchard => {
      const matchesSearch = orchard.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           orchard.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           orchard.grower.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || orchard.category === selectedCategory
      const matchesStatus = selectedStatus === "all" || orchard.status === selectedStatus
      
      return matchesSearch && matchesCategory && matchesStatus
    })
    
    // Sort orchards
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at) - new Date(a.created_at)
        case "oldest":
          return new Date(a.created_at) - new Date(b.created_at)
        case "progress":
          return b.completion_rate - a.completion_rate
        case "popular":
          return b.views - a.views
        case "amount":
          return b.seed_value - a.seed_value
        default:
          return 0
      }
    })
    
    setFilteredOrchards(filtered)
  }, [orchards, searchTerm, selectedCategory, selectedStatus, sortBy])
  
  const getCompletionColor = (rate) => {
    if (rate >= 80) return "bg-green-500"
    if (rate >= 60) return "bg-yellow-500"
    if (rate >= 40) return "bg-orange-500"
    return "bg-red-500"
  }
  
  const getUrgencyBadge = (rate) => {
    if (rate >= 90) return <Badge className="bg-red-100 text-red-800">Almost Complete!</Badge>
    if (rate >= 75) return <Badge className="bg-yellow-100 text-yellow-800">Nearly There</Badge>
    if (rate >= 50) return <Badge className="bg-blue-100 text-blue-800">Halfway</Badge>
    return <Badge className="bg-green-100 text-green-800">Just Started</Badge>
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
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
          <source src="/earth (1).mp4" type="video/mp4" />
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-amber-100"></div>
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Content over video */}
      <div className="relative z-10 space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
          Cultivate Community Orchards
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover grower farm stalls and bestow into their orchards. Each grower has their own space in the 364yhvh Community Farm.
        </p>
      </div>
      
      {/* Filters */}
      <Card className="bg-white/90 backdrop-blur-sm border-green-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orchards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="progress">Most Progress</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="amount">Highest Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Found <strong>{filteredOrchards.length}</strong> orchards in the farm mall
        </p>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {selectedCategory !== "all" && `${selectedCategory} • `}
            {selectedStatus !== "all" && `${selectedStatus} • `}
            {sortBy}
          </span>
        </div>
      </div>
      
      {/* Orchards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredOrchards.map((orchard) => (
          <Card key={orchard.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-gray-800 mb-2">{orchard.title}</CardTitle>
                  <Badge className="bg-green-100 text-green-800 text-xs">{orchard.category}</Badge>
                </div>
                {getUrgencyBadge(orchard.completion_rate)}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{orchard.grower}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{orchard.location}</span>
                </div>
              </div>
            </CardHeader>
            
            {/* Orchard Image */}
            {orchard.images && orchard.images.length > 0 && (
              <div className="px-6 pb-3">
                <img
                  src={orchard.images[0]}
                  alt={orchard.title}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                />
              </div>
            )}
            
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700 line-clamp-3">{orchard.description}</p>
              
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
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Eye className="h-3 w-3" />
                    <span>{orchard.views}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Heart className="h-3 w-3" />
                    <span>{orchard.supporters}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">{formatAmount(orchard.pocket_price)}</div>
                  <div className="text-xs text-gray-500">per pocket</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link to={`/animated-orchard/${orchard.id}`} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white shadow-md hover:shadow-lg transition-all duration-300">
                    <Heart className="h-4 w-4 mr-2" />
                    Bestow Support
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredOrchards.length === 0 && (
        <div className="text-center py-12">
          <Sprout className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No orchards found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
          <Button
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("all")
              setSelectedStatus("all")
              setSortBy("newest")
            }}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            Clear Filters
          </Button>
        </div>
      )}
      
      {/* Farm Mall Info */}
      <Card className="bg-gradient-to-r from-green-50 to-amber-50 border-green-200">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-green-800 mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Welcome to the 364yhvh Community Farm Mall
          </h3>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Each grower has their own farm stall within our community farm. Browse different stalls, 
            discover their orchards, and bestow support to help community members grow and stand up together.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sprout className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-green-800 mb-1">Visit Farm Stalls</h4>
              <p className="text-sm text-gray-600">Browse grower profiles and their orchards</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-rose-600" />
              </div>
              <h4 className="font-semibold text-rose-800 mb-1">Bestow Support</h4>
              <p className="text-sm text-gray-600">Select pockets and help others grow</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <h4 className="font-semibold text-amber-800 mb-1">Watch Growth</h4>
              <p className="text-sm text-gray-600">See real-time progress and impact</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}