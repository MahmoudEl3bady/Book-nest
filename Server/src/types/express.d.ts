import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User; // Extend with your User type
    }
  }
}
