"use client";

import { QuickViewArtists } from "vib/components/dashboard/QuickViewArtists";
import { QuickViewSongs } from "vib/components/dashboard/QuickViewSongs";
import { WelcomeMessage } from "vib/components/dashboard/WelcomeMessage";
import { api } from "vib/trpc/react";
import { Skeleton } from "vib/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useTrpcErrorHandler } from "vib/hooks/useTrpcErrorHandler";

export const DashboardClient = () => {
  const { data: session } = useSession();
  const { name: usersName, image: usersImage } = session?.user ?? {};

  const {
    data: shortTermArtists,
    isLoading: shortTermArtistsLoading,
    error: shortTermArtistsError,
  } = api.artists.getTopArtists.useQuery({
    limit: 50,
    timeRange: "short_term",
  });

  const {
    data: shortTermSongs,
    isLoading: shortTermSongsLoading,
    error: shortTermSongsError,
  } = api.songs.getTopSongs.useQuery({
    limit: 50,
    timeRange: "short_term",
  });

  const {
    data: playlistsResponse,
    isLoading: playlistsLoading,
    error: playlistsError,
  } = api.playlists.getPlaylistCount.useQuery();

  useTrpcErrorHandler(shortTermArtistsError);
  useTrpcErrorHandler(shortTermSongsError);
  useTrpcErrorHandler(playlistsError);

  const isLoading =
    shortTermArtistsLoading || shortTermSongsLoading || playlistsLoading;

  if (isLoading) {
    return (
      <div className="animate-in fade-in duration-1000">
        <div className="mb-8">
          <Skeleton className="h-12 w-64" />
        </div>
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const quickViewArtists = shortTermArtists?.artists?.slice(0, 5) ?? [];
  const quickViewSongs = shortTermSongs?.songs?.slice(0, 5) ?? [];

  return (
    <div className="animate-in fade-in duration-1000">
      <WelcomeMessage
        name={usersName}
        image={usersImage}
        playlistsCount={playlistsResponse?.count}
      />

      <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <QuickViewArtists artists={quickViewArtists} />
        <QuickViewSongs songs={quickViewSongs} />
      </div>
    </div>
  );
};
