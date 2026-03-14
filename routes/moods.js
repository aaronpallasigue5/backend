import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Simple AI Logic
const getAIResponse = (text) => {
  const mood = text.toLowerCase();
  if (mood.includes("happy") || mood.includes("good")) return "That's wonderful! Keep shining! ✨";
  if (mood.includes("sad") || mood.includes("bad")) return "I'm sorry you're feeling this way. I'm here for you. ❤️";
  return "Thank you for sharing. Remember that your feelings are valid. 🌈";
};

router.post("/", async (req, res) => {
  const { full_name, mood_text } = req.body;
  
  try {
    const aiMessage = getAIResponse(mood_text);

    // I-save sa Railway (Siguraduhin na ang table name ay 'name_moods')
    await db.query(
      "INSERT INTO name_moods (user_name, message, ai_response) VALUES (?, ?, ?)",
      [full_name, mood_text, aiMessage]
    );

    res.status(201).json({ ai_message: aiMessage });
  } catch (err) {
    // Lalabas ito sa Render Logs para alam natin kung bakit nag-500 error
    console.error("Database Error:", err.message);
    res.status(500).json({ error: "Failed to save mood", details: err.message });
  }
});

export default router;