"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "@/components/charts/line-chart";
import { AreaChart } from "@/components/charts/area-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, Download, CalendarDays, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { AnalyticsPageSkeleton } from "@/components/skeletons/page-skeleton";

interface DateRange {
  from: Date;
  to: Date;
  label: string;
}

interface AnalyticsData {
  summary: {
    totalRevenue: number;
    totalConversions: number;
    conversionRate: number;
    averageOrderValue: number;
    returnOnAdSpend: number;
  };
  dailyMetrics: Array<{
    date: string;
    revenue: number;
    conversions: number;
    clicks: number;
    impressions: number;
    ctr: number;
    cpc: number;
  }>;
  topCampaigns: Array<{
    name: string;
    revenue: string;
    roi: string;
    impressions: number;
    clicks: number;
  }>;
  topContent: Array<{
    title: string;
    change: string;
    type: string;
  }>;
  audienceInsights: Array<{
    metric: string;
    value: string;
    change: string;
  }>;
  conversionFunnel: Array<{
    stage: string;
    value: string;
    count: number;
  }>;
}

export default function AnalyticsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
    label: "Last 30 Days",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );

  // Predefined date ranges
  const dateRanges: DateRange[] = [
    {
      from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      to: new Date(),
      label: "Last 7 Days",
    },
    {
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      to: new Date(),
      label: "Last 30 Days",
    },
    {
      from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      to: new Date(),
      label: "Last 3 Months",
    },
    {
      from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      to: new Date(),
      label: "This Month",
    },
    {
      from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      to: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
      label: "Last Month",
    },
    {
      from: new Date(new Date().getFullYear(), 0, 1),
      to: new Date(),
      label: "This Year",
    },
  ];

  // Available filters
  const availableFilters = [
    "High Converting",
    "Mobile Traffic",
    "Organic Only",
    "Paid Campaigns",
    "New Users",
    "Returning Users",
  ];

  // Generate mock data based on date range
  const generateAnalyticsData = (dateRange: DateRange): AnalyticsData => {
    const daysDiff = Math.ceil(
      (dateRange.to.getTime() - dateRange.from.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    // Generate daily metrics for the selected period
    const dailyMetrics = Array.from({ length: daysDiff }, (_, i) => {
      const date = new Date(dateRange.from.getTime() + i * 24 * 60 * 60 * 1000);
      const baseRevenue = Math.floor(Math.random() * 3000) + 2000;
      const baseConversions = Math.floor(Math.random() * 80) + 40;
      const baseClicks = Math.floor(Math.random() * 1500) + 800;
      const baseImpressions = Math.floor(Math.random() * 30000) + 20000;

      return {
        date: date.toISOString().split("T")[0],
        revenue: baseRevenue,
        conversions: baseConversions,
        clicks: baseClicks,
        impressions: baseImpressions,
        ctr: +((baseClicks / baseImpressions) * 100).toFixed(2),
        cpc: +(baseRevenue / baseClicks).toFixed(2),
      };
    });

    // Calculate summary metrics
    const totalRevenue = dailyMetrics.reduce(
      (sum, day) => sum + day.revenue,
      0
    );
    const totalConversions = dailyMetrics.reduce(
      (sum, day) => sum + day.conversions,
      0
    );
    const totalClicks = dailyMetrics.reduce((sum, day) => sum + day.clicks, 0);
    const totalImpressions = dailyMetrics.reduce(
      (sum, day) => sum + day.impressions,
      0
    );

    return {
      summary: {
        totalRevenue,
        totalConversions,
        conversionRate: +((totalConversions / totalClicks) * 100).toFixed(2),
        averageOrderValue: +(totalRevenue / totalConversions).toFixed(2),
        returnOnAdSpend: +((totalRevenue / (totalRevenue * 0.3)) * 100).toFixed(
          1
        ),
      },
      dailyMetrics,
      topCampaigns: [
        {
          name: "Summer Sale 2024",
          revenue: `$${Math.floor(totalRevenue * 0.35).toLocaleString()}`,
          roi: "245%",
          impressions: Math.floor(totalImpressions * 0.3),
          clicks: Math.floor(totalClicks * 0.35),
        },
        {
          name: "Black Friday",
          revenue: `$${Math.floor(totalRevenue * 0.28).toLocaleString()}`,
          roi: "198%",
          impressions: Math.floor(totalImpressions * 0.25),
          clicks: Math.floor(totalClicks * 0.28),
        },
        {
          name: "Holiday Special",
          revenue: `$${Math.floor(totalRevenue * 0.22).toLocaleString()}`,
          roi: "156%",
          impressions: Math.floor(totalImpressions * 0.2),
          clicks: Math.floor(totalClicks * 0.22),
        },
      ],
      topContent: [
        { title: "Summer Campaign", change: "+24%", type: "Campaign" },
        { title: "Product Launch", change: "+18%", type: "Content" },
        { title: "Brand Awareness", change: "+12%", type: "Campaign" },
      ],
      audienceInsights: [
        { metric: "Mobile Users", value: "68%", change: "+5.1%" },
        { metric: "Desktop Users", value: "32%", change: "-2.3%" },
        { metric: "Avg. Session", value: "3:24", change: "+8.2%" },
      ],
      conversionFunnel: [
        { stage: "Visitors", value: "10,000", count: 10000 },
        { stage: "Leads", value: "2,500", count: 2500 },
        { stage: "Customers", value: "750", count: 750 },
      ],
    };
  };

  // Load data when date range changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const data = generateAnalyticsData(selectedDateRange);
      setAnalyticsData(data);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [selectedDateRange]);

  // Filter data based on active filters
  const filteredData = useMemo(() => {
    if (!analyticsData || activeFilters.length === 0) return analyticsData;

    // Apply filters to the data (simplified logic for demo)
    const filtered = { ...analyticsData };

    if (activeFilters.includes("High Converting")) {
      filtered.dailyMetrics = filtered.dailyMetrics.filter(
        day => day.conversions > 60
      );
    }

    if (activeFilters.includes("Mobile Traffic")) {
      // Simulate mobile traffic filter by reducing desktop metrics
      filtered.summary.totalRevenue = Math.floor(
        filtered.summary.totalRevenue * 0.68
      );
      filtered.summary.totalConversions = Math.floor(
        filtered.summary.totalConversions * 0.68
      );
    }

    return filtered;
  }, [analyticsData, activeFilters]);

  const handleDateRangeSelect = (range: DateRange) => {
    setSelectedDateRange(range);
    setShowDatePicker(false);
    toast({
      title: "Date Range Updated",
      description: `Analytics updated for ${range.label}`,
      duration: 2000,
    });
  };

  const handleFilterToggle = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    toast({
      title: "Filters Cleared",
      description: "All filters have been removed",
      duration: 2000,
    });
  };

  const exportData = async (format: "CSV" | "PDF" | "JSON") => {
    if (!filteredData) return;

    setIsExporting(true);

    try {
      // Simulate export processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      let blob: Blob;
      let filename: string;
      const timestamp = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      switch (format) {
        case "CSV":
          const csvContent = generateCSV(filteredData, selectedDateRange);
          blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
          filename = `Analytics_Report_${timestamp}.csv`;
          break;

        case "PDF":
          const htmlContent = generatePDF(filteredData, selectedDateRange);
          blob = new Blob([htmlContent], { type: "text/html" });
          filename = `Analytics_Report_${timestamp}.pdf`;
          break;

        case "JSON":
          const jsonContent = JSON.stringify(
            {
              reportInfo: {
                generatedAt: new Date().toISOString(),
                dateRange: selectedDateRange,
                filters: activeFilters,
                version: "1.0",
              },
              data: filteredData,
            },
            null,
            2
          );
          blob = new Blob([jsonContent], {
            type: "application/json;charset=utf-8;",
          });
          filename = `Analytics_Report_${timestamp}.json`;
          break;

        default:
          throw new Error("Unsupported format");
      }

      // Download the file
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: `Analytics report exported as ${format}`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsExporting(false);
    }
  };

  const generateCSV = (data: AnalyticsData, dateRange: DateRange): string => {
    let csv = `"Analytics Report"\n`;
    csv += `"Generated","${new Date().toLocaleDateString()}"\n`;
    csv += `"Date Range","${dateRange.label}"\n`;
    csv += `"From","${dateRange.from.toLocaleDateString()}"\n`;
    csv += `"To","${dateRange.to.toLocaleDateString()}"\n`;
    if (activeFilters.length > 0) {
      csv += `"Active Filters","${activeFilters.join(", ")}"\n`;
    }
    csv += `\n`;

    // Summary metrics
    csv += `"SUMMARY METRICS"\n`;
    csv += `"Metric","Value"\n`;
    csv += `"Total Revenue","$${data.summary.totalRevenue.toLocaleString()}"\n`;
    csv += `"Total Conversions","${data.summary.totalConversions.toLocaleString()}"\n`;
    csv += `"Conversion Rate","${data.summary.conversionRate}%"\n`;
    csv += `"Average Order Value","$${data.summary.averageOrderValue}"\n`;
    csv += `"Return on Ad Spend","${data.summary.returnOnAdSpend}x"\n`;
    csv += `\n`;

    // Daily metrics
    csv += `"DAILY PERFORMANCE"\n`;
    csv += `"Date","Revenue","Conversions","Clicks","Impressions","CTR","CPC"\n`;
    data.dailyMetrics.forEach(day => {
      csv += `"${day.date}","${day.revenue}","${day.conversions}","${day.clicks}","${day.impressions}","${day.ctr}%","$${day.cpc}"\n`;
    });
    csv += `\n`;

    // Top campaigns
    csv += `"TOP CAMPAIGNS"\n`;
    csv += `"Campaign","Revenue","ROI","Impressions","Clicks"\n`;
    data.topCampaigns.forEach(campaign => {
      csv += `"${campaign.name}","${campaign.revenue}","${campaign.roi}","${campaign.impressions}","${campaign.clicks}"\n`;
    });

    return csv;
  };

  const generatePDF = (data: AnalyticsData, dateRange: DateRange): string => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Analytics Report</title>
        <meta charset="UTF-8">
        <style>
          @page { margin: 1in; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            margin: 0; 
            padding: 20px; 
            color: #333; 
            line-height: 1.6;
          }
          .header { 
            text-align: center; 
            margin-bottom: 40px; 
            border-bottom: 3px solid #0891b2; 
            padding-bottom: 20px; 
          }
          .header h1 { 
            color: #0891b2; 
            margin: 0; 
            font-size: 28px; 
          }
          .date-info { 
            background: #f8fafc; 
            padding: 15px; 
            border-radius: 8px; 
            margin: 20px 0; 
            border-left: 4px solid #0891b2;
          }
          .metrics-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
            gap: 20px; 
            margin: 30px 0; 
          }
          .metric { 
            text-align: center; 
            padding: 20px; 
            background: #f8fafc; 
            border-radius: 8px; 
            border: 1px solid #e2e8f0;
          }
          .metric-value { 
            font-size: 24px; 
            font-weight: bold; 
            color: #0891b2; 
            margin-bottom: 5px; 
          }
          .metric-label { 
            font-size: 12px; 
            color: #64748b; 
            text-transform: uppercase; 
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
            background: white; 
            border-radius: 8px; 
            overflow: hidden; 
            box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
          }
          th, td { 
            padding: 12px; 
            text-align: left; 
            border-bottom: 1px solid #e2e8f0; 
          }
          th { 
            background: #f1f5f9; 
            font-weight: 600; 
            color: #374151; 
          }
          .section { margin: 40px 0; }
          .section h2 { 
            color: #1e293b; 
            border-bottom: 2px solid #e2e8f0; 
            padding-bottom: 10px; 
          }
          .filters { 
            background: #fef3c7; 
            padding: 10px 15px; 
            border-radius: 6px; 
            margin: 15px 0; 
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📊 Advanced Analytics Report</h1>
        </div>
        
        <div class="date-info">
          <h3>Report Details</h3>
          <p><strong>Generated:</strong> ${new Date().toLocaleDateString(
            "en-US",
            { weekday: "long", year: "numeric", month: "long", day: "numeric" }
          )}</p>
          <p><strong>Date Range:</strong> ${dateRange.label}</p>
          <p><strong>Period:</strong> ${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}</p>
          ${
            activeFilters.length > 0
              ? `<div class="filters"><strong>Active Filters:</strong> ${activeFilters.join(
                  ", "
                )}</div>`
              : ""
          }
        </div>
        
        <div class="section">
          <h2>📈 Performance Summary</h2>
          <div class="metrics-grid">
            <div class="metric">
              <div class="metric-value">$${data.summary.totalRevenue.toLocaleString()}</div>
              <div class="metric-label">Total Revenue</div>
            </div>
            <div class="metric">
              <div class="metric-value">${data.summary.totalConversions.toLocaleString()}</div>
              <div class="metric-label">Total Conversions</div>
            </div>
            <div class="metric">
              <div class="metric-value">${data.summary.conversionRate}%</div>
              <div class="metric-label">Conversion Rate</div>
            </div>
            <div class="metric">
              <div class="metric-value">$${data.summary.averageOrderValue}</div>
              <div class="metric-label">Average Order Value</div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <h2>🎯 Top Performing Campaigns</h2>
          <table>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Revenue</th>
                <th>ROI</th>
                <th>Impressions</th>
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody>
              ${data.topCampaigns
                .map(
                  campaign => `
                <tr>
                  <td>${campaign.name}</td>
                  <td>${campaign.revenue}</td>
                  <td>${campaign.roi}</td>
                  <td>${campaign.impressions.toLocaleString()}</td>
                  <td>${campaign.clicks.toLocaleString()}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
        
        <div style="margin-top: 60px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
          <p><strong>analytics Analytics Dashboard</strong></p>
          <p>This report contains confidential business information • Generated automatically</p>
        </div>
      </body>
    </html>
    `;
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AnalyticsPageSkeleton />
      </motion.div>
    );
  }

  if (!filteredData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
          Advanced Analytics
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
          Deep dive into your marketing data with advanced analytics and
          insights
        </p>
      </div>

      {/* Enhanced Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Date Range Picker */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="bg-white/70 dark:bg-black/20 border-gray-300 dark:border-white/10 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-white/10"
          >
            <Calendar className="w-4 h-4 mr-2" />
            {selectedDateRange.label}
          </Button>

          {showDatePicker && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[200px]"
            >
              <div className="p-2">
                {dateRanges.map(range => (
                  <button
                    key={range.label}
                    onClick={() => handleDateRangeSelect(range)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      selectedDateRange.label === range.label
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Filters Dropdown */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowDatePicker(false)}
            className="bg-white/70 dark:bg-black/20 border-gray-300 dark:border-white/10 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-white/10"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </Button>
        </div>

        {/* Export Dropdown */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => exportData("PDF")}
            disabled={isExporting}
            className="bg-white/70 dark:bg-black/20 border-gray-300 dark:border-white/10 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-white/10"
          >
            {isExporting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b border-current mr-2"></div>
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Export PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => exportData("CSV")}
            disabled={isExporting}
            className="bg-white/70 dark:bg-black/20 border-gray-300 dark:border-white/10 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-white/10"
          >
            {isExporting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b border-current mr-2"></div>
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Export CSV
          </Button>
          <Button
            variant="outline"
            onClick={() => exportData("JSON")}
            disabled={isExporting}
            className="bg-white/70 dark:bg-black/20 border-gray-300 dark:border-white/10 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-white/10"
          >
            {isExporting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b border-current mr-2"></div>
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Export JSON
          </Button>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {availableFilters.map(filter => (
          <Badge
            key={filter}
            variant={activeFilters.includes(filter) ? "default" : "outline"}
            className={`cursor-pointer transition-all ${
              activeFilters.includes(filter)
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-white/70 dark:bg-black/20 border-gray-300 dark:border-white/10 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
            }`}
            onClick={() => handleFilterToggle(filter)}
          >
            {filter}
            {activeFilters.includes(filter) && <X className="w-3 h-3 ml-1" />}
          </Badge>
        ))}
        {activeFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Date Range Info */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CalendarDays className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-800 dark:text-blue-200 font-medium">
                Showing data for: {selectedDateRange.label}
              </span>
              <span className="text-blue-600 dark:text-blue-400 text-sm">
                ({selectedDateRange.from.toLocaleDateString()} -{" "}
                {selectedDateRange.to.toLocaleDateString()})
              </span>
            </div>
            {activeFilters.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 dark:text-blue-400 text-sm">
                  Filters active:
                </span>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                >
                  {activeFilters.length}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${filteredData.summary.totalRevenue.toLocaleString()}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Total Revenue
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {filteredData.summary.totalConversions.toLocaleString()}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Total Conversions
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {filteredData.summary.conversionRate}%
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Conversion Rate
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${filteredData.summary.averageOrderValue}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Avg Order Value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Traffic Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart />
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Engagement Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Channel Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>
      </div>

      {/* Analytics Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white text-lg">
              Top Performing Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredData.topContent.map((content, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {content.title}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {content.type}
                    </p>
                  </div>
                  <span className="text-green-600 dark:text-green-400 font-semibold">
                    {content.change}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white text-lg">
              Audience Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredData.audienceInsights.map((insight, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">
                    {insight.metric}
                  </span>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {insight.value}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">
                      {insight.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white text-lg">
              Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredData.conversionFunnel.map((stage, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">
                    {stage.stage}
                  </span>
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {stage.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
