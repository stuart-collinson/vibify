"use client"

import { Music } from "lucide-react"

interface Song {
  title: string
  artist: string
  plays: string
}

interface QuickViewSongsProps {
  songs: Song[]
}

export function QuickViewSongs({ songs }: QuickViewSongsProps) {
  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-emerald-500/30 transition-all duration-300">
      <div className="flex items-center gap-2 mb-6">
        <Music className="w-6 h-6 text-emerald-400" />
        <h2 className="text-2xl font-bold text-white">Top 5 Songs</h2>
      </div>
      <div className="space-y-4">
        {songs.map((song, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 bg-black/30 rounded-xl hover:bg-black/50 transition-all duration-300 group"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                <span className="text-sm font-bold text-emerald-400">#{i + 1}</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-white group-hover:text-emerald-300 transition-colors truncate">
                  {song.title}
                </h3>
                <p className="text-sm text-gray-400 truncate">{song.artist}</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-medium text-emerald-400">{song.plays}</p>
              <p className="text-xs text-gray-500">plays</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 