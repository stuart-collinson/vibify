"use client";

import { ExternalLink, Music } from "lucide-react";
import Image from "next/image";
import type { Song } from "vib/types/spotify/songs";

type QuickViewSongsProps = {
  songs: Song[];
};

export const QuickViewSongs = ({ songs }: QuickViewSongsProps) => {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-300 hover:border-emerald-500/30">
      <div className="mb-6 flex items-center gap-2">
        <Music className="h-6 w-6 text-emerald-400" />
        <h2 className="text-2xl font-bold text-white">Top 5 Songs</h2>
      </div>

      <div className="space-y-4">
        {songs.map((song, index) => (
          <div
            key={index}
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
                  {song.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {song.artists.map((artist) => artist.name).join(", ")} -{" "}
                  {song.album.name}
                </p>

                <a
                  href={song.spotifyUrl}
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
              className="rounded-lg"
              src={song.album.images?.[0]?.url ?? ""}
              alt={song.album.name}
              width={40}
              height={40}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
