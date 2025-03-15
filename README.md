# Book Scraper Platform

The Book Scraper API is a web scraping service that fetches book data from an online store using **Node.js**, **Express.js**, **Puppeteer**, and **SQLite**. The **client-side** is a Next.js-based web application that interacts with the API, providing a user-friendly interface to browse and manage scraped book data.

## Features

### Server Features

- Web scraping with Puppeteer
- JWT Authentication
- Book management with SQLite
- Favorites system
- Paginated API responses
- Search functionality
- Review system
- Rate limiting & security headers

### Client Features

- Modern UI with Tailwind CSS
- User authentication flows
- Book browsing interface
- Favorites management
- Responsive design
- Mobile-first approach

## Tech Stack

**Server**: Node.js, Express, Prisma, SQLite, Puppeteer, JWT  
 **Client**: Next.js, TypeScript, Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- SQLite3

### Server Setup

1.  **Clone the repository**

    ```
    git clone https://github.com/yourusername/book-scraper.git
    cd book-scraper/server
    ```

2.  **Install dependencies**

    ```
    npm install
    ```

3.  **Set up environment variables** (create a `.env` file and add your secrets)

    ```
    PORT=3000
    JWT_SECRET=your_secret_key
    DATABASE_URL=file:./db/database.sqlite
    ```

4.  **Initialize database**

    ```
    npx prisma migrate dev
    ```

5.  **Run the server**

    ```
    npm run dev
    ```

6.  **Access API documentation** at `http://localhost:3000/docs`

---

### Client Setup

1.  **Navigate to the client directory**

    ```
    cd book-scraper/client
    ```

2.  **Install dependencies**

    ```
    npm install
    ```

3.  **Set up environment variables** (`.env`)

    ```
    NEXT_PUBLIC_API_URL=http://localhost:3000/api
    ```

4.  **Run the development server**

    ```
    npm run dev
    ```

5.  **Visit the app** at `http://localhost:3000`

---
