import { SongsTable } from "vib/components/songs/SongsTable";
import { TimeRangeButtons } from "vib/components/songs/TimeRangeButtons";
import { api } from "vib/trpc/server";
import type { TimeRange } from "vib/types/global";

export default async function SongsPage({
  searchParams,
}: {
  searchParams: { timeRange?: TimeRange };
}) {
  const timeRange = searchParams.timeRange ?? "short_term";

  const songResponse = await api.spotify.getTopSongs({
    limit: 50,
    timeRange,
  });

  return (
    <div className="animate-in fade-in duration-1000">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-white">Your Top Songs</h1>
        <p className="text-gray-400">Discover your most listened to songs</p>
      </div>

      <TimeRangeButtons currentTimeRange={timeRange} />

      <div className="mt-8">
        <SongsTable 
          key={timeRange}
          songs={songResponse.songs ?? []} 
        />
      </div>
    </div>
  );
} 