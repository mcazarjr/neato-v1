import mongoose from "mongoose";

const conversationSchema = mongoose.Schema(
  {
    conversation_name: {
      type: String,
      trim: true,
    },
    isGroupConversation: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latest_message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    group_admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
