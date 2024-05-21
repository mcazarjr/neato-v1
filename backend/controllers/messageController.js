import asyncHandler from "express-async-handler";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

// @desc    Get users by search query
// @route   GET /api/messages/:search
// @access  Private/Admin
const searchUserByQuery = asyncHandler(async (req, res) => {
  const query = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(query)
    .find({ _id: { $ne: req.user._id } })
    .select("-password");
  res.status(202).send(
    users.map((user) => {
      return {
        _id: user._id,
        name: user.first_name + " " + user.last_name,
        email: user.email,
        designation: user.designation,
      };
    })
  );
});

// @desc    Create/Fetch conversation
// @route   POST /api/messages/
// @access  Private/Admin
const accessConversation = asyncHandler(async (req, res) => {
  const _id = req.user._id;
  const { target_id } = req.body;
  console.log(_id, target_id);

  if (_id === target_id) {
    res.status(400);
    throw new Error("You cannot send message to yourself");
  }
  if (!target_id) {
    res.status(400);
    throw new Error("Target id is required");
  }

  let conversation = await Conversation.find({
    isGroupConversation: false,
    $and: [
      { users: { $elemMatch: { $eq: _id } } },
      { users: { $elemMatch: { $eq: target_id } } },
    ],
  })
    .populate("users", "first_name last_name email")
    .populate("latest_message", "message");

  conversation = await User.populate(conversation, {
    path: "latest_message.sender",
    select: "first_name last_name email",
  });

  if (conversation.length > 0) {
    res.status(202).json(conversation[0]);
  } else {
    try {
      const newConversation = await Conversation.create({
        conversation_name: "sender",
        users: [_id, target_id],
        isGroupConversation: false,
      });
      const newUpdatedConversation = await Conversation.findOne({
        _id: newConversation._id,
      }).populate("users", "first_name last_name email");
      res.status(201).json(newUpdatedConversation);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }
});

// @desc    Fetch conversations
// @route   GET /api/messages/
// @access  Private/Admin
const getConversations = asyncHandler(async (req, res) => {
  const _id = req.user._id;
  try {
    Conversation.find({
      users: { $elemMatch: { $eq: _id } },
    })
      .populate("users", "first_name last_name email")
      .populate("latest_message")
      .populate("group_admin", "first_name last_name email")
      .sort({ updatedAt: -1 })
      .then(async (conversations) => {
        conversations = await User.populate(conversations, {
          path: "latest_message.sender",
          select: "first_name last_name email",
        });
        res.status(202).json(conversations);
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// @desc    Create Group Conversation
// @route   POST /api/messages/group
// @access  Private/Admin
const createGroupConversation = asyncHandler(async (req, res) => {
  const _id = req.user._id;
  const { conversation_name, users } = req.body;
  const parsedUsers = JSON.parse(users);

  if (!conversation_name) {
    res.status(400);
    throw new Error("Conversation name is required");
  }
  if (!users) {
    res.status(400);
    throw new Error("Users are required");
  }
  if (users.length < 2) {
    res.status(400);
    throw new Error("Minimum 2 users are required");
  }

  parsedUsers.push(_id);

  try {
    const newConversation = await Conversation.create({
      conversation_name,
      users: parsedUsers,
      isGroupConversation: true,
      group_admin: _id,
    });
    const newUpdatedConversation = await Conversation.findOne({
      _id: newConversation._id,
    })
      .populate("users", "_id first_name last_name email")
      .populate("group_admin", "_id first_name last_name email");
    res.status(201).json(newUpdatedConversation);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// @desc    Rename Group Conversation
// @route   PUT /api/messages/group/rename
// @access  Private/Admin
const renameGroupConversation = asyncHandler(async (req, res) => {
  const { conversation_name, conversation_id } = req.body;

  if (!conversation_name) {
    res.status(400);
    throw new Error("Conversation name is required");
  }
  if (!conversation_id) {
    res.status(400);
    throw new Error("Conversation id is required");
  }

  const updatedConversation = await Conversation.findOneAndUpdate(
    { _id: conversation_id },
    { conversation_name },
    { new: true }
  )
    .populate("users", "_id first_name last_name email")
    .populate("group_admin", "_id first_name last_name email")
    .populate("latest_message", "message");

  if (!updatedConversation) {
    res.status(404);
    throw new Error("Conversation not found");
  } else {
    res.status(202).json(updatedConversation);
  }
});

// @desc    Add user to Group Conversation
// @route   POST /api/messages/group/add
// @access  Private/Admin
const addUserToGroupConversation = asyncHandler(async (req, res) => {
  const { conversation_id, user_id } = req.body;
  const updatedConversation = await Conversation.findOneAndUpdate(
    { _id: conversation_id },
    { $push: { users: user_id } },
    { new: true }
  )
    .populate("users", "_id first_name last_name email")
    .populate("group_admin", "_id first_name last_name email");

  if (!updatedConversation) {
    res.status(404);
    throw new Error("Conversation not found");
  }
  res.status(202).json(updatedConversation);
});

// @desc    Remove user from Group Conversation
// @route   POST /api/messages/group/remove
// @access  Private/Admin
const removeUserFromGroupConversation = asyncHandler(async (req, res) => {
  const { conversation_id, user_id } = req.body;
  const updatedConversation = await Conversation.findOneAndUpdate(
    { _id: conversation_id },
    { $pull: { users: user_id } },
    { new: true }
  )
    .populate("users", "_id first_name last_name email")
    .populate("group_admin", "_id first_name last_name email");

  if (!updatedConversation) {
    res.status(404);
    throw new Error("Conversation not found");
  }
  res.status(202).json(updatedConversation);
});

// @desc    Send message
// @route   POST /api/messages/i
// @access  Private/Admin
const sendMessage = asyncHandler(async (req, res) => {
  const { conversation_id, content } = req.body;

  if (!conversation_id) {
    res.status(400);
    throw new Error("Conversation id is required");
  }
  if (!content) {
    res.status(400);
    throw new Error("Message content is required");
  }

  try {
    let message = await Message.create({
      sender: req.user._id,
      content: content,
      conversation: conversation_id,
    });
    message = await message.populate("sender", "first_name last_name email");
    message = await message.populate("conversation");
    message = await User.populate(message, {
      path: "conversation.users",
      select: "first_name last_name email",
    });
    await Conversation.findByIdAndUpdate(conversation_id, {
      latest_message: message._id,
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(404).json("Error sending message");
  }
});

// @desc    Get messages
// @route   GET /api/messages/i/:conversation_id
// @access  Private/Admin
const getMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({
      conversation: req.params.conversation_id,
    })
      .populate("sender", "first_name last_name email")
      .populate("conversation");
    res.status(202).json(messages);
  } catch (error) {
    res.status(404).json("Messages not found");
  }
});

export {
  searchUserByQuery,
  accessConversation,
  getConversations,
  createGroupConversation,
  renameGroupConversation,
  addUserToGroupConversation,
  removeUserFromGroupConversation,
  sendMessage,
  getMessages,
};

// TODO Routes
//
