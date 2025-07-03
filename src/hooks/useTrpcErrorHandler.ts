"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import type { TRPCClientError } from "@trpc/client";
import type { AppRouter } from "vib/server/api/root";

interface UseTrpcErrorHandlerReturn {
  isTokenExpired: boolean;
  isOtherError: boolean;
}

const useTrpcErrorHandler = (error: TRPCClientError<AppRouter> | null): UseTrpcErrorHandlerReturn => {
  useEffect(() => {
    if (!error) return;

    // Check if it's a token expiration error
    if (
      (error.data as { code?: string })?.code === "UNAUTHORIZED" ||
      error.message.includes("401") ||
      error.message.includes("token") ||
      error.message.includes("expired") ||
      error.message.includes("Access token expired")
    ) {
      void signOut({ callbackUrl: "/" });
      return;
    }
  }, [error]);

  const isTokenExpired = Boolean(
    (error?.data as { code?: string })?.code === "UNAUTHORIZED" ||
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    error?.message.includes("401") ||
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    error?.message.includes("token") ||
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    error?.message.includes("expired") ||
    error?.message.includes("Access token expired")
  );

  return {
    isTokenExpired,
    isOtherError: Boolean(error && !isTokenExpired),
  };
};

export { useTrpcErrorHandler }; 