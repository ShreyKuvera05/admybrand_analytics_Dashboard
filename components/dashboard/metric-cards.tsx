"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Users, DollarSign, Target, Activity } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Metric {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ElementType
  color: string
}

export function MetricCards() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      title: "Total Revenue",
      value: "$124,592",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: "Active Users",
      value: "23,456",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "from-blue-400 to-cyan-500",
    },
    {
      title: "Conversions",
      value: "1,234",
      change: "-2.1%",
      trend: "down",
      icon: Target,
      color: "from-purple-400 to-pink-500",
    },
    {
      title: "Growth Rate",
      value: "15.8%",
      change: "+5.4%",
      trend: "up",
      icon: Activity,
      color: "from-orange-400 to-red-500",
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value:
            metric.title === "Total Revenue"
              ? `$${(Math.random() * 50000 + 100000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
              : metric.title === "Active Users"
                ? `${(Math.random() * 10000 + 20000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                : metric.title === "Conversions"
                  ? `${(Math.random() * 500 + 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                  : `${(Math.random() * 10 + 10).toFixed(1)}%`,
          change: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 10).toFixed(1)}%`,
          trend: Math.random() > 0.5 ? "up" : "down",
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="relative overflow-hidden bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 shadow-light-lg dark:shadow-none">
            <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-5 dark:opacity-10`} />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-600 dark:text-slate-400 mb-1 truncate">{metric.title}</p>
                  <motion.p
                    key={metric.value}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold text-gray-900 dark:text-white truncate"
                  >
                    {metric.value}
                  </motion.p>
                  <div className="flex items-center mt-2">
                    {metric.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-500 mr-1 flex-shrink-0" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-500 mr-1 flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm font-medium truncate ${
                        metric.trend === "up" ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
                      }`}
                    >
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg bg-gradient-to-r ${metric.color} bg-opacity-20 dark:bg-opacity-30 flex-shrink-0 ml-2`}
                >
                  <metric.icon className="w-6 h-6 text-gray-700 dark:text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
