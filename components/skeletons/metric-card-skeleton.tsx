import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function MetricCardSkeleton() {
  return (
    <Card className="relative overflow-hidden bg-white/80 dark:bg-black/20 backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-light-lg dark:shadow-none">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 opacity-50" />
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-20 mb-2" />
            <div className="flex items-center space-x-1">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
          <div className="flex-shrink-0 ml-2">
            <Skeleton className="w-12 h-12 rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function MetricCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <MetricCardSkeleton key={index} />
      ))}
    </div>
  )
}
