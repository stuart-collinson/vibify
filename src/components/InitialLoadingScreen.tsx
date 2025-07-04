"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "vib/trpc/react";
import { AnimatedLogo } from "vib/components/ui/animated-logo";
import { DEFAULT_TIME_RANGES } from "vib/lib/constants";

export const InitialLoadingScreen = () => {
  const { data: session, status } = useSession();
  const [isPrefetching, setIsPrefetching] = useState(false);
  const utils = api.useUtils();

  useEffect(() => {
    if (status === "authenticated" && session && !isPrefetching) {
      setIsPrefetching(true);

      const prefetchData = async () => {
        const timeRanges = DEFAULT_TIME_RANGES;

        const promises = timeRanges.flatMap((timeRange) => [
          utils.artists.getTopArtists.prefetch({
            limit: 50,
            timeRange,
          }),
          utils.songs.getTopSongs.prefetch({
            limit: 50,
            timeRange,
          }),
        ]);

        promises.push(
          utils.artists.getTopArtists.prefetch({
            limit: 5,
            timeRange: "long_term",
          }),
          utils.songs.getTopSongs.prefetch({
            limit: 5,
            timeRange: "long_term",
          }),
        );

        try {
          await Promise.all(promises);
        } catch (error) {
          console.warn("Failed to prefetch some data:", error);
        } finally {
          setIsPrefetching(false);
        }
      };

      void prefetchData();
    }
  }, [status, session, utils, isPrefetching]);

  if (status === "loading" || isPrefetching) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <AnimatedLogo
          showSpinner={true}
          spinnerText={
            status === "loading"
              ? "Signing you in..."
              : "Loading your music data..."
          }
        />
      </div>
    );
  }

  return null;
};
