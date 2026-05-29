# Duty List

Tech stacks:
React, Express, and PostgreSQL.

## Prerequisites

- Node.js (v18+)
- Docker Desktop
- pnpm: `npm install -g pnpm`

## Setup

1. **Clone and install**

   ```bash
   git clone
   cd todo-management
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
   cd todo-management
   pnpm dev
   ```
5. **serve the application after build**
   ```bash
   cd todo-management
   pnpm build
   pnpm serve (this command serve frontend & backend at the same time)
   ```
6. **Test the application **
   ```bash
   cd frontend
   pnpm jest
   ------------
   cd backend
   pnpm jest
   ------------
   cd todo-management
   pnpm test :run both test together
   ```

## Access

- Frontend: http://localhost:5173
- Backend baseUrl: http://localhost:4001/v1
