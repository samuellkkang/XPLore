"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Opportunity } from "@/lib/mock-data";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const router = useRouter();

  const spotsRemaining = opportunity.spotsTotal - opportunity.spotsFilled;
  const formattedDate = new Date(opportunity.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-xl border border-border bg-background overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      {/* Image container */}
      <div className="relative h-48 w-full bg-muted">
        <Image
          src={opportunity.imageUrl}
          alt={opportunity.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* XP chip */}
        <span className="absolute top-2 right-2 bg-[#F59E0B] text-white text-xs font-semibold px-2 py-1 rounded-full">
          +{opportunity.xpReward} XP
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Org name */}
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide truncate">
          {opportunity.org}
        </p>

        {/* Title */}
        <h3 className="font-semibold text-base leading-snug line-clamp-2">
          {opportunity.title}
        </h3>

        {/* Category & Location */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span>{opportunity.category}</span>
          <span className="truncate">{opportunity.location}</span>
        </div>

        {/* Date */}
        <p className="text-sm text-muted-foreground">{formattedDate}</p>

        {/* Spots remaining */}
        <p className="text-sm font-medium text-foreground">
          {spotsRemaining > 0
            ? `${spotsRemaining} spot${spotsRemaining === 1 ? "" : "s"} left`
            : "Fully booked"}
        </p>

        {/* More Info button */}
        <div className="mt-auto pt-2">
          <Button
            className="w-full bg-[#2D6A4F] hover:bg-[#245a42] text-white"
            onClick={() => router.push("/opportunities/" + opportunity.id)}
          >
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
}
