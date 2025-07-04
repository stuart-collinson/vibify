export const getPopularityColor = (popularity: number): string => {
  if (popularity >= 90) return "text-purple-400";
  if (popularity >= 80) return "text-emerald-400";
  if (popularity >= 60) return "text-yellow-400";
  if (popularity >= 40) return "text-orange-400";
  return "text-red-400";
};
