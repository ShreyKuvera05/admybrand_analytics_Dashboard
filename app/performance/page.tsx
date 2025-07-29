"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart } from "@/components/charts/line-chart"
import { AreaChart } from "@/components/charts/area-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { TrendingUp, TrendingDown, Target, Zap } from "lucide-react"

export default function PerformancePage() {
  const kpis = [
    { title: "Conversion Rate", value: "3.24%", change: "+0.12%", trend: "up", icon: Target },
    { title: "Click-Through Rate", value: "2.8%", change: "+0.3%", trend: "up", icon: Zap },
    { title: "Cost Per Click", value: "$1.23", change: "-$0.05", trend: "up", icon: TrendingDown },
    { title: "Return on Ad Spend", value: "4.2x", change: "+0.3x", trend: "up", icon: TrendingUp },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
          Performance Metrics
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
          Track and optimize your marketing performance across all channels
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, index) => (
          <Card
            key={index}
            className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
                  <div className="flex items-center mt-1">
                    {kpi.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                    )}
                    <span
                      className={`text-sm ${kpi.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <kpi.icon className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Revenue Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart />
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Conversion Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart />
          </CardContent>
        </Card>
      </div>

      {/* Channel Performance */}
      <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none mb-8">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Channel Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart />
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Top Performing Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Summer Sale 2024</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">ROI: 245%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Black Friday</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">ROI: 198%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Holiday Special</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">ROI: 156%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Optimization Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg border border-yellow-200 dark:border-yellow-500/20">
                <p className="text-yellow-800 dark:text-yellow-400 text-sm font-medium">Mobile Optimization</p>
                <p className="text-yellow-700 dark:text-yellow-300 text-xs">Improve mobile conversion rate by 15%</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg border border-blue-200 dark:border-blue-500/20">
                <p className="text-blue-800 dark:text-blue-400 text-sm font-medium">Ad Spend Allocation</p>
                <p className="text-blue-700 dark:text-blue-300 text-xs">
                  Reallocate budget to high-performing channels
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-lg border border-green-200 dark:border-green-500/20">
                <p className="text-green-800 dark:text-green-400 text-sm font-medium">A/B Test Results</p>
                <p className="text-green-700 dark:text-green-300 text-xs">Variant B shows 23% higher engagement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
