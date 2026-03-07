import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Helper function for AI logic (Internal to keep it simple)
const getAIResponse = (text) => {
  const mood = text.toLowerCase();
  if (mood.includes("happy") || mood.includes("good")) return "That's wonderful! Keep shining! ✨";
  if (mood.includes("sad") || mood.includes("bad")) return "I'm sorry you're feeling this way. Take it slow today. 🌿";
  if (mood.includes("stress") || mood.includes("anxious")) return "Deep breaths. You've got this. 🧘‍♂️";
  return "Thank you for sharing. I'm here to support you.";
};

// GET all moods
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM name_moods ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new mood
router.post("/", async (req, res) => {
  const { full_name, mood_text } = req.body;

  try {
    const aiMessage = getAIResponse(mood_text);

    // FIXED: Now uses the exact table and column names from your Railway screenshot
    const [result] = await db.query(
      "INSERT INTO name_moods (user_name, message, ai_response) VALUES (?, ?, ?)",
      [full_name, mood_text, aiMessage]
    );

    res.status(201).json({ 
      message: "Success!", 
      ai_message: aiMessage // Matches your MoodForm.vue requirement
    });
  } catch (err) {
    console.error("SQL Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;