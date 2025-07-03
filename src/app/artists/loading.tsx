import { Skeleton } from "vib/components/ui/skeleton";
import { User } from "lucide-react";

const ArtistsLoading = () => {
  return (
    <div className="animate-in fade-in duration-1000">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-white">Your Top Artists</h1>
        <p className="text-gray-400">Discover your most listened to artists</p>
      </div>

      {/* Time Range Buttons Skeleton */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-32 rounded-xl" />
        ))}
      </div>

      {/* Artists Table Skeleton */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 bg-black/30">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Artist
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Popularity
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
                  {/* Actions column header removed */}
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 25 }).map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800/50"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20">
                      <span className="text-sm font-bold text-emerald-400">
                        #{index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div>
                        <Skeleton className="mb-1 h-5 w-32" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-emerald-400" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Skeleton className="h-10 w-32 rounded-lg" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between mt-4">
        <Skeleton className="h-4 w-48" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-20" />
          <div className="flex items-center gap-1">
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton key={index} className="h-8 w-8" />
            ))}
          </div>
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </div>
  );
};

export default ArtistsLoading; 