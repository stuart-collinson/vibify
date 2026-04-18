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

export type SpotifyArtistDetails = {
  id: string;
  name: string;
  images: ArtistImage[];
  external_urls: {
    spotify: string;
  };
  popularity: number;
  followers: {
    total: number;
  };
  genres: string[];
  type: string;
  uri: string;
};

export type TopArtistsResponse = {
  items: SpotifyArtist[];
};

export type Artist = {
  id: string;
  name: string;
  images: ArtistImage[];
  popularity: number;
  spotifyUrl: string;
};

export type ArtistDetails = {
  id: string;
  name: string;
  images: ArtistImage[];
  popularity: number;
  spotifyUrl: string;
  followers: number;
  genres: string[];
  type: string;
  uri: string;
};

export type ArtistsTableProps = {
  artists: Artist[];
};

export type ArtistCardProps = {
  artist: Artist;
  rank: number;
  details?: ArtistDetails;
};

// Schemas
export const GetTopArtistsInput = z.object({
  limit: z.number().min(1).max(50).default(10),
  timeRange: z
    .enum(["short_term", "medium_term", "long_term"])
    .default("medium_term"),
});

export const GetArtistDetailsInput = z.object({
  artistId: z.string().min(1),
});

export const GetArtistsDetailsInput = z.object({
  artistIds: z.array(z.string().min(1)).min(1).max(50),
});

export type SpotifyArtistsResponse = {
  artists: SpotifyArtistDetails[];
};

export type TopArtistsResult = {
  artists: Artist[];
};

export type ArtistDetailsResult = {
  artist: ArtistDetails;
};

export type ArtistsDetailsResult = {
  artists: ArtistDetails[];
};