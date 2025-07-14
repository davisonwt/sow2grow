import React, { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  Edit, 
  Save, 
  X,
  Sprout,
  Heart,
  TrendingUp,
  Users,
  Star,
  Calendar,
  Shield
} from "lucide-react"

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    location: user?.location || "",
    phone: user?.phone || ""
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSave = async () => {
    setLoading(true)
    try {
      const result = await updateProfile(formData)
      if (result.success) {
        setEditing(false)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleCancel = () => {
    setFormData({
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      location: user?.location || "",
      phone: user?.phone || ""
    })
    setEditing(false)
  }
  
  // Mock user stats
  const userStats = {
    joinedDate: "January 2024",
    totalBestowed: 2450,
    totalReceived: 1800,
    orchardsCreated: 3,
    orchardsSupported: 12,
    communityRank: "Faithful Grower",
    verificationLevel: "Verified"
  }
  
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto space-y-8 p-6">
        {/* Header */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mx-auto max-w-3xl border border-white/20 shadow-2xl">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-lg">
                <User className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2" style={{ 
              fontFamily: "Playfair Display, serif",
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
            }}>
              My Profile
            </h1>
            <p className="text-lg text-white/90" style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
            }}>
              Manage your account in the 364yhvh Community Farm
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge className="bg-green-500/80 text-white border border-green-300/50 backdrop-blur-sm">
                <Sprout className="h-3 w-3 mr-1" />
                Farm Stall Owner
              </Badge>
              <Badge className="bg-blue-500/80 text-white border border-blue-300/50 backdrop-blur-sm">
                <Shield className="h-3 w-3 mr-1" />
                {userStats.verificationLevel}
              </Badge>
              <Badge className="bg-amber-500/80 text-white border border-amber-300/50 backdrop-blur-sm">
                <Star className="h-3 w-3 mr-1" />
                {userStats.communityRank}
              </Badge>
            </div>
          </div>
        </div>
      
      {/* Profile Information */}
      <Card className="bg-white/90 backdrop-blur-sm border-green-200 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-green-800">Personal Information</CardTitle>
          {!editing ? (
            <Button
              onClick={() => setEditing(true)}
              variant="outline"
              size="sm"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={loading}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline h-4 w-4 mr-1" />
                First Name
              </label>
              {editing ? (
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800 py-2">{user?.first_name || "Not set"}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline h-4 w-4 mr-1" />
                Last Name
              </label>
              {editing ? (
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800 py-2">{user?.last_name || "Not set"}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline h-4 w-4 mr-1" />
                Email Address
              </label>
              <p className="text-gray-800 py-2">{user?.email}</p>
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Location
              </label>
              {editing ? (
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="City, Country"
                />
              ) : (
                <p className="text-gray-800 py-2">{user?.location || "Not set"}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline h-4 w-4 mr-1" />
                Phone Number
              </label>
              {editing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Phone number"
                />
              ) : (
                <p className="text-gray-800 py-2">{user?.phone || "Not set"}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-green-800 mb-1">R{userStats.totalBestowed.toLocaleString()}</div>
            <p className="text-sm text-green-600">Total Bestowed</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-blue-800 mb-1">R{userStats.totalReceived.toLocaleString()}</div>
            <p className="text-sm text-blue-600">Total Received</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-purple-800 mb-1">{userStats.orchardsSupported}</div>
            <p className="text-sm text-purple-600">Orchards Supported</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Account Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/90 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Account Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Member Since</span>
              <div className="flex items-center gap-1 text-sm text-gray-800">
                <Calendar className="h-4 w-4" />
                {userStats.joinedDate}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Verification Level</span>
              <Badge className="bg-blue-100 text-blue-800">
                <Shield className="h-3 w-3 mr-1" />
                {userStats.verificationLevel}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Community Rank</span>
              <Badge className="bg-amber-100 text-amber-800">
                <Star className="h-3 w-3 mr-1" />
                {userStats.communityRank}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Role</span>
              <Badge className="bg-green-100 text-green-800">
                <Sprout className="h-3 w-3 mr-1" />
                Farm Stall Owner
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/90 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Farm Stall Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Orchards Created</span>
              <span className="text-sm font-medium text-gray-800">{userStats.orchardsCreated}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Orchards Supported</span>
              <span className="text-sm font-medium text-gray-800">{userStats.orchardsSupported}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Contributions</span>
              <span className="text-sm font-medium text-gray-800">R{(userStats.totalBestowed + userStats.totalReceived).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Community Impact</span>
              <Badge className="bg-green-100 text-green-800">High</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Community Standing */}
      <Card className="bg-gradient-to-r from-green-50 to-amber-50 border-green-200">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-green-800 mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Your Community Standing
          </h3>
          <p className="text-gray-700 mb-6">
            You are a valued member of the 364yhvh Community Farm. Your generous spirit and faithful participation 
            have helped create a thriving community where everyone supports each other.
          </p>
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-800">23</div>
              <p className="text-sm text-green-600">People Helped</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-800">89%</div>
              <p className="text-sm text-green-600">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-800">4.8</div>
              <p className="text-sm text-green-600">Community Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}