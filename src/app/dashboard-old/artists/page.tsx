"use client";

import { api } from "vib/trpc/react";
import { DashboardLayout } from "vib/components/DashboardLayout";

export default function TopArtists() {
  const {
    data: topArtists,
    isLoading,
    error,
  } = api.spotify.getTopArtists.useQuery({});

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Top Artists</h1>
              <p className="text-gray-300">Your most listened artists</p>
            </div>
          </div>

          {isLoading && (
            <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-400 border-t-transparent"></div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  Loading...
                </h3>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
              <div className="py-12 text-center">
                <h3 className="mb-2 text-xl font-semibold text-red-400">
                  Error
                </h3>
                <p className="text-gray-300">{error.message}</p>
              </div>
            </div>
          )}

          {topArtists && topArtists.artists.length > 0 && (
            <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
              <h2 className="mb-6 text-2xl font-bold text-white">
                Your Top Artists
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {topArtists.artists.map((artist) => (
                  <div key={artist.id} className="text-center">
                    {artist.images[0] && (
                      <img
                        src={artist.images[0].url}
                        alt={artist.name}
                        className="mx-auto mb-4 h-24 w-24 rounded-full"
                      />
                    )}
                    <h3 className="mb-2 text-lg font-semibold text-white">
                      {artist.name}
                    </h3>
                    <p className="text-gray-300">
                      Popularity: {artist.popularity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {topArtists && topArtists.artists.length === 0 && (
            <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20">
                  <svg
                    className="h-8 w-8 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  No Top Artists
                </h3>
                <p className="text-gray-300">
                  Your top artists will appear here based on your listening
                  history.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
