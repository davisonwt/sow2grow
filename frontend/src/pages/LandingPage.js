import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { 
  Sprout, 
  Heart, 
  Gift, 
  Church, 
  Users, 
  ArrowRight,
  Star,
  Shield,
  Zap
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 rounded-full animate-pulse" style={{ animationDuration: "4s" }}></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-amber-200/20 rounded-full animate-bounce" style={{ animationDuration: "3s", animationDelay: "1s" }}></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-green-300/10 rounded-full animate-pulse" style={{ animationDuration: "5s", animationDelay: "2s" }}></div>
        </div>
        
        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-lg">
              <Sprout className="h-7 w-7 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-800" style={{ fontFamily: "Playfair Display, serif" }}>
                sow2grow
              </h1>
              <p className="text-xs text-green-600">364yhvh community farm</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link to="/browse-orchards">
              <Button variant="ghost" className="text-green-700 hover:text-green-800">
                Cultivate Community Orchards
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-green-600 hover:bg-green-700">
                Join Community
              </Button>
            </Link>
          </div>
        </nav>
        
        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200">
            <Sprout className="h-3 w-3 mr-1" />
            364yhvh Community Farm Mall
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-green-800 mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
            Sow Seeds,
            <br />
            <span className="text-amber-600">Grow Together</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Welcome to the <strong>364yhvh Community Farm</strong> where <strong>sow2grow</strong> is your farm mall. 
            Each grower becomes a farm stall owner, sowing into their own orchards while bestowers help each other grow and stand up.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Heart className="h-5 w-5 mr-2" />
                Start Your Journey
              </Button>
            </Link>
            <Link to="/browse-orchards">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Sprout className="h-5 w-5 mr-2" />
                Cultivate Community Orchards
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Church className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Biblical Giving</h3>
              <p className="text-sm text-gray-600">Tithing and free-will gifting based on biblical principles</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Community Support</h3>
              <p className="text-sm text-gray-600">Growers and bestowers helping each other grow</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-lg font-semibold text-rose-800 mb-2">Farm Mall</h3>
              <p className="text-sm text-gray-600">Each grower has their own farm stall with orchards</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
              How the Farm Mall Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The 364yhvh Community Farm is a complete ecosystem where everyone can both give and receive
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Growers */}
            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sprout className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-green-800">Growers (Farm Stall Owners)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Get your own farm stall</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Create multiple orchards</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Sow into your own orchards</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">Receive community support</span>
                  </div>
                </div>
                <Link to="/register">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Become a Grower
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Bestowers */}
            <Card className="border-rose-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-rose-600" />
                </div>
                <CardTitle className="text-rose-800">Bestowers (Supporters)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-rose-600" />
                    <span className="text-sm text-gray-700">Browse the farm mall</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-rose-600" />
                    <span className="text-sm text-gray-700">Visit different farm stalls</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-rose-600" />
                    <span className="text-sm text-gray-700">Bestow into orchards</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-rose-600" />
                    <span className="text-sm text-gray-700">Help others grow</span>
                  </div>
                </div>
                <Link to="/browse-orchards">
                  <Button className="w-full bg-rose-600 hover:bg-rose-700">
                    Start Bestowing
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Givers */}
            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Church className="h-8 w-8 text-amber-600" />
                </div>
                <CardTitle className="text-amber-800">Givers (Community)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-gray-700">Biblical tithing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-gray-700">Free-will gifting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-gray-700">Community support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-gray-700">Faith-based giving</span>
                  </div>
                </div>
                <Link to="/tithing">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700">
                    Give to Community
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Scripture Section */}
      <section className="py-20 bg-gradient-to-r from-green-100 to-amber-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-green-800 mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
              Our Foundation
            </h2>
            <blockquote className="text-xl text-gray-700 italic mb-6 leading-relaxed">
              "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap. For with the measure you use, it will be measured to you."
            </blockquote>
            <cite className="text-green-600 font-semibold text-lg">- Luke 6:38</cite>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Join the 364yhvh Community Farm
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Be part of a biblical community where everyone grows together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Heart className="h-5 w-5 mr-2" />
                Start Your Journey
              </Button>
            </Link>
            <Link to="/app-flow">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-6 text-lg"
              >
                <Zap className="h-5 w-5 mr-2" />
                View App Flow
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}