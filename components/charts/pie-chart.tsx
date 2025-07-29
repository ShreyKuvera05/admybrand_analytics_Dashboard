"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

export function PieChart() {
  const { theme } = useTheme()
  const [data, setData] = useState({
    labels: ["Organic", "Paid Search", "Social", "Direct", "Email", "Referral"],
    datasets: [
      {
        data: [35, 25, 20, 10, 6, 4],
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
        hoverOffset: 10,
      },
    ],
  })

  const getOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: theme === "light" ? "rgb(71, 85, 105)" : "rgb(148, 163, 184)",
          font: {
            size: 11,
          },
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.8)",
        titleColor: theme === "light" ? "rgb(15, 23, 42)" : "rgb(255, 255, 255)",
        bodyColor: theme === "light" ? "rgb(15, 23, 42)" : "rgb(255, 255, 255)",
        borderColor: theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        callbacks: {
          label: (context: any) => context.label + ": " + context.parsed + "%",
        },
      },
    },
    cutout: "60%",
    animation: {
      animateRotate: true,
      duration: 2000,
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
            data: prev.datasets[0].data.map(() => Math.floor(Math.random() * 30) + 5),
          },
        ],
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-48 sm:h-56 md:h-64">
      <Doughnut data={data} options={getOptions()} />
    </div>
  )
}
