"use client"

import { LikedSongsStat } from "./LikedSongsStat"
import { HoursListenedStat } from "./HoursListenedStat"
import { NewDiscoveriesStat } from "./NewDiscoveriesStat"
import { PlaylistsStat } from "./PlaylistsStat"

interface StatsData {
  likedSongs: string
  hoursListened: string
  newDiscoveries: string
  playlists: string
}

interface StatsGridProps {
  stats: StatsData
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div style={{ animationDelay: "0s" }}>
        <LikedSongsStat value={stats.likedSongs} />
      </div>
      <div style={{ animationDelay: "0.1s" }}>
        <HoursListenedStat value={stats.hoursListened} />
      </div>
      <div style={{ animationDelay: "0.2s" }}>
        <NewDiscoveriesStat value={stats.newDiscoveries} />
      </div>
      <div style={{ animationDelay: "0.3s" }}>
        <PlaylistsStat value={stats.playlists} />
      </div>
    </div>
  )
} 