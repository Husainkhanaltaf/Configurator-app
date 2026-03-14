# Configurator

A full-stack app for configuring analytics tool screens and modules, generating JSON, and storing configuration in PostgreSQL.

## Features
- Dynamic hierarchy configuration (Store/Product)
- Screen selection
- Module configuration (parameters only)
- KPI selection
- Dynamic JSON generation
- Review and approval workflow
- PostgreSQL storage (relational + JSONB)
- REST API layer

## Stack
- Backend: Node.js, Express, PostgreSQL
- Frontend: React

## Setup
1. Backend: Node.js, Express, PostgreSQL
2. Frontend: React

## Workflow
1. Configure hierarchies
2. Select screens
3. Configure modules
4. Select KPIs
5. Review configuration
6. Approve/Edit/Reject
7. Store in PostgreSQL

## API Endpoints
- POST /generate-config
- GET /review-config
- POST /approve-config
- PUT /edit-config

## Database
- Relational tables: hierarchies, screens, filters
- JSONB columns: module configuration

---

Replace placeholders as needed for your environment.
