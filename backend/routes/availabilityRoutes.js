import express from "express";
import {
  createAvailability,
  getAvailabilityById,
  updateAvailability,
} from "../controllers/availabilityController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/id/:id")
  .get(protect, getAvailabilityById)
  .put(protect, updateAvailability);
router.route("/create").post(protect, createAvailability);

export default router;
