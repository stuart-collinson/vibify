import { artistsRouter } from "vib/server/api/routers/artists";
import { generalRouter } from "vib/server/api/routers/general";
import { songsRouter } from "vib/server/api/routers/songs";
import { createCallerFactory, createTRPCRouter } from "vib/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  general: generalRouter,
  artists: artistsRouter,
  songs: songsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
