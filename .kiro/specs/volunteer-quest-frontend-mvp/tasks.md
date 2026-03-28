# Implementation Plan: VolunteerQuest Frontend MVP

## Overview

Scaffold a Next.js 16 App Router project from scratch, build out mock data and shared components, implement all pages, then wire interactions and add tests. All integration points (Mapbox, Google OAuth, Google Calendar, AI narrative) are stubbed with `// TODO` comments. No backend, no database, no real auth.

Stack: Next.js 16, TypeScript, Tailwind CSS, shadcn/ui, Vitest, React Testing Library, fast-check.

## Tasks

- [-] 1. Scaffold Next.js project and configure tooling
  - Install pnpm if not present: `npm install -g pnpm`
  - Run `pnpm dlx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"` in the workspace root — select Next.js 16 when prompted
  - Install shadcn/ui: `pnpm dlx shadcn@latest init` and add components: `button`, `dialog`, `progress`, `skeleton`, `tabs`, `tooltip`, `input`, `label`
  - Install test dependencies: `pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event fast-check jsdom`
  - Add `vitest.config.ts` with jsdom environment and `@testing-library/jest-dom` setup
  - Add `vitest.setup.ts` importing `@testing-library/jest-dom`
  - Configure `tailwind.config.ts` to extend theme with `forestGreen: '#2D6A4F'` and `accent: '#F59E0B'`
  - Add Inter font via `next/font/google` in `app/layout.tsx`
  - _Requirements: 14.1, 14.2, 14.4, 14.5_

- [ ] 2. Create mock data module
  - [~] 2.1 Define TypeScript interfaces and export all mock data in `lib/mock-data.ts`
    - Define interfaces: `Opportunity`, `User`, `Group`, `BadgeDefinition`, `Signup`, `Organization`, `LeaderboardEntry`
    - Export `opportunities` (12 items), `users` (10 items), `groups` (5 items), `badgeDefinitions` (8 items)
    - Export `currentUser`, `upcomingSignups` (3 items), `organizations`
    - Ensure every field listed in the interfaces is populated with realistic values
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

  - [ ]* 2.2 Write property test for mock data structural completeness
    - // Feature: volunteer-quest-frontend-mvp, Property 1: Mock data structural completeness
    - Assert all required fields are present and non-null on every item in each collection
    - Assert collection counts: 12 opportunities, 10 users, 5 groups, 8 badge definitions, 3 signups
    - `{ numRuns: 100 }`
    - **Property 1: Mock data structural completeness**
    - **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.6**

- [ ] 3. Implement Navbar component
  - [~] 3.1 Create `components/Navbar.tsx` as a Client Component
    - Forest Green background (`bg-[#2D6A4F]`), logo (leaf icon + "VolunteerQuest" wordmark) on the left
    - Nav links: Home `/`, Opportunities `/opportunities`, Leaderboard `/leaderboard`, Dashboard `/dashboard`
    - "Sign In" button linking to `/auth`
    - Below 768px: hide links, show hamburger icon; tap toggles `isMenuOpen` state and a mobile drawer
    - Mount Navbar in `app/layout.tsx` so it renders on every page
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 14.1, 14.6_

  - [ ]* 3.2 Write property test for hamburger toggle round trip
    - // Feature: volunteer-quest-frontend-mvp, Property 14: Navbar hamburger toggle is a round trip
    - Generate arbitrary initial drawer state (open/closed); toggle twice; assert state returns to original
    - `{ numRuns: 100 }`
    - **Property 14: Navbar hamburger toggle is a round trip**
    - **Validates: Requirements 2.6**

  - [ ]* 3.3 Write unit tests for Navbar
    - Assert logo text and nav links render
    - Assert hamburger icon visible at mobile viewport, links hidden
    - Assert clicking hamburger opens drawer; clicking again closes it
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 2.6_

- [~] 4. Implement SkeletonCard component
  - Create `components/SkeletonCard.tsx` using shadcn/ui `Skeleton`
  - Match OpportunityCard dimensions (image area, two text lines, button placeholder)
  - _Requirements: 4.6_

- [ ] 5. Implement OpportunityCard component
  - [~] 5.1 Create `components/OpportunityCard.tsx`
    - Display: cover image (`next/image`), org name, title, location, category, date
    - Amber/gold XP chip (`bg-[#F59E0B]`) in top-right corner of the image
    - Spots-remaining indicator: `spotsTotal - spotsFilled`
    - Hover: elevated box shadow via Tailwind `hover:shadow-lg transition-shadow`
    - "More Info" button calls `router.push('/opportunities/' + opportunity.id)`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 5.2 Write property test for OpportunityCard renders all required fields
    - // Feature: volunteer-quest-frontend-mvp, Property 2: OpportunityCard renders all required fields
    - Generate arbitrary `Opportunity` objects with all required fields; render card; assert all fields visible
    - `{ numRuns: 100 }`
    - **Property 2: OpportunityCard renders all required fields**
    - **Validates: Requirements 5.1, 5.5**

  - [ ]* 5.3 Write property test for spots remaining calculation
    - // Feature: volunteer-quest-frontend-mvp, Property 3: Spots remaining is always spotsTotal minus spotsFilled
    - Generate arbitrary `spotsTotal` and `spotsFilled` integers where `spotsFilled <= spotsTotal`; assert displayed value equals `spotsTotal - spotsFilled`
    - `{ numRuns: 100 }`
    - **Property 3: Spots remaining is always spotsTotal minus spotsFilled**
    - **Validates: Requirements 5.5**

  - [ ]* 5.4 Write property test for More Info navigation target
    - // Feature: volunteer-quest-frontend-mvp, Property 4: "More Info" navigation targets the correct detail route
    - Generate arbitrary opportunity id strings; assert clicking "More Info" triggers navigation to `/opportunities/{id}`
    - `{ numRuns: 100 }`
    - **Property 4: "More Info" navigation targets the correct detail route**
    - **Validates: Requirements 5.3**

- [ ] 6. Implement XPProgressBar component
  - [~] 6.1 Create `components/XPProgressBar.tsx` as a Client Component
    - Wrap shadcn/ui `Progress`; amber/gold fill via CSS variable override or inline style
    - On mount (`useEffect`): animate fill from 0 → `(currentXp / levelCapXp) * 100` using `setTimeout` or CSS transition
    - Display current XP, level cap XP, and level label
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [ ]* 6.2 Write property test for XPProgressBar displays all three data points
    - // Feature: volunteer-quest-frontend-mvp, Property 9: XPProgressBar displays all three data points
    - Generate arbitrary `currentXp`, `levelCapXp` (> 0), `level` triples; render component; assert all three values visible in output
    - `{ numRuns: 100 }`
    - **Property 9: XPProgressBar displays all three data points**
    - **Validates: Requirements 9.2**

- [ ] 7. Implement BadgeShelf component
  - [~] 7.1 Create `components/BadgeShelf.tsx` as a Client Component
    - Horizontal scroll row of circular badge icons with badge name below
    - Earned badges (id in `earnedBadgeIds`): full color, hover scale + glow pulse animation, shadcn/ui `Tooltip` with description
    - Locked badges: greyscale (`grayscale` Tailwind class) + lock icon overlay
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [ ]* 7.2 Write property test for badge earned/locked rendering
    - // Feature: volunteer-quest-frontend-mvp, Property 8: Badge rendering reflects earned/locked status
    - Generate arbitrary badge definition lists and subsets of earned ids; render BadgeShelf; assert earned badges lack lock icon and locked badges have lock icon
    - `{ numRuns: 100 }`
    - **Property 8: Badge rendering reflects earned/locked status**
    - **Validates: Requirements 8.5, 10.4, 10.5**

- [ ] 8. Implement LeaderboardRow component
  - [~] 8.1 Create `components/LeaderboardRow.tsx`
    - Display: rank number, avatar (initials fallback), display name, city, XP, level badge chip
    - Rank 1 → gold color class, rank 2 → silver, rank 3 → bronze
    - Responsive: full table row on ≥768px, compact card layout on <768px
    - _Requirements: 11.3, 11.4, 11.5, 11.7_

  - [ ]* 8.2 Write property test for LeaderboardRow renders all required fields
    - // Feature: volunteer-quest-frontend-mvp, Property 10: LeaderboardRow renders all required fields
    - Generate arbitrary `LeaderboardEntry` objects and rank numbers; render row; assert rank, display name, city, XP, and level chip all visible
    - `{ numRuns: 100 }`
    - **Property 10: LeaderboardRow renders all required fields**
    - **Validates: Requirements 11.4**

  - [ ]* 8.3 Write property test for leaderboard rank colors
    - // Feature: volunteer-quest-frontend-mvp, Property 11: Leaderboard rank colors are correct
    - Generate arbitrary leaderboard lists of length ≥ 3; assert rank 1 has gold class, rank 2 silver, rank 3 bronze
    - `{ numRuns: 100 }`
    - **Property 11: Leaderboard rank colors are correct**
    - **Validates: Requirements 11.5**

- [ ] 9. Implement RSVPModal component
  - [~] 9.1 Create `components/RSVPModal.tsx` as a Client Component
    - Use shadcn/ui `Dialog`; props: `opportunity`, `open`, `onClose`
    - Dialog header: opportunity title + date
    - Idle state: form with name field and email field; inline validation errors on empty submit
    - On valid submit: transition to `success` state
    - Success state: confetti animation (CSS keyframes or `canvas-confetti`), "+{xpReward} XP earned!" message, "Close" button calling `onClose`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

  - [ ]* 9.2 Write property test for RSVP modal header reflects the opportunity
    - // Feature: volunteer-quest-frontend-mvp, Property 5: RSVP Modal header reflects the opportunity
    - Generate arbitrary `Opportunity` objects; render RSVPModal open; assert dialog header contains opportunity title and date
    - `{ numRuns: 100 }`
    - **Property 5: RSVP Modal header reflects the opportunity**
    - **Validates: Requirements 7.2**

  - [ ]* 9.3 Write property test for RSVP success XP message
    - // Feature: volunteer-quest-frontend-mvp, Property 6: RSVP success message reflects the XP reward
    - Generate arbitrary `xpReward` integers; submit valid form; assert success message contains `+{xpReward} XP`
    - `{ numRuns: 100 }`
    - **Property 6: RSVP success message reflects the XP reward**
    - **Validates: Requirements 7.5**

  - [ ]* 9.4 Write property test for RSVP form rejects empty fields
    - // Feature: volunteer-quest-frontend-mvp, Property 7: RSVP form rejects empty fields
    - Generate arbitrary combinations of empty name or empty email; submit form; assert no transition to success state and inline error visible
    - `{ numRuns: 100 }`
    - **Property 7: RSVP form rejects empty fields**
    - **Validates: Requirements 7.7**

- [~] 10. Implement ImpactStoryCard component
  - Create `components/ImpactStoryCard.tsx`
  - Card displaying mock narrative text summarizing volunteer history from `user` prop
  - Include `// TODO: AI narrative generation` comment
  - _Requirements: 8.7_

- [~] 11. Checkpoint — Ensure all component tests pass
  - Run `pnpm vitest --run` and confirm all component-level tests pass before building pages
  - Ask the user if any questions arise.

- [ ] 12. Implement Landing page
  - [~] 12.1 Create `app/page.tsx` as a React Server Component
    - Hero section: headline, subheadline, CTA button linking to `/opportunities`
    - "How It Works" section: 3+ steps describing volunteer-to-XP flow
    - Featured Opportunity_Grid: 3 `OpportunityCard` components from `opportunities` mock data
    - Gamification teaser section: highlights XP, Badges, Leaderboard
    - Footer: nav links + copyright notice
    - Apply Forest Green and amber/gold accent colors consistently
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 14.1, 14.2, 14.6_

  - [ ]* 12.2 Write unit tests for Landing page
    - Assert hero headline, CTA button, "How It Works" section, 3 opportunity cards, gamification teaser, and footer all render
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 13. Implement Opportunity Discovery page
  - [~] 13.1 Create `app/opportunities/page.tsx` as a Client Component
    - Search bar at top
    - Category filter chips or sidebar
    - Render all 12 `OpportunityCard` components from mock data in a responsive grid (1 col <768px, 2 cols 768–1023px, 3 cols ≥1024px)
    - Show `SkeletonCard` components during initial render (simulate with `useEffect` + short delay)
    - Map placeholder panel with `// TODO: Mapbox GL JS` comment
    - Search/filter handlers contain `// TODO: real filter logic` comment; displayed cards unchanged in MVP
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

  - [ ]* 13.2 Write unit tests for Discovery page
    - Assert search bar, filter chips, 12 opportunity cards, and map placeholder render
    - Assert skeleton cards render before data is available
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.6_

- [ ] 14. Implement Opportunity Detail page
  - [~] 14.1 Create `app/opportunities/[id]/page.tsx` as a React Server Component
    - Look up opportunity by `params.id` from `opportunities` mock data; render "Not Found" + back link if not found
    - Hero image at top
    - Organization name, title, full description
    - Details sidebar: date, time, location, category, spots remaining, XP reward
    - "RSVP" button (opens `RSVPModal` — requires converting to Client Component or using a client wrapper)
    - "Add to Google Calendar" button with `// TODO: Google Calendar API` comment in handler
    - "Related Opportunities" section: up to 3 `OpportunityCard` components from mock data
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

  - [ ]* 14.2 Write property test for detail page sidebar contains all required fields
    - // Feature: volunteer-quest-frontend-mvp, Property 15: Detail page sidebar contains all required fields
    - Generate arbitrary `Opportunity` objects; render detail page; assert sidebar displays date, location, category, spots remaining, and XP reward
    - `{ numRuns: 100 }`
    - **Property 15: Detail page sidebar contains all required fields**
    - **Validates: Requirements 6.3**

  - [ ]* 14.3 Write unit tests for Opportunity Detail page
    - Assert hero image, title, description, sidebar fields, RSVP button, calendar button, and related cards render
    - Assert "Not Found" renders for unknown id
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

- [ ] 15. Implement Dashboard page
  - [~] 15.1 Create `app/dashboard/page.tsx` as a Client Component
    - Welcome header with `currentUser.displayName`
    - `XPProgressBar` with current user XP and level cap
    - Stats row: total XP, level, streak, opportunities completed — 2×2 grid <768px, 4-col row ≥768px
    - `BadgeShelf` with all 8 badge definitions and `currentUser.badges` as earned ids
    - Upcoming events section: list 3 `upcomingSignups` with linked opportunity details
    - `ImpactStoryCard` with `currentUser`
    - Leaderboard preview: top 3 users from `users` mock data as `LeaderboardRow` components
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8_

  - [ ]* 15.2 Write unit tests for Dashboard page
    - Assert welcome header, XP bar, stats row, badge shelf, upcoming events, impact card, and leaderboard preview all render
    - _Requirements: 8.1, 8.2, 8.3, 8.5, 8.6, 8.7, 8.8_

- [ ] 16. Implement Leaderboard page
  - [~] 16.1 Create `app/leaderboard/page.tsx` as a Client Component
    - Tab switcher using shadcn/ui `Tabs`: "Local", "My Group", "Between Groups"
    - Each tab renders a ranked list of `LeaderboardRow` components from mock data with a smooth fade transition
    - Privacy note below the list
    - Full-width table layout ≥768px, card stack <768px
    - _Requirements: 11.1, 11.2, 11.3, 11.6, 11.7_

  - [ ]* 16.2 Write unit tests for Leaderboard page
    - Assert three tabs render; switching tabs shows corresponding list
    - Assert privacy note renders
    - _Requirements: 11.1, 11.2, 11.6_

- [ ] 17. Implement Organization Profile page
  - [~] 17.1 Create `app/orgs/[id]/page.tsx` as a React Server Component
    - Look up org by `params.id` from `organizations` mock data; render "Not Found" + back link if not found
    - Org header: name, logo placeholder, short description
    - Stats section: total opportunities posted, total volunteers engaged, total XP awarded (derived from mock data)
    - List of `OpportunityCard` components filtered from `opportunities` where `opp.org === params.id`
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [ ]* 17.2 Write property test for org profile shows only that org's opportunities
    - // Feature: volunteer-quest-frontend-mvp, Property 12: Org profile shows only that org's opportunities
    - Generate arbitrary org id strings and opportunity lists; render org profile; assert all displayed cards have `org` field matching the id
    - `{ numRuns: 100 }`
    - **Property 12: Org profile shows only that org's opportunities**
    - **Validates: Requirements 12.3**

  - [ ]* 17.3 Write unit tests for Org Profile page
    - Assert org header, stats, and filtered opportunity cards render
    - Assert "Not Found" renders for unknown org id
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

- [ ] 18. Implement Auth page
  - [~] 18.1 Create `app/auth/page.tsx` as a Client Component
    - "Continue with Google" button with `// TODO: Google OAuth` comment in handler
    - "Send Magic Link" email input form
    - On valid email submit: display mock confirmation "Check your inbox for a sign-in link."
    - On empty/invalid email submit: display inline validation error
    - Magic link handler contains `// TODO: magic link auth` comment
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

  - [ ]* 18.2 Write property test for magic link form rejects invalid email
    - // Feature: volunteer-quest-frontend-mvp, Property 13: Magic link form rejects invalid email
    - Generate arbitrary empty and malformed email strings; submit form; assert inline error shown and confirmation message absent
    - `{ numRuns: 100 }`
    - **Property 13: Magic link form rejects invalid email**
    - **Validates: Requirements 13.5**

  - [ ]* 18.3 Write unit tests for Auth page
    - Assert Google button and magic link form render
    - Assert confirmation message on valid email; inline error on invalid email
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [~] 19. Final checkpoint — Ensure all tests pass
  - Run `pnpm vitest --run` and confirm all tests pass end-to-end
  - Ask the user if any questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation before moving to the next phase
- Property tests use fast-check with `{ numRuns: 100 }` and are tagged with the property number and feature name
- Unit tests use Vitest + React Testing Library
- All `// TODO` stubs must be present at integration points so the app runs without errors
