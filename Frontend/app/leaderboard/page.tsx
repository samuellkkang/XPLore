"use client";

import { users, groups, LeaderboardEntry } from "@/lib/mock-data";

const localEntries: LeaderboardEntry[] = [...users]
  .sort((a, b) => b.xp - a.xp)
  .map((u) => ({ id: u.id, displayName: u.displayName, city: u.city, xp: u.xp, level: u.level }));

const myGroupEntries: LeaderboardEntry[] = [...users]
  .slice(0, 5)
  .sort((a, b) => b.xp - a.xp)
  .map((u) => ({ id: u.id, displayName: u.displayName, city: u.city, xp: u.xp, level: u.level }));

const groupEntries: LeaderboardEntry[] = [...groups]
  .sort((a, b) => b.aggregateXp - a.aggregateXp)
  .map((g) => ({ id: g.id, displayName: g.name, city: g.city, xp: g.aggregateXp, level: 1 }));

function rowBg(rank: number) {
  if (rank === 1) return "bg-yellow-50";
  if (rank === 2) return "bg-gray-100";
  if (rank === 3) return "bg-amber-50";
  return "";
}

function rankColor(rank: number) {
  if (rank === 1) return "text-yellow-500";
  if (rank === 2) return "text-gray-400";
  if (rank === 3) return "text-amber-600";
  return "text-gray-500";
}

function LeaderboardTable({
  title,
  entries,
  valueLabel,
}: {
  title: string;
  entries: LeaderboardEntry[];
  valueLabel: string;
}) {
  return (
    <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
        <h2 className="text-sm font-semibold text-[#2D6A4F]">{title}</h2>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wide">
            <th className="px-3 py-2 text-left w-8">#</th>
            <th className="px-3 py-2 text-left">Name</th>
            <th className="px-3 py-2 text-center">Level</th>
            <th className="px-3 py-2 text-right">{valueLabel}</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={entry.id} className={`border-b border-gray-50 transition-colors ${rowBg(i + 1)}`}>
              <td className={`px-3 py-2.5 font-bold ${rankColor(i + 1)}`}>{i + 1}</td>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    {entry.displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">{entry.displayName}</p>
                    <p className="text-xs text-gray-400 truncate">{entry.city}</p>
                  </div>
                </div>
              </td>
              <td className="px-3 py-2.5 text-center">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Lvl {entry.level}
                </span>
              </td>
              <td className="px-3 py-2.5 text-right">
                <span className="font-semibold text-gray-800">{(entry.xp ?? 0).toLocaleString()}</span>
                <span className="ml-1 text-xs text-gray-400">{valueLabel}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2D6A4F] mb-6 text-center">Leaderboards</h1>

        <div className="flex flex-col xl:flex-row gap-4">
          <LeaderboardTable title="🏆 Local" entries={localEntries} valueLabel="xp" />
          <LeaderboardTable title="👥 My Group" entries={myGroupEntries} valueLabel="xp" />
          <LeaderboardTable title="🏢 Between Groups" entries={groupEntries} valueLabel="xp" />
        </div>

        <p className="mt-6 text-xs text-gray-400 text-center">
          Display names are used to protect volunteer privacy.
        </p>
      </div>
    </main>
  );
}
