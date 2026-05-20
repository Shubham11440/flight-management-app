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

The application uses the following tables (matching the Technical Assignment requirements):

- **flights**: Flight information with flight_no, route, schedule (departs_at, arrives_at), aircraft_type, status, and base_price
- **seats**: Seat inventory with seat_number, class (first/business/economy), is_available, and extra_fee
- **bookings**: Booking records with PNR, status, booked_at, and total_price
- **passengers**: Passenger details with full_name, passport_no, nationality, and dob
- **reschedules**: Audit trail for booking reschedules with requested_at and fee_charged

### Key Features

- **Row Level Security (RLS)**: Policies ensure users can only access their own bookings
- **Atomic Operations**: RPC functions (`reserve_seat`, `cancel_booking`, `reschedule_booking`) prevent race conditions using SELECT FOR UPDATE
- **Cancellation Window**: Database trigger prevents cancellations within 2 hours of departure (enforced at DB level)
- **Real-time Updates**: Seats table subscribed to Supabase Realtime for live availability

### Schema Changes

The database schema has been updated to match the Technical Assignment requirements:
- flights: Added `flight_no`, `aircraft_type`, `status`; changed `departure_time` to `departs_at`, `arrival_time` to `arrives_at`
- seats: Changed `cabin_class` to `class`, `is_occupied` to `is_available`, `price_multiplier` to `extra_fee`
- passengers: Changed `first_name`, `last_name` to `full_name`; `passport_number` to `passport_no`; added `nationality`, `dob`; removed `email`, `phone`
- reschedules: Simplified to `old_flight_id`, `new_flight_id`, `requested_at`, `fee_charged`

**Additional Schema Improvements:**
- Added NOT NULL constraints to all critical fields for data integrity
- Added ON DELETE CASCADE to foreign keys for automatic cleanup
- Added check constraints for positive values (price, extra_fee, fee_charged)

## State Management

The app uses Zustand with persistence middleware (matching Technical Assignment requirements):

- **useFlightStore**: Manages search query, selected flight, selected seat, current booking step, and passenger form data
  - Persists search data and booking progress across sessions
  - Uses `partialize` to exclude sensitive data (passport numbers) from localStorage
  - Includes reset actions for logout and cancellation
  - Supports optimistic seat selection

- **useUserStore**: Manages user authentication state and cached bookings
  - Persists only the session token (not full user data) as per assignment requirements
  - Includes logout and reset actions

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

### Test User Setup

Create a test user in Supabase Auth to test the booking flow:
1. Go to Supabase Dashboard → Authentication
2. Create a new user with email and password
3. Use these credentials to sign in

**Test User Credentials:**
- Email: test@flightapp.com
- Password: test@123

### Seed Data

The seed.sql file includes:
- 8 flights across 4 routes (NYC-LON, LON-PAR, TYO-SYD, DXB-SIN)
- Full seat maps for each flight (First, Business, Economy classes)
- Seat pricing: First Class (+$900), Business Class (+$450), Economy (base price)

### Running Migrations After Schema Changes

If you need to re-run migrations after schema changes:

1. Drop existing tables in Supabase SQL Editor:
```sql
DROP TABLE IF EXISTS reschedules CASCADE;
DROP TABLE IF EXISTS passengers CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS seats CASCADE;
DROP TABLE IF EXISTS flights CASCADE;
```

2. Re-run migrations in order (001 to 006) in Supabase SQL Editor

3. Run seed.sql to populate test data

### Important Notes

- The schema has been updated to match the Technical Assignment requirements
- All field names have been changed to match the assignment specifications
- The pricing model changed from multipliers to extra fees
- Passenger schema simplified to match assignment (removed email, phone; added nationality, dob)

## License

This project is for demonstration purposes.



-- Create the test user manually in Supabase Auth dashboard:
-- Email: test@flightapp.com
-- Password: test@123
