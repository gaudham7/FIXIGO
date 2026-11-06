# FIXIGO — Project File Architecture

**Product:** FIXIGO — AI-Powered Universal Workforce Intelligence Platform  
**Tagline:** Right Place. Right Skill. Right Time.  
**Architecture type:** Mobile-first monorepo with modular backend  
**Document version:** 1.0  
**Status:** Proposed development structure

---

## 1. Architecture decisions

FIXIGO will use a monorepo so that the mobile app, backend, web administration dashboard, shared contracts, and project documentation can be maintained in one repository.

| Layer | Selected technology |
|---|---|
| Mobile application | React Native + Expo |
| Mobile language | TypeScript |
| Mobile navigation | Expo Router |
| Mobile styling | NativeWind |
| Client state | Zustand |
| API/server state | TanStack Query |
| Web administration | Next.js + TypeScript |
| Backend API | Python + FastAPI |
| Request validation | Pydantic |
| ORM | SQLAlchemy |
| Database migrations | Alembic |
| Main database | PostgreSQL |
| Managed backend services | Supabase (PostgreSQL, Auth, Storage, Realtime where appropriate) |
| Cache and coordination | Redis |
| Background jobs | Celery or an equivalent worker queue |
| AI/ML | Python AI ecosystem and selected model providers |
| API testing | Postman / Swagger UI |
| Version control | Git + GitHub |
| Mobile builds | Expo EAS |
| Containerization | Docker |

**Architecture principle:** The mobile app and admin dashboard communicate with the same FastAPI backend. Business rules must live in the backend, not be duplicated in each client.

---

## 2. Recommended repository structure

```text
fixigo/
│
├── apps/
│   ├── mobile/                         # Customer and worker mobile application
│   │   ├── app/                         # Expo Router routes
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx
│   │   │   ├── (auth)/
│   │   │   │   ├── _layout.tsx
│   │   │   │   ├── login.tsx
│   │   │   │   ├── register.tsx
│   │   │   │   └── forgot-password.tsx
│   │   │   ├── (customer)/
│   │   │   │   ├── _layout.tsx
│   │   │   │   ├── home.tsx
│   │   │   │   ├── create-request.tsx
│   │   │   │   ├── request-details/[id].tsx
│   │   │   │   ├── matches/[requestId].tsx
│   │   │   │   ├── bookings/
│   │   │   │   ├── messages/
│   │   │   │   └── profile/
│   │   │   ├── (worker)/
│   │   │   │   ├── _layout.tsx
│   │   │   │   ├── dashboard.tsx
│   │   │   │   ├── opportunities/
│   │   │   │   ├── jobs/[id].tsx
│   │   │   │   ├── availability.tsx
│   │   │   │   ├── skills.tsx
│   │   │   │   ├── documents.tsx
│   │   │   │   ├── earnings.tsx
│   │   │   │   └── profile/
│   │   │   └── (shared)/
│   │   │       ├── notifications.tsx
│   │   │       ├── settings.tsx
│   │   │       └── support.tsx
│   │   │
│   │   ├── src/
│   │   │   ├── components/              # Reusable UI components
│   │   │   │   ├── ui/
│   │   │   │   ├── forms/
│   │   │   │   ├── maps/
│   │   │   │   └── feedback/
│   │   │   ├── features/                # Feature-oriented mobile modules
│   │   │   │   ├── auth/
│   │   │   │   ├── customer/
│   │   │   │   ├── worker/
│   │   │   │   ├── requests/
│   │   │   │   ├── matching/
│   │   │   │   ├── bookings/
│   │   │   │   ├── quotations/
│   │   │   │   ├── messaging/
│   │   │   │   ├── notifications/
│   │   │   │   └── reviews/
│   │   │   ├── hooks/
│   │   │   ├── lib/
│   │   │   │   ├── api-client.ts
│   │   │   │   ├── supabase.ts
│   │   │   │   ├── query-client.ts
│   │   │   │   └── permissions.ts
│   │   │   ├── store/                   # Zustand stores
│   │   │   ├── types/
│   │   │   ├── constants/
│   │   │   ├── utils/
│   │   │   └── theme/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── fonts/
│   │   ├── app.json
│   │   ├── eas.json
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env.example
│   │
│   └── admin-web/                      # Admin and operations dashboard
│       ├── app/
│       │   ├── (auth)/
│       │   ├── dashboard/
│       │   ├── users/
│       │   ├── workers/
│       │   ├── verification/
│       │   ├── categories/
│       │   ├── requests/
│       │   ├── matches/
│       │   ├── bookings/
│       │   ├── quotations/
│       │   ├── payments/
│       │   ├── disputes/
│       │   └── analytics/
│       ├── src/
│       │   ├── components/
│       │   ├── features/
│       │   ├── lib/
│       │   ├── hooks/
│       │   ├── types/
│       │   └── utils/
│       ├── public/
│       ├── package.json
│       ├── tsconfig.json
│       └── .env.example
│
├── backend/
│   ├── app/
│   │   ├── main.py                     # FastAPI application entry point
│   │   ├── core/
│   │   │   ├── config.py                # Environment configuration
│   │   │   ├── security.py              # Authentication/authorization helpers
│   │   │   ├── permissions.py
│   │   │   ├── logging.py
│   │   │   └── exceptions.py
│   │   │
│   │   ├── api/
│   │   │   ├── router.py                # Main API router
│   │   │   └── v1/
│   │   │       ├── router.py
│   │   │       └── endpoints/
│   │   │           ├── auth.py
│   │   │           ├── users.py
│   │   │           ├── customers.py
│   │   │           ├── workers.py
│   │   │           ├── addresses.py
│   │   │           ├── categories.py
│   │   │           ├── skills.py
│   │   │           ├── availability.py
│   │   │           ├── requests.py
│   │   │           ├── ai_analysis.py
│   │   │           ├── matching.py
│   │   │           ├── quotations.py
│   │   │           ├── bookings.py
│   │   │           ├── payments.py
│   │   │           ├── messages.py
│   │   │           ├── notifications.py
│   │   │           ├── reviews.py
│   │   │           ├── disputes.py
│   │   │           └── admin.py
│   │   │
│   │   ├── modules/                     # Business-domain modules
│   │   │   ├── identity/
│   │   │   │   ├── models.py
│   │   │   │   ├── schemas.py
│   │   │   │   ├── repository.py
│   │   │   │   └── service.py
│   │   │   ├── customers/
│   │   │   ├── workers/
│   │   │   ├── taxonomy/                # Service categories and skills
│   │   │   ├── addresses/
│   │   │   ├── availability/
│   │   │   ├── service_requests/
│   │   │   ├── ai_intelligence/
│   │   │   │   ├── request_understanding/
│   │   │   │   ├── skill_extraction/
│   │   │   │   ├── complexity_estimation/
│   │   │   │   ├── matching/
│   │   │   │   ├── pricing_assistance/
│   │   │   │   └── model_registry/
│   │   │   ├── bookings/
│   │   │   ├── quotations/
│   │   │   ├── payments/
│   │   │   ├── messaging/
│   │   │   ├── notifications/
│   │   │   ├── reviews/
│   │   │   ├── disputes/
│   │   │   └── analytics/
│   │   │
│   │   ├── db/
│   │   │   ├── base.py
│   │   │   ├── session.py
│   │   │   └── init_db.py
│   │   ├── integrations/
│   │   │   ├── supabase/
│   │   │   ├── maps/
│   │   │   ├── payments/
│   │   │   ├── notifications/
│   │   │   └── ai_providers/
│   │   ├── workers/                     # Background task definitions
│   │   └── utils/
│   │
│   ├── alembic/
│   │   ├── versions/
│   │   └── env.py
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── api/
│   ├── requirements.txt
│   ├── pyproject.toml
│   ├── alembic.ini
│   ├── Dockerfile
│   └── .env.example
│
├── infrastructure/
│   ├── docker/
│   │   ├── docker-compose.yml
│   │   └── redis.conf
│   ├── database/
│   │   ├── schema/
│   │   ├── seeds/
│   │   └── policies/
│   ├── supabase/
│   │   ├── migrations/
│   │   └── config.toml
│   └── deployment/
│       ├── backend/
│       ├── mobile/
│       └── admin-web/
│
├── packages/
│   ├── api-contracts/                   # Shared API/type documentation
│   ├── design-tokens/                   # Shared brand tokens where applicable
│   └── validation/                      # Shared validation definitions if suitable
│
├── docs/
│   ├── requirement.md
│   ├── architecture.md
│   ├── database/
│   │   ├── er-diagram.md
│   │   └── relational-schema.md
│   ├── api/
│   │   └── api-guidelines.md
│   ├── workflows/
│   │   ├── customer-journey.md
│   │   ├── worker-journey.md
│   │   └── booking-lifecycle.md
│   ├── security/
│   │   └── privacy-and-security.md
│   └── deployment/
│       └── deployment-guide.md
│
├── scripts/
│   ├── dev-mobile.sh
│   ├── dev-backend.sh
│   ├── dev-admin.sh
│   └── check-env.py
│
├── .github/
│   └── workflows/
│       ├── backend-tests.yml
│       └── mobile-checks.yml
│
├── .gitignore
├── .editorconfig
├── .env.example
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

## 3. Mobile application organization

The mobile application should be one Expo project with role-based navigation for customers and workers.

### Customer feature modules

| Module | Responsibilities |
|---|---|
| `auth` | Registration, login, recovery, session handling |
| `customer` | Customer home, profile, saved addresses |
| `requests` | Create, edit, view, and track service requests |
| `matching` | View ranked workers and match details |
| `bookings` | Booking details, scheduling, cancellation and status |
| `quotations` | View, compare, and approve quotations |
| `messaging` | Customer-worker communication |
| `notifications` | Booking, worker and service alerts |
| `reviews` | Ratings, feedback and complaint entry |

### Worker feature modules

| Module | Responsibilities |
|---|---|
| `worker` | Worker dashboard and profile |
| `skills` | Skills, experience and proficiency |
| `documents` | Qualification and identity-document submission |
| `availability` | Working hours and service availability |
| `opportunities` | Relevant job opportunities |
| `jobs` | Accept/decline, job details and progress updates |
| `quotations` | Prepare and submit quotations |
| `earnings` | Earnings and payout information when enabled |
| `reviews` | Ratings and performance history |

### Mobile implementation rules

1. Keep screens in `app/` and reusable feature logic in `src/features/`.
2. Keep API calls in feature service files or a shared API layer, not directly scattered across screens.
3. Use TanStack Query for server data and Zustand for local UI/session state that is not already managed by the query cache.
4. Store sensitive session material using secure device storage or the chosen authentication SDK's secure session mechanism.
5. Request location, camera, photo-library and notification permissions only when the feature needs them.
6. Provide loading, empty, error, retry and offline states for important screens.
7. Do not place Supabase service-role keys, payment secrets or AI-provider secrets in the mobile app.

---

## 4. Backend module responsibilities

| Backend module | Responsibilities |
|---|---|
| `identity` | User identity, roles, authentication integration and authorization |
| `customers` | Customer profile and preferences |
| `workers` | Worker profile, experience and verification state |
| `taxonomy` | Service categories and skill definitions |
| `addresses` | Service addresses and location references |
| `availability` | Worker availability and service-area eligibility |
| `service_requests` | Request lifecycle and attached media references |
| `ai_intelligence` | Request interpretation, skill extraction and AI-assisted decisions |
| `matching` | Candidate filtering, scoring, ranking and match records |
| `quotations` | Pricing rules, quotation creation, approval and revisions |
| `bookings` | Booking creation and lifecycle |
| `payments` | Payment records, provider integration and refunds |
| `messaging` | Booking-related communication |
| `notifications` | Push and other notification dispatch |
| `reviews` | Customer and worker feedback |
| `disputes` | Complaint review and resolution |
| `analytics` | Operational reporting and later workforce intelligence |

Each domain module should normally contain:
- `models.py` — database models, where SQLAlchemy is used.
- `schemas.py` — Pydantic request and response schemas.
- `repository.py` — database access functions.
- `service.py` — business rules and orchestration.
- `tests/` — module-specific tests as the codebase grows.

Do not create empty files for every planned module at the beginning. Create a module when its implementation starts.

---

## 5. Data and database organization

PostgreSQL is the persistent source of truth. The initial logical entities include:

- `USER_ACCOUNT`
- `CUSTOMER_PROFILE`
- `WORKER_PROFILE`
- `ADDRESS`
- `SERVICE_CATEGORY`
- `SKILL`
- `WORKER_SKILL`
- `WORKER_DOCUMENT`
- `AVAILABILITY_SLOT`
- `SERVICE_REQUEST`
- `REQUEST_MEDIA`
- `AI_ANALYSIS`
- `REQUEST_SKILL`
- `MATCH_RESULT`
- `BOOKING`
- `QUOTATION`
- `QUOTATION_ITEM`
- `JOB_STATUS_HISTORY`
- `PAYMENT`
- `REVIEW`
- `MESSAGE`
- `NOTIFICATION`
- `DISPUTE`

Keep database schema changes in version-controlled migrations. Avoid relying on manual production database edits.

Potential later entities include role assignments, service areas, pricing-rule history, quotation approvals, refunds, worker payouts, audit logs, AI model versions and demand analytics.

---

## 6. API organization

Use a versioned API prefix:

```text
/api/v1/
```

Suggested endpoint groups:

```text
/api/v1/auth
/api/v1/users
/api/v1/customers
/api/v1/workers
/api/v1/addresses
/api/v1/categories
/api/v1/skills
/api/v1/availability
/api/v1/requests
/api/v1/ai-analysis
/api/v1/matches
/api/v1/quotations
/api/v1/bookings
/api/v1/payments
/api/v1/messages
/api/v1/notifications
/api/v1/reviews
/api/v1/disputes
/api/v1/admin
```

The endpoint files should remain thin: validate input, enforce access, call the relevant domain service, and return a defined response. Business rules belong in the domain services.

---

## 7. Environment configuration

Use separate environment files for each deployable application. Commit only `.env.example` files containing placeholder values.

### Root `.env.example`

```dotenv
APP_ENV=development
```

### Mobile `.env.example`

```dotenv
EXPO_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

Only public client configuration belongs in `EXPO_PUBLIC_` variables. Never put service-role keys or private provider secrets in a mobile environment file.

### Backend `.env.example`

```dotenv
APP_ENV=development
API_V1_PREFIX=/api/v1

DATABASE_URL=
REDIS_URL=

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

AI_PROVIDER_API_KEY=
MAPS_PROVIDER_API_KEY=
PAYMENT_PROVIDER_KEY_ID=
PAYMENT_PROVIDER_KEY_SECRET=

JWT_ISSUER=
CORS_ALLOWED_ORIGINS=
```

Use a secret manager or deployment platform's protected environment variables for actual secrets. Do not commit populated `.env` files.

---

## 8. Development and deployment boundaries

### Local development

- Mobile app: Expo development server.
- Backend: FastAPI development server.
- Database: Supabase development project or local PostgreSQL.
- Redis: local Docker container or managed development instance.
- Admin dashboard: Next.js development server.

### Production

- Mobile: build and distribute through Expo EAS and the relevant app stores.
- Backend: deploy FastAPI as a secured application service.
- Database: managed PostgreSQL/Supabase with backups and access policies.
- Redis: managed Redis if required by actual workload.
- Admin: deploy Next.js separately or through a suitable hosting platform.
- Files: private object storage with controlled access.
- Monitoring: application logs, error tracking, uptime checks and database monitoring.

The exact providers and deployment topology should be selected after cost, operational, compliance and scaling requirements are evaluated.

---

## 9. Security and access-control boundaries

1. Enforce authorization in FastAPI for every protected operation.
2. Apply database row-level security when using Supabase client access.
3. Do not expose private worker documents or customer media through public storage buckets.
4. Use signed, short-lived access URLs for private files where appropriate.
5. Keep payment and AI-provider secrets exclusively on trusted backend infrastructure.
6. Validate uploads by file type, size and content; do not trust filename extensions alone.
7. Restrict access to customer addresses and live worker location.
8. Record important verification, quotation, booking, payment and dispute changes.
9. Apply rate limits to authentication, request creation, messaging and other abuse-prone endpoints.
10. Define retention and deletion policies for personal data and uploaded documents.

---

## 10. Recommended implementation order

### Stage 1 — Repository and foundation

- Create the monorepo and workspace configuration.
- Initialize the Expo mobile app.
- Initialize the FastAPI backend.
- Initialize the Next.js admin application.
- Configure linting, formatting, environment examples and Git.
- Establish database connection and migration workflow.

### Stage 2 — Identity and workforce

- Implement authentication integration.
- Implement user roles and backend authorization.
- Implement customer and worker profiles.
- Implement skills, categories, documents and availability.

### Stage 3 — Service request and AI

- Implement service-request creation.
- Add media upload and secure storage.
- Implement AI request interpretation.
- Extract and validate required skills.
- Add clarification and customer-confirmation flow.

### Stage 4 — Matching and booking

- Implement worker eligibility filters.
- Implement explainable weighted ranking.
- Implement match results and worker notifications.
- Implement quotation and customer approval.
- Implement booking and job status history.

### Stage 5 — Service operations

- Implement messaging and notifications.
- Implement payment records and provider integration when approved.
- Implement completion confirmation, reviews and disputes.
- Build admin verification and operational workflows.

### Stage 6 — Pilot readiness

- Add automated tests and security checks.
- Validate privacy and permission behavior.
- Test real customer and worker workflows.
- Monitor matching, completion, cancellation and pricing outcomes.
- Improve the product using pilot evidence.

---

## 11. Architecture rules to preserve

- Start with a **modular monolith**, not microservices.
- Keep one authoritative backend for mobile and web clients.
- Keep PostgreSQL as the source of truth for durable business data.
- Use Redis only for appropriate temporary, cache and coordination workloads.
- Keep AI outputs structured, validated and reviewable.
- Use deterministic backend rules for final pricing and booking state transitions.
- Never trust a role, price, match score or booking status supplied by the client without server-side validation.
- Keep customer and worker experiences role-based, but avoid duplicating the same business logic.
- Separate MVP requirements from future capabilities; do not build forecasting or complex integrations before the core service journey works.

---

## 12. Important note

This is the **recommended target file architecture**, not a claim that all folders, services, integrations or features already exist. Create directories and files incrementally as each module is implemented. The exact package versions, API contracts, database migrations, deployment providers and security policies should be finalized during implementation.

**End of architecture document.**
