"use client";

import { ExternalLink, User, Users, Grid3X3 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "vib/trpc/react";
import type { Artist } from "vib/types/spotify/artists";
import { DEFAULT_TIME_RANGES } from "vib/lib/constants";

type QuickViewArtistsProps = {
  artists: Artist[];
};

export const QuickViewArtists = ({ artists }: QuickViewArtistsProps) => {
  const router = useRouter();
  const utils = api.useUtils();

  const handlePanelClick = () => {
    // Prefetch all time ranges for artists before navigation
    const prefetchPromises = DEFAULT_TIME_RANGES.map((timeRange) =>
      utils.artists.getTopArtists.prefetch({
        limit: 50,
        timeRange,
      }),
    );

    void Promise.all(prefetchPromises).then(() => {
      router.push("/artists");
    });
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-300 hover:border-emerald-500/30">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="h-6 w-6 text-emerald-400" />
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Top 5 Current Artists
          </h2>
        </div>
        <button
          onClick={handlePanelClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-all duration-200 hover:bg-emerald-500/20 hover:text-emerald-300 active:scale-95"
          aria-label="View all artists"
        >
          <Grid3X3 className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {artists.map((artist, index) => (
          <ArtistCard key={artist.id} artist={artist} index={index} />
        ))}
      </div>
    </div>
  );
};

const ArtistCard = ({ artist, index }: { artist: Artist; index: number }) => {
  const { data: artistDetails, isLoading } =
    api.artists.getArtistDetails.useQuery(
      { artistId: artist.id },
      {
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
      },
    );

  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    }
    if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}K`;
    }
    return followers.toString();
  };

  return (
    <div
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
          <h3 className="font-semibold text-white transition-colors group-hover:text-emerald-300">
            {artist.name}
          </h3>

          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 animate-spin rounded-full border border-emerald-400/30 border-t-emerald-400"></div>
              <span className="text-xs text-gray-500">Loading details...</span>
            </div>
          ) : artistDetails?.artist ? (
            <div className="flex items-center gap-2">
              <Users className="h-3 w-3 text-emerald-400/60" />
              <span className="text-sm text-gray-400">
                {formatFollowers(artistDetails.artist.followers)} followers
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 animate-spin rounded-full border border-emerald-400/30 border-t-emerald-400"></div>
              <span className="text-xs text-gray-500">Loading details...</span>
            </div>
          )}

          <a
            href={artist.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-emerald-400/60 transition-colors duration-200 hover:text-emerald-300"
          >
            <ExternalLink className="h-3 w-3" />
            Spotify
          </a>
        </div>
      </div>

      <Image
        className="rounded-full"
        src={artist.images?.[0]?.url ?? ""}
        alt={artist.name}
        width={40}
        height={40}
      />
    </div>
  );
};
