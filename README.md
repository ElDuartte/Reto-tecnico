# Docker Development Setup

This project includes a Rails API backend and a Vite + React frontend. A `docker-compose.yml` file is provided to run the entire stack locally.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Quick Start

1. Copy `.env.example` to `.env` and adjust the variables if needed.
   ```bash
   cp .env.example .env
   ```
2. Build the containers and start the services:
   ```bash
   docker-compose up --build
   ```
   The first run installs Ruby gems, npm packages and sets up the database.
3. Visit the apps:
   - **Frontend:** <http://localhost:5173>
   - **Backend API:** <http://localhost:3001>
   - **PostgreSQL:** port `5432` (using the `db_data` volume for data)

Use `docker-compose down` to stop the services. The database contents will persist in the named volume until removed.

## 🐳 Run tests using Docker

```bash
docker-compose exec frontend sh
npm run test
<Other npm scripts you want to run reference the readme of the frontend>
```
