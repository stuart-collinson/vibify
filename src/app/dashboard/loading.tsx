import { Skeleton } from "vib/components/ui/skeleton";
import { User, Music, BarChart3 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="animate-in fade-in duration-1000">
      <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Artists Section Skeleton */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-300 hover:border-emerald-500/30">
          <div className="mb-6 flex items-center gap-2">
            <User className="h-6 w-6 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white">Top 5 Artists</h2>
          </div>

          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="group flex items-center justify-between rounded-xl bg-black/30 p-4 transition-all duration-300 hover:bg-black/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20">
                    <span className="text-sm font-bold text-emerald-400">
                      #{index + 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <Skeleton className="mb-1 h-5 w-32" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Songs Section Skeleton */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-300 hover:border-emerald-500/30">
          <div className="mb-6 flex items-center gap-2">
            <Music className="h-6 w-6 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white">Top 5 Songs</h2>
          </div>

          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="group flex items-center justify-between rounded-xl bg-black/30 p-4 transition-all duration-300 hover:bg-black/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20">
                    <span className="text-sm font-bold text-emerald-400">
                      #{index + 1}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-300 hover:border-emerald-500/30"
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-emerald-400" />
              <div>
                <Skeleton className="mb-1 h-6 w-20" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
