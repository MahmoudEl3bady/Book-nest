import express from "express";
import { register, login } from "../controllers/auth.js";
import {
  loginValidationRules,
  registerValidationRules,
} from "../validators/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/register", registerValidationRules, validate, register);
router.post("/login", loginValidationRules, validate, login);

export default router;
