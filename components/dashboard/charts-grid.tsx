"use client"

import { motion } from "framer-motion"
import { LineChart } from "@/components/charts/line-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { PieChart } from "@/components/charts/pie-chart"
import { AreaChart } from "@/components/charts/area-chart"
import { BubbleChart } from "@/components/charts/bubble-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ChartsGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="lg:col-span-2 xl:col-span-2"
      >
        <Card className="bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 shadow-light-lg dark:shadow-none">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">
              Revenue Growth Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 md:p-6 pt-0">
            <LineChart />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 shadow-light-lg dark:shadow-none">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">
              Traffic Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 md:p-6 pt-0">
            <PieChart />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 shadow-light-lg dark:shadow-none">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">
              Category Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 md:p-6 pt-0">
            <BarChart />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 shadow-light-lg dark:shadow-none">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">
              Engagement Over Time
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 md:p-6 pt-0">
            <AreaChart />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 shadow-light-lg dark:shadow-none">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">
              Regional Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 md:p-6 pt-0">
            <BubbleChart />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
