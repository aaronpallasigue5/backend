import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import moodRoutes from "./routes/moods.js";

dotenv.config();
const app = express();

app.use(cors({
  // Pinayagan ang main domain at ang sub-path ng repo mo
  origin: [
    "https://aaronpallasigue5.github.io",
    "http://localhost:5173" 
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// Main Routes
app.use("/mood", moodRoutes);

// Health Check
app.get("/", (req, res) => res.send("Backend is running and connected to Railway!"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));