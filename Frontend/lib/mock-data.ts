// VolunteerQuest Mock Data Module
// All TypeScript interfaces and static mock data for the frontend MVP

export interface Opportunity {
  id: string;
  title: string;
  org: string; // org id reference
  category: string;
  date: string; // ISO date string
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
  badges: string[]; // array of BadgeDefinition ids
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
  icon: string; // emoji or icon identifier
  description: string;
  xpRequired: number;
}

export interface Signup {
  opportunityId: string;
  status: "confirmed" | "waitlisted" | "pending";
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

// ---------------------------------------------------------------------------
// Badge Definitions (8 items)
// ---------------------------------------------------------------------------

export const badgeDefinitions: BadgeDefinition[] = [
  {
    id: "badge-first-steps",
    name: "First Steps",
    icon: "👣",
    description: "Complete your very first volunteer event.",
    xpRequired: 50,
  },
  {
    id: "badge-green-thumb",
    name: "Green Thumb",
    icon: "🌱",
    description: "Participate in 3 environmental or gardening events.",
    xpRequired: 150,
  },
  {
    id: "badge-community-hero",
    name: "Community Hero",
    icon: "🦸",
    description: "Accumulate 500 XP through community service.",
    xpRequired: 500,
  },
  {
    id: "badge-food-champion",
    name: "Food Champion",
    icon: "🥫",
    description: "Volunteer at a food bank or meal service 3 times.",
    xpRequired: 200,
  },
  {
    id: "badge-streak-master",
    name: "Streak Master",
    icon: "🔥",
    description: "Maintain a 4-week volunteering streak.",
    xpRequired: 300,
  },
  {
    id: "badge-animal-friend",
    name: "Animal Friend",
    icon: "🐾",
    description: "Help out at an animal shelter or rescue event.",
    xpRequired: 100,
  },
  {
    id: "badge-educator",
    name: "Educator",
    icon: "📚",
    description: "Tutor or mentor youth in 2 or more education events.",
    xpRequired: 250,
  },
  {
    id: "badge-health-advocate",
    name: "Health Advocate",
    icon: "❤️",
    description: "Participate in a health fair or wellness outreach event.",
    xpRequired: 175,
  },
];

// ---------------------------------------------------------------------------
// Organizations (derived from opportunity org fields)
// ---------------------------------------------------------------------------

export const organizations: Organization[] = [
  {
    id: "org-green-city",
    name: "Green City Initiative",
    description:
      "A nonprofit dedicated to urban greening, park restoration, and environmental education across the city.",
    logoUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=80&h=80&fit=crop",
  },
  {
    id: "org-food-network",
    name: "Community Food Network",
    description:
      "Fighting hunger one meal at a time — we operate food pantries, mobile kitchens, and nutrition programs.",
    logoUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=80&h=80&fit=crop",
  },
  {
    id: "org-bright-futures",
    name: "Bright Futures Education",
    description:
      "Empowering underserved youth through tutoring, mentorship, and after-school enrichment programs.",
    logoUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=80&h=80&fit=crop",
  },
  {
    id: "org-paws-rescue",
    name: "Paws & Claws Rescue",
    description:
      "A no-kill animal shelter providing rescue, rehabilitation, and adoption services for dogs and cats.",
    logoUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=80&h=80&fit=crop",
  },
  {
    id: "org-health-forward",
    name: "Health Forward",
    description:
      "Bringing free health screenings, wellness workshops, and mental health resources to underserved communities.",
    logoUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=80&h=80&fit=crop",
  },
  {
    id: "org-civic-builders",
    name: "Civic Builders",
    description:
      "Strengthening neighborhoods through community clean-ups, infrastructure projects, and civic engagement programs.",
    logoUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=80&h=80&fit=crop",
  },
];

// ---------------------------------------------------------------------------
// Opportunities (12 items)
// ---------------------------------------------------------------------------

export const opportunities: Opportunity[] = [
  {
    id: "opp-001",
    title: "Riverside Park Trail Cleanup",
    org: "org-green-city",
    category: "Environment",
    date: "2025-08-02T09:00:00.000Z",
    location: "Riverside Park, Portland, OR",
    spotsTotal: 20,
    spotsFilled: 14,
    xpReward: 75,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    description:
      "Join us for a morning trail cleanup along the Riverside Park path. We'll remove invasive plants, pick up litter, and restore native habitat. Gloves and bags provided — just bring water and sturdy shoes.",
  },
  {
    id: "opp-002",
    title: "Community Garden Planting Day",
    org: "org-green-city",
    category: "Environment",
    date: "2025-08-09T08:30:00.000Z",
    location: "Eastside Community Garden, Portland, OR",
    spotsTotal: 15,
    spotsFilled: 7,
    xpReward: 80,
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
    description:
      "Help plant seasonal vegetables and herbs in our community garden. Produce is donated to local food banks. No gardening experience needed — our team will guide you through every step.",
  },
  {
    id: "opp-003",
    title: "Weekend Food Pantry Shift",
    org: "org-food-network",
    category: "Food Bank",
    date: "2025-08-03T10:00:00.000Z",
    location: "Community Food Network HQ, Portland, OR",
    spotsTotal: 12,
    spotsFilled: 12,
    xpReward: 60,
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop",
    description:
      "Sort and distribute food donations at our main pantry location. Volunteers help check expiration dates, organize shelves, and assist families as they shop. This shift is fully booked — join the waitlist!",
  },
  {
    id: "opp-004",
    title: "Mobile Meal Delivery",
    org: "org-food-network",
    category: "Food Bank",
    date: "2025-08-10T11:00:00.000Z",
    location: "Various Neighborhoods, Portland, OR",
    spotsTotal: 8,
    spotsFilled: 3,
    xpReward: 90,
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop",
    description:
      "Deliver hot meals to homebound seniors and individuals with disabilities. Drivers and passenger assistants needed. A valid driver's license is required for drivers; passengers just need a friendly smile.",
  },
  {
    id: "opp-005",
    title: "After-School Math Tutoring",
    org: "org-bright-futures",
    category: "Education",
    date: "2025-08-05T15:00:00.000Z",
    location: "Jefferson Middle School, Portland, OR",
    spotsTotal: 10,
    spotsFilled: 6,
    xpReward: 70,
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
    description:
      "Tutor 6th–8th grade students in math fundamentals. Sessions run Tuesday and Thursday afternoons. Volunteers commit to at least 4 sessions. Background check required — we'll guide you through the process.",
  },
  {
    id: "opp-006",
    title: "Summer Reading Program Mentor",
    org: "org-bright-futures",
    category: "Education",
    date: "2025-08-12T13:00:00.000Z",
    location: "Multnomah County Library, Portland, OR",
    spotsTotal: 16,
    spotsFilled: 9,
    xpReward: 65,
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
    description:
      "Read aloud and lead book discussions with elementary-age children during our summer reading program. Help kids discover the joy of reading while earning XP for your civic engagement.",
  },
  {
    id: "opp-007",
    title: "Dog Walking & Socialization",
    org: "org-paws-rescue",
    category: "Animal Shelter",
    date: "2025-08-06T09:00:00.000Z",
    location: "Paws & Claws Rescue Shelter, Portland, OR",
    spotsTotal: 10,
    spotsFilled: 4,
    xpReward: 55,
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop",
    description:
      "Walk and socialize dogs awaiting adoption. Regular interaction improves their behavior and increases adoption rates. Orientation required for first-time volunteers — arrive 15 minutes early.",
  },
  {
    id: "opp-008",
    title: "Cat Socialization & Enrichment",
    org: "org-paws-rescue",
    category: "Animal Shelter",
    date: "2025-08-13T10:00:00.000Z",
    location: "Paws & Claws Rescue Shelter, Portland, OR",
    spotsTotal: 8,
    spotsFilled: 2,
    xpReward: 55,
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop",
    description:
      "Spend time with cats in our adoption rooms — play, groom, and provide enrichment activities. Socialized cats are adopted faster. Perfect for cat lovers of all ages (12+ with adult supervision).",
  },
  {
    id: "opp-009",
    title: "Free Health Screening Fair",
    org: "org-health-forward",
    category: "Health",
    date: "2025-08-16T08:00:00.000Z",
    location: "Holladay Park, Portland, OR",
    spotsTotal: 25,
    spotsFilled: 18,
    xpReward: 100,
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    description:
      "Assist at our free community health fair offering blood pressure checks, diabetes screenings, and mental health resources. Volunteers help with registration, booth setup, and guiding attendees.",
  },
  {
    id: "opp-010",
    title: "Mental Health Awareness Walk",
    org: "org-health-forward",
    category: "Health",
    date: "2025-08-23T09:30:00.000Z",
    location: "Tom McCall Waterfront Park, Portland, OR",
    spotsTotal: 50,
    spotsFilled: 31,
    xpReward: 85,
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    description:
      "Join our annual 5K awareness walk to reduce stigma around mental health. Volunteers help with route marshaling, water stations, and participant check-in. All fitness levels welcome.",
  },
  {
    id: "opp-011",
    title: "Neighborhood Mural Painting",
    org: "org-civic-builders",
    category: "Community",
    date: "2025-08-17T10:00:00.000Z",
    location: "Alberta Arts District, Portland, OR",
    spotsTotal: 18,
    spotsFilled: 11,
    xpReward: 95,
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop",
    description:
      "Help paint a community mural celebrating Portland's cultural diversity. No art experience required — our lead artist will direct the project. Wear clothes you don't mind getting paint on!",
  },
  {
    id: "opp-012",
    title: "Graffiti Removal & Beautification",
    org: "org-civic-builders",
    category: "Community",
    date: "2025-08-24T08:00:00.000Z",
    location: "Inner SE Portland, Portland, OR",
    spotsTotal: 14,
    spotsFilled: 5,
    xpReward: 70,
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    description:
      "Remove graffiti and beautify storefronts in the Inner SE neighborhood. Supplies provided. This is a great way to make a visible difference in your community in just a few hours.",
  },
];

// ---------------------------------------------------------------------------
// Users (10 items)
// ---------------------------------------------------------------------------

export const users: User[] = [
  {
    id: "user-001",
    name: "Maya Chen",
    displayName: "MayaC",
    city: "Portland, OR",
    xp: 1240,
    level: 5,
    streak: 8,
    badges: [
      "badge-first-steps",
      "badge-green-thumb",
      "badge-community-hero",
      "badge-food-champion",
      "badge-streak-master",
    ],
  },
  {
    id: "user-002",
    name: "Jordan Rivera",
    displayName: "JRivera",
    city: "Portland, OR",
    xp: 980,
    level: 4,
    streak: 5,
    badges: ["badge-first-steps", "badge-animal-friend", "badge-educator"],
  },
  {
    id: "user-003",
    name: "Sam Okafor",
    displayName: "SamO",
    city: "Portland, OR",
    xp: 760,
    level: 3,
    streak: 3,
    badges: ["badge-first-steps", "badge-food-champion", "badge-health-advocate"],
  },
  {
    id: "user-004",
    name: "Priya Nair",
    displayName: "PriyaN",
    city: "Beaverton, OR",
    xp: 1580,
    level: 6,
    streak: 12,
    badges: [
      "badge-first-steps",
      "badge-green-thumb",
      "badge-community-hero",
      "badge-streak-master",
      "badge-educator",
      "badge-health-advocate",
    ],
  },
  {
    id: "user-005",
    name: "Alex Thompson",
    displayName: "AlexT",
    city: "Portland, OR",
    xp: 420,
    level: 2,
    streak: 2,
    badges: ["badge-first-steps", "badge-animal-friend"],
  },
  {
    id: "user-006",
    name: "Destiny Williams",
    displayName: "DestinyW",
    city: "Gresham, OR",
    xp: 2100,
    level: 8,
    streak: 20,
    badges: [
      "badge-first-steps",
      "badge-green-thumb",
      "badge-community-hero",
      "badge-food-champion",
      "badge-streak-master",
      "badge-animal-friend",
      "badge-educator",
      "badge-health-advocate",
    ],
  },
  {
    id: "user-007",
    name: "Marcus Lee",
    displayName: "MarcusL",
    city: "Lake Oswego, OR",
    xp: 310,
    level: 1,
    streak: 1,
    badges: ["badge-first-steps"],
  },
  {
    id: "user-008",
    name: "Sofia Gutierrez",
    displayName: "SofiaG",
    city: "Portland, OR",
    xp: 870,
    level: 4,
    streak: 6,
    badges: ["badge-first-steps", "badge-green-thumb", "badge-food-champion"],
  },
  {
    id: "user-009",
    name: "Ethan Park",
    displayName: "EthanP",
    city: "Hillsboro, OR",
    xp: 640,
    level: 3,
    streak: 4,
    badges: ["badge-first-steps", "badge-educator", "badge-health-advocate"],
  },
  {
    id: "user-010",
    name: "Aisha Johnson",
    displayName: "AishaJ",
    city: "Portland, OR",
    xp: 1090,
    level: 5,
    streak: 7,
    badges: [
      "badge-first-steps",
      "badge-community-hero",
      "badge-animal-friend",
      "badge-streak-master",
    ],
  },
];

// ---------------------------------------------------------------------------
// Current User (logged-in volunteer)
// ---------------------------------------------------------------------------

export const currentUser: User = users[0]; // Maya Chen

// ---------------------------------------------------------------------------
// Groups (5 items)
// ---------------------------------------------------------------------------

export const groups: Group[] = [
  {
    id: "group-001",
    name: "Portland Green Squad",
    city: "Portland, OR",
    memberCount: 24,
    aggregateXp: 18400,
  },
  {
    id: "group-002",
    name: "Eastside Helpers",
    city: "Portland, OR",
    memberCount: 17,
    aggregateXp: 12750,
  },
  {
    id: "group-003",
    name: "Beaverton Volunteers",
    city: "Beaverton, OR",
    memberCount: 31,
    aggregateXp: 24600,
  },
  {
    id: "group-004",
    name: "Gresham Community Crew",
    city: "Gresham, OR",
    memberCount: 12,
    aggregateXp: 8900,
  },
  {
    id: "group-005",
    name: "Hillsboro Hearts",
    city: "Hillsboro, OR",
    memberCount: 19,
    aggregateXp: 14200,
  },
];

// ---------------------------------------------------------------------------
// Upcoming Signups (3 items — reference valid opportunity ids)
// ---------------------------------------------------------------------------

export const upcomingSignups: Signup[] = [
  {
    opportunityId: "opp-001",
    status: "confirmed",
  },
  {
    opportunityId: "opp-005",
    status: "confirmed",
  },
  {
    opportunityId: "opp-003",
    status: "waitlisted",
  },
];
