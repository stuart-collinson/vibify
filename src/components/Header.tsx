"use client";

import { Button } from "vib/components/ui/button";
import { LogOut, Play } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export const Header = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error(error);
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="border-b border-gray-800 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-80"
          >
            <div className="relative">
              <div className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/25">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <Play className="relative z-10 h-5 w-5 transform text-black transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full bg-emerald-400" />
            </div>

            <h1 className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-3xl font-black text-transparent">
              Vibify
            </h1>
          </Link>

          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            variant="ghost"
            size="default"
            className="flex items-center gap-2 text-gray-300 transition-all duration-200 hover:bg-emerald-500/10 hover:text-emerald-400 disabled:opacity-50"
          >
            <LogOut
              className={`h-4 w-4 ${isLoggingOut ? "animate-spin" : ""}`}
            />

            <span className="hidden sm:inline">
              {isLoggingOut ? "Signing out..." : "Sign out"}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};
