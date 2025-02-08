import express from "express";
import {
  createRental,
  updateRental,
  deleteRental,
  getSingleRental,
  getAllRentals,
  getRentalBySearch,
  getFeaturedRentals,
  getRentalCount,
} from "../controllers/rentalController.js";

const router = express.Router();

// Create New Rental
router.post("/", createRental);

// Update Rental
router.put("/:id", updateRental);

// Delete Rental
router.delete("/:id", deleteRental);

// Get Single Rental
router.get("/:id", getSingleRental);

// Get All Rentals
router.get("/", getAllRentals);

// Get Rental by Search
router.get("/search/getRentalBySearch", getRentalBySearch);
router.get("/search/getFeaturedRentals", getFeaturedRentals);
router.get("/search/getRentalCount", getRentalCount);

export default router;
