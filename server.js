import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db.js";
import moodRoutes from "./routes/moods.js";

dotenv.config();
const app = express();

// Update 'origin' to your actual GitHub Pages URL to fix CORS errors
app.use(cors({
  origin: "https://aaronpallasigue5.github.io",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());
app.use("/mood", moodRoutes); // This matches api.post('/mood') in your UI

app.get("/", (req, res) => res.send("Backend is running!"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));