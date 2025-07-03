"use client";

import { Button } from "vib/components/ui/button";
import { LogOut, Play } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export const Header = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="border-b border-gray-800 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200">
            <div className="relative">
              <div className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/25">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <Play className="relative z-10 h-5 w-5 transform text-black transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full bg-emerald-400" />
            </div>
            <h1 className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-2xl font-black text-transparent">
              Vibify
            </h1>
          </Link>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-gray-700 bg-gray-900 transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
