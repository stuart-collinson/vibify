import { Skeleton } from "vib/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header skeleton */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Skeleton className="h-8 w-32" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </header>

      {/* Main content skeleton */}
      <main className="container mx-auto p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card skeletons */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
              <div className="space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-20 rounded" />
                  <Skeleton className="h-8 w-20 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
} 