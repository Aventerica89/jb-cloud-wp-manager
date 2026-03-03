# WP Jupiter - WordPress Site Dashboard

A self-hosted WordPress site management dashboard, similar to MainWP but lightweight and built with modern tech.

## Documentation

- Sync to docs.jbcloud.app: Yes
- Project slug: wp-jupiter
- Docs URL: https://docs.jbcloud.app/wp-jupiter/

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Turso (SQLite edge database)
- **ORM**: Drizzle ORM
- **UI**: Tailwind CSS + shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React + Tabler Icons
- **Charts**: Recharts
- **Tables**: TanStack Table
- **Drag & Drop**: @dnd-kit
- **Validation**: Zod
- **Auth**: Jose (JWT)
- **Testing**: Vitest + Testing Library
- **Deployment**: Vercel (recommended)

## Project Structure

```
src/
├── app/
│   ├── (auth)/                 # Auth route group (login, setup)
│   ├── (dashboard)/            # Main dashboard layout
│   ├── activity/               # Activity log page
│   ├── api/
│   │   ├── sites/              # Site CRUD + health/plugins/themes
│   │   ├── sync/               # Bulk sync all sites
│   │   ├── projects/           # Project management
│   │   ├── providers/          # Hosting providers
│   │   ├── servers/            # Server management
│   │   ├── auth/               # Authentication endpoints
│   │   ├── activity/           # Activity log API
│   │   ├── notifications/      # Notification system
│   │   ├── search/             # Global search
│   │   ├── settings/           # App settings
│   │   ├── tags/               # Site tagging
│   │   ├── updates/            # Update history
│   │   └── uptime/             # Uptime monitoring
│   └── shadcn-demo/            # UI component showcase
├── components/
│   ├── ui/                     # shadcn/ui base components
│   └── updates/                # Update-specific components
└── lib/
    ├── db/                     # Turso/Drizzle client + schema
    ├── auth.ts                 # JWT auth helpers
    ├── business-logic.ts       # Core domain logic
    ├── notifications.ts        # Notification dispatch
    ├── scheduler.ts            # Sync scheduling
    ├── security-scanner.ts     # Security checks
    ├── uptime-monitor.ts       # Uptime tracking
    ├── validation.ts           # Zod schemas
    └── wordpress.ts            # WP REST API client
```

## Database Schema

Data hierarchy: **Project → Provider → Server → Site**

**Core:**
- **projects**: Top-level grouping (e.g. a client)
- **providers**: Hosting providers (e.g. xCloud, WP Engine)
- **servers**: Server instances under a provider
- **sites**: WordPress sites (belong to a server)
- **plugins / themes**: Installed per site
- **wp_users**: WordPress users on remote sites

**Operations:**
- **activity_log**: Action tracking
- **update_log**: Plugin/theme update history
- **tags / site_tags**: Tagging system for sites
- **scheduled_jobs**: Cron/sync scheduling
- **backups**: Backup records per site

**Monitoring:**
- **uptime_checks / uptime_incidents**: Uptime tracking
- **security_scans**: Security scan results
- **performance_metrics**: Performance data

**Auth & Notifications:**
- **users**: App users (JWT auth)
- **user_site_permissions**: Per-user site access
- **client_users / client_site_access**: Client portal
- **notification_settings / notification_history**: Alerts
- **white_label_settings**: White-label config

## Getting Started

### 1. Set up Turso database

```bash
# Install Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Login
turso auth login

# Create database
turso db create wp-jupiter

# Get credentials
turso db show wp-jupiter --url
turso db tokens create wp-jupiter
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and fill in:

```
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-token
```

### 3. Run migrations

```bash
npm run db:push
```

### 4. Start development

```bash
npm run dev
```

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests in watch mode (Vitest)
- `npm run test:run` - Run tests once (CI)
- `npm run test:coverage` - Run tests with coverage report
- `npm run env:inject` - Inject secrets from 1Password to `.env.local`
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio (database GUI)
- `npm run db:generate` - Generate migration files

## Adding a WordPress Site

### Option 1: Application Passwords (Standard)

1. Go to your WordPress site
2. Navigate to: Users → Profile → Application Passwords
3. Create a new application password
4. Add the site in WP Jupiter with the URL and credentials

### Option 2: WP Jupiter Connector Plugin (Recommended)

Some hosts (like xCloud.host) or security plugins block the standard WordPress REST API. Use the connector plugin instead:

1. Download `wordpress-plugin/wp-jupiter-connector.php` from this repo
2. Upload it to your WordPress site via Plugins → Add New → Upload Plugin
3. Activate the plugin
4. Go to Settings → WP Jupiter and set a secret key
5. In WP Jupiter, add your site using:
   - **URL**: Your WordPress site URL
   - **Username**: (anything - it's ignored)
   - **Password**: The secret key you set in step 4

WP Jupiter will automatically detect the connector plugin and use it for syncing.

## API Endpoints

- `GET /api/sites` - List all sites with update counts
- `POST /api/sites` - Add a new site
- `GET /api/sites/[id]` - Get site details with plugins/themes
- `PUT /api/sites/[id]` - Update site
- `DELETE /api/sites/[id]` - Delete site
- `GET /api/sites/[id]/health` - Check site health
- `GET /api/sites/[id]/plugins` - Sync and get plugins
- `POST /api/sites/[id]/plugins` - Update a plugin
- `POST /api/sync` - Sync all sites

## Testing

Framework: **Vitest** + **@testing-library/react**

```bash
npm run test:run       # Run all tests once
npm run test:coverage  # With coverage report (target: 80%+)
```

Test files live alongside source (e.g. `lib/validation.test.ts`, `lib/business-logic.test.ts`).

## Roadmap (Phase 4)

- [ ] User management across sites
- [ ] Scheduled syncing
- [ ] Backup coordination
- [ ] Security scanning
