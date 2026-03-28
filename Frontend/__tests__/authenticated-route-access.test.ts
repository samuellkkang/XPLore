/**
 * Bug Condition Exploration Test
 * Property 1: Strategy Mismatch Causes Authenticated Redirect
 *
 * Validates: Requirements 1.1, 1.2, 1.3, 1.4
 *
 * CRITICAL: This test is designed to FAIL on unfixed code.
 * Failure confirms the bug exists — the strategy mismatch between
 * auth.server.ts (strategy: "database") and auth.ts (strategy: "jwt")
 * causes the middleware to redirect authenticated users to /auth.
 *
 * After the fix (both configs use strategy: "jwt"), this test will PASS.
 */

import { describe, it, expect, vi, beforeEach } from "vitest"
import { NextRequest, NextResponse } from "next/server"

// ---------------------------------------------------------------------------
// Mock next/server so NextResponse.redirect / next() are trackable
// ---------------------------------------------------------------------------
const mockRedirect = vi.fn((url: URL) => ({
  type: "redirect",
  url: url.toString(),
  status: 302,
}))
const mockNext = vi.fn(() => ({ type: "next" }))

vi.mock("next/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/server")>()
  return {
    ...actual,
    NextResponse: {
      ...actual.NextResponse,
      redirect: (url: URL) => mockRedirect(url),
      next: () => mockNext(),
    },
  }
})

// ---------------------------------------------------------------------------
// Helper: build a NextRequest with optional session cookie
// ---------------------------------------------------------------------------
function makeRequest(pathname: string, sessionToken?: string): NextRequest {
  const url = `http://localhost${pathname}`
  const req = new NextRequest(url)
  if (sessionToken) {
    req.cookies.set("next-auth.session-token", sessionToken)
  }
  return req
}

// ---------------------------------------------------------------------------
// Import middleware AFTER mocks are set up
// ---------------------------------------------------------------------------
const { middleware } = await import("../middleware")

// ---------------------------------------------------------------------------
// Unit tests — middleware allows authenticated users through
// ---------------------------------------------------------------------------

describe("middleware — authenticated users access protected routes", () => {
  beforeEach(() => {
    mockRedirect.mockClear()
    mockNext.mockClear()
  })

  const protectedRoutes = ["/profile", "/leaderboard", "/opportunities"]

  for (const route of protectedRoutes) {
    it(`allows access to ${route} when a valid session cookie is present`, () => {
      const req = makeRequest(route, "valid-session-token-value")
      middleware(req)
      // Should call NextResponse.next(), NOT redirect to /auth
      expect(mockNext).toHaveBeenCalledTimes(1)
      expect(mockRedirect).not.toHaveBeenCalled()
    })
  }

  it("redirects to /auth when no session cookie is present for /profile", () => {
    const req = makeRequest("/profile")
    middleware(req)
    expect(mockRedirect).toHaveBeenCalledTimes(1)
    expect(mockRedirect.mock.calls[0][0].toString()).toContain("/auth")
    expect(mockNext).not.toHaveBeenCalled()
  })
})

// ---------------------------------------------------------------------------
// Strategy mismatch assertion
// Confirms the bug condition: auth.server.ts uses "database" while auth.ts uses "jwt"
// This assertion FAILS on unfixed code (proving the bug exists).
// After the fix (both use "jwt"), this assertion PASSES.
// ---------------------------------------------------------------------------

describe("Strategy mismatch — confirms bug condition", () => {
  it('auth.ts uses strategy: "jwt" (source check)', async () => {
    // Read source directly to avoid next-auth module resolution issues in jsdom
    const fs = await import("fs")
    const path = await import("path")
    const src = fs.readFileSync(
      path.resolve(__dirname, "../auth.ts"),
      "utf-8"
    )
    // auth.ts must declare strategy: "jwt" for the middleware to work correctly
    expect(src).toContain(`strategy: "jwt"`)
  })

  it('auth.server.ts does NOT override strategy to "database" (bug condition: it does)', async () => {
    // We inspect the raw source of auth.server.ts to detect the strategy override.
    // On UNFIXED code: auth.server.ts contains `strategy: "database"` → this test FAILS.
    // On FIXED code: auth.server.ts does NOT contain `strategy: "database"` → this test PASSES.
    const fs = await import("fs")
    const path = await import("path")
    const src = fs.readFileSync(
      path.resolve(__dirname, "../auth.server.ts"),
      "utf-8"
    )
    // Bug condition: the source contains the database strategy override
    const hasDatabaseStrategy = src.includes(`strategy: "database"`)
    // This assertion encodes the EXPECTED (fixed) behavior.
    // It FAILS on unfixed code where hasDatabaseStrategy === true.
    expect(hasDatabaseStrategy).toBe(false)
  })
})
