# Design Document: VolunteerQuest Frontend MVP

## Overview

VolunteerQuest is a gamified volunteer discovery platform built as a purely frontend MVP. The application lets users browse local volunteer opportunities, RSVP for events, and track their civic engagement through XP points, badges, streaks, and leaderboards. All data is served from a static mock data module — no backend, no database, no real authentication. Every integration point (Mapbox, Google OAuth, Google Calendar, tRPC, AI narrative) is stubbed with `// TODO` comments so the app can be wired to real services later.

The stack is Next.js 16 (App Router), TypeScript, Tailwind CSS, and shadcn/ui. The design follows a mobile-first responsive approach with Forest Green (#2D6A4F) as the primary brand color and amber/gold (#F59E0B) as the accent.

---

## Architecture

The app uses the Next.js App Router with a file-based routing structure. All pages are React Server Components by default; interactive islands (modals, animated bars, tab switchers) are Client Components marked with `"use client"`.

```
app/
  layout.tsx              # Root layout — mounts Navbar, sets global fonts/theme
  page.tsx                # Landing page (/)
  opportunities/
    page.tsx              # Discovery page (/opportunities)
    [id]/
      page.tsx            # Detail page (/opportunities/[id])
  dashboard/
    page.tsx              # User dashboard (/dashboard)
  leaderboard/
    page.tsx              # Leaderboard (/leaderboard)
  orgs/
    [id]/
      page.tsx            # Org profile (/orgs/[id])
  auth/
    page.tsx              # Auth page (/auth)

components/
  Navbar.tsx
  OpportunityCard.tsx
  XPProgressBar.tsx
  BadgeShelf.tsx
  LeaderboardRow.tsx
  RSVPModal.tsx
  ImpactStoryCard.tsx
  SkeletonCard.tsx

lib/
  mock-data.ts            # All mock data + TypeScript interfaces
```

### Data Flow

```
lib/mock-data.ts
      │
      ├──► page.tsx (RSC) — imports mock data, passes as props
      │
      └──► Client Components — receive data as props, manage local UI state
```

No global state manager is needed. Each page imports from `lib/mock-data.ts` directly. Client components receive data as props and manage ephemeral UI state (modal open/close, tab selection, animation triggers) with `useState`/`useEffect`.

### Routing Summary

| Route | Page | Notes |
|---|---|---|
| `/` | Landing | Static RSC |
| `/opportunities` | Discovery | Client component for filter/search state |
| `/opportunities/[id]` | Detail | RSC with dynamic segment |
| `/dashboard` | Dashboard | Client component for XP bar animation |
| `/leaderboard` | Leaderboard | Client component for tab state |
| `/orgs/[id]` | Org Profile | RSC with dynamic segment |
| `/auth` | Auth | Client component for form state |

---

## Components and Interfaces

### Navbar

- Renders on every page via `app/layout.tsx`
- Forest Green background, logo left, nav links center/right
- Below 768px: links hidden, hamburger icon shown; tap toggles a mobile drawer
- "Sign In" button links to `/auth`
- Client Component (manages `isMenuOpen` state)

### OpportunityCard

Props: `opportunity: Opportunity`

- Cover image, org name, title, location, category, date
- Amber/gold XP chip in top-right of image
- Spots-remaining indicator
- Hover: elevated box shadow
- "More Info" → `router.push('/opportunities/' + id)`

### XPProgressBar

Props: `currentXp: number`, `levelCapXp: number`, `level: number`

- Wraps shadcn/ui `Progress`
- On mount: animates fill from 0 → `(currentXp / levelCapXp) * 100`
- Amber/gold fill color
- Displays current XP, cap XP, and level label
- Client Component

### BadgeShelf

Props: `badges: BadgeDefinition[]`, `earnedBadgeIds: string[]`

- Horizontal scroll row of circular badge icons
- Earned: full color + hover scale/glow pulse + tooltip (description)
- Locked: greyscale + lock icon overlay
- Client Component (hover state)

### LeaderboardRow

Props: `entry: LeaderboardEntry`, `rank: number`

- Rank number (gold/silver/bronze for 1/2/3), avatar, display name, city, XP, level chip
- Responsive: full row on ≥768px, compact card on <768px

### RSVPModal

Props: `opportunity: Opportunity`, `open: boolean`, `onClose: () => void`

- shadcn/ui `Dialog`
- States: `idle` → `success`
- Idle: form with name + email fields, inline validation
- Success: confetti animation + "+{xpReward} XP earned!" + Close button
- Client Component

### ImpactStoryCard

Props: `user: User`

- Card with mock narrative text summarizing volunteer history
- `// TODO: AI narrative generation`

### SkeletonCard

- Matches OpportunityCard dimensions
- Uses shadcn/ui `Skeleton` for pulsing placeholder

---

## Data Models

All types and mock data live in `lib/mock-data.ts`.

```typescript
export interface Opportunity {
  id: string;
  title: string;
  org: string;           // org id reference
  category: string;
  date: string;          // ISO date string
  location: string;
  spotsTotal: number;
  spotsFilled: number;
  xpReward: number;
  imageUrl: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  displayName: string;
  city: string;
  xp: number;
  level: number;
  streak: number;
  badges: string[];      // array of BadgeDefinition ids
}

export interface Group {
  id: string;
  name: string;
  city: string;
  memberCount: number;
  aggregateXp: number;
}

export interface BadgeDefinition {
  id: string;
  name: string;
  icon: string;          // emoji or icon identifier
  description: string;
  xpRequired: number;
}

export interface Signup {
  opportunityId: string;
  status: 'confirmed' | 'waitlisted' | 'pending';
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
}

// Derived type used by Leaderboard
export interface LeaderboardEntry {
  id: string;
  displayName: string;
  city: string;
  xp: number;
  level: number;
  avatarUrl?: string;
}
```

Mock data exports:
- `opportunities: Opportunity[]` — 12 items
- `users: User[]` — 10 items
- `groups: Group[]` — 5 items
- `badgeDefinitions: BadgeDefinition[]` — 8 items
- `currentUser: User` — single object
- `upcomingSignups: Signup[]` — 3 items
- `organizations: Organization[]` — derived from opportunity org fields

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Mock data structural completeness

*For any* collection exported from `lib/mock-data.ts` (opportunities, users, groups, badgeDefinitions, upcomingSignups), every item in the collection must have all required fields present and non-null, and the collection must contain the specified count (12 opportunities, 10 users, 5 groups, 8 badge definitions, 3 signups).

**Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.6**

### Property 2: OpportunityCard renders all required fields

*For any* `Opportunity` object from mock data, rendering it as an `OpportunityCard` must produce output that contains the cover image, organization name, title, location, category, date, XP reward chip, spots-remaining indicator, and a "More Info" button.

**Validates: Requirements 5.1, 5.5**

### Property 3: Spots remaining is always spotsTotal minus spotsFilled

*For any* `Opportunity` object, the spots-remaining value displayed on the `OpportunityCard` must equal `spotsTotal - spotsFilled`.

**Validates: Requirements 5.5**

### Property 4: "More Info" navigation targets the correct detail route

*For any* `Opportunity` with a given `id`, clicking the "More Info" button on its `OpportunityCard` must trigger navigation to `/opportunities/{id}`.

**Validates: Requirements 5.3**

### Property 5: RSVP Modal header reflects the opportunity

*For any* `Opportunity` passed to `RSVPModal`, the dialog header must contain that opportunity's title and date.

**Validates: Requirements 7.2**

### Property 6: RSVP success message reflects the XP reward

*For any* `Opportunity` with a given `xpReward`, after a successful RSVP form submission the success state must display a message containing `+{xpReward} XP`.

**Validates: Requirements 7.5**

### Property 7: RSVP form rejects empty fields

*For any* combination of empty name or empty email submitted to the RSVP form, the form must not transition to the success state and must display an inline validation error.

**Validates: Requirements 7.7**

### Property 8: Badge rendering reflects earned/locked status

*For any* set of badge definitions and earned badge ids, earned badges must render in full color without a lock icon, and locked badges must render in greyscale with a lock icon overlay.

**Validates: Requirements 8.5, 10.4, 10.5**

### Property 9: XPProgressBar displays all three data points

*For any* combination of `currentXp`, `levelCapXp`, and `level` values, the rendered `XPProgressBar` must display all three values visibly.

**Validates: Requirements 9.2**

### Property 10: LeaderboardRow renders all required fields

*For any* `LeaderboardEntry`, the rendered `LeaderboardRow` must display the rank number, avatar, display name, city, XP value, and level badge chip.

**Validates: Requirements 11.4**

### Property 11: Leaderboard rank colors are correct

*For any* leaderboard list, the entry at rank 1 must render its rank number with a gold color class, rank 2 with silver, and rank 3 with bronze.

**Validates: Requirements 11.5**

### Property 12: Org profile shows only that org's opportunities

*For any* organization id, the `OpportunityCard` components rendered on the org profile page must all have an `org` field matching that id.

**Validates: Requirements 12.3**

### Property 13: Magic link form rejects invalid email

*For any* empty or syntactically invalid email string submitted to the magic link form, the form must display an inline validation error and must not display the mock confirmation message.

**Validates: Requirements 13.5**

### Property 14: Navbar hamburger toggle is a round trip

*For any* initial state of the mobile navigation drawer, toggling the hamburger menu twice must return the drawer to its original open/closed state.

**Validates: Requirements 2.6**

### Property 15: Detail page sidebar contains all required fields

*For any* `Opportunity`, the detail page sidebar must display the date, location, category, spots remaining, and XP reward.

**Validates: Requirements 6.3**

---

## Error Handling

- **Unknown opportunity id** (`/opportunities/[id]`): If the id segment does not match any item in `opportunities` mock data, the page renders a "Not Found" message with a link back to `/opportunities`.
- **Unknown org id** (`/orgs/[id]`): Same pattern — "Not Found" with a back link.
- **RSVP form validation**: Inline errors on empty name or email; form does not submit until both fields are valid.
- **Magic link form validation**: Inline error on empty or malformed email.
- **Image load failures**: All `<Image>` components should include a fallback `alt` text and a neutral placeholder background color so broken images degrade gracefully.
- **TODO stubs**: All integration points (Mapbox, Google OAuth, Google Calendar, tRPC, AI narrative) are wrapped in handlers that log a console message and return early, preventing runtime errors from unimplemented features.

---

## Testing Strategy

### Dual Testing Approach

Both unit tests and property-based tests are required. They are complementary:

- **Unit tests** cover specific examples, integration points between components, and edge cases (not-found pages, empty states).
- **Property-based tests** verify universal properties across many generated inputs, catching edge cases that hand-written examples miss.

### Unit Tests (Vitest + React Testing Library)

Focus areas:
- Render each page with mock data and assert key elements are present (hero, nav links, card counts, stat values)
- Interaction tests: hamburger toggle, RSVP modal open/close, tab switching, form submission flows
- Edge cases: detail page with unknown id renders "Not Found", org profile with unknown id renders "Not Found"
- XPProgressBar initial value is 0 before mount animation
- SkeletonCard renders before data is available

### Property-Based Tests (fast-check)

Each correctness property above maps to exactly one property-based test. Configuration:
- Minimum **100 runs** per property (fast-check default is 100; set explicitly with `{ numRuns: 100 }`)
- Each test is tagged with a comment in the format:
  `// Feature: volunteer-quest-frontend-mvp, Property {N}: {property_text}`

Property test targets:

| Property | Generator Strategy |
|---|---|
| P1: Mock data completeness | Static assertion (no generation needed — fixed mock data) |
| P2: OpportunityCard renders all fields | Arbitrary `Opportunity` objects with required fields |
| P3: Spots remaining calculation | Arbitrary `spotsTotal` and `spotsFilled` integers where `spotsFilled <= spotsTotal` |
| P4: More Info navigation | Arbitrary opportunity id strings |
| P5: RSVP modal header | Arbitrary `Opportunity` objects |
| P6: RSVP success XP message | Arbitrary `xpReward` integers |
| P7: RSVP empty field rejection | Arbitrary combinations of empty/non-empty name and email |
| P8: Badge earned/locked rendering | Arbitrary badge lists and earned id subsets |
| P9: XPProgressBar data display | Arbitrary `currentXp`, `levelCapXp`, `level` triples |
| P10: LeaderboardRow fields | Arbitrary `LeaderboardEntry` objects |
| P11: Leaderboard rank colors | Arbitrary leaderboard lists of length ≥ 3 |
| P12: Org profile opportunity filter | Arbitrary org id strings and opportunity lists |
| P13: Magic link invalid email | Arbitrary empty and malformed email strings |
| P14: Hamburger toggle round trip | Arbitrary initial drawer state (open/closed) |
| P15: Detail sidebar fields | Arbitrary `Opportunity` objects |

### Testing Library Choices

- **Unit/integration**: Vitest + React Testing Library (`@testing-library/react`)
- **Property-based**: `fast-check` (TypeScript-native, works with Vitest)
- **Snapshot**: Avoid — snapshots are brittle for a UI that will evolve rapidly

### Running Tests

```bash
# Single run (CI-safe, no watch mode)
npx vitest --run
```
