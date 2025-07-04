"use client";

import { ArtistsTable } from "vib/components/artists/ArtistsTable";
import { TimeRangeButtons } from "vib/components/artists/TimeRangeButtons";
import { BackButton } from "vib/components/artists/BackButton";
import { api } from "vib/trpc/react";
import { Skeleton } from "vib/components/ui/skeleton";
import type { TimeRange } from "vib/types/global";
import { useSearchParams } from "next/navigation";

export function ArtistsClient() {
  const searchParams = useSearchParams();
  const timeRange = (searchParams.get("timeRange") as TimeRange) ?? "short_term";

  const { data: artistResponse, isLoading } = api.artists.getTopArtists.useQuery({
    limit: 50,
    timeRange,
  });

  if (isLoading) {
    return (
      <div className="animate-in fade-in duration-1000">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4">
            <BackButton />
            <Skeleton className="h-9 w-64" />
          </div>
          <Skeleton className="h-5 w-80" />
        </div>

        <TimeRangeButtons currentTimeRange={timeRange} />

        <div className="mt-8 space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-1000">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-4">
          <BackButton />
          <h1 className="text-3xl font-bold text-white">Your Top Artists</h1>
        </div>
        <p className="text-gray-400">Discover your most listened to artists</p>
      </div>

      <TimeRangeButtons currentTimeRange={timeRange} />

      <div className="mt-8">
        <ArtistsTable 
          key={timeRange}
          artists={artistResponse?.artists ?? []} 
        />
      </div>
    </div>
  );
} 