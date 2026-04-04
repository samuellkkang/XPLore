import { memo } from "react";
import { LeaderboardEntry } from "@/lib/mock-data";

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  rank: number;
}

function getRankColorClass(rank: number): string {
  if (rank === 1) return "text-yellow-500";
  if (rank === 2) return "text-gray-400";
  if (rank === 3) return "text-amber-600";
  return "text-gray-600";
}

function getInitial(displayName: string): string {
  return displayName.charAt(0).toUpperCase();
}

// Server Component - memoized to prevent unnecessary re-renders
const LeaderboardRow = memo(function LeaderboardRow({ entry, rank }: LeaderboardRowProps) {
  const rankColorClass = getRankColorClass(rank);

  const avatar = entry.avatarUrl ? (
    <img
      src={entry.avatarUrl}
      alt={entry.displayName}
      className="w-10 h-10 rounded-full object-cover"
    />
  ) : (
    <div className="w-10 h-10 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white font-semibold text-sm">
      {getInitial(entry.displayName)}
    </div>
  );

  const levelBadge = (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      Lvl {entry.level}
    </span>
  );

  return (
    <>
      {/* Desktop: horizontal row ≥768px */}
      <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
        <span className={`w-6 text-center font-bold text-base ${rankColorClass}`}>
          {rank}
        </span>
        <div className="flex-shrink-0">{avatar}</div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-xs text-gray-900">{entry.displayName}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-xs font-medium text-gray-700">{(entry.xp ?? 0)} xp</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-800">
              Lvl {entry.level}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile: compact card <768px */}
      <div className="flex md:hidden flex-col gap-2 p-3 bg-white rounded-lg border border-gray-100">
        <div className="flex items-center gap-3">
          <span className={`text-xl font-bold w-6 text-center ${rankColorClass}`}>
            {rank}
          </span>
          <div className="flex-shrink-0">{avatar}</div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{entry.displayName}</p>
          </div>
        </div>
        <div className="flex items-center justify-between pl-9">
          <span className="text-sm font-medium text-gray-700">{(entry.xp ?? 0)} xp</span>
          {levelBadge}
        </div>
      </div>
    </>
  );
});

export default LeaderboardRow;