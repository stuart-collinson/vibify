import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "vib/server/api/trpc";
import { spotifyApiRequest } from "vib/server/api/routers/general";
import {
  GetTopArtistsInput,
  GetArtistDetailsInput,
  GetArtistsDetailsInput,
  type SpotifyArtist,
  type SpotifyArtistDetails,
  type SpotifyArtistsResponse,
  type TopArtistsResponse,
  type TopArtistsResult,
  type ArtistDetailsResult,
  type ArtistsDetailsResult,
} from "vib/types/spotify/artists";

export const artistsRouter = createTRPCRouter({
  getTopArtists: protectedProcedure
    .input(GetTopArtistsInput)
    .query(async ({ ctx, input }): Promise<TopArtistsResult> => {
      const accessToken = ctx.session.user.accessToken;

      if (!accessToken) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No access token available",
        });
      }

      try {
        const data = await spotifyApiRequest<TopArtistsResponse>(
          accessToken,
          "/me/top/artists",
          {
            limit: input.limit,
            time_range: input.timeRange,
          },
        );

        return {
          artists: data.items.map((artist: SpotifyArtist) => ({
            id: artist.id,
            name: artist.name,
            images: artist.images,
            popularity: artist.popularity,
            spotifyUrl: artist.external_urls.spotify,
          })),
        };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch top artists",
          cause: error,
        });
      }
    }),

  getArtistsDetails: protectedProcedure
    .input(GetArtistsDetailsInput)
    .query(async ({ ctx, input }): Promise<ArtistsDetailsResult> => {
      const accessToken = ctx.session.user.accessToken;

      if (!accessToken) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "No access token available" });
      }

      try {
        const data = await spotifyApiRequest<SpotifyArtistsResponse>(
          accessToken,
          "/artists",
          { ids: input.artistIds.join(",") },
        );

        return {
          artists: data.artists.map((artist: SpotifyArtistDetails) => ({
            id: artist.id,
            name: artist.name,
            images: artist.images,
            popularity: artist.popularity,
            spotifyUrl: artist.external_urls.spotify,
            followers: artist.followers.total,
            genres: artist.genres,
            type: artist.type,
            uri: artist.uri,
          })),
        };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch artist details",
          cause: error,
        });
      }
    }),

  getArtistDetails: protectedProcedure
    .input(GetArtistDetailsInput)
    .query(async ({ ctx, input }): Promise<ArtistDetailsResult> => {
      const accessToken = ctx.session.user.accessToken;

      if (!accessToken) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No access token available",
        });
      }

      try {
        const data = await spotifyApiRequest<SpotifyArtistDetails>(
          accessToken,
          `/artists/${input.artistId}`,
        );

        return {
          artist: {
            id: data.id,
            name: data.name,
            images: data.images,
            popularity: data.popularity,
            spotifyUrl: data.external_urls.spotify,
            followers: data.followers.total,
            genres: data.genres,
            type: data.type,
            uri: data.uri,
          },
        };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch artist details",
          cause: error,
        });
      }
    }),
});
