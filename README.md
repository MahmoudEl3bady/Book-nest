# BookNest: Advanced Book Management Platform

BookNest is a sophisticated full-stack application that leverages web scraping to provide a comprehensive book management experience. Built with modern technologies, it offers an intuitive interface for discovering, organizing, and interacting with book data.

## 🚀 Features

### Core Features

- **Intelligent Web Scraping**: Automatically fetches and updates book data from online sources
- **Google Books API Integration**: Enhanced book data with cover images, descriptions, and metadata
- **Comprehensive Book Management**: Organize your literary collection with ease
- **User Authentication System**: Secure JWT-based authentication with role management
- **Personalized Experience**: Favorites system, custom bookshelves, and reading history
- **Smart Search & Filtering**: Find books by title, author, genre, or custom criteria
- **Community Engagement**: Reviews, ratings, and social sharing capabilities
- **Responsive Design**: Seamless experience across all devices

### Server Capabilities

- High-performance web scraping with Puppeteer
- RESTful API with Express.js
- Prisma ORM with SQLite (upgradable to PostgreSQL for production)
- Comprehensive error handling and logging
- Rate limiting and security measures
- Scheduled data updates with node-cron
- Email notifications via Nodemailer
- Swagger documentation
- Helmet security implementation

### Client Experience

- Modern UI built with Next.js and TypeScript
- Radix UI component library
- Tailwind CSS for responsive styling
- Form validation with React Hook Form and Zod
- Efficient state management
- SSR for optimal performance
- Dark/light theme support
- Accessibility-focused design

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js, TypeScript
- **Database**: SQLite (dev), PostgreSQL (production-ready)
- **ORM**: Prisma
- **Authentication**: JWT, bcrypt
- **Scraping**: Puppeteer
- **Validation**: Zod, Express Validator
- **Documentation**: Swagger
- **Logging**: Winston
- **Security**: Helmet, rate limiting, CORS

### Frontend

- **Framework**: Next.js 15+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Form Management**: React Hook Form
- **Data Validation**: Zod
- **Authentication**: JWT with HTTP-only cookies
- **Charts & Data Viz**: Recharts
- **Date Management**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ or pnpm 8+
- SQLite3 (development)

### Project Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/MahmoudEl3bady/book-nest.git
   cd book-nest
   ```

2. **Install root dependencies**

   ```bash
   pnpm install
   ```

3. **Initialize the database**

   ```bash
   pnpm db:migrate
   ```

   You can also open Prisma Studio to manage your database:

   ```bash
   pnpm db:studio
   ```

4. **Start development servers**

   Run both frontend and backend concurrently:

   ```bash
   pnpm dev
   ```

   Or run them separately:

   ```bash
   # Backend only
   pnpm dev:server

   # Frontend only
   pnpm dev:client
   ```

### Environment Setup

#### Backend (.env)

Create a `.env` file in the `Backend` directory:

```
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=file:./db/database.sqlite

# Authentication
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=7d

# API Configuration
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# Email (optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_password
EMAIL_FROM=noreply@booknest.com
```

#### Frontend (.env.local)

Create a `.env.local` file in the `Frontend` directory:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🚀 Deployment

### Production Build

Build both frontend and backend:

```bash
pnpm build
```

Or build them separately:

```bash
# Backend only
pnpm build:server

# Frontend only
pnpm build:client
```

### Running in Production

Start both services:

```bash
pnpm start
```

Or start them separately:

```bash
# Backend only
pnpm start:server

# Frontend only
pnpm start:client
```

### Code Quality

Format all code with Prettier:

```bash
pnpm lint
```

Check code formatting without making changes:

```bash
pnpm lint:check
```
