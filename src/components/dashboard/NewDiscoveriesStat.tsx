"use client"

import { TrendingUp } from "lucide-react"

interface NewDiscoveriesStatProps {
  value: string
}

export function NewDiscoveriesStat({ value }: NewDiscoveriesStatProps) {
  return (
    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl p-6 border border-gray-800 hover:border-purple-500/30 transition-all duration-300 hover:scale-105 group">
      <div className="text-center">
        <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
        <p className="text-3xl font-bold text-white mb-1">{value}</p>
        <p className="text-sm text-gray-300">New Discoveries</p>
      </div>
    </div>
  )
} 