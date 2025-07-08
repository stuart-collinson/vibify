"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import type { TRPCClientErrorLike } from "@trpc/client";
import type { AppRouter } from "vib/server/api/root";

interface UseTrpcErrorHandlerReturn {
  isTokenExpired: boolean;
  isForbidden: boolean;
  isRateLimited: boolean;
  isOtherError: boolean;
}

const useTrpcErrorHandler = (
  error: TRPCClientErrorLike<AppRouter> | null,
): UseTrpcErrorHandlerReturn => {
  useEffect(() => {
    if (!error) return;

    const errorCode = (error.data as { code?: string })?.code;

    // Handle token expiration (401)
    if (
      errorCode === "UNAUTHORIZED" ||
      error.message.includes("401") ||
      error.message.includes("token") ||
      error.message.includes("expired") ||
      error.message.includes("Access token expired")
    ) {
      toast.error("Session expired. Please log in again.");
      void signOut({ callbackUrl: "/" });
      return;
    }

    // Handle forbidden access (403)
    if (errorCode === "FORBIDDEN") {
      toast.error("Access denied. You may not have the required permissions.");
      void signOut({ callbackUrl: "/" });
      return;
    }

    // Handle rate limiting (429)
    if (errorCode === "TOO_MANY_REQUESTS") {
      toast.error("Rate limit exceeded. Please try again in a few minutes.");
      return;
    }

    // Handle other errors
    if (errorCode === "BAD_REQUEST") {
      toast.error("Invalid request. Please try again.");
      return;
    }

    if (errorCode === "INTERNAL_SERVER_ERROR") {
      toast.error("Something went wrong. Please try again later.");
      return;
    }

    // Fallback for unknown errors
    toast.error("An unexpected error occurred. Please try again.");
  }, [error]);

  const errorCode = (error?.data as { code?: string })?.code;

  const isTokenExpired = Boolean(
    errorCode === "UNAUTHORIZED" ||
      (error?.message?.includes("401") ?? false) ||
      (error?.message?.includes("token") ?? false) ||
      (error?.message?.includes("expired") ?? false) ||
      (error?.message?.includes("Access token expired") ?? false),
  );

  const isForbidden = errorCode === "FORBIDDEN";
  const isRateLimited = errorCode === "TOO_MANY_REQUESTS";

  return {
    isTokenExpired,
    isForbidden,
    isRateLimited,
    isOtherError: Boolean(
      error && !isTokenExpired && !isForbidden && !isRateLimited,
    ),
  };
};

export { useTrpcErrorHandler };
