import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApi } from "../hooks/useApi"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { 
  Plus, 
  Sprout, 
  DollarSign, 
  MapPin, 
  Clock, 
  Heart, 
  Users,
  Calculator,
  Sparkles,
  Camera,
  Image,
  Video,
  Upload,
  X
} from "lucide-react"

export default function CreateOrchardPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    seed_value: "",
    pocket_price: 150,
    location: "",
    timeline: "",
    why_needed: "",
    community_impact: "",
    features: "",
    images: [],
    video_url: ""
  })
  const [selectedImages, setSelectedImages] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const api = useApi()
  const navigate = useNavigate()
  
  const categories = [
    "The Gift of Technology",
    "The Gift of Vehicles", 
    "The Gift of Property",
    "The Gift of Energy",
    "The Gift of Wellness",
    "The Gift of Tools",
    "The Gift of Services",
    "The Gift of Innovation",
    "The Gift of Electronics",
    "The Gift of Appliances"
  ]
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      const orchardData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        seed_value: parseFloat(formData.seed_value),
        pocket_price: parseFloat(formData.pocket_price),
        location: formData.location,
        timeline: formData.timeline,
        why_needed: formData.why_needed,
        community_impact: formData.community_impact,
        features: formData.features.split(",").map(f => f.trim()).filter(f => f),
        images: formData.images, // Already in base64 format
        video_url: formData.video_url // Already in base64 format
      }
      
      const response = await api.createOrchard(orchardData)
      
      if (response.success) {
        navigate("/orchard-created", { state: { orchard: response.data } })
      } else {
        setError(response.error || "Failed to create orchard. Please try again.")
      }
      
    } catch (err) {
      console.error("Create orchard error:", err)
      setError(err.response?.data?.detail || "Failed to create orchard. Please try again.")
    } finally {
      setLoading(false)
    }
  }
  
  const calculatePockets = () => {
    const seedValue = parseFloat(formData.seed_value)
    const pocketPrice = parseFloat(formData.pocket_price)
    if (seedValue && pocketPrice) {
      return Math.ceil(seedValue / pocketPrice)
    }
    return 0
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 3) {
      setError("You can only upload up to 3 images")
      return
    }
    
    const validImages = files.filter(file => file.type.startsWith('image/'))
    if (validImages.length !== files.length) {
      setError("Please upload only image files")
      return
    }
    
    const imagePromises = validImages.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          resolve({
            file,
            preview: e.target.result,
            base64: e.target.result
          })
        }
        reader.readAsDataURL(file)
      })
    })
    
    Promise.all(imagePromises).then(images => {
      setSelectedImages(images)
      setFormData(prev => ({
        ...prev,
        images: images.map(img => img.base64)
      }))
      setError("")
    })
  }

  const handleVideoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    if (!file.type.startsWith('video/')) {
      setError("Please upload a video file")
      return
    }
    
    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      setError("Video file is too large. Maximum size is 50MB.")
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const videoData = {
        file,
        preview: e.target.result,
        base64: e.target.result
      }
      setSelectedVideo(videoData)
      setFormData(prev => ({
        ...prev,
        video_url: e.target.result
      }))
      setError("")
    }
    reader.readAsDataURL(file)
  }

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index)
    setSelectedImages(newImages)
    setFormData(prev => ({
      ...prev,
      images: newImages.map(img => img.base64)
    }))
  }

  const removeVideo = () => {
    setSelectedVideo(null)
    setFormData(prev => ({
      ...prev,
      video_url: ""
    }))
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
          <source src="/seeds 1 mp4.mp4" type="video/mp4" />
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-amber-100"></div>
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      
      {/* Content over video */}
      <div className="relative z-10 max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-lg">
            <Sprout className="h-8 w-8 text-white animate-pulse" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-green-800 mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
          Plant a New Seed
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create a new orchard in your farm stall within the 364yhvh Community Farm. 
          Share your need with the community and watch it grow with their support.
        </p>
        <Badge className="mt-4 bg-green-100 text-green-800">
          <Plus className="h-3 w-3 mr-1" />
          6-Step Creation Process
        </Badge>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card className="bg-white/90 backdrop-blur-sm border-green-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Sprout className="h-5 w-5" />
              Step 1: Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Orchard Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 2019 Toyota Corolla"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="4"
                placeholder="Describe what this orchard is for..."
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Timeline
                </label>
                <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Need by March 2024"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Financial Details */}
        <Card className="bg-white/90 backdrop-blur-sm border-green-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Step 2: Financial Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="inline h-4 w-4 mr-1" />
                  Total Seed Value (R) *
                </label>
                <input
                  type="number"
                  name="seed_value"
                  value={formData.seed_value}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 18000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pocket Price (R)
                </label>
                <input
                  type="number"
                  name="pocket_price"
                  value={formData.pocket_price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="150"
                />
              </div>
            </div>
            
            {formData.seed_value && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">
                  <Calculator className="inline h-4 w-4 mr-1" />
                  Pocket Calculation
                </h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-800">{calculatePockets()}</div>
                    <div className="text-sm text-green-600">Total Pockets</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-800">R{formData.pocket_price}</div>
                    <div className="text-sm text-green-600">Per Pocket</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-800">R{formData.seed_value}</div>
                    <div className="text-sm text-green-600">Total Value</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Purpose & Impact */}
        <Card className="bg-white/90 backdrop-blur-sm border-green-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Step 3: Purpose & Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why is this needed? *
              </label>
              <textarea
                name="why_needed"
                value={formData.why_needed}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="3"
                placeholder="Explain why this orchard is important for you..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Community Impact *
              </label>
              <textarea
                name="community_impact"
                value={formData.community_impact}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="3"
                placeholder="How will this benefit the community?"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features (comma-separated)
              </label>
              <input
                type="text"
                name="features"
                value={formData.features}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Reliable, Fuel efficient, Low maintenance"
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Media Upload */}
        <Card className="bg-white/90 backdrop-blur-sm border-green-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Step 4: Media Upload
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Help the community see your need! Upload 1-3 photos and optionally a video to showcase your orchard.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Image className="inline h-4 w-4 mr-1" />
                Images (1-3 photos)
              </label>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                  <input
                    type="file"
                    id="image-upload"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    max="3"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload images or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 5MB each (max 3 images)</p>
                  </label>
                </div>
                
                {/* Image Previews */}
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                          {image.file.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Video Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Video className="inline h-4 w-4 mr-1" />
                Video (Optional)
              </label>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                  <input
                    type="file"
                    id="video-upload"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <Video className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload a video or drag and drop</p>
                    <p className="text-xs text-gray-500">MP4, MOV, AVI up to 50MB</p>
                  </label>
                </div>
                
                {/* Video Preview */}
                {selectedVideo && (
                  <div className="relative group">
                    <video
                      src={selectedVideo.preview}
                      controls
                      className="w-full h-48 rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {selectedVideo.file.name}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Media Guidelines */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">
                <Sparkles className="inline h-4 w-4 mr-1" />
                Media Guidelines
              </h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Upload clear, high-quality images that show your need</li>
                <li>• Include photos of the current situation and what you're working toward</li>
                <li>• Videos can help tell your story more personally (optional but recommended)</li>
                <li>• Keep content appropriate and family-friendly</li>
                <li>• Authentic, genuine content builds more community trust</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Planting Seed...
              </div>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Sow Seed Into New Orchard
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
    </div>
  )
}