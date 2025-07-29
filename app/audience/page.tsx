"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart } from "@/components/charts/pie-chart"
import { BubbleChart } from "@/components/charts/bubble-chart"
import { Users, MapPin, Clock, Smartphone } from "lucide-react"

export default function AudiencePage() {
  const demographics = [
    { label: "18-24", value: "22%", color: "text-blue-600 dark:text-blue-400" },
    { label: "25-34", value: "35%", color: "text-green-600 dark:text-green-400" },
    { label: "35-44", value: "28%", color: "text-purple-600 dark:text-purple-400" },
    { label: "45+", value: "15%", color: "text-orange-600 dark:text-orange-400" },
  ]

  const locations = [
    { city: "New York", users: "12,450", percentage: "28%" },
    { city: "Los Angeles", users: "8,320", percentage: "19%" },
    { city: "Chicago", users: "6,180", percentage: "14%" },
    { city: "Houston", users: "4,890", percentage: "11%" },
    { city: "Phoenix", users: "3,760", percentage: "9%" },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">
          Audience Insights
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
          Understand your audience demographics, behavior, and preferences
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">45,231</p>
                <p className="text-green-600 dark:text-green-400 text-sm">+12.5%</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Avg. Session</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3:24</p>
                <p className="text-green-600 dark:text-green-400 text-sm">+8.2%</p>
              </div>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Mobile Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">68%</p>
                <p className="text-blue-600 dark:text-blue-400 text-sm">+5.1%</p>
              </div>
              <Smartphone className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Top Location</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">NYC</p>
                <p className="text-orange-600 dark:text-orange-400 text-sm">28%</p>
              </div>
              <MapPin className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Age Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart />
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Geographic Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <BubbleChart />
          </CardContent>
        </Card>
      </div>

      {/* Demographics and Locations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Age Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {demographics.map((demo, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">{demo.label}</span>
                  <span className={`font-semibold ${demo.color}`}>{demo.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Top Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locations.map((location, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-900 dark:text-white font-medium">{location.city}</span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{location.users} users</p>
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">{location.percentage}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
