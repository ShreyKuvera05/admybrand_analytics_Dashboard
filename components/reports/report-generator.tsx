"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { BarChart3, Users, Target } from "lucide-react"

interface RecentReport {
  id: string
  name: string
  type: string
  date: string
  status: string
}

interface ReportGeneratorProps {
  onReportGenerated: (report: RecentReport) => void
}

export function ReportGenerator({ onReportGenerated }: ReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState<string | null>(null)
  const { toast } = useToast()

  const generateMockData = (type: string) => {
    const baseData = {
      performance: {
        summary: {
          totalViews: "2,847,392",
          uniqueVisitors: "1,234,567",
          bounceRate: "34.2%",
          avgSessionDuration: "4m 32s",
          conversionRate: "3.8%",
          revenue: "$89,432",
        },
        daily: [
          { date: "2024-01-01", views: 45234, visitors: 23456, conversions: 892 },
          { date: "2024-01-02", views: 52341, visitors: 28934, conversions: 1023 },
          { date: "2024-01-03", views: 48567, visitors: 25678, conversions: 945 },
          { date: "2024-01-04", views: 56789, visitors: 31245, conversions: 1156 },
          { date: "2024-01-05", views: 51234, visitors: 27890, conversions: 1034 },
        ],
      },
      audience: {
        demographics: {
          "18-24": "23%",
          "25-34": "35%",
          "35-44": "28%",
          "45-54": "10%",
          "55+": "4%",
        },
        locations: {
          "United States": "45%",
          "United Kingdom": "18%",
          Canada: "12%",
          Australia: "8%",
          Germany: "7%",
          Others: "10%",
        },
        interests: {
          Technology: "32%",
          Business: "28%",
          Marketing: "24%",
          Design: "16%",
        },
      },
      campaign: {
        campaigns: [
          { name: "Summer Sale 2024", impressions: 1234567, clicks: 45678, ctr: "3.7%", cost: "$12,345" },
          { name: "Brand Awareness Q1", impressions: 987654, clicks: 32145, ctr: "3.3%", cost: "$8,976" },
          { name: "Product Launch", impressions: 2345678, clicks: 67890, ctr: "2.9%", cost: "$18,432" },
          { name: "Holiday Special", impressions: 1567890, clicks: 54321, ctr: "3.5%", cost: "$15,678" },
        ],
        performance: {
          totalImpressions: "6,135,789",
          totalClicks: "200,034",
          avgCTR: "3.26%",
          totalSpend: "$55,431",
          costPerClick: "$0.28",
        },
      },
    }
    return baseData[type as keyof typeof baseData]
  }

  const generatePDF = (type: string, data: any) => {
    const reportName = `${type.charAt(0).toUpperCase() + type.slice(1)} Report`
    const currentDate = new Date().toLocaleDateString()

    // Create proper PDF content with valid PDF structure
    const pdfContent = `%PDF-1.4
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
/Length 2000
>>
stream
BT
/F1 16 Tf
50 750 Td
(${reportName}) Tj
0 -30 Td
/F1 12 Tf
(Generated: ${currentDate}) Tj
0 -40 Td
(Report Period: Last 30 Days) Tj
0 -40 Td
(Company: ADmyBRAND Analytics) Tj
0 -60 Td
/F1 14 Tf
(EXECUTIVE SUMMARY) Tj
0 -30 Td
/F1 10 Tf
${
  type === "performance"
    ? `
(Total Page Views: ${data.summary.totalViews}) Tj
0 -20 Td
(Unique Visitors: ${data.summary.uniqueVisitors}) Tj
0 -20 Td
(Bounce Rate: ${data.summary.bounceRate}) Tj
0 -20 Td
(Avg Session Duration: ${data.summary.avgSessionDuration}) Tj
0 -20 Td
(Conversion Rate: ${data.summary.conversionRate}) Tj
0 -20 Td
(Total Revenue: ${data.summary.revenue}) Tj
`
    : type === "audience"
      ? `
(Age Demographics:) Tj
0 -20 Td
(18-24 years: ${data.demographics["18-24"]}) Tj
0 -20 Td
(25-34 years: ${data.demographics["25-34"]}) Tj
0 -20 Td
(35-44 years: ${data.demographics["35-44"]}) Tj
0 -20 Td
(Top Locations:) Tj
0 -20 Td
(United States: ${data.locations["United States"]}) Tj
0 -20 Td
(United Kingdom: ${data.locations["United Kingdom"]}) Tj
`
      : `
(Campaign Performance Summary:) Tj
0 -20 Td
(Total Impressions: ${data.performance.totalImpressions}) Tj
0 -20 Td
(Total Clicks: ${data.performance.totalClicks}) Tj
0 -20 Td
(Average CTR: ${data.performance.avgCTR}) Tj
0 -20 Td
(Total Spend: ${data.performance.totalSpend}) Tj
0 -20 Td
(Cost Per Click: ${data.performance.costPerClick}) Tj
`
}
0 -40 Td
/F1 14 Tf
(DETAILED ANALYSIS) Tj
0 -30 Td
/F1 10 Tf
${
  type === "performance"
    ? data.daily
        .map(
          (day: any, index: number) =>
            `(${day.date}: ${day.views} views, ${day.visitors} visitors, ${day.conversions} conversions) Tj\n0 -20 Td\n`,
        )
        .join("")
    : type === "audience"
      ? Object.entries(data.interests)
          .map(([interest, percentage]) => `(${interest}: ${percentage}) Tj\n0 -20 Td\n`)
          .join("")
      : data.campaigns
          .map(
            (campaign: any) =>
              `(${campaign.name}: ${campaign.impressions} impressions, ${campaign.clicks} clicks) Tj\n0 -20 Td\n`,
          )
          .join("")
}
0 -40 Td
(Report generated by ADmyBRAND Analytics Dashboard) Tj
0 -20 Td
(Confidential - For internal use only) Tj
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
0000000053 00000 n 
0000000110 00000 n 
0000000251 00000 n 
0000002304 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
2372
%%EOF`

    const blob = new Blob([pdfContent], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${reportName.replace(/\s+/g, "%20")}%20-%20${currentDate.replace(/\//g, "%2F")}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generateCSV = (type: string, data: any) => {
    let csvContent = ""
    const reportName = `${type.charAt(0).toUpperCase() + type.slice(1)} Report`
    const currentDate = new Date().toLocaleDateString()

    csvContent += `"Report Name","${reportName}"\n`
    csvContent += `"Generated Date","${currentDate}"\n`
    csvContent += `"Report Period","Last 30 Days"\n`
    csvContent += `"Company","ADmyBRAND Analytics"\n\n`

    if (type === "performance") {
      csvContent += `"Metric","Value"\n`
      csvContent += `"Total Page Views","${data.summary.totalViews}"\n`
      csvContent += `"Unique Visitors","${data.summary.uniqueVisitors}"\n`
      csvContent += `"Bounce Rate","${data.summary.bounceRate}"\n`
      csvContent += `"Avg Session Duration","${data.summary.avgSessionDuration}"\n`
      csvContent += `"Conversion Rate","${data.summary.conversionRate}"\n`
      csvContent += `"Total Revenue","${data.summary.revenue}"\n\n`

      csvContent += `"Date","Views","Visitors","Conversions"\n`
      data.daily.forEach((day: any) => {
        csvContent += `"${day.date}","${day.views}","${day.visitors}","${day.conversions}"\n`
      })
    } else if (type === "audience") {
      csvContent += `"Age Group","Percentage"\n`
      Object.entries(data.demographics).forEach(([age, percentage]) => {
        csvContent += `"${age}","${percentage}"\n`
      })
      csvContent += `\n"Location","Percentage"\n`
      Object.entries(data.locations).forEach(([location, percentage]) => {
        csvContent += `"${location}","${percentage}"\n`
      })
    } else {
      csvContent += `"Campaign Name","Impressions","Clicks","CTR","Cost"\n`
      data.campaigns.forEach((campaign: any) => {
        csvContent += `"${campaign.name}","${campaign.impressions}","${campaign.clicks}","${campaign.ctr}","${campaign.cost}"\n`
      })
    }

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${reportName.replace(/\s+/g, "_")}_${currentDate.replace(/\//g, "_")}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generateJSON = (type: string, data: any) => {
    const reportName = `${type.charAt(0).toUpperCase() + type.slice(1)} Report`
    const currentDate = new Date().toLocaleDateString()

    const jsonData = {
      reportInfo: {
        name: reportName,
        type: type,
        generatedDate: currentDate,
        period: "Last 30 Days",
        company: "ADmyBRAND Analytics",
      },
      data: data,
    }

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${reportName.replace(/\s+/g, "_")}_${currentDate.replace(/\//g, "_")}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleGenerate = async (type: string, format: string) => {
    setIsGenerating(`${type}-${format}`)

    try {
      // Simulate generation time
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const data = generateMockData(type)
      const reportName = `${type.charAt(0).toUpperCase() + type.slice(1)} Report`
      const currentDate = new Date().toLocaleDateString()

      // Generate and download file
      if (format === "PDF") {
        generatePDF(type, data)
      } else if (format === "CSV") {
        generateCSV(type, data)
      } else {
        generateJSON(type, data)
      }

      // Add to recent reports
      const newReport: RecentReport = {
        id: Date.now().toString(),
        name: `${reportName} (${format})`,
        type: format,
        date: currentDate,
        status: "Ready",
      }

      onReportGenerated(newReport)

      toast({
        title: "Report Generated Successfully",
        description: `Your ${reportName} in ${format} format has been downloaded.`,
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(null)
    }
  }

  const reportTypes = [
    {
      type: "performance",
      title: "Performance Report",
      description: "Comprehensive analytics on website performance, traffic, and conversions",
      icon: BarChart3,
      color: "from-blue-500 to-cyan-500",
    },
    {
      type: "audience",
      title: "Audience Report",
      description: "Detailed insights into your audience demographics and behavior",
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },
    {
      type: "campaign",
      title: "Campaign Report",
      description: "Analysis of marketing campaigns performance and ROI metrics",
      icon: Target,
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {reportTypes.map((report) => (
        <Card
          key={report.type}
          className="bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-light-lg dark:shadow-none"
        >
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white flex items-center">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${report.color} mr-3`}>
                <report.icon className="w-5 h-5 text-white" />
              </div>
              {report.title}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{report.description}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {["PDF", "CSV", "JSON"].map((format) => (
              <Button
                key={format}
                onClick={() => handleGenerate(report.type, format)}
                disabled={isGenerating === `${report.type}-${format}`}
                className="w-full bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10"
                variant="outline"
              >
                {isGenerating === `${report.type}-${format}` ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 dark:border-white mr-2"></div>
                    Generating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    {format === "PDF" ? <Users className="w-4 h-4 mr-2" /> : <Target className="w-4 h-4 mr-2" />}
                    Generate {format}
                  </div>
                )}
              </Button>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
