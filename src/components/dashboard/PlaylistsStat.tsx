"use client";

import { Headphones } from "lucide-react";

interface PlaylistsStatProps {
  value: number;
}

export const PlaylistsStat = ({ value }: PlaylistsStatProps) => {
  return (
    <div className="group rounded-lg border border-gray-800 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 px-2.5 py-2 transition-all duration-300 hover:scale-105 hover:border-emerald-500/30 sm:rounded-xl sm:px-3 sm:py-2.5">
      <div className="text-center">
        <Headphones className="mx-auto mb-0.5 h-3 w-3 text-emerald-400 transition-transform duration-300 group-hover:scale-110 sm:h-3.5 sm:w-3.5" />
        <p className="mb-0.5 text-sm font-bold text-white sm:text-sm">{value}</p>
        <p className="text-xs text-gray-300">Playlists</p>
      </div>
    </div>
  );
};
