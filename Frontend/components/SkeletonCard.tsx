import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card">
      {/* Image area */}
      <Skeleton className="w-full h-48 rounded-none" />

      <div className="p-4 space-y-3">
        {/* Title line */}
        <Skeleton className="h-5 w-3/4" />
        {/* Subtitle / org line */}
        <Skeleton className="h-4 w-1/2" />

        {/* Button placeholder */}
        <Skeleton className="h-9 w-full mt-2 rounded-md" />
      </div>
    </div>
  );
}
