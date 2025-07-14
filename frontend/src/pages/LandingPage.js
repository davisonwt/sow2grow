import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
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
      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between p-6">
        <div className="flex items-center space-x-8">
          <img 
            src="/logo.jpeg" 
            alt="sow2grow logo" 
            className="w-12 h-12 object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold text-green-800" style={{ fontFamily: "Playfair Display, serif" }}>
              sow2grow
            </h1>
            <p className="text-xs text-green-600">364yhvh community farm</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/login">
              <Button variant="ghost" className="text-green-700 hover:text-green-800">
                Join Community
              </Button>
            </Link>
            <Link to="/browse-orchards">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700" style={{ borderRadius: '21px' }}>
                Cultivate Community Orchards
              </Button>
            </Link>
          </div>
          <Link to="/login">
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50" style={{ borderRadius: '21px' }}>
              Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full animate-pulse shadow-xl" style={{ animationDuration: "4s" }}></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-amber-200/30 to-yellow-200/30 rounded-full animate-bounce shadow-lg" style={{ animationDuration: "3s", animationDelay: "1s" }}></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-green-300/20 to-teal-300/20 rounded-full animate-pulse shadow-xl" style={{ animationDuration: "5s", animationDelay: "2s" }}></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full animate-ping shadow-md" style={{ animationDuration: "6s", animationDelay: "3s" }}></div>
        </div>

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
            <Badge className="mb-8 px-8 py-3 text-lg font-bold shadow-xl border-2" style={{ backgroundColor: '#bf7500', borderColor: '#8b5500', color: '#ffffff' }}>
              <Sprout className="h-5 w-5 mr-2" />
              364yhvh Community Farm Stall
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight drop-shadow-2xl" style={{ fontFamily: "Playfair Display, serif", color: '#0c71c3', textShadow: '3px 3px 6px rgba(0,0,0,0.5)' }}>
              welcome to sow2grow
            </h1>
            
            <p className="text-lg text-white mb-6 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
              the farm stall of the 364yhvh community; a haven of hands and harvest, where sacred seasons meet the fruits of faithful labor.
            </p>
            
            <p className="text-2xl md:text-3xl font-semibold text-green-200 mb-12 max-w-5xl mx-auto leading-relaxed drop-shadow-lg" style={{ textStroke: '2px #6b7280', WebkitTextStroke: '2px #6b7280', color: 'white' }}>
              a fertile ground where every grower finds their orchard, every seed becomes a fruit-bearing tree, and every harvest meets the hands destined to gather it.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="px-10 py-8 text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-0 hover:-translate-y-2"
                  style={{ 
                    borderRadius: '21px',
                    backgroundColor: '#0c71c3',
                    boxShadow: '0 20px 40px rgba(12, 113, 195, 0.3)'
                  }}
                >
                  <Heart className="h-6 w-6 mr-3" />
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/browse-orchards">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-10 py-8 text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm hover:-translate-y-2"
                  style={{ 
                    borderRadius: '21px',
                    boxShadow: '0 20px 40px rgba(255, 255, 255, 0.2)'
                  }}
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
              <div className="w-20 h-20 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <HandHeart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">scriptural giving</h3>
              <p className="text-gray-600">give with joy, not just duty,<br />first fruits and love, your tithe of beauty.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-300 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-amber-800 mb-3">Community Support</h3>
              <p className="text-gray-600">growers sow, bestowers flow;<br />shared harvest makes the body grow.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Gift className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-rose-800 mb-3">s2g farm mall</h3>
              <p className="text-gray-600">each stall blooms, each hand gives;<br />fruit shared fresh, the body lives.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How s2g farm mall works Section */}
      <section className="py-12 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-green-800 mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
              How s2g farm mall works
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              roots receive, branches share; one grove, one people, one prayer.
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
              <CardTitle className="text-green-800">sower (farm stall owners)</CardTitle>
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
                <Button className="w-full bg-green-600 hover:bg-green-700" style={{ borderRadius: '21px' }}>
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
        <div className="max-w-full mx-auto px-2 space-y-12">
          
          {/* Seeds Section */}
          <div className="space-y-6">
            {/* Seeds Strip */}
            <div className="w-full bg-gray-200 rounded-lg flex items-center shadow-lg overflow-hidden relative" style={{ width: '1920px', height: '350px', maxWidth: '100%', margin: '0 auto' }}>
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
            
            {/* Seeds 1 Large */}
            <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center shadow-lg overflow-hidden relative" style={{ width: '1280px', height: '720px', maxWidth: '100%', margin: '0 auto' }}>
              <video 
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover"
              >
                <source src="/seeds 1 mp4.mp4" type="video/mp4" />
              </video>
            </div>
            
            {/* Seeds 2 Large with text overlay */}
            <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center shadow-lg overflow-hidden relative" style={{ width: '1280px', height: '720px', maxWidth: '100%', margin: '0 auto' }}>
              <video 
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover"
              >
                <source src="/seeds 2 mp4.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-xl font-semibold text-center px-8 py-4 bg-black bg-opacity-50 rounded-lg max-w-2xl">
                  ...into a home for anyone of our harvesters. it is born from purpose, ready to be sown.
                </p>
              </div>
            </div>
          </div>
          
          {/* Orchards Section */}
          <div className="space-y-6">
            {/* Orchards Strip 1 */}
            <div className="w-full bg-gray-200 rounded-lg flex items-center shadow-lg overflow-hidden relative" style={{ width: '1920px', height: '350px', maxWidth: '100%', margin: '0 auto' }}>
              <video 
                autoPlay 
                muted 
                loop 
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/orchards strip1 mp4.mp4" type="video/mp4" />
              </video>
              <div className="relative z-10 flex items-center justify-between w-full px-6 bg-black bg-opacity-40">
                <h2 className="text-3xl font-bold text-white drop-shadow-lg" style={{ fontFamily: "Playfair Display, serif" }}>
                  Orchards
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l8-5-8-5z"/>
                    </svg>
                  </div>
                  <p className="text-white drop-shadow">Orchards Video Strip</p>
                </div>
              </div>
            </div>
            
            {/* Orchards Main Large */}
            <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center shadow-lg overflow-hidden relative" style={{ width: '1280px', height: '720px', maxWidth: '100%', margin: '0 auto' }}>
              <video 
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover"
              >
                <source src="/orchards main mp4.mp4" type="video/mp4" />
              </video>
            </div>
            
            {/* Orchards Strip 2 with text overlay */}
            <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center shadow-lg overflow-hidden relative" style={{ width: '1920px', height: '350px', maxWidth: '100%', margin: '0 auto' }}>
              <video 
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover"
              >
                <source src="/orchards strip2 mp4.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-lg font-semibold text-center px-6 py-2 bg-black bg-opacity-60 rounded">
                  our community members act as your online outlets; making tiktok, placing orders, and cultivating your gift into global fruit.
                </p>
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
                  <Button className="w-full bg-rose-600 hover:bg-rose-700" style={{ borderRadius: '21px' }}>
                    Start Bestowing
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          {/* Bestowers Videos */}
          <div className="space-y-6">
            {/* Bestowers Strip */}
            <div className="w-full bg-gray-200 rounded-lg flex items-center shadow-lg overflow-hidden relative" style={{ width: '1920px', height: '350px', maxWidth: '100%', margin: '0 auto' }}>
              <video 
                autoPlay 
                muted 
                loop 
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/bestowers strip mp4.mp4" type="video/mp4" />
              </video>
              <div className="relative z-10 flex items-center justify-between w-full px-6 bg-black bg-opacity-40">
                <h2 className="text-3xl font-bold text-white drop-shadow-lg" style={{ fontFamily: "Playfair Display, serif" }}>
                  Bestowers
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l8-5-8-5z"/>
                    </svg>
                  </div>
                  <p className="text-white drop-shadow">Bestowers Video Strip</p>
                </div>
              </div>
            </div>
            
            {/* Bestowers Main Large with text overlay */}
            <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center shadow-lg overflow-hidden relative" style={{ width: '1280px', height: '720px', maxWidth: '100%', margin: '0 auto' }}>
              <video 
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover"
              >
                <source src="/bestowers main mp4.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-xl font-semibold text-center px-8 py-4 bg-black bg-opacity-50 rounded-lg max-w-2xl">
                  those who water and or add compost to your orchard by choosing to grow what you sow.
                </p>
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
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 h-16 flex flex-col items-center justify-center" style={{ borderRadius: '21px' }}>
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
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 h-16 flex flex-col items-center justify-center" style={{ borderRadius: '21px' }}>
                      <span className="text-sm leading-tight">let it rain over</span>
                      <span className="text-sm leading-tight">the community</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Harvesters Videos */}
          <div className="space-y-6">
            {/* Harvesters Strip */}
            <div className="w-full bg-gray-200 rounded-lg flex items-center shadow-lg overflow-hidden relative" style={{ width: '1920px', height: '350px', maxWidth: '100%', margin: '0 auto' }}>
              <video 
                autoPlay 
                muted 
                loop 
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/harvesters strip mp4.mp4" type="video/mp4" />
              </video>
              <div className="relative z-10 flex items-center justify-between w-full px-6 bg-black bg-opacity-40">
                <h2 className="text-3xl font-bold text-white drop-shadow-lg" style={{ fontFamily: "Playfair Display, serif" }}>
                  Harvesters
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l8-5-8-5z"/>
                    </svg>
                  </div>
                  <p className="text-white drop-shadow">Harvesters Video Strip</p>
                </div>
              </div>
            </div>
            
            {/* Harvesters Main Large with text overlay */}
            <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center shadow-lg overflow-hidden relative" style={{ width: '1280px', height: '720px', maxWidth: '100%', margin: '0 auto' }}>
              <video 
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover"
              >
                <source src="/harvesters main mp4.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-xl font-semibold text-center px-8 py-4 bg-black bg-opacity-50 rounded-lg max-w-2xl">
                  the return; where bestowers receive, and the cycle becomes whole.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </section>
      
      {/* Scripture Section */}
      <section className="py-20 bg-gradient-to-br from-green-100 to-amber-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <blockquote className="text-3xl font-bold text-green-800 mb-8" style={{ fontFamily: "Playfair Display, serif" }}>
            "I planted, Apollos watered, but God gave the growth."
          </blockquote>
          <cite className="text-lg text-green-600">1 Corinthians 3:6</cite>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 text-white" style={{ backgroundColor: '#bf7500' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
            Join the 364yhvh Community Farm
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Be part of a scriptural community where everyone grows together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                style={{ 
                  borderRadius: '21px',
                  backgroundColor: '#0c71c3',
                  color: 'white',
                  boxShadow: '0 20px 40px rgba(12, 113, 195, 0.3)'
                }}
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
                style={{ borderRadius: '21px' }}
              >
                <Shield className="h-5 w-5 mr-2" />
                View App Flow
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}