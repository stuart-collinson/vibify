import { z } from "zod";

type Artist = {
  id: string;
  name: string;
};

type Album = {
  id: string;
  name: string;
  images: SongImage[];
};

export type SongImage = {
  url: string;
  height: number;
  width: number;
};

export type SpotifySong = {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
  external_urls: {
    spotify: string;
  };
  popularity: number;
};

export type TopSongsResponse = {
  items: SpotifySong[];
};

export type Song = {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
  popularity: number;
  spotifyUrl: string;
};

export type SongsTableProps = {
  songs: Song[];
};

export type SongCardProps = {
  song: Song;
  rank: number;
  getPopularityColor: (popularity: number) => string;
  getPopularityStars: (popularity: number) => React.ReactElement[];
};

// Schemas
export const GetTopSongsInput = z.object({
  limit: z.number().min(1).max(50).default(10),
  timeRange: z
    .enum(["short_term", "medium_term", "long_term"])
    .default("medium_term"),
});

export interface TopSongsResult {
  songs: Song[];
}