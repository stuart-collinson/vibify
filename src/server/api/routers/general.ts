import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "vib/server/api/trpc";

export const spotifyApiRequest = async <T>(
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

    // Check for token expiration (401 Unauthorized)
    if (response.status === 401) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Access token expired. Please log in again.",
        cause: errorData,
      });
    }

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Spotify API error: ${response.status} ${response.statusText}`,
      cause: errorData,
    });
  }

  return response.json() as Promise<T>;
};

export const generalRouter = createTRPCRouter({
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
});
