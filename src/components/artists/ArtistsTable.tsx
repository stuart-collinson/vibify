"use client";

import { ExternalLink, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "vib/components/ui/button";
import type { Artist } from "vib/types/spotify/artists";

type ArtistsTableProps = {
  artists: Artist[];
};

export const ArtistsTable = ({ artists }: ArtistsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const totalPages = Math.ceil(artists.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArtists = artists.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 bg-black/30">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Artist
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Popularity
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
                  {/* Actions column header removed */}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentArtists.map((artist, index) => (
                <tr
                  key={artist.id}
                  className="border-b border-gray-800/50 transition-all duration-200 hover:bg-black/20"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20">
                      <span className="text-sm font-bold text-emerald-400">
                        #{startIndex + index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Image
                        className="rounded-full"
                        src={artist.images?.[0]?.url ?? ""}
                        alt={artist.name}
                        width={48}
                        height={48}
                      />
                      <div>
                        <h3 className="font-semibold text-white">{artist.name}</h3>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm text-gray-300">{artist.popularity}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={artist.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 transition-all duration-200 hover:bg-emerald-500/20 hover:text-emerald-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open in Spotify
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing {startIndex + 1} to {Math.min(endIndex, artists.length)} of {artists.length} artists
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
              className="border-gray-700 bg-gray-900 text-gray-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  onClick={() => goToPage(page)}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  className={
                    currentPage === page
                      ? "bg-emerald-500 text-black hover:bg-emerald-400"
                      : "border-gray-700 bg-gray-900 text-gray-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400"
                  }
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
              className="border-gray-700 bg-gray-900 text-gray-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}; 