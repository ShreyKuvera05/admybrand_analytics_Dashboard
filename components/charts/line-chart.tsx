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
  Legend,
  Filler,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export function LineChart() {
  const { theme } = useTheme()
  const [data, setData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgb(34, 197, 94)",
        pointBorderColor: "rgb(34, 197, 94)",
        pointHoverBackgroundColor: "rgb(34, 197, 94)",
        pointHoverBorderColor: "rgb(34, 197, 94)",
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: "Profit",
        data: [8000, 12000, 10000, 18000, 15000, 22000, 20000, 28000, 25000, 32000, 30000, 38000],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "rgb(59, 130, 246)",
        pointHoverBackgroundColor: "rgb(59, 130, 246)",
        pointHoverBorderColor: "rgb(59, 130, 246)",
        pointRadius: 6,
        pointHoverRadius: 8,
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
          callback: (value: any) => "$" + value.toLocaleString(),
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
          data: dataset.data.map((value) => Math.max(0, value + (Math.random() - 0.5) * 2000)),
        })),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-48 sm:h-56 md:h-64">
      <Line data={data} options={getOptions()} />
    </div>
  )
}
