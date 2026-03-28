"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

interface XPProgressBarProps {
  currentXp: number
  levelCapXp: number
  level: number
}

export default function XPProgressBar({ currentXp, levelCapXp, level }: XPProgressBarProps) {
  const [progressValue, setProgressValue] = useState(0)

  const targetPercent = levelCapXp > 0 ? (currentXp / levelCapXp) * 100 : 0

  useEffect(() => {
    setProgressValue(0)
    const timer = setTimeout(() => {
      setProgressValue(targetPercent)
    }, 100)
    return () => clearTimeout(timer)
  }, [targetPercent])

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-[#2D6A4F]">Level {level}</span>
        <span className="text-muted-foreground">
          {currentXp} / {levelCapXp} XP
        </span>
      </div>
      <Progress
        value={progressValue}
        className="[&_[data-slot=progress-indicator]]:bg-[#F59E0B] [&_[data-slot=progress-indicator]]:transition-all [&_[data-slot=progress-indicator]]:duration-700"
      />
    </div>
  )
}
