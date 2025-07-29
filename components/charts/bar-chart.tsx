"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function BarChart() {
  const { theme } = useTheme()
  const [data, setData] = useState({
    labels: ["Social Media", "Email", "Search", "Direct", "Referral", "Display"],
    datasets: [
      {
        label: "Performance",
        data: [85, 72, 90, 65, 78, 82],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(14, 165, 233, 0.8)",
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(59, 130, 246)",
          "rgb(168, 85, 247)",
          "rgb(249, 115, 22)",
          "rgb(236, 72, 153)",
          "rgb(14, 165, 233)",
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  })

  const getOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.8)",
        titleColor: theme === "light" ? "rgb(15, 23, 42)" : "rgb(255, 255, 255)",
        bodyColor: theme === "light" ? "rgb(15, 23, 42)" : "rgb(255, 255, 255)",
        borderColor: theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme === "light" ? "rgb(71, 85, 105)" : "rgb(148, 163, 184)",
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
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
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: prev.datasets[0].data.map(() => Math.floor(Math.random() * 40) + 60),
          },
        ],
      }))
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-48 sm:h-56 md:h-64">
      <Bar data={data} options={getOptions()} />
    </div>
  )
}
