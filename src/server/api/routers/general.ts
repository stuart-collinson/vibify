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

    // Check for forbidden access (403 Forbidden)
    if (response.status === 403) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message:
          "Access forbidden. Your account may not have the required permissions.",
        cause: errorData,
      });
    }

    // Check for rate limiting (429 Too Many Requests)
    if (response.status === 429) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Rate limit exceeded. Please try again later.",
        cause: errorData,
      });
    }

    // Handle other client errors (4xx)
    if (response.status >= 400 && response.status < 500) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Spotify API error: ${response.status} ${response.statusText}`,
        cause: errorData,
      });
    }

    // Handle server errors (5xx)
    if (response.status >= 500) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Spotify API server error: ${response.status} ${response.statusText}`,
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
