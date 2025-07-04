"use client";

import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Star,
  Music,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "vib/components/ui/button";
import { getPopularityColor } from "vib/lib/colours";
import type { Song } from "vib/types/spotify/songs";

type SongsTableProps = {
  songs: Song[];
};

export const SongsTable = ({ songs }: SongsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Increased for better content display
  const totalPages = Math.ceil(songs.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSongs = songs.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getPopularityStars = (popularity: number) => {
    const stars = Math.ceil(popularity / 20);
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < stars ? "fill-current text-emerald-400" : "text-gray-600"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Songs Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentSongs.map((song, index) => (
          <SongCard
            key={song.id}
            song={song}
            rank={startIndex + index + 1}
            getPopularityColor={getPopularityColor}
            getPopularityStars={getPopularityStars}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:bg-emerald-500/10 hover:text-emerald-400 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`h-8 w-8 rounded-md text-sm font-medium transition-all ${
                  currentPage === page
                    ? "bg-emerald-500 text-black"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <Button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:bg-emerald-500/10 hover:text-emerald-400 disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

const SongCard = ({
  song,
  rank,
  getPopularityColor,
  getPopularityStars,
}: {
  song: Song;
  rank: number;
  getPopularityColor: (popularity: number) => string;
  getPopularityStars: (popularity: number) => React.ReactElement[];
}) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-gray-900/70">
      {/* Album Artwork and Spotify Link */}
      <div className="mb-4 flex justify-center">
        <div className="relative">
          <Image
            className="rounded-lg ring-2 ring-emerald-500/20 transition-all duration-300 group-hover:ring-emerald-500/40"
            src={song.album.images?.[0]?.url ?? ""}
            alt={song.album.name}
            width={80}
            height={80}
          />
          {/* Rank Badge - Always visible */}
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

        {/* Spotify Link - Top Right */}
        <a
          href={song.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-all duration-200 hover:bg-emerald-500/20 hover:text-emerald-300"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Song Name */}
      <div className="mb-3 text-center">
        <h3 className="line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-emerald-300">
          {song.name}
        </h3>
      </div>

      {/* Artists */}
      <div className="mb-3 text-center">
        <div className="mb-1 flex items-center justify-center gap-1">
          <Music className="h-3 w-3 text-emerald-400/60" />
          <span className="text-xs text-gray-400">Artists</span>
        </div>
        <p className="line-clamp-2 text-sm text-gray-300">
          {song.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>

      {/* Album */}
      <div className="mb-3 text-center">
        <p className="mb-1 text-xs text-gray-400">Album</p>
        <p className="line-clamp-1 text-sm text-gray-300">{song.album.name}</p>
      </div>

      {/* Popularity */}
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
