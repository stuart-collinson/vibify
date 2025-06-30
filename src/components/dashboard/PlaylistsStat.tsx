"use client"

import { Headphones } from "lucide-react"

interface PlaylistsStatProps {
  value: string
}

export function PlaylistsStat({ value }: PlaylistsStatProps) {
  return (
    <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl p-6 border border-gray-800 hover:border-emerald-500/30 transition-all duration-300 hover:scale-105 group">
      <div className="text-center">
        <Headphones className="w-8 h-8 text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
        <p className="text-3xl font-bold text-white mb-1">{value}</p>
        <p className="text-sm text-gray-300">Playlists</p>
      </div>
    </div>
  )
} 