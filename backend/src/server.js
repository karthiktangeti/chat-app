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
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Allow localhost for development
      if (origin.includes('localhost')) return callback(null, true);

      // Allow Vercel deployments (they end with vercel.app)
      if (origin.includes('vercel.app')) return callback(null, true);

      // Reject other origins
      return callback(new Error('Not allowed by CORS'));
    },
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
