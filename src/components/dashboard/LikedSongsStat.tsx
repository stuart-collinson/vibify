"use client"

import { Heart } from "lucide-react"

interface LikedSongsStatProps {
  value: string
}

export function LikedSongsStat({ value }: LikedSongsStatProps) {
  return (
    <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl p-6 border border-gray-800 hover:border-red-500/30 transition-all duration-300 hover:scale-105 group">
      <div className="text-center">
        <Heart className="w-8 h-8 text-red-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
        <p className="text-3xl font-bold text-white mb-1">{value}</p>
        <p className="text-sm text-gray-300">Liked Songs</p>
      </div>
    </div>
  )
} 