const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Groq API configuration (key is hidden on server)
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Safe system prompt for mental health
const SYSTEM_PROMPT = `You are a compassionate mental health support chatbot called MindMate.
Important guidelines:
1. NEVER provide medical advice or diagnose conditions
2. ALWAYS encourage professional help for serious issues
3. Be warm, empathetic, and non-judgmental
4. Focus on active listening and emotional validation
5. Suggest coping strategies like deep breathing or grounding techniques
6. If user expresses crisis, redirect to emergency resources
7. Keep responses under 150 words, conversational tone
8. Ask open-ended questions to encourage expression`;

// Crisis keywords for safety
const CRISIS_KEYWORDS = [
    'kill myself', 'suicide', 'end my life', 'die', 'self harm', 
    'hurt myself', 'worthless', 'no reason to live', 'want to die',
    'overdose', 'cut myself', 'don\'t want to live'
];

// Endpoint to check for crisis keywords
app.post('/api/check-crisis', (req, res) => {
    const { message } = req.body;
    const lowerMsg = message.toLowerCase();
    const isCrisis = CRISIS_KEYWORDS.some(keyword => lowerMsg.includes(keyword));
    res.json({ isCrisis });
});

// Main chat endpoint (API key stays safe here)
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        // Get the API key from environment variables
        const apiKey = process.env.GROQ_API_KEY;
        
        if (!apiKey) {
            throw new Error('API key not configured');
        }
        
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
                max_tokens: 300
            })
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        const botReply = data.choices[0].message.content;
        
        res.json({ reply: botReply });
        
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ 
            reply: "I'm having trouble connecting right now. Please try again in a moment. If you need immediate support, please call 988."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API key loaded: ${process.env.GROQ_API_KEY ? '✅ Yes' : '❌ No'}`);
});