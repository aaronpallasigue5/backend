import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Simple AI Logic
const getAIResponse = (text) => {
  const mood = text.toLowerCase();
  if (mood.includes("happy") || mood.includes("good")) return "That's wonderful! Keep shining! ✨";
  if (mood.includes("sad") || mood.includes("bad")) return "I'm sorry you're feeling this way. Take it slow today. 🌿";
  return "Thank you for sharing. I'm here to support you. ❤️";
};

router.post("/", async (req, res) => {
  const { full_name, mood_text } = req.body;
  try {
    const aiMessage = getAIResponse(mood_text);

    // Dito ise-save sa Railway (gamit ang table na ginawa mo)
    await db.query(
      "INSERT INTO name_moods (user_name, message, ai_response) VALUES (?, ?, ?)",
      [full_name, mood_text, aiMessage]
    );

    res.status(201).json({ ai_message: aiMessage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;