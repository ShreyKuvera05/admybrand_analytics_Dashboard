"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  title: string
  message: string
  type: "success" | "warning" | "info" | "error"
  timestamp: string
  isRead: boolean
  actionUrl?: string
}

interface NotificationsDropdownProps {
  isOpen: boolean
  onClose: () => void
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Campaign Performance Alert",
    message: "Your 'Summer Sale' campaign has exceeded its target by 25%",
    type: "success",
    timestamp: "2 minutes ago",
    isRead: false,
    actionUrl: "/campaigns",
  },
  {
    id: "2",
    title: "API Rate Limit Warning",
    message: "You've used 85% of your API quota for this month",
    type: "warning",
    timestamp: "15 minutes ago",
    isRead: false,
    actionUrl: "/settings",
  },
  {
    id: "3",
    title: "New User Milestone",
    message: "Congratulations! You've reached 10,000 active users",
    type: "success",
    timestamp: "1 hour ago",
    isRead: false,
    actionUrl: "/audience",
  },
  {
    id: "4",
    title: "Conversion Rate Drop",
    message: "Your conversion rate has decreased by 12% in the last 24 hours",
    type: "error",
    timestamp: "2 hours ago",
    isRead: true,
    actionUrl: "/analytics",
  },
  {
    id: "5",
    title: "Weekly Report Ready",
    message: "Your weekly analytics report is now available for download",
    type: "info",
    timestamp: "1 day ago",
    isRead: true,
    actionUrl: "/reports",
  },
  {
    id: "6",
    title: "Team Member Added",
    message: "Sarah Johnson has been added to your analytics team",
    type: "info",
    timestamp: "2 days ago",
    isRead: true,
    actionUrl: "/settings",
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle className="w-4 h-4 text-green-500" />
    case "warning":
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />
    case "error":
      return <AlertCircle className="w-4 h-4 text-red-500" />
    case "info":
    default:
      return <Info className="w-4 h-4 text-blue-500" />
  }
}

const getNotificationBgColor = (type: string, isRead: boolean) => {
  const opacity = isRead ? "bg-opacity-30" : "bg-opacity-50"
  switch (type) {
    case "success":
      return `bg-green-500 ${opacity}`
    case "warning":
      return `bg-yellow-500 ${opacity}`
    case "error":
      return `bg-red-500 ${opacity}`
    case "info":
    default:
      return `bg-blue-500 ${opacity}`
  }
}

export function NotificationsDropdown({ isOpen, onClose }: NotificationsDropdownProps) {
  const [notifications, setNotifications] = useState(mockNotifications)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => !n.isRead).length

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            style={{ zIndex: 99998 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 w-96 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 ring-1 ring-black/5 dark:ring-white/10"
            style={{ zIndex: 99999 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="h-5 px-2 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Actions */}
            {notifications.length > 0 && (
              <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  disabled={unreadCount === 0}
                >
                  Mark all as read
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllNotifications}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Clear all
                </Button>
              </div>
            )}

            {/* Notifications List */}
            <ScrollArea className="max-h-96">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 font-medium">No notifications</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">You're all caught up!</p>
                </div>
              ) : (
                <div className="p-2">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "relative p-3 rounded-lg mb-2 cursor-pointer transition-all duration-200 hover:shadow-md",
                        !notification.isRead && "border-l-4 border-blue-500",
                        getNotificationBgColor(notification.type, notification.isRead),
                      )}
                      onClick={() => !notification.isRead && markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {notification.title}
                            </p>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-gray-500 dark:text-gray-400">{notification.timestamp}</p>
                            {notification.actionUrl && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs h-6 px-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  // In a real app, you'd navigate to the URL
                                  console.log(`Navigate to: ${notification.actionUrl}`)
                                }}
                              >
                                View
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    // In a real app, navigate to notifications page
                    console.log("Navigate to notifications page")
                    onClose()
                  }}
                >
                  View all notifications
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
