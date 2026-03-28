"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Profile", href: "/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-56 bg-[#2D6A4F] text-white sticky top-0 h-screen py-4 px-3 gap-1">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 font-bold text-lg px-4 py-3 mb-2">
        <Leaf className="w-6 h-6" />
        <span>XPLore</span>
      </Link>

      {/* Nav links */}
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-4 py-2 rounded-md hover:bg-[#245a42] transition-colors text-sm font-medium ${
            pathname === link.href ? "bg-[#245a42] font-bold" : ""
          }`}
        >
          {link.label}
        </Link>
      ))}

      {/* Sign In — directly below Dashboard */}
      <Link
        href="/auth"
        className={`block px-4 py-2 rounded-md bg-white text-[#2D6A4F] font-semibold text-sm text-center hover:bg-gray-100 transition-colors ${
          pathname === "/auth" ? "ring-2 ring-offset-2 ring-white ring-offset-[#2D6A4F]" : ""
        }`}
      >
        Sign In
      </Link>
    </aside>
  );
}
