import express from "express";
import {
  register,
  login,
  logout,
  updateProfile,
  forgetPassword,
  resetPassword,
} from "../controllers/authController.js";
import { authenticateToken } from "@/middleware/auth.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account by providing a name, email, and password.
 *     requestBody:
 *       required: true
 *       description: User registration data.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: User created successfully.
 *       500:
 *         description: Internal server error.
 */
router.post("/register", register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user and return a JWT token upon successful login.
 *     requestBody:
 *       required: true
 *       description: User login credentials.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Successful login, returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal server error.
 */
router.post("/login", login);

router.post("/logout", authenticateToken, logout);

router.put("/update", authenticateToken, updateProfile);

router.post("/forgot-password", authLimiter, forgetPassword);
router.post("/reset-password", authLimiter, resetPassword);

export default router;
