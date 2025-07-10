"use client";

import { ExternalLink, Music, Users, Grid3X3 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Song } from "vib/types/spotify/songs";
import { api } from "vib/trpc/react";
import { DEFAULT_TIME_RANGES } from "vib/lib/constants";

type QuickViewSongsProps = {
  songs: Song[];
};

export const QuickViewSongs = ({ songs }: QuickViewSongsProps) => {
  const router = useRouter();
  const utils = api.useUtils();

  const handlePanelClick = () => {
    // Prefetch all time ranges for songs before navigation
    const prefetchPromises = DEFAULT_TIME_RANGES.map((timeRange) =>
      utils.songs.getTopSongs.prefetch({
        limit: 50,
        timeRange,
      })
    );

    void Promise.all(prefetchPromises).then(() => {
      router.push("/songs");
    });
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-300 hover:border-emerald-500/30">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="h-6 w-6 text-emerald-400" />
          <h2 className="text-xl font-bold text-white sm:text-2xl">Top 5 Current Songs</h2>
        </div>
        <button
          onClick={handlePanelClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-all duration-200 hover:bg-emerald-500/20 hover:text-emerald-300 active:scale-95"
          aria-label="View all songs"
        >
          <Grid3X3 className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {songs.map((song, index) => (
          <SongCard key={index} song={song} index={index} />
        ))}
      </div>
    </div>
  );
};

const SongCard = ({ song, index }: { song: Song; index: number }) => {
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
            {song.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Users className="h-3 w-3 text-emerald-400/60" />
            {song.artists.map((artist) => artist.name).join(", ")} -{" "}
            {song.album.name}
          </div>

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
  );
};
