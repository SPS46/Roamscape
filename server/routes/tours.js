import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getFeaturedTour,
  getSingleTour,
  getTourBySearch,
  getTourCount,
  updateTour,
} from "../controllers/tourController.js";

const router = express.Router();

//Create New Tour
router.post("/", createTour);

//Update New Tour
router.put("/:id", updateTour);

//Delete New Tour
router.delete("/:id", deleteTour);

//Get Single Tour
router.get("/:id", getSingleTour);

//Get all tours
router.get("/", getAllTour);

//Get tour by search
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTours", getFeaturedTour);
router.get("/search/getTourCount", getTourCount);

export default router;
