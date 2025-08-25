"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  TrendingUp,
  Globe,
  Settings,
  Home,
  Activity,
  Target,
  X,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const navigation = [
  { name: "Overview", href: "/overview", icon: Home },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Campaigns", href: "/campaigns", icon: Target },
  { name: "Audience", href: "/audience", icon: Users },
  { name: "Performance", href: "/performance", icon: TrendingUp },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Real-time", href: "/realtime", icon: Activity },
  { name: "Global", href: "/global", icon: Globe },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: open ? 256 : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:block relative z-30 overflow-hidden"
      >
        <div className="w-64 h-full bg-white/80 dark:bg-black/20 backdrop-blur-xl border-r border-gray-200 dark:border-white/10 shadow-light-lg dark:shadow-none">
          <SidebarContent open={open} setOpen={setOpen} pathname={pathname} />
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: open ? 0 : -320 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-y-0 left-0 z-50 w-64 md:hidden"
      >
        <div className="w-full h-full bg-white/95 dark:bg-black/30 backdrop-blur-xl border-r border-gray-200 dark:border-white/10 shadow-light-xl dark:shadow-none">
          <SidebarContent
            open={open}
            setOpen={setOpen}
            pathname={pathname}
            isMobile
          />
        </div>
      </motion.div>
    </>
  );
}

function SidebarContent({
  open,
  setOpen,
  pathname,
  isMobile = false,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  pathname: string;
  isMobile?: boolean;
}) {
  return (
    <div className="flex flex-col h-full p-4">
      {/* Header with close button */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="ml-3 text-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
            analytics
          </span>
        </div>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navigation.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => isMobile && setOpen(false)}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 shadow-light-md dark:shadow-none"
                    : "text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/70 dark:hover:bg-white/5"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="ml-3">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User profile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-auto p-3 rounded-lg bg-gray-100/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-light-sm dark:shadow-none"
      >
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              John Doe
            </p>
            <p className="text-xs text-gray-600 dark:text-slate-400">Admin</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
