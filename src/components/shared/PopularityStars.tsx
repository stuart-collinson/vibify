import { Star } from "lucide-react";

type PopularityStarsProps = {
  popularity: number;
};

export const PopularityStars = ({ popularity }: PopularityStarsProps) => {
  const stars = Math.ceil(popularity / 20);
  return (
    <div className="flex justify-center gap-0.5 sm:gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < stars ? "fill-current text-emerald-400" : "text-gray-600"}`}
        />
      ))}
    </div>
  );
};
