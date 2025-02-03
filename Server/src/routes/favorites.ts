import express from "express";
import {
  getUserFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favorites";

const router = express.Router();

// Register route handlers with the router
router.get("/", getUserFavorites);
router.post("/new", addFavorite);
router.delete("/remove", removeFavorite);

export default router;
