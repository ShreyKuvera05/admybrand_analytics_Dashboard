"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

export function AreaChart() {
  const { theme } = useTheme()
  const [data, setData] = useState({
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
    datasets: [
      {
        label: "Page Views",
        data: [1200, 800, 1500, 2200, 1800, 2500, 1600],
        fill: true,
        backgroundColor: "rgba(168, 85, 247, 0.2)",
        borderColor: "rgb(168, 85, 247)",
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: "rgb(168, 85, 247)",
        pointBorderColor: "rgb(168, 85, 247)",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Sessions",
        data: [800, 600, 1000, 1500, 1200, 1800, 1100],
        fill: true,
        backgroundColor: "rgba(14, 165, 233, 0.2)",
        borderColor: "rgb(14, 165, 233)",
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: "rgb(14, 165, 233)",
        pointBorderColor: "rgb(14, 165, 233)",
        pointRadius: 5,
        pointHoverRadius: 7,
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
      },
    },
    scales: {
      x: {
        grid: {
          color: theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
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
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
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
        datasets: prev.datasets.map((dataset) => ({
          ...dataset,
          data: dataset.data.map((value) => Math.max(0, value + (Math.random() - 0.5) * 400)),
        })),
      }))
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-48 sm:h-56 md:h-64">
      <Line data={data} options={getOptions()} />
    </div>
  )
}
