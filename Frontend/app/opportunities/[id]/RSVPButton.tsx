"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RSVPModal } from "@/components/RSVPModal";
import type { Opportunity } from "@/lib/mock-data";

interface RSVPButtonProps {
  opportunity: Opportunity;
}

export default function RSVPButton({ opportunity }: RSVPButtonProps) {
  const [open, setOpen] = useState(false);

  function handleAddToCalendar() {
    // TODO: Google Calendar API
  }

  return (
    <>
      <Button
        className="w-full bg-[#2D6A4F] hover:bg-[#245a42] text-white"
        onClick={() => setOpen(true)}
      >
        RSVP
      </Button>
      <button
        className="w-full rounded-md border border-[#2D6A4F] text-[#2D6A4F] px-4 py-2 text-sm font-medium hover:bg-[#2D6A4F]/5 transition-colors"
        onClick={handleAddToCalendar}
      >
        Add to Google Calendar
      </button>
      <RSVPModal opportunity={opportunity} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
