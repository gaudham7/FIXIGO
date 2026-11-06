# FIXIGO — Teal Ivory UI Preview

**Right Place. Right Skill. Right Time.**

This revision applies the selected **Teal Ivory** visual identity across the customer app, provider app and admin console. It expands the original starter screens into navigable portal previews so the workflows and design can be reviewed before backend implementation.

## Design system

| Token | Hex | Use |
|---|---|---|
| Primary teal | `#0B6B5B` | Main actions, navigation, brand |
| Deep teal | `#0F3D34` | Hero panels and admin sidebar |
| Ivory | `#F9F6EF` | App background |
| White | `#FFFFFF` | Cards and surfaces |
| Mint | `#6DD3B6` | Secondary accents and availability |
| Gold | `#D4A017` | Highlights and attention |
| Alert red | `#E74C3C` | Errors and urgent states |
| Success green | `#22C55E` | Verified and completed states |

Mobile tokens live in `apps/mobile/src/theme.ts`. Shared mobile UI primitives live in `apps/mobile/src/components/ui.tsx`. The admin console uses CSS variables in `apps/admin-web/app/globals.css`.

## Portals included in this preview

### Customer mobile portal
- Welcome / role selection
- Home dashboard and service-category shortcuts
- AI-assist-styled service request form (the current API call remains a basic demo request; AI analysis is not connected)
- Upcoming and completed booking preview
- Messages placeholder
- Profile, saved addresses, payments and support menu preview

### Provider mobile portal
- Overview dashboard and online/offline availability toggle
- Job opportunity cards with local accept-state interaction
- Earnings and transaction preview
- Professional profile, skills, service areas and verification menu preview

### Admin web portal
- Dashboard with sample KPI cards, activity chart and category breakdown
- Searchable/filterable service request table
- Navigable modules for requests, bookings/matching, providers, customers, verification, categories/skills, pricing oversight, disputes/support and analytics

## Run the apps

### Backend (same starter API)
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\Activate.ps1
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
# Windows: copy .env.example .env
# macOS/Linux: cp .env.example .env
uvicorn app.main:app --reload
```

### Mobile
```bash
cd apps/mobile
pnpm install
pnpm start
```
For a physical device, set `EXPO_PUBLIC_API_BASE_URL` in `apps/mobile/.env` to your computer's LAN IP. The customer request form still calls the demo FastAPI endpoint.

### Admin web
```bash
cd apps/admin-web
pnpm install
pnpm dev
```
Open http://localhost:3000.

## Important status and limitations

This is a **UI and interaction preview**, not a production-ready marketplace. Sample dashboard numbers, provider/customer records, booking cards, earnings, analytics and admin module records are illustrative local demo data. Provider accept actions and availability toggles change local UI state only. Admin create/export buttons are visual demo actions. Customer request submission is the only portal action currently wired to the starter API.

Not yet implemented: authentication and role-based access, persistent customer/provider/admin records, production booking lifecycle, AI request understanding, worker matching, deterministic pricing engine, document verification, payments/payouts, real-time tracking, chat, push notifications, dispute workflows and live analytics. Do not treat demo records or UI status as real operational data.

## Suggested next build order
1. Supabase Auth or equivalent, role-based access and protected portal routes.
2. PostgreSQL models and migrations for customers, providers, skills, requests, bookings and audit events.
3. Provider onboarding, verification and service-area APIs.
4. Request understanding, eligibility filters and explainable matching.
5. Quote approval, booking state machine, messaging and notifications.
6. Payments, refunds, dispute workflows and operational analytics.

## Animated FIXIGO banner demo

The admin web dashboard now includes a continuously looping FIXIGO banner (`apps/admin-web/app/FixigoAnimatedBanner.tsx`). It uses CSS keyframes and inline SVG characters rather than a static image or MP4. The logo letters twinkle sequentially; five service professionals move inward, settle together and raise a thumbs-up; service symbols and the phone mockup have subtle motion. It respects `prefers-reduced-motion` and scales down on narrow screens.

To preview the animation immediately without installing the Next.js app, open `apps/admin-web/demo.html` in a modern browser. To run it as part of the admin portal, follow the Admin web instructions above. The current starter does not yet implement authentication; therefore the banner appears on the dashboard when the portal loads. Once login and protected routes are added, keep this component on the post-login dashboard route so it appears after successful sign-in.


## Consolidated interactive application preview

Open `FIXIGO_Final_Application_Demo.html` in Chrome/Edge to explore the Customer, Provider and Admin portals in one responsive browser demo. Portal switching, navigation, service request creation, provider availability, job acceptance, admin search/filtering and sample management actions work locally in the browser. Data is demo-only and resets on refresh; this is not connected to production authentication, persistent storage, live AI, payments, or external services.


## Mobile-first portal and customer-home revision

The Expo/React Native app is the primary FIXIGO client. On first entry, users choose one of two experiences: **I need a service** (Customer) or **I provide services** (Provider). Admin is intentionally not offered in the mobile portal chooser; administrative operations remain a separate staff-facing surface.

Both mobile portals use the compact horizontal FIXIGO banner. Its React Native `Animated` component loops continuously: the infinity-inspired mark shimmers, FIXIGO letters illuminate sequentially, and miniature service professionals gather and raise thumbs-up gestures. The banner stays inside the top horizontal area of the mobile screen.

The customer home is ordered as requested:
1. Banner with FIXIGO logo, wordmark and exact motto.
2. Personal greeting: “Welcome back, [name]” and “How can I help you today?”
3. Search/request field with a microphone affordance.
4. Find a service category grid.
5. Request detail and continue action.
6. Previous bookings at the bottom.

The customer bottom navigation is **Home, Drafts, Messages, Profile**. The separate Bookings tab and the Upcoming bookings home card have been removed. Incomplete request text and category are saved locally through Expo SecureStore and can be resumed or deleted from Drafts.

Implementation boundaries: the customer demo name is currently a local placeholder (`Ashish`) until authentication/profile data is connected. The microphone button is a visible voice-input affordance; speech recognition is not connected yet. Draft persistence is local to the device. The current request submission still calls the starter API and is not AI-powered. The portal chooser is the app's entry route; real login, identity verification and role authorization still need to be connected before production release.
