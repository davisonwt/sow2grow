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
  Zap,
  HandHeart
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full animate-pulse shadow-xl" style={{ animationDuration: "4s" }}></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-amber-200/30 to-yellow-200/30 rounded-full animate-bounce shadow-lg" style={{ animationDuration: "3s", animationDelay: "1s" }}></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-green-300/20 to-teal-300/20 rounded-full animate-pulse shadow-xl" style={{ animationDuration: "5s", animationDelay: "2s" }}></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full animate-ping shadow-md" style={{ animationDuration: "6s", animationDelay: "3s" }}></div>
        </div>
        
        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
              <img 
                src="/logo.jpeg" 
                alt="sow2grow logo" 
                className="w-full h-full object-cover"
              />
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
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700">
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
        
        {/* Hero Content Over Video */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 text-center">
          {/* Video Background Placeholder */}
          <div className="absolute inset-0 -z-10 rounded-2xl overflow-hidden">
            <video 
              autoPlay 
              muted 
              loop 
              className="w-full h-full object-cover"
            >
              <source src="/hero background mp4.mp4" type="video/mp4" />
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l8-5-8-5z"/>
                    </svg>
                  </div>
                  <p className="text-gray-500 text-xl">Hero Background Video</p>
                </div>
              </div>
            </video>
          </div>
          
          {/* Content overlay */}
          <div className="relative bg-black bg-opacity-40 rounded-2xl p-8 backdrop-blur-sm">
            <Badge className="mb-8 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 hover:from-green-200 hover:to-emerald-200 px-8 py-3 text-lg font-bold shadow-xl border-2 border-green-300">
              <Sprout className="h-5 w-5 mr-2" />
              364yhvh Community Farm Stall
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight drop-shadow-lg" style={{ fontFamily: "Playfair Display, serif" }}>
              welcome to sow2grow
            </h1>
            
            <p className="text-lg text-white mb-6 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
              the farm stall of the 364yhvh community; a haven of hands and harvest, where sacred seasons meet the fruits of faithful labor.
            </p>
            
            <p className="text-2xl md:text-3xl font-semibold text-green-200 mb-12 max-w-5xl mx-auto leading-relaxed drop-shadow-lg">
              a fertile ground where every grower finds their orchard, every seed becomes a fruit-bearing tree, and every harvest meets the hands destined to gather it.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white px-10 py-8 text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-0"
                >
                  <Heart className="h-6 w-6 mr-3" />
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/browse-orchards">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-10 py-8 text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  <Sprout className="h-6 w-6 mr-3" />
                  Cultivate Community Orchards
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <HandHeart className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">scriptural giving</h3>
              <p className="text-gray-600">Tithing and free-will gifting based on biblical principles</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Users className="h-10 w-10 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-amber-800 mb-3">Community Support</h3>
              <p className="text-gray-600">Growers and bestowers helping each other grow</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Gift className="h-10 w-10 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-rose-800 mb-3">s2g farm mall</h3>
              <p className="text-gray-600">Each grower has their own farm stall with orchards</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How s2g farm mall works Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
              How s2g farm mall works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The 364yhvh Community Farm is a complete ecosystem where everyone can both give and receive
            </p>
          </div>
        </div>
      </section>
      
      {/* Growers Section */}
      <section className="py-12 bg-white/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6">
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
        </div>
      </section>
      
      {/* Video Placeholders Section */}
      <section className="py-12 bg-gradient-to-br from-green-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          {/* Seeds Section */}
          <div className="space-y-6">
            {/* Strip placeholder with header */}
            <div className="w-full h-24 bg-gray-200 rounded-lg flex items-center shadow-lg overflow-hidden relative">
              <video 
                autoPlay 
                muted 
                loop 
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/seed strip mp4.mp4" type="video/mp4" />
              </video>
              <div className="relative z-10 flex items-center justify-between w-full px-6 bg-black bg-opacity-40">
                <h2 className="text-3xl font-bold text-white drop-shadow-lg" style={{ fontFamily: "Playfair Display, serif" }}>
                  Seeds
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l8-5-8-5z"/>
                    </svg>
                  </div>
                  <p className="text-white drop-shadow">Seeds Video Strip</p>
                </div>
              </div>
            </div>
            
            {/* Big placeholder */}
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center shadow-lg overflow-hidden relative">
              <video 
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover"
              >
                <source src="/seeds 1 mp4.mp4" type="video/mp4" />
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 5v10l8-5-8-5z"/>
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg">Seeds Video Content</p>
                  </div>
                </div>
              </video>
            </div>
            
            {/* Big placeholder */}
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center shadow-lg overflow-hidden relative">
              <video 
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover"
              >
                <source src="/seeds 2 mp4.mp4" type="video/mp4" />
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 5v10l8-5-8-5z"/>
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg">Seeds Video Content</p>
                  </div>
                </div>
              </video>
            </div>
          </div>
          
          {/* Orchards Section */}
          <div className="space-y-6">
            {/* Strip placeholder with header */}
            <div className="w-full h-24 bg-gray-200 rounded-lg flex items-center shadow-lg">
              <div className="flex items-center justify-between w-full px-6">
                <h2 className="text-3xl font-bold text-green-800" style={{ fontFamily: "Playfair Display, serif" }}>
                  Orchards
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l8-5-8-5z"/>
                    </svg>
                  </div>
                  <p className="text-gray-500">Orchards Video Strip</p>
                </div>
              </div>
            </div>
            
            {/* Big placeholder */}
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 5v10l8-5-8-5z"/>
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">Orchards Video Content</p>
              </div>
            </div>
            
            {/* Strip placeholder */}
            <div className="w-full h-24 bg-gray-200 rounded-lg flex items-center justify-center shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 5v10l8-5-8-5z"/>
                  </svg>
                </div>
                <p className="text-gray-500">Orchards Video Strip</p>
              </div>
            </div>
          </div>
          
          {/* Bestowers Section */}
          <div className="max-w-4xl mx-auto px-6 py-8">
            <Card className="border-rose-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-rose-600" />
                </div>
                <CardTitle className="text-rose-800">bestowers (cultivators and harvesters)</CardTitle>
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
          </div>
          
          {/* Bestowers Section */}
          <div className="space-y-6">
            {/* Strip placeholder with header */}
            <div className="w-full h-24 bg-gray-200 rounded-lg flex items-center shadow-lg">
              <div className="flex items-center justify-between w-full px-6">
                <h2 className="text-3xl font-bold text-green-800" style={{ fontFamily: "Playfair Display, serif" }}>
                  Bestowers
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l8-5-8-5z"/>
                    </svg>
                  </div>
                  <p className="text-gray-500">Bestowers Video Strip</p>
                </div>
              </div>
            </div>
            
            {/* Big placeholder */}
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 5v10l8-5-8-5z"/>
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">Bestowers Video Content</p>
              </div>
            </div>
          </div>
          
          {/* Tithing and Free-will Gifting Sections */}
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Tithing */}
              <Card className="border-amber-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Church className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-amber-800">tithing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-amber-600" />
                      <span className="text-sm text-gray-700">Biblical tithing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-amber-600" />
                      <span className="text-sm text-gray-700">Community support</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-amber-600" />
                      <span className="text-sm text-gray-700">Faith-based giving</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-amber-600" />
                      <span className="text-sm text-gray-700">Sacred stewardship</span>
                    </div>
                  </div>
                  <Link to="/tithing">
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 h-16 flex flex-col items-center justify-center">
                      <span className="text-sm leading-tight">let it rain over the 'gosat'</span>
                      <span className="text-xs text-amber-100">(gosat - guardians of the set-apart tabernacle)</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              {/* Free-will Gifting */}
              <Card className="border-purple-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-purple-800">free-will gifting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-gray-700">Voluntary giving</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-gray-700">Heart-led donations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-gray-700">Community blessing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-gray-700">Generous spirit</span>
                    </div>
                  </div>
                  <Link to="/free-will-gifting">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 h-16 flex flex-col items-center justify-center">
                      <span className="text-sm leading-tight">let it rain over</span>
                      <span className="text-sm leading-tight">the community</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Harvesters Section */}
          <div className="space-y-6">
            {/* Strip placeholder with header */}
            <div className="w-full h-24 bg-gray-200 rounded-lg flex items-center shadow-lg">
              <div className="flex items-center justify-between w-full px-6">
                <h2 className="text-3xl font-bold text-green-800" style={{ fontFamily: "Playfair Display, serif" }}>
                  Harvesters
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l8-5-8-5z"/>
                    </svg>
                  </div>
                  <p className="text-gray-500">Harvesters Video Strip</p>
                </div>
              </div>
            </div>
            
            {/* Big placeholder */}
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 5v10l8-5-8-5z"/>
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">Harvesters Video Content</p>
              </div>
            </div>
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