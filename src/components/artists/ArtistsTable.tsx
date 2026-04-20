"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "vib/components/ui/button";
import { ArtistCard } from "vib/components/artists/ArtistCard";
import { Skeleton } from "vib/components/ui/skeleton";
import { api } from "vib/trpc/react";
import type { ArtistsTableProps } from "vib/types/spotify/artists";

const ITEMS_PER_PAGE = 12;

export const ArtistsTable = ({ artists }: ArtistsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(artists.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArtists = artists.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const artistIds = currentArtists.map((a) => a.id);
  const { data: detailsResponse, isLoading: isDetailsLoading } = api.artists.getArtistsDetails.useQuery(
    { artistIds },
    { enabled: artistIds.length > 0 },
  );

  const detailsMap = new Map(detailsResponse?.artists.map((d) => [d.id, d]) ?? []);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isDetailsLoading
          ? currentArtists.map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-800 bg-gray-900/50 p-2.5 pt-4 sm:p-3 sm:pt-3 md:p-6 lg:p-8 flex flex-col items-center gap-2 md:gap-3"
              >
                <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
                <div className="flex gap-1 w-full justify-center">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              </div>
            ))
          : currentArtists.map((artist, index) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                rank={startIndex + index + 1}
                details={detailsMap.get(artist.id)}
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
