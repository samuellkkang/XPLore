"use client";

import { useState, useEffect } from "react";
import { opportunities } from "@/lib/mock-data";
import OpportunityCard from "@/components/OpportunityCard";
import SkeletonCard from "@/components/SkeletonCard";

// Extract unique categories from opportunities
const categories = Array.from(new Set(opportunities.map((o) => o.category)));

const extraTags = ["Outdoor", "Weekend", "One-Time", "Recurring", "High XP"];

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
    setSearch(e.target.value);
  }

  function handleCategorySelect(category: string | null) {
    setSelectedCategory(category);
  }

  const filtered = opportunities.filter((opp) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      opp.title.toLowerCase().includes(q) ||
      opp.category.toLowerCase().includes(q) ||
      opp.location.toLowerCase().includes(q) ||
      opp.org.toLowerCase().includes(q);
    const matchesCategory =
      !selectedCategory || opp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            className="w-full border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
          />
        </div>

        {/* Filter chips */}
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
          {extraTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleCategorySelect(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                selectedCategory === tag
                  ? "bg-[#2D6A4F] text-white border-[#2D6A4F]"
                  : "bg-background text-foreground border-border hover:border-[#2D6A4F]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Opportunity grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : filtered.length > 0
              ? filtered.map((opp) => (
                  <OpportunityCard key={opp.id} opportunity={opp} />
                ))
              : (
                <p className="col-span-full text-center text-muted-foreground py-12">
                  No opportunities match your search.
                </p>
              )
          }
        </div>
      </div>
    </div>
  );
}
