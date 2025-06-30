"use client"

import { Clock } from "lucide-react"

interface HoursListenedStatProps {
  value: string
}

export function HoursListenedStat({ value }: HoursListenedStatProps) {
  return (
    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all duration-300 hover:scale-105 group">
      <div className="text-center">
        <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
        <p className="text-3xl font-bold text-white mb-1">{value}</p>
        <p className="text-sm text-gray-300">Hours Listened</p>
      </div>
    </div>
  )
} 