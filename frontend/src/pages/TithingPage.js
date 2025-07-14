import React, { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { 
  Church, 
  Heart, 
  DollarSign, 
  Calendar, 
  BookOpen, 
  Star,
  Gift,
  Sparkles
} from "lucide-react"

export default function TithingPage() {
  const [amount, setAmount] = useState("")
  const [frequency, setFrequency] = useState("monthly")
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      alert("Thank you for your faithful tithing! Your gift has been processed.")
    }, 2000)
  }
  
  const suggestedAmounts = [50, 100, 200, 500, 1000]
  
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
          <source src="/tithing 1280x720.mp4" type="video/mp4" />
          <div className="w-full h-full bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100"></div>
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Content over video */}
      <div className="relative z-10 py-8">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <Church className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-amber-800 mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Biblical Tithing
          </h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Honor God with your firstfruits and support yhvh364 gosat's ministry through faithful tithing
          </p>
          <Badge className="mt-4 bg-amber-100 text-amber-800">
            <Church className="h-3 w-3 mr-1" />
            yhvh364 gosat's Ministry
          </Badge>
        </div>
        
        {/* Scripture Section */}
        <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-xl">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-8 w-8 text-amber-600 mx-auto mb-4" />
            <blockquote className="text-xl text-amber-800 italic mb-4 leading-relaxed">
              "Bring the whole tithe into the storehouse, that there may be food in my house. 
              Test me in this, says the Lord Almighty, and see if I will not throw open the floodgates of heaven 
              and pour out so much blessing that there will not be room enough to store it."
            </blockquote>
            <cite className="text-amber-600 font-semibold">- Malachi 3:10</cite>
          </CardContent>
        </Card>
        
        {/* Tithing Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-amber-800 flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Your Tithing Gift
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    <DollarSign className="inline h-4 w-4 mr-1" />
                    Amount (R)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
                    placeholder="Enter amount"
                    required
                  />
                  
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {suggestedAmounts.map((suggestedAmount) => (
                      <Button
                        key={suggestedAmount}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setAmount(suggestedAmount.toString())}
                        className="border-amber-300 text-amber-700 hover:bg-amber-50"
                      >
                        R{suggestedAmount}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="once">One-time</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
                
                <Button
                  type="submit"
                  disabled={!amount || loading}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <Heart className="h-5 w-5 mr-2" />
                      Give R{amount || "0"} {frequency === "once" ? "Once" : frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Tithing Info */}
          <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-amber-800 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                The Blessing of Tithing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-amber-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Honoring God</h4>
                    <p className="text-sm text-amber-700">Tithing is a way to honor God with our firstfruits and acknowledge His provision</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-amber-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Supporting Ministry</h4>
                    <p className="text-sm text-amber-700">Your tithes support yhvh364 gosat's ministry and help spread God's word</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-amber-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Receiving Blessing</h4>
                    <p className="text-sm text-amber-700">God promises to bless those who faithfully tithe and give generously</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-amber-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Building Faith</h4>
                    <p className="text-sm text-amber-700">Tithing helps build our faith and trust in God's provision</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-100 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-2">Traditional Tithe Amount</h4>
                <p className="text-sm text-amber-700">
                  The biblical tithe is 10% of your income. This is a guideline, but God loves a cheerful giver 
                  regardless of the amount.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Ministry Information */}
        <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-amber-800 text-center">
              About yhvh364 gosat's Ministry
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-amber-700 mb-6">
              yhvh364 gosat's ministry is dedicated to spreading God's word and supporting the community through 
              biblical teachings and practical help. Your tithes help fund ministry activities, community outreach, 
              and the growth of the 364yhvh Community Farm.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-amber-600" />
                </div>
                <h4 className="font-semibold text-amber-800 mb-1">Biblical Teaching</h4>
                <p className="text-sm text-amber-700">Spreading God's word through teaching and discipleship</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-amber-600" />
                </div>
                <h4 className="font-semibold text-amber-800 mb-1">Community Care</h4>
                <p className="text-sm text-amber-700">Supporting families and individuals in need</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Church className="h-6 w-6 text-amber-600" />
                </div>
                <h4 className="font-semibold text-amber-800 mb-1">Ministry Growth</h4>
                <p className="text-sm text-amber-700">Expanding the reach of God's love and grace</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  )
}