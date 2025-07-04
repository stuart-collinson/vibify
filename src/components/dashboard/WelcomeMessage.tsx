import { Avatar, AvatarFallback, AvatarImage } from "vib/components/ui/avatar";
import { PlaylistsStat } from "./PlaylistsStat";
import { isEasterEggUser } from "vib/lib/easter-eggs";

type WelcomeMessageProps = {
  name?: string | null;
  image?: string | null;
  playlistsCount?: number | null;
};

export const WelcomeMessage = ({
  name,
  image,
  playlistsCount,
}: WelcomeMessageProps) => {
  const displayName = name ?? "there";
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const spiceyName = isEasterEggUser(name ?? "");

  return (
    <div className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={image ?? ""} alt={name ?? "User"} />
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 font-semibold text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-emerald-500">Hey, </span>
            <span className="text-white">{displayName}</span>
            <span className="text-emerald-500">
              !{spiceyName ? "!! 🎤" : null}
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here&apos;s your music listening overview
          </p>
        </div>
      </div>
      <PlaylistsStat value={playlistsCount ?? 0} />
    </div>
  );
};
