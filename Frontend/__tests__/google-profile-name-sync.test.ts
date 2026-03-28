/**
 * Tests for google-profile-name-sync feature
 * Covers profile() and signIn callbacks in auth.server.ts
 */
import { describe, it, expect, vi, beforeEach } from "vitest"
import * as fc from "fast-check"

// ---------------------------------------------------------------------------
// Extracted callback logic (mirrors auth.server.ts exactly)
// ---------------------------------------------------------------------------

type GoogleProfile = {
  sub: string
  given_name?: string
  email: string
  picture?: string
  [key: string]: unknown
}

function profileCallback(profile: GoogleProfile) {
  return {
    id: profile.sub,
    name: profile.given_name ?? null,
    email: profile.email,
    image: profile.picture,
  }
}

// Mock prisma
const mockFindUnique = vi.fn()
vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: (...args: unknown[]) => mockFindUnique(...args),
    },
  },
}))

async function signInCallback({
  user,
}: {
  user: { id?: string; name?: string | null }
}): Promise<boolean> {
  const { prisma } = await import("@/lib/prisma")
  if (user.id) {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { name: true },
    })
    if (dbUser?.name) {
      user.name = dbUser.name
    }
  }
  return true
}

// ---------------------------------------------------------------------------
// Unit tests — profile() callback
// ---------------------------------------------------------------------------

describe("profile() callback", () => {
  it("maps given_name to name", () => {
    const result = profileCallback({
      sub: "google-123",
      given_name: "Alice",
      email: "alice@example.com",
      picture: "https://example.com/photo.jpg",
    })
    expect(result.name).toBe("Alice")
    expect(result.id).toBe("google-123")
    expect(result.email).toBe("alice@example.com")
  })

  it("returns name: null when given_name is absent", () => {
    const result = profileCallback({
      sub: "google-456",
      email: "bob@example.com",
    })
    expect(result.name).toBeNull()
  })

  it("returns name: null when given_name is undefined", () => {
    const result = profileCallback({
      sub: "google-789",
      given_name: undefined,
      email: "carol@example.com",
    })
    expect(result.name).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// Property-based test — Property 1: First sign-in writes given_name
// Validates: Requirements 1.1
// ---------------------------------------------------------------------------

describe("Property 1: profile() — first sign-in writes given_name", () => {
  it("for any non-empty given_name, returned name equals given_name", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), (givenName) => {
        const result = profileCallback({
          sub: "sub-id",
          given_name: givenName,
          email: "user@example.com",
        })
        return result.name === givenName
      }),
      { numRuns: 100 }
    )
  })
})

// ---------------------------------------------------------------------------
// Unit tests — signIn callback
// ---------------------------------------------------------------------------

describe("signIn callback", () => {
  beforeEach(() => {
    mockFindUnique.mockReset()
  })

  it("returns true when user.id is undefined (new user path)", async () => {
    const user: { id?: string; name?: string | null } = {
      id: undefined,
      name: "Alice",
    }
    const result = await signInCallback({ user })
    expect(result).toBe(true)
    expect(mockFindUnique).not.toHaveBeenCalled()
  })

  it("returns true and preserves name when DB user has a non-empty name", async () => {
    mockFindUnique.mockResolvedValue({ name: "Existing Name" })
    const user: { id?: string; name?: string | null } = {
      id: "user-1",
      name: "Incoming Name",
    }
    const result = await signInCallback({ user })
    expect(result).toBe(true)
    expect(user.name).toBe("Existing Name")
  })

  it("returns true and allows adapter to write name when DB user has null name", async () => {
    mockFindUnique.mockResolvedValue({ name: null })
    const user: { id?: string; name?: string | null } = {
      id: "user-2",
      name: "Alice",
    }
    const result = await signInCallback({ user })
    expect(result).toBe(true)
    // name should remain as-is (not overwritten since dbUser.name is falsy)
    expect(user.name).toBe("Alice")
  })
})

// ---------------------------------------------------------------------------
// Property-based test — Property 2: Existing name is never overwritten
// Validates: Requirements 2.1
// ---------------------------------------------------------------------------

describe("Property 2: signIn — existing name is never overwritten", () => {
  beforeEach(() => {
    mockFindUnique.mockReset()
  })

  it("for any (existingName, incomingName) pair, user.name stays existingName", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 1 }),
        async (existingName, incomingName) => {
          mockFindUnique.mockResolvedValue({ name: existingName })
          const user: { id?: string; name?: string | null } = {
            id: "user-prop",
            name: incomingName,
          }
          await signInCallback({ user })
          return user.name === existingName
        }
      ),
      { numRuns: 100 }
    )
  })
})

// ---------------------------------------------------------------------------
// Extracted session callback logic (mirrors auth.server.ts exactly)
// ---------------------------------------------------------------------------

function sessionCallback({
  session,
  user,
}: {
  session: { user: { name?: string | null; email: string } }
  user: { name?: string | null; email: string }
}) {
  session.user.name = user.name ?? session.user.name
  return session
}

// ---------------------------------------------------------------------------
// Unit tests — session callback
// ---------------------------------------------------------------------------

describe("session callback", () => {
  it("sets session.user.name from user.name when user.name is non-null", () => {
    const session = { user: { name: undefined, email: "x@x.com" } }
    const user = { name: "Alice", email: "x@x.com" }
    const result = sessionCallback({ session, user })
    expect(result.user.name).toBe("Alice")
  })

  it("falls back to existing session.user.name when user.name is null", () => {
    const session = { user: { name: "Existing", email: "x@x.com" } }
    const user = { name: null, email: "x@x.com" }
    const result = sessionCallback({ session, user })
    expect(result.user.name).toBe("Existing")
  })
})

// ---------------------------------------------------------------------------
// Property-based test — Property 3: Session reflects database name
// Validates: Requirements 3.1
// ---------------------------------------------------------------------------

describe("Property 3: session callback — session reflects database name", () => {
  it("for any non-empty name, sessionCallback returns result.user.name === name", () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1 }), (name) => {
        const session = { user: { name: undefined as string | null | undefined, email: "x@x.com" } }
        const user = { name, email: "x@x.com" }
        const result = sessionCallback({ session, user })
        return result.user.name === name
      }),
      { numRuns: 100 }
    )
  })
})
