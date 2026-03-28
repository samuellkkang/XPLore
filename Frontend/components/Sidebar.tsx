"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Profile", href: "/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const displayName =
    status === "authenticated"
      ? session?.user?.name || session?.user?.email || ""
      : "";

  let authControl: React.ReactNode;

  if (status === "loading") {
    authControl = (
      <div className="px-4 py-2 rounded-md bg-white/20 animate-pulse h-9" />
    );
  } else if (status === "unauthenticated") {
    authControl = (
      <Link
        href="/auth"
        className={`block px-4 py-2 rounded-md bg-white text-[#2D6A4F] font-semibold text-sm text-center hover:bg-gray-100 transition-colors ${
          pathname === "/auth" ? "ring-2 ring-offset-2 ring-white ring-offset-[#2D6A4F]" : ""
        }`}
      >
        Sign In
      </Link>
    );
  } else {
    // authenticated
    authControl = (
      <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/10">
        {session?.user?.image && (
          <img src={session.user.image} alt="" className="w-6 h-6 rounded-full" />
        )}
        <span className="truncate text-sm font-medium flex-1">
          {displayName}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-white/70 hover:text-white transition-colors shrink-0"
          aria-label="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

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

      {/* Auth control — Sign In / loading skeleton / Username_Display */}
      {authControl}
    </aside>
  );
}
