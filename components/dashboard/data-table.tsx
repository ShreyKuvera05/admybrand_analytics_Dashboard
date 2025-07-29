"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Search, ChevronUp, ChevronDown, ArrowUpDown } from "lucide-react"

interface RowData {
  id: number
  campaign: string
  impressions: number
  clicks: number
  ctr: number
  conversions: number
  cost: number
  revenue: number
  roi: number
  status: string
}

type SortField = keyof RowData
type SortDirection = "asc" | "desc" | null

export function DataTable() {
  const [rowData, setRowData] = useState<RowData[]>([])
  const [searchText, setSearchText] = useState("")
  const [sortField, setSortField] = useState<SortField>("id")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Generate mock data
  useEffect(() => {
    const campaigns = [
      "Summer Sale 2024",
      "Black Friday",
      "Holiday Special",
      "Spring Launch",
      "Product Demo",
      "Brand Awareness",
      "Retargeting",
      "Lead Generation",
      "Mobile App Install",
      "Video Campaign",
      "Social Media",
      "Email Marketing",
    ]

    const statuses = ["Active", "Paused", "Completed", "Draft"]

    const data = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      campaign: campaigns[Math.floor(Math.random() * campaigns.length)],
      impressions: Math.floor(Math.random() * 100000) + 10000,
      clicks: Math.floor(Math.random() * 5000) + 100,
      ctr: +(Math.random() * 5 + 1).toFixed(2),
      conversions: Math.floor(Math.random() * 200) + 10,
      cost: +(Math.random() * 5000 + 500).toFixed(2),
      revenue: +(Math.random() * 15000 + 1000).toFixed(2),
      roi: +(Math.random() * 300 + 50).toFixed(1),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }))

    setRowData(data)
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRowData((prev) =>
        prev.map((row) => ({
          ...row,
          impressions: row.impressions + Math.floor(Math.random() * 100),
          clicks: row.clicks + Math.floor(Math.random() * 10),
          ctr: +(row.ctr + (Math.random() - 0.5) * 0.1).toFixed(2),
          conversions: row.conversions + Math.floor(Math.random() * 3),
          revenue: +(row.revenue + Math.random() * 100).toFixed(2),
          roi: +(row.roi + (Math.random() - 0.5) * 5).toFixed(1),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    const filtered = rowData.filter(
      (row) =>
        row.campaign.toLowerCase().includes(searchText.toLowerCase()) ||
        row.status.toLowerCase().includes(searchText.toLowerCase()),
    )

    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        const aVal = a[sortField]
        const bVal = b[sortField]

        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
        }

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDirection === "asc" ? aVal - bVal : bVal - aVal
        }

        return 0
      })
    }

    return filtered
  }, [rowData, searchText, sortField, sortDirection])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
  const paginatedData = filteredAndSortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />
    if (sortDirection === "asc") return <ChevronUp className="w-4 h-4" />
    if (sortDirection === "desc") return <ChevronDown className="w-4 h-4" />
    return <ArrowUpDown className="w-4 h-4" />
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      Active:
        "bg-green-100 text-green-800 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30",
      Paused:
        "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30",
      Completed:
        "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30",
      Draft: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30",
    }
    return (
      <Badge variant="outline" className={`${variants[status as keyof typeof variants]} text-xs`}>
        {status}
      </Badge>
    )
  }

  const exportToCsv = () => {
    const headers = [
      "Campaign",
      "Impressions",
      "Clicks",
      "CTR (%)",
      "Conversions",
      "Cost",
      "Revenue",
      "ROI (%)",
      "Status",
    ]
    const rows = filteredAndSortedData.map((row) => [
      row.campaign,
      row.impressions,
      row.clicks,
      row.ctr,
      row.conversions,
      row.cost,
      row.revenue,
      row.roi,
      row.status,
    ])

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "campaign-data.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-light-lg dark:shadow-none">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl">
              Campaign Performance Data
            </CardTitle>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-slate-400" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-10 w-full sm:w-64 bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={exportToCsv}
                className="bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 w-full sm:w-auto"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/10 backdrop-blur-sm overflow-hidden shadow-light-sm dark:shadow-none">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5">
                    {/* Make table headers responsive */}
                    <TableHead
                      className="text-gray-700 dark:text-slate-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors text-xs sm:text-sm min-w-[120px]"
                      onClick={() => handleSort("campaign")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Campaign</span>
                        {getSortIcon("campaign")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="text-gray-700 dark:text-slate-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors text-xs sm:text-sm min-w-[120px]"
                      onClick={() => handleSort("impressions")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Impressions</span>
                        {getSortIcon("impressions")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="text-gray-700 dark:text-slate-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors text-xs sm:text-sm min-w-[120px]"
                      onClick={() => handleSort("clicks")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Clicks</span>
                        {getSortIcon("clicks")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="text-gray-700 dark:text-slate-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors text-xs sm:text-sm min-w-[120px]"
                      onClick={() => handleSort("ctr")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>CTR (%)</span>
                        {getSortIcon("ctr")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="text-gray-700 dark:text-slate-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors text-xs sm:text-sm min-w-[120px]"
                      onClick={() => handleSort("conversions")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Conversions</span>
                        {getSortIcon("conversions")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="text-gray-700 dark:text-slate-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors text-xs sm:text-sm min-w-[120px]"
                      onClick={() => handleSort("cost")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Cost</span>
                        {getSortIcon("cost")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="text-gray-700 dark:text-slate-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors text-xs sm:text-sm min-w-[120px]"
                      onClick={() => handleSort("revenue")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Revenue</span>
                        {getSortIcon("revenue")}
                      </div>
                    </TableHead>
                    <TableHead
                      className="text-gray-700 dark:text-slate-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors text-xs sm:text-sm min-w-[120px]"
                      onClick={() => handleSort("roi")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>ROI (%)</span>
                        {getSortIcon("roi")}
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-700 dark:text-slate-300 text-xs sm:text-sm min-w-[80px]">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((row) => (
                    <TableRow
                      key={row.id}
                      className="border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <TableCell className="text-gray-900 dark:text-white font-medium text-xs sm:text-sm">
                        <div className="truncate max-w-[150px] sm:max-w-none">{row.campaign}</div>
                      </TableCell>
                      <TableCell className="text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm">
                        {row.impressions.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-green-600 dark:text-green-400 text-xs sm:text-sm">
                        {row.clicks.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-purple-600 dark:text-purple-400 text-xs sm:text-sm">
                        {row.ctr}%
                      </TableCell>
                      <TableCell className="text-orange-600 dark:text-orange-400 text-xs sm:text-sm">
                        {row.conversions}
                      </TableCell>
                      <TableCell className="text-red-600 dark:text-red-400 text-xs sm:text-sm">
                        ${row.cost.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-green-600 dark:text-green-400 text-xs sm:text-sm">
                        ${row.revenue.toFixed(2)}
                      </TableCell>
                      <TableCell
                        className={`text-xs sm:text-sm ${
                          row.roi > 100
                            ? "text-green-600 dark:text-green-400"
                            : row.roi > 50
                              ? "text-orange-600 dark:text-orange-400"
                              : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {row.roi}%
                      </TableCell>
                      <TableCell>{getStatusBadge(row.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Responsive pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
            <div className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 text-center sm:text-left">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length}{" "}
              results
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 disabled:opacity-50 text-xs sm:text-sm px-2 sm:px-3"
              >
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  const page = i + 1
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs sm:text-sm px-2 sm:px-3"
                          : "bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 text-xs sm:text-sm px-2 sm:px-3"
                      }
                    >
                      {page}
                    </Button>
                  )
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 disabled:opacity-50 text-xs sm:text-sm px-2 sm:px-3"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
