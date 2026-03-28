# XPLore
An AI-assisted community service platform for Montgomery County that streamlines volunteerism through categorized event discovery, automated requirement tracking, and interactive map integration.

## Setup

### Prerequisites
- Node.js 18+ and pnpm

### Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Configure the required environment variables in `.env`:
   - `DATABASE_URL`: PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Secret for NextAuth.js authentication
   - `NEXTAUTH_URL`: Application URL (http://localhost:3000 for local development)

3. Install dependencies and run the development server:
   ```bash
   cd Frontend
   pnpm install
   pnpm dev
   ```

### Map Integration

The application uses OpenStreetMap via Leaflet to display volunteer opportunity locations. No API key is required - the map tiles are provided by OpenStreetMap contributors.
