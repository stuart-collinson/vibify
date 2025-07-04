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
    <div className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-gray-900/70">
      <div className="mb-4 flex justify-center">
        <div className="relative">
          <Image
            className="rounded-lg ring-2 ring-emerald-500/20 transition-all duration-300 group-hover:ring-emerald-500/40"
            src={song.album.images?.[0]?.url ?? ""}
            alt={song.album.name}
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
          href={song.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-all duration-200 hover:bg-emerald-500/20 hover:text-emerald-300"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mb-3 text-center">
        <h3 className="line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-emerald-300">
          {song.name}
        </h3>
      </div>

      <div className="mb-3 text-center">
        <div className="mb-1 flex items-center justify-center gap-1">
          <Music className="h-3 w-3 text-emerald-400/60" />
          <span className="text-xs text-gray-400">Artists</span>
        </div>
        <p className="line-clamp-2 text-sm text-gray-300">
          {song.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>

      <div className="mb-3 text-center">
        <p className="mb-1 text-xs text-gray-400">Album</p>
        <p className="line-clamp-1 text-sm text-gray-300">{song.album.name}</p>
      </div>

      <div className="mb-3">
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="text-xs text-gray-400">Popularity</span>
          <span
            className={`text-sm font-semibold ${getPopularityColor(song.popularity)}`}
          >
            {song.popularity}/100{song.popularity >= 90 && " (cracked)"}
          </span>
        </div>
        <div className="flex justify-center gap-1">
          {getPopularityStars(song.popularity)}
        </div>
      </div>
    </div>
  );
};
