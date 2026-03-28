"use client";

import { useState } from "react";
import { users, groups, LeaderboardEntry } from "@/lib/mock-data";
import LeaderboardRow from "@/components/LeaderboardRow";
import PlaceholderRow from "@/components/PlaceholderRow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// "Local" tab: all users sorted by XP descending
const localEntries: LeaderboardEntry[] = [...users]
  .sort((a, b) => b.xp - a.xp)
  .map((u) => ({
    id: u.id,
    displayName: u.displayName,
    city: u.city,
    xp: u.xp,
    level: u.level,
  }));

// "My Group" tab: users from the first group (subset by index) sorted by XP
const myGroupEntries: LeaderboardEntry[] = [...users]
  .slice(0, 5)
  .sort((a, b) => b.xp - a.xp)
  .map((u) => ({
    id: u.id,
    displayName: u.displayName,
    city: u.city,
    xp: u.xp,
    level: u.level,
  }));

// "Between Groups" tab: groups sorted by aggregateXp descending
const groupEntries: LeaderboardEntry[] = [...groups]
  .sort((a, b) => b.aggregateXp - a.aggregateXp)
  .map((g) => ({
    id: g.id,
    displayName: g.name,
    city: g.city,
    xp: g.aggregateXp,
    level: 1,
  }));

type TabValue = "local" | "my-group" | "between-groups";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<TabValue>("local");

  const tabData: Record<TabValue, LeaderboardEntry[]> = {
    local: localEntries,
    "my-group": myGroupEntries,
    "between-groups": groupEntries,
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2D6A4F] mb-6">Leaderboard</h1>

        <Tabs
          defaultValue="local"
          onValueChange={(val) => setActiveTab(val as TabValue)}
        >
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="local">Local</TabsTrigger>
            <TabsTrigger value="my-group">My Group</TabsTrigger>
            <TabsTrigger value="between-groups">Between Groups</TabsTrigger>
          </TabsList>

          {(["local", "my-group", "between-groups"] as TabValue[]).map((tab) => (
            <TabsContent key={tab} value={tab}>
              <TabEntries entries={tabData[tab]} isActive={activeTab === tab} />
            </TabsContent>
          ))}
        </Tabs>

        <p className="mt-6 text-sm text-gray-500 text-center">
          Display names are used to protect volunteer privacy.
        </p>
      </div>
    </main>
  );
}

export interface TabEntriesProps {
  entries: LeaderboardEntry[];
  isActive?: boolean;
}

export function TabEntries({ entries, isActive = true }: TabEntriesProps) {
  return (
    <div
      className="transition-opacity duration-300"
      style={{ opacity: isActive ? 1 : 0 }}
    >
      {/* Full-width table layout ≥768px */}
      <div className="hidden md:block w-full">
        <div className="flex flex-col gap-2">
          {entries.map((entry, index) => (
            <LeaderboardRow key={entry.id} entry={entry} rank={index + 1} />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <PlaceholderRow key={`ph-${i}`} />
          ))}
        </div>
      </div>

      {/* Card stack <768px */}
      <div className="flex md:hidden flex-col gap-3">
        {entries.map((entry, index) => (
          <LeaderboardRow key={entry.id} entry={entry} rank={index + 1} />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <PlaceholderRow key={`ph-${i}`} />
        ))}
      </div>
    </div>
  );
}
