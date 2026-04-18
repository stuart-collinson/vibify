"use client";

import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { httpBatchStreamLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { useEffect, useRef, useState } from "react";
import SuperJSON from "superjson";
import { type AppRouter } from "vib/server/api/root";
import { createQueryClient } from "./query-client";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

let clientQueryClientSingleton: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") return createQueryClient();
  clientQueryClientSingleton ??= createQueryClient();
  return clientQueryClientSingleton;
};

export const api = createTRPCReact<AppRouter>();
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const signOutInProgress = useRef(false);

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchStreamLink({
          transformer: SuperJSON,
          url: getBaseUrl() + "/api/trpc",
          headers: () => {
            const headers = new Headers();
            headers.set("x-trpc-source", "nextjs-react");
            return headers;
          },
          fetch: (url, options) =>
            fetch(url, { ...options, signal: AbortSignal.timeout(10_000) }),
        }),
      ],
    }),
  );

  useEffect(() => {
    return queryClient.getQueryCache().subscribe((event) => {
      if (event?.type !== "updated" || event.query.state.status !== "error") return;

      const error = event.query.state.error as { data?: { code?: string } };
      const errorCode = error?.data?.code;

      if (errorCode === "UNAUTHORIZED" || errorCode === "FORBIDDEN") {
        if (signOutInProgress.current) return;
        signOutInProgress.current = true;
        toast.error(
          errorCode === "UNAUTHORIZED"
            ? "Session expired. Please log in again."
            : "Access denied. You may not have the required permissions.",
        );
        void signOut({ callbackUrl: "/" });
        return;
      }

      if (errorCode === "TOO_MANY_REQUESTS") {
        toast.error("Rate limit exceeded. Please try again in a few minutes.");
        return;
      }

      if (errorCode === "INTERNAL_SERVER_ERROR") {
        toast.error("Something went wrong. Please try again later.");
      }
    });
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}

const getBaseUrl = () => {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://127.0.0.1:${process.env.PORT ?? 3000}`;
};
