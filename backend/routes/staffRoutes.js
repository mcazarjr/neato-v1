import express from 'express';
import {
 createStaff,
 getStaffList,
 getStaffById,
 updateStaff,
} from '../controllers/staffController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/list').get(protect, getStaffList);
router.route('/id/:id').get(protect, getStaffById).put(protect, updateStaff);
router.route('/create').post(protect, createStaff);

export default router;