# CyberShield - Cybersecurity Awareness Platform

## Overview

CyberShield is an interactive web platform designed to promote cybersecurity awareness among students, employees, and general internet users. The platform provides educational articles, interactive quizzes, personal safety tips, and progress tracking through a modern, cyber-themed interface. Users can browse cybersecurity content publicly, but authentication is required to take quizzes and track learning progress through a personalized dashboard.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, built using Vite as the build tool and development server.

**UI Components**: Built with shadcn/ui (Radix UI primitives) and styled with TailwindCSS. The design follows a "Cyber-Tech Aesthetic" with dark mode support, drawing inspiration from modern cybersecurity platforms like CrowdStrike and Kaspersky.

**State Management**: TanStack Query (React Query) handles server state management, API calls, and caching. No global state management library is used beyond React Query's built-in capabilities.

**Routing**: Wouter provides lightweight client-side routing without the overhead of React Router.

**Design System**: 
- Typography uses Inter for body/headings, JetBrains Mono for code/technical elements
- Consistent spacing primitives (2, 4, 6, 8, 12, 16, 20, 24 units)
- Custom CSS variables for theming with light/dark mode support
- Cyber-themed visual elements including grid patterns, animated gradient orbs, and scan line effects

### Backend Architecture

**Framework**: Express.js server running on Node.js with TypeScript.

**API Design**: RESTful API architecture with endpoints organized by resource type (articles, quizzes, quiz attempts, auth).

**Authentication**: Replit Auth integration using OpenID Connect (OIDC) with Passport.js strategy. Session management via express-session with PostgreSQL-backed session storage (connect-pg-simple).

**Development vs Production**: Separate entry points (index-dev.ts and index-prod.ts) handle environment-specific concerns:
- Development: Vite dev server integration with HMR
- Production: Static file serving from pre-built dist directory

### Data Layer

**Database**: PostgreSQL accessed via Neon serverless driver for serverless-friendly connections.

**ORM**: Drizzle ORM provides type-safe database queries with schema defined in TypeScript. Schema changes are managed through Drizzle Kit migrations.

**Schema Design**:
- `users`: Stores user profiles populated from Replit Auth (id, email, name, profile image)
- `articles`: Educational cybersecurity content (categories: phishing, malware, passwords, safe-browsing, data-privacy, social-engineering)
- `quizzes`: Quiz metadata and questions stored as JSONB
- `quizAttempts`: User quiz submissions linking users to quizzes with scores and answers
- `sessions`: PostgreSQL-backed session storage for auth state

**Storage Abstraction**: IStorage interface defines data access operations, implemented by DatabaseStorage class. This abstraction allows potential swapping of storage backends without changing business logic.

### Authentication & Authorization

**Strategy**: Replit Auth (OpenID Connect) provides SSO authentication. Users are automatically created/updated in the database on first login.

**Session Management**: Express sessions stored in PostgreSQL with 1-week TTL. HTTP-only, secure cookies prevent XSS attacks.

**Protected Routes**: `isAuthenticated` middleware guards API endpoints requiring authentication (quiz submission, dashboard data, user profile).

**Public Access**: Articles and quiz content are publicly accessible without authentication, but taking quizzes and viewing progress requires login.

### Key Architectural Decisions

**Why Drizzle over other ORMs**: Drizzle provides excellent TypeScript support with minimal runtime overhead, generating types directly from schema definitions. It's more lightweight than TypeORM or Prisma while maintaining type safety.

**Why Neon Serverless**: Neon's serverless PostgreSQL driver handles connection pooling automatically, ideal for serverless/edge deployments and Replit's hosting environment.

**Why TanStack Query**: Provides declarate data fetching with built-in caching, automatic refetching, and optimistic updates. Reduces boilerplate compared to manual fetch() calls with useState/useEffect.

**Why Wouter over React Router**: Significantly smaller bundle size (~1.5KB vs 40KB+) while providing sufficient routing features for this application's needs.

**Separation of Development/Production Servers**: Development mode integrates Vite's dev server for HMR and fast refresh. Production mode serves pre-built static assets, optimizing for deployment performance.

## External Dependencies

### Third-Party Services

**Replit Auth**: OpenID Connect authentication provider handling user identity, session management, and SSO.

**Neon Database**: Serverless PostgreSQL hosting with automatic connection pooling and branching capabilities.

### Key NPM Packages

**UI & Styling**:
- `@radix-ui/*`: Unstyled, accessible UI primitives
- `tailwindcss`: Utility-first CSS framework
- `class-variance-authority`: Type-safe variant styling
- `lucide-react`: Icon library

**Data & State**:
- `@tanstack/react-query`: Server state management
- `drizzle-orm` + `drizzle-zod`: Type-safe ORM with Zod validation
- `@neondatabase/serverless`: PostgreSQL serverless driver

**Authentication**:
- `passport`: Authentication middleware
- `openid-client`: OpenID Connect client
- `express-session`: Session management
- `connect-pg-simple`: PostgreSQL session store

**Forms & Validation**:
- `react-hook-form`: Form state management
- `@hookform/resolvers`: Validation resolver integration
- `zod`: Schema validation

**Development Tools**:
- `vite`: Build tool and dev server
- `typescript`: Type safety
- `tsx`: TypeScript execution for Node.js

### Font Dependencies

Loaded from Google Fonts CDN:
- Inter (300-800 weights): Primary UI font
- JetBrains Mono (400-700 weights): Code/monospace font
- Poppins (600-800 weights): Display headings