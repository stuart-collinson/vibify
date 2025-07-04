"use client";

import { ExternalLink, TrendingUp, Users, Music, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "vib/components/ui/button";
import { getPopularityColor } from "vib/lib/colours";
import { api } from "vib/trpc/react";
import type { Artist } from "vib/types/spotify/artists";

type ArtistsTableProps = {
  artists: Artist[];
};

export const ArtistsTable = ({ artists }: ArtistsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Increased for better content display
  const totalPages = Math.ceil(artists.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArtists = artists.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    }
    if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}K`;
    }
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
      {/* Artists Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 disabled:opacity-30"
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
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
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
            className="text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

const ArtistCard = ({ 
  artist, 
  rank, 
  formatFollowers, 
  getPopularityColor, 
  getPopularityStars 
}: { 
  artist: Artist; 
  rank: number;
  formatFollowers: (followers: number) => string;
  getPopularityColor: (popularity: number) => string;
  getPopularityStars: (popularity: number) => React.ReactElement[];
}) => {
  const { data: artistDetails, isLoading } = api.artists.getArtistDetails.useQuery(
    { artistId: artist.id },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  );

  return (
         <div className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 p-8 transition-all duration-300 hover:border-emerald-500/30 hover:bg-gray-900/70">
      

             {/* Artist Image and Spotify Link */}
       <div className="mb-4 flex justify-center">
         <div className="relative">
           <Image
             className="rounded-full ring-2 ring-emerald-500/20 transition-all duration-300 group-hover:ring-emerald-500/40"
             src={artist.images?.[0]?.url ?? ""}
             alt={artist.name}
             width={80}
             height={80}
           />
           {/* Rank Badge - Always visible */}
           <div className={`absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full ${
             rank <= 3 ? 'bg-emerald-500' : 'bg-gray-700/80'
           }`}>
             <span className={`text-xs font-bold ${
               rank <= 3 ? 'text-black' : 'text-white'
             }`}>
               {rank}
             </span>
           </div>
         </div>
         
         {/* Spotify Link - Top Right */}
         <a
           href={artist.spotifyUrl}
           target="_blank"
           rel="noopener noreferrer"
           className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-all duration-200 hover:bg-emerald-500/20 hover:text-emerald-300"
         >
           <ExternalLink className="h-4 w-4" />
         </a>
       </div>

      {/* Artist Name */}
      <div className="mb-4 text-center">
        <h3 className="text-lg font-bold text-white transition-colors group-hover:text-emerald-300">
          {artist.name}
        </h3>
      </div>

             {/* Popularity */}
       <div className="mb-4">
         <div className="flex items-center justify-center gap-2 mb-2">
           <span className="text-sm text-gray-400">Popularity</span>
           <span className={`text-sm font-semibold ${getPopularityColor(artist.popularity)}`}>
             {artist.popularity}/100{artist.popularity >= 90 && " (cracked)"}
           </span>
         </div>
         <div className="flex justify-center gap-1">
           {getPopularityStars(artist.popularity)}
         </div>
       </div>

      {/* Followers */}
      {isLoading ? (
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border border-emerald-400/30 border-t-emerald-400"></div>
          <span className="text-sm text-gray-500">Loading...</span>
        </div>
      ) : artistDetails?.artist ? (
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Users className="h-4 w-4 text-emerald-400/60" />
            <span className="text-sm text-gray-400">Followers</span>
          </div>
          <p className="text-center text-sm font-semibold text-white">
            {formatFollowers(artistDetails.artist.followers)}
          </p>
        </div>
      ) : null}

             {/* Genres */}
       {artistDetails?.artist?.genres && artistDetails.artist.genres.length > 0 && (
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