import express from "express";

import {
  createJob,
  getJobs,
  getJobById,
  getJobsByDate,
  getJobsByStatus,
  getJobStarted,
  updateJob,
  updateJobStarted,
  updateJobStatus,
  getJobStatusById,
  updateJobStart,
  updateTaskStatus,
  uploadImage,
  updateNotesFromCleaner,
  getJobImages,
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get("/", protect, getJobs);
router.get("/images", protect, getJobImages);
router.get("/:id", protect, getJobById);
router.get("/date/:date", protect, getJobsByDate);
router.get("/status/:status", protect, getJobsByStatus);
router.get("/started/:id", protect, getJobStarted);
router.get("/:id/status", protect, getJobStatusById);
router.put("/started/:id", protect, updateJobStarted);
router.put("/:id/status", protect, updateJobStatus);
router.put("/:id/:taskIndex/taskStatus", updateTaskStatus);
router.post("/create", protect, createJob);
router.put("/:id/start", protect, updateJobStart);
router.route("/id/:id").get(protect, getJobById).put(protect, updateJob);
router.post("/:id/uploadImage", protect, upload.single("img"), uploadImage);
router.put("/:id/notes", protect, updateNotesFromCleaner);

export default router;
