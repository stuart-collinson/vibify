"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { RefreshCw } from "lucide-react";
import { Button } from "vib/components/ui/button";
import { isAuthError } from "vib/lib/utils";

type SongsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const SongsError = ({ error, reset }: SongsErrorProps) => {
  useEffect(() => {
    if (isAuthError(error)) void signOut({ callbackUrl: "/" });
  }, [error]);

  if (isAuthError(error)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <RefreshCw className="mx-auto h-12 w-12 animate-spin text-emerald-400 mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Refreshing your session...</h2>
          <p className="text-gray-400">Redirecting you to login</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center">
        <RefreshCw className="mx-auto h-12 w-12 animate-spin text-emerald-400 mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Loading your songs data...</h2>
        <p className="text-gray-400 mb-6">Please wait while we fetch your latest listening data</p>
        <Button onClick={reset} className="bg-emerald-500 hover:bg-emerald-600 text-black">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    </div>
  );
};

export default SongsError;
