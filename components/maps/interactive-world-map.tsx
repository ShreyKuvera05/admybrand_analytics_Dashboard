"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapDataPoint {
  id: string;
  city: string;
  country: string;
  x: number; // Percentage position on map (0-100)
  y: number; // Percentage position on map (0-100)
  users: number;
  conversions: number;
  revenue: number;
  conversionRate: number;
  growth: number;
  flag: string;
}

export function InteractiveWorldMap() {
  const { theme } = useTheme();
  const [mapData, setMapData] = useState<MapDataPoint[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<
    "users" | "conversions" | "revenue" | "conversionRate"
  >("users");
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Mock data for major cities worldwide with approximate positions on world map
  useEffect(() => {
    const cities: MapDataPoint[] = [
      {
        id: "nyc",
        city: "New York",
        country: "United States",
        x: 25, // Approximate position on world map
        y: 35,
        users: 45231,
        conversions: 2341,
        revenue: 234567,
        conversionRate: 5.2,
        growth: 12.5,
        flag: "🇺🇸",
      },
      {
        id: "london",
        city: "London",
        country: "United Kingdom",
        x: 50,
        y: 30,
        users: 23456,
        conversions: 1567,
        revenue: 156789,
        conversionRate: 6.7,
        growth: 8.3,
        flag: "🇬🇧",
      },
      {
        id: "tokyo",
        city: "Tokyo",
        country: "Japan",
        x: 85,
        y: 40,
        users: 18902,
        conversions: 1234,
        revenue: 123456,
        conversionRate: 6.5,
        growth: 15.2,
        flag: "🇯🇵",
      },
      {
        id: "berlin",
        city: "Berlin",
        country: "Germany",
        x: 52,
        y: 32,
        users: 16543,
        conversions: 987,
        revenue: 98765,
        conversionRate: 6.0,
        growth: 9.8,
        flag: "🇩🇪",
      },
      {
        id: "sydney",
        city: "Sydney",
        country: "Australia",
        x: 88,
        y: 75,
        users: 12345,
        conversions: 789,
        revenue: 78901,
        conversionRate: 6.4,
        growth: 11.2,
        flag: "🇦🇺",
      },
      {
        id: "toronto",
        city: "Toronto",
        country: "Canada",
        x: 22,
        y: 30,
        users: 9876,
        conversions: 654,
        revenue: 65432,
        conversionRate: 6.6,
        growth: 7.9,
        flag: "🇨🇦",
      },
      {
        id: "paris",
        city: "Paris",
        country: "France",
        x: 50,
        y: 33,
        users: 8765,
        conversions: 543,
        revenue: 54321,
        conversionRate: 6.2,
        growth: 6.5,
        flag: "🇫🇷",
      },
      {
        id: "singapore",
        city: "Singapore",
        country: "Singapore",
        x: 78,
        y: 58,
        users: 7654,
        conversions: 456,
        revenue: 45678,
        conversionRate: 6.0,
        growth: 18.7,
        flag: "🇸🇬",
      },
      {
        id: "mumbai",
        city: "Mumbai",
        country: "India",
        x: 68,
        y: 50,
        users: 6543,
        conversions: 398,
        revenue: 39876,
        conversionRate: 6.1,
        growth: 22.3,
        flag: "🇮🇳",
      },
      {
        id: "sao-paulo",
        city: "São Paulo",
        country: "Brazil",
        x: 32,
        y: 70,
        users: 5432,
        conversions: 321,
        revenue: 32109,
        conversionRate: 5.9,
        growth: 14.6,
        flag: "🇧🇷",
      },
    ];

    setMapData(cities);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMapData((prev) =>
        prev.map((city) => ({
          ...city,
          users: city.users + Math.floor(Math.random() * 100),
          conversions: city.conversions + Math.floor(Math.random() * 10),
          revenue: city.revenue + Math.floor(Math.random() * 1000),
          conversionRate: +(
            city.conversionRate +
            (Math.random() - 0.5) * 0.5
          ).toFixed(1),
          growth: +(city.growth + (Math.random() - 0.5) * 2).toFixed(1),
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getMarkerSize = (value: number, metric: string) => {
    const maxValues = {
      users: 50000,
      conversions: 3000,
      revenue: 300000,
      conversionRate: 10,
    };
    const minSize = 12;
    const maxSize = 32;
    const normalizedValue = Math.min(
      value / maxValues[metric as keyof typeof maxValues],
      1
    );
    return (minSize + (maxSize - minSize) * normalizedValue) * zoomLevel;
  };

  const getMarkerColor = (value: number, metric: string) => {
    const maxValues = {
      users: 50000,
      conversions: 3000,
      revenue: 300000,
      conversionRate: 10,
    };
    const normalizedValue = Math.min(
      value / maxValues[metric as keyof typeof maxValues],
      1
    );

    if (theme === "dark") {
      // Neon colors for dark theme
      if (normalizedValue > 0.8) return "#00f5ff"; // Neon cyan
      if (normalizedValue > 0.6) return "#8b5cf6"; // Neon purple
      if (normalizedValue > 0.4) return "#ec4899"; // Neon pink
      if (normalizedValue > 0.2) return "#10b981"; // Neon green
      return "#f59e0b"; // Neon orange
    } else {
      // Vibrant colors for light theme
      if (normalizedValue > 0.8) return "#0891b2"; // Dark cyan
      if (normalizedValue > 0.6) return "#7c3aed"; // Dark purple
      if (normalizedValue > 0.4) return "#db2777"; // Dark pink
      if (normalizedValue > 0.2) return "#059669"; // Dark green
      return "#d97706"; // Dark orange
    }
  };

  const formatValue = (value: number, metric: string) => {
    switch (metric) {
      case "users":
        return value.toLocaleString();
      case "conversions":
        return value.toLocaleString();
      case "revenue":
        return `$${value.toLocaleString()}`;
      case "conversionRate":
        return `${value}%`;
      default:
        return value.toString();
    }
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "users":
        return <Users className="w-4 h-4" />;
      case "conversions":
        return <TrendingUp className="w-4 h-4" />;
      case "revenue":
        return <DollarSign className="w-4 h-4" />;
      case "conversionRate":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-light-lg dark:shadow-none">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-gray-900 dark:text-white">
              Interactive Global Map
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              {(
                ["users", "conversions", "revenue", "conversionRate"] as const
              ).map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    selectedMetric === metric
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20"
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    {getMetricIcon(metric)}
                    <span className="capitalize">
                      {metric === "conversionRate" ? "Conv. Rate" : metric}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          {/* Map Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.2))}
                className="bg-white/70 dark:bg-white/10 border-gray-200 dark:border-white/20"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.2))}
                className="bg-white/70 dark:bg-white/10 border-gray-200 dark:border-white/20"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoomLevel(1)}
                className="bg-white/70 dark:bg-white/10 border-gray-200 dark:border-white/20"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Zoom: {Math.round(zoomLevel * 100)}%
            </div>
          </div>

          {/* World Map Container */}
          <div className="relative h-96 sm:h-[500px] w-full rounded-lg overflow-hidden border border-gray-200 dark:border-white/10 bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-900 dark:to-slate-800">
            {/* World Map Background */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300"
              style={{
                backgroundImage:
                  theme === "dark"
                    ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Cpath d='M158 206c-9-4-18-13-18-13s-5 10-5 10-23-12-23-12 7 17 7 17-13 0-13 0 10 13 10 13-18 5-18 5 23 12 23 12-7-17-7-17 13 0 13 0-10-13-10-13 18-5 18-5zm30 50c-5-2-10-7-10-7s-3 5-3 5-13-7-13-7 4 10 4 10-7 0-7 0 5 7 5 7-10 3-10 3 13 7 13 7-4-10-4-10 7 0 7 0-5-7-5-7 10-3 10-3z' fill='%23374151' opacity='0.1'/%3E%3C/svg%3E")`
                    : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Cpath d='M158 206c-9-4-18-13-18-13s-5 10-5 10-23-12-23-12 7 17 7 17-13 0-13 0 10 13 10 13-18 5-18 5 23 12 23 12-7-17-7-17 13 0 13 0-10-13-10-13 18-5 18-5zm30 50c-5-2-10-7-10-7s-3 5-3 5-13-7-13-7 4 10 4 10-7 0-7 0 5 7 5 7-10 3-10 3 13 7 13 7-4-10-4-10 7 0 7 0-5-7-5-7 10-3 10-3z' fill='%236b7280' opacity='0.2'/%3E%3C/svg%3E")`,
                transform: `scale(${zoomLevel})`,
              }}
            />

            {/* Simplified World Map Outline */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 500"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Continents outline - simplified */}
              <path
                d="M150 200 L200 180 L280 190 L320 210 L350 200 L380 220 L400 200 L450 210 L480 190 L520 200 L550 180 L600 190 L650 200 L700 180 L750 190 L800 200 L850 180 L900 190"
                stroke={theme === "dark" ? "#4b5563" : "#9ca3af"}
                strokeWidth="2"
                fill="none"
                opacity="0.3"
              />
              <path
                d="M100 300 L150 280 L200 290 L250 300 L300 280 L350 290 L400 300 L450 280 L500 290 L550 300 L600 280 L650 290 L700 300 L750 280 L800 290 L850 300"
                stroke={theme === "dark" ? "#4b5563" : "#9ca3af"}
                strokeWidth="2"
                fill="none"
                opacity="0.3"
              />
            </svg>

            {/* Data Points */}
            {mapData.map((city) => (
              <motion.div
                key={city.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${city.x}%`,
                  top: `${city.y}%`,
                  transform: `translate(-50%, -50%) scale(${zoomLevel})`,
                }}
                onMouseEnter={() => setHoveredCity(city.id)}
                onMouseLeave={() => setHoveredCity(null)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Marker */}
                <div
                  className="rounded-full border-2 border-white dark:border-gray-800 shadow-lg transition-all duration-300"
                  style={{
                    width: `${getMarkerSize(
                      city[selectedMetric],
                      selectedMetric
                    )}px`,
                    height: `${getMarkerSize(
                      city[selectedMetric],
                      selectedMetric
                    )}px`,
                    backgroundColor: getMarkerColor(
                      city[selectedMetric],
                      selectedMetric
                    ),
                    boxShadow: `0 0 20px ${getMarkerColor(
                      city[selectedMetric],
                      selectedMetric
                    )}40`,
                  }}
                />

                {/* Pulse Animation */}
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-30"
                  style={{
                    backgroundColor: getMarkerColor(
                      city[selectedMetric],
                      selectedMetric
                    ),
                  }}
                />

                {/* Tooltip */}
                {hoveredCity === city.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10"
                  >
                    <div className="bg-white/95 dark:bg-black/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-lg p-3 shadow-xl min-w-[200px]">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">{city.flag}</span>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                            {city.city}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {city.country}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            Users:
                          </span>
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            {city.users.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            Conversions:
                          </span>
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            {city.conversions.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            Revenue:
                          </span>
                          <span className="font-semibold text-purple-600 dark:text-purple-400">
                            ${city.revenue.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            Conv. Rate:
                          </span>
                          <span className="font-semibold text-orange-600 dark:text-orange-400">
                            {city.conversionRate}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-1 border-t border-gray-200 dark:border-gray-600">
                          <span className="text-gray-600 dark:text-gray-400">
                            Growth:
                          </span>
                          <div className="flex items-center space-x-1">
                            {city.growth > 0 ? (
                              <TrendingUp className="w-3 h-3 text-green-500" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-red-500" />
                            )}
                            <span
                              className={`font-semibold ${
                                city.growth > 0
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }`}
                            >
                              {city.growth > 0 ? "+" : ""}
                              {city.growth}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 p-3 bg-gray-50 dark:bg-black/10 rounded-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Showing:{" "}
                  {selectedMetric === "conversionRate"
                    ? "Conversion Rate"
                    : selectedMetric.charAt(0).toUpperCase() +
                      selectedMetric.slice(1)}
                </span>
                <Badge
                  variant="outline"
                  className="bg-white/70 dark:bg-white/10 border-gray-200 dark:border-white/20"
                >
                  {mapData.length} locations
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>Low</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>High</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                  <span>Highest</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
