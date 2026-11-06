# Backend domain modules

Create domain packages here as implementation begins. Suggested modules:
`identity`, `customers`, `workers`, `taxonomy`, `addresses`, `availability`,
`service_requests`, `ai_intelligence`, `matching`, `quotations`, `bookings`,
`payments`, `messaging`, `notifications`, `reviews`, `disputes`, and `analytics`.

Keep API endpoints thin. Put business rules in domain services and database access
behind repositories. Avoid creating empty placeholder files for features that are
not yet being implemented.
