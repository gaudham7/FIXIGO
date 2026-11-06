# FIXIGO Architecture Summary

## Clients
- React Native + Expo mobile app for customer and worker role experiences.
- Next.js web app for administrators and operations.

## Backend
- FastAPI modular monolith.
- Domain modules for identity, customers, workers, taxonomy, requests, AI, matching, quotations, bookings, payments, messaging, notifications, reviews and disputes.

## Data and infrastructure
- PostgreSQL as durable source of truth.
- Redis for cache and coordination workloads.
- Supabase may provide managed PostgreSQL, Auth, Storage and Realtime services.
- AI, maps, payment and notification providers are integrated behind backend adapters.

## Key rule
All clients use the same backend APIs. Business rules and authorization are enforced server-side.
