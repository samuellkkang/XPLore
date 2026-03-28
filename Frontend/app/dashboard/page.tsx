"use client";

import Link from "next/link";
import {
  currentUser,
  users,
  badgeDefinitions,
  upcomingSignups,
  opportunities,
  type LeaderboardEntry,
} from "@/lib/mock-data";
import XPProgressBar from "@/components/XPProgressBar";
import BadgeShelf from "@/components/BadgeShelf";
import ImpactStoryCard from "@/components/ImpactStoryCard";
import LeaderboardRow from "@/components/LeaderboardRow";

const levelCapXp = currentUser.level * 300;

const opportunitiesCompleted = upcomingSignups.filter(
  (s) => s.status === "confirmed"
).length;

const leaderboardTop3: LeaderboardEntry[] = [...users]
  .sort((a, b) => b.xp - a.xp)
  .slice(0, 3)
  .map((u) => ({
    id: u.id,
    displayName: u.displayName,
    city: u.city,
    xp: u.xp,
    level: u.level,
  }));

export default function DashboardPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Welcome header */}
      <section>
        <h1 className="text-3xl font-bold text-[#2D6A4F]">
          Welcome back, {currentUser.displayName}!
        </h1>
        <p className="text-gray-500 mt-1">Here&apos;s your volunteer progress at a glance.</p>
      </section>

      {/* XP Progress Bar */}
      <section>
        <XPProgressBar
          currentXp={currentUser.xp}
          levelCapXp={levelCapXp}
          level={currentUser.level}
        />
      </section>

      {/* Stats row */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-[#2D6A4F]">{currentUser.xp.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">Total XP</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-[#2D6A4F]">{currentUser.level}</p>
            <p className="text-sm text-gray-500 mt-1">Level</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-[#F59E0B]">{currentUser.streak}</p>
            <p className="text-sm text-gray-500 mt-1">Week Streak 🔥</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-[#2D6A4F]">{opportunitiesCompleted}</p>
            <p className="text-sm text-gray-500 mt-1">Completed</p>
          </div>
        </div>
      </section>

      {/* Badge Shelf */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Your Badges</h2>
        <BadgeShelf badges={badgeDefinitions} earnedBadgeIds={currentUser.badges} />
      </section>

      {/* Upcoming Events */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Upcoming Events</h2>
        <div className="space-y-3">
          {upcomingSignups.map((signup) => {
            const opp = opportunities.find((o) => o.id === signup.opportunityId);
            if (!opp) return null;
            const date = new Date(opp.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const statusColor =
              signup.status === "confirmed"
                ? "bg-green-100 text-green-800"
                : signup.status === "waitlisted"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-700";

            return (
              <div
                key={signup.opportunityId}
                className="flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 gap-3"
              >
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/opportunities/${opp.id}`}
                    className="font-medium text-[#2D6A4F] hover:underline truncate block"
                  >
                    {opp.title}
                  </Link>
                  <p className="text-sm text-gray-500">{date}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full capitalize flex-shrink-0 ${statusColor}`}
                >
                  {signup.status}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Impact Story Card */}
      <section>
        <ImpactStoryCard user={currentUser} />
      </section>

      {/* Leaderboard Preview */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Leaderboard Preview</h2>
        <div className="space-y-2">
          {leaderboardTop3.map((entry, index) => (
            <LeaderboardRow key={entry.id} entry={entry} rank={index + 1} />
          ))}
        </div>
        <div className="mt-3 text-right">
          <Link href="/leaderboard" className="text-sm text-[#2D6A4F] hover:underline font-medium">
            View full leaderboard →
          </Link>
        </div>
      </section>
    </main>
  );
}
