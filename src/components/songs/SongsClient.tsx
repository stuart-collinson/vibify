"use client";

import { SongsTable } from "vib/components/songs/SongsTable";
import { TimeRangeButtons } from "vib/components/songs/TimeRangeButtons";
import { BackButton } from "vib/components/songs/BackButton";
import { api } from "vib/trpc/react";
import { Skeleton } from "vib/components/ui/skeleton";
import type { TimeRange } from "vib/types/global";
import { useSearchParams } from "next/navigation";
import { useTrpcErrorHandler } from "vib/hooks/useTrpcErrorHandler";

export const SongsClient = () => {
  const searchParams = useSearchParams();
  const timeRange =
    (searchParams.get("timeRange") as TimeRange) ?? "short_term";

  const {
    data: songResponse,
    isLoading,
    error,
  } = api.songs.getTopSongs.useQuery({
    limit: 50,
    timeRange,
  });

  useTrpcErrorHandler(error);

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
          <h1 className="text-3xl font-bold text-white">Your Top Songs</h1>
        </div>
        <p className="text-gray-400">Discover your most listened to songs</p>
      </div>

      <TimeRangeButtons currentTimeRange={timeRange} />

      <div className="mt-8">
        <SongsTable key={timeRange} songs={songResponse?.songs ?? []} />
      </div>
    </div>
  );
};
