"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Download, FileText, Calendar, Clock } from "lucide-react"

interface ReportData {
  id: string
  name: string
  date: string
  type: "Performance" | "Audience" | "Campaign"
  status: "Ready" | "Processing"
  format: "PDF" | "CSV" | "JSON"
  data?: any
}

interface RecentReport {
  id: string
  name: string
  type: string
  date: string
  status: string
}

interface RecentReportsProps {
  reports: ReportData[]
  onDeleteReport: (id: string) => void
}

export function RecentReports({ reports, onDeleteReport }: RecentReportsProps) {
  const { toast } = useToast()
  const [downloadingReports, setDownloadingReports] = useState<Set<string>>(new Set())

  const generateMockData = (type: string) => {
    const baseData = {
      generatedAt: new Date().toISOString(),
      period: "Last 30 Days",
      summary: {},
      details: {},
    }

    switch (type) {
      case "Performance":
        return {
          ...baseData,
          summary: {
            totalRevenue: "$124,592",
            totalConversions: "2,341",
            conversionRate: "5.2%",
            averageOrderValue: "$53.21",
            returnOnAdSpend: "4.2x",
          },
          details: {
            dailyMetrics: Array.from({ length: 30 }, (_, i) => ({
              date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
              revenue: Math.floor(Math.random() * 5000) + 2000,
              conversions: Math.floor(Math.random() * 100) + 50,
              clicks: Math.floor(Math.random() * 2000) + 1000,
              impressions: Math.floor(Math.random() * 50000) + 25000,
            })),
            topCampaigns: [
              { name: "Summer Sale 2024", revenue: "$45,231", roi: "245%" },
              { name: "Black Friday", revenue: "$32,156", roi: "198%" },
              { name: "Holiday Special", revenue: "$28,904", roi: "156%" },
            ],
          },
        }

      case "Audience":
        return {
          ...baseData,
          summary: {
            totalUsers: "45,231",
            newUsers: "12,456",
            returningUsers: "32,775",
            averageSessionDuration: "3:24",
            bounceRate: "34.2%",
          },
          details: {
            demographics: {
              ageGroups: [
                { range: "18-24", percentage: 22, users: 9946 },
                { range: "25-34", percentage: 35, users: 15831 },
                { range: "35-44", percentage: 28, users: 12665 },
                { range: "45+", percentage: 15, users: 6785 },
              ],
              locations: [
                { country: "United States", users: 17293, percentage: 38.2 },
                { country: "United Kingdom", users: 8946, percentage: 19.8 },
                { country: "Germany", users: 7237, percentage: 16.0 },
                { country: "Canada", users: 4704, percentage: 10.4 },
              ],
            },
            behavior: {
              topPages: [
                { page: "/", views: 15432, avgTime: "2:45" },
                { page: "/products", views: 12876, avgTime: "4:12" },
                { page: "/about", views: 8934, avgTime: "1:58" },
              ],
            },
          },
        }

      case "Campaign":
        return {
          ...baseData,
          summary: {
            activeCampaigns: "12",
            totalSpend: "$45,678",
            totalImpressions: "2,456,789",
            averageCTR: "2.8%",
            costPerClick: "$1.23",
          },
          details: {
            campaigns: [
              {
                name: "Summer Sale 2024",
                status: "Active",
                budget: "$5,000",
                spent: "$3,200",
                impressions: 125000,
                clicks: 3500,
                conversions: 182,
                ctr: "2.8%",
                cpc: "$0.91",
                roi: "145%",
              },
              {
                name: "Black Friday",
                status: "Paused",
                budget: "$10,000",
                spent: "$8,500",
                impressions: 245000,
                clicks: 6125,
                conversions: 408,
                ctr: "2.5%",
                cpc: "$1.39",
                roi: "230%",
              },
            ],
            performance: {
              bestPerforming: "Black Friday",
              worstPerforming: "Spring Launch",
              totalROI: "185%",
              recommendedActions: [
                "Increase budget for Black Friday campaign",
                "Optimize Summer Sale targeting",
                "Pause underperforming campaigns",
              ],
            },
          },
        }

      default:
        return baseData
    }
  }

  const generateFile = (reportData: any, reportName: string, format: "PDF" | "CSV" | "JSON") => {
    switch (format) {
      case "PDF":
        // Create a simple but valid PDF structure
        const createPDFContent = () => {
          const lines = []

          // Header
          lines.push(`${reportName}`)
          lines.push(
            `Generated on ${new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}`,
          )
          lines.push(`Period: ${reportData.period}`)
          lines.push("")

          // Summary
          lines.push("EXECUTIVE SUMMARY")
          lines.push("=".repeat(50))
          Object.entries(reportData.summary).forEach(([key, value]) => {
            const metricName = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
            lines.push(`${metricName}: ${value}`)
          })
          lines.push("")

          // Details based on report type
          if (reportData.details.dailyMetrics) {
            lines.push("DAILY PERFORMANCE (Last 7 Days)")
            lines.push("=".repeat(50))
            lines.push("Date\t\tRevenue\t\tConversions\tClicks\t\tImpressions")
            lines.push("-".repeat(80))
            reportData.details.dailyMetrics.slice(-7).forEach((day: any) => {
              lines.push(
                `${day.date}\t$${day.revenue.toLocaleString()}\t\t${day.conversions}\t\t${day.clicks.toLocaleString()}\t\t${day.impressions.toLocaleString()}`,
              )
            })
            lines.push("")
          }

          if (reportData.details.campaigns) {
            lines.push("CAMPAIGN PERFORMANCE")
            lines.push("=".repeat(50))
            lines.push("Campaign\t\t\tStatus\t\tBudget\t\tSpent\t\tROI")
            lines.push("-".repeat(80))
            reportData.details.campaigns.forEach((campaign: any) => {
              lines.push(
                `${campaign.name}\t\t${campaign.status}\t\t${campaign.budget}\t${campaign.spent}\t${campaign.roi}`,
              )
            })
            lines.push("")
          }

          if (reportData.details.demographics) {
            lines.push("DEMOGRAPHICS BREAKDOWN")
            lines.push("=".repeat(50))
            lines.push("Age Range\t\tUsers\t\tPercentage")
            lines.push("-".repeat(50))
            reportData.details.demographics.ageGroups.forEach((group: any) => {
              lines.push(`${group.range}\t\t\t${group.users.toLocaleString()}\t\t${group.percentage}%`)
            })
            lines.push("")

            lines.push("TOP LOCATIONS")
            lines.push("-".repeat(50))
            lines.push("Country\t\t\tUsers\t\tPercentage")
            lines.push("-".repeat(50))
            reportData.details.demographics.locations.forEach((location: any) => {
              lines.push(`${location.country}\t\t${location.users.toLocaleString()}\t\t${location.percentage}%`)
            })
            lines.push("")
          }

          // Footer
          lines.push("")
          lines.push("=".repeat(80))
          lines.push("ADmyBRAND Analytics Dashboard")
          lines.push("This report contains confidential business information")
          lines.push("Generated automatically")

          return lines.join("\n")
        }

        // Create a simple PDF-like format using plain text
        const pdfContent = createPDFContent()

        // Create a basic PDF structure
        const formattedContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length ${pdfContent.length + 200}
>>
stream
BT
/F1 12 Tf
50 750 Td
(${reportName}) Tj
0 -20 Td
(Generated: ${new Date().toLocaleDateString()}) Tj
0 -20 Td
(Period: ${reportData.period}) Tj
0 -40 Td
(EXECUTIVE SUMMARY) Tj
0 -20 Td
${Object.entries(reportData.summary)
  .map(([key, value]) => {
    const metricName = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
    return `(${metricName}: ${value}) Tj 0 -15 Td`
  })
  .join("\n")}
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000079 00000 n 
0000000173 00000 n 
0000000301 00000 n 
0000000380 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
456
%%EOF`

        return new Blob([formattedContent], { type: "application/pdf" })

      case "CSV":
        let csvContent = ""

        // Header information
        csvContent += `"${reportName}"\n`
        csvContent += `"Generated","${new Date().toLocaleDateString()}"\n`
        csvContent += `"Period","${reportData.period}"\n`
        csvContent += `\n`

        // Summary metrics in proper CSV format
        csvContent += `"SUMMARY METRICS"\n`
        csvContent += `"Metric","Value"\n`
        Object.entries(reportData.summary).forEach(([key, value]) => {
          const metricName = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
          csvContent += `"${metricName}","${value}"\n`
        })
        csvContent += `\n`

        // Add detailed data based on report type
        if (reportData.details.dailyMetrics) {
          csvContent += `"DAILY PERFORMANCE"\n`
          csvContent += `"Date","Revenue","Conversions","Clicks","Impressions"\n`
          reportData.details.dailyMetrics.forEach((day: any) => {
            csvContent += `"${day.date}","${day.revenue}","${day.conversions}","${day.clicks}","${day.impressions}"\n`
          })
          csvContent += `\n`
        }

        if (reportData.details.campaigns) {
          csvContent += `"CAMPAIGN PERFORMANCE"\n`
          csvContent += `"Campaign","Status","Budget","Spent","Impressions","Clicks","Conversions","CTR","CPC","ROI"\n`
          reportData.details.campaigns.forEach((campaign: any) => {
            csvContent += `"${campaign.name}","${campaign.status}","${campaign.budget}","${campaign.spent}","${campaign.impressions}","${campaign.clicks}","${campaign.conversions}","${campaign.ctr}","${campaign.cpc}","${campaign.roi}"\n`
          })
          csvContent += `\n`
        }

        if (reportData.details.demographics) {
          csvContent += `"AGE DEMOGRAPHICS"\n`
          csvContent += `"Age Range","Users","Percentage"\n`
          reportData.details.demographics.ageGroups.forEach((group: any) => {
            csvContent += `"${group.range}","${group.users}","${group.percentage}%"\n`
          })
          csvContent += `\n`

          csvContent += `"TOP LOCATIONS"\n`
          csvContent += `"Country","Users","Percentage"\n`
          reportData.details.demographics.locations.forEach((location: any) => {
            csvContent += `"${location.country}","${location.users}","${location.percentage}%"\n`
          })
        }

        return new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

      case "JSON":
        const structuredData = {
          reportInfo: {
            generatedAt: new Date().toISOString(),
            period: reportData.period,
            version: "1.0",
          },
          summary: reportData.summary,
          details: reportData.details,
          metadata: {
            totalDataPoints: reportData.details.dailyMetrics ? reportData.details.dailyMetrics.length : 0,
            reportType: reportData.details.campaigns
              ? "Campaign"
              : reportData.details.demographics
                ? "Audience"
                : "Performance",
            generatedBy: "ADmyBRAND Analytics Dashboard",
          },
        }

        const jsonContent = JSON.stringify(structuredData, null, 2)
        return new Blob([jsonContent], { type: "application/json;charset=utf-8;" })

      default:
        return new Blob([], { type: "text/plain" })
    }
  }

  const downloadFile = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const handleDownload = async (report: ReportData, format: "PDF" | "CSV" | "JSON") => {
    setDownloadingReports((prev) => new Set([...prev, `${report.id}-${format}`]))

    try {
      // Use existing data or generate new mock data
      const reportData = report.data || generateMockData(report.type)
      const blob = generateFile(reportData, report.name, format)
      const extension = format.toLowerCase()
      downloadFile(blob, `${report.name}.${extension}`)

      toast({
        title: "Download Started",
        description: `${report.name} (${format}) is being downloaded.`,
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Please try again later.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setDownloadingReports((prev) => {
        const newSet = new Set(prev)
        newSet.delete(`${report.id}-${format}`)
        return newSet
      })
    }
  }

  const getStatusBadge = (status: string) => {
    return status === "Ready" ? (
      <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30 text-xs">
        Ready
      </Badge>
    ) : (
      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30 text-xs">
        Processing
      </Badge>
    )
  }

  const getTypeColor = (type: string) => {
    const colors = {
      Performance: "text-blue-600 dark:text-blue-400",
      Audience: "text-green-600 dark:text-green-400",
      Campaign: "text-purple-600 dark:text-purple-400",
    }
    return colors[type as keyof typeof colors] || "text-gray-600 dark:text-gray-400"
  }

  return (
    <Card className="bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-light-lg dark:shadow-none">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Recent Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        {reports.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No reports generated yet</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">Generate your first report above</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-black/10 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-black/20 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">{report.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                      <p className="text-gray-600 dark:text-gray-400 text-xs">{report.date}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(report.status)}
                  {report.status === "Ready" && (
                    <div className="flex items-center space-x-2">
                      {/* Download buttons for different formats */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(report, "PDF")}
                        disabled={downloadingReports.has(`${report.id}-PDF`)}
                        className="bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10"
                      >
                        {downloadingReports.has(`${report.id}-PDF`) ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b border-current"></div>
                        ) : (
                          <>
                            <Download className="w-3 h-3 mr-1" />
                            PDF
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(report, "CSV")}
                        disabled={downloadingReports.has(`${report.id}-CSV`)}
                        className="bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10"
                      >
                        {downloadingReports.has(`${report.id}-CSV`) ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b border-current"></div>
                        ) : (
                          <>
                            <Download className="w-3 h-3 mr-1" />
                            CSV
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(report, "JSON")}
                        disabled={downloadingReports.has(`${report.id}-JSON`)}
                        className="bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10"
                      >
                        {downloadingReports.has(`${report.id}-JSON`) ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b border-current"></div>
                        ) : (
                          <>
                            <Download className="w-3 h-3 mr-1" />
                            JSON
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDeleteReport(report.id)}
                        className="bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
