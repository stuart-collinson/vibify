"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { RefreshCw } from "lucide-react";
import { Button } from "vib/components/ui/button";

interface DashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const DashboardError = ({ error, reset }: DashboardErrorProps) => {
  useEffect(() => {
    // Check if it's a token expiration error
    if (
      error.message.includes("401") ||
      error.message.includes("UNAUTHORIZED") ||
      error.message.includes("token") ||
      error.message.includes("expired") ||
      error.message.includes("Access token expired")
    ) {
      void signOut({ callbackUrl: "/" });
      return;
    }
  }, [error]);

  // If it's a token expiration error, show loading while redirecting
  if (
    error.message.includes("401") ||
    error.message.includes("UNAUTHORIZED") ||
    error.message.includes("token") ||
    error.message.includes("expired") ||
    error.message.includes("Access token expired")
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <RefreshCw className="mx-auto h-12 w-12 animate-spin text-emerald-400 mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Refreshing your session...
          </h2>
          <p className="text-gray-400">
            Redirecting you to login
          </p>
        </div>
      </div>
    );
  }

  // For other errors, show a loading state instead of crashing
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center">
        <RefreshCw className="mx-auto h-12 w-12 animate-spin text-emerald-400 mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">
          Loading your music data...
        </h2>
        <p className="text-gray-400 mb-6">
          Please wait while we fetch your latest listening data
        </p>
        <Button
          onClick={reset}
          className="bg-emerald-500 hover:bg-emerald-600 text-black"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    </div>
  );
};

export default DashboardError; 