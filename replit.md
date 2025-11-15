# Cyberpunk Terminal Portfolio

## Overview

This is a personal portfolio website built with a cyberpunk terminal aesthetic, showcasing an AI developer's projects, skills, and content. The application features a modern tech stack with React frontend and Express backend, designed to display GitHub repositories, YouTube videos, blog posts, and professional statistics in an immersive, futuristic interface.

The portfolio emphasizes visual storytelling through terminal-inspired design elements including particle effects, glitch animations, neon accents, and typing effects. The site is fully responsive and optimized for showcasing technical projects in AI, robotics, and LLM applications.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom cyberpunk theme configuration
- **Animations**: Framer Motion for page transitions and component animations, custom keyframe animations for terminal effects

**Design System**:
- Typography: JetBrains Mono/Fira Code for monospace (headings/code), Inter for body text
- Color Palette: Dark mode cyberpunk theme with terminal green (`#00ff9d`) as primary accent, cyan and magenta as secondary accents
- Custom animations: glow, float, typing, blink, glitch, scan effects
- Component library: Full shadcn/ui suite (accordion, dialog, card, badge, button, etc.)

**Key UI Sections**:
- Hero Section: Full viewport with particle.js background, typing animation for name/title, animated avatar with glitch effect
- About Section: Animated counter cards for stats (GitHub repos, followers, subscribers), skill progress bars with animation on scroll
- Projects Section: Grid layout showcasing GitHub repositories with stars, tech stack badges, and external links
- Content Section: Display of YouTube videos and blog posts with metadata (views, dates)
- Contact Section: Terminal-styled contact interface with social links

### Backend Architecture

**Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Development Server**: Custom Vite middleware integration for HMR during development
- **API Structure**: RESTful endpoints under `/api` prefix
- **Error Handling**: Centralized error handling with custom logging middleware
- **Request Logging**: Structured logging for API calls with duration tracking

**API Endpoints**:
- `GET /api/stats` - Fetch portfolio statistics
- `GET /api/projects` - Retrieve GitHub projects
- `GET /api/skills` - Get skills and proficiency levels
- `GET /api/videos` - Fetch YouTube videos metadata
- `GET /api/posts` - Retrieve blog posts

**Data Layer**:
- **Current Implementation**: In-memory storage (MemStorage class) with hardcoded data
- **Schema Validation**: Zod schemas for type-safe data structures (Project, Stat, Skill, Video, Post)
- **Future-Ready**: Database configuration present (Drizzle ORM with PostgreSQL via Neon serverless driver) for migration to persistent storage

### Data Storage Solutions

**Current**: In-memory storage via TypeScript classes implementing IStorage interface
- All data currently hardcoded in `server/storage.ts`
- Immediate response times with no database queries
- Data includes Russian-language content (portfolio owner speaks Russian)

**Prepared Database Setup** (not yet implemented):
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon serverless PostgreSQL (via `@neondatabase/serverless`)
- **Migrations**: Drizzle Kit configured with migration output to `./migrations`
- **Schema Location**: `./shared/schema.ts` contains Zod schemas ready for Drizzle conversion

**Rationale**: The in-memory approach allows rapid development and deployment without database setup complexity. The Drizzle configuration provides a clear migration path when persistent storage becomes necessary.

### Authentication and Authorization

**Current State**: No authentication implemented
- Portfolio is public-facing with read-only data
- No user accounts or protected routes
- No session management

**Prepared Infrastructure**:
- Session middleware packages installed (`connect-pg-simple` for PostgreSQL session store)
- Future implementation would support admin dashboard for content management

### Build and Deployment

**Development**:
- Vite dev server with HMR
- Express backend with hot reload via tsx
- Concurrent development of frontend and backend

**Production Build**:
- Frontend: Vite builds React app to `dist/public`
- Backend: esbuild bundles Express server to `dist/index.js`
- Single production server serves static frontend and API endpoints

**Configuration**:
- TypeScript strict mode enabled
- ESNext module system throughout
- Path aliases configured (`@/` for client, `@shared/` for shared code)

## External Dependencies

### Third-Party Services

**Expected Integrations** (based on content structure):
- **GitHub API**: Implied for fetching repository data (stars, languages, descriptions)
- **YouTube API**: For retrieving video metadata (thumbnails, views, dates)
- **Blog Platform**: Unknown external source for post data (possibly Medium, Dev.to, or custom CMS)

**Note**: Current implementation uses static data, but API structure suggests future integration with these services.

### Database

**Configured**: Neon Serverless PostgreSQL
- Connection via `DATABASE_URL` environment variable
- Serverless architecture suitable for Replit deployment
- Not currently in use but fully configured for activation

### UI Libraries

**Core Dependencies**:
- **Radix UI**: Comprehensive set of unstyled, accessible component primitives (27+ component packages)
- **Shadcn/ui**: Pre-styled Radix components with Tailwind CSS
- **Framer Motion**: Animation library for page transitions and interactive elements
- **React TSParticles**: Particle effect backgrounds (cyberpunk aesthetic)
- **tsparticles-slim**: Lightweight particle engine
- **Lucide React**: Icon library for consistent iconography
- **React Hook Form**: Form handling with `@hookform/resolvers` for validation
- **Embla Carousel**: Touch-friendly carousel component
- **CMDK**: Command palette component
- **Vaul**: Drawer component library

### Development Tools

- **Vite**: Build tool and dev server
- **TypeScript**: Type safety across full stack
- **Tailwind CSS**: Utility-first styling with PostCSS
- **Autoprefixer**: CSS vendor prefixing
- **Drizzle Kit**: Database migration tool
- **ESBuild**: Fast JavaScript bundler for production backend

### Fonts

**External Font Loading**:
- Google Fonts: Inter (sans-serif), JetBrains Mono, Fira Code (monospace)
- Preconnect optimization for performance
- Font weights: 300-700 for flexibility