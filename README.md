# Duty List Application

A full-stack duty management application with React, Express, and PostgreSQL.

## Prerequisites

- Node.js (v18+)
- Docker Desktop
- pnpm: `npm install -g pnpm`

## Setup

1. **Clone and install**

   ```bash
   git clone
   cd interview-task
   pnpm install
   ```

2. **Setup environment files**

   ```bash
   # Backend
   cd apps/backend
   cp .env.example .env

   # Frontend
   cd ../frontend
   cp .env.example .env
   cd ../..
   ```

3. **Start database**

   ```bash
   cd apps/backend
   docker-compose up -d
   cd ../..
   ```

4. **Run the application**
   ```bash
   cd interview-task
   pnpm dev
   ```
5. **serve the application after build**
   ```bash
   cd interview-task
   pnpm build
   pnpm serve (this command will serve frontend & backend at the same time)
   ```

## Access

- Frontend: http://localhost:5173
- Backend: http://localhost:4001

## Available Commands

```bash
pnpm dev          # Run development servers
pnpm build        # Build for production
pnpm test         # Run tests
```

## Stop Application

- `Ctrl+C` to stop dev servers
- `cd apps/backend && docker-compose down` to stop database
