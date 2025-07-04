import { ArtistsTable } from "vib/components/artists/ArtistsTable";
import { TimeRangeButtons } from "vib/components/artists/TimeRangeButtons";
import { api } from "vib/trpc/server";
import type { TimeRange } from "vib/types/global";
import { BackButton } from "vib/components/artists/BackButton";

export default async function ArtistsPage({
  searchParams,
}: {
  searchParams: { timeRange?: TimeRange };
}) {
  const timeRange = searchParams.timeRange ?? "short_term";

  const artistResponse = await api.artists.getTopArtists({
    limit: 50,
    timeRange,
  });

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
          artists={artistResponse.artists ?? []} 
        />
      </div>
    </div>
  );
}
