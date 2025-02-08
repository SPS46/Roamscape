import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import {
  createGuideBooking,
  getAllGuideBookings,
  getGuideBooking,
} from "../controllers/guideBookingController.js";

const router = express.Router();

router.post("/", verifyUser, createGuideBooking);
router.get("/:id", verifyUser, getGuideBooking);
router.get("/", verifyAdmin, getAllGuideBookings);

export default router;
