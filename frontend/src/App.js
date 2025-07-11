import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./hooks/useAuth"
import "./App.css"

// Pages
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import BrowseOrchardsPage from "./pages/BrowseOrchardsPage"
import AnimatedOrchardPage from "./pages/AnimatedOrchardPage"
import CreateOrchardPage from "./pages/CreateOrchardPage"
import MyOrchardsPage from "./pages/MyOrchardsPage"
import TithingPage from "./pages/TithingPage"
import FreeWillGiftingPage from "./pages/FreeWillGiftingPage"
import AdminAnalyticsPage from "./pages/AdminAnalyticsPage"
import ProfilePage from "./pages/ProfilePage"
import AppFlowPage from "./pages/AppFlowPage"

// Components
import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./components/Layout"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/start-your-journey" element={<RegisterPage />} />
            <Route path="/app-flow" element={<AppFlowPage />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/regrow-access" element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/browse-orchards" element={
              <ProtectedRoute>
                <Layout>
                  <BrowseOrchardsPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/animated-orchard/:id" element={
              <ProtectedRoute>
                <Layout>
                  <AnimatedOrchardPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/create-orchard" element={
              <ProtectedRoute>
                <Layout>
                  <CreateOrchardPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/plant-new-seed" element={
              <ProtectedRoute>
                <Layout>
                  <CreateOrchardPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/my-orchards" element={
              <ProtectedRoute>
                <Layout>
                  <MyOrchardsPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/tithing" element={
              <ProtectedRoute>
                <Layout>
                  <TithingPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/tithing-2" element={
              <ProtectedRoute>
                <Layout>
                  <TithingPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/free-will-gifting" element={
              <ProtectedRoute>
                <Layout>
                  <FreeWillGiftingPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin/analytics" element={
              <ProtectedRoute>
                <Layout>
                  <AdminAnalyticsPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <ProfilePage />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Fallback */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
