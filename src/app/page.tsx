"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { SpotifyLogin } from "vib/components/SpotifyLogin";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Session data:", session);
    }
  }, [session, status]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4 text-white">
      <div className="container flex flex-col items-center justify-center">
        <SpotifyLogin />
      </div>
    </main>
  );
}
