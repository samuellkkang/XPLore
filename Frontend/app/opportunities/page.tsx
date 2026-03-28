"use client";

import { useState, useEffect } from "react";
import { opportunities } from "@/lib/mock-data";
import OpportunityCard from "@/components/OpportunityCard";
import SkeletonCard from "@/components/SkeletonCard";

// Extract unique categories from opportunities
const categories = Array.from(new Set(opportunities.map((o) => o.category)));

export default function OpportunitiesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    // TODO: real filter logic
    setSearch(e.target.value);
  }

  function handleCategorySelect(category: string | null) {
    // TODO: real filter logic
    setSelectedCategory(category);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#2D6A4F] mb-6">
          Volunteer Opportunities
        </h1>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search opportunities..."
            className="w-full max-w-xl border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
          />
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => handleCategorySelect(null)}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
              selectedCategory === null
                ? "bg-[#2D6A4F] text-white border-[#2D6A4F]"
                : "bg-background text-foreground border-border hover:border-[#2D6A4F]"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                selectedCategory === cat
                  ? "bg-[#2D6A4F] text-white border-[#2D6A4F]"
                  : "bg-background text-foreground border-border hover:border-[#2D6A4F]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main layout: grid + map */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Opportunity grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : opportunities.map((opp) => (
                    <OpportunityCard key={opp.id} opportunity={opp} />
                  ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="lg:w-80 xl:w-96 shrink-0">
            <div className="sticky top-4 h-64 lg:h-[600px] rounded-xl bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
              {/* TODO: Mapbox GL JS */}
              Map View
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
