import express from "express";
import { getUserFavorites, addFavorite } from "../controllers/favorites.js";

const router = express.Router();

router.get("/", getUserFavorites);

router.post("/new", addFavorite);

export default router;
