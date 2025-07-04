import { z } from "zod";

type PlaylistImage = {
  url: string;
  height: number | null;
  width: number | null;
};

type PlaylistOwner = {
  id: string;
  display_name: string;
  external_urls: {
    spotify: string;
  };
};

export type SpotifyPlaylist = {
  id: string;
  name: string;
  description: string | null;
  images: PlaylistImage[];
  owner: PlaylistOwner;
  public: boolean;
  tracks: {
    total: number;
  };
  external_urls: {
    spotify: string;
  };
  uri: string;
  type: string;
};

export type PlaylistsResponse = {
  items: SpotifyPlaylist[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string | null;
  previous: string | null;
};