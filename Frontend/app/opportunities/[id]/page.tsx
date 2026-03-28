import Image from "next/image";
import Link from "next/link";
import { opportunities, organizations } from "@/lib/mock-data";
import OpportunityCard from "@/components/OpportunityCard";
import RSVPButton from "./RSVPButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(isoDate: string): string {
  return new Date(isoDate).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default async function OpportunityDetailPage({ params }: PageProps) {
  const { id } = await params;
  const opportunity = opportunities.find((o) => o.id === id);

  if (!opportunity) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-2xl font-bold">Opportunity Not Found</h1>
        <p className="text-muted-foreground">
          We couldn&apos;t find an opportunity with that ID.
        </p>
        <Link
          href="/opportunities"
          className="text-[#2D6A4F] font-medium underline underline-offset-4 hover:text-[#245a42]"
        >
          ← Back to Opportunities
        </Link>
      </main>
    );
  }

  const org = organizations.find((o) => o.id === opportunity.org);
  const spotsRemaining = opportunity.spotsTotal - opportunity.spotsFilled;

  const related = opportunities
    .filter((o) => o.id !== opportunity.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero image */}
      <div className="relative w-full h-64 md:h-96 bg-muted">
        <Image
          src={opportunity.imageUrl}
          alt={opportunity.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Org name */}
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {org ? org.name : opportunity.org}
          </p>

          {/* Title */}
          <h1 className="text-3xl font-bold leading-tight">{opportunity.title}</h1>

          {/* Description */}
          <p className="text-base text-foreground leading-relaxed">
            {opportunity.description}
          </p>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-4 rounded-xl border border-border p-6 h-fit">
          <h2 className="text-lg font-semibold">Details</h2>

          <dl className="flex flex-col gap-3 text-sm">
            <div>
              <dt className="text-muted-foreground font-medium">Date</dt>
              <dd className="font-semibold">{formatDate(opportunity.date)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground font-medium">Time</dt>
              <dd className="font-semibold">{formatTime(opportunity.date)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground font-medium">Location</dt>
              <dd className="font-semibold">{opportunity.location}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground font-medium">Category</dt>
              <dd className="font-semibold">{opportunity.category}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground font-medium">Spots Remaining</dt>
              <dd className="font-semibold">
                {spotsRemaining > 0
                  ? `${spotsRemaining} of ${opportunity.spotsTotal}`
                  : "Fully booked"}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground font-medium">XP Reward</dt>
              <dd className="font-bold text-[#F59E0B]">+{opportunity.xpReward} XP</dd>
            </div>
          </dl>

          <div className="flex flex-col gap-3 mt-2">
            {/* RSVP + Google Calendar buttons — client component handles interactivity */}
            <RSVPButton opportunity={opportunity} />
          </div>
        </aside>
      </div>

      {/* Related Opportunities */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6">Related Opportunities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      </section>
    </main>
  );
}
