"use client";

import { BadgeDefinition } from "@/lib/mock-data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Lock } from "lucide-react";

interface BadgeShelfProps {
  badges: BadgeDefinition[];
  earnedBadgeIds: string[];
}

export default function BadgeShelf({ badges, earnedBadgeIds }: BadgeShelfProps) {
  return (
    <TooltipProvider>
      <div className="overflow-x-auto flex flex-row gap-4 py-2">
        {badges.map((badge) => {
          const isEarned = earnedBadgeIds.includes(badge.id);

          return (
            <div key={badge.id} className="flex flex-col items-center gap-1 flex-shrink-0">
              {isEarned ? (
                <Tooltip>
                  <TooltipTrigger
                    className="relative rounded-full w-16 h-16 flex items-center justify-center text-2xl bg-amber-100 cursor-pointer transition-transform hover:scale-110 hover:shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                    aria-label={badge.name}
                  >
                    {badge.icon}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{badge.description}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div
                  className="relative rounded-full w-16 h-16 flex items-center justify-center text-2xl bg-gray-100 grayscale"
                  aria-label={`${badge.name} (locked)`}
                >
                  {badge.icon}
                  <Lock
                    className="absolute bottom-0 right-0 w-4 h-4 text-gray-500 bg-white rounded-full p-0.5"
                    aria-hidden="true"
                  />
                </div>
              )}
              <span className="text-xs text-center text-gray-600 max-w-[64px] leading-tight">
                {badge.name}
              </span>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
