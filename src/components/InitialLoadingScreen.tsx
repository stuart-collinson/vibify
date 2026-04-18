"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { api } from "vib/trpc/react";
import { AnimatedLogo } from "vib/components/ui/animated-logo";
import { DEFAULT_TIME_RANGES } from "vib/lib/constants";

export const InitialLoadingScreen = () => {
  const { data: session, status } = useSession();
  const [isPrefetching, setIsPrefetching] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const hasPrefetched = useRef(false);
  const utils = api.useUtils();

  useEffect(() => {
    if (status !== "authenticated" || !session || hasPrefetched.current) return;

    hasPrefetched.current = true;
    setIsPrefetching(true);

    const prefetchData = async () => {
      const promises = DEFAULT_TIME_RANGES.flatMap((timeRange) => [
        utils.artists.getTopArtists.prefetch({ limit: 50, timeRange }),
        utils.songs.getTopSongs.prefetch({ limit: 50, timeRange }),
      ]);
      promises.push(utils.playlists.getPlaylistCount.prefetch());

      try {
        await Promise.allSettled(promises);
      } catch (error) {
        console.warn("Failed to prefetch some data:", error);
      } finally {
        setIsPrefetching(false);
        setIsFadingOut(true);
        setTimeout(() => setIsHidden(true), 300);
      }
    };

    void prefetchData();
  }, [status, session, utils]);

  if (status === "loading" || isPrefetching || isFadingOut) {
    if (isHidden) return null;

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ${
          isFadingOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <AnimatedLogo
          showSpinner={true}
          spinnerText={
            status === "loading" ? "Signing you in..." : "Loading your music data..."
          }
        />
      </div>
    );
  }

  return null;
};
