"use client";

import { useState, useEffect } from "react";
import { QuickViewArtists } from "vib/components/dashboard/QuickViewArtists";
import { QuickViewSongs } from "vib/components/dashboard/QuickViewSongs";
import { StatsGrid } from "vib/components/dashboard/StatsGrid";

// Mock data
const mockData = {
  artists: [
    { name: "The Weeknd", plays: "2,847", genre: "R&B" },
    { name: "Billie Eilish", plays: "1,923", genre: "Pop" },
    { name: "Travis Scott", plays: "1,654", genre: "Hip-Hop" },
    { name: "Dua Lipa", plays: "1,287", genre: "Pop" },
    { name: "Post Malone", plays: "1,156", genre: "Hip-Hop" },
  ],
  songs: [
    { title: "Blinding Lights", artist: "The Weeknd", plays: "847" },
    { title: "bad guy", artist: "Billie Eilish", plays: "623" },
    { title: "SICKO MODE", artist: "Travis Scott", plays: "591" },
    { title: "Levitating", artist: "Dua Lipa", plays: "534" },
    { title: "Circles", artist: "Post Malone", plays: "487" },
  ],
  stats: {
    likedSongs: "1,247",
    hoursListened: "342",
    newDiscoveries: "89",
    playlists: "23",
  },
};

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`transition-all duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    >
      <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <QuickViewArtists artists={mockData.artists} />
        <QuickViewSongs songs={mockData.songs} />
      </div>

      <StatsGrid stats={mockData.stats} />
    </div>
  );
}
