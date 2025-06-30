import { Button } from "vib/components/ui/button";
import type { LoginButtonProps } from "vib/types/login";

export const LoginButton = ({
  onClick,
  children = "Login with Spotify",
}: LoginButtonProps) => {
  return (
    <div className="group relative">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-25 blur transition duration-300 group-hover:opacity-75" />
      <Button
        className="relative w-full rounded-2xl border-2 border-emerald-500 bg-black px-8 py-4 text-lg font-bold text-white transition-all duration-300 group-hover:scale-105 hover:bg-emerald-500 hover:text-black active:scale-95"
        size="lg"
        onClick={onClick}
      >
        <span className="flex items-center justify-center gap-3">
          {children}
          <div className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
        </span>
      </Button>
    </div>
  );
};
