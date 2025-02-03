import express from "express";
import { register, login } from "../controllers/auth";
import {
  loginValidationRules,
  registerValidationRules,
} from "../validators/auth";
import { validate } from "../middleware/validate";

const router = express.Router();

router.post("/register", registerValidationRules, validate, register);
router.post("/login", loginValidationRules, validate, login);

export default router;
