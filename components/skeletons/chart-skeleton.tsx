import { Skeleton } from "@/components/ui/skeleton"

export function ChartSkeleton() {
  return (
    <div className="h-48 sm:h-56 md:h-64 w-full">
      <div className="flex items-end justify-between h-full space-x-2 p-4">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between h-full py-2">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
        </div>

        {/* Chart bars/lines */}
        <div className="flex-1 flex items-end justify-between space-x-1 h-full">
          <div className="flex flex-col items-center space-y-2 h-full justify-end">
            <Skeleton
              className="w-8 bg-gradient-to-t from-blue-200 to-blue-100 dark:from-blue-800 dark:to-blue-700"
              style={{ height: "60%" }}
            />
            <Skeleton className="h-3 w-8" />
          </div>
          <div className="flex flex-col items-center space-y-2 h-full justify-end">
            <Skeleton
              className="w-8 bg-gradient-to-t from-green-200 to-green-100 dark:from-green-800 dark:to-green-700"
              style={{ height: "80%" }}
            />
            <Skeleton className="h-3 w-8" />
          </div>
          <div className="flex flex-col items-center space-y-2 h-full justify-end">
            <Skeleton
              className="w-8 bg-gradient-to-t from-purple-200 to-purple-100 dark:from-purple-800 dark:to-purple-700"
              style={{ height: "45%" }}
            />
            <Skeleton className="h-3 w-8" />
          </div>
          <div className="flex flex-col items-center space-y-2 h-full justify-end">
            <Skeleton
              className="w-8 bg-gradient-to-t from-orange-200 to-orange-100 dark:from-orange-800 dark:to-orange-700"
              style={{ height: "70%" }}
            />
            <Skeleton className="h-3 w-8" />
          </div>
          <div className="flex flex-col items-center space-y-2 h-full justify-end">
            <Skeleton
              className="w-8 bg-gradient-to-t from-pink-200 to-pink-100 dark:from-pink-800 dark:to-pink-700"
              style={{ height: "55%" }}
            />
            <Skeleton className="h-3 w-8" />
          </div>
          <div className="flex flex-col items-center space-y-2 h-full justify-end">
            <Skeleton
              className="w-8 bg-gradient-to-t from-cyan-200 to-cyan-100 dark:from-cyan-800 dark:to-cyan-700"
              style={{ height: "90%" }}
            />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function PieChartSkeleton() {
  return (
    <div className="h-48 sm:h-56 md:h-64 w-full flex flex-col items-center justify-center">
      {/* Pie chart circle */}
      <div className="relative">
        <Skeleton className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800" />
        <Skeleton className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white dark:bg-gray-900" />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="w-3 h-3 rounded-full bg-blue-300 dark:bg-blue-700" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="w-3 h-3 rounded-full bg-green-300 dark:bg-green-700" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="w-3 h-3 rounded-full bg-purple-300 dark:bg-purple-700" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  )
}

export function LineChartSkeleton() {
  return (
    <div className="h-48 sm:h-56 md:h-64 w-full p-4">
      <div className="flex items-end justify-between h-full">
        {/* Y-axis */}
        <div className="flex flex-col justify-between h-full py-2">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
        </div>

        {/* Chart area with curved line simulation */}
        <div className="flex-1 relative h-full mx-4">
          <svg className="w-full h-full" viewBox="0 0 300 200">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className="stop-color-blue-300 dark:stop-color-blue-700" />
                <stop offset="50%" className="stop-color-purple-300 dark:stop-color-purple-700" />
                <stop offset="100%" className="stop-color-pink-300 dark:stop-color-pink-700" />
              </linearGradient>
            </defs>
            <path
              d="M 20 150 Q 80 100 140 120 T 280 80"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              fill="none"
              className="animate-pulse"
            />
            <path
              d="M 20 170 Q 80 130 140 140 T 280 110"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse opacity-60"
            />
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between w-full absolute bottom-0 px-4">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
        </div>
      </div>
    </div>
  )
}
