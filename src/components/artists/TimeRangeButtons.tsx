"use client";

import { Button } from "vib/components/ui/button";
import { cn } from "vib/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "vib/trpc/react";
import type { TimeRange } from "vib/types/global";

type TimeRangeButtonsProps = {
  currentTimeRange: string;
};

const timeRangeOptions = [
  { value: "short_term", label: "Last month", shortLabel: "Month" },
  { value: "medium_term", label: "Last 6 months", shortLabel: "6 Months" },
  { value: "long_term", label: "All time", shortLabel: "All Time" },
] as const;

export const TimeRangeButtons = ({
  currentTimeRange,
}: TimeRangeButtonsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const utils = api.useUtils();

  const handleTimeRangeChange = (timeRange: string) => {
    void utils.artists.getTopArtists.prefetch({
      limit: 50,
      timeRange: timeRange as TimeRange,
    });

    const params = new URLSearchParams(searchParams);
    params.set("timeRange", timeRange);
    router.push(`/artists?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      {timeRangeOptions.map((option) => (
        <Button
          key={option.value}
          onClick={() => handleTimeRangeChange(option.value)}
          size="lg"
          className={cn(
            "flex-1 rounded-xl px-3 py-2 font-medium transition-all duration-200 sm:flex-none sm:px-6 sm:py-3",
            "border border-gray-700 hover:border-emerald-500/50",
            "bg-gray-900/50 hover:bg-gray-800/50",
            "text-gray-300 hover:text-white",
            currentTimeRange === option.value && [
              "border-emerald-500/50 bg-emerald-500/10",
              "text-emerald-300 shadow-lg shadow-emerald-500/20",
              "hover:bg-emerald-500/20 hover:text-emerald-200",
            ],
          )}
        >
          <span className="sm:hidden">{option.shortLabel}</span>
          <span className="hidden sm:inline">{option.label}</span>
        </Button>
      ))}
    </div>
  );
};
