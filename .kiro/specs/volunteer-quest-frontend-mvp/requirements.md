# Requirements Document

## Introduction

VolunteerQuest is a gamified local volunteer platform delivered as a purely frontend MVP. The application connects users with local volunteer opportunities and rewards civic engagement through XP points, badges, leaderboards, and streaks. This MVP uses mock data throughout and is designed to be wired to a real backend later. The tech stack is Next.js 14+ (App Router), TypeScript, Tailwind CSS, and shadcn/ui components.

## Glossary

- **App**: The VolunteerQuest Next.js frontend application
- **Opportunity**: A volunteer event or role posted by an organization
- **Opportunity_Card**: A UI card component displaying a summary of an Opportunity
- **Opportunity_Grid**: The collection of Opportunity_Cards displayed on the discovery page
- **User**: A mock authenticated volunteer user
- **Current_User**: The single mock user object representing the logged-in volunteer
- **Organization**: A nonprofit or community group that posts Opportunities
- **XP**: Experience points awarded to Users for completing volunteer activities
- **Level**: A rank derived from a User's cumulative XP
- **Badge**: A collectible achievement awarded to a User upon meeting defined criteria
- **Streak**: A count of consecutive weeks a User has volunteered
- **Leaderboard**: A ranked list of Users or Groups ordered by XP
- **Group**: A collection of Users whose aggregate XP is tracked on the Leaderboard
- **RSVP_Modal**: A dialog component allowing a User to register for an Opportunity
- **Dashboard**: The authenticated User's personal stats and activity overview page
- **Navbar**: The top navigation bar present on all pages
- **Mock_Data**: Static TypeScript objects in `lib/mock-data.ts` used in place of API responses
- **XP_Progress_Bar**: A visual component showing a User's XP progress toward the next Level
- **Badge_Shelf**: A horizontal display of a User's earned and locked Badges
- **Leaderboard_Row**: A single row in the Leaderboard representing one User or Group
- **Impact_Story_Card**: A card on the Dashboard summarizing a User's volunteer impact narrative
- **Skeleton**: A loading placeholder UI shown while content is being rendered

---

## Requirements

### Requirement 1: Mock Data Foundation

**User Story:** As a developer, I want a centralized mock data module, so that all pages and components render realistic content without a backend.

#### Acceptance Criteria

1. THE App SHALL export from `lib/mock-data.ts` a collection of 12 Opportunity objects, each containing: id, title, org, category, date, location, spotsTotal, spotsFilled, xpReward, imageUrl, and description fields.
2. THE App SHALL export from `lib/mock-data.ts` a collection of 10 User objects, each containing: id, name, displayName, city, xp, level, streak, and badges fields.
3. THE App SHALL export from `lib/mock-data.ts` a collection of 5 Group objects, each containing: id, name, city, memberCount, and aggregateXp fields.
4. THE App SHALL export from `lib/mock-data.ts` a collection of 8 Badge definition objects, each containing: id, name, icon, description, and xpRequired fields.
5. THE App SHALL export from `lib/mock-data.ts` a single Current_User object representing the logged-in volunteer.
6. THE App SHALL export from `lib/mock-data.ts` a collection of 3 upcoming signup objects, each referencing an Opportunity id and containing a status field.
7. THE App SHALL define TypeScript interfaces for all Mock_Data shapes in `lib/mock-data.ts`.

---

### Requirement 2: Global Navigation

**User Story:** As a visitor, I want a consistent navigation bar on every page, so that I can move between sections of the app without getting lost.

#### Acceptance Criteria

1. THE Navbar SHALL render on every page of the App.
2. THE Navbar SHALL display the VolunteerQuest logo (leaf/nature icon + wordmark) on the left side.
3. THE Navbar SHALL display navigation links to: Home (/), Opportunities (/opportunities), Leaderboard (/leaderboard), and Dashboard (/dashboard).
4. THE Navbar SHALL display a "Sign In" button that links to /auth when no Current_User session is active.
5. WHEN the viewport width is below 768px, THE Navbar SHALL collapse navigation links into a hamburger menu.
6. WHEN the hamburger menu icon is tapped, THE Navbar SHALL toggle a mobile navigation drawer open or closed.
7. THE Navbar SHALL use the Forest Green primary color (#2D6A4F) as its background.

---

### Requirement 3: Landing Page

**User Story:** As a first-time visitor, I want an engaging landing page, so that I understand what VolunteerQuest is and feel motivated to explore opportunities.

#### Acceptance Criteria

1. THE App SHALL render a hero section on the landing page (/) containing a headline, subheadline, and a primary call-to-action button linking to /opportunities.
2. THE App SHALL render a "How It Works" section on the landing page describing the volunteer-to-XP flow in 3 or more steps.
3. THE App SHALL render a featured Opportunity_Grid on the landing page displaying 3 Opportunity_Cards sourced from Mock_Data.
4. THE App SHALL render a gamification teaser section on the landing page highlighting XP, Badges, and Leaderboard features.
5. THE App SHALL render a footer on the landing page containing links and a copyright notice.
6. THE App SHALL apply the Forest Green primary color and amber/gold accent color consistently across the landing page sections.

---

### Requirement 4: Opportunity Discovery Page

**User Story:** As a volunteer, I want to browse and filter volunteer opportunities, so that I can find events that match my interests and schedule.

#### Acceptance Criteria

1. THE App SHALL render a search bar at the top of the Opportunity Discovery page (/opportunities).
2. THE App SHALL render filter chips or a filter sidebar on the Opportunity Discovery page allowing filtering by category.
3. THE App SHALL render an Opportunity_Grid displaying all 12 Opportunity_Cards sourced from Mock_Data on the Opportunity Discovery page.
4. THE App SHALL render a map placeholder panel on the Opportunity Discovery page containing a comment `// TODO: Mapbox GL JS`.
5. THE Opportunity_Grid SHALL display 1 column on viewports below 768px, 2 columns on viewports between 768px and 1023px, and 3 columns on viewports 1024px and above.
6. THE App SHALL render Skeleton loading states in place of Opportunity_Cards during the initial render of the Opportunity_Grid.
7. WHEN search or filter inputs are changed, THE App SHALL display a `// TODO: real filter logic` comment in the handler and leave the displayed cards unchanged in the MVP.

---

### Requirement 5: Opportunity Card Component

**User Story:** As a volunteer, I want each opportunity displayed as a visual card, so that I can quickly scan key details and decide which ones interest me.

#### Acceptance Criteria

1. THE Opportunity_Card SHALL display: a cover image, organization name, opportunity title, location, category type, date, XP reward chip, and a "More Info" button.
2. WHEN a pointer device hovers over an Opportunity_Card, THE Opportunity_Card SHALL elevate its box shadow to indicate interactivity.
3. WHEN the "More Info" button on an Opportunity_Card is clicked, THE App SHALL navigate to the Opportunity Detail page for that Opportunity (`/opportunities/[id]`).
4. THE Opportunity_Card SHALL display the XP reward as an amber/gold chip badge in the top-right corner of the card image.
5. THE Opportunity_Card SHALL display a spots-remaining indicator derived from spotsTotal minus spotsFilled.

---

### Requirement 6: Opportunity Detail Page

**User Story:** As a volunteer, I want a detailed view of an opportunity, so that I can learn everything I need before committing to sign up.

#### Acceptance Criteria

1. THE App SHALL render a hero image at the top of the Opportunity Detail page (`/opportunities/[id]`).
2. THE App SHALL render the organization name, opportunity title, full description, and a details sidebar on the Opportunity Detail page.
3. THE details sidebar SHALL display: date, time, location, category, spots remaining, and XP reward.
4. THE App SHALL render an "RSVP" button on the Opportunity Detail page that opens the RSVP_Modal when clicked.
5. THE App SHALL render an "Add to Google Calendar" button on the Opportunity Detail page containing a `// TODO: Google Calendar API` comment in its handler.
6. THE App SHALL render a "Related Opportunities" section at the bottom of the Opportunity Detail page displaying up to 3 Opportunity_Cards from Mock_Data.
7. WHEN the Opportunity Detail page is loaded with an id that does not match any Mock_Data Opportunity, THE App SHALL render a "Not Found" message.

---

### Requirement 7: RSVP Modal

**User Story:** As a volunteer, I want to RSVP for an opportunity through a modal dialog, so that I can confirm my spot without leaving the detail page.

#### Acceptance Criteria

1. THE RSVP_Modal SHALL render as a Dialog component using shadcn/ui.
2. THE RSVP_Modal SHALL display the opportunity title and date in the dialog header.
3. THE RSVP_Modal SHALL contain a form with a name field and an email field.
4. WHEN the RSVP form is submitted with valid name and email values, THE RSVP_Modal SHALL transition to a success state.
5. WHEN the RSVP_Modal enters the success state, THE App SHALL display a confetti animation and a "+[xpReward] XP earned!" message.
6. WHEN the RSVP_Modal is in the success state, THE App SHALL display a "Close" button that dismisses the dialog.
7. IF the RSVP form is submitted with an empty name or email field, THEN THE RSVP_Modal SHALL display an inline validation error message.

---

### Requirement 8: User Dashboard

**User Story:** As a logged-in volunteer, I want a personal dashboard, so that I can track my XP, badges, upcoming events, and overall impact.

#### Acceptance Criteria

1. THE App SHALL render a welcome header on the Dashboard page (/dashboard) displaying the Current_User's displayName.
2. THE App SHALL render an XP_Progress_Bar on the Dashboard page showing the Current_User's current XP and the XP required for the next Level.
3. THE App SHALL render a stats row on the Dashboard page displaying: total XP, current Level, Streak count, and total opportunities completed.
4. THE stats row SHALL display as a 2-column by 2-row grid on viewports below 768px and as a 4-column single row on viewports 768px and above.
5. THE App SHALL render a Badge_Shelf on the Dashboard page displaying all 8 Badge definitions, with earned badges shown in full color and locked badges shown in greyscale with a lock icon.
6. THE App SHALL render an upcoming events section on the Dashboard page listing the 3 upcoming signup objects from Mock_Data.
7. THE App SHALL render an Impact_Story_Card on the Dashboard page containing a mock narrative summary of the Current_User's volunteer history.
8. THE App SHALL render a leaderboard preview section on the Dashboard page showing the top 3 Users from Mock_Data.

---

### Requirement 9: XP Progress Bar Component

**User Story:** As a volunteer, I want to see my XP progress visualized, so that I feel motivated to reach the next level.

#### Acceptance Criteria

1. THE XP_Progress_Bar SHALL use the shadcn/ui Progress component as its base.
2. THE XP_Progress_Bar SHALL display the current XP value, the level cap XP value, and the Level label.
3. WHEN the XP_Progress_Bar is mounted, THE XP_Progress_Bar SHALL animate the fill from 0% to the current progress percentage.
4. THE XP_Progress_Bar SHALL use the amber/gold accent color for the filled portion of the bar.

---

### Requirement 10: Badge Shelf Component

**User Story:** As a volunteer, I want to see all available badges and which ones I've earned, so that I know what achievements to work toward.

#### Acceptance Criteria

1. THE Badge_Shelf SHALL render each Badge as a circular icon with the badge name below it.
2. WHEN a pointer device hovers over an earned Badge, THE Badge_Shelf SHALL display a tooltip containing the badge description.
3. WHEN a pointer device hovers over an earned Badge, THE Badge_Shelf SHALL apply a scale and glow pulse animation.
4. THE Badge_Shelf SHALL render locked Badges in greyscale with a lock icon overlay.
5. THE Badge_Shelf SHALL render earned Badges in full color without a lock icon.

---

### Requirement 11: Leaderboard Page

**User Story:** As a volunteer, I want to see how I rank against others, so that I feel motivated by friendly competition.

#### Acceptance Criteria

1. THE App SHALL render a tab switcher on the Leaderboard page (/leaderboard) with three tabs: "Local", "My Group", and "Between Groups".
2. WHEN a Leaderboard tab is selected, THE App SHALL display the corresponding ranked list using Mock_Data with a smooth fade transition between tabs.
3. THE App SHALL render each entry in the ranked list as a Leaderboard_Row.
4. THE Leaderboard_Row SHALL display: rank number, avatar, display name, city, XP, and a Level badge chip.
5. THE Leaderboard_Row SHALL render the rank number in gold for rank 1, silver for rank 2, and bronze for rank 3.
6. THE App SHALL render a privacy note below the Leaderboard stating that display names are used instead of real names.
7. THE App SHALL render the Leaderboard as a full-width table on viewports 768px and above and as a card stack on viewports below 768px.

---

### Requirement 12: Organization Profile Page

**User Story:** As a volunteer, I want to view an organization's profile, so that I can learn about the org and see all their active opportunities.

#### Acceptance Criteria

1. THE App SHALL render an organization header on the Organization Profile page (`/orgs/[id]`) displaying the org name, logo placeholder, and a short description.
2. THE App SHALL render a stats section on the Organization Profile page displaying: total opportunities posted, total volunteers engaged, and total XP awarded.
3. THE App SHALL render a list of active Opportunity_Cards on the Organization Profile page filtered from Mock_Data by the org id.
4. WHEN the Organization Profile page is loaded with an id that does not match any Mock_Data Organization, THE App SHALL render a "Not Found" message.

---

### Requirement 13: Auth Page

**User Story:** As a visitor, I want a sign-in and sign-up page, so that I can understand the authentication flow even in the MVP.

#### Acceptance Criteria

1. THE App SHALL render a Sign In / Sign Up page at /auth.
2. THE App SHALL render a "Continue with Google" button on the auth page containing a `// TODO: Google OAuth` comment in its handler.
3. THE App SHALL render a "Send Magic Link" email input form on the auth page containing a `// TODO: magic link auth` comment in its handler.
4. WHEN the "Send Magic Link" button is clicked with a valid email address, THE App SHALL display a mock confirmation message: "Check your inbox for a sign-in link."
5. IF the "Send Magic Link" button is clicked with an empty or invalid email address, THEN THE App SHALL display an inline validation error.

---

### Requirement 14: Visual Design System

**User Story:** As a product stakeholder, I want a consistent visual design across all pages, so that the MVP feels polished and on-brand.

#### Acceptance Criteria

1. THE App SHALL use #2D6A4F (Forest Green) as the primary brand color for the Navbar, buttons, and key UI accents.
2. THE App SHALL use an amber/gold color (approximately #F59E0B) as the accent color for XP chips, badge highlights, and the XP_Progress_Bar fill.
3. THE App SHALL use white (#FFFFFF) as the primary background color for page content areas.
4. THE App SHALL apply a clean, modern sans-serif typeface (Inter or system-ui) consistently across all text elements.
5. THE App SHALL use shadcn/ui components as the base component library, extended with Tailwind CSS utility classes for brand customization.
6. THE App SHALL display the VolunteerQuest wordmark alongside a leaf or nature-themed icon in the Navbar and on the landing page hero.
