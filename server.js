import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import moodRoutes from "./routes/moods.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "https://aaronpallasigue5.github.io", // Palitan kung iba ang GitHub URL mo
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());
app.use("/mood", moodRoutes);

app.get("/", (req, res) => res.send("Backend is running on Render and connected to Railway!"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));