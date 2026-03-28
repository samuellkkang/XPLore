import Link from "next/link";
import { opportunities } from "@/lib/mock-data";
import OpportunityCard from "@/components/OpportunityCard";

export default function Home() {
  const featured = opportunities.slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#2D6A4F] text-white py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          {/* Wordmark */}
          <div className="flex items-center gap-2 text-2xl font-bold">
            <span aria-hidden="true">🌿</span>
            <span>VolunteerQuest</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Volunteer. Earn XP. Make a Difference.
          </h1>

          <p className="text-lg sm:text-xl text-green-100 max-w-xl">
            Discover local volunteer opportunities, level up your civic impact,
            and earn badges that celebrate your community contributions.
          </p>

          <Link
            href="/opportunities"
            className="inline-block bg-[#F59E0B] hover:bg-amber-500 text-white font-semibold px-8 py-3 rounded-full transition-colors text-lg"
          >
            Find Opportunities
          </Link>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#2D6A4F] mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              {
                step: "1",
                title: "Find an Opportunity",
                desc: "Browse local volunteer events filtered by category, date, or location.",
              },
              {
                step: "2",
                title: "RSVP and Show Up",
                desc: "Reserve your spot in seconds and make a real difference in your community.",
              },
              {
                step: "3",
                title: "Earn XP and Badges",
                desc: "Every event you complete rewards you with XP, badges, and leaderboard glory.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-2xl font-bold">
                  {step}
                </div>
                <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Opportunities ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#2D6A4F] mb-12">
            Featured Opportunities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/opportunities"
              className="inline-block border-2 border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              View All Opportunities
            </Link>
          </div>
        </div>
      </section>

      {/* ── Gamification Teaser ──────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#2D6A4F] mb-4">
            Level Up Your Impact
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            VolunteerQuest turns civic engagement into an adventure. Every action
            you take earns rewards and recognition.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-xl border border-border p-6 flex flex-col items-center gap-3 text-center hover:shadow-md transition-shadow">
              <span className="text-4xl">⚡</span>
              <h3 className="font-bold text-lg text-[#F59E0B]">XP Points</h3>
              <p className="text-gray-500 text-sm">
                Earn experience points for every volunteer event you complete.
                Watch your level climb as your impact grows.
              </p>
            </div>
            <div className="rounded-xl border border-border p-6 flex flex-col items-center gap-3 text-center hover:shadow-md transition-shadow">
              <span className="text-4xl">🏅</span>
              <h3 className="font-bold text-lg text-[#2D6A4F]">Badges</h3>
              <p className="text-gray-500 text-sm">
                Unlock achievement badges by hitting milestones — from your first
                event to becoming a Community Hero.
              </p>
            </div>
            <div className="rounded-xl border border-border p-6 flex flex-col items-center gap-3 text-center hover:shadow-md transition-shadow">
              <span className="text-4xl">🏆</span>
              <h3 className="font-bold text-lg text-[#2D6A4F]">Leaderboard</h3>
              <p className="text-gray-500 text-sm">
                Compete with friends and neighbors on local and group leaderboards.
                Rise to the top through consistent volunteering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#2D6A4F] text-green-100 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold text-white text-lg">
            <span aria-hidden="true">🌿</span>
            <span>VolunteerQuest</span>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm justify-center">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/opportunities" className="hover:text-white transition-colors">
              Opportunities
            </Link>
            <Link href="/leaderboard" className="hover:text-white transition-colors">
              Leaderboard
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
          </nav>
          <p className="text-xs text-green-200">
            &copy; {new Date().getFullYear()} VolunteerQuest. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
