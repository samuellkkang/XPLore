"use client";

import { useMemo, memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import LeaderboardView from "@/components/LeaderboardView";
import type { Opportunity, Signup, User } from "@/lib/mock-data";

interface RightSidebarProps {
  upcomingSignups: Signup[];
  opportunities: Opportunity[];
  users: User[];
  currentUserId: string;
}

// Memoized to prevent unnecessary re-renders
const RightSidebar = memo(function RightSidebar({
  upcomingSignups,
  opportunities,
  users,
  currentUserId,
}: RightSidebarProps) {
  const router = useRouter();

  // Memoize the upcoming events calculation
  const upcomingEvents = useMemo(() => {
    return upcomingSignups
      .map((signup) => {
        const opportunity = opportunities.find(
          (opp) => opp.id === signup.opportunityId
        );
        return opportunity ? { ...opportunity, status: signup.status } : null;
      })
      .filter((event): event is Opportunity & { status: Signup["status"] } => event !== null)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  }, [upcomingSignups, opportunities]);

  const handleEventClick = useCallback((opportunityId: string) => {
    router.push(`/opportunities/${opportunityId}`);
  }, [router]);

  const getStatusBadgeColor = (status: Signup["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "waitlisted":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <aside className="hidden lg:block w-[320px] sticky top-6 h-fit space-y-6">
      {/* Upcoming Events Section */}
      <div className="bg-white rounded-lg shadow-sm border border-border p-6">
        <h2 className="text-lg font-semibold text-[#2D6A4F] mb-4">
          Upcoming Events
        </h2>
        {upcomingEvents.length === 0 ? (
          <p className="text-sm text-muted-foreground">No upcoming events</p>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event.id)}
                className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors border border-border"
              >
                <h3 className="font-medium text-sm text-foreground mb-1">
                  {event.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {formatDate(event.date)}
                </p>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(
                    event.status
                  )}`}
                >
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Leaderboard Section */}
      <LeaderboardView users={users} currentUserId={currentUserId} />
    </aside>
  );
});

export default RightSidebar;
