import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

import jobRoutes from "./routes/jobRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const port = process.env.PORT || 6000;

connectDB();

const app = express();

// Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/staffs", staffRoutes);
app.use("/api/users", userRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Server is ready");
  });
}

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

// Socket.io
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (user) => {
    socket.join(user._id);
    console.log("A user joined", user._id);
    socket.emit("connected");
  });

  socket.on("join conversation", (conversation) => {
    socket.join(conversation);
    console.log(`A user joined in room: `, conversation);
  });

  socket.on("new message", (message) => {
    let conversation = message.conversation;
    if (!conversation.users)
      return console.log("Conversation.users not defined");

    conversation.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("message received", message);
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.off("setup", () => {
    console.log("A user left");
    socket.leave(user._id);
  });
});
