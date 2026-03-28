"use client"

import { memo } from "react"
import XPProgressBar from "./XPProgressBar"

interface PageHeaderProps {
  displayName: string
  eventsAttended: number
  level: number
  currentXp: number
  levelCapXp: number
}

// Memoized to prevent unnecessary re-renders when parent re-renders
const PageHeader = memo(function PageHeader({
  displayName,
  eventsAttended,
  level,
  currentXp,
  levelCapXp,
}: PageHeaderProps) {
  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm border border-border">
      {/* Greeting with user display name */}
      <h1 className="text-3xl font-bold text-[#2D6A4F]">
        Hey, {displayName} 👋
      </h1>

      {/* Stats section */}
      <div className="flex items-center gap-6">
        {/* Events attended count */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Events Attended:</span>
          <span className="text-lg font-semibold text-[#2D6A4F]">
            {eventsAttended}
          </span>
        </div>

        {/* Level badge */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Level:</span>
          <div className="px-3 py-1 bg-[#2D6A4F] text-white rounded-full text-sm font-semibold">
            {level}
          </div>
        </div>
      </div>

      {/* XP Progress Bar */}
      <XPProgressBar currentXp={currentXp} levelCapXp={levelCapXp} level={level} />
    </div>
  )
})

export default PageHeader
