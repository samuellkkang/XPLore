"use client";

import { useMemo, memo } from "react";
import LeaderboardRow from "@/components/LeaderboardRow";
import type { User, LeaderboardEntry } from "@/lib/mock-data";

interface LeaderboardViewProps {
  users: User[];
  currentUserId: string;
}

// Memoized to prevent unnecessary re-renders
const LeaderboardView = memo(function LeaderboardView({ users, currentUserId }: LeaderboardViewProps) {
  // Memoize the leaderboard rankings to avoid recalculating on every render
  const eventsAttendedRanking = useMemo(() => {
    return [...users]
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 5);
  }, [users]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border p-6">
      <h2 className="text-lg font-semibold text-[#2D6A4F] mb-4">
        Leaderboard
      </h2>
      <div className="space-y-2">
        {eventsAttendedRanking.map((user, index) => {
          const rank = index + 1;
          const leaderboardEntry: LeaderboardEntry = {
            id: user.id,
            displayName: user.displayName,
            city: user.city,
            xp: user.xp,
            level: user.level,
          };
          const isCurrentUser = user.id === currentUserId;

          return (
            <div
              key={user.id}
              className={isCurrentUser ? "ring-2 ring-[#2D6A4F] rounded-lg" : ""}
            >
              <LeaderboardRow entry={leaderboardEntry} rank={rank} />
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default LeaderboardView;