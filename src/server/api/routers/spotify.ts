import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "vib/server/api/trpc";
import {
  GetTopArtistsInput,
  type SpotifyArtist,
  type TopArtistsResponse,
  type TopArtistsResult,
} from "vib/types/spotify/artists";

const spotifyApiRequest = async <T>(
  accessToken: string,
  endpoint: string,
  params?: Record<string, string | number>,
): Promise<T> => {
  const url = new URL(`https://api.spotify.com/v1${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as Record<
      string,
      unknown
    >;
    console.error("Spotify API error response:", errorData);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Spotify API error: ${response.status} ${response.statusText}`,
      cause: errorData,
    });
  }

  return response.json() as Promise<T>;
};

export const spotifyRouter = createTRPCRouter({
  tokenVerification: protectedProcedure.query(async ({ ctx }) => {
    const accessToken = ctx.session.user.accessToken;

    if (!accessToken) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "No access token available",
      });
    }

    try {
      const data = await spotifyApiRequest<{
        id: string;
        display_name: string;
      }>(accessToken, "/me");
      return { success: true, user: data };
    } catch (error) {
      throw error;
    }
  }),

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
});
