import axios from 'axios';

// PALITAN ITO: Ilagay ang iyong totoong Render URL
const API_BASE_URL = "https://iyong-app-name.onrender.com"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const moodService = {
  // Para mag-submit ng bagong mood
  async submitMood(fullName, moodText) {
    try {
      const response = await api.post('/mood', {
        full_name: fullName,
        mood_text: moodText
      });
      return response.data; // Ito yung magbabalik ng { message, ai_message }
    } catch (error) {
      console.error("API Error (Post):", error);
      throw error;
    }
  },

  // Para makuha ang history (Part 4 ng Lab)
  async getMoodHistory() {
    try {
      const response = await api.get('/mood');
      return response.data;
    } catch (error) {
      console.error("API Error (Get):", error);
      throw error;
    }
  }
};

export default moodService;