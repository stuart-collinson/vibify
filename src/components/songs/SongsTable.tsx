"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "vib/components/ui/button";
import { SongCard } from "vib/components/songs/SongCard";
import type { SongsTableProps } from "vib/types/spotify/songs";

const ITEMS_PER_PAGE = 12;

export const SongsTable = ({ songs }: SongsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(songs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSongs = songs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentSongs.map((song, index) => (
          <SongCard key={song.id} song={song} rank={startIndex + index + 1} />
        ))}
      </div>

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
                key={`page-${page}`}
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
