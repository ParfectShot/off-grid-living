# Off-Grid Living Application

A comprehensive platform for off-grid living resources, calculators, and information.

## Monorepo Structure

This project uses Turborepo to manage the monorepo structure with two main applications:

- **Frontend**: React application with TanStack Router and React Query
- **Backend**: NestJS API server

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Run both frontend and backend in development mode:

```bash
npm run dev
```

Or run specific applications:

```bash
# Frontend only
npm run dev --filter=frontend

# Backend only
npm run dev --filter=backend
```

### Building

Build all applications:

```bash
npm run build
```

### Running Production

Start all applications in production mode:

```bash
npm run start
```

## Technologies Used

### Frontend
- React
- TypeScript
- TanStack Router
- React Query
- Tailwind CSS
- shadcn/ui components

### Backend
- NestJS
- TypeScript
- Express

## Project Structure

```
apps/
├── frontend/         # React frontend application
│   └── src/          # Frontend source code
├── backend/          # NestJS backend application
│   └── src/          # Backend source code
packages/             # Shared packages (future use)
```
