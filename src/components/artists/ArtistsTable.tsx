"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { getPopularityColor } from "vib/lib/colours";
import { useState } from "react";
import { Button } from "vib/components/ui/button";
import { ArtistCard } from "vib/components/artists/ArtistCard";
import type { ArtistsTableProps } from "vib/types/spotify/artists";

export const ArtistsTable = ({ artists }: ArtistsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(artists.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArtists = artists.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) return `${(followers / 1000000).toFixed(1)}M`;
    if (followers >= 1000) return `${(followers / 1000).toFixed(1)}K`;
    return followers.toString();
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
      <div className="grid grid-cols-2 gap-2 sm:gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentArtists.map((artist, index) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            rank={startIndex + index + 1}
            formatFollowers={formatFollowers}
            getPopularityColor={getPopularityColor}
            getPopularityStars={getPopularityStars}
          />
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
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
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
              ),
            )}
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
