import { Play, Sparkles } from "lucide-react";
import { CLASS_SIZES } from "vib/lib/constants";
import type { AnimatedLogoProps } from "vib/types/animation";

export function AnimatedLogo({
  showSpinner = false,
  spinnerText = "Loading your music data...",
  size = "md",
  className = "",
}: AnimatedLogoProps) {
  const classes = CLASS_SIZES[size];

  return (
    <div className={`text-center ${className}`}>
      {/* Animated Logo */}
      <div className="relative mb-8 inline-block">
        <div
          className={`group relative flex ${classes.logo} animate-pulse items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-2xl shadow-emerald-500/50`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <Play
            className={`relative z-10 ${classes.icon} transform text-black transition-transform duration-300 group-hover:scale-110`}
          />
        </div>
        <div
          className={`absolute -top-2 -right-2 flex ${classes.sparkle} animate-bounce items-center justify-center rounded-full bg-emerald-400`}
        >
          <Sparkles className={`${classes.sparkleIcon} text-black`} />
        </div>
      </div>

      <h1 className={`relative mb-4 ${classes.title} font-black`}>
        <span className="animate-pulse bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent">
          Vibify
        </span>
        <div className="animate-glitch absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent opacity-0">
          Vibify
        </div>
      </h1>

      <div className="space-y-3">
        <p
          className={`${classes.subtitle} font-light tracking-wide text-white`}
        >
          Your music,{" "}
          <span className="font-medium text-emerald-400">decoded</span>
        </p>
        {showSpinner && (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <div
              className={`${classes.spinner} animate-spin rounded-full border-2 border-emerald-400 border-t-transparent`}
            ></div>
            <span>{spinnerText}</span>
          </div>
        )}
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
    </div>
  );
}
