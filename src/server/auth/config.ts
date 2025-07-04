import { type NextAuthConfig } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authConfig = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: "user-read-email user-read-private user-top-read playlist-read-private playlist-read-collaborative user-library-read",
        },
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
        accessToken: token.accessToken as string,
      },
    }),
    jwt: ({ token, account }) => {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  // Add debug logging in development
  debug: process.env.NODE_ENV === "development",
  // Add better error handling
  logger: {
    error(code, ...message) {
      console.error(`[AUTH ERROR] ${code}:`, ...message);
    },
    warn(code, ...message) {
      console.warn(`[AUTH WARN] ${code}:`, ...message);
    },
    debug(code, ...message) {
      if (process.env.NODE_ENV === "development") {
        console.log(`[AUTH DEBUG] ${code}:`, ...message);
      }
    },
  },
} satisfies NextAuthConfig;
