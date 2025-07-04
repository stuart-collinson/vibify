"use client";

import { ExternalLink, Users } from "lucide-react";
import Image from "next/image";
import { api } from "vib/trpc/react";
import type { ArtistCardProps } from "vib/types/spotify/artists";

export const ArtistCard = ({
  artist,
  rank,
  formatFollowers,
  getPopularityColor,
  getPopularityStars,
}: ArtistCardProps) => {
  const { data: artistDetails, isLoading } =
    api.artists.getArtistDetails.useQuery(
      { artistId: artist.id },
      {
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
      },
    );

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 p-8 transition-all duration-300 hover:border-emerald-500/30 hover:bg-gray-900/70">
      <div className="mb-4 flex justify-center">
        <div className="relative">
          <Image
            className="rounded-full ring-2 ring-emerald-500/20 transition-all duration-300 group-hover:ring-emerald-500/40"
            src={artist.images?.[0]?.url ?? ""}
            alt={artist.name}
            width={80}
            height={80}
          />
          <div
            className={`absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full ${
              rank <= 3 ? "bg-emerald-500" : "bg-gray-700/80"
            }`}
          >
            <span
              className={`text-xs font-bold ${
                rank <= 3 ? "text-black" : "text-white"
              }`}
            >
              {rank}
            </span>
          </div>
        </div>

        <a
          href={artist.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-all duration-200 hover:bg-emerald-500/20 hover:text-emerald-300"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mb-4 text-center">
        <h3 className="text-lg font-bold text-white transition-colors group-hover:text-emerald-300">
          {artist.name}
        </h3>
      </div>

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="text-sm text-gray-400">Popularity</span>
          <span
            className={`text-sm font-semibold ${getPopularityColor(artist.popularity)}`}
          >
            {artist.popularity}/100{artist.popularity >= 90 && " (cracked)"}
          </span>
        </div>
        <div className="flex justify-center gap-1">
          {getPopularityStars(artist.popularity)}
        </div>
      </div>

      {isLoading ? (
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border border-emerald-400/30 border-t-emerald-400"></div>
          <span className="text-sm text-gray-500">Loading...</span>
        </div>
      ) : artistDetails?.artist ? (
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-center gap-2">
            <Users className="h-4 w-4 text-emerald-400/60" />
            <span className="text-sm text-gray-400">Followers</span>
          </div>
          <p className="text-center text-sm font-semibold text-white">
            {formatFollowers(artistDetails.artist.followers)}
          </p>
        </div>
      ) : null}

      {artistDetails?.artist?.genres &&
        artistDetails.artist.genres.length > 0 && (
          <div className="mb-4">
            <p className="mb-2 text-center text-xs text-gray-400">Top Genres</p>
            <div className="flex flex-wrap justify-center gap-1">
              {artistDetails.artist.genres.slice(0, 3).map((genre, index) => (
                <span
                  key={index}
                  className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-400"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};
