"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  X,
  Target,
  Calendar,
  DollarSign,
  Users,
  Globe,
  Smartphone,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Search,
  Mail,
  Eye,
  MousePointer,
  ShoppingCart,
  UserPlus,
  Heart,
  MessageCircle,
} from "lucide-react"

interface NewCampaignModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

interface CampaignFormData {
  name: string
  description: string
  type: string
  objective: string
  budget: number
  startDate: string
  endDate: string
  targetAudience: string
  ageRange: string
  location: string
  platforms: string[]
  adFormat: string
  bidStrategy: string
  keywords: string
}

export function NewCampaignModal({ isOpen, onClose, onSubmit }: NewCampaignModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<CampaignFormData>({
    name: "",
    description: "",
    type: "",
    objective: "",
    budget: 1000,
    startDate: "",
    endDate: "",
    targetAudience: "",
    ageRange: "",
    location: "",
    platforms: [],
    adFormat: "",
    bidStrategy: "",
    keywords: "",
  })

  const totalSteps = 4

  const campaignTypes = [
    { id: "awareness", name: "Brand Awareness", icon: Eye, description: "Increase brand visibility and recognition" },
    { id: "traffic", name: "Website Traffic", icon: MousePointer, description: "Drive visitors to your website" },
    { id: "conversions", name: "Conversions", icon: ShoppingCart, description: "Generate sales and leads" },
    { id: "engagement", name: "Engagement", icon: Heart, description: "Increase likes, shares, and comments" },
    { id: "leads", name: "Lead Generation", icon: UserPlus, description: "Collect potential customer information" },
    { id: "app", name: "App Promotion", icon: Smartphone, description: "Promote mobile app downloads" },
  ]

  const objectives = [
    { id: "reach", name: "Reach", icon: Globe, description: "Show ads to as many people as possible" },
    { id: "impressions", name: "Impressions", icon: Eye, description: "Maximize ad visibility" },
    { id: "clicks", name: "Clicks", icon: MousePointer, description: "Drive clicks to your website" },
    { id: "conversions", name: "Conversions", icon: Target, description: "Optimize for specific actions" },
    { id: "engagement", name: "Engagement", icon: MessageCircle, description: "Encourage interaction with ads" },
    { id: "video-views", name: "Video Views", icon: Youtube, description: "Maximize video watch time" },
  ]

  const platforms = [
    { id: "google", name: "Google Ads", icon: Search, color: "text-blue-600" },
    { id: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-700" },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-600" },
    { id: "twitter", name: "Twitter", icon: Twitter, color: "text-blue-400" },
    { id: "youtube", name: "YouTube", icon: Youtube, color: "text-red-600" },
    { id: "email", name: "Email Marketing", icon: Mail, color: "text-green-600" },
  ]

  const adFormats = [
    { id: "text", name: "Text Ads", description: "Simple text-based advertisements" },
    { id: "image", name: "Image Ads", description: "Visual ads with compelling images" },
    { id: "video", name: "Video Ads", description: "Engaging video content" },
    { id: "carousel", name: "Carousel Ads", description: "Multiple images or videos in one ad" },
    { id: "story", name: "Story Ads", description: "Full-screen vertical ads" },
    { id: "shopping", name: "Shopping Ads", description: "Product-focused advertisements" },
  ]

  const bidStrategies = [
    { id: "manual", name: "Manual CPC", description: "Set your own cost-per-click bids" },
    { id: "auto", name: "Automated Bidding", description: "Let AI optimize your bids" },
    { id: "target-cpa", name: "Target CPA", description: "Optimize for cost per acquisition" },
    { id: "target-roas", name: "Target ROAS", description: "Optimize for return on ad spend" },
    { id: "maximize-clicks", name: "Maximize Clicks", description: "Get the most clicks within budget" },
    { id: "maximize-conversions", name: "Maximize Conversions", description: "Get the most conversions" },
  ]

  const handleInputChange = (field: keyof CampaignFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePlatformToggle = (platformId: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter((p) => p !== platformId)
        : [...prev.platforms, platformId],
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    onSubmit(formData)
    // Reset form
    setFormData({
      name: "",
      description: "",
      type: "",
      objective: "",
      budget: 1000,
      startDate: "",
      endDate: "",
      targetAudience: "",
      ageRange: "",
      location: "",
      platforms: [],
      adFormat: "",
      bidStrategy: "",
      keywords: "",
    })
    setCurrentStep(1)
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.type && formData.objective
      case 2:
        return formData.budget > 0 && formData.startDate && formData.endDate
      case 3:
        return formData.targetAudience && formData.platforms.length > 0
      case 4:
        return formData.adFormat && formData.bidStrategy
      default:
        return false
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Campaign Basics"
      case 2:
        return "Budget & Schedule"
      case 3:
        return "Audience & Platforms"
      case 4:
        return "Ad Settings"
      default:
        return "Campaign Setup"
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Campaign</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{getStepTitle()}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <AnimatePresence mode="wait">
              {/* Step 1: Campaign Basics */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                          Campaign Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter campaign name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          placeholder="Describe your campaign goals and strategy"
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-gray-700 dark:text-gray-300 mb-3 block">Campaign Type *</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {campaignTypes.map((type) => (
                            <Card
                              key={type.id}
                              className={`cursor-pointer transition-all hover:shadow-md ${
                                formData.type === type.id
                                  ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
                              }`}
                              onClick={() => handleInputChange("type", type.id)}
                            >
                              <CardContent className="p-3 text-center">
                                <type.icon className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                                <h4 className="font-medium text-sm text-gray-900 dark:text-white">{type.name}</h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{type.description}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 mb-3 block">Campaign Objective *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {objectives.map((objective) => (
                        <Card
                          key={objective.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            formData.objective === objective.id
                              ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                          onClick={() => handleInputChange("objective", objective.id)}
                        >
                          <CardContent className="p-3 text-center">
                            <objective.icon className="w-5 h-5 mx-auto mb-2 text-purple-600" />
                            <h4 className="font-medium text-sm text-gray-900 dark:text-white">{objective.name}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{objective.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Budget & Schedule */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                      <CardHeader>
                        <CardTitle className="flex items-center text-green-800 dark:text-green-200">
                          <DollarSign className="w-5 h-5 mr-2" />
                          Budget Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="budget" className="text-gray-700 dark:text-gray-300">
                            Total Budget *
                          </Label>
                          <div className="relative mt-1">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <Input
                              id="budget"
                              type="number"
                              value={formData.budget}
                              onChange={(e) => handleInputChange("budget", Number.parseInt(e.target.value) || 0)}
                              className="pl-10"
                              min="1"
                            />
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Recommended: $1,000 - $10,000 for optimal results
                          </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Budget Breakdown</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Daily Budget:</span>
                              <span className="font-medium">${Math.round(formData.budget / 30)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Est. Clicks:</span>
                              <span className="font-medium">{Math.round(formData.budget / 2.5)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Est. Impressions:</span>
                              <span className="font-medium">{Math.round(formData.budget * 100)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
                      <CardHeader>
                        <CardTitle className="flex items-center text-blue-800 dark:text-blue-200">
                          <Calendar className="w-5 h-5 mr-2" />
                          Schedule
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="startDate" className="text-gray-700 dark:text-gray-300">
                            Start Date *
                          </Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => handleInputChange("startDate", e.target.value)}
                            className="mt-1"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                        <div>
                          <Label htmlFor="endDate" className="text-gray-700 dark:text-gray-300">
                            End Date *
                          </Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => handleInputChange("endDate", e.target.value)}
                            className="mt-1"
                            min={formData.startDate || new Date().toISOString().split("T")[0]}
                          />
                        </div>

                        {formData.startDate && formData.endDate && (
                          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Campaign Duration</h4>
                            <div className="text-sm">
                              <p className="text-gray-600 dark:text-gray-400">
                                Duration:{" "}
                                <span className="font-medium">
                                  {Math.ceil(
                                    (new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) /
                                      (1000 * 60 * 60 * 24),
                                  )}{" "}
                                  days
                                </span>
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Audience & Platforms */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Users className="w-5 h-5 mr-2" />
                          Target Audience
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="targetAudience" className="text-gray-700 dark:text-gray-300">
                            Audience Description *
                          </Label>
                          <Textarea
                            id="targetAudience"
                            value={formData.targetAudience}
                            onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                            placeholder="Describe your target audience (e.g., young professionals interested in fitness)"
                            className="mt-1"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="ageRange" className="text-gray-700 dark:text-gray-300">
                            Age Range
                          </Label>
                          <Input
                            id="ageRange"
                            value={formData.ageRange}
                            onChange={(e) => handleInputChange("ageRange", e.target.value)}
                            placeholder="e.g., 25-45"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location" className="text-gray-700 dark:text-gray-300">
                            Location
                          </Label>
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            placeholder="e.g., United States, New York"
                            className="mt-1"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Globe className="w-5 h-5 mr-2" />
                          Advertising Platforms
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Select platforms where you want to run your campaign *
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {platforms.map((platform) => (
                            <Card
                              key={platform.id}
                              className={`cursor-pointer transition-all hover:shadow-md ${
                                formData.platforms.includes(platform.id)
                                  ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
                              }`}
                              onClick={() => handlePlatformToggle(platform.id)}
                            >
                              <CardContent className="p-3 text-center">
                                <platform.icon className={`w-6 h-6 mx-auto mb-2 ${platform.color}`} />
                                <h4 className="font-medium text-sm text-gray-900 dark:text-white">{platform.name}</h4>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        {formData.platforms.length > 0 && (
                          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-sm text-green-800 dark:text-green-200">
                              Selected platforms: {formData.platforms.length}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Ad Settings */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Ad Format</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Choose the format for your advertisements *
                        </p>
                        <div className="space-y-3">
                          {adFormats.map((format) => (
                            <Card
                              key={format.id}
                              className={`cursor-pointer transition-all hover:shadow-md ${
                                formData.adFormat === format.id
                                  ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
                              }`}
                              onClick={() => handleInputChange("adFormat", format.id)}
                            >
                              <CardContent className="p-3">
                                <h4 className="font-medium text-sm text-gray-900 dark:text-white">{format.name}</h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{format.description}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Bidding Strategy</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Select how you want to bid for ad placements *
                        </p>
                        <div className="space-y-3">
                          {bidStrategies.map((strategy) => (
                            <Card
                              key={strategy.id}
                              className={`cursor-pointer transition-all hover:shadow-md ${
                                formData.bidStrategy === strategy.id
                                  ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
                              }`}
                              onClick={() => handleInputChange("bidStrategy", strategy.id)}
                            >
                              <CardContent className="p-3">
                                <h4 className="font-medium text-sm text-gray-900 dark:text-white">{strategy.name}</h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{strategy.description}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Keywords & Targeting</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <Label htmlFor="keywords" className="text-gray-700 dark:text-gray-300">
                          Keywords (Optional)
                        </Label>
                        <Textarea
                          id="keywords"
                          value={formData.keywords}
                          onChange={(e) => handleInputChange("keywords", e.target.value)}
                          placeholder="Enter keywords separated by commas (e.g., fitness, workout, health)"
                          className="mt-1"
                          rows={3}
                        />
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Add relevant keywords to help target your ads more effectively
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Campaign Summary */}
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
                    <CardHeader>
                      <CardTitle className="text-purple-800 dark:text-purple-200">Campaign Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Campaign Name</p>
                          <p className="font-medium text-gray-900 dark:text-white">{formData.name || "Not set"}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Budget</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            ${formData.budget.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Platforms</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {formData.platforms.length} selected
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Duration</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {formData.startDate && formData.endDate
                              ? `${Math.ceil(
                                  (new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) /
                                    (1000 * 60 * 60 * 24),
                                )} days`
                              : "Not set"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i + 1 <= currentStep ? "bg-purple-500" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>

            <div className="flex space-x-3">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                >
                  Create Campaign
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
