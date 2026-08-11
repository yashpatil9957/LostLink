import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import lostItemRoutes from "./routes/lostItemRoutes.js";
import foundItemRoutes from "./routes/foundItemRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/lost-items", lostItemRoutes);
app.use("/api/found-items", foundItemRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/claims", claimRoutes);

app.get("/", (req, res) => {
  res.send("LostLink API is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});