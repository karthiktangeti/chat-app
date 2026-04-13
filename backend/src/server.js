import express from "express";
import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

// ✅ Middleware
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

// ✅ FIXED CORS (VERY IMPORTANT)
app.use(
  cors({
    origin: ["http://localhost:5173", "https://chat-app-gold-xi-58.vercel.app"],
    credentials: true,
  }),
);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Serve frontend (for production if needed)
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// ✅ Connect DB
connectDB();

// ✅ FIXED: Always start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ✅ For Vercel compatibility
export default app;
