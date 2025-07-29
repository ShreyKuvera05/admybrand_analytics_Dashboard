"use client"

import { useState, useEffect } from "react"
import { redirect } from "next/navigation"

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    redirect("/overview")
  }, [])

  return null
}
