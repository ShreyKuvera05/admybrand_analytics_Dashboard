"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart } from "@/components/charts/line-chart"
import { AreaChart } from "@/components/charts/area-chart"
import { PieChart } from "@/components/charts/pie-chart"
import { Badge } from "@/components/ui/badge"
import { Activity, Users, TrendingUp, Zap } from "lucide-react"
import { RealtimePageSkeleton } from "@/components/skeletons/page-skeleton"

interface LiveEvent {
  id: string
  type: "user" | "conversion" | "pageview" | "general"
  message: string
  timestamp: Date
  location?: string
  value?: string
}

export default function RealtimePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([])
  const [metrics, setMetrics] = useState({
    activeUsers: 1247,
    sessionsToday: 3456,
    conversionRate: 3.24,
    revenueToday: 12450,
  })

  // Generate realistic live events
  const generateLiveEvent = (): LiveEvent => {
    const eventTypes = [
      {
        type: "user" as const,
        messages: [
          "New user signed up from New York",
          "Returning visitor from Los Angeles",
          "User from Chicago started a session",
          "New signup from Miami",
          "User from Seattle viewing products",
          "Visitor from Boston exploring services",
        ],
      },
      {
        type: "conversion" as const,
        messages: [
          "Purchase completed: $299.99",
          "Subscription upgraded: $49/month",
          "Order placed: $156.50",
          "Premium plan purchased: $99.99",
          "Product bought: $75.25",
          "Service booked: $199.00",
        ],
      },
      {
        type: "pageview" as const,
        messages: [
          "Page viewed: Product Catalog",
          "Article read: Marketing Tips",
          "Landing page visited",
          "Blog post opened: SEO Guide",
          "Pricing page viewed",
          "About page visited",
        ],
      },
      {
        type: "general" as const,
        messages: [
          "Cart abandoned: $89.99",
          "Newsletter signup completed",
          "PDF downloaded: Marketing Guide",
          "Video played: Product Demo",
          "Contact form submitted",
          "Free trial started",
        ],
      },
    ]

    const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
    const randomMessage = randomType.messages[Math.floor(Math.random() * randomType.messages.length)]

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: randomType.type,
      message: randomMessage,
      timestamp: new Date(),
    }
  }

  // Initialize with some events
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialEvents = Array.from({ length: 8 }, () => generateLiveEvent())
      setLiveEvents(initialEvents)
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Update events every 3 seconds
  useEffect(() => {
    if (isLoading) return

    const interval = setInterval(() => {
      const newEvent = generateLiveEvent()
      setLiveEvents((prev) => [newEvent, ...prev.slice(0, 9)]) // Keep only 10 events

      // Update metrics slightly
      setMetrics((prev) => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        sessionsToday: prev.sessionsToday + Math.floor(Math.random() * 5),
        conversionRate: +(prev.conversionRate + (Math.random() - 0.5) * 0.1).toFixed(2),
        revenueToday: prev.revenueToday + Math.floor(Math.random() * 100),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [isLoading])

  const getEventIcon = (type: string) => {
    switch (type) {
      case "user":
        return "👤"
      case "conversion":
        return "💰"
      case "pageview":
        return "👁️"
      case "general":
        return "⚡"
      default:
        return "📊"
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "user":
        return "text-blue-600 dark:text-blue-400"
      case "conversion":
        return "text-green-600 dark:text-green-400"
      case "pageview":
        return "text-purple-600 dark:text-purple-400"
      case "general":
        return "text-orange-600 dark:text-orange-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  if (isLoading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <RealtimePageSkeleton />
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Real-time Analytics
          </h1>
          <Badge className="bg-red-500 text-white animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
            LIVE
          </Badge>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
          Monitor your website activity and user behavior in real-time
        </p>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Active Users</p>
                <motion.p
                  key={metrics.activeUsers}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                >
                  {metrics.activeUsers.toLocaleString()}
                </motion.p>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-green-600 dark:text-green-400 text-sm">Live</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Sessions Today</p>
                <motion.p
                  key={metrics.sessionsToday}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                >
                  {metrics.sessionsToday.toLocaleString()}
                </motion.p>
                <p className="text-green-600 dark:text-green-400 text-sm">+12.5%</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Conversion Rate</p>
                <motion.p
                  key={metrics.conversionRate}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                >
                  {metrics.conversionRate}%
                </motion.p>
                <p className="text-blue-600 dark:text-blue-400 text-sm">+0.3%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Revenue Today</p>
                <motion.p
                  key={metrics.revenueToday}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                >
                  ${metrics.revenueToday.toLocaleString()}
                </motion.p>
                <p className="text-orange-600 dark:text-orange-400 text-sm">+8.7%</p>
              </div>
              <Zap className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Live Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart />
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 dark:text-white">Live Events Feed</CardTitle>
              <Badge variant="outline" className="text-xs">
                Events update automatically every 3 seconds
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {liveEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors"
                >
                  <div className="flex-shrink-0 mt-1">
                    {index === 0 ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                    ) : (
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getEventIcon(event.type)}</span>
                      <p className={`text-sm font-medium ${getEventColor(event.type)} truncate`}>{event.message}</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {index === 0 ? "Just now" : `${Math.floor((Date.now() - event.timestamp.getTime()) / 1000)}s ago`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Real-time Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Real-time Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart />
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart />
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
