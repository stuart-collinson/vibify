import type { TimeRange } from "vib/types/global";

export const DEFAULT_TIME_RANGES: TimeRange[] = [
  "short_term",
  "medium_term",
  "long_term",
] as const;

export const CLASS_SIZES = {
  sm: {
    logo: "h-12 w-12",
    icon: "h-6 w-6",
    sparkle: "h-4 w-4",
    sparkleIcon: "h-2 w-2",
    title: "text-3xl",
    subtitle: "text-sm",
    spinner: "h-3 w-3",
  },
  md: {
    logo: "h-20 w-20",
    icon: "h-10 w-10",
    sparkle: "h-6 w-6",
    sparkleIcon: "h-3 w-3",
    title: "text-6xl",
    subtitle: "text-xl",
    spinner: "h-4 w-4",
  },
  lg: {
    logo: "h-32 w-32",
    icon: "h-16 w-16",
    sparkle: "h-8 w-8",
    sparkleIcon: "h-4 w-4",
    title: "text-8xl",
    subtitle: "text-2xl",
    spinner: "h-6 w-6",
  },
};
