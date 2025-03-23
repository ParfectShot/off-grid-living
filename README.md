# Off-Grid Living Application

A comprehensive platform for off-grid living resources, calculators, and information.

## Monorepo Structure

This project uses Turborepo to manage the monorepo structure with two main applications:

- **Frontend**: React application with TanStack Router and React Query
- **Backend**: NestJS API server

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

### Development

Run both frontend and backend in development mode:

```bash
bun dev
```

Or run specific applications:

```bash
# Frontend only
bun dev --filter=web

# Backend only
bun dev --filter=api
```

### Building

Build all applications:

```bash
bun build
```

### Running Production

Start all applications in production mode:

```bash
bun start
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
├── web/         # React frontend application
│   └── src/          # Frontend source code
├── api/          # NestJS backend application
│   └── src/          # Backend source code
packages/             # Shared packages (future use)
```
