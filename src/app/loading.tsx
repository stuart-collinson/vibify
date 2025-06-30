import { Skeleton } from "vib/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4 text-white">
      <div className="container flex flex-col items-center justify-center space-y-6">
        {/* Logo/Title skeleton */}
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>

        {/* Login button skeleton */}
        <div className="flex flex-col items-center space-y-3">
          <Skeleton className="h-12 w-64 rounded-lg" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Additional content skeletons */}
        <div className="flex flex-col items-center space-y-2">
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
    </main>
  );
}
