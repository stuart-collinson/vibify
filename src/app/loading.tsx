"use client";

import { Play, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-white">
      <div className="container flex flex-col items-center justify-center space-y-6">
        {/* Animated Logo */}
        <div className="text-center">
          <div className="relative mb-8 inline-block">
            <div className="group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-2xl shadow-emerald-500/50 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <Play className="relative z-10 h-10 w-10 transform text-black transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="absolute -top-2 -right-2 flex h-6 w-6 animate-bounce items-center justify-center rounded-full bg-emerald-400">
              <Sparkles className="h-3 w-3 text-black" />
            </div>
          </div>

          <h1 className="relative mb-4 text-6xl font-black">
            <span className="animate-pulse bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent">
              Vibify
            </span>
            <div className="animate-glitch absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent opacity-0">
              Vibify
            </div>
          </h1>

          <div className="space-y-3">
            <p className="text-xl font-light tracking-wide text-white">
              Your music,{" "}
              <span className="font-medium text-emerald-400">decoded</span>
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent"></div>
              <span>Loading your music insights...</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes glitch {
          0%,
          100% {
            opacity: 0;
            transform: translate(0);
          }
          2% {
            opacity: 1;
            transform: translate(-2px, 1px);
          }
          4% {
            opacity: 0;
            transform: translate(-2px, -1px);
          }
          6% {
            opacity: 1;
            transform: translate(2px, 1px);
          }
          8% {
            opacity: 0;
            transform: translate(1px, -1px);
          }
          10% {
            opacity: 1;
            transform: translate(-1px, 2px);
          }
          12% {
            opacity: 0;
          }
        }

        .animate-glitch {
          animation: glitch 8s infinite;
        }
      `}</style>
    </main>
  );
}
