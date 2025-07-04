"use client";

import { AnimatedLogo } from "vib/components/ui/animated-logo";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-white">
      <div className="container flex flex-col items-center justify-center space-y-6">
        <AnimatedLogo 
          showSpinner={true}
          spinnerText="Loading your music insights..."
        />
      </div>
    </main>
  );
}
