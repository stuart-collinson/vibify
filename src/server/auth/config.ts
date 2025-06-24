import { type NextAuthConfig } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    })
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
} satisfies NextAuthConfig;
