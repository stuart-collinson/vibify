"use client";

import { Headphones } from "lucide-react";

interface PlaylistsStatProps {
  value: number;
}

export const PlaylistsStat = ({ value }: PlaylistsStatProps) => {
  return (
    <div className="group rounded-xl border border-gray-800 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 px-4 py-3 transition-all duration-300 hover:scale-105 hover:border-emerald-500/30">
      <div className="text-center">
        <Headphones className="mx-auto mb-1 h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
        <p className="mb-0.5 text-base font-bold text-white">{value}</p>
        <p className="text-xs text-gray-300">Playlists</p>
      </div>
    </div>
  );
};
