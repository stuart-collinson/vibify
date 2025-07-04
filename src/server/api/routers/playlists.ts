import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "vib/server/api/trpc";
import { spotifyApiRequest } from "vib/server/api/routers/general";
import { type PlaylistsResponse } from "vib/types/spotify/playlists";

export const playlistsRouter = createTRPCRouter({
  getPlaylistCount: protectedProcedure.query(
    async ({ ctx }): Promise<{ count: number }> => {
      const accessToken = ctx.session.user.accessToken;

      if (!accessToken) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No access token available",
        });
      }

      try {
        const data = await spotifyApiRequest<PlaylistsResponse>(
          accessToken,
          "/me/playlists",
          {
            limit: 1,
            offset: 0,
          },
        );

        return {
          count: data.total,
        };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch playlist count",
          cause: error,
        });
      }
    },
  ),
});
