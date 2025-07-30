"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BubbleChart } from "@/components/charts/bubble-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { Globe, MapPin, TrendingUp, Users } from "lucide-react";
import { InteractiveWorldMap } from "@/components/maps/interactive-world-map";

export default function GlobalPage() {
  const globalMetrics = [
    { title: "Total Countries", value: "47", change: "+3", icon: Globe },
    {
      title: "Top Region",
      value: "North America",
      change: "38%",
      icon: MapPin,
    },
    {
      title: "Global Growth",
      value: "+24.5%",
      change: "vs last month",
      icon: TrendingUp,
    },
    {
      title: "International Users",
      value: "156K",
      change: "+12.8%",
      icon: Users,
    },
  ];

  const topCountries = [
    {
      country: "United States",
      users: "45,231",
      percentage: "38.2%",
      flag: "🇺🇸",
    },
    {
      country: "United Kingdom",
      users: "23,456",
      percentage: "19.8%",
      flag: "🇬🇧",
    },
    { country: "Germany", users: "18,902", percentage: "16.0%", flag: "🇩🇪" },
    { country: "Canada", users: "12,345", percentage: "10.4%", flag: "🇨🇦" },
    { country: "Australia", users: "8,765", percentage: "7.4%", flag: "🇦🇺" },
    { country: "France", users: "6,543", percentage: "5.5%", flag: "🇫🇷" },
  ];

  const timeZones = [
    { zone: "PST (UTC-8)", active: "2,341", peak: "3:00 PM" },
    { zone: "EST (UTC-5)", active: "1,892", peak: "2:00 PM" },
    { zone: "GMT (UTC+0)", active: "1,567", peak: "8:00 PM" },
    { zone: "CET (UTC+1)", active: "1,234", peak: "9:00 PM" },
    { zone: "JST (UTC+9)", active: "892", peak: "10:00 AM" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Global Analytics
        </h1>
        <p className="text-gray-600 dark:text-slate-400 mt-2 text-sm sm:text-base">
          Worldwide insights and geographic performance metrics with interactive
          mapping
        </p>
      </div>

      {/* Global Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {globalMetrics.map((metric, index) => (
          <Card
            key={index}
            className="bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-light-lg dark:shadow-none"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </p>
                  <p className="text-green-600 dark:text-green-400 text-sm">
                    {metric.change}
                  </p>
                </div>
                <metric.icon className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interactive World Map */}
      {/* <div className="mb-8">
        <InteractiveWorldMap />
      </div> */}

      {/* Traditional Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-light-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BubbleChart />
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-light-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Regional Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>
      </div>

      {/* Country and Timezone Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-light-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Top Countries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCountries.map((country, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-black/10 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {country.country}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {country.users} users
                      </p>
                    </div>
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    {country.percentage}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-light-lg dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Active by Timezone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeZones.map((tz, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-black/10 rounded-lg"
                >
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {tz.zone}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Peak: {tz.peak}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 dark:text-green-400 font-semibold">
                      {tz.active}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      active now
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
