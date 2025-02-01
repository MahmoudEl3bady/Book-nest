# Book Scraper API

A production-ready web scraping API for books.toscrape.com built with Express.js, Puppeteer, and SQLite.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create database and run migrations:
   ```bash
   npm run migrate
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

## API Documentation

### Authentication

#### Register a new user
```
POST /api/auth/register
Body: { "username": "user", "password": "password" }
```

#### Login
```
POST /api/auth/login
Body: { "username": "user", "password": "password" }
```

### Books

#### Get all books (with pagination)
```
GET /api/books?page=1&limit=10
```

#### Search books
```
GET /api/books/search?q=python
```

#### Get book by ID
```
GET /api/books/:id
```

#### Start scraping (requires authentication)
```
POST /api/books/scrape
Headers: { "Authorization": "Bearer YOUR_TOKEN" }
```

## Best Practices & Improvements

1. Rate Limiting
   - Implemented for both API endpoints and scraping
   - Configurable limits to prevent server overload

2. Security
   - JWT authentication
   - Input validation and sanitization
   - Helmet for security headers
   - CORS configuration

3. Error Handling & Logging
   - Centralized error handling
   - Winston logger for structured logging
   - Separate error and combined logs

4. Database
   - SQLite with WAL mode for better concurrency
   - Proper indexing for frequently queried columns
   - Prepared statements to prevent SQL injection

5. Potential Improvements
   - Add test suite (Jest/Supertest)
   - Implement caching (Redis)
   - Add Docker support
   - Implement webhook notifications
   - Add API documentation (Swagger/OpenAPI)