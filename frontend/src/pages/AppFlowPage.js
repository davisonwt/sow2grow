import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import {
  ArrowRight,
  Smartphone,
  Home,
  Sprout,
  Heart,
  Gift,
  Church,
  Calculator,
  Eye,
  ShoppingCart,
  CheckCircle,
  Users,
  BarChart3,
} from "lucide-react"

export default function AppFlowPage() {
  const [selectedPockets, setSelectedPockets] = useState([])

  const phoneScreens = [
    {
      id: "landing",
      title: "Landing Page",
      path: "/",
      status: "Entry",
      statusColor: "bg-blue-500",
      theme: "bg-gradient-to-br from-green-50 to-amber-50",
      icon: Home,
      actions: ["Start Your Journey", "Browse Orchards", "Tithing", "Free-Will Gifting"],
      description: "Welcome to sow2grow - biblical community giving platform",
    },
    {
      id: "start-journey",
      title: "Start Journey",
      path: "/start-your-journey",
      status: "Registration",
      statusColor: "bg-blue-600",
      theme: "bg-gradient-to-br from-blue-50 to-green-50",
      icon: Sprout,
      actions: ["Enter Email", "Choose User Type", "Set Location", "Create Account"],
      description: "Begin your sow2grow journey with account creation",
    },
    {
      id: "email-verification",
      title: "Email Verification",
      path: "/verify-email",
      status: "Verification",
      statusColor: "bg-yellow-500",
      theme: "bg-gradient-to-br from-yellow-50 to-blue-50",
      icon: CheckCircle,
      actions: ["Check Email", "Enter Code", "Resend Code", "Verify Account"],
      description: "Verify your email address to continue",
    },
    {
      id: "welcome",
      title: "Welcome Page",
      path: "/welcome",
      status: "Onboarding",
      statusColor: "bg-green-500",
      theme: "bg-gradient-to-br from-green-50 to-blue-50",
      icon: Heart,
      actions: ["Complete Profile", "Learn About Platform", "Continue to Hub"],
      description: "Welcome to the sow2grow community",
    },
    {
      id: "regrow-access",
      title: "Regrow Access Hub",
      path: "/regrow-access",
      status: "Main Hub",
      statusColor: "bg-green-600",
      theme: "bg-gradient-to-br from-green-50 to-amber-50",
      icon: Home,
      actions: ["Sow Into Orchards", "Browse Orchards", "My Orchards", "Tithing", "Free-Will Gifting"],
      description: "Your main dashboard - choose your path",
    },
  ]

  const sowerJourney = [
    {
      id: "sow-into-orchards",
      title: "Sow Into My Orchards",
      path: "/sow-into-my-orchards",
      status: "Planning",
      statusColor: "bg-green-500",
      theme: "bg-gradient-to-br from-green-50 to-blue-50",
      icon: Calculator,
      actions: ["AI Calculator", "Scenario Analysis", "Pocket Strategies", "Start Creating"],
      description: "Advanced calculator for orchard planning",
    },
    {
      id: "create-orchard",
      title: "Plant New Seed",
      path: "/plant-new-seed",
      status: "Creating",
      statusColor: "bg-green-600",
      theme: "bg-gradient-to-br from-green-50 to-amber-50",
      icon: Sprout,
      actions: ["6-Step Wizard", "Upload Media", "Set Pricing", "Community Agreements"],
      description: "Complete 6-step orchard creation process",
    },
    {
      id: "orchard-created",
      title: "Orchard Created",
      path: "/orchard-created",
      status: "Success",
      statusColor: "bg-green-700",
      theme: "bg-gradient-to-br from-green-100 to-amber-100",
      icon: CheckCircle,
      actions: ["View Orchard", "Share Link", "Manage Settings", "Go to Dashboard"],
      description: "Your orchard has been successfully created!",
    },
    {
      id: "my-orchards",
      title: "My Orchards",
      path: "/my-orchards",
      status: "Management",
      statusColor: "bg-green-800",
      theme: "bg-gradient-to-br from-green-50 to-amber-50",
      icon: BarChart3,
      actions: ["View Analytics", "Edit Orchards", "Messages", "Verification"],
      description: "Manage all your created orchards",
    },
  ]

  const bestowerJourney = [
    {
      id: "browse-orchards",
      title: "Browse Orchards",
      path: "/browse-orchards",
      status: "Browsing",
      statusColor: "bg-rose-500",
      theme: "bg-gradient-to-br from-rose-50 to-pink-50",
      icon: Eye,
      actions: ["Filter Orchards", "Search Seeds", "View Details", "Select Pockets"],
      description: "Discover orchards to bestow into",
    },
    {
      id: "animated-orchard",
      title: "Pocket Selection",
      path: "/animated-orchard",
      status: "Selecting",
      statusColor: "bg-rose-600",
      theme: "bg-gradient-to-br from-rose-50 to-amber-50",
      icon: Heart,
      actions: ["Select Pockets", "Select All Available", "View Impact", "Proceed to Checkout"],
      description: "Choose pockets to bestow into",
    },
    {
      id: "orchard-checkout",
      title: "Orchard Checkout",
      path: "/checkout/orchard-bestowal",
      status: "Checkout",
      statusColor: "bg-rose-700",
      theme: "bg-gradient-to-br from-rose-50 to-green-50",
      icon: ShoppingCart,
      actions: ["Review Selection", "Payment Details", "Complete Bestowal"],
      description: "Complete your orchard bestowal",
    },
  ]

  const giverJourney = [
    {
      id: "tithing",
      title: "Tithing",
      path: "/tithing-2",
      status: "Giving",
      statusColor: "bg-amber-500",
      theme: "bg-gradient-to-br from-amber-50 to-yellow-50",
      icon: Church,
      actions: ["Set Amount", "Choose Frequency", "Biblical Principles", "Proceed"],
      description: "Give your tithe to yhvh364 gosat's",
    },
    {
      id: "tithing-checkout",
      title: "Tithing Checkout",
      path: "/checkout/tithing",
      status: "Checkout",
      statusColor: "bg-amber-600",
      theme: "bg-gradient-to-br from-amber-50 to-green-50",
      icon: ShoppingCart,
      actions: ["Review Amount", "Payment Method", "Complete Tithing"],
      description: "Complete your tithing contribution",
    },
    {
      id: "free-will-gifting",
      title: "Free-Will Gifting",
      path: "/free-will-gifting",
      status: "Giving",
      statusColor: "bg-amber-500",
      theme: "bg-gradient-to-br from-amber-50 to-rose-50",
      icon: Gift,
      actions: ["Choose Amount", "Add Message", "Select Recipient", "Proceed"],
      description: "Make a free-will gift to the community",
    },
    {
      id: "gifting-checkout",
      title: "Gifting Checkout",
      path: "/checkout/free-will-gifting",
      status: "Checkout",
      statusColor: "bg-amber-600",
      theme: "bg-gradient-to-br from-amber-50 to-green-50",
      icon: ShoppingCart,
      actions: ["Review Gift", "Payment Details", "Complete Gift"],
      description: "Complete your free-will gift",
    },
  ]

  const PhoneScreen = ({ screen, showArrow = true }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Phone Frame */}
        <div className="w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
          <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
            {/* Phone Header */}
            <div className="h-6 bg-gray-100 flex items-center justify-center relative">
              <div className="w-16 h-1 bg-gray-400 rounded-full"></div>
              <div className="absolute right-2 flex space-x-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
            </div>

            {/* Screen Content */}
            <div className={`flex-1 ${screen.theme} p-4 flex flex-col`}>
              {/* Status Badge */}
              <Badge className={`${screen.statusColor} text-white mb-3 w-fit text-xs`}>{screen.status}</Badge>

              {/* Screen Icon */}
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <screen.icon className="h-6 w-6 text-gray-700" />
                </div>
              </div>

              {/* Screen Title */}
              <h3 className="text-sm font-bold text-center mb-2 text-gray-800">{screen.title}</h3>

              {/* Description */}
              <p className="text-xs text-gray-600 text-center mb-3 leading-tight">{screen.description}</p>

              {/* Actions */}
              <div className="space-y-1 flex-1">
                {screen.actions.slice(0, 4).map((action, index) => (
                  <div key={index} className="bg-white/70 rounded px-2 py-1">
                    <span className="text-xs text-gray-700">• {action}</span>
                  </div>
                ))}
              </div>

              {/* Path */}
              <div className="mt-2 text-xs text-gray-500 text-center font-mono">{screen.path}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow */}
      {showArrow && (
        <div className="flex justify-center mt-4 mb-4">
          <ArrowRight className="h-6 w-6 text-gray-400" />
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-green-100 mb-8 -mx-8 -mt-8 px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-800" style={{ fontFamily: "Playfair Display, serif" }}>
                sow2grow
              </h1>
              <p className="text-xs text-green-600">app flow visualization</p>
            </div>
          </Link>
          <Badge variant="outline" className="border-blue-600 text-blue-600">
            <Smartphone className="h-3 w-3 mr-1" />
            mobile flow
          </Badge>
        </div>
      </div>

      <div className="space-y-16">
        {/* Introduction */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Complete App User Flow
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow the complete user journey through sow2grow - from first visit to successful transactions. Each
            screen represents a key step in the user experience.
          </p>
        </div>

        {/* Main User Journey */}
        <section>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Main User Journey</h3>
            <p className="text-blue-600">New user registration and onboarding process</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {phoneScreens.map((screen, index) => (
              <PhoneScreen key={screen.id} screen={screen} showArrow={index < phoneScreens.length - 1} />
            ))}
          </div>
        </section>

        {/* Sower Journey */}
        <section>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-green-800 mb-2">Sower Journey</h3>
            <p className="text-green-600">Creating and managing orchards for funding needs</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {sowerJourney.map((screen, index) => (
              <PhoneScreen key={screen.id} screen={screen} showArrow={index < sowerJourney.length - 1} />
            ))}
          </div>
        </section>

        {/* Bestower Journey */}
        <section>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-rose-800 mb-2">Bestower Journey</h3>
            <p className="text-rose-600">Discovering and supporting orchards in the community</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {bestowerJourney.map((screen, index) => (
              <PhoneScreen key={screen.id} screen={screen} showArrow={index < bestowerJourney.length - 1} />
            ))}
          </div>
        </section>

        {/* Giver Journey */}
        <section>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-amber-800 mb-2">Giver Journey</h3>
            <p className="text-amber-600">Tithing and free-will gifting to the community</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tithing Flow */}
            <div>
              <h4 className="text-lg font-semibold text-amber-700 text-center mb-4">Tithing Flow</h4>
              <div className="flex flex-wrap justify-center gap-8">
                {giverJourney.slice(0, 2).map((screen, index) => (
                  <PhoneScreen key={screen.id} screen={screen} showArrow={index < 1} />
                ))}
              </div>
            </div>

            {/* Free-Will Gifting Flow */}
            <div>
              <h4 className="text-lg font-semibold text-amber-700 text-center mb-4">Free-Will Gifting Flow</h4>
              <div className="flex flex-wrap justify-center gap-8">
                {giverJourney.slice(2, 4).map((screen, index) => (
                  <PhoneScreen key={screen.id} screen={screen} showArrow={index < 1} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Flow Summary */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Flow Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Home className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-800 mb-2">New Users</h4>
                <p className="text-sm text-blue-600">
                  6-step onboarding process with email verification and optional identity verification
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sprout className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-green-800 mb-2">Sowers</h4>
                <p className="text-sm text-green-600">
                  AI-powered calculator, 6-step orchard creation, and comprehensive management dashboard
                </p>
              </CardContent>
            </Card>

            <Card className="border-rose-200">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-rose-600" />
                </div>
                <h4 className="font-semibold text-rose-800 mb-2">Bestowers</h4>
                <p className="text-sm text-rose-600">
                  Browse orchards, select pockets with visual interface, and secure checkout process
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-200">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gift className="h-6 w-6 text-amber-600" />
                </div>
                <h4 className="font-semibold text-amber-800 mb-2">Givers</h4>
                <p className="text-sm text-amber-600">
                  Biblical tithing and free-will gifting with secure payment processing
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}