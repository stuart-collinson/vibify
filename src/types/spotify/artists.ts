import { z } from "zod";

export type ArtistImage = {
  url: string;
  height: number;
  width: number;
};

export type SpotifyArtist = {
  id: string;
  name: string;
  images: ArtistImage[];
  external_urls: {
    spotify: string;
  };
  popularity: number;
};

export type TopArtistsResponse = {
  items: SpotifyArtist[];
};

export type CleanArtist = {
  id: string;
  name: string;
  images: ArtistImage[];
  popularity: number;
  spotifyUrl: string;
};

// Schemas
export const GetTopArtistsInput = z.object({
  limit: z.number().min(1).max(50).default(10),
  timeRange: z
    .enum(["short_term", "medium_term", "long_term"])
    .default("medium_term"),
});

export interface TopArtistsResult {
  artists: CleanArtist[];
}

export type GetTopArtistsInputType = z.infer<typeof GetTopArtistsInput>;
