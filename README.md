# Flight Management PWA

A modern Progressive Web Application for booking and managing flights, built with Next.js 14, Supabase, and Zustand.

## Features

- **Flight Search**: Search flights by origin, destination, date, and passenger count
- **Interactive Seat Selection**: Real-time seat map with cabin class zones (First, Business, Economy)
- **Secure Booking**: Atomic booking operations with seat locking to prevent double-booking
- **Booking Management**: View, cancel, and reschedule bookings with proper validation
- **Real-time Updates**: Live seat availability updates using Supabase Realtime
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Authentication**: Supabase Auth integration with protected routes

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: Zustand with persistence
- **Styling**: Tailwind CSS
- **Form Validation**: React Hook Form + Zod
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Project Structure

```
flight-management-1/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Auth route group (login, signup)
│   ├── (main)/              # Main app route group
│   │   ├── booking/         # Booking flow pages
│   │   ├── flights/         # Flight search results
│   │   ├── my-bookings/     # User bookings management
│   │   ├── search/          # Flight search form
│   │   └── seats/           # Seat selection
│   └── api/                 # API routes
├── components/              # Reusable React components
│   ├── booking/            # Booking-related components
│   ├── flights/            # Flight display components
│   ├── my-bookings/        # Booking management components
│   ├── search/             # Search form components
│   └── seats/              # Seat map components
├── lib/                    # Utility libraries
│   ├── actions/            # Server actions
│   ├── queries/             # Database queries
│   ├── supabase/            # Supabase client config
│   └── utils/               # Helper functions
├── store/                  # Zustand state stores
│   ├── useFlightStore.ts    # Flight search & booking state
│   └── useUserStore.ts      # User auth state
├── supabase/               # Database migrations & seed
│   ├── migrations/          # SQL migration files
│   └── seed.sql            # Seed data
└── types/                  # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase project created

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd flight-management-1
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run database migrations:
```bash
# Apply migrations to your Supabase project
supabase db push
```

5. Seed the database (optional):
```bash
# Run the seed.sql file in Supabase SQL editor
# Or use: supabase db seed
```

6. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Database Schema

The application uses the following tables:

- **flights**: Flight information with route, schedule, and pricing
- **seats**: Seat inventory with cabin class and occupancy status
- **bookings**: Booking records with PNR and status
- **passengers**: Passenger details for each booking
- **reschedules**: Audit trail for booking reschedules

### Key Features

- **Row Level Security (RLS)**: Policies ensure users can only access their own data
- **Atomic Operations**: RPC functions (`reserve_seat`, `cancel_booking`, `reschedule_booking`) prevent race conditions
- **Cancellation Window**: Database trigger prevents cancellations within 2 hours of departure
- **Real-time Updates**: Seats table subscribed to Supabase Realtime for live availability

## State Management

The app uses Zustand with persistence middleware:

- **useFlightStore**: Manages search query, selected flight, and selected seat
  - Persists search data across sessions
  - Excludes sensitive data (passport numbers) from localStorage
  - Includes reset actions for logout and cancellation

- **useUserStore**: Manages user authentication state
  - Persists user session across sessions
  - Includes logout action

## Implementation Commits

The project follows a 13-commit implementation plan for clear Git history:

1. `chore: initialize Next.js app with Tailwind and core dependencies`
2. `feat(db): add schema migrations for flights, seats, bookings, passengers, and reschedules`
3. `feat(db): add RLS policies and atomic RPC functions for booking, cancel, and reschedule`
4. `feat(db): add cancellation trigger and seed data for flights, seats, and test user`
5. `feat(auth): configure Supabase clients, middleware, and login/signup flow`
6. `feat(store): implement Zustand stores with persist, partialize, and reset actions`
7. `feat(search): build flight search form and server-rendered results listing`
8. `feat(seats): build interactive seat map with class zones and realtime updates`
9. `feat(booking): add passenger form, atomic booking action, and confirmation page`
10. `feat(bookings): implement my bookings page and atomic cancellation flow`
11. `feat(bookings): implement reschedule flow with fee calculation and atomic seat transfer`
12. `style: complete responsive polish, loading states, and UX edge-case handling`
13. `docs: add README, env example, deployment notes`

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Digital Ocean App Platform

## Testing

Create a test user in Supabase Auth to test the booking flow:
1. Go to Supabase Dashboard → Authentication
2. Create a new user
3. Use these credentials to sign in

## License

This project is for demonstration purposes.
