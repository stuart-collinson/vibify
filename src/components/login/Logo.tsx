import { Headphones } from "lucide-react";
import { AnimatedLogo } from "vib/components/ui/animated-logo";

export const Logo = () => {
  return (
    <div className="mb-12">
      <AnimatedLogo />
      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
        <Headphones className="h-4 w-4" />
        <span>Spotify insights reimagined</span>
      </div>
    </div>
  );
};
