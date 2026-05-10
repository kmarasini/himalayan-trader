# HimalayanTrader.com

A B2C and B2B e-commerce platform for specialty unroasted (green) coffee beans sourced directly from small-lot farmers in Nepal. Built with Next.js 14, deployed to Cloudflare Pages.

## Features

- **Full lot traceability** — GPS coordinates, farmer profiles, harvest dates, Q-grade scores for every lot
- **B2C storefront** — product cards, size/quantity selection, Stripe Checkout
- **B2B wholesale** — pricing tiers, inquiry form, documentation list
- **Farm directory** — long-form farmer stories, certifications, per-farm lot listings
- **Persistent cart** — Zustand with localStorage, slide-over drawer
- **Edge-ready** — all API routes run on Cloudflare Workers via `@cloudflare/next-on-pages`
- **SEO** — metadata, OpenGraph, sitemap.xml, robots.txt
- **6 seeded coffee lots** and **5 farm profiles** ready to ship

## Tech stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 14 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS + custom design tokens |
| UI primitives | Radix UI (headless) |
| Cart state | Zustand + persist middleware |
| Payments | Stripe Checkout (server-side session) |
| Deployment | Cloudflare Pages via `@cloudflare/next-on-pages` |
| CI/CD | GitHub Actions → Cloudflare Pages |

## Local development

```bash
# 1. Install dependencies
npm install

# 2. Copy env vars
cp .env.example .env.local
# Fill in at minimum: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY + STRIPE_SECRET_KEY

# 3. Start dev server
npm run dev
# → http://localhost:3000
```

The storefront works without Stripe configured (cart and browsing). Checkout requires Stripe keys.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL (e.g. `https://himalayantrader.com`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | For checkout | Stripe publishable key |
| `STRIPE_SECRET_KEY` | For checkout | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | For webhooks | Stripe webhook signing secret |
| `RESEND_API_KEY` | For wholesale email | Resend API key for email notifications |
| `CONTACT_EMAIL` | For wholesale email | Recipient address for wholesale inquiries |

## Cloudflare Pages deployment

### One-time setup

1. **Create a Cloudflare Pages project** at [dash.cloudflare.com](https://dash.cloudflare.com)
   - Build command: `npm run pages:build`
   - Build output: `.vercel/output/static`

2. **Add environment variables** in Cloudflare dashboard → Settings → Environment variables.

3. **Connect your GitHub repo** — Cloudflare Pages auto-deploys on push to `main`.

### GitHub Actions

Add these secrets to your GitHub repo (Settings → Secrets):

| Secret | Value |
|--------|-------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Pages Edit permission |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |

The workflow in `.github/workflows/deploy.yml` runs on every push to `main`.

### Manual deploy

```bash
npm run deploy
# Runs: next build → @cloudflare/next-on-pages → wrangler pages deploy
```

## Stripe webhook setup

Register the webhook in [Stripe Dashboard](https://dashboard.stripe.com/webhooks):

- **Endpoint**: `https://himalayantrader.com/api/webhooks/stripe`
- **Events**: `checkout.session.completed`, `checkout.session.expired`

Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.

## Project structure

```
src/
├── app/
│   ├── page.tsx                     # Homepage
│   ├── layout.tsx                   # Root layout (fonts, header, footer)
│   ├── shop/
│   │   ├── page.tsx                 # Product grid with filters
│   │   └── [slug]/page.tsx          # Lot detail page
│   ├── farms/
│   │   ├── page.tsx                 # Farm directory
│   │   └── [slug]/page.tsx          # Farm profile
│   ├── cart/page.tsx                # Full cart page
│   ├── checkout/
│   │   ├── page.tsx                 # Checkout form → Stripe redirect
│   │   └── success/page.tsx         # Post-payment confirmation
│   ├── wholesale/page.tsx           # Wholesale landing + inquiry form
│   ├── about/page.tsx               # Mission, values, traceability
│   └── api/
│       ├── checkout/route.ts        # POST → Stripe Checkout session
│       ├── webhooks/stripe/route.ts # Stripe event handler
│       ├── wholesale-inquiry/route.ts
│       └── newsletter/route.ts
├── components/
│   ├── layout/    # Header, Footer, CartDrawer
│   ├── product/   # ProductCard
│   ├── farm/      # FarmCard
│   └── ui/        # Radix-based primitives
├── lib/
│   ├── products.ts  # All 6 coffee lots (static data)
│   ├── farms.ts     # All 5 farm profiles (static data)
│   ├── stripe.ts    # Stripe client (edge-compatible)
│   └── utils.ts     # cn(), formatPrice(), helpers
├── store/
│   └── cart.ts      # Zustand cart store with localStorage persistence
└── types/
    └── index.ts     # Shared TypeScript types
```

## Adding new lots

Edit [src/lib/products.ts](src/lib/products.ts) and add a new object to the `coffeeLots` array. Reference a farm from `src/lib/farms.ts`. The product appears immediately in the shop grid.

## Extending to a database

The static data files are drop-in replaceable with database queries. When ready:

1. `npm install @supabase/supabase-js @supabase/ssr`
2. Replace imports in page files with `await supabase.from('lots').select(...)`
3. The TypeScript types in `src/types/index.ts` remain the same — no component changes needed.

## License

MIT

## 🌍 Features

### B2C Marketplace
- **Advanced Product Filtering**: Browse by origin region, altitude, processing method, tasting notes
- **Lot Transparency**: View farmer profiles, harvest dates, quality metrics (SCA scores)
- **Origin Traceability**: QR codes on packaging, immutable audit trail from harvest to delivery
- **Shopping Cart & Checkout**: Stripe payment integration
- **Real-time Inventory**: Live stock updates across the platform

### B2B Portal
- **Bulk Ordering**: Custom pricing tiers and minimum order quantities
- **Contracts**: Negotiated terms stored and tracked
- **Account Approval**: Admin-managed B2B account onboarding
- **Invoicing**: Generate professional invoices with payment terms (Net 30, etc.)
- **Order History**: Complete audit trail for compliance

### Admin Dashboard
- **Inventory Management**: Add lots, update stock, manage farmer relationships
- **Order Fulfillment**: Process, ship, and track orders
- **B2B Account Approval**: Review and approve wholesale accounts
- **Analytics**: Sales trends, popular origins, B2B vs. B2C metrics

### Farmer Management
- **Farmer Profiles**: Bios, certifications, location mapping
- **Lot Tracking**: Complete harvest-to-delivery journey
- **Quality Metrics**: Cupping scores, moisture levels, defect counts

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Cloudflare Edge (CDN, Pages, KV Storage)                   │
├─────────────────────────────────────────────────────────────┤
│  React SPA (Cloudflare Pages)   │  Go API (Origin/Workers)  │
│  - B2C marketplace              │  - REST API                │
│  - B2B admin portal             │  - Authentication          │
│  - Traceability viewer          │  - Business logic          │
├─────────────────────────────────────────────────────────────┤
│  PostgreSQL (Neon, Supabase, or self-managed)               │
│  - Products, lots, farmers, orders, users, traceability     │
└─────────────────────────────────────────────────────────────┘
```

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Redux Toolkit
- **Backend**: Go + Gin web framework + PostgreSQL driver
- **Database**: PostgreSQL with JSONB for flexible agricultural metadata
- **Deployment**: Cloudflare Pages (frontend) + origin/Workers (backend)
- **Payments**: Stripe API
- **Authentication**: JWT tokens + Role-Based Access Control (RBAC)

---

## 📋 Prerequisites

- **Node.js** 18+ and npm 9+
- **Go** 1.20+
- **Docker** & **Docker Compose**
- **PostgreSQL** 14+ (or Neon/Supabase account)
- **Git**
- Stripe account (for payments)
- Cloudflare account (for deployment)

---

## 🚀 Quick Start

### 1. Clone & Setup

```bash
cd himalayan-trader

# Install dependencies
npm install --prefix frontend
go mod download -C backend

# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 2. Start Local Development Environment

```bash
docker-compose up -d
```

This starts:
- PostgreSQL on localhost:5432
- Go API on localhost:8080
- React dev server on localhost:5173

### 3. Run Database Migrations

```bash
cd backend
go run cmd/server/main.go migrate
```

### 4. Start Services

Terminal 1 - Backend:
```bash
cd backend
go run cmd/server/main.go
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **API**: http://localhost:8080/api/health
- **Admin**: http://localhost:5173/admin (login with admin credentials)
- **PostgreSQL**: psql -h localhost -U postgres -d himalayan_trader

---

## 📚 Documentation

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Detailed system design
- **[API.md](docs/API.md)** - REST API endpoints and usage
- **[DATABASE.md](docs/DATABASE.md)** - Schema design and relationships
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Cloudflare deployment guide
- **[TRACEABILITY.md](docs/TRACEABILITY.md)** - Origin tracking system
- **[B2B.md](docs/B2B.md)** - B2B features and workflows

---

## 🔑 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/himalayan_trader
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET=sk_test_...
CORS_ORIGIN=http://localhost:5173
PORT=8080
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8080
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
go test ./internal/...
```

### Frontend Tests
```bash
cd frontend
npm run test
```

### E2E Tests (optional)
```bash
cd frontend
npm run test:e2e
```

---

## 📦 Project Structure

```
himalayan-trader/
├── frontend/              # React SPA
│   ├── src/
│   │   ├── components/   # UI components by feature
│   │   ├── services/     # API client
│   │   ├── store/        # Redux state management
│   │   └── pages/        # Page components
│   └── package.json
│
├── backend/               # Go REST API
│   ├── cmd/server/        # Entry point
│   ├── internal/
│   │   ├── api/          # HTTP handlers & middleware
│   │   ├── models/       # Domain models
│   │   ├── repository/   # Database layer
│   │   ├── service/      # Business logic
│   │   └── config/       # Configuration
│   ├── migrations/        # Database migrations
│   ├── go.mod
│   └── Dockerfile
│
├── cloudflare/            # Cloudflare configuration
│   └── wrangler.toml
│
├── .github/workflows/     # CI/CD pipelines
│   ├── deploy-frontend.yml
│   ├── deploy-backend.yml
│   └── test.yml
│
├── docs/                  # Documentation
├── docker-compose.yml     # Local development
└── Makefile              # Development commands
```

---

## 🚢 Deployment

### To Cloudflare Pages (Frontend)

```bash
npm install -g wrangler
cd frontend
wrangler publish
```

### To Origin Server (Backend)

```bash
cd backend
docker build -t himalayan-trader-api .
docker push YOUR_REGISTRY/himalayan-trader-api
```

See **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** for detailed instructions.

---

## 📊 Database Schema Overview

**Key Tables:**
- `users` - Consumer and B2B buyer accounts
- `farmers` - Farmer profiles with certifications
- `products` - Coffee lots with quality metrics
- `b2b_accounts` - Wholesale buyer accounts
- `orders` - Purchase orders (B2C and B2B)
- `traceability_logs` - Immutable audit trail
- `inventory_audit` - Stock change tracking

See **[DATABASE.md](docs/DATABASE.md)** for full schema.

---

## 🔐 Authentication & Authorization

- **JWT Tokens**: Stateless authentication
- **Roles**: consumer, b2b_buyer, admin, farmer_partner
- **OAuth2**: Google & GitHub integration (future)
- **Sessions**: Cached in Cloudflare KV for edge performance

---

## 💳 Payment Processing

- **B2C**: Stripe for credit cards and digital wallets
- **B2B**: Invoice-based with Net 30 terms
- **Webhook Handling**: Automatic order status updates from Stripe

---

## 📈 Key Business Metrics

- Active listings (lots)
- Sales by origin
- B2C vs. B2B revenue split
- Average order value
- Customer retention (repeat orders)
- Farmer partner engagement

---

## 🛠️ Development Workflow

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes and test locally
3. Commit with descriptive messages: `git commit -m "feat: add traceability feature"`
4. Push to GitHub: `git push origin feature/feature-name`
5. Create Pull Request for review
6. GitHub Actions runs tests automatically
7. Merge after approval
8. CI/CD automatically deploys to staging/production

---

## 📝 Git Commit Convention

```
feat: add new feature
fix: fix bug
docs: update documentation
style: code style changes
refactor: code refactoring
test: add/update tests
chore: maintenance tasks
```

---

## 🐛 Troubleshooting

### Docker Issues
```bash
# Reset containers
docker-compose down -v
docker-compose up -d

# View logs
docker-compose logs -f backend
```

### Database Connection Error
```bash
# Check PostgreSQL is running
docker-compose ps

# Reset database
docker-compose exec postgres psql -U postgres -c "DROP DATABASE himalayan_trader;" -c "CREATE DATABASE himalayan_trader;"
```

### Frontend Not Connecting to Backend
- Verify backend is running: `curl http://localhost:8080/api/health`
- Check CORS settings in backend
- Verify `VITE_API_BASE_URL` in frontend `.env`

---

## 📞 Support & Contribution

For bugs, features, or questions:
1. Check existing issues
2. Create detailed issue with reproduction steps
3. Submit pull requests with tests

---

## 📄 License

MIT

---

## 🙏 Acknowledgments

Built for HimalayanTrader.com, supporting direct relationships between specialty coffee enthusiasts and Nepali farmers.

---

**Last Updated**: 2026-05-09
