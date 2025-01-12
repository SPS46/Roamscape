import express from "express";
import {
  createGuide,
  updateGuide,
  deleteGuide,
  getSingleGuide,
  getAllGuides,
  getGuideBySearch,
  getFeaturedGuide,
  getGuideCount,
} from "../controllers/guideController.js";

const router = express.Router();

// Create New Guide
router.post("/", createGuide);

// Update Guide
router.put("/:id", updateGuide);

// Delete Guide
router.delete("/:id", deleteGuide);

// Get Single Guide
router.get("/:id", getSingleGuide);

// Get All Guides
router.get("/", getAllGuides);

// Get Guide by Search
router.get("/search/getGuideBySearch", getGuideBySearch);
router.get("/search/getFeaturedGuides", getFeaturedGuide);
router.get("/search/getGuideCount", getGuideCount);

export default router;
