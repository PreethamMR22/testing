# EduVision - Educational Animation Platform

## Overview

EduVision is a full-stack educational platform that transforms text prompts into visual learning experiences. Users can generate educational animation videos from text descriptions, access automatically generated study notes, and test their knowledge through interactive quizzes. The platform features a modern, student-friendly interface built with React and Express, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript (TSX)
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight React Router alternative)
- TanStack Query (React Query) for server state management and data fetching

**UI Component System**
- Shadcn UI component library (Radix UI primitives + custom styling)
- Tailwind CSS for utility-first styling with custom design tokens
- Dark/light theme support with localStorage persistence
- Fluent Design System approach with glass-morphism effects, gradients, and geometric patterns

**State Management Strategy**
- React Context API for global application state (AppContext)
- TanStack Query for server state caching and synchronization
- Local component state with React hooks for UI interactions
- Custom hooks for reusable logic (use-mobile, use-toast)

**Design System Configuration**
- Typography: Inter font family via Google Fonts CDN
- Color system: HSL-based with CSS custom properties for theming
- Spacing: Tailwind's standard scale (4, 6, 8, 12, 16 units)
- Components follow "New York" Shadcn UI style variant
- Rounded corners: xl to 2xl radius for cards and containers
- Elevation: Shadow-based depth system with hover states

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- Node.js runtime with ES modules (type: "module")
- HTTP server wrapper for potential WebSocket support

**API Design Pattern**
- RESTful API endpoints under `/api` prefix
- JSON request/response format
- Express middleware for body parsing and logging
- Custom logging utility with timestamp formatting

**Request Flow**
1. Client sends JSON requests to `/api/*` endpoints
2. Express middleware parses request body and logs activity
3. Route handlers interact with storage layer
4. Responses sent as JSON with appropriate status codes
5. Static files served from `dist/public` in production

**Key API Endpoints**
- `POST /api/generate` - Generate educational video from prompt
- `POST /api/quiz` - Submit quiz attempt and calculate results
- `GET /api/profile` - Retrieve user profile and statistics
- Video generation includes artificial 1.5s delay to simulate processing

### Database Architecture

**ORM & Schema Management**
- Drizzle ORM for type-safe database operations
- Schema-first design with TypeScript definitions
- Migrations managed in `/migrations` directory
- Drizzle Kit for schema synchronization (`db:push` command)

**Database Schema**

**Users Table**
- Primary key: UUID (auto-generated)
- Username: Unique text field for identification
- Password: Text field (hashed credentials)
- Streak: Integer tracking consecutive learning days
- Created timestamp for account age tracking

**Generated Videos Table**
- Links to users table (nullable foreign key for guest support)
- Stores prompt text and placeholder video URL
- Timestamp for chronological ordering

**Notes Table**
- Links to generated videos (required foreign key)
- Stores markdown-formatted educational notes
- Downloaded flag to track usage analytics
- Creation timestamp

**Quiz Attempts Table**
- Links to users table (nullable for guests)
- Stores prompt, score, and total questions
- Used for pass/fail calculation and history
- Timestamp for progress tracking

**Data Access Layer**
- Storage interface (IStorage) defines database contract
- DatabaseStorage class implements interface using Drizzle
- Abstraction allows for future storage backend swapping
- All database queries use Drizzle's query builder

### Content Generation Strategy

**Placeholder Video System**
- No external API calls (credit-safe design)
- Placeholder video component with animation states
- `/placeholder.mp4` URL used for all generated videos
- 16:9 aspect ratio container with gradient backgrounds

**Notes Generation**
- Template-based notes creation from prompt
- Markdown format for structured content
- Includes sections: Key Concepts, Mathematical Foundation, Applications, Summary
- Download functionality creates `.md` files client-side

**Quiz Generation**
- Deterministic quiz creation from prompt text
- Five multiple-choice questions per quiz
- Questions follow a consistent template structure
- Pass threshold: 60% (3/5 questions minimum)

### External Dependencies

**Database Service**
- Neon Serverless PostgreSQL via `@neondatabase/serverless`
- Connection managed through DATABASE_URL environment variable
- HTTP-based connection using Neon's serverless driver
- Database provisioning required before application start

**UI Component Library**
- Radix UI primitives for accessible components (accordion, dialog, dropdown, etc.)
- 20+ Radix UI packages for complete UI component coverage
- Headless components styled with Tailwind CSS
- Custom wrapper components in `/client/src/components/ui`

**Styling & Theming**
- Tailwind CSS v3+ with PostCSS processing
- Autoprefixer for browser compatibility
- CSS custom properties for dynamic theming
- Class Variance Authority (CVA) for component variants
- CLSX + Tailwind Merge for conditional class composition

**Development Tools**
- Replit-specific plugins for development (cartographer, dev-banner, error modal)
- TypeScript for type safety across frontend and backend
- ESBuild for production server bundling
- Vite plugin ecosystem for HMR and development experience

**Form Handling**
- React Hook Form for form state management
- Zod for schema validation
- @hookform/resolvers for Zod integration
- Drizzle-Zod for automatic schema-to-validation conversion

**Date Handling**
- date-fns for date formatting and manipulation
- Used in quiz history and profile statistics display

**Utility Libraries**
- Nanoid for unique ID generation
- Wouter for routing (lighter alternative to React Router)
- Embla Carousel for potential carousel components
- CMDK for command palette functionality