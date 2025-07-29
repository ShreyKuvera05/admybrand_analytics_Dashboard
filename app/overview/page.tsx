"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { ChartsGrid } from "@/components/dashboard/charts-grid"
import { DataTable } from "@/components/dashboard/data-table"
import { OverviewPageSkeleton } from "@/components/skeletons/page-skeleton"

export default function OverviewPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <OverviewPageSkeleton />
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Overview Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
          Complete overview of your marketing performance and key metrics
        </p>
      </div>

      <div className="space-y-6">
        <MetricCards />
        <ChartsGrid />
        <DataTable />
      </div>
    </motion.div>
  )
}
