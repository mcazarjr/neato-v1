import express from "express";
import {
  searchUserByQuery,
  accessConversation,
  getConversations,
  createGroupConversation,
  renameGroupConversation,
  addUserToGroupConversation,
  removeUserFromGroupConversation,
  sendMessage,
  getMessages,
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getConversations)
  .post(protect, accessConversation);
router.route("/group").post(protect, createGroupConversation);
router.route("/group/rename").put(protect, renameGroupConversation);
router.route("/group/add").put(protect, addUserToGroupConversation);
router.route("/group/remove").put(protect, removeUserFromGroupConversation);
router.route("/i/").post(protect, sendMessage);
router.route("/i/:conversation_id").get(protect, getMessages);

export default router;
