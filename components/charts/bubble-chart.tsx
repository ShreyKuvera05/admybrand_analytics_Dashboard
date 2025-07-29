"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from "chart.js"
import { Bubble } from "react-chartjs-2"

ChartJS.register(LinearScale, PointElement, Tooltip, Legend)

export function BubbleChart() {
  const { theme } = useTheme()
  const [data, setData] = useState({
    datasets: [
      {
        label: "North America",
        data: [
          { x: 20, y: 30, r: 15 },
          { x: 40, y: 10, r: 10 },
          { x: 30, y: 25, r: 12 },
        ],
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 2,
      },
      {
        label: "Europe",
        data: [
          { x: 25, y: 35, r: 18 },
          { x: 35, y: 15, r: 8 },
          { x: 45, y: 20, r: 14 },
        ],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 2,
      },
      {
        label: "Asia",
        data: [
          { x: 15, y: 40, r: 20 },
          { x: 50, y: 30, r: 16 },
          { x: 35, y: 35, r: 11 },
        ],
        backgroundColor: "rgba(168, 85, 247, 0.6)",
        borderColor: "rgb(168, 85, 247)",
        borderWidth: 2,
      },
    ],
  })

  const getOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: theme === "light" ? "rgb(71, 85, 105)" : "rgb(148, 163, 184)",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.8)",
        titleColor: theme === "light" ? "rgb(15, 23, 42)" : "rgb(255, 255, 255)",
        bodyColor: theme === "light" ? "rgb(15, 23, 42)" : "rgb(255, 255, 255)",
        borderColor: theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        callbacks: {
          label: (context: any) => {
            const point = context.parsed
            return `${context.dataset.label}: (${point.x}, ${point.y}) Size: ${point.r}`
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear" as const,
        position: "bottom" as const,
        grid: {
          color: theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: theme === "light" ? "rgb(71, 85, 105)" : "rgb(148, 163, 184)",
        },
        title: {
          display: true,
          text: "Engagement Rate (%)",
          color: theme === "light" ? "rgb(71, 85, 105)" : "rgb(148, 163, 184)",
        },
      },
      y: {
        grid: {
          color: theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: theme === "light" ? "rgb(71, 85, 105)" : "rgb(148, 163, 184)",
        },
        title: {
          display: true,
          text: "Conversion Rate (%)",
          color: theme === "light" ? "rgb(71, 85, 105)" : "rgb(148, 163, 184)",
        },
      },
    },
    animation: {
      duration: 2000,
      easing: "easeInOutQuart" as const,
    },
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        datasets: prev.datasets.map((dataset) => ({
          ...dataset,
          data: dataset.data.map((point) => ({
            x: Math.max(5, Math.min(55, point.x + (Math.random() - 0.5) * 10)),
            y: Math.max(5, Math.min(45, point.y + (Math.random() - 0.5) * 8)),
            r: Math.max(5, Math.min(25, point.r + (Math.random() - 0.5) * 4)),
          })),
        })),
      }))
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-48 sm:h-56 md:h-64">
      <Bubble data={data} options={getOptions()} />
    </div>
  )
}
