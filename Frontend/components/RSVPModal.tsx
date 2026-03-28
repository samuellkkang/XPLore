"use client";

import { useState } from "react";
import { type Opportunity } from "@/lib/mock-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface RSVPModalProps {
  opportunity: Opportunity;
  open: boolean;
  onClose: () => void;
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function RSVPModal({ opportunity, open, onClose }: RSVPModalProps) {
  const [modalState, setModalState] = useState<"idle" | "success">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  function handleClose() {
    // Reset state when closing
    setModalState("idle");
    setName("");
    setEmail("");
    setErrors({});
    onClose();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setModalState("success");
  }

  return (
    <>
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(80px) rotate(360deg); opacity: 0; }
        }
        .confetti-piece {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 2px;
          animation: confetti-fall 1.2s ease-in forwards;
        }
      `}</style>

      <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) handleClose(); }}>
        <DialogContent showCloseButton={modalState === "idle"}>
          <DialogHeader>
            <DialogTitle>{opportunity.title}</DialogTitle>
            <p className="text-sm text-muted-foreground">{formatDate(opportunity.date)}</p>
          </DialogHeader>

          {modalState === "idle" ? (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="rsvp-name">Name</Label>
                <Input
                  id="rsvp-name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-xs text-destructive" role="alert">{errors.name}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="rsvp-email">Email</Label>
                <Input
                  id="rsvp-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-xs text-destructive" role="alert">{errors.email}</p>
                )}
              </div>

              <Button type="submit" className="w-full bg-[#2D6A4F] hover:bg-[#245a42] text-white mt-1">
                Confirm RSVP
              </Button>
            </form>
          ) : (
            <div className="relative flex flex-col items-center gap-4 py-6 overflow-hidden">
              {/* Confetti pieces */}
              {[
                { left: "10%", color: "#F59E0B", delay: "0s" },
                { left: "25%", color: "#2D6A4F", delay: "0.1s" },
                { left: "40%", color: "#EF4444", delay: "0.2s" },
                { left: "55%", color: "#3B82F6", delay: "0.05s" },
                { left: "70%", color: "#8B5CF6", delay: "0.15s" },
                { left: "85%", color: "#F59E0B", delay: "0.25s" },
                { left: "18%", color: "#10B981", delay: "0.3s" },
                { left: "62%", color: "#F97316", delay: "0.08s" },
              ].map((piece, i) => (
                <span
                  key={i}
                  className="confetti-piece"
                  style={{
                    left: piece.left,
                    top: 0,
                    backgroundColor: piece.color,
                    animationDelay: piece.delay,
                  }}
                />
              ))}

              <div className="text-5xl">🎉</div>
              <p className="text-xl font-semibold text-[#2D6A4F]">You&apos;re registered!</p>
              <p className="text-2xl font-bold text-[#F59E0B]">
                +{opportunity.xpReward} XP earned!
              </p>
              <p className="text-sm text-muted-foreground text-center">
                See you at <span className="font-medium">{opportunity.title}</span>
              </p>
              <Button
                onClick={handleClose}
                className="mt-2 bg-[#2D6A4F] hover:bg-[#245a42] text-white"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
