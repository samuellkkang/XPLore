import { memo } from "react";
import { User } from "@/lib/mock-data";

interface ImpactStoryCardProps {
  user: User;
}

// TODO: AI narrative generation
function generateNarrative(user: User): string {
  const firstName = user.name.split(" ")[0];
  const timesVolunteered = Math.max(1, Math.floor(user.xp / 75));
  const streakText =
    user.streak === 1
      ? "a 1-week streak"
      : `a ${user.streak}-week streak`;

  return `${firstName} has volunteered approximately ${timesVolunteered} times, earned ${user.xp.toLocaleString()} XP, reached Level ${user.level}, and maintained ${streakText}. With ${user.badges.length} badge${user.badges.length !== 1 ? "s" : ""} earned, ${firstName} is making a real difference in ${user.city}.`;
}

// Server Component - no "use client" needed, memoized to prevent unnecessary re-renders
const ImpactStoryCard = memo(function ImpactStoryCard({ user }: ImpactStoryCardProps) {
  const narrative = generateNarrative(user);

  return (
    <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-amber-900 mb-3">
        🌟 Impact Story
      </h2>
      <p className="text-amber-800 leading-relaxed">{narrative}</p>
    </div>
  );
});

export default ImpactStoryCard;
