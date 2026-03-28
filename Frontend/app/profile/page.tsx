"use client";

import { useMemo } from "react";
import ImpactStoryCard from "@/components/ImpactStoryCard";
import OpportunityCard from "@/components/OpportunityCard";
import RightSidebar from "@/components/RightSidebar";
import PageHeader from "@/components/PageHeader";
import EventsMap from "@/components/EventsMap";
import { currentUser, opportunities, upcomingSignups, users } from "@/lib/mock-data";

export default function ProfilePage() {
  // Memoize derived values to prevent recalculation on every render
  const levelCapXp = useMemo(() => currentUser.level * 300, []);
  const eventsAttended = useMemo(
    () => upcomingSignups.filter((s) => s.status === "confirmed").length,
    []
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main container with padding */}
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Impact Story Card - Full width at top */}
        <div className="mb-6">
          <ImpactStoryCard user={currentUser} />
        </div>

        {/* Three-column grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Main Content Area */}
          <div className="space-y-6">
            {/* Page Header */}
            <PageHeader
              displayName={currentUser.displayName}
              eventsAttended={eventsAttended}
              level={currentUser.level}
              currentXp={currentUser.xp}
              levelCapXp={levelCapXp}
            />

            {/* Events Map */}
            <EventsMap opportunities={opportunities} />

            {/* Opportunities Grid Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
              <h2 className="text-xl font-semibold text-[#2D6A4F] mb-4">Upcoming Opportunities</h2>
              
              {opportunities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {opportunities.map((opportunity) => (
                    <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No opportunities available at this time</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <RightSidebar
            upcomingSignups={upcomingSignups}
            opportunities={opportunities}
            users={users}
            currentUserId={currentUser.id}
          />
        </div>
      </div>
    </div>
  );
}
