// src/api/openai.js
import axios from 'axios';

// Accessing environment variable
const openAIKey = process.env.REACT_APP_OPENAI_API_KEY;

const openAI = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
        'Authorization': `Bearer ${openAIKey}`
    }
});

export const fetchReply = async (prompt) => {
    try {
        const response = await openAI.post('/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }]
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching reply:', error);
        return "Sorry, I can't connect to the AI right now.";
    }
};
