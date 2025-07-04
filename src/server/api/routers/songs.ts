import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "vib/server/api/trpc";
import { spotifyApiRequest } from "vib/server/api/routers/general";
import {
  GetTopSongsInput,
  type SpotifySong,
  type TopSongsResponse,
  type TopSongsResult,
} from "vib/types/spotify/songs";

export const songsRouter = createTRPCRouter({
  getTopSongs: protectedProcedure
    .input(GetTopSongsInput)
    .query(async ({ ctx, input }): Promise<TopSongsResult> => {
      const accessToken = ctx.session.user.accessToken;

      if (!accessToken) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No access token available",
        });
      }

      try {
        const data = await spotifyApiRequest<TopSongsResponse>(
          accessToken,
          "/me/top/tracks",
          {
            limit: input.limit,
            time_range: input.timeRange,
          },
        );

        return {
          songs: data.items.map((song: SpotifySong) => ({
            id: song.id,
            name: song.name,
            artists: song.artists,
            album: song.album,
            popularity: song.popularity,
            spotifyUrl: song.external_urls.spotify,
          })),
        };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch top songs",
          cause: error,
        });
      }
    }),
});
