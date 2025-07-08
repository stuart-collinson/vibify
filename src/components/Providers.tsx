"use client";

import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "vib/trpc/react";
import { InitialLoadingScreen } from "./InitialLoadingScreen";
import { Toaster } from "vib/components/ui/sonner";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <TRPCReactProvider>
        <InitialLoadingScreen />
        {children}
        <Toaster />
      </TRPCReactProvider>
    </SessionProvider>
  );
};
