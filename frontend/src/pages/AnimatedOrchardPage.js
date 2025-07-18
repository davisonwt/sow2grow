import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useApi } from "../hooks/useApi"
import { useCurrency } from "../hooks/useCurrency"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { AnimatedOrchardGrid } from "../components/AnimatedOrchardGrid"
import { 
  ArrowLeft, 
  Sprout, 
  Heart, 
  User, 
  MapPin, 
  Clock, 
  Star, 
  Sparkles,
  TrendingUp,
  Users,
  Eye,
  ShoppingCart,
  CheckCircle
} from "lucide-react"

export default function AnimatedOrchardPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const api = useApi()
  const { formatAmount } = useCurrency()
  
  const [orchard, setOrchard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedPockets, setSelectedPockets] = useState([])
  const [takenPockets, setTakenPockets] = useState([])
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [processingPayment, setProcessingPayment] = useState(false)
  
  // Mock orchard data
  const mockOrchard = {
    id: "1",
    title: "2019 Toyota Corolla",
    description: "Reliable family car for daily transportation to work and supporting my family. This vehicle will help me maintain steady employment and provide for my children's education.",
    category: "The Gift of Vehicles",
    seed_value: 18000,
    pocket_price: 150,
    total_pockets: 120,
    filled_pockets: 85,
    completion_rate: 70.8,
    location: "Cape Town, South Africa",
    grower: "Sarah M.",
    grower_full_name: "Sarah Miller",
    created_at: "2024-01-15T10:30:00Z",
    views: 234,
    supporters: 67,
    status: "active",
    images: [],
    why_needed: "I need reliable transportation to get to work and support my family. My current car broke down and I can't afford the repairs. This will help me maintain my job and provide for my children.",
    community_impact: "Having reliable transportation will help me maintain steady employment and contribute to my community. I'll be able to volunteer at the local school and help other families with transportation needs.",
    features: ["Fuel efficient", "Reliable", "Low maintenance", "Family friendly"],
    timeline: "Need by March 2024",
    verification_status: "verified"
  }
  
  // Mock taken pockets with growth stages
  const mockTakenPockets = [
    { number: 3, daysGrowing: 45, stage: "mature", bestower: "John D." },
    { number: 7, daysGrowing: 32, stage: "growing", bestower: "Mary S." },
    { number: 12, daysGrowing: 18, stage: "young", bestower: "Peter K." },
    { number: 18, daysGrowing: 52, stage: "mature", bestower: "Sarah L." },
    { number: 23, daysGrowing: 8, stage: "sprout", bestower: "David M." },
    { number: 29, daysGrowing: 25, stage: "young", bestower: "Lisa R." },
    { number: 34, daysGrowing: 41, stage: "growing", bestower: "Mike T." },
    { number: 41, daysGrowing: 15, stage: "young", bestower: "Anna B." },
    { number: 47, daysGrowing: 38, stage: "growing", bestower: "Tom W." },
    { number: 52, daysGrowing: 3, stage: "sprout", bestower: "Emma C." },
    { number: 58, daysGrowing: 29, stage: "young", bestower: "Chris H." },
    { number: 63, daysGrowing: 47, stage: "mature", bestower: "Kate J." },
    { number: 69, daysGrowing: 12, stage: "young", bestower: "Alex P." },
    { number: 74, daysGrowing: 35, stage: "growing", bestower: "Nina F." },
    { number: 81, daysGrowing: 22, stage: "young", bestower: "Ryan G." },
    { number: 87, daysGrowing: 49, stage: "mature", bestower: "Zoe Q." },
    { number: 92, daysGrowing: 6, stage: "sprout", bestower: "Luke V." },
    { number: 98, daysGrowing: 31, stage: "growing", bestower: "Mia X." },
    { number: 103, daysGrowing: 44, stage: "mature", bestower: "Noah Y." },
    { number: 108, daysGrowing: 19, stage: "young", bestower: "Sophie T." },
    { number: 114, daysGrowing: 36, stage: "growing", bestower: "James K." },
    { number: 119, daysGrowing: 28, stage: "young", bestower: "Grace W." },
  ]
  
  useEffect(() => {
    // Load orchard data
    const loadOrchard = async () => {
      setLoading(true)
      try {
        // In production: const result = await api.getOrchard(id)
        // For now, simulate API call
        setTimeout(() => {
          setOrchard(mockOrchard)
          setTakenPockets(mockTakenPockets)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error loading orchard:", error)
        setLoading(false)
      }
    }
    
    loadOrchard()
  }, [id])
  
  const handlePocketClick = (pocketNumber) => {
    if (selectedPockets.includes(pocketNumber)) {
      setSelectedPockets(selectedPockets.filter(p => p !== pocketNumber))
    } else {
      setSelectedPockets([...selectedPockets, pocketNumber])
    }
  }
  
  const handleSelectAllAvailable = () => {
    const availablePockets = []
    for (let i = 1; i <= orchard.total_pockets; i++) {
      const isTaken = takenPockets.some(p => p.number === i)
      if (!isTaken) {
        availablePockets.push(i)
      }
    }
    setSelectedPockets(availablePockets)
  }
  
  const handleBestow = async () => {
    if (selectedPockets.length === 0) return
    
    setProcessingPayment(true)
    try {
      // In production: await api.bestowIntoOrchard(id, selectedPockets)
      // For now, simulate payment processing
      setTimeout(() => {
        // Add selected pockets to taken pockets
        const newTakenPockets = selectedPockets.map(pocketNumber => ({
          number: pocketNumber,
          daysGrowing: 0,
          stage: "sprout",
          bestower: `${user.first_name} ${user.last_name[0]}.`
        }))
        
        setTakenPockets([...takenPockets, ...newTakenPockets])
        setSelectedPockets([])
        setShowPaymentForm(false)
        setProcessingPayment(false)
        
        // Update orchard stats
        const updatedOrchard = {
          ...orchard,
          filled_pockets: orchard.filled_pockets + selectedPockets.length,
          completion_rate: ((orchard.filled_pockets + selectedPockets.length) / orchard.total_pockets) * 100,
          supporters: orchard.supporters + 1
        }
        setOrchard(updatedOrchard)
      }, 2000)
    } catch (error) {
      console.error("Error processing bestowal:", error)
      setProcessingPayment(false)
    }
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }
  
  if (!orchard) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Orchard not found</h2>
        <Link to="/browse-orchards">
          <Button className="bg-green-600 hover:bg-green-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Farm Mall
          </Button>
        </Link>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-green-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 rounded-full animate-pulse" style={{ animationDuration: "4s" }}></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-amber-200/20 rounded-full animate-bounce" style={{ animationDuration: "3s", animationDelay: "1s" }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-green-300/10 rounded-full animate-pulse" style={{ animationDuration: "5s", animationDelay: "2s" }}></div>
      </div>
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50 animate-in slide-in-from-top-5 duration-500">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/browse-orchards" className="flex items-center space-x-3 group">
              <ArrowLeft className="h-5 w-5 text-green-600 group-hover:text-green-700 transition-all duration-200 group-hover:-translate-x-1" />
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg">
                <Sprout className="h-7 w-7 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-800 transition-colors duration-200" style={{ fontFamily: "Playfair Display, serif" }}>
                  {orchard.title}
                </h1>
                <p className="text-xs text-green-600">{orchard.grower} • {orchard.location}</p>
              </div>
            </Link>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className={`transition-all duration-300 ${selectedPockets.length > 0 ? "animate-pulse scale-105 shadow-lg bg-rose-100 text-rose-700" : "bg-green-100 text-green-700"}`}>
                {selectedPockets.length} pockets selected
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-700 animate-pulse">
                {takenPockets.length} growing
              </Badge>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Orchard Info */}
          <section className="mb-8">
            <Card className="bg-white/95 backdrop-blur-sm border-green-200 shadow-xl animate-in slide-in-from-bottom-5 duration-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl text-green-800 flex items-center gap-3 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                      🚗 {orchard.title}
                      <Sparkles className="h-6 w-6 text-amber-500 animate-spin" style={{ animationDuration: "3s" }} />
                    </CardTitle>
                    <p className="text-green-600 mb-2">{orchard.grower_full_name} • {orchard.location} • Live Growth Tracking</p>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-green-100 text-green-800">{orchard.category}</Badge>
                      {orchard.verification_status === "verified" && (
                        <Badge className="bg-blue-100 text-blue-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-800 animate-pulse">{formatAmount(orchard.pocket_price)}</div>
                    <div className="text-sm text-green-600">per pocket</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-300 hover:scale-105 shadow-lg">
                    <div className="text-3xl font-bold text-green-800 animate-pulse">{orchard.total_pockets}</div>
                    <div className="text-sm text-green-600 font-semibold">Total Pockets</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl hover:from-amber-100 hover:to-amber-200 transition-all duration-300 hover:scale-105 shadow-lg">
                    <div className="text-3xl font-bold text-amber-800 animate-bounce">{orchard.filled_pockets}</div>
                    <div className="text-sm text-amber-600 font-semibold">Growing</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:scale-105 shadow-lg">
                    <div className="text-3xl font-bold text-blue-800">{orchard.total_pockets - orchard.filled_pockets}</div>
                    <div className="text-sm text-blue-600 font-semibold">Available</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-300 hover:scale-105 shadow-lg">
                    <div className="text-3xl font-bold text-purple-800 animate-pulse">{Math.round(orchard.completion_rate)}%</div>
                    <div className="text-sm text-purple-600 font-semibold">Complete</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Why This is Needed</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{orchard.why_needed}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Community Impact</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{orchard.community_impact}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{orchard.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{orchard.supporters} supporters</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{orchard.timeline}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {orchard.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Orchard Grid */}
          <section className="mb-8">
            <Card className="bg-white/95 backdrop-blur-sm border-green-200 shadow-2xl animate-in slide-in-from-bottom-5 duration-700" style={{ animationDelay: "300ms" }}>
              <CardHeader>
                <CardTitle className="text-2xl text-green-800 text-center flex items-center justify-center gap-3" style={{ fontFamily: "Playfair Display, serif" }}>
                  🌱 Live Orchard Growth Visualization
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-ping" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <AnimatedOrchardGrid
                  totalPockets={orchard.total_pockets}
                  pocketPrice={orchard.pocket_price}
                  takenPockets={takenPockets}
                  selectedPockets={selectedPockets}
                  onPocketClick={handlePocketClick}
                  pocketsPerRow={10}
                  showNumbers={true}
                  interactive={true}
                />
                
                {/* Action Buttons */}
                <div className="mt-8 text-center animate-in slide-in-from-bottom-3 duration-700" style={{ animationDelay: "1200ms" }}>
                  <p className="text-green-700 mb-6 text-lg">
                    Click on available pockets to select them for bestowal. Watch the seedlings grow and sparkle as they mature! ✨
                  </p>
                  
                  {selectedPockets.length > 0 && (
                    <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-xl mb-6 animate-in slide-in-from-bottom-2 zoom-in-95 duration-300 border border-rose-200 shadow-lg">
                      <h4 className="font-semibold text-rose-800 mb-3 text-lg">Your Bestowal Selection ✨</h4>
                      <p className="text-rose-700 mb-2">
                        <strong>Selected Pockets:</strong> {selectedPockets.sort((a, b) => a - b).join(", ")}
                      </p>
                      <p className="text-rose-700 text-xl font-bold">
                        <strong>Total Amount:</strong> {formatAmount(selectedPockets.length * orchard.pocket_price)}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-6 justify-center flex-wrap">
                    <Button
                      onClick={() => setShowPaymentForm(true)}
                      className={`bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 hover:from-blue-300 hover:via-blue-500 hover:to-blue-300 text-white border-0 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl px-8 py-4 text-lg ${selectedPockets.length > 0 ? "animate-pulse" : ""}`}
                      style={{ borderRadius: "21px" }}
                      disabled={selectedPockets.length === 0}
                    >
                      <Sparkles className="h-5 w-5 mr-2 animate-pulse" />
                      Make It Rain {formatAmount(selectedPockets.length * orchard.pocket_price)} ({selectedPockets.length} pockets)
                    </Button>
                    
                    <Button
                      onClick={handleSelectAllAvailable}
                      className="bg-gradient-to-r from-green-400 via-green-600 to-green-400 hover:from-green-300 hover:via-green-500 hover:to-green-300 text-white border-0 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl px-6 py-4 text-lg"
                      style={{ borderRadius: "21px" }}
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      Select All Available ({orchard.total_pockets - orchard.filled_pockets} pockets)
                    </Button>
                    
                    {selectedPockets.length > 0 && (
                      <Button
                        variant="outline"
                        onClick={() => setSelectedPockets([])}
                        className="border-green-600 text-green-600 hover:bg-green-50 transition-all duration-300 hover:scale-105 active:scale-95 animate-in slide-in-from-right-2 duration-300 shadow-lg hover:shadow-xl px-6 py-4 text-lg"
                        style={{ borderRadius: "21px" }}
                      >
                        Clear Selection
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Grower Profile */}
          <section className="mb-8">
            <Card className="bg-white/95 backdrop-blur-sm border-green-200 shadow-xl animate-in slide-in-from-bottom-5 duration-700" style={{ animationDelay: "400ms" }}>
              <CardContent className="p-8">
                <div className="flex items-center gap-6 hover:bg-green-50/50 p-6 rounded-xl transition-all duration-300 group">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                    <User className="h-10 w-10 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-green-800 mb-2">{orchard.grower_full_name}</h3>
                    <p className="text-green-600 mb-3">{orchard.location} • Community Member since 2022 • 🌟 Verified Grower</p>
                    <p className="text-gray-700 leading-relaxed">
                      "{orchard.description} Your kindness means the world to me. 🙏✨"
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="bg-green-100 px-4 py-2 rounded-full">
                      <span className="text-green-800 font-semibold">Active Farm Stall</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
      
      {/* Payment Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="bg-white max-w-md w-full animate-in zoom-in-95 duration-300">
            <CardHeader>
              <CardTitle className="text-center text-green-800">
                Complete Your Bestowal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800 mb-2">
                  {formatAmount(selectedPockets.length * orchard.pocket_price)}
                </div>
                <p className="text-gray-600">
                  {selectedPockets.length} pockets × {formatAmount(orchard.pocket_price)} each
                </p>
              </div>
              
              <div className="space-y-4">
                <Button
                  onClick={handleBestow}
                  disabled={processingPayment}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-3 shadow-lg"
                >
                  {processingPayment ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Making it rain...
                    </div>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Make It Rain
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setShowPaymentForm(false)}
                  className="w-full"
                  disabled={processingPayment}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}