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
  { value: "short_term", label: "Last month" },
  { value: "medium_term", label: "Last 6 months" },
  { value: "long_term", label: "All time" },
] as const;

export const TimeRangeButtons = ({
  currentTimeRange,
}: TimeRangeButtonsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const utils = api.useUtils();

  const handleTimeRangeChange = (timeRange: string) => {
    void utils.songs.getTopSongs.prefetch({
      limit: 50,
      timeRange: timeRange as TimeRange,
    });

    const params = new URLSearchParams(searchParams);
    params.set("timeRange", timeRange);
    router.push(`/songs?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      {timeRangeOptions.map((option) => (
        <Button
          key={option.value}
          onClick={() => handleTimeRangeChange(option.value)}
          size="lg"
          className={cn(
            "rounded-xl px-6 py-3 font-medium transition-all duration-200",
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
          {option.label}
        </Button>
      ))}
    </div>
  );
}; 