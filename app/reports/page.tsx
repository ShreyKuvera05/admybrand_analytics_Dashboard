"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, Filter, Share } from "lucide-react"
import { ReportGenerator } from "@/components/reports/report-generator"
import { RecentReports } from "@/components/reports/recent-reports"

interface ReportData {
  id: string
  name: string
  date: string
  type: "Performance" | "Audience" | "Campaign"
  status: "Ready" | "Processing"
  format: "PDF" | "CSV" | "JSON"
  data?: any
}

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportData[]>([
    {
      id: "1",
      name: "Monthly Performance Report",
      date: "Dec 15, 2024",
      type: "Performance",
      status: "Ready",
      format: "PDF",
    },
    {
      id: "2",
      name: "Campaign Analysis",
      date: "Dec 10, 2024",
      type: "Campaign",
      status: "Ready",
      format: "CSV",
    },
    {
      id: "3",
      name: "Audience Insights Report",
      date: "Dec 8, 2024",
      type: "Audience",
      status: "Processing",
      format: "JSON",
    },
  ])

  const handleReportGenerated = (newReport: ReportData) => {
    setReports((prev) => [newReport, ...prev])
  }

  const handleDeleteReport = (reportId: string) => {
    setReports((prev) => prev.filter((report) => report.id !== reportId))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Reports & Analytics
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
              Generate and download comprehensive reports for your marketing campaigns
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button
          variant="outline"
          className="bg-white/70 dark:bg-black/20 border-gray-300 dark:border-white/10 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-white/10"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Date Range
        </Button>
        <Button
          variant="outline"
          className="bg-white/70 dark:bg-black/20 border-gray-300 dark:border-white/10 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-white/10"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter Reports
        </Button>
        <Button
          variant="outline"
          className="bg-white/70 dark:bg-black/20 border-gray-300 dark:border-white/10 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-white/10"
        >
          <Share className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>

      {/* Report Generation Templates */}
      <ReportGenerator onReportGenerated={handleReportGenerated} />

      {/* Recent Reports */}
      <RecentReports reports={reports} onDeleteReport={handleDeleteReport} />
    </motion.div>
  )
}
