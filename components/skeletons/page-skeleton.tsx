import { Skeleton } from "@/components/ui/skeleton"
import { MetricCardsSkeleton } from "./metric-card-skeleton"
import { ChartSkeleton, PieChartSkeleton, LineChartSkeleton } from "./chart-skeleton"
import { TableSkeleton } from "./table-skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function OverviewPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <Skeleton className="h-8 sm:h-10 md:h-12 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Metric Cards */}
      <MetricCardsSkeleton />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-light-lg dark:shadow-none">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <LineChartSkeleton />
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-light-lg dark:shadow-none">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <ChartSkeleton />
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-light-lg dark:shadow-none">
          <CardHeader>
            <Skeleton className="h-6 w-36" />
          </CardHeader>
          <CardContent>
            <PieChartSkeleton />
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-light-lg dark:shadow-none">
          <CardHeader>
            <Skeleton className="h-6 w-44" />
          </CardHeader>
          <CardContent>
            <ChartSkeleton />
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <TableSkeleton />
    </div>
  )
}

export function AnalyticsPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <Skeleton className="h-8 sm:h-10 md:h-12 w-56 mb-2" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-18 rounded-full" />
      </div>

      {/* Summary Cards */}
      <MetricCardsSkeleton />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <LineChartSkeleton />
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <ChartSkeleton />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <ChartSkeleton />
          </CardContent>
        </Card>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card
            key={index}
            className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none"
          >
            <CardHeader>
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function RealtimePageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Skeleton className="h-8 sm:h-10 md:h-12 w-48" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Real-time Metrics */}
      <MetricCardsSkeleton />

      {/* Charts and Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <Skeleton className="h-6 w-36" />
          </CardHeader>
          <CardContent>
            <LineChartSkeleton />
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-hidden">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <Skeleton className="w-2 h-2 rounded-full mt-2" />
                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <ChartSkeleton />
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <Skeleton className="h-6 w-44" />
          </CardHeader>
          <CardContent>
            <PieChartSkeleton />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
