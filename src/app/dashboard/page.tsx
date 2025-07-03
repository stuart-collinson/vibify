import { QuickViewArtists } from "vib/components/dashboard/QuickViewArtists";
import { QuickViewSongs } from "vib/components/dashboard/QuickViewSongs";
import { StatsGrid } from "vib/components/dashboard/StatsGrid";
import { api } from "vib/trpc/server";

// Mock data
const mockData = {
  songs: [
    { title: "Blinding Lights", artist: "The Weeknd", plays: "847" },
    { title: "bad guy", artist: "Billie Eilish", plays: "623" },
    { title: "SICKO MODE", artist: "Travis Scott", plays: "591" },
    { title: "Levitating", artist: "Dua Lipa", plays: "534" },
    { title: "Circles", artist: "Post Malone", plays: "487" },
  ],
  stats: {
    likedSongs: "1,247",
    hoursListened: "342",
    newDiscoveries: "89",
    playlists: "23",
  },
};

export default async function Dashboard() {
  const [artistResponse, songResponse] = await Promise.all([
    api.spotify.getTopArtists({
      limit: 5,
      timeRange: "long_term",
    }),
    api.spotify.getTopSongs({
      limit: 5,
      timeRange: "long_term",
    }),
  ]);

  return (
    <div className="animate-in fade-in duration-1000">
      <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <QuickViewArtists artists={artistResponse.artists ?? []} />
        <QuickViewSongs songs={songResponse.songs ?? []} />
      </div>

      <StatsGrid stats={mockData.stats} />
    </div>
  );
}
