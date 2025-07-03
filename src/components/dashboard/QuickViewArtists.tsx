"use client";

import { ExternalLink, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Artist } from "vib/types/spotify/artists";

type QuickViewArtistsProps = {
  artists: Artist[];
};

export const QuickViewArtists = ({ artists }: QuickViewArtistsProps) => {
  const router = useRouter();

  const handlePanelClick = () => {
    router.push("/artists");
  };

  return (
    <div 
      className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-300 hover:border-emerald-500/30 cursor-pointer"
      onClick={handlePanelClick}
    >
      <div className="mb-6 flex items-center gap-2">
        <User className="h-6 w-6 text-emerald-400" />
        <h2 className="text-2xl font-bold text-white">Top 5 Current Artists</h2>
      </div>

      <div className="space-y-4">
        {artists.map((artist, index) => (
          <div
            key={index}
            className="group flex items-center justify-between rounded-xl bg-black/30 p-4 transition-all duration-300 hover:bg-black/50"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20">
                <span className="text-sm font-bold text-emerald-400">
                  #{index + 1}
                </span>
              </div>
              
              <div className="flex flex-col gap-1 min-h-[65px] justify-center">
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-white transition-colors group-hover:text-emerald-300">
                    {artist.name}
                  </h3>

                  <a
                    href={artist.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-emerald-400/60 transition-colors duration-200 hover:text-emerald-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-3 w-3" />
                    Spotify
                  </a>
                </div>
              </div>
            </div>

            <Image
              className="rounded-full"
              src={artist.images?.[0]?.url ?? ""}
              alt={artist.name}
              width={40}
              height={40}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
