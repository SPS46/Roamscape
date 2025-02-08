import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import {
  createRentalBooking,
  getAllRentalBookings,
  getRentalBooking,
} from "../controllers/rentalBookingController.js";

const router = express.Router();

router.post("/", verifyUser, createRentalBooking);
router.get("/:id", verifyUser, getRentalBooking);
router.get("/", verifyAdmin, getAllRentalBookings);

export default router;
