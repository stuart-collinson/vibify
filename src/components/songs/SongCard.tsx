"use client";

import { ExternalLink, Music } from "lucide-react";
import Image from "next/image";
import type { SongCardProps } from "vib/types/spotify/songs";

export const SongCard = ({
  song,
  rank,
  getPopularityColor,
  getPopularityStars,
}: SongCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 p-2.5 pt-4 sm:p-3 sm:pt-3 md:p-6 lg:p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-gray-900/70">
      <a
        href={song.spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10 flex h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-all duration-200 hover:bg-emerald-500/20 hover:text-emerald-300"
      >
        <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" />
      </a>

      <div className="mb-1.5 sm:mb-2 md:mb-4 flex justify-center">
        <div className="relative">
          <Image
            className="rounded-lg ring-2 ring-emerald-500/20 transition-all duration-300 group-hover:ring-emerald-500/40 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
            src={song.album.images?.[0]?.url ?? ""}
            alt={song.album.name}
            width={80}
            height={80}
          />
          <div
            className={`absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 flex h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 items-center justify-center rounded-full ${
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
      </div>

      <div className="mb-1.5 sm:mb-2 md:mb-3 text-center">
        <h3 className="line-clamp-2 text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white transition-colors group-hover:text-emerald-300">
          {song.name}
        </h3>
      </div>

      <div className="mb-1.5 sm:mb-2 md:mb-3 text-center">
        <div className="mb-0.5 sm:mb-1 flex items-center justify-center gap-0.5 sm:gap-1">
          <Music className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-400/60" />
          <span className="text-xs text-gray-400">Artists</span>
        </div>
        <p className="line-clamp-2 text-xs sm:text-sm text-gray-300">
          {song.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>

      <div className="mb-1.5 sm:mb-2 md:mb-3 text-center">
        <p className="mb-0.5 sm:mb-1 text-xs text-gray-400">Album</p>
        <p className="line-clamp-1 text-xs sm:text-sm text-gray-300">{song.album.name}</p>
      </div>

      <div className="mb-1.5 sm:mb-2 md:mb-3">
        <div className="mb-0.5 sm:mb-1 md:mb-2 flex items-center justify-center gap-0.5 sm:gap-1 md:gap-2">
          <span className="text-xs text-gray-400 sm:hidden">Pop</span>
          <span className="hidden sm:inline text-xs sm:text-sm text-gray-400">Popularity</span>
          <span
            className={`text-xs sm:text-sm font-semibold ${getPopularityColor(song.popularity)}`}
          >
            {song.popularity}{song.popularity >= 90 && "★"}
          </span>
        </div>
        <div className="flex justify-center gap-0.5 sm:gap-1">
          {getPopularityStars(song.popularity)}
        </div>
      </div>
    </div>
  );
};
