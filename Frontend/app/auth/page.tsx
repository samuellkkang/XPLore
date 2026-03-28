"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmationShown, setConfirmationShown] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  function handleGoogleSignIn() {
    signIn("google", { callbackUrl });
  }

  function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    // TODO: magic link auth

    const isValid = email.trim().length > 0 && email.includes("@") && email.includes(".");

    if (!isValid) {
      setEmailError(
        email.trim().length === 0
          ? "Email address is required."
          : "Please enter a valid email address."
      );
      setConfirmationShown(false);
      return;
    }

    setEmailError("");
    setConfirmationShown(true);
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-[#2D6A4F]">Welcome to XPLore</h1>
          <p className="text-sm text-gray-500">Sign in or create an account to get started.</p>
        </div>

        {/* Google Sign In */}
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
          onClick={handleGoogleSignIn}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 uppercase tracking-wide">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Magic Link Form */}
        <form onSubmit={handleMagicLink} noValidate className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
                if (confirmationShown) setConfirmationShown(false);
              }}
              aria-describedby={emailError ? "email-error" : undefined}
              className={emailError ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {emailError && (
              <p id="email-error" className="text-sm text-red-600" role="alert">
                {emailError}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#2D6A4F] hover:bg-[#245a42] text-white"
          >
            Send Magic Link
          </Button>
        </form>

        {/* Confirmation message */}
        {confirmationShown && (
          <p className="text-sm text-center text-[#2D6A4F] font-medium" role="status">
            Check your inbox for a sign-in link.
          </p>
        )}
      </div>
    </main>
  );
}
