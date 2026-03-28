import Link from "next/link";
import { organizations, opportunities } from "@/lib/mock-data";
import OpportunityCard from "@/components/OpportunityCard";

export default async function OrgProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const org = organizations.find((o) => o.id === id);

  if (!org) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-2xl font-bold">Organization Not Found</h1>
        <p className="text-muted-foreground">
          We couldn&apos;t find an organization with that ID.
        </p>
        <Link
          href="/opportunities"
          className="text-[#2D6A4F] underline hover:text-[#245a42]"
        >
          ← Back to Opportunities
        </Link>
      </main>
    );
  }

  const orgOpportunities = opportunities.filter((opp) => opp.org === id);

  const totalOpportunities = orgOpportunities.length;
  const totalVolunteers = orgOpportunities.reduce(
    (sum, opp) => sum + opp.spotsFilled,
    0
  );
  const totalXP = orgOpportunities.reduce(
    (sum, opp) => sum + opp.xpReward * opp.spotsFilled,
    0
  );

  // Derive initials from org name for logo placeholder
  const initials = org.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <main className="min-h-screen bg-white">
      {/* Org Header */}
      <section className="bg-[#2D6A4F] text-white py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            {org.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={org.logoUrl}
                alt={`${org.name} logo`}
                className="w-20 h-20 rounded-full object-cover border-2 border-white"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#F59E0B] flex items-center justify-center text-white text-2xl font-bold border-2 border-white">
                {initials}
              </div>
            )}
          </div>

          {/* Name + Description */}
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">{org.name}</h1>
            <p className="mt-2 text-green-100 max-w-2xl">{org.description}</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 border-b py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-[#2D6A4F]">
              {totalOpportunities}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Opportunities Posted
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#2D6A4F]">
              {totalVolunteers}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Volunteers Engaged
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#F59E0B]">
              {totalXP.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Total XP Awarded</p>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="max-w-5xl mx-auto py-10 px-6">
        <h2 className="text-xl font-semibold mb-6">Active Opportunities</h2>
        {orgOpportunities.length === 0 ? (
          <p className="text-muted-foreground">
            No active opportunities at this time.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orgOpportunities.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
