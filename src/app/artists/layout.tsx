"use client";

import { Header } from "vib/components/Header";
import type { DashboardLayoutProps } from "vib/types/dashboard";

export default function ArtistsLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}; 