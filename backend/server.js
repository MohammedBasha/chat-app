import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

// load environment variables
dotenv.config();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON requests body (req.body)
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    // root route http://localhost:${PORT}/
    res.send("Hello, World!!");
});

// Creating the auth routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
