// src/swagger.ts

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Configure options for swagger-jsdoc
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Scraper API",
      version: "1.0.0",
      description: "API documentation for the Book Scraper API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  // Paths to files containing OpenAPI definitions (adjust paths as needed)
  apis: [
    "./src/routes/*.ts",
    "./src/controllers/*.ts",
    "./src/swaggerComponents.ts",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default function setupSwagger(app: Express): void {
  // Route to serve the Swagger UI documentation
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
