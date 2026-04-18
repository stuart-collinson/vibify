import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const formatFollowers = (followers: number): string => {
  if (followers >= 1_000_000) return `${(followers / 1_000_000).toFixed(1)}M`
  if (followers >= 1_000) return `${(followers / 1_000).toFixed(1)}K`
  return followers.toString()
}

export const isAuthError = (error: Error): boolean =>
  error.message.includes("401") ||
  error.message.includes("UNAUTHORIZED") ||
  error.message.includes("token") ||
  error.message.includes("expired") ||
  error.message.includes("Access token expired")
