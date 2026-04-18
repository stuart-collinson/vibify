import { Skeleton } from "vib/components/ui/skeleton";

const SongsLoading = () => {
  return (
    <div className="animate-in fade-in duration-1000">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-white">Your Top Songs</h1>
        <p className="text-gray-400">Discover your most listened to songs</p>
      </div>

      <div className="flex gap-2 mb-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-32 rounded-xl" />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="h-64 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
};

export default SongsLoading;
