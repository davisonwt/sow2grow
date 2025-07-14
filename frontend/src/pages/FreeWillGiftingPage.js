import React, { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { 
  Gift, 
  Heart, 
  DollarSign, 
  MessageCircle, 
  Users, 
  Sparkles,
  Star,
  Send
} from "lucide-react"

export default function FreeWillGiftingPage() {
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const [recipient, setRecipient] = useState("community")
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      alert("Thank you for your generous free-will gift! Your contribution has been processed.")
    }, 2000)
  }
  
  const suggestedAmounts = [25, 50, 100, 200, 500]
  
  const recipients = [
    { value: "community", label: "Community Fund", description: "Support the general community needs" },
    { value: "emergency", label: "Emergency Fund", description: "Help families in crisis situations" },
    { value: "youth", label: "Youth Ministry", description: "Support young people's programs" },
    { value: "elderly", label: "Elderly Care", description: "Assist elderly community members" },
    { value: "education", label: "Education Fund", description: "Support educational initiatives" }
  ]
  
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
          <source src="/free-will giving.mp4" type="video/mp4" />
          <div className="w-full h-full bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100"></div>
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Content over video */}
      <div className="relative z-10 py-8">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <Gift className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-purple-800 mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Free-Will Gifting
          </h1>
          <p className="text-lg text-purple-700 max-w-2xl mx-auto">
            Make a voluntary gift to support the community and spread love through generous giving
          </p>
          <Badge className="mt-4 bg-purple-100 text-purple-800">
            <Heart className="h-3 w-3 mr-1" />
            Community Support
          </Badge>
        </div>
        
        {/* Scripture Section */}
        <Card className="bg-white/90 backdrop-blur-sm border-purple-200 shadow-xl">
          <CardContent className="p-8 text-center">
            <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <blockquote className="text-xl text-purple-800 italic mb-4 leading-relaxed">
              "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, 
              for God loves a cheerful giver."
            </blockquote>
            <cite className="text-purple-600 font-semibold">- 2 Corinthians 9:7</cite>
          </CardContent>
        </Card>
        
        {/* Gifting Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/90 backdrop-blur-sm border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-purple-800 flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Your Free-Will Gift
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-purple-800 mb-2">
                    <DollarSign className="inline h-4 w-4 mr-1" />
                    Amount (R)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
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
                        className="border-purple-300 text-purple-700 hover:bg-purple-50"
                      >
                        R{suggestedAmount}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-purple-800 mb-2">
                    <Users className="inline h-4 w-4 mr-1" />
                    Recipient
                  </label>
                  <select
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {recipients.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-purple-600 mt-1">
                    {recipients.find(r => r.value === recipient)?.description}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-purple-800 mb-2">
                    <MessageCircle className="inline h-4 w-4 mr-1" />
                    Message (Optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows="3"
                    placeholder="Add a personal message or prayer..."
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={!amount || loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Gift of R{amount || "0"}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Gifting Info */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-purple-800 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                The Joy of Giving
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-purple-800">Cheerful Giving</h4>
                    <p className="text-sm text-purple-700">Give from the heart with joy and gratitude</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-purple-800">Community Impact</h4>
                    <p className="text-sm text-purple-700">Your gift directly supports community members in need</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-purple-800">Spreading Love</h4>
                    <p className="text-sm text-purple-700">Show God's love through generous and caring actions</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-purple-800">Building Unity</h4>
                    <p className="text-sm text-purple-700">Strengthen the bonds of community through giving</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-100 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">How Your Gift Helps</h4>
                <p className="text-sm text-purple-700">
                  Free-will gifts support various community initiatives including emergency assistance, 
                  youth programs, elderly care, and educational opportunities. Every contribution makes a difference.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Gifts */}
        <Card className="bg-white/90 backdrop-blur-sm border-purple-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-purple-800 text-center">
              Recent Community Gifts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-800 mb-2">R1,250</div>
                <p className="text-sm text-purple-700">Emergency Fund</p>
                <p className="text-xs text-purple-600">"For the Johnson family medical bills"</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-800 mb-2">R800</div>
                <p className="text-sm text-purple-700">Youth Ministry</p>
                <p className="text-xs text-purple-600">"Supporting our young people"</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-800 mb-2">R650</div>
                <p className="text-sm text-purple-700">Education Fund</p>
                <p className="text-xs text-purple-600">"Books for the community library"</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Community Impact */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 shadow-lg">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-purple-800 mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
              Community Impact Through Giving
            </h3>
            <p className="text-purple-700 mb-6">
              Your free-will gifts have helped create a caring community where everyone looks out for one another. 
              Together, we're building a place where love and generosity flourish.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-800">47</div>
                <p className="text-sm text-purple-700">Families Helped</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-800">R23,450</div>
                <p className="text-sm text-purple-700">Total Gifts</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-800">156</div>
                <p className="text-sm text-purple-700">Acts of Kindness</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-800">89</div>
                <p className="text-sm text-purple-700">Generous Givers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  )
}